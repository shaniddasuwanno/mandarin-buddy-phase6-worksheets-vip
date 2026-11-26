import AuthGate from '@/components/AuthGate';
import PaywallModal from '@/components/PaywallModal';
import PaidApp from '@/components/PaidApp';
import { serverSupabase } from '@/lib/supabase/server';
import { resolveAccess } from '@/lib/worksheetAccess';

// Never serve one account's access decision from a shared static cache.
export const dynamic='force-dynamic';
export const revalidate=0;
export default async function Home({searchParams}:{searchParams:Promise<{payment?:string;auth?:string}>}){
 const params=await searchParams;
 if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)return <AuthGate configured={false}/>;
 const supabase=await serverSupabase();const {data:{user},error}=await supabase.auth.getUser();
 if(error||!user)return <AuthGate callbackFailed={params.auth==='failed'}/>;
 const [{data:profile,error:profileError},grants]=await Promise.all([supabase.from('profiles').select('is_paid').eq('id',user.id).single(),supabase.from('worksheet_grants').select('grade,expires_at').eq('user_id',user.id)]);
 if(profileError||!profile)return <PaywallModal email={user.email??''} profileUnavailable/>;
 // Even '?payment=success' cannot grant access: only the verified DB flag can.
 const {appAccess,worksheetGrades:grades}=resolveAccess(profile,grants.error?[]:grants.data??[]);
 if(!appAccess&&!grades.length)return <PaywallModal email={user.email??''} payment={params.payment==='success'?'success':params.payment==='cancelled'?'cancelled':undefined}/>;
 return <PaidApp key={user.id} userId={user.id} email={user.email??''} appAccess={appAccess} worksheetGrades={grades}/>;
}
