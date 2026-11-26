import {sampleVocab,vocabForGrade,type LearningGrade,type VocabWord} from './starterVocab';
import {vocabP1,p1Weeks,type P1Word} from './vocabP1';
import {vocabP2,p2Weeks,type P2Word} from './vocabP2';
import {vocabP3,p3Weeks,getP3WeekVocab} from './vocabP3';
import {vocabP4,p4Weeks,getP4WeekVocab} from './vocabP4';
import {vocabP5,p5Weeks,getP5WeekVocab} from './vocabP5';
import {vocabP6,p6Weeks,getP6WeekVocab,getP6ReadingParagraph} from './vocabP6';
import {getP4ReadingParagraph} from './vocabP4';
import {vocabKindergartenPart1,kindergartenPart1Categories} from './vocabKindergartenPart1';
import {vocabKindergartenPart2,kindergartenPart2Categories} from './vocabKindergartenPart2';
import type {PrimaryCurriculumWord,PrimaryWeek} from './primaryCurriculum';
const p1Values=[['ตั้งใจฟังและฝึกอ่านเขียน','Listen and practise reading and writing'],['รักการเรียนและเคารพครู','Love learning and respect teachers'],['มีน้ำใจและมารยาท','Be kind and courteous'],['รักและดูแลครอบครัว','Love and care for family'],['ดูแลสุขอนามัย','Care for personal hygiene'],['รักและรักษาธรรมชาติ','Care for nature'],['รับผิดชอบกิจวัตรของตน','Take responsibility for daily routines'],['ซื่อสัตย์และกล้าขอความช่วยเหลือ','Be honest and brave enough to ask for help']] as const;
const p2Values=[['จัดของและรู้จักออม','Organise and save'],['รักการอ่านและใฝ่รู้','Love reading and learning'],['จัดสิ่งของและเคารพพื้นที่ผู้อื่น','Organise belongings and respect others’ space'],['ดูแลและเคารพครอบครัว','Care for and respect family'],['ใส่ใจภาษาและความรู้สึก','Care about language and feelings'],['ดูแลสิ่งแวดล้อม','Care for the environment'],['รักษาความปลอดภัย','Stay safe'],['ขยันและรู้จักประหยัด','Work diligently and be thrifty']] as const;
const expandedP1:PrimaryWeek[]=p1Weeks.map((w,i)=>({...w,moral_th:p1Values[i][0],moral_en:p1Values[i][1]}));
const expandedP2:PrimaryWeek[]=p2Weeks.map((w,i)=>({...w,moral_th:p2Values[i][0],moral_en:p2Values[i][1]}));
function normalise(word:P1Word|P2Word):PrimaryCurriculumWord{
 const week=(word.grade===1?expandedP1:expandedP2)[word.week-1],first=word.sentences[0];
 return {...word,meaningTh:word.meaning_th,meaningEn:word.meaning_en,
  sentences:[first,word.sentences[1]],example:{hanzi:first.hanzi,pinyin:first.pinyin,th:first.meaning_th,en:first.meaning_en},
  weekly_moral_th:week.moral_th,weekly_moral_en:week.moral_en};
}
const p1Study=vocabP1.map(normalise),p2Study=vocabP2.map(normalise);
const originalKgCategories=[...kindergartenPart1Categories,...kindergartenPart2Categories];
const kgCategories=['good_habits','family','body','land_animals','fruits','sea_animals','food','places','colors_shapes','numbers_counting'].map((id,i)=>{const c=originalKgCategories.find(c=>c.id===id)!;return {...c,unit:i+1,title_en:id==='good_habits'?'Polite Words & Greetings':id==='family'?'Family':id==='body'?'Body Parts':id==='land_animals'?'Animals':id==='fruits'?'Fruits':c.title_en,title_th:id==='body'?'ส่วนต่าง ๆ ของร่างกาย':id==='good_habits'?'คำสุภาพและคำทักทาย':c.title_th}});
export interface KindergartenStudyWord extends VocabWord {grade:0;week:number;category:string;category_title_th:string;category_title_en:string;moral_lesson_th:string;illustration:{scene:string;animation:string}}
const kindergartenStudy:KindergartenStudyWord[]=[...vocabKindergartenPart1,...vocabKindergartenPart2].map((w,i)=>{
 const first=w.sentences[0],cat=kgCategories.find(c=>c.id===w.category)!;
 return {...w,grade:0,week:cat.unit,category_title_th:cat.title_th,category_title_en:cat.title_en,meaningTh:w.meaning_th,meaningEn:w.meaning_en,sentences:[first,w.sentences[1]],example:{hanzi:first.hanzi,pinyin:first.pinyin,th:first.meaning_th,en:first.meaning_en},is_mandatory_write:true};
});
const kgWeeks:PrimaryWeek[]=kgCategories.map(c=>({week:c.unit,title_th:c.title_th,title_en:c.title_en,moral_th:'',moral_en:''}));
export const kindergartenReviewSets=kgCategories.map(c=>({week:100+c.unit,title_th:c.title_th,title_en:c.title_en}));
export const curriculumVocab:readonly VocabWord[]=[...kindergartenStudy,...p1Study,...p2Study,...vocabP3,...vocabP4,...vocabP5,...vocabP6];
export const allLearningWords:readonly VocabWord[]=[...curriculumVocab,...sampleVocab];
export function getStudyWeeks(grade:LearningGrade):readonly PrimaryWeek[]{return grade===0?kgWeeks:grade===1?expandedP1:grade===2?expandedP2:grade===3?p3Weeks:grade===4?p4Weeks:grade===5?p5Weeks:p6Weeks}
/** Week zero retains the original starter deck, which is also used by existing arcade and worksheet activities. */
export function studyWordsForGrade(grade:LearningGrade,week:number):VocabWord[]{
  if(grade===0)return week>=101?kindergartenStudy.filter(w=>w.category===kgCategories.find(c=>100+c.unit===week)?.id):kindergartenStudy.filter(w=>w.week===(week||1));
  if(week>0&&grade===1)return p1Study.filter(w=>w.week===week);
  if(week>0&&grade===2)return p2Study.filter(w=>w.week===week);
  if(week>0&&grade===3)return getP3WeekVocab(week);
  if(week>0&&grade===4)return getP4WeekVocab(week);
  if(week>0&&grade===5)return getP5WeekVocab(week);
  if(week>0&&grade===6)return getP6WeekVocab(week);
  return [...vocabForGrade(grade)];
}
export function isPrimaryWord(word:VocabWord):word is PrimaryCurriculumWord{return 'tingxie_callout_zh' in word&&'weekly_moral_th' in word}
export function isKindergartenWord(word:VocabWord):word is KindergartenStudyWord{return word.grade===0&&'category' in word}
export function getReadingParagraph(grade:LearningGrade,week:number){return grade===4?getP4ReadingParagraph(week):grade===6?getP6ReadingParagraph(week):undefined}
