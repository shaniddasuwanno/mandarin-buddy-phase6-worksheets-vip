import { Languages } from 'lucide-react';
import { translations, type Language } from '@/lib/translations';

export default function Header({language,onLanguageChange}:{language:Language;onLanguageChange:(language:Language)=>void}) {
  const t=translations[language];
  return <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3"><div aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-100 text-2xl">🐼</div><div><h1 className="text-lg font-extrabold leading-tight text-emerald-950">{t.brand}</h1><p className="text-xs text-slate-500">{t.tagline}</p></div></div>
      <div className="flex shrink-0 items-center gap-1 rounded-full bg-slate-100 p-1" role="group" aria-label={t.language}><Languages className="ml-1 hidden h-4 w-4 text-slate-500 sm:block"/>{(['th','en'] as const).map(l=><button key={l} type="button" aria-pressed={language===l} onClick={()=>onLanguageChange(l)} className={`rounded-full px-3 py-2 text-xs font-bold ${language===l?'bg-emerald-700 text-white':'text-slate-600 hover:bg-white'}`}>{l==='th'?'ไทย':'EN'}</button>)}</div>
    </div>
  </header>;
}
