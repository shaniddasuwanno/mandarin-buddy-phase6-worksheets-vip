'use client';
import {rewardAnswer} from '@/utils/soundEffects';
import { useRef,useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { recordGameActivity } from '@/lib/learningProgress';
import type { Language } from '@/lib/translations';
import TianziGrid,{type WritingMode} from './TianziGrid';

/** Mount exactly one active Hanzi Writer per word. Repeated characters occupy separate positions. */
export default function SequentialWordWriting({word,mode,lang,focusChar,onDone}:{word:string;mode:WritingMode;lang:Language;focusChar?:string|null;onDone?:()=>void}){
 const chars=Array.from(word);const [index,setIndex]=useState(0);const current=useRef(0);const th=lang==='th';const running=mode!=='study'&&index<chars.length;
 function finish(i:number){if(mode==='study'||i!==current.current||i>=chars.length)return;current.current=i+1;setIndex(i+1);if(mode==='trace'){recordGameActivity();rewardAnswer(true,i+1===chars.length);}if(i+1===chars.length)onDone?.()}
 return <div data-writing-mode={mode}><div className="mx-auto grid max-w-md gap-3" style={{gridTemplateColumns:`repeat(${Math.min(chars.length,3)},minmax(0,1fr))`}}>{chars.map((ch,i)=>{const active=running&&i===index,done=mode!=='study'&&i<index;return <div key={i} data-character-index={i} data-active={active?'true':'false'} data-complete={done?'true':'false'} className={`relative min-w-0 rounded-xl ${chars.length===1?'mx-auto w-full max-w-[220px]':''} ${active?'active-writing-box':mode==='study'&&focusChar===ch?'ring-2 ring-amber-400 ring-offset-2':''}`}><TianziGrid character={ch} mode={active?mode:'study'} lang={lang} onComplete={()=>finish(i)}/>{done&&<CheckCircle2 aria-label={th?'เสร็จแล้ว':'Complete'} className="absolute -right-1 -top-1 rounded-full bg-white text-emerald-600" size={20}/>}</div>})}</div>{mode!=='study'&&<p role="status" className="mt-3 text-center text-sm font-black text-emerald-800">{index===chars.length?(mode==='trace'?(th?'เก่งมาก! เขียนครบแล้ว 🎉':'Great job! All characters traced 🎉'):(th?'ดูวิธีเขียนครบแล้ว 🎉':'All characters demonstrated 🎉')):`${mode==='trace'?(th?'แตะและลากตามลำดับขีดในแต่ละช่อง':'Trace the strokes in order inside every box'):(th?'ดูขีดทีละอักษร':'Watch one character at a time')} · ${index}/${chars.length} · ${th?'อักษร':'Character'} ${index+1}`}</p>}</div>
}
