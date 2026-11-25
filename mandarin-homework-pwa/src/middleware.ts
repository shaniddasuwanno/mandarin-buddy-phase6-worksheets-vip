import { createServerClient,type CookieOptions } from '@supabase/ssr';
import { NextResponse,type NextRequest } from 'next/server';
export async function middleware(request:NextRequest){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 let response=NextResponse.next({request});
 if(!url||!key)return response;
 const supabase=createServerClient(url,key,{cookies:{getAll:()=>request.cookies.getAll(),setAll:(values:{name:string;value:string;options:CookieOptions}[])=>{values.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});values.forEach(({name,value,options})=>response.cookies.set(name,value,options));}}});
 // Do not trust client cookies alone. Refresh the authenticated session with Supabase.
 await supabase.auth.getUser();response.headers.set('Cache-Control','private, no-store');return response;
}
export const config={matcher:['/','/auth/callback','/api/checkout','/api/homework','/api/redeem','/api/worksheets','/admin','/api/admin/access-codes']};
