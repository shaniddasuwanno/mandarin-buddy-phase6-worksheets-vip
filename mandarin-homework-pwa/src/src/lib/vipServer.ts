import 'server-only';
import { createHash,randomBytes } from 'node:crypto';
import { serverSupabase } from '@/lib/supabase/server';
export function normalizeCode(raw:string){return raw.trim().toUpperCase().replace(/[\s-]/g,'');}
export function codeHash(raw:string){return createHash('sha256').update(normalizeCode(raw)).digest('hex');}
export function newVipCode(){return `MB-${randomBytes(16).toString('hex').toUpperCase().match(/.{1,4}/g)!.join('-')}`;}
export async function verifiedAdmin(){const client=await serverSupabase();const {data:{user},error}=await client.auth.getUser();const allowed=(process.env.VIP_ADMIN_USER_IDS??'').split(',').map(s=>s.trim()).filter(Boolean);return !error&&user&&allowed.includes(user.id)&&user.email_confirmed_at?user:null;}
