'use client';
import type {LearningGrade} from '@/data/sampleVocab';
import type {Language} from '@/lib/translations';
import {getStudyWeeks,kindergartenReviewSets} from '@/data/studyCurriculum';
export default function WeekSelector({grade,week,lang,onChange}:{grade:LearningGrade;week:number;lang:Language;onChange:(week:number)=>void}){
  const weeks=getStudyWeeks(grade),th=lang==='th';if(!weeks.length)return null;
  return <section className="mt-4 rounded-2xl border border-sky-100 bg-white p-3"><label htmlFor="study-week" className="block text-sm font-black text-emerald-900">{th?'เลือกหัวข้อคำศัพท์':'Choose vocabulary topic'}</label><select id="study-week" value={week} onChange={e=>onChange(Number(e.target.value))} className="mt-2 w-full rounded-xl border-2 border-sky-200 bg-sky-50 p-3 text-sm font-bold text-sky-900">{weeks.map(w=><option key={w.week} value={w.week}>{th?'หัวข้อ':'Topic'} {w.week} · {th?w.title_th:w.title_en}</option>)}</select><p className="mt-2 text-xs text-slate-500">{grade===0?(th?'10 หัวข้อ · 20 คำต่อหัวข้อ':'10 topics · 20 words per topic'):(th?'8 หัวข้อ · 10 คำต่อหัวข้อ':'8 topics · 10 words per topic')}</p></section>
}
