'use client';
import {useEffect,useRef,useState} from 'react';
import {beginAudioSession,endAudioSession,speakMandarin} from './mandarinSpeech';
import {songTimeline,type KidsSong} from '@/data/kidsSongs';
type PlayerState={mode:'idle'|'melody'|'speech';line:number;progress:number;error:boolean};
const initial:PlayerState={mode:'idle',line:-1,progress:0,error:false};
export default function useSongPlayer(){
 const [state,setState]=useState<PlayerState>(initial),token=useRef(0),context=useRef<AudioContext|null>(null),raf=useRef(0),timer=useRef<number>(0),session=useRef(0);
 function release(){token.current++;cancelAnimationFrame(raf.current);clearTimeout(timer.current);endAudioSession(session.current);session.current=0;const old=context.current;context.current=null;if(old)void old.close().catch(()=>{})}
 function stop(){release();setState(initial)}
 useEffect(()=>()=>release(),[]);
 async function melody(song:KidsSong,speed=1){
  release();session.current=beginAudioSession(()=>{release();setState(initial)});const id=token.current;setState({...initial,mode:'melody',line:0});try{
   const Audio=window.AudioContext??(window as unknown as {webkitAudioContext?:typeof AudioContext}).webkitAudioContext;if(!Audio)throw Error('Audio unavailable');const ctx=new Audio();context.current=ctx;await ctx.resume();if(id!==token.current)return;const timeline=songTimeline(song,speed),start=ctx.currentTime+.06;
   const master=ctx.createGain();master.gain.value=.2;master.connect(ctx.destination);
   for(const note of timeline.notes){const t=start+note.at,d=note.duration;const envelope=ctx.createGain();envelope.gain.setValueAtTime(.001,t);envelope.gain.linearRampToValueAtTime(.75,t+Math.min(.025,d*.1));envelope.gain.exponentialRampToValueAtTime(.09,t+d*.68);envelope.gain.exponentialRampToValueAtTime(.001,t+d*.96);envelope.connect(master);for(const [multiple,amount] of [[1,1],[2,.18],[3,.05]]){const osc=ctx.createOscillator(),harmonic=ctx.createGain();osc.type='sine';osc.frequency.value=note.frequency*multiple;harmonic.gain.value=amount;osc.connect(harmonic);harmonic.connect(envelope);osc.start(t);osc.stop(t+d)}}
   function tick(){if(id!==token.current)return;const elapsed=Math.max(0,ctx.currentTime-start);if(elapsed>=timeline.total){if(context.current===ctx){context.current=null;void ctx.close().catch(()=>{})}endAudioSession(session.current);setState({mode:'idle',line:song.lyrics.length-1,progress:1,error:false});return}const line=timeline.lines.findIndex(l=>elapsed>=l.start&&elapsed<l.end);setState({mode:'melody',line:Math.max(0,line),progress:Math.min(1,elapsed/timeline.total),error:false});raf.current=requestAnimationFrame(tick)}raf.current=requestAnimationFrame(tick)
  }catch{if(id===token.current){release();setState({...initial,error:true})}}
 }
 function read(song:KidsSong,only?:number){release();session.current=beginAudioSession(()=>{release();setState(initial)});const id=token.current;const fail=()=>{if(id===token.current){release();setState({...initial,error:true})}};try{
   function next(i:number){if(id!==token.current)return;setState({mode:'speech',line:i,progress:i/song.lyrics.length,error:false});const onEnd=()=>{if(id!==token.current)return;clearTimeout(timer.current);if(only!==undefined||i===song.lyrics.length-1){endAudioSession(session.current);setState({mode:'idle',line:i,progress:(i+1)/song.lyrics.length,error:false});return}timer.current=window.setTimeout(()=>next(i+1),500)};timer.current=window.setTimeout(fail,30000);speakMandarin(session.current,song.lyrics[i].hanzi,{onEnd,onError:fail})}
   next(only??0)
  }catch{fail()}}
 return {state,melody,read,stop}
}
