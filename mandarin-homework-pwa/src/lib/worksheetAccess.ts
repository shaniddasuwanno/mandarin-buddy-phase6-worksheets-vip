import type { Grade } from '@/data/sampleVocab';
export type WorksheetGrant={grade:number;expires_at:string|null};
export function activeGrades(grants:WorksheetGrant[],now=Date.now()):Grade[]{return grants.filter(g=>Number.isInteger(g.grade)&&g.grade>=1&&g.grade<=6&&(g.expires_at===null||Date.parse(g.expires_at)>now)).map(g=>g.grade as Grade).sort((a,b)=>a-b);}
export function worksheetAllowed(appAccess:boolean,grades:Grade[],grade:Grade,set:number){return grades.includes(grade)||appAccess;}
/** Only call with a verified account's database profile and grants. */
export function resolveAccess(profile:{is_paid:boolean}|null,grants:WorksheetGrant[]){const appAccess=profile?.is_paid===true;const worksheetGrades:Grade[]=appAccess?[1,2,3,4,5,6]:activeGrades(grants);return {appAccess,worksheetGrades};}
