const han=['零','一','二','三','四','五','六','七','八','九'];
const py=['líng','yī','èr','sān','sì','wǔ','liù','qī','bā','jiǔ'];
const thai=['ศูนย์','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า'];
const units=[{value:10000,hanzi:'万',pinyin:'wàn',thai:'หมื่น'},{value:1000,hanzi:'千',pinyin:'qiān',thai:'พัน'},{value:100,hanzi:'百',pinyin:'bǎi',thai:'ร้อย'},{value:10,hanzi:'十',pinyin:'shí',thai:'สิบ'},{value:1,hanzi:'',pinyin:'',thai:''}];
export type ChineseNumber={value:number;hanzi:string;pinyin:string;meaning_th:string;meaning_en:string};
export function chineseNumber(value:number):ChineseNumber{
 if(!Number.isInteger(value)||value<0||value>10000)throw RangeError('Number must be an integer 0–10000');
 if(value===0)return {value,hanzi:han[0],pinyin:py[0],meaning_th:thai[0],meaning_en:'zero'};
 const h:string[]=[],p:string[]=[],t:string[]=[];let remaining=value,zero=false;
 for(const u of units){const digit=Math.floor(remaining/u.value);remaining%=u.value;if(!digit){if(h.length&&remaining>0)zero=true;continue}
  if(zero){h.push(han[0]);p.push(py[0]);zero=false}
  if(!(u.value===10&&digit===1&&h.length===0)){h.push(han[digit]);p.push(py[digit])}
  if(u.hanzi){h.push(u.hanzi);p.push(u.pinyin)}
  if(u.value===10){if(digit===2)t.push('ยี่');else if(digit!==1)t.push(thai[digit]);t.push('สิบ')}else if(u.value===1){t.push(digit===1&&value>10?'เอ็ด':thai[digit])}else{t.push(thai[digit],u.thai)}
 }
 const enSmall=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];const enTens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
 function english(n:number):string{if(n<20)return enSmall[n];if(n<100)return enTens[Math.floor(n/10)]+(n%10?'-'+enSmall[n%10]:'');const power=n>=1000?1000:100;return english(Math.floor(n/power))+(power===1000?' thousand':' hundred')+(n%power?' '+english(n%power):'')}
 return {value,hanzi:h.join(''),pinyin:p.join(' '),meaning_th:t.join(''),meaning_en:english(value)}
}
export const numberBoard=[...Array.from({length:21},(_,i)=>i),30,40,50,60,70,80,90,100,1000,10000].map(chineseNumber);
export type ChantRow={a:number;b:number;product:number;equation:string;hanzi:string;pinyin:string;meaning_th:string;meaning_en:string};
/** Traditional chant is smaller factor first; mirrored equations share its canonical recitation. */
export function chantRow(a:number,b:number):ChantRow{
 if(!Number.isInteger(a)||!Number.isInteger(b)||a<1||a>9||b<1||b>9)throw RangeError('Factors must be 1–9');
 const x=Math.min(a,b),y=Math.max(a,b),product=a*b,answer=chineseNumber(product),connector=product<10;
 return {a,b,product,equation:a+' × '+b+' = '+product,hanzi:han[x]+han[y]+(connector?'得':'')+(product===10?'一十':answer.hanzi),pinyin:py[x]+' '+py[y]+(connector?' dé ':' ')+(product===10?'yī shí':answer.pinyin),meaning_th:thai[x]+' '+thai[y]+' ได้ '+answer.meaning_th,meaning_en:x+' times '+y+' equals '+product}
}
export const chantTable=Array.from({length:9},(_,i)=>Array.from({length:9},(_,j)=>chantRow(i+1,j+1)));
