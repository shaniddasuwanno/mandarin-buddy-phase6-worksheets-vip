import { BookOpen, Headphones, Gamepad2, Camera, ChartNoAxesCombined,FileText } from 'lucide-react';
import { translations, type Language, type Tab } from '@/lib/translations';
const tabs = [{id:'explore',icon:BookOpen},{id:'dictation',icon:Headphones},{id:'games',icon:Gamepad2},{id:'homework',icon:Camera},{id:'progress',icon:ChartNoAxesCombined},{id:'worksheets',icon:FileText}] as const;
export default function BottomNav({language,active,onChange,appAccess=true}:{language:Language;active:Tab;onChange:(tab:Tab)=>void;appAccess?:boolean}){
  const t=translations[language];
  return <nav aria-label={t.navigation} className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-100 bg-white/95 backdrop-blur" style={{paddingBottom:'env(safe-area-inset-bottom)'}}><div className={`mx-auto grid max-w-3xl gap-1 px-1 py-2 ${appAccess?'grid-cols-6':'grid-cols-1'}`}>{tabs.filter(t=>appAccess||t.id==='worksheets').map(({id,icon:Icon})=><button key={id} type="button" onClick={()=>onChange(id)} aria-current={active===id?'page':undefined} className={`flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-1 text-center text-[9px] font-bold leading-tight sm:text-xs ${active===id?'bg-emerald-100 text-emerald-800':'text-slate-500 hover:bg-slate-50'}`}><Icon className="h-5 w-5" aria-hidden/><span>{t[id].label}</span></button>)}</div></nav>;
}
