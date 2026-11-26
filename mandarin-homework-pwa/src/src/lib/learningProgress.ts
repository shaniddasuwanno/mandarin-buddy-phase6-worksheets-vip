import { allLearningWords,curriculumVocab,getStudyWeeks,studyWordsForGrade } from '@/data/studyCurriculum';

import {learningGrades} from '@/data/sampleVocab';
export const PROGRESS_EVENT='mb-progress-changed';
export type Progress = { days: string[]; dictation: { correct: number; total: number }; words: Record<string, number>; games: number; learned?:string[] };
const KEY = 'mb-learning-progress-v1';
export const REVIEW_KEY = 'mb-dictation-missed-v1';
let accountScope:string|null=null;
export function setLearningAccountScope(userId:string){accountScope=userId;}
const scoped=(key:string)=>accountScope?`${key}:${accountScope}`:key;
export function reviewStorageKey(){return scoped(REVIEW_KEY);}
const empty = (): Progress => ({days:[],dictation:{correct:0,total:0},words:{},games:0});
const ids = new Set(allLearningWords.map(w=>w.id));
export function todayKey(date = new Date()) { const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);return ['year','month','day'].map(k=>parts.find(p=>p.type===k)?.value).join('-'); }
export function readProgress(): Progress {
  try { const raw=JSON.parse(localStorage.getItem(scoped(KEY))??'null'); if(raw && Array.isArray(raw.days) && raw.dictation && raw.words){const count=(v:unknown)=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0?v:0;const total=count(raw.dictation.total);return {days:[...new Set<string>(raw.days.filter((v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)))],dictation:{total,correct:Math.min(total,count(raw.dictation.correct))},words:Object.fromEntries(Object.entries(raw.words).filter(([id])=>ids.has(id)).map(([id,v])=>[id,count(v)])),games:count(raw.games),learned:Array.isArray(raw.learned)?raw.learned.filter((id:unknown):id is string=>typeof id==='string'&&ids.has(id)):[]}; }} catch {} return empty();
}
export function readWeakWords(): string[] {
  try { const x=JSON.parse(localStorage.getItem(reviewStorageKey())??'[]'); if(Array.isArray(x)) return [...new Set(x.filter((id):id is string=>typeof id==='string'&&ids.has(id)))]; } catch {} return [];
}
function save(p:Progress){ try { localStorage.setItem(scoped(KEY),JSON.stringify(p));window.dispatchEvent(new Event(PROGRESS_EVENT)); } catch {} }
function markDay(p:Progress){const day=todayKey();if(!p.days.includes(day))p.days.push(day);}
export function recordDictation(id:string,correct:boolean){const p=readProgress();markDay(p);p.dictation.total++;if(correct)p.dictation.correct++;p.words[id]=correct?(p.words[id]??0)+1:0;save(p);}
export function recordLearned(id:string){if(!ids.has(id))return;const p=readProgress();if(p.learned?.includes(id)||Object.hasOwn(p.words,id))return;p.learned=[...(p.learned??[]),id];markDay(p);save(p);}
export function milestoneStats(p:Progress){const learned=new Set([...(p.learned??[]),...Object.keys(p.words)]);return {learned:curriculumVocab.filter(w=>learned.has(w.id)).length,totalWords:curriculumVocab.length,mastered:masteredCount(p),setsDone:learningGrades.reduce<number>((n,g)=>n+getStudyWeeks(g).filter(w=>studyWordsForGrade(g,w.week).every(v=>learned.has(v.id))).length,0)};}
export function recordGameActivity(id?:string){const p=readProgress();markDay(p);p.games++;if(id&&ids.has(id)&&!p.learned?.includes(id)&&!Object.hasOwn(p.words,id))p.learned=[...(p.learned??[]),id];save(p);}
export function currentStreak(days:string[],now=new Date()){const set=new Set(days);const date=new Date(now);if(!set.has(todayKey(date)))date.setUTCDate(date.getUTCDate()-1);let n=0;while(set.has(todayKey(date))){n++;date.setUTCDate(date.getUTCDate()-1);}return n;}
export function masteredCount(p:Progress){return curriculumVocab.filter(w=>(p.words[w.id]??0)>=2).length;}
