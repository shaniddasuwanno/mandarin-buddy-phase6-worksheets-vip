'use client';
import type {CSSProperties} from 'react';
import type {SongScene} from '@/data/kidsSongs';
const art:Record<SongScene,string>={happy:'panda-clap',birthday:'panda-birthday',mom:'panda-mom',friends:'panda-friend',tigers:'panda-tigers',stars:'panda-star'};
export default function SongCartoonStage({scene,playing,beat,label,line=0}:{scene:SongScene;playing:boolean;beat:number;label:string;line?:number}){
 return <div role="img" aria-label={label} className={'song-png-stage '+(playing?'song-playing':'')} data-scene={scene} data-line={line} style={{'--song-beat':Math.max(.3,beat)+'s'} as CSSProperties}><span className="song-note note-one" aria-hidden>🎵</span><span className="song-note note-two" aria-hidden>✨</span><span className="song-note note-three" aria-hidden>🎶</span><img src={'/panda/'+art[scene]+'.png'} className="song-png-mascot" alt="" draggable={false}/></div>
}
