'use client';
import { useEffect, useState } from 'react';
import { Check, X, Volume2, Turtle, Eye, RotateCcw, Sparkles, Headphones, BookOpenCheck } from 'lucide-react';
import { type LearningGrade, type VocabWord } from '@/data/sampleVocab';
import type { Language } from '@/lib/translations';
import { useMandarinSpeech } from '@/lib/useMandarinSpeech';
import GradeSelector from './GradeSelector';
import WeekSelector from './WeekSelector';
import {useStudyWeek} from '@/lib/useStudyWeek';
import {allLearningWords,getStudyWeeks,studyWordsForGrade,isPrimaryWord} from '@/data/studyCurriculum';
import { recordDictation,reviewStorageKey } from '@/lib/learningProgress';

type Props = { lang: Language; grade: LearningGrade; onGradeChange: (grade: LearningGrade) => void; startInReview?:boolean };
type Mode = 'weekly' | 'review';
const validIds = new Set(allLearningWords.map(w => w.id));
const copy = {
  th: {weekly:'เขียนตามคำบอก', review:'ทบทวนอัจฉริยะ', pending:'คำที่ต้องทบทวน', listen:'ฟังแล้วเขียนอักษรจีนลงในสมุด หรือพิมพ์ด้านล่าง', normal:'ความเร็วปกติ', slow:'เสียงช้า', reveal:'เฉลยคำตอบ', correct:'เขียนถูก', missed:'ยังเขียนไม่ถูก', compare:'เปรียบเทียบกับคำตอบของตัวเอง', placeholder:'พิมพ์คำตอบ (ไม่บังคับ)', answer:'คำตอบ', yourAnswer:'คำตอบของคุณ', done:'เก่งมาก! ฝึกครบแล้ว', score:'ตอบถูก', retry:'ฝึกอีกครั้ง', reviewNow:'ทบทวนคำที่พลาด', empty:'ไม่มีคำที่ต้องทบทวนในชั้นนี้', emptyHint:'ไปฝึกเขียนตามคำบอกก่อน คำที่พลาดจะมาอยู่ตรงนี้', back:'เริ่มเขียนตามคำบอก', correctMsg:'เยี่ยมมาก! 🎉', missMsg:'ไม่เป็นไรนะ ลองอีกครั้ง! 💪', error:'ไม่สามารถเล่นเสียงภาษาจีนได้ ลองติดตั้งเสียงภาษาจีนในอุปกรณ์หรือใช้เบราว์เซอร์อื่น', question:'คำที่', loading:'กำลังโหลดคำศัพท์สำหรับทบทวน…', selfCheck:'ตรวจด้วยตัวเอง เลือกคำตอบตามที่เขียนจริง', saved:'บันทึกคำที่ต้องทบทวนบนอุปกรณ์นี้'},
  en: {weekly:'Dictation', review:'Smart Review', pending:'words to review', listen:'Listen, then write the Chinese characters on paper or type below', normal:'Normal speed', slow:'Slow audio', reveal:'Reveal answer', correct:'I got it right', missed:'Missed it', compare:'Compare with your own answer', placeholder:'Type your answer (optional)', answer:'Answer', yourAnswer:'Your answer', done:'Great work! Round complete', score:'correct', retry:'Practise again', reviewNow:'Review missed words', empty:'No words to review for this grade', emptyHint:'Try dictation first. Any missed words will appear here.', back:'Start dictation', correctMsg:'Wonderful job! 🎉', missMsg:'That’s okay. Keep trying! 💪', error:'Mandarin audio could not play. Install a Mandarin voice on your device or try another browser.', question:'Word', loading:'Loading your review words…', selfCheck:'Self-check: mark how you actually did.', saved:'Review words are saved on this device'},
} as const;

export default function DictationTab({lang,grade,onGradeChange,startInReview=false}:Props) {
  const [missed,setMissed] = useState<string[]>([]);
  const [loaded,setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw: unknown = JSON.parse(localStorage.getItem(reviewStorageKey()) ?? '[]');
      if (Array.isArray(raw)) setMissed([...new Set(raw.filter((id): id is string => typeof id === 'string' && validIds.has(id)))]);
    } catch { /* corrupted or unavailable storage */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) { try { localStorage.setItem(reviewStorageKey(), JSON.stringify(missed)); } catch {} } }, [missed,loaded]);
  function onResult(word:VocabWord, correct:boolean) {
    recordDictation(word.id,correct);
    setMissed(previous => correct ? previous.filter(id=>id!==word.id) : previous.includes(word.id) ? previous : [...previous,word.id]);
  }
  return <><GradeSelector lang={lang} grade={grade} onGradeChange={onGradeChange}/>{loaded?<WeeklyTrainer key={grade} lang={lang} grade={grade} missed={missed} onResult={onResult} startInReview={startInReview}/>:<p className="mt-5 text-sm text-slate-500" role="status">{copy[lang].loading}</p>}</>;
}

type TrainerProps={lang:Language;grade:LearningGrade;missed:string[];onResult:(word:VocabWord,correct:boolean)=>void;startInReview:boolean};
function WeeklyTrainer(props:TrainerProps){const [week,setWeek]=useStudyWeek(props.grade);return <><WeekSelector grade={props.grade} week={week} lang={props.lang} onChange={setWeek}/><Trainer key={week} {...props} week={week}/></>}
function Trainer({lang,grade,missed,onResult,startInReview,week}:TrainerProps&{week:number}) {
  const weekly = studyWordsForGrade(grade,week);
  const review = allLearningWords.filter(w=>w.grade===grade&&missed.includes(w.id));
  const c = copy[lang];
  const [mode,setMode] = useState<Mode>(startInReview?'review':'weekly');
  // Keep each round's word list stable even as self-check updates the review queue.
  const [round,setRound] = useState<VocabWord[]>(startInReview?review:weekly);
  const [index,setIndex] = useState(0);
  const [revealed,setRevealed] = useState(false);
  const [answer,setAnswer] = useState('');
  const [results,setResults] = useState<boolean[]>([]);
  const {speak,stop,error} = useMandarinSpeech();
  const complete = round.length>0 && index>=round.length;
  const word = round[index];
  const score = results.filter(Boolean).length;
  const last = results.length>0?results[results.length-1]:null;
  function start(next:Mode) {
    stop();setMode(next);setRound(next==='weekly'?weekly:review);setIndex(0);setRevealed(false);setAnswer('');setResults([]);
  }
  function rate(correct:boolean) {
    if(!revealed||!word)return;
    stop();onResult(word,correct);setResults(old=>[...old,correct]);setIndex(i=>i+1);setRevealed(false);setAnswer('');
  }
  return <section className="mt-5">
    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-emerald-50 p-1.5" role="group" aria-label={c.weekly}>
      <button type="button" aria-pressed={mode==='weekly'} onClick={()=>{if(mode!=='weekly')start('weekly')}} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-bold ${mode==='weekly'?'bg-white text-emerald-800 shadow-sm':'text-slate-600'}`}><Headphones size={18}/>{c.weekly}</button>
      <button type="button" aria-pressed={mode==='review'} onClick={()=>{if(mode!=='review')start('review')}} className={`flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-2 text-sm font-bold ${mode==='review'?'bg-white text-emerald-800 shadow-sm':'text-slate-600'}`}><BookOpenCheck size={18}/>{c.review}<span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-900">{review.length}</span></button>
    </div>
    <p className="my-3 text-xs font-medium text-slate-500">{review.length} {c.pending} · {c.saved}</p>
    {round.length===0?<div className="rounded-3xl border border-emerald-100 bg-white p-7 text-center"><div className="text-5xl">🌱</div><h3 className="mt-3 text-xl font-bold">{c.empty}</h3><p className="mt-2 text-sm text-slate-500">{c.emptyHint}</p><button type="button" onClick={()=>start('weekly')} className="mt-5 min-h-12 rounded-xl bg-emerald-700 px-5 font-bold text-white">{c.back}</button></div>
    :complete?<div className="rounded-3xl border border-emerald-100 bg-white p-7 text-center"><div className="text-6xl" aria-hidden>🏆</div><h3 className="mt-4 text-2xl font-extrabold text-emerald-950">{c.done}</h3><p className="mt-4 text-5xl font-black text-emerald-700">{score}/{round.length}</p><p className="mt-1 text-sm text-slate-500">{c.score}</p><div className="mt-5 grid gap-2"><button type="button" onClick={()=>start(mode)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-200 px-3 font-bold text-emerald-800"><RotateCcw size={18}/>{c.retry}</button>{review.length>0&&<button type="button" onClick={()=>start('review')} className="min-h-12 rounded-xl bg-emerald-700 px-3 font-bold text-white">{c.reviewNow} ({review.length})</button>}{mode==='review'&&<button type="button" onClick={()=>start('weekly')} className="min-h-12 rounded-xl bg-emerald-50 px-3 font-bold text-emerald-800">{c.back}</button>}</div></div>
    :word&&<><div className="flex items-center justify-between text-sm font-bold text-slate-600"><span>{c.question}</span><span aria-live="polite">{index+1}/{round.length}</span></div><div role="progressbar" aria-label={c.question} aria-valuemin={0} aria-valuemax={round.length} aria-valuenow={index+1} className="mt-2 h-2 overflow-hidden rounded-full bg-emerald-100"><div className="h-full rounded-full bg-emerald-600 transition-all" style={{width:`${(index+1)/round.length*100}%`}}/></div>
      {last!==null&&<p role="status" className={`mt-3 rounded-xl px-3 py-2 text-sm font-bold ${last?'bg-emerald-100 text-emerald-800':'bg-amber-50 text-amber-900'}`}>{last?c.correctMsg:c.missMsg}</p>}
      <article className="mt-4 rounded-3xl border border-emerald-100 bg-white p-5 text-center shadow-sm"><div aria-hidden="true" className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Headphones size={38}/></div><h3 className="mt-3 text-lg font-bold text-emerald-950">{c.listen}</h3>
        <div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={()=>speak(word.hanzi)} className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-2 text-sm font-bold text-white"><Volume2 size={18}/>{lang==='th'?'ฟังตามความเร็วที่ตั้งไว้':'Listen at global speed'}</button><button type="button" onClick={()=>speak(word.hanzi,.9)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-2 text-sm font-bold text-white"><Volume2 size={18}/>{c.normal}</button><button type="button" onClick={()=>speak(word.hanzi,.65)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-100 px-2 text-sm font-bold text-amber-900"><Turtle size={18}/>{c.slow}</button></div>
        {isPrimaryWord(word)&&<button type="button" onClick={()=>speak(word.tingxie_callout_zh)} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-100 p-3 text-sm font-bold text-sky-900"><Volume2 size={18}/>{lang==='th'?'ฟังคำใบ้เขียนตามคำบอก':'Hear dictation clue'}</button>}{error&&<p role="status" className="mt-3 text-sm text-rose-700">{c.error}</p>}
        <label className="mt-4 block text-left text-xs font-semibold text-slate-600" htmlFor="dictation-answer">{c.placeholder}</label><input id="dictation-answer" type="text" lang="zh-CN" autoComplete="off" spellCheck={false} value={answer} disabled={revealed} onChange={e=>setAnswer(e.target.value)} placeholder="…" className="mt-1 w-full rounded-xl border border-emerald-100 bg-slate-50 p-4 text-center text-xl outline-emerald-600 disabled:opacity-70"/>
        {!revealed?<button type="button" onClick={()=>setRevealed(true)} className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 font-bold text-emerald-800"><Eye size={19}/>{c.reveal}</button>:<div className="mt-4 rounded-2xl bg-emerald-50 p-4" aria-live="polite"><p className="text-sm font-bold text-emerald-700">{c.answer}</p><p lang="zh-CN" className="mt-2 text-5xl font-black text-emerald-950">{word.hanzi}</p><p className="mt-2 text-lg text-slate-600">{word.pinyin}</p><p className="mt-2 font-bold">{lang==='th'?word.meaningTh:word.meaningEn}</p><p className="mt-3 text-sm text-slate-500">{c.compare}</p></div>}
        {revealed&&<><p className="mt-4 text-xs text-slate-500">{c.selfCheck}</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={()=>rate(true)} className="flex min-h-12 items-center justify-center gap-1 rounded-xl bg-emerald-700 px-2 text-sm font-bold text-white"><Check size={18}/>{c.correct}</button><button type="button" onClick={()=>rate(false)} className="flex min-h-12 items-center justify-center gap-1 rounded-xl bg-rose-100 px-2 text-sm font-bold text-rose-800"><X size={18}/>{c.missed}</button></div></>}
      </article><div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">{round.map((w,i)=><span key={w.id} className={`h-2.5 w-2.5 rounded-full ${i<index?(results[i]?'bg-emerald-500':'bg-rose-400'):i===index?'bg-amber-400':'bg-slate-200'}`}/>)}</div></>}
    {mode==='review'&&review.length>0&&<div className="mt-5 flex items-center gap-2 text-xs text-emerald-800"><Sparkles size={16}/><span>{review.length} {c.pending}</span></div>}
  </section>;
}
