import { NextResponse,type NextRequest } from 'next/server';
import { serverSupabase } from '@/lib/supabase/server';
import { resolveAccess,worksheetAllowed } from '@/lib/worksheetAccess';
import { getWorksheet } from '@/data/worksheets';
import type { Grade } from '@/data/sampleVocab';
export const dynamic='force-dynamic';
const reply=(x:object,status=200)=>NextResponse.json(x,{status,headers:{'Cache-Control':'private, no-store'}});
export async function GET(req:NextRequest){try{const grade=Number(req.nextUrl.searchParams.get('grade')),set=Number(req.nextUrl.searchParams.get('set'));if(!Number.isInteger(grade)||grade<1||grade>6||!Number.isInteger(set)||set<1||set>10)return reply({error:'invalid'},400);const supabase=await serverSupabase();const {data:{user},error}=await supabase.auth.getUser();if(error||!user)return reply({error:'signIn'},401);const [profile,grants]=await Promise.all([supabase.from('profiles').select('is_paid').eq('id',user.id).single(),supabase.from('worksheet_grants').select('grade,expires_at').eq('user_id',user.id)]);if(profile.error||!profile.data||(grants.error&&!profile.data.is_paid))return reply({error:'unavailable'},503);const access=resolveAccess(profile.data,grants.data??[]);if(!worksheetAllowed(access.appAccess,access.worksheetGrades,grade as Grade,set))return reply({error:'locked'},403);const worksheet=getWorksheet(grade as Grade,set);if(!worksheet)return reply({error:'invalid'},404);return reply({worksheet,preview:false});}catch{return reply({error:'unavailable'},503)}}
