import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient,type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
export async function serverSupabase(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw new Error('Supabase is not configured');const jar=await cookies();
 return createServerClient(url,key,{cookies:{getAll:()=>jar.getAll(),setAll:(values:{name:string;value:string;options:CookieOptions}[])=>{try{values.forEach(({name,value,options})=>jar.set(name,value,options))}catch{/* Middleware refreshes cookies for read-only Server Components. */}}}});
}
export function adminSupabase(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new Error('Supabase admin is not configured');
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
}
