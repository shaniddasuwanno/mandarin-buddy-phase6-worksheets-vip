'use client';
let context: AudioContext | undefined;
let streak=0;
function tones(notes: number[], spacing=.095, type:OscillatorType='sine') {
  if(typeof window==='undefined')return;
  try {
    const Audio=window.AudioContext??(window as unknown as {webkitAudioContext?:typeof AudioContext}).webkitAudioContext;
    if(!Audio)return; context??=new Audio();const audio=context;
    void audio.resume().then(()=>{let t=audio.currentTime;for(const note of notes){const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=note;g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.075,t+.018);g.gain.exponentialRampToValueAtTime(.001,t+.19);o.connect(g);g.connect(audio.destination);o.start(t);o.stop(t+.2);t+=spacing;}}).catch(()=>{});
  }catch{/* Audio may not be supported or permitted. */}
}
export function playCorrectDing(){tones([659.25,880])}
export function playComboDing(count:number){tones([523.25,659.25,783.99,Math.min(1318.5,880+count*30)])}
export function playWrongBoop(){tones([330,220],.12,'triangle')}
export function playCelebrationFanfare(){tones([523.25,659.25,783.99,1046.5,783.99,1046.5],.13)}
export function confetti(){if(typeof document==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const layer=document.createElement('div');layer.className='reward-confetti';layer.setAttribute('aria-hidden','true');for(let i=0;i<24;i++){const p=document.createElement('i');p.style.setProperty('--x',`${Math.random()*100}vw`);p.style.setProperty('--spin',`${Math.random()*720-360}deg`);p.style.background=['#ffd34e','#6ad9bc','#8ccaff','#ff9db7'][i%4];p.style.animationDelay=`${Math.random()*.3}s`;layer.append(p)}document.body.append(layer);window.setTimeout(()=>layer.remove(),1800)}
export function rewardAnswer(correct:boolean,complete=false){if(!correct){streak=0;playWrongBoop();return}streak++;if(complete){playCelebrationFanfare();confetti();streak=0}else if(streak%3===0){playComboDing(streak);confetti()}else playCorrectDing()}
