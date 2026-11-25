'use client';
import type {LearningGrade} from '@/data/sampleVocab';
import type {Language} from '@/lib/translations';
import {getStudyWeeks,kindergartenReviewSets} from '@/data/studyCurriculum';
export default function WeekSelector({grade,week,lang,onChange}:{grade:LearningGrade;week:number;lang:Language;onChange:(week:number)=>void}){
  const weeks=getStudyWeeks(grade),th=lang==='th';if(!weeks.length)return null;
  return <section className="mt-4 rounded-2xl border border-sky-100 bg-white p-3"><label htmlFor="study-week" className="block text-sm font-black text-emerald-900">{th?'เลือกชุดคำศัพท์ประจำสัปดาห์':'Choose weekly vocabulary set'}</label><select id="study-week" value={week} onChange={e=>onChange(Number(e.target.value))} className="mt-2 w-full rounded-xl border-2 border-sky-200 bg-sky-50 p-3 text-sm font-bold text-sky-900">{grade!==0&&<option value={0}>{th?'ชุดคำศัพท์พื้นฐานเดิม':'Original starter deck'}</option>}{weeks.map(w=><option key={w.week} value={w.week}>{th?'สัปดาห์':'Week'} {w.week} · {th?w.title_th:w.title_en}</option>)}{grade===0&&<optgroup label={th?'หมวดคำศัพท์ทบทวน':'Category review'}>{kindergartenReviewSets.map(w=><option key={w.week} value={w.week}>{th?w.title_th:w.title_en} · 20</option>)}</optgroup>}</select><p className="mt-2 text-xs text-slate-500">{grade===0?(th?'8 สัปดาห์ · 25 คำต่อสัปดาห์ · 10 หมวด':'8 weeks · 25 words per week · 10 categories'):(th?'8 สัปดาห์ · 10 คำต่อสัปดาห์':'8 weeks · 10 words per week')}</p></section>
}
