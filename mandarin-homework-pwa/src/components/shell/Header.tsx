'use client';
import {useSpeechSpeed,setSpeechSpeed} from '@/lib/mandarinSpeech';
import { Languages } from 'lucide-react';
import { translations, type Language } from '@/lib/translations';
import { PandaFace } from '@/components/WordCartoonIllustration';

export default function Header({language,onLanguageChange}:{language:Language;onLanguageChange:(language:Language)=>void}) {
  const t=translations[language],speed=useSpeechSpeed(),th=language==='th';
  return <header className="kid-header sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3"><div aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-100"><PandaFace className="h-11 w-11 mascot-float"/></div><div><h1 className="text-lg font-extrabold leading-tight text-emerald-950">{t.brand}</h1><p className="text-xs text-slate-500">{t.tagline}</p></div></div>
      <div className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 p-1" role="group" aria-label={t.language}><Languages className="ml-1 hidden h-4 w-4 text-slate-500 sm:block"/>{(['th','en'] as const).map(l=><button key={l} type="button" aria-pressed={language===l} onClick={()=>onLanguageChange(l)} className={`rounded-full px-3 py-2 text-xs font-bold ${language===l?'bg-emerald-700 text-white':'text-slate-600 hover:bg-white'}`}>{l==='th'?'ไทย':'EN'}</button>)}</div>
    </div>
    <div className="mx-auto flex max-w-3xl justify-center gap-2 px-4 pb-2" role="group" aria-label={th?'ความเร็วเสียงภาษาจีน':'Global Mandarin audio speed'}>{([{rate:.65,th:'🐢 ช้า ชัดเจน',en:'🐢 Slow & clear'},{rate:.9,th:'🐇 ปกติ',en:'🐇 Clear normal'}] as const).map(s=><button key={s.rate} type="button" aria-pressed={speed===s.rate} onClick={()=>setSpeechSpeed(s.rate)} className={"flex-1 rounded-xl border-2 px-2 py-2 text-xs font-black "+(speed===s.rate?'border-emerald-500 bg-emerald-100 text-emerald-900':'border-slate-100 bg-slate-50 text-slate-600')}>{th?s.th:s.en} · {s.rate}×</button>)}</div>
  </header>;
}
