/** Original Mandarin learning verses and arrangements. Traditional melodies
 * are identified separately. Famous-song references are titles, not licensed recordings.
 * Notes use scientific pitch notation and quarter-note beats; A4 = 440 Hz.
 */
export type SongNote={pitch:string;frequency:number;beats:number;duration:number};
export type LyricLine={hanzi:string;pinyin:string;meaning_th:string;meaning_en:string;notes:SongNote[]};
export type SongScene='happy'|'birthday'|'mom'|'friends'|'tigers'|'stars';
export type KidsSong={id:SongScene;title:string;pinyin:string;title_th:string;title_en:string;practice_title:string;practice_title_th:string;practice_title_en:string;kind:'traditional'|'original';bpm:number;lyrics:LyricLine[];moral_value_th:string;moral_value_en:string;icon:string;source?:string};
type Row=[string,string,string,string,string];
type Meta=Omit<KidsSong,'lyrics'>;
export function frequency(pitch:string){const m=/^([A-G])([#b]?)([0-8])$/.exec(pitch);if(!m)throw Error('Invalid note '+pitch);const semitones:Record<string,number>={C:0,D:2,E:4,F:5,G:7,A:9,B:11};const midi=(Number(m[3])+1)*12+semitones[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0);return 440*2**((midi-69)/12)}
function song(meta:Meta,rows:Row[]):KidsSong{return {...meta,lyrics:rows.map(([hanzi,pinyin,meaning_th,meaning_en,score])=>({hanzi,pinyin,meaning_th,meaning_en,notes:score.split(' ').map(token=>{const [pitch,b]=token.split(':');const beats=Number(b??1);return {pitch,frequency:frequency(pitch),beats,duration:beats*60/meta.bpm}})}))}}
const frere='https://portenotes.lacultureataporte.fr/guitare/repertoire/frere-jacques';
const birthday='https://everyinstrument.com/happy-birthday/piano/';
export const kidsSongs:KidsSong[]=[
song({id:'happy',title:'如果感到幸福你就拍拍手',pinyin:'Rú guǒ gǎn dào xìng fú nǐ jiù pāi pāi shǒu',title_th:'ถ้ามีความสุขก็ปรบมือ',title_en:'If You’re Happy and You Know It',practice_title:'快乐小熊猫',practice_title_th:'แพนด้าน้อยแสนสุข',practice_title_en:'Happy Little Panda',kind:'original',bpm:112,icon:'👏',moral_value_th:'แสดงความสุขด้วยการเคลื่อนไหวและแบ่งปันรอยยิ้ม',moral_value_en:'Express happiness through movement and share your smile.'},[
 ['拍拍小手','pāi pāi xiǎo shǒu','ปรบมือเล็ก ๆ','Clap your little hands','C4 E4 G4 G4'],
 ['跺跺小脚','duò duo xiǎo jiǎo','กระทืบเท้าเบา ๆ','Stomp your little feet','D4 F4 A4 A4'],
 ['开心地笑','kāi xīn de xiào','ยิ้มอย่างมีความสุข','Smile happily','E4 G4 F4 E4'],
 ['大家快乐','dà jiā kuài lè','ทุกคนมีความสุข','Everyone is happy','F4 E4 D4 C4:2']]),
song({id:'birthday',title:'祝你生日快乐',pinyin:'Zhù nǐ shēng rì kuài lè',title_th:'สุขสันต์วันเกิด',title_en:'Happy Birthday to You',practice_title:'熊猫生日快乐',practice_title_th:'สุขสันต์วันเกิดแพนด้า',practice_title_en:'Happy Birthday, Panda',kind:'traditional',bpm:100,icon:'🎂',source:birthday,moral_value_th:'อวยพรคนที่เรารักและร่วมฉลองด้วยความยินดี',moral_value_en:'Wish your loved ones well and celebrate together.'},[
 ['祝你生日快乐','zhù nǐ shēng rì kuài lè','ขอให้มีความสุขในวันเกิด','Happy birthday to you','G3:.5 G3:.5 A3 G3 C4 B3:2'],
 ['祝你生日快乐','zhù nǐ shēng rì kuài lè','ขอให้มีความสุขในวันเกิด','Happy birthday to you','G3:.5 G3:.5 A3 G3 D4 C4:2'],
 ['亲爱的小熊猫呀','qīn ài de xiǎo xióng māo ya','แพนด้าน้อยที่รัก','Dear little panda','G3:.5 G3:.5 G4 E4 C4 B3 A3'],
 ['祝你生日快乐','zhù nǐ shēng rì kuài lè','ขอให้มีความสุขในวันเกิด','Happy birthday to you','F4:.5 F4:.5 E4 C4 D4 C4:2']]),
song({id:'mom',title:'世上只有妈妈好',pinyin:'Shì shàng zhǐ yǒu mā ma hǎo',title_th:'แม่ดีที่สุดในโลก',title_en:'Mom Is the Best in the World',practice_title:'谢谢我的妈妈',practice_title_th:'ขอบคุณคุณแม่',practice_title_en:'Thank You, Mom',kind:'original',bpm:82,icon:'💗',moral_value_th:'ขอบคุณคนที่ดูแลเราและแสดงความรักด้วยการกระทำเล็ก ๆ',moral_value_en:'Thank the people who care for you and show love in small ways.'},[
 ['妈妈你好','mā ma nǐ hǎo','สวัสดีคุณแม่','Hello, Mom','E4 G4 A4 G4'],
 ['我爱妈妈','wǒ ài mā ma','ฉันรักคุณแม่','I love Mom','F4 E4 G4 E4'],
 ['送你鲜花','sòng nǐ xiān huā','มอบดอกไม้ให้แม่','Give you fresh flowers','D4 F4 A4 F4'],
 ['谢谢妈妈','xiè xie mā ma','ขอบคุณคุณแม่','Thank you, Mom','E4 D4 C4 C4:2']]),
song({id:'friends',title:'找朋友',pinyin:'Zhǎo péng you',title_th:'หาเพื่อน',title_en:'Looking for a Friend',practice_title:'我们是朋友',practice_title_th:'เราเป็นเพื่อนกัน',practice_title_en:'We Are Friends',kind:'original',bpm:110,icon:'🤝',moral_value_th:'กล่าวทักทาย แบ่งปัน และให้เกียรติเพื่อน',moral_value_en:'Greet, share and respect your friends.'},[
 ['你好朋友','nǐ hǎo péng you','สวัสดีเพื่อน','Hello, friend','G4 E4 G4 A4'],
 ['我们问好','wǒ men wèn hǎo','เราทักทายกัน','We say hello','F4 G4 E4 C4'],
 ['一起玩吧','yì qǐ wán ba','มาเล่นด้วยกัน','Let’s play together','C4 D4 F4 A4'],
 ['分享快乐','fēn xiǎng kuài lè','แบ่งปันความสุข','Share happiness','G4 F4 D4 C4:2']]),
song({id:'tigers',title:'两只老虎',pinyin:'Liǎng zhī lǎo hǔ',title_th:'เสือสองตัว',title_en:'Two Tigers',practice_title:'两只小虎',practice_title_th:'เสือน้อยสองตัว',practice_title_en:'Two Little Tigers',kind:'traditional',bpm:100,icon:'🐯',source:frere,moral_value_th:'สังเกตส่วนต่าง ๆ ของร่างกายและรักสัตว์',moral_value_en:'Observe body parts and care for animals.'},[
 ['两只小虎','liǎng zhī xiǎo hǔ','เสือน้อยสองตัว','Two little tigers','C4 D4 E4 C4'],
 ['一起跳舞','yì qǐ tiào wǔ','เต้นด้วยกัน','Dance together','C4 D4 E4 C4'],
 ['看眼睛','kàn yǎn jīng','มองดูดวงตา','Look at their eyes','E4 F4 G4:2'],
 ['看尾巴','kàn wěi ba','มองดูหาง','Look at their tails','E4 F4 G4:2'],
 ['摇摇尾巴开心','yáo yao wěi ba kāi xīn','แกว่งหางอย่างมีความสุข','Happy as they wag their tails','G4:.5 A4:.5 G4:.5 F4:.5 E4 C4'],
 ['迈开小脚走路','mài kāi xiǎo jiǎo zǒu lù','ก้าวเท้าน้อย ๆ เดินไป','Walk on those little feet','G4:.5 A4:.5 G4:.5 F4:.5 E4 C4'],
 ['真可爱','zhēn kě ài','น่ารักจริง ๆ','So adorable','C4 G3 C4:2'],
 ['真可爱','zhēn kě ài','น่ารักจริง ๆ','So adorable','C4 G3 C4:2']]),
song({id:'stars',title:'小星星',pinyin:'Xiǎo xīng xing',title_th:'ดาวดวงน้อย',title_en:'Twinkle Twinkle Little Star',practice_title:'星空小熊猫',practice_title_th:'แพนด้าชมดาว',practice_title_en:'Panda’s Starry Sky',kind:'traditional',bpm:100,icon:'⭐',moral_value_th:'ชื่นชมธรรมชาติและตั้งคำถามด้วยความอยากรู้',moral_value_en:'Enjoy nature and ask curious questions.'},[
 ['小熊猫看小星星','xiǎo xióng māo kàn xiǎo xīng xing','แพนด้าน้อยมองดูดาว','Little panda watches the stars','C4 C4 G4 G4 A4 A4 G4:2'],
 ['夜空好像大花园','yè kōng hǎo xiàng dà huā yuán','ท้องฟ้ายามค่ำเหมือนสวนใหญ่','The night sky is like a big garden','F4 F4 E4 E4 D4 D4 C4:2'],
 ['星星陪我说晚安','xīng xing péi wǒ shuō wǎn ān','ดวงดาวอยู่เป็นเพื่อนบอกราตรีสวัสดิ์','The stars keep me company at bedtime','G4 G4 F4 F4 E4 E4 D4:2'],
 ['闭上眼睛做个梦','bì shàng yǎn jīng zuò ge mèng','หลับตาแล้วฝันดี','Close your eyes and dream','G4 G4 F4 F4 E4 E4 D4:2'],
 ['小熊猫看小星星','xiǎo xióng māo kàn xiǎo xīng xing','แพนด้าน้อยมองดูดาว','Little panda watches the stars','C4 C4 G4 G4 A4 A4 G4:2'],
 ['明天一起看太阳','míng tiān yì qǐ kàn tài yáng','พรุ่งนี้ไปดูดวงอาทิตย์ด้วยกัน','Tomorrow we’ll watch the sun together','F4 F4 E4 E4 D4 D4 C4:2']])
];
export function songTimeline(song:KidsSong,speed=1){let time=0;const notes:{line:number;frequency:number;at:number;duration:number}[]=[];const lines=song.lyrics.map((line,i)=>{const start=time;for(const note of line.notes){const duration=note.duration/speed;notes.push({line:i,frequency:note.frequency,at:time,duration});time+=duration}return {start,end:time}});return {notes,lines,total:time}}
