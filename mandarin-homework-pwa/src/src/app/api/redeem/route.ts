import { NextResponse,type NextRequest } from 'next/server';
import { serverSupabase,adminSupabase } from '@/lib/supabase/server';
import { appOrigin } from '@/lib/stripe';
import { normalizeCode,codeHash } from '@/lib/vipServer';
export const runtime='nodejs';
const reply=(x:object,status=200)=>NextResponse.json(x,{status,headers:{'Cache-Control':'private, no-store'}});
export async function POST(req:NextRequest){try{
 if(req.headers.get('origin')!==appOrigin())return reply({error:'forbidden'},403);const client=await serverSupabase();const {data:{user},error}=await client.auth.getUser();if(error||!user||!user.email_confirmed_at)return reply({error:'signIn'},401);
 const {code}=await req.json();if(typeof code!=='string'||code.length>80||!/^MB[A-F0-9]{32}$/.test(normalizeCode(code)))return reply({error:'invalid'},400);
 const {data,error:rpcError}=await adminSupabase().rpc('redeem_access_code',{p_hash:codeHash(code),p_user:user.id});if(rpcError)return reply({error:'unavailable'},503);if(data?.status==='invalid'||data?.status==='used')return reply({error:data.status},400);if(data?.status!=='redeemed'&&data?.status!=='already_redeemed')return reply({error:'unavailable'},503);
 return reply({success:true,plan_type:data.plan_type,grade_access:data.grade_access});
}catch{return reply({error:'unavailable'},503)}}
