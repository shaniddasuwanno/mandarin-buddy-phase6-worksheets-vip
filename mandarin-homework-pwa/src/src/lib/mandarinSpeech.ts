'use client';
import {useSyncExternalStore} from 'react';
export type SpeechSpeed=.65|.9;
const key='mandarin-buddy-speech-speed';
let speed:SpeechSpeed=.65,loaded=false;
const listeners=new Set<()=>void>();
export function getSpeechSpeed():SpeechSpeed{if(!loaded&&typeof window!=='undefined'){loaded=true;try{speed=window.localStorage.getItem(key)==='0.9'?.9:.65}catch{}}return speed}
export function setSpeechSpeed(next:SpeechSpeed){loaded=true;speed=next;try{window.localStorage.setItem(key,String(next))}catch{};for(const fn of listeners)fn()}
function subscribe(fn:()=>void){listeners.add(fn);return()=>{listeners.delete(fn)}}
export function useSpeechSpeed(){return useSyncExternalStore(subscribe,getSpeechSpeed,()=>.65)}
export function selectMandarinVoice(voices:SpeechSynthesisVoice[]){
 const candidates=voices.filter(v=>/^zh(?:[-_]|$)/i.test(v.lang));
 const score=(v:SpeechSynthesisVoice)=>{const name=v.name??'',lang=v.lang.replaceAll('_','-').toLowerCase();return (lang==='zh-cn'?100:lang.startsWith('zh-hans')?80:lang==='zh-tw'?40:10)+(/xiaoxiao|晓晓|google.*(?:普通话|mandarin|chinese)|tingting|ting-ting|婷婷|ting ting/i.test(name)?40:0)+(/natural|neural|enhanced|premium/i.test(name)?15:0)+(v.default?4:0)};
 return candidates.sort((a,b)=>score(b)-score(a))[0];
}
type Session={id:number;cancel:()=>void};
let active:Session|null=null,serial=0,current:SpeechSynthesisUtterance|null=null;
function cancelNative(){current=null;if(typeof window!=='undefined'&&window.speechSynthesis)window.speechSynthesis.cancel()}
export function beginAudioSession(onInterrupt:()=>void){const old=active;active=null;cancelNative();old?.cancel();const id=++serial;active={id,cancel:onInterrupt};return id}
export function isAudioSession(id:number){return active?.id===id}
export function endAudioSession(id:number){if(!isAudioSession(id))return;active=null;cancelNative()}
type SpeechOptions={rate?:number;onStart?:()=>void;onEnd?:()=>void;onError?:()=>void};
export function speakMandarin(id:number,text:string,options:SpeechOptions={}):boolean{
 if(!isAudioSession(id))return false;
 try{if(typeof window==='undefined'||!window.speechSynthesis||!window.SpeechSynthesisUtterance)throw Error('Speech unavailable');const synth=window.speechSynthesis,voices=synth.getVoices(),voice=selectMandarinVoice(voices);if(voices.length&&!voice)throw Error('No Mandarin voice');
  cancelNative();const u=new SpeechSynthesisUtterance(text);current=u;u.lang='zh-CN';u.rate=options.rate??getSpeechSpeed();u.pitch=1;u.volume=1;if(voice)u.voice=voice;
  const valid=()=>isAudioSession(id)&&current===u;
  u.onstart=()=>{if(valid())options.onStart?.()};u.onend=()=>{if(valid()){current=null;options.onEnd?.()}};u.onerror=()=>{if(valid()){current=null;options.onError?.()}};
  synth.speak(u);return true;
 }catch{if(isAudioSession(id)){current=null;options.onError?.()}return false}
}
