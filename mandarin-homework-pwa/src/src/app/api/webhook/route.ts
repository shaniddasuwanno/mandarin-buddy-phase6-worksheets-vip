import { NextResponse,type NextRequest } from 'next/server';
import type Stripe from 'stripe';
import { stripeClient,LIFETIME_AMOUNT,LIFETIME_CURRENCY,PRODUCT_KEY } from '@/lib/stripe';
import { adminSupabase } from '@/lib/supabase/server';
export const runtime='nodejs';
const ok=()=>NextResponse.json({received:true});
const failure=(status:number)=>NextResponse.json({error:'webhook_processing_failed'},{status});
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export async function POST(request:NextRequest){
 const signature=request.headers.get('stripe-signature'),secret=process.env.STRIPE_WEBHOOK_SECRET;if(!secret)return failure(503);if(!signature)return failure(400);
 let stripe:Stripe;try{stripe=stripeClient()}catch{return failure(503)}
 let event:Stripe.Event;try{event=stripe.webhooks.constructEvent(await request.text(),signature,secret);}catch{return failure(400);}
 const success=event.type==='checkout.session.completed'||event.type==='checkout.session.async_payment_succeeded';
 const failed=event.type==='checkout.session.expired'||event.type==='checkout.session.async_payment_failed';
 if(!success&&!failed)return ok();
 const signedSession=event.data.object as Stripe.Checkout.Session;
 if(signedSession.metadata?.product!==PRODUCT_KEY)return ok();
 try{
  // Retrieve canonical session and PaymentIntent from Stripe; never trust a browser redirect or submitted payment ID.
  const session=await stripe.checkout.sessions.retrieve(signedSession.id,{expand:['payment_intent']});
  const uid=session.metadata?.user_id;if(!uid||!uuid.test(uid)||session.metadata?.product!==PRODUCT_KEY||session.client_reference_id!==uid||session.mode!=='payment'||session.amount_total!==LIFETIME_AMOUNT||session.currency!==LIFETIME_CURRENCY||!session.payment_method_types.includes('promptpay'))return failure(400);
  const admin=adminSupabase();
  if(failed&&session.payment_status!=='paid'){
   // Do not let a stale failure event overwrite a successful payment.
   const {error}=await admin.from('purchases').update({status:'failed'}).eq('stripe_checkout_session_id',session.id).eq('user_id',uid).eq('status','pending');return error?failure(500):ok();
  }
  if(session.payment_status!=='paid')return ok();
  const intent=session.payment_intent;if(!intent||typeof intent==='string'||intent.status!=='succeeded'||intent.amount_received!==LIFETIME_AMOUNT||intent.currency!==LIFETIME_CURRENCY||!intent.payment_method_types.includes('promptpay')||intent.metadata?.user_id!==uid||intent.metadata?.product!==PRODUCT_KEY)return failure(400);
  // One database transaction records the event, purchase and paid entitlement/profile.
  const {error}=await admin.rpc('fulfill_lifetime_purchase',{p_event_id:event.id,p_event_type:event.type,p_session:session.id,p_user:uid,p_intent:intent.id,p_amount:LIFETIME_AMOUNT,p_currency:LIFETIME_CURRENCY});
  return error?failure(500):ok();
 }catch{return failure(500);}
}
