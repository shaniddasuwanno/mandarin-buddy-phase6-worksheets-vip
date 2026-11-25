'use client';
import {useEffect,useRef,useState} from 'react';
import {beginAudioSession,endAudioSession,isAudioSession,speakMandarin} from './mandarinSpeech';
import type {ChantRow} from '@/data/chineseNumbers';
export type ChantSpeed=.6|.85|1.1;
export function useChantPlayer(){
 const [playing,setPlaying]=useState(false),[active,setActive]=useState(-1),[error,setError]=useState(false),[cycles,setCycles]=useState(0),session=useRef(0),timer=useRef(0),loopRef=useRef(false);
 function release(){clearTimeout(timer.current);endAudioSession(session.current);session.current=0}
 function stop(){release();setPlaying(false);setActive(-1)}
 useEffect(()=>()=>release(),[]);
 function setLoop(next:boolean){loopRef.current=next}
 function start(rows:ChantRow[],rate:ChantSpeed,only?:number){stop();setError(false);setCycles(0);const id=beginAudioSession(()=>{release();setPlaying(false);setActive(-1)});session.current=id;setPlaying(true);
  function fail(){if(!isAudioSession(id))return;release();setPlaying(false);setError(true)}
  function next(i:number){if(!isAudioSession(id))return;setActive(i);timer.current=window.setTimeout(fail,30000);
   speakMandarin(id,rows[i].hanzi,{rate,onEnd:()=>{if(!isAudioSession(id))return;clearTimeout(timer.current);if(only!==undefined){release();setPlaying(false);return}
    if(i===rows.length-1){setCycles(c=>c+1);if(!loopRef.current){release();setPlaying(false);return}}
    timer.current=window.setTimeout(()=>next((i+1)%rows.length),rate===.6?950:rate===.85?650:400);
   },onError:fail})
  }
  next(only??0);
 }
 return {playing,active,error,cycles,start,stop,setLoop}
}
