'use client';
import {useEffect,useRef,useState} from 'react';
import {beginAudioSession,endAudioSession,speakMandarin} from './mandarinSpeech';
export function useMandarinSpeech(){
 const [error,setError]=useState(false),[speaking,setSpeaking]=useState(false),id=useRef(0);
 function stop(){endAudioSession(id.current);id.current=0;setSpeaking(false)}
 useEffect(()=>()=>endAudioSession(id.current),[]);
 function speak(text:string,rate?:number,after?:()=>void){stop();setError(false);const session=beginAudioSession(()=>{id.current=0;setSpeaking(false)});id.current=session;setSpeaking(true);speakMandarin(session,text,{rate,onEnd:()=>{endAudioSession(session);setSpeaking(false);after?.()},onError:()=>{endAudioSession(session);setSpeaking(false);setError(true)}})}
 return {speak,stop,error,speaking}
}
