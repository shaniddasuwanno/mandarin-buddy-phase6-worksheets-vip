import { grades, type Grade } from '@/data/sampleVocab';
import type { Language } from '@/lib/translations';

export default function GradeSelector({ lang, grade, onGradeChange }: { lang: Language; grade: Grade; onGradeChange: (grade: Grade) => void }) {
  return <section className="mt-5"><h3 className="mb-3 font-bold text-emerald-950">{lang === 'th' ? 'เลือกชั้นเรียน' : 'Choose a grade'}</h3><div role="group" aria-label={lang === 'th' ? 'ชั้นเรียน' : 'Grade'} className="grid grid-cols-6 gap-1.5">{grades.map(g => <button key={g} type="button" onClick={() => onGradeChange(g)} aria-pressed={g === grade} className={`min-h-12 rounded-xl border px-1 py-2 text-sm font-bold transition ${g === grade ? 'border-emerald-700 bg-emerald-700 text-white shadow-sm' : 'border-emerald-100 bg-white text-emerald-800 hover:bg-emerald-50'}`}>{lang === 'th' ? 'ป.' : 'P.'}{g}</button>)}</div></section>;
}
