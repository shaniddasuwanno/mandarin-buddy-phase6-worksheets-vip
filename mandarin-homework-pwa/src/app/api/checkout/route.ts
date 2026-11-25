import { NextResponse,type NextRequest } from 'next/server';
import { serverSupabase,adminSupabase } from '@/lib/supabase/server';
import { stripeClient,appOrigin,LIFETIME_AMOUNT,LIFETIME_CURRENCY,PRODUCT_KEY } from '@/lib/stripe';

export const runtime='nodejs';
const reply=(data:object,status=200)=>NextResponse.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function POST(request:NextRequest){
 try{
  const origin=appOrigin();if(request.headers.get('origin')!==origin)return reply({error:'forbidden'},403);
  const supabase=await serverSupabase();const {data:{user},error:authError}=await supabase.auth.getUser();if(authError||!user)return reply({error:'signIn'},401);
  const {data:profile,error:profileError}=await supabase.from('profiles').select('is_paid').eq('id',user.id).single();if(profileError||!profile)return reply({error:'unavailable'},503);if(profile.is_paid)return reply({alreadyPaid:true});
  const stripe=stripeClient(),admin=adminSupabase();
  const {data:pending,error:pendingError}=await admin.from('purchases').select('stripe_checkout_session_id').eq('user_id',user.id).eq('status','pending').maybeSingle();if(pendingError)return reply({error:'unavailable'},503);
  if(pending){
   const session=await stripe.checkout.sessions.retrieve(pending.stripe_checkout_session_id);
   if(session.metadata?.user_id!==user.id||session.metadata?.product!==PRODUCT_KEY)return reply({error:'unavailable'},503);
   if(session.payment_status==='paid'||session.status==='complete')return reply({pending:true});
   if(session.status==='open'&&session.url)return reply({url:session.url});
   if(session.status!=='expired')return reply({pending:true});
   const {error}=await admin.from('purchases').update({status:'failed'}).eq('stripe_checkout_session_id',session.id).eq('status','pending');if(error)return reply({error:'unavailable'},503);
  }
  // Re-read the profile after inspecting an old session: fulfillment may have completed meanwhile.
  const {data:latest,error:latestError}=await supabase.from('profiles').select('is_paid').eq('id',user.id).single();
  if(latestError||!latest)return reply({error:'unavailable'},503);if(latest.is_paid)return reply({alreadyPaid:true});
  // Amount, product, and account are controlled exclusively by the server.
  const session=await stripe.checkout.sessions.create({
   mode:'payment',payment_method_types:['promptpay'],locale:request.nextUrl.searchParams.get('lang')==='en'?'en':'th',
   line_items:[{quantity:1,price_data:{currency:LIFETIME_CURRENCY,unit_amount:LIFETIME_AMOUNT,product_data:{name:'Mandarin Buddy — Lifetime access / เพื่อนจีน — สิทธิ์ตลอดชีพ'}}}],
   client_reference_id:user.id,customer_email:user.email??undefined,
   metadata:{user_id:user.id,product:PRODUCT_KEY},payment_intent_data:{metadata:{user_id:user.id,product:PRODUCT_KEY}},
   success_url:`${origin}/?payment=success`,cancel_url:`${origin}/?payment=cancelled`,
  });
  if(!session.url)return reply({error:'unavailable'},503);
  const {error:recordError}=await admin.from('purchases').insert({user_id:user.id,stripe_checkout_session_id:session.id,amount:LIFETIME_AMOUNT,currency:LIFETIME_CURRENCY,status:'pending'});
  if(recordError){
   // A simultaneous request can win the unique pending-payment slot. Never disclose the orphan URL.
   const {data:existing}=await admin.from('purchases').select('stripe_checkout_session_id').eq('user_id',user.id).eq('status','pending').maybeSingle();
   if(existing?.stripe_checkout_session_id!==session.id){try{await stripe.checkout.sessions.expire(session.id)}catch{/* no checkout URL was returned */}}
   if(existing)return reply({error:'retry'},409);
   return reply({error:'unavailable'},503);
  }
  return reply({url:session.url});
 }catch{return reply({error:'unavailable'},503);}
}
