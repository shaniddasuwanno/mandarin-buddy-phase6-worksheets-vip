import type { Grade } from '@/data/sampleVocab';
export type PlanType='app_only'|'worksheets_only'|'combo_all';
export type GradeAccess='ALL'|`P${Grade}`;
export const planTypes=['app_only','worksheets_only','combo_all'] as const;
export const gradeAccessOptions=['ALL'] as const;
export function validPlan(plan:unknown,grade:unknown):boolean{return typeof plan==='string'&&typeof grade==='string'&&planTypes.includes(plan as PlanType)&&grade==='ALL';}
export function planPrice(plan:PlanType,grade:GradeAccess){return plan==='app_only'?399:plan==='combo_all'?899:599;}
export function planName(plan:PlanType,lang:'th'|'en'){return lang==='th'?{app_only:'App เพื่อนเรียนจีน',worksheets_only:'ชุดใบงานทั้งหมด',combo_all:'แพ็กเกจสุดคุ้ม Full Combo'}[plan]:{app_only:'Mandarin Buddy App',worksheets_only:'All Printable Worksheets',combo_all:'Full Combo'}[plan];}
export function gradeName(grade:GradeAccess,lang:'th'|'en'){return grade==='ALL'?(lang==='th'?'ป.1–ป.6':'P.1–P.6'):`${lang==='th'?'ป.':'P.'}${grade.slice(1)}`;}
export function welcomeMessage(plan:PlanType,grade:GradeAccess,code:string,url:string){const validity=plan==='worksheets_only'?'ใช้งานใบงาน 1 ปีนับจากวันที่เปิดใช้':'สิทธิ์ตลอดชีพ';return `สวัสดีค่ะ 💚 ขอบคุณที่สั่งซื้อ ${planName(plan,'th')} (${plan==='worksheets_only'?gradeName(grade,'th'):'เริ่มต้นตั้งแต่เล็ก–ป.6'}) ราคา ฿${planPrice(plan,grade)}\n${validity}${plan==='combo_all'?' · ใช้ได้สูงสุด 3 อุปกรณ์ในครอบครัว':''}\n\nVIP Access Code: ${code}\n\n1. เข้า ${url}\n2. สมัครหรือเข้าสู่ระบบบัญชีผู้ปกครอง\n3. กด “ใช้รหัส VIP” แล้วกรอกรหัสด้านบน\nรหัสใช้ได้กับบัญชีเดียว กรุณาเก็บรหัสไว้เป็นส่วนตัว\nขอให้สนุกกับการเรียนภาษาจีนค่ะ 🐼`;}
