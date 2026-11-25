export interface HomeworkSentence { hanzi:string; pinyin:string; translation:string; explanation:string }
export interface HomeworkResult { extractedText:string; sentences:HomeworkSentence[]; steps:string[]; notes:string[] }
export function isHomeworkResult(x:unknown):x is HomeworkResult {
 if(!x||typeof x!=='object')return false;const v=x as Record<string,unknown>;
 return typeof v.extractedText==='string'&&Array.isArray(v.sentences)&&v.sentences.every(s=>s&&typeof s==='object'&&['hanzi','pinyin','translation','explanation'].every(k=>typeof s[k]==='string'))&&Array.isArray(v.steps)&&v.steps.every(s=>typeof s==='string')&&Array.isArray(v.notes)&&v.notes.every(s=>typeof s==='string');
}
