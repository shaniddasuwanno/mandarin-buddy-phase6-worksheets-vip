'use client';
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles,LogOut } from 'lucide-react';
import Header from '@/components/shell/Header';
import BottomNav from '@/components/shell/BottomNav';
import ExploreTab from '@/components/tabs/ExploreTab';
import PinyinTab from '@/components/tabs/PinyinTab';
import SongsTab from '@/components/tabs/SongsTab';
import NumbersTab from '@/components/tabs/NumbersTab';
import DictationTab from '@/components/tabs/DictationTab';
import GamesTab from '@/components/tabs/GamesTab';
import HomeworkTab from '@/components/tabs/HomeworkTab';
import ProgressTab from '@/components/tabs/ProgressTab';
import WorksheetsTab from '@/components/tabs/WorksheetsTab';
import RedeemCode from '@/components/RedeemCode';
import {PandaFace} from '@/components/WordCartoonIllustration';
import { translations,type Tab } from '@/lib/translations';
import type { Grade, LearningGrade } from '@/data/sampleVocab';
import { browserSupabase } from '@/lib/supabase/browser';
import { useAppLanguage } from '@/lib/useAppLanguage';
import { setLearningAccountScope } from '@/lib/learningProgress';
export default function PaidApp({userId,email,appAccess=true,worksheetGrades=[]}:{userId:string;email:string;appAccess?:boolean;worksheetGrades?:Grade[]}){
 const [language,setLanguage]=useAppLanguage();const [tab,setTab]=useState<Tab>(appAccess?'explore':'worksheets');const [grade,setGrade]=useState<LearningGrade>(appAccess?1:worksheetGrades[0]??1);const [review,setReview]=useState(false);const [ready,setReady]=useState(false);const [error,setError]=useState(false);const [busy,setBusy]=useState(false);const router=useRouter();const t=translations[language];const th=language==='th';const active=appAccess?tab:'worksheets';
 useEffect(()=>{setLearningAccountScope(userId);setReady(true)},[userId]);
 // Re-check entitlement on focus and periodically; the server remains authoritative.
 useEffect(()=>{const refresh=()=>router.refresh();window.addEventListener('focus',refresh);const timer=window.setInterval(refresh,60000);return()=>{window.removeEventListener('focus',refresh);clearInterval(timer)}},[router]);
 useEffect(()=>{if(window.location.search.includes('payment=success'))window.history.replaceState(null,'','/');},[]);
 async function logout(){setBusy(true);setError(false);try{const {error}=await browserSupabase().auth.signOut();if(error)throw error;window.location.replace('/')}catch{setError(true);setBusy(false)}}
 function changeTab(next:Tab){if(!appAccess&&next!=='worksheets')return;setReview(false);setTab(next);}
 return <div className="kids-app min-h-dvh text-slate-800"><Header language={language} onLanguageChange={setLanguage}/><main id="main" className="mx-auto max-w-3xl px-4 pt-5" style={{paddingBottom:'calc(10rem + env(safe-area-inset-bottom))'}}><div className="mb-3 flex items-center justify-between gap-2 text-xs text-slate-500"><p className="min-w-0 truncate">{email}</p><div className="flex shrink-0 gap-3"><Link href="/pricing" className="font-bold text-emerald-800">{th?'แพ็กเกจ':'Packages'}</Link><button disabled={busy} onClick={()=>void logout()} className="flex items-center gap-1 font-bold text-emerald-800"><LogOut size={14}/>{th?'ออกจากระบบ':'Sign out'}</button></div></div><div className="mb-3"><RedeemCode lang={language}/></div>{error&&<p role="alert" className="mb-3 text-sm text-rose-700">{th?'ออกจากระบบไม่สำเร็จ กรุณาลองใหม่':'Could not sign out. Please try again.'}</p>}<section className="kid-hero relative overflow-hidden rounded-3xl p-6 pr-24"><div className="relative z-10 max-w-[85%]"><div className="mb-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold"><Sparkles size={14}/>{appAccess?(th?'สมาชิกแอปตลอดชีพ':'Lifetime app member'):(th?'สมาชิกใบงาน':'Worksheet member')}</div><h2 className="text-2xl font-extrabold leading-snug sm:text-3xl">{t[active].title}</h2><p className="mt-2 text-sm leading-relaxed text-emerald-950">{t[active].description}</p></div><PandaFace className="absolute bottom-2 right-2 h-20 w-20 mascot-float"/></section>
 {ready&&(active==='worksheets'?<WorksheetsTab lang={language} grade={grade===0?1:grade} onGradeChange={setGrade} appAccess={appAccess} worksheetGrades={worksheetGrades}/>:active==='numbers'?<NumbersTab lang={language}/>:active==='songs'?<SongsTab lang={language}/>:active==='pinyin'?<PinyinTab lang={language}/>:active==='explore'?<ExploreTab lang={language} grade={grade} onGradeChange={setGrade}/>:active==='dictation'?<DictationTab lang={language} grade={grade} onGradeChange={setGrade} startInReview={review}/>:active==='games'?<GamesTab lang={language} grade={grade} onGradeChange={setGrade}/>:active==='homework'?<HomeworkTab lang={language}/>:<ProgressTab lang={language} onPractice={g=>{setGrade(g);setReview(true);setTab('dictation')}}/>)}
 {appAccess&&<p className="mt-5 text-center text-xs leading-relaxed text-slate-500">{th?'ความก้าวหน้าบันทึกบนอุปกรณ์นี้':'Learning progress is saved on this device.'}</p>}</main><BottomNav appAccess={appAccess} language={language} active={active} onChange={changeTab}/></div>;
}
