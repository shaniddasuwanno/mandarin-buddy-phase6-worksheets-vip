export type Language = 'th' | 'en';
export type Tab = 'explore' | 'dictation' | 'games' | 'homework' | 'progress' | 'worksheets';
export const translations = {
  th: {
    brand: 'เพื่อนจีน', tagline: 'เรียนจีนด้วยกัน ทุกวัน', language: 'เลือกภาษา', navigation: 'เมนูหลัก', demoBadge: 'ตัวอย่างแอป',
    explore: {label:'สำรวจ', title:'เริ่มเรียนภาษาจีน', description:'เลือกชั้นเรียนของลูก แล้วฝึกคำศัพท์ทีละคำ'},
    dictation: {label:'เขียนตามคำบอก', title:'ฟัง เขียน และทบทวน', description:'ฝึกเขียนคำศัพท์ประจำสัปดาห์ แล้วทบทวนคำที่ยังไม่แม่น'},
    games: {label:'เกม', title:'สนุกกับภาษาจีน', description:'เรียนผ่าน 6 เกมฝึกทักษะการฟัง อ่าน และเขียน'},
    homework: {label:'การบ้าน', title:'ผู้ช่วยการบ้านภาษาจีน', description:'ถ่ายรูปหรือวางข้อความภาษาจีน เพื่อดูพินอิน คำแปล และคำอธิบาย'},
    progress: {label:'ความก้าวหน้า', title:'ติดตามการเรียนของลูก', description:'ดูความสม่ำเสมอ คำที่จำได้ และคำที่ควรฝึกเพิ่ม'},
    worksheets:{label:'ใบงาน',title:'ชุดใบงานฝึกทักษะ',description:'ใบงาน A4 ภาษาจีน คณิตศาสตร์ และวิทยาศาสตร์ พร้อมคำแปลและเฉลย'},
    grades:'เลือกชั้นเรียน', grade:'ป.', selected:'ชั้นเรียนที่เลือก', sample:'ตัวอย่างคำศัพท์', example:'ตัวอย่างประโยค', meaning:'ความหมาย', audio:'ฟังเสียง', noAudio:'อุปกรณ์นี้ไม่รองรับเสียงพูดภาษาจีน', comingSoon:'จะเปิดใช้งานในขั้นถัดไป',
    sampleMeaning:'สวัสดี', sampleSentence:'สวัสดี คุณครู!', gamesList:['ฟังและเลือกคำ','จับคู่การ์ด','ผสมคำศัพท์','เรียงประโยค','ฝนคำศัพท์','คัดลายมือจีน'],
    dictationCards:['เขียนตามคำบอกประจำสัปดาห์','ทบทวนคำที่ยังไม่แม่น'], homeworkCards:['อัปโหลดหรือถ่ายรูป','วางข้อความภาษาจีน'], progressCards:['วันเรียนต่อเนื่อง','คำที่จำได้','ประวัติการเขียนตามคำบอก','คำที่ต้องทบทวน'],
    previewNote:'รุ่นทดลอง · บันทึกความก้าวหน้าบนอุปกรณ์นี้ ยังไม่เชื่อมต่อบัญชีหรือระบบชำระเงิน',
  },
  en: {
    brand:'Mandarin Buddy', tagline:'A little Chinese, every day', language:'Choose language', navigation:'Main navigation', demoBadge:'App preview',
    explore:{label:'Explore',title:'Start learning Mandarin',description:'Choose your child’s grade and discover new words one at a time'},
    dictation:{label:'Dictation',title:'Listen, write and review',description:'Practise weekly spelling and revisit tricky words'},
    games:{label:'Games',title:'Play your way to Mandarin',description:'Six games for practising listening, reading and writing'},
    homework:{label:'Homework',title:'Your Mandarin homework helper',description:'Upload a worksheet or paste Chinese to see pinyin, translation and explanations'},
    progress:{label:'Progress',title:'See your child grow',description:'Track learning habits, mastered words and words to revisit'},
    worksheets:{label:'Worksheets',title:'Printable Worksheet Hub',description:'A4 Mandarin, maths and science worksheets with bilingual questions and answers'},
    grades:'Choose a grade',grade:'P.',selected:'Selected grade',sample:'Sample vocabulary',example:'Example sentence',meaning:'Meaning',audio:'Hear pronunciation',noAudio:'Mandarin speech is unavailable on this device',comingSoon:'Coming in the next phase',
    sampleMeaning:'Hello',sampleSentence:'Hello, teacher!',gamesList:['Listen & Pick','Match Cards','Build Word','Build Sentence','Falling Word Rain','Write Characters'],
    dictationCards:['Weekly dictation','Smart review'],homeworkCards:['Upload or take a photo','Paste Chinese text'],progressCards:['Daily streak','Mastered words','Dictation history','Weak words'],
    previewNote:'Preview · Progress is saved on this device. Accounts and payments are not connected yet.',
  },
} as const;
