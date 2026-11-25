/** Original Mandarin learning verses and arrangements. Traditional melodies
 * are identified separately. Famous-song references are titles, not licensed recordings.
 * Notes use scientific pitch notation and quarter-note beats; A4 = 440 Hz.
 */
export type SongNote={pitch:string;frequency:number;beats:number;duration:number};
export type LyricLine={hanzi:string;pinyin:string;meaning_th:string;meaning_en:string;notes:SongNote[]};
export type SongScene='guest'|'happy'|'birthday'|'mom'|'friends'|'tigers'|'ducks'|'bunny';
export type KidsSong={id:SongScene;title:string;pinyin:string;title_th:string;title_en:string;practice_title:string;practice_title_th:string;practice_title_en:string;kind:'traditional'|'original';bpm:number;lyrics:LyricLine[];moral_value_th:string;moral_value_en:string;icon:string;source?:string};
type Row=[string,string,string,string,string];
type Meta=Omit<KidsSong,'lyrics'>;
export function frequency(pitch:string){const m=/^([A-G])([#b]?)([0-8])$/.exec(pitch);if(!m)throw Error('Invalid note '+pitch);const semitones:Record<string,number>={C:0,D:2,E:4,F:5,G:7,A:9,B:11};const midi=(Number(m[3])+1)*12+semitones[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0);return 440*2**((midi-69)/12)}
function song(meta:Meta,rows:Row[]):KidsSong{return {...meta,lyrics:rows.map(([hanzi,pinyin,meaning_th,meaning_en,score])=>({hanzi,pinyin,meaning_th,meaning_en,notes:score.split(' ').map(token=>{const [pitch,b]=token.split(':');const beats=Number(b??1);return {pitch,frequency:frequency(pitch),beats,duration:beats*60/meta.bpm}})}))}}
const frere='https://portenotes.lacultureataporte.fr/guitare/repertoire/frere-jacques';
const birthday='https://everyinstrument.com/happy-birthday/piano/';
export const kidsSongs:KidsSong[]=[
song({id:'guest',title:'客人来',pinyin:'Kè rén lái',title_th:'แขกมาเยี่ยม',title_en:'A Guest Comes',practice_title:'欢迎来我家',practice_title_th:'ยินดีต้อนรับสู่บ้าน',practice_title_en:'Welcome to My Home',kind:'original',bpm:94,icon:'🍵',moral_value_th:'ต้อนรับแขกด้วยรอยยิ้ม กล่าวสวัสดี และช่วยผู้ใหญ่จัดที่นั่ง',moral_value_en:'Welcome guests with a smile, greet them and help an adult offer a seat.'},[
 ['客人好呀','kè rén hǎo ya','สวัสดีค่ะ/ครับ คุณแขก','Hello, dear guest','C4 E4 G4 E4'],
 ['请进我家','qǐng jìn wǒ jiā','เชิญเข้าบ้านของฉัน','Please come into my home','D4 F4 E4 C4'],
 ['请坐这里','qǐng zuò zhè lǐ','เชิญนั่งตรงนี้','Please sit here','E4 G4 A4 G4'],
 ['一起喝茶','yì qǐ hē chá','ดื่มชาด้วยกัน','Let’s drink tea together','F4 E4 D4 C4:2']]),
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
song({id:'ducks',title:'数鸭子',pinyin:'Shǔ yā zi',title_th:'นับเป็ด',title_en:'Counting Ducks',practice_title:'池塘数小鸭',practice_title_th:'นับลูกเป็ดในสระ',practice_title_en:'Counting Ducklings at the Pond',kind:'original',bpm:106,icon:'🦆',moral_value_th:'ฝึกนับเลข อดทน และฟังคำแนะนำของผู้ใหญ่',moral_value_en:'Practise counting, be patient and listen to helpful adults.'},[
 ['一二三四','yī èr sān sì','หนึ่ง สอง สาม สี่','One, two, three, four','C4 C4 E4 G4'],
 ['五六七八','wǔ liù qī bā','ห้า หก เจ็ด แปด','Five, six, seven, eight','A4 G4 F4 E4'],
 ['九只小鸭','jiǔ zhī xiǎo yā','ลูกเป็ดเก้าตัว','Nine little ducks','D4 E4 G4 E4'],
 ['排队回家','pái duì huí jiā','เข้าแถวกลับบ้าน','Line up to go home','F4 D4 C4 C4:2']]),
song({id:'bunny',title:'小兔子乖乖',pinyin:'Xiǎo tù zi guāi guāi',title_th:'กระต่ายน้อยเด็กดี',title_en:'Good Little Bunny',practice_title:'小兔安全家',practice_title_th:'บ้านปลอดภัยของกระต่ายน้อย',practice_title_en:'Bunny’s Safe Home',kind:'original',bpm:91,icon:'🐰',moral_value_th:'ไม่เปิดประตูให้คนแปลกหน้า ถ้าไม่แน่ใจให้ถามผู้ใหญ่ที่ไว้ใจได้',moral_value_en:'Do not open the door to strangers. Ask a trusted adult when unsure.'},[
 ['小兔在家','xiǎo tù zài jiā','กระต่ายน้อยอยู่บ้าน','Little bunny is at home','E4 D4 E4 G4'],
 ['有人敲门','yǒu rén qiāo mén','มีคนเคาะประตู','Someone knocks at the door','G4 A4 F4 E4'],
 ['先问大人','xiān wèn dà rén','ถามผู้ใหญ่ก่อน','Ask a grown-up first','D4 F4 E4 D4'],
 ['安全第一','ān quán dì yī','ความปลอดภัยมาก่อน','Safety comes first','E4 G4 D4 C4:2']])
];
export function songTimeline(song:KidsSong,speed=1){let time=0;const notes:{line:number;frequency:number;at:number;duration:number}[]=[];const lines=song.lyrics.map((line,i)=>{const start=time;for(const note of line.notes){const duration=note.duration/speed;notes.push({line:i,frequency:note.frequency,at:time,duration});time+=duration}return {start,end:time}});return {notes,lines,total:time}}
