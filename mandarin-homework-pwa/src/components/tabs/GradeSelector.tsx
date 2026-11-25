import { learningGrades, type LearningGrade } from '@/data/sampleVocab';
import type { Language } from '@/lib/translations';

export default function GradeSelector({ lang, grade, onGradeChange, includeKindergarten=true }: { lang: Language; grade: LearningGrade; onGradeChange: (grade: LearningGrade) => void; includeKindergarten?:boolean }) {
  return <section className="mt-5"><h3 className="mb-3 font-bold text-emerald-950">{lang === 'th' ? 'เลือกชั้นเรียน' : 'Choose a grade'}</h3><div role="group" aria-label={lang === 'th' ? 'ชั้นเรียน' : 'Grade'} className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">{learningGrades.filter(g=>includeKindergarten||g!==0).map(g => <button key={g} type="button" onClick={() => onGradeChange(g)} aria-pressed={g === grade} data-grade={g} className="grade-badge min-h-12 rounded-xl border px-1 py-2 text-sm font-black transition">{g===0?(lang==='th'?'อนุบาล':'K'):(lang==='th'?'ป.':'P.')+g}</button>)}</div></section>;
}
