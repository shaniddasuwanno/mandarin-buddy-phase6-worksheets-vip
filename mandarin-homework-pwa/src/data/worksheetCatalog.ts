import type { Grade } from './sampleVocab';
export type Subject='mandarin'|'math'|'science';
export const subjects=['mandarin','math','science'] as const;
export const subjectName={th:{mandarin:'ภาษาจีน',math:'คณิตศาสตร์',science:'วิทยาศาสตร์'},en:{mandarin:'Mandarin',math:'Math in Mandarin',science:'Science in Mandarin'}} as const;
export type WorksheetMeta={id:string;grade:Grade;set:number;subject:Subject;titleTh:string;titleEn:string;emoji:string};
export type Question={zh:string;th:string;en:string;answer:string;answerTh?:string;answerEn?:string;options?:string[];grid?:string};
export type QuestionSection={titleZh:string;titleTh:string;titleEn:string;questions:Question[]};
export type PictureWord={emoji:string;hanzi:string;pinyin:string;th:string;en:string};
export type Worksheet=WorksheetMeta&{cards:PictureWord[];sections:QuestionSection[];guideTh:string;guideEn:string};
const topics:Record<Grade,readonly [string,string][]>={
 1:[['ทักทาย','Greetings'],['ฉันและครอบครัว','Me & family'],['พ่อและน้ำ','Dad & water'],['สัตว์เลี้ยง','Pets'],['ตัวเลข 1–10','Numbers 1–10'],['บวกและลบภายใน 20','Adding & subtracting within 20'],['เปรียบเทียบจำนวน','Comparing numbers'],['ร่างกายของเรา','Our bodies'],['สัตว์รอบตัว','Animals around us'],['อากาศวันนี้','Today’s weather']],
 2:[['โรงเรียนของฉัน','My school'],['ของใช้และสี','Supplies & colours'],['สีและผลไม้','Colours & fruit'],['อาหารและเครื่องดื่ม','Food & drinks'],['ตัวเลขถึง 100','Numbers to 100'],['บวกและลบสองหลัก','Two-digit addition & subtraction'],['มากกว่า น้อยกว่า เท่ากับ','Greater, less, equal'],['ส่วนของพืช','Parts of a plant'],['ฤดูกาล','Seasons'],['ประสาทสัมผัส','Our senses']],
 3:[['วันและเวลา','Days & time'],['เพื่อนและกิจกรรม','Friends & activities'],['อ่านหนังสือและร้านค้า','Reading & shopping'],['ราคาและวันเกิด','Prices & birthdays'],['จำนวนหลักร้อย','Hundreds'],['โจทย์บวกและลบ','Addition & subtraction problems'],['เรียงลำดับจำนวน','Number ordering'],['ที่อยู่อาศัยของสัตว์','Animal habitats'],['สถานะของน้ำ','States of water'],['ดูแลร่างกาย','Healthy habits']],
 4:[['อากาศและทิศทาง','Weather & directions'],['ทิศทางและความช่วยเหลือ','Directions & help'],['ทำงานให้เสร็จ','Completing tasks'],['เหตุผลและกีฬา','Reasons & sports'],['จำนวนถึง 1,000','Numbers to 1,000'],['โจทย์หลายขั้น','Multi-step word problems'],['เปรียบเทียบหลักร้อย','Comparing hundreds'],['ห่วงโซ่อาหาร','Food chains'],['วัฏจักรน้ำ','Water cycle'],['การเจริญเติบโตของพืช','Plant growth']],
 5:[['ห้องสมุดและการเดินทาง','Library & travel'],['เตรียมและถาม','Prepare & ask'],['ตอบและสุขภาพ','Answers & health'],['ง่ายและยาก','Easy & difficult'],['จำนวนหลักพัน','Thousands'],['โจทย์การเดินทาง','Travel word problems'],['เปรียบเทียบจำนวนหลักพัน','Comparing thousands'],['ระบบสุริยะ','Solar system'],['สสารรอบตัว','Matter'],['ระบบนิเวศ','Ecosystems']],
 6:[['แผนและอนาคต','Plans & future'],['นิสัยและทางเลือก','Habits & choices'],['เปรียบเทียบและความหวัง','Compare & hope'],['ความก้าวหน้าและความสำเร็จ','Progress & success'],['จำนวนหลายหลัก','Multi-digit numbers'],['วางแผนและคำนวณ','Plan & calculate'],['เปรียบเทียบจำนวนและผลต่าง','Comparisons & differences'],['พลังงานและแสง','Energy & light'],['โลกและดวงจันทร์','Earth & Moon'],['สิ่งแวดล้อมของเรา','Our environment']],
};
export const worksheetCatalog:WorksheetMeta[]=([1,2,3,4,5,6] as Grade[]).flatMap(grade=>topics[grade].map(([titleTh,titleEn],index)=>({id:`p${grade}-set${index+1}`,grade,set:index+1,subject:index<4?'mandarin':index<7?'math':'science',titleTh,titleEn,emoji:index<4?'🀄':index<7?'🔢':'🌱'})));
export function worksheetMeta(grade:Grade,set:number){return worksheetCatalog.find(w=>w.grade===grade&&w.set===set);}
