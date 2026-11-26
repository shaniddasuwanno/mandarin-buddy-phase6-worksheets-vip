import { NextResponse,type NextRequest } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';
import { appOrigin } from '@/lib/stripe';
export async function GET(req:NextRequest){
 const code=req.nextUrl.searchParams.get('code');let origin:string;try{origin=appOrigin()}catch{return new NextResponse('App URL not configured',{status:503})}
 if(code){try{const supabase=await serverSupabase();const {error}=await supabase.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(`${origin}/`);}catch{}}
 return NextResponse.redirect(`${origin}/?auth=failed`);
}
