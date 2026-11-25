'use client';
import {useEffect,useRef,useState} from 'react';
import {beginAudioSession,endAudioSession,speakMandarin} from './mandarinSpeech';
import type {Tone} from '@/data/pinyinLab';
import type {MouthMode} from '@/components/PinyinMouthVisual';
type Options={text:string|null;mode:MouthMode;tone:Tone;ride:boolean;label:string};
type Playback={run:number;playing:boolean;mode:MouthMode;ride:boolean;source:'speech'|'pitch';label:string;unavailable:boolean};
const pitchCurves:Record<Tone,number[]>={1:[440,440,440],2:[230,320,470],3:[340,220,420],4:[470,310,180]};
export default function usePinyinPlayback(){
 const [state,setState]=useState<Playback>({run:0,playing:false,mode:'blend',ride:false,source:'speech',label:'',unavailable:false});const token=useRef(0),session=useRef(0),context=useRef<AudioContext|null>(null),timers=useRef<number[]>([]);
 function clear(){token.current++;timers.current.forEach(id=>clearTimeout(id));timers.current=[];endAudioSession(session.current);session.current=0;const old=context.current;context.current=null;if(old)void old.close().catch(()=>{});}
 function stop(mode:MouthMode='blend'){clear();setState(s=>({...s,playing:false,ride:false,label:'',mode,unavailable:false}));}
 useEffect(()=>()=>clear(),[]);
 function play(options:Options){clear();session.current=beginAudioSession(()=>{clear();setState(s=>({...s,playing:false,ride:false,label:''}))});const id=token.current;let started=false,startTime=0,ended=false;const source=options.text?'speech':'pitch';const schedule=(fn:()=>void,ms:number)=>{timers.current.push(window.setTimeout(fn,ms));};
  function begin(unavailable=false){if(token.current!==id||started)return;started=true;startTime=performance.now();setState({run:id,playing:true,mode:options.mode,ride:options.ride,source,label:options.label,unavailable});}
  function end(unavailable=false){if(token.current!==id||ended)return;ended=true;if(!started)begin(unavailable);if(unavailable)setState(s=>({...s,unavailable:true}));schedule(()=>{if(token.current===id){endAudioSession(session.current);setState(s=>({...s,playing:false}))}},Math.max(0,1150-(performance.now()-startTime)));}
  if(!options.text){begin();try{const Audio=window.AudioContext??(window as unknown as {webkitAudioContext?:typeof AudioContext}).webkitAudioContext;if(!Audio)throw new Error();const ctx=new Audio();context.current=ctx;void ctx.resume().then(()=>{if(token.current!==id)return;const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime;const curve=pitchCurves[options.tone];o.type='sine';o.frequency.setValueAtTime(curve[0],t);o.frequency.linearRampToValueAtTime(curve[1],t+.47);o.frequency.linearRampToValueAtTime(curve[2],t+1);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.08,t+.06);g.gain.setValueAtTime(.08,t+.89);g.gain.exponentialRampToValueAtTime(.001,t+1.02);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+1.04);o.onended=()=>{if(context.current===ctx){context.current=null;void ctx.close().catch(()=>{})}end()};}).catch(()=>end(true));}catch{end(true)}schedule(()=>end(),1500);return;}
  speakMandarin(session.current,options.text,{onStart:()=>begin(),onEnd:()=>end(),onError:()=>end(true)});schedule(()=>begin(),260);schedule(()=>end(true),30000);
 }
 return {state,play,stop};
}
