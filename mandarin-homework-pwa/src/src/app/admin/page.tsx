import Link from 'next/link';
import VipAdmin from '@/components/VipAdmin';
import { verifiedAdmin } from '@/lib/vipServer';
export const dynamic='force-dynamic';
export default async function AdminPage(){let authorized=false;try{authorized=!!(await verifiedAdmin())}catch{}if(!authorized)return <main className="mx-auto max-w-md p-6"><h1 className="text-xl font-black">Admin access required</h1><p className="my-3 text-sm">เฉพาะผู้ดูแลระบบที่ได้รับอนุญาต</p><Link className="font-bold text-emerald-700" href="/">Sign in / เข้าสู่ระบบ</Link></main>;return <VipAdmin/>}
