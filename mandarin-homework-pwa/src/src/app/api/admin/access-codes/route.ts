import { NextResponse,type NextRequest } from 'next/server';
import { adminSupabase } from '@/lib/supabase/server';
import { verifiedAdmin,newVipCode,codeHash } from '@/lib/vipServer';
import { appOrigin } from '@/lib/stripe';
import { validPlan,welcomeMessage,type PlanType,type GradeAccess } from '@/lib/plans';
export const runtime='nodejs';
const reply=(x:object,status=200)=>NextResponse.json(x,{status,headers:{'Cache-Control':'private, no-store'}});
export async function POST(req:NextRequest){try{
 const origin=appOrigin();if(req.headers.get('origin')!==origin)return reply({error:'forbidden'},403);const user=await verifiedAdmin();if(!user)return reply({error:'forbidden'},403);
 const body=await req.json();if(!body||!validPlan(body.plan_type,body.grade_access)||body.payment_confirmed!==true)return reply({error:'invalid'},400);
 const plan=body.plan_type as PlanType,grade=body.grade_access as GradeAccess;const code=newVipCode();const {error}=await adminSupabase().from('access_codes').insert({code_hash:codeHash(code),plan_type:plan,grade_access:grade,created_by:user.id});if(error)return reply({error:'unavailable'},503);
 return reply({code,message:welcomeMessage(plan,grade,code,origin)});
}catch{return reply({error:'unavailable'},503)}}
