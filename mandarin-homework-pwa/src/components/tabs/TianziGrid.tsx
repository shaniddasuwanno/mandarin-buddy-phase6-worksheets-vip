'use client';
import { useEffect,useRef,useState } from 'react';
import type HanziWriter from 'hanzi-writer';
import type { Language } from '@/lib/translations';

export type WritingMode='study'|'animate'|'trace';
/** Traditional 田字格 frame: reusable in study, games and paper worksheets. */
export function TianziFrame({children,className=''}:{children?:React.ReactNode;className?:string}){
 return <div className={`tianzi-frame relative aspect-square overflow-hidden border border-emerald-600 bg-white ${className}`}><span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-emerald-300"/><span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-emerald-300"/>{children}</div>;
}

export default function TianziGrid({character,mode,lang,onComplete}:{character:string;mode:WritingMode;lang:Language;onComplete?:()=>void}){
 const target=useRef<HTMLDivElement>(null);const latestComplete=useRef(onComplete);latestComplete.current=onComplete;
 const [status,setStatus]=useState<'loading'|'ready'|'error'|'done'>(mode==='study'?'ready':'loading');
 const [retry,setRetry]=useState(0);const writer=useRef<HanziWriter|null>(null);
 useEffect(()=>{
  if(mode==='study'){setStatus('ready');return;}
  let cancelled=false;let observer:ResizeObserver|undefined;const el=target.current;if(!el)return;setStatus('loading');
  const controller=new AbortController();
  const start=async()=>{try{
   const {default:HW}=await import('hanzi-writer');if(cancelled)return;el.replaceChildren();
   const size=Math.max(40,Math.round(el.clientWidth||130));
   const w=HW.create(el,character,{width:size,height:size,padding:Math.round(size*.1),showOutline:true,showCharacter:mode==='animate',strokeColor:'#065f46',outlineColor:'#cbd5e1',highlightColor:'#f59e0b',drawingColor:'#0f766e',strokeAnimationSpeed:.85,delayBetweenStrokes:350,
    charDataLoader:(char,onLoad,onError)=>{void fetch(`/hanzi/${encodeURIComponent(char)}.json`,{signal:controller.signal}).then(r=>{if(!r.ok)throw new Error('Missing character');return r.json()}).then(d=>{if(!cancelled)onLoad(d)}).catch(e=>{if(!cancelled)onError(e)});},
    onLoadCharDataSuccess:()=>{if(cancelled)return;setStatus('ready');},onLoadCharDataError:()=>{if(!cancelled)setStatus('error')},
   });writer.current=w;
   if(typeof ResizeObserver!=='undefined'){observer=new ResizeObserver(()=>{if(cancelled)return;const next=Math.max(40,Math.round(el.clientWidth));w.updateDimensions({width:next,height:next,padding:Math.round(next*.1)});});observer.observe(el);}
   await w.getCharacterData();if(cancelled)return;
   if(mode==='animate'){const result=await w.animateCharacter();if(!cancelled&&!result?.canceled){setStatus('done');latestComplete.current?.();}}
   else await w.quiz({showHintAfterMisses:2,highlightOnComplete:true,onComplete:()=>{if(!cancelled){setStatus('done');latestComplete.current?.();}}});
  }catch{if(!cancelled)setStatus('error')}};void start();
  return()=>{cancelled=true;controller.abort();observer?.disconnect();const old=writer.current;old?.cancelQuiz();if(old)void old.hideCharacter({duration:0}).catch(()=>{});writer.current=null;el.replaceChildren();};
 },[character,mode,retry]);
 const th=lang==='th';return <div className="min-w-0"><TianziFrame className="rounded-xl"><div ref={target} className="absolute inset-0" style={{touchAction:mode==='trace'?'none':'auto'}} aria-label={mode==='trace'?`${th?'ฝึกเขียน':'Trace'} ${character}`:character}/>{(mode==='study'||status==='error'||status==='loading')&&<div lang="zh-CN" className={`pointer-events-none absolute inset-0 grid place-items-center font-bold text-emerald-950 ${status==='loading'?'opacity-25':''}`} style={{fontSize:'clamp(2.2rem, 11vw, 5rem)'}}>{character}</div>}{status==='done'&&<span aria-hidden="true" className="absolute right-1 top-1 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">✓</span>}</TianziFrame>{status==='loading'&&<p role="status" className="mt-1 text-center text-xs text-slate-500">{th?'กำลังโหลดขีด…':'Loading strokes…'}</p>}{status==='error'&&<button onClick={()=>setRetry(i=>i+1)} className="mt-1 w-full rounded-lg bg-rose-50 px-2 py-2 text-xs font-bold text-rose-800">{th?'โหลดไม่ได้ · ลองใหม่':'Could not load · retry'}</button>}</div>;
}
