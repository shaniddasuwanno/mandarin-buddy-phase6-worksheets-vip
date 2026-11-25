import { allLearningWords,curriculumVocab } from '@/data/studyCurriculum';

export type Progress = { days: string[]; dictation: { correct: number; total: number }; words: Record<string, number>; games: number };
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
  try { const raw=JSON.parse(localStorage.getItem(scoped(KEY))??'null'); if(raw && Array.isArray(raw.days) && raw.dictation && raw.words){const count=(v:unknown)=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0?v:0;const total=count(raw.dictation.total);return {days:[...new Set<string>(raw.days.filter((v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)))],dictation:{total,correct:Math.min(total,count(raw.dictation.correct))},words:Object.fromEntries(Object.entries(raw.words).filter(([id])=>ids.has(id)).map(([id,v])=>[id,count(v)])),games:count(raw.games)}; }} catch {} return empty();
}
export function readWeakWords(): string[] {
  try { const x=JSON.parse(localStorage.getItem(reviewStorageKey())??'[]'); if(Array.isArray(x)) return [...new Set(x.filter((id):id is string=>typeof id==='string'&&ids.has(id)))]; } catch {} return [];
}
function save(p:Progress){ try { localStorage.setItem(scoped(KEY),JSON.stringify(p)); } catch {} }
function markDay(p:Progress){const day=todayKey();if(!p.days.includes(day))p.days.push(day);}
export function recordDictation(id:string,correct:boolean){const p=readProgress();markDay(p);p.dictation.total++;if(correct)p.dictation.correct++;p.words[id]=correct?(p.words[id]??0)+1:0;save(p);}
export function recordGameActivity(){const p=readProgress();markDay(p);p.games++;save(p);}
export function currentStreak(days:string[],now=new Date()){const set=new Set(days);const date=new Date(now);if(!set.has(todayKey(date)))date.setUTCDate(date.getUTCDate()-1);let n=0;while(set.has(todayKey(date))){n++;date.setUTCDate(date.getUTCDate()-1);}return n;}
export function masteredCount(p:Progress){return curriculumVocab.filter(w=>(p.words[w.id]??0)>=2).length;}
