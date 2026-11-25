export interface P1Word {
  id:string; grade:1; week:number; unit_title_th:string; unit_title_en:string;
  hanzi:string; pinyin:string; meaning_th:string; meaning_en:string;
  is_mandatory_write:boolean;
  sentences:{hanzi:string;pinyin:string;meaning_th:string;meaning_en:string}[];
  example_sentence:string; example_pinyin:string; example_th:string; example_en:string;
  memory_tip_th:string; memory_tip_en:string; moral_lesson_th:string;
  tingxie_callout_th:string; tingxie_callout_zh:string;
  radical_tip_th:string; radical_tip_en:string; radical_tip_zh:string;
  illustration:{scene:string;animation:string};
}
type Row = [string,string,string,string,string,string,string,string,string,string,string,string,string];
export const p1Weeks = [
  {
    "week": 1,
    "title_th": "ฟัง พูด อ่าน เขียน",
    "title_en": "Listening, speaking, reading and writing"
  },
  {
    "week": 2,
    "title_th": "โรงเรียนและการเรียน",
    "title_en": "School and learning"
  },
  {
    "week": 3,
    "title_th": "มิตรภาพและมารยาท",
    "title_en": "Friendship and courtesy"
  },
  {
    "week": 4,
    "title_th": "ครอบครัวและความกตัญญู",
    "title_en": "Family care and filial respect"
  },
  {
    "week": 5,
    "title_th": "ร่างกายและสุขอนามัย",
    "title_en": "Body and hygiene"
  },
  {
    "week": 6,
    "title_th": "ธรรมชาติรอบตัว",
    "title_en": "Nature around us"
  },
  {
    "week": 7,
    "title_th": "ชีวิตประจำวันและวินัย",
    "title_en": "Daily life and routines"
  },
  {
    "week": 8,
    "title_th": "ความซื่อสัตย์และความกล้า",
    "title_en": "Honesty and courage"
  }
] as const;

function make(week:number,rows:Row[]):P1Word[] {
  const unit=p1Weeks[week-1];
  if(!unit || rows.length!==10) throw new Error('Each week needs 10 entries');
  return rows.map(([hanzi,pinyin,meaning_th,meaning_en,h,p,th,en,dictation,radical_tip_zh,radical_tip_th,radical_tip_en,moral_lesson_th],i)=>({
    id:'P1-W'+String(week)+'-'+String(i+1).padStart(2,'0'),
    grade:1,week,unit_title_th:unit.title_th,unit_title_en:unit.title_en,
    hanzi,pinyin,meaning_th,meaning_en,is_mandatory_write:true,
    sentences:[
      {hanzi:h,pinyin:p,meaning_th:th,meaning_en:en},
      {hanzi:'今天我和同学认真练习读写“'+hanzi+'”。',pinyin:'Jīntiān wǒ hé tóngxué rènzhēn liànxí dúxiě “'+pinyin+'”.',meaning_th:'วันนี้ฉันกับเพื่อนตั้งใจฝึกอ่านเขียน '+hanzi,meaning_en:'Today my classmates and I practise reading and writing “'+hanzi+'”.'}
    ],
    example_sentence:h,example_pinyin:p,example_th:th,example_en:en,
    memory_tip_th:radical_tip_th,memory_tip_en:radical_tip_en,moral_lesson_th,
    tingxie_callout_th:'คำใบ้เขียนตามคำบอก: '+dictation,tingxie_callout_zh:dictation,
    radical_tip_th,radical_tip_en,radical_tip_zh,
    illustration:{scene:hanzi,animation:'bounce'}
  }));
}

export const p1Week1 = make(1, [
  ["听","tīng","ฟัง","Listen","上课的时候，我认真听老师讲故事。","Shàngkè de shíhou, wǒ rènzhēn tīng lǎoshī jiǎng gùshi.","เวลาเรียนฉันตั้งใจฟังครูเล่านิทาน","In class I listen carefully to my teacher's story.","听话的听","听 有口，联想到声音","口 ใน 听 ช่วยจำเรื่องเสียง","口 reminds us of sounds.","ตั้งใจฟัง"],
  ["说","shuō","พูด","Speak","我每天都用华语和同学说话。","Wǒ měitiān dōu yòng Huáyǔ hé tóngxué shuōhuà.","ทุกวันฉันพูดภาษาจีนกับเพื่อนร่วมชั้น","I speak Mandarin with classmates daily.","说话的说","说 有讠","讠 เกี่ยวกับคำพูด","讠 relates to speech.","พูดสุภาพ"],
  ["读","dú","อ่าน","Read","放学以后，我在家里读一本书。","Fàngxué yǐhòu, wǒ zài jiālǐ dú yì běn shū.","หลังเลิกเรียนฉันอ่านหนังสือที่บ้านหนึ่งเล่ม","After school I read a book at home.","读书的读","读 有讠","讠 ช่วยจำเรื่องการอ่านออกเสียง","讠 reminds us of spoken reading.","รักการอ่าน"],
  ["写","xiě","เขียน","Write","我每天认真写字，不让字迹太乱。","Wǒ měitiān rènzhēn xiězì, bú ràng zìjì tài luàn.","ฉันตั้งใจเขียนทุกวัน ไม่ให้ลายมือรก","I write neatly every day.","写字的写","写 上面是冖","冖 คือส่วนคล้ายฝาครอบด้านบน","冖 looks like a cover.","ฝึกเขียนสม่ำเสมอ"],
  ["看","kàn","ดู","Look","我和姐姐一起看一本有趣的书。","Wǒ hé jiějie yìqǐ kàn yì běn yǒuqù de shū.","ฉันกับพี่สาวอ่านหนังสือน่าสนใจด้วยกัน","My sister and I look at an interesting book.","看书的看","看 下面是目","目 คือตา ใช้มอง","目 means eye.","ช่างสังเกต"],
  ["问","wèn","ถาม","Ask","如果我不明白，就举手问老师。","Rúguǒ wǒ bù míngbai, jiù jǔshǒu wèn lǎoshī.","ถ้าไม่เข้าใจฉันยกมือถามครู","If I don't understand, I raise my hand and ask.","问题的问","问 有门和口","口 อยู่ใน 门 ชวนให้นึกถึงการถาม","口 inside 门 suggests asking.","กล้าถาม"],
  ["答","dá","ตอบ","Answer","老师提问时，我举手认真地回答。","Lǎoshī tíwèn shí, wǒ jǔshǒu rènzhēn de huídá.","เมื่อครูถามฉันยกมือตอบอย่างตั้งใจ","When the teacher asks, I raise my hand and answer.","回答的答","答 上面是⺮","⺮ คือส่วนไผ่ด้านบน","⺮ is the bamboo component.","ตอบตามจริง"],
  ["读书","dúshū","อ่านหนังสือ","Read books","每天晚上，我和妈妈一起读书。","Měitiān wǎnshang, wǒ hé māma yìqǐ dúshū.","ทุกเย็นฉันอ่านหนังสือกับแม่","Every evening I read with Mom.","读书，读书的读，书本的书","读 有讠；书 要注意横折","读 มี 讠 และฝึกเส้นหักของ 书","读 has 讠; watch the turning stroke in 书.","รักการเรียน"],
  ["写字","xiězì","เขียนตัวอักษร","Write characters","我在田字格里认真写字给老师看。","Wǒ zài tiánzìgé li rènzhēn xiězì gěi lǎoshī kàn.","ฉันตั้งใจเขียนในช่องตารางให้ครูดู","I write carefully in the grid for my teacher.","写字，写字的写，汉字的字","字 有宀和子","字 มีหลังคา 宀 และ 子","字 contains 宀 and 子.","ตั้งใจฝึก"],
  ["听话","tīnghuà","ฟังคำแนะนำ","Listen to guidance","弟弟听话，也会说出自己的想法。","Dìdi tīnghuà, yě huì shuōchū zìjǐ de xiǎngfǎ.","น้องชายฟังคำแนะนำและบอกความคิดตนเองได้","Little brother listens and shares his own thoughts.","听话，听见的听，说话的话","话 有讠","讠 ใน 话 เกี่ยวกับคำพูด","讠 in 话 relates to speech.","ฟังอย่างมีเหตุผล"]
]);

export const p1Week2 = make(2, [
  ["校","xiào","โรงเรียน","School","每天早上，我背着书包来到学校。","Měitiān zǎoshang, wǒ bēizhe shūbāo láidào xuéxiào.","ทุกเช้าฉันสะพายกระเป๋ามาโรงเรียน","Every morning I carry my bag to school.","学校的校","校 有木和交","木 เป็นส่วนประกอบซ้าย 交 ช่วยบอกเสียง","木 is the left component; 交 is a sound clue.","รักโรงเรียน"],
  ["学","xué","เรียน","Learn","我们每天都在学校学习新的知识。","Wǒmen měitiān dōu zài xuéxiào xuéxí xīn de zhīshi.","เราทุกวันเรียนความรู้ใหม่ที่โรงเรียน","We learn new things at school every day.","学习的学","学 下面是子","子 คือเด็กอยู่ล่าง","子 means child.","ใฝ่เรียน"],
  ["师","shī","ครู","Teacher","老师耐心教我们读书和写字。","Lǎoshī nàixīn jiāo wǒmen dúshū hé xiězì.","ครูอดทนสอนเราอ่านและเขียน","The teacher patiently teaches us reading and writing.","老师的师","师 右边有巾","巾 อยู่ส่วนขวา","巾 is on the right.","เคารพครู"],
  ["生","shēng","นักเรียน / เกิด","Student / life","我是一个认真学习的小学生。","Wǒ shì yí ge rènzhēn xuéxí de xiǎoxuéshēng.","ฉันเป็นนักเรียนประถมที่ตั้งใจเรียน","I am a hardworking primary pupil.","学生的生","生 像向上生长","生 ชวนให้นึกถึงการงอกขึ้น","生 suggests growing upward.","ขยันเรียน"],
  ["门","mén","ประตู","Door","我轻轻地把教室的门关好。","Wǒ qīngqīng de bǎ jiàoshì de mén guān hǎo.","ฉันปิดประตูห้องเรียนเบา ๆ","I gently close the classroom door.","大门的门","门 像门框","门 คล้ายกรอบประตู","门 resembles a door frame.","ระวังประตู"],
  ["课","kè","บทเรียน","Lesson","今天的华文课让我学到很多知识。","Jīntiān de Huáwén kè ràng wǒ xuédào hěn duō zhīshi.","คาบภาษาจีนวันนี้ทำให้ฉันมีความรู้มาก","Today's Mandarin lesson taught me many things.","上课的课","课 有讠和果","讠 เกี่ยวกับคำพูด 果 ช่วยบอกเสียง","讠 relates to speech; 果 is a sound clue.","ตั้งใจเรียน"],
  ["学校","xuéxiào","โรงเรียน","School","我和朋友每天一起走进学校大门。","Wǒ hé péngyou měitiān yìqǐ zǒujìn xuéxiào dàmén.","ฉันกับเพื่อนเดินเข้าโรงเรียนด้วยกันทุกวัน","My friend and I enter school together daily.","学校，学习的学，学校的校","学 有子；校 有木","学 มี 子 และ 校 มี 木","学 has 子; 校 has 木.","ตรงต่อเวลา"],
  ["老师","lǎoshī","คุณครู","Teacher","老师每天都耐心地教我们学习。","Lǎoshī měitiān dōu nàixīn de jiāo wǒmen xuéxí.","ครูสอนเราด้วยความอดทนทุกวัน","Our teacher teaches us patiently each day.","老师，老人的老，老师的师","老 上面像耂","老 มี 耂 เป็นส่วนบน","老 has 耂 at the top.","ขอบคุณครู"],
  ["学生","xuéshēng","นักเรียน","Student","每个学生都要爱护自己的课本。","Měi ge xuéshēng dōu yào àihù zìjǐ de kèběn.","นักเรียนทุกคนควรดูแลหนังสือเรียนของตน","Every student should look after their textbooks.","学生，学习的学，生活的生","学 有子；生 有横画","学 มี 子 และ 生 มีเส้นนอน","学 has 子; 生 has horizontal strokes.","ดูแลของเรียน"],
  ["上课","shàngkè","เข้าเรียน","Attend class","上课以前，我们先把课本准备好。","Shàngkè yǐqián, wǒmen xiān bǎ kèběn zhǔnbèi hǎo.","ก่อนเรียนเราเตรียมหนังสือให้พร้อม","Before class we prepare our textbooks.","上课，上下的上，课本的课","上 的短画在横线上","ขีดสั้นของ 上 อยู่เหนือเส้นยาว","The short stroke is above the baseline in 上.","เตรียมตัว"]
]);

export const p1Week3 = make(3, [
  ["友","yǒu","เพื่อน","Friend","在学校里，我愿意和大家交朋友。","Zài xuéxiào li, wǒ yuànyì hé dàjiā jiāo péngyou.","ที่โรงเรียนฉันยินดีผูกมิตรกับทุกคน","At school I like making friends.","朋友的友","友 下面有又","又 อยู่ด้านล่างของ 友","又 is at the bottom.","เป็นมิตร"],
  ["礼","lǐ","มารยาท / พิธี","Courtesy","我见到长辈时会先行礼问好。","Wǒ jiàndào zhǎngbèi shí huì xiān xínglǐ wènhǎo.","พบผู้ใหญ่ฉันคารวะทักทายก่อน","When I meet elders, I greet them respectfully.","礼貌的礼","礼 有礻","礻 เกี่ยวกับพิธีและการเคารพ","礻 relates to ritual and respect.","สุภาพ"],
  ["谢","xiè","ขอบคุณ","Thank","别人帮助我的时候，我会说谢谢。","Biérén bāngzhù wǒ de shíhou, wǒ huì shuō xièxie.","เมื่อคนอื่นช่วยฉัน ฉันจะขอบคุณ","When others help me, I say thanks.","谢谢的谢","谢 有讠和射","讠 เกี่ยวกับคำพูด","讠 relates to speech.","รู้คุณ"],
  ["请","qǐng","เชิญ / ขอ","Please","借书时我会说请，然后耐心等待。","Jiè shū shí wǒ huì shuō qǐng, ránhòu nàixīn děngdài.","เวลายืมหนังสือฉันขออย่างสุภาพแล้วรอ","I ask politely to borrow a book and wait patiently.","请问的请","请 有讠和青","讠 คือคำพูด 青 ช่วยเสียง","讠 is speech; 青 is a sound clue.","ขออนุญาต"],
  ["让","ràng","ให้ทาง / ให้","Let / yield","在走廊里，我主动让同学先走。","Zài zǒuláng li, wǒ zhǔdòng ràng tóngxué xiān zǒu.","ในทางเดินฉันให้เพื่อนเดินก่อน","In the corridor I let classmates go first.","让座的让","让 有讠和上","讠 อยู่ซ้าย 上 อยู่ขวา","讠 is left; 上 is right.","รู้จักเสียสละ"],
  ["帮","bāng","ช่วย","Help","看见朋友有困难，我会马上帮他。","Kànjiàn péngyou yǒu kùnnan, wǒ huì mǎshàng bāng tā.","เห็นเพื่อนลำบากฉันช่วยทันที","I help friends when they have difficulties.","帮忙的帮","帮 下面有巾","巾 อยู่ล่างของ 帮","巾 is below.","มีน้ำใจ"],
  ["朋友","péngyou","เพื่อน","Friend","我和朋友一起玩游戏，也一起学习。","Wǒ hé péngyou yìqǐ wán yóuxì, yě yìqǐ xuéxí.","ฉันเล่นและเรียนกับเพื่อน","My friend and I play and study together.","朋友，朋是两个月，友好的友","朋 有两个相同的月形","朋 มีรูป 月 สองรูป","朋 has two 月-shaped components.","แบ่งปัน"],
  ["礼貌","lǐmào","มารยาท","Politeness","有礼貌的孩子会认真听别人说话。","Yǒu lǐmào de háizi huì rènzhēn tīng biérén shuōhuà.","เด็กมีมารยาทตั้งใจฟังผู้อื่น","A polite child listens carefully to others.","礼貌，礼节的礼，相貌的貌","礼 有礻；貌 右边是皃","礼 มี 礻 และ 貌 ขวาเป็น 皃","礼 has 礻; 貌 has 皃 on the right.","เคารพผู้อื่น"],
  ["谢谢","xièxie","ขอบคุณ","Thank you","同学借我铅笔，我微笑着说谢谢。","Tóngxué jiè wǒ qiānbǐ, wǒ wēixiàozhe shuō xièxie.","เพื่อนให้ยืมดินสอ ฉันยิ้มขอบคุณ","A classmate lends me a pencil; I smile and thank them.","谢谢，感谢的谢","谢 有讠","讠 เกี่ยวกับคำพูด","讠 relates to speech.","ขอบคุณเสมอ"],
  ["帮忙","bāngmáng","ช่วยเหลือ","Help","妈妈在厨房做饭时，我主动帮忙。","Māma zài chúfáng zuòfàn shí, wǒ zhǔdòng bāngmáng.","แม่ทำอาหารในครัวฉันอาสาช่วย","I offer to help when Mom cooks.","帮忙，帮助的帮，忙碌的忙","忙 有忄和亡","忄 เกี่ยวกับจิตใจ","忄 relates to feelings.","ช่วยงานบ้าน"]
]);

export const p1Week4 = make(4, [
  ["孝","xiào","กตัญญู","Filial respect","我们用实际行动表达对父母的孝心。","Wǒmen yòng shíjì xíngdòng biǎodá duì fùmǔ de xiàoxīn.","เราแสดงความกตัญญูต่อพ่อแม่ด้วยการกระทำ","We show care for parents through actions.","孝顺的孝","孝 有耂和子","耂 ผู้สูงอายุ 子 เด็ก ช่วยจำการดูแล","耂 and 子 help recall generations.","กตัญญูอย่างเหมาะสม"],
  ["父","fù","พ่อ","Father","我常常和父亲一起整理家里的书。","Wǒ chángcháng hé fùqīn yìqǐ zhěnglǐ jiālǐ de shū.","ฉันมักช่วยพ่อจัดหนังสือที่บ้าน","I often sort books with my father.","父亲的父","父 有交叉笔画","父 มีเส้นไขว้","父 has crossing strokes.","ช่วยเหลือพ่อ"],
  ["母","mǔ","แม่","Mother","母亲忙碌的时候，我会帮她拿东西。","Mǔqīn mánglù de shíhou, wǒ huì bāng tā ná dōngxi.","แม่ยุ่งฉันช่วยหยิบของ","When Mother is busy, I help her carry things.","母亲的母","母 中间有两点","母 มีสองจุดด้านใน","母 has two dots inside.","ดูแลแม่"],
  ["兄","xiōng","พี่ชาย","Older brother","兄长耐心地教我怎样整理书包。","Xiōngzhǎng nàixīn de jiāo wǒ zěnyàng zhěnglǐ shūbāo.","พี่ชายสอนฉันจัดกระเป๋าอย่างอดทน","My older brother patiently teaches me to pack my bag.","兄弟的兄","兄 上面是口，下面是儿","口 อยู่บน 儿 อยู่ล่าง","口 is above 儿.","รักพี่น้อง"],
  ["弟","dì","น้องชาย","Younger brother","弟弟摔倒的时候，我轻轻扶他起来。","Dìdi shuāidǎo de shíhou, wǒ qīngqīng fú tā qǐlái.","น้องล้มฉันพยุงเขาเบา ๆ","When my brother falls, I gently help him up.","弟弟的弟","弟 中间有弓形","ส่วนกลางคล้าย 弓","The middle resembles 弓.","ช่วยน้อง"],
  ["爱","ài","รัก","Love","我爱我的家人，也尊重他们的想法。","Wǒ ài wǒ de jiārén, yě zūnzhòng tāmen de xiǎngfǎ.","ฉันรักครอบครัวและเคารพความคิดของเขา","I love my family and respect their ideas.","爱心的爱","爱 上爫下友","爱 มี 爫 ด้านบนและ 友 ด้านล่าง","爱 has 爫 above and 友 below.","รักและเคารพ"],
  ["家庭","jiātíng","ครอบครัว","Family","我们家庭的每个人都会互相帮助。","Wǒmen jiātíng de měi ge rén dōu huì hùxiāng bāngzhù.","ทุกคนในครอบครัวช่วยกัน","Everyone in our family helps each other.","家庭，家人的家，庭院的庭","家 有宀；庭 有广","宀 และ 广 ชวนให้นึกถึงอาคาร","宀 and 广 suggest buildings.","ร่วมมือกัน"],
  ["孝顺","xiàoshùn","กตัญญูและเอาใจใส่","Care for parents","孝顺不是盲从，而是关心和尊重父母。","Xiàoshùn bú shì mángcóng, ér shì guānxīn hé zūnzhòng fùmǔ.","กตัญญูไม่ใช่เชื่อฟังโดยไม่คิด แต่ดูแลและเคารพพ่อแม่","Filial care means concern and respect, not blind obedience.","孝顺，孝心的孝，顺利的顺","孝 有子；顺 有页","孝 มี 子 และ 顺 มี 页","孝 has 子; 顺 has 页.","รักพร้อมรู้ขอบเขต"],
  ["长辈","zhǎngbèi","ผู้ใหญ่ในครอบครัว","Elder","见到长辈时，我们微笑着主动问好。","Jiàndào zhǎngbèi shí, wǒmen wēixiàozhe zhǔdòng wènhǎo.","พบผู้ใหญ่เรายิ้มทักทายก่อน","We greet our elders with a smile.","长辈，长大的长，辈分的辈","辈 上非下车","辈 มี 非 บน 车 ล่าง","辈 has 非 above 车.","สุภาพกับผู้ใหญ่"],
  ["关心","guānxīn","ใส่ใจ","Care about","我会关心家人，也会照顾自己。","Wǒ huì guānxīn jiārén, yě huì zhàogù zìjǐ.","ฉันใส่ใจครอบครัวและดูแลตนเอง","I care for my family and myself.","关心，关门的关，心脏的心","心 像心跳的点画","心 มีจุดและเส้นโค้ง ชวนจำหัวใจ","心 has dots and curved strokes.","เอาใจใส่"]
]);

export const p1Week5 = make(5, [
  ["手","shǒu","มือ","Hand","我每天用双手帮助家人做些事情。","Wǒ měitiān yòng shuāngshǒu bāngzhù jiārén zuò xiē shìqing.","ฉันใช้มือช่วยงานครอบครัวทุกวัน","I use my hands to help my family daily.","双手的手","手 有弯钩","手 มีขีดโค้งงอ","手 has a curved hook.","ช่วยเหลือ"],
  ["足","zú","เท้า","Foot","我用双足一步一步地走向教室。","Wǒ yòng shuāngzú yí bù yí bù de zǒuxiàng jiàoshì.","ฉันใช้เท้าสองข้างเดินไปห้องเรียน","I walk step by step to class.","足球的足","足 上面有口形","足 มีรูป 口 ด้านบน","足 has a 口-shaped top.","เดินระวัง"],
  ["口","kǒu","ปาก","Mouth","我们用自己的口说出温暖的话。","Wǒmen yòng zìjǐ de kǒu shuōchū wēnnuǎn de huà.","เราใช้ปากพูดคำอบอุ่น","We use our mouths to say kind words.","口中的口","口 是方框形","口 เป็นกรอบสี่เหลี่ยม","口 looks like a square opening.","พูดดี"],
  ["目","mù","ตา","Eye","我用目光认真观察窗外的小鸟。","Wǒ yòng mùguāng rènzhēn guānchá chuāngwài de xiǎoniǎo.","ฉันใช้สายตาสังเกตนกนอกหน้าต่าง","I observe the birds outside with my eyes.","耳目的目","目 像竖着的眼睛","目 คล้ายดวงตาแนวตั้ง","目 resembles a vertical eye.","สังเกต"],
  ["耳","ěr","หู","Ear","我用耳朵仔细听清老师的指示。","Wǒ yòng ěrduo zǐxì tīngqīng lǎoshī de zhǐshì.","ฉันใช้หูฟังคำแนะนำครูอย่างตั้งใจ","I listen carefully to the teacher's instructions.","耳朵的耳","耳 有多条横画","耳 มีเส้นนอนหลายเส้น","耳 has several horizontal strokes.","ฟังอย่างตั้งใจ"],
  ["牙","yá","ฟัน","Tooth","每天早晚，我都会认真刷干净牙齿。","Měitiān zǎowǎn, wǒ dōu huì rènzhēn shuā gānjìng yáchǐ.","ทุกเช้าเย็นฉันแปรงฟันให้สะอาด","I brush my teeth carefully morning and night.","牙齿的牙","牙 有弯钩和撇","牙 มีขีดงอและขีดปัด","牙 has a hook and diagonal stroke.","รักษาสุขอนามัย"],
  ["洗手","xǐshǒu","ล้างมือ","Wash hands","吃饭以前，我们都要认真洗手。","Chīfàn yǐqián, wǒmen dōu yào rènzhēn xǐshǒu.","ก่อนกินข้าวเราต้องล้างมือให้ดี","Before eating, we should wash our hands carefully.","洗手，洗澡的洗，双手的手","洗 有氵和先","氵 ชวนจำการใช้น้ำ","氵 suggests water.","ล้างมือ"],
  ["刷牙","shuāyá","แปรงฟัน","Brush teeth","睡觉以前，我会自己认真刷牙。","Shuìjiào yǐqián, wǒ huì zìjǐ rènzhēn shuāyá.","ก่อนนอนฉันแปรงฟันด้วยตนเอง","Before bed I brush my teeth myself.","刷牙，刷子的刷，牙齿的牙","刷 右边有刂","刂 อยู่ขวาของ 刷","刂 is on the right.","ดูแลฟัน"],
  ["干净","gānjìng","สะอาด","Clean","我们把桌子擦得非常干净整齐。","Wǒmen bǎ zhuōzi cā de fēicháng gānjìng zhěngqí.","เราเช็ดโต๊ะให้สะอาดเรียบร้อย","We wipe the table clean and tidy.","干净，干燥的干，洁净的净","净 有冫和争","净 มี 冫 กับ 争","净 contains 冫 and 争.","รักษาความสะอาด"],
  ["健康","jiànkāng","สุขภาพดี","Healthy","每天运动和休息能帮助我们保持健康。","Měitiān yùndòng hé xiūxi néng bāngzhù wǒmen bǎochí jiànkāng.","ออกกำลังและพักผ่อนช่วยให้สุขภาพดี","Exercise and rest help us stay healthy.","健康，健身的健，健康的康","健 有亻","亻 เกี่ยวกับคน","亻 relates to people.","ดูแลตนเอง"]
]);

export const p1Week6 = make(6, [
  ["水","shuǐ","น้ำ","Water","我们每天都喝足量的干净清水。","Wǒmen měitiān dōu hē zúliàng de gānjìng qīngshuǐ.","เราดื่มน้ำสะอาดเพียงพอทุกวัน","We drink enough clean water every day.","喝水的水","水 像水流的分支","水 คล้ายสายน้ำแตกแขนง","水 resembles branching water.","ประหยัดน้ำ"],
  ["火","huǒ","ไฟ","Fire","看见火时，我们应该立刻告诉大人。","Kànjiàn huǒ shí, wǒmen yīnggāi lìkè gàosu dàrén.","เมื่อเห็นไฟเราควรบอกผู้ใหญ่ทันที","When we see fire, we tell an adult immediately.","火苗的火","火 像跳动的火焰","火 คล้ายเปลวไฟ","火 resembles flames.","ไม่เล่นไฟ"],
  ["日","rì","ดวงอาทิตย์ / วัน","Sun / day","日出的时候，整个校园慢慢亮起来。","Rìchū de shíhou, zhěnggè xiàoyuán mànmàn liàng qǐlái.","เมื่อพระอาทิตย์ขึ้นโรงเรียนค่อย ๆ สว่าง","At sunrise the school gradually brightens.","日月的日","日 有方框和一横","日 มีกรอบและเส้นกลาง","日 has a box and inner stroke.","ชื่นชมธรรมชาติ"],
  ["月","yuè","ดวงจันทร์ / เดือน","Moon / month","晚上我们一起看天上的月亮和星星。","Wǎnshang wǒmen yìqǐ kàn tiānshàng de yuèliang hé xīngxing.","ตอนค่ำเราดูดวงจันทร์และดาวด้วยกัน","At night we look at the moon and stars together.","月亮的月","月 有两个内横","月 มีสองเส้นด้านใน","月 has two inner horizontal strokes.","สนใจท้องฟ้า"],
  ["山","shān","ภูเขา","Mountain","假日里，我们和家人一起去看山。","Jiàrì li, wǒmen hé jiārén yìqǐ qù kàn shān.","วันหยุดเราไปชมภูเขากับครอบครัว","On holidays we visit the mountains together.","高山的山","山 像三个山峰","山 คล้ายยอดเขาสามยอด","山 resembles three peaks.","รักษาธรรมชาติ"],
  ["木","mù","ไม้","Wood / tree","我们坐着木头做的小椅子一起聊天。","Wǒmen zuòzhe mùtou zuò de xiǎo yǐzi yìqǐ liáotiān.","เรานั่งเก้าอี้ไม้เล็ก ๆ คุยกัน","We sit together on little wooden chairs and chat.","木头的木","木 像树干和枝条","木 คล้ายลำต้นและกิ่ง","木 resembles a trunk and branches.","ไม่ทำลายต้นไม้"],
  ["花","huā","ดอกไม้","Flower","我每天给窗边的小花浇一点水。","Wǒ měitiān gěi chuāngbiān de xiǎohuā jiāo yìdiǎn shuǐ.","ฉันรดน้ำดอกไม้ริมหน้าต่างทุกวัน","I water the little flower by the window daily.","花朵的花","花 有艹和化","艹 เกี่ยวกับพืช","艹 relates to plants.","ดูแลพืช"],
  ["草","cǎo","หญ้า","Grass","我们走在小路上，不踩旁边的草。","Wǒmen zǒu zài xiǎolù shàng, bù cǎi pángbiān de cǎo.","เราเดินบนทาง ไม่เหยียบหญ้าข้างทาง","We stay on the path and avoid the grass.","青草的草","草 上面是艹","艹 อยู่ด้านบน","艹 is above.","รักพื้นที่สีเขียว"],
  ["树木","shùmù","ต้นไม้","Trees","校园里的树木给我们带来阴凉。","Xiàoyuán li de shùmù gěi wǒmen dàilái yīnliáng.","ต้นไม้ในโรงเรียนให้ร่มเงา","The school trees provide shade for us.","树木，大树的树，木头的木","树 有木旁","木 เกี่ยวกับต้นไม้","木 relates to trees.","ปกป้องต้นไม้"],
  ["自然","zìrán","ธรรมชาติ","Nature","我们应该爱护自然，保持环境清洁。","Wǒmen yīnggāi àihù zìrán, bǎochí huánjìng qīngjié.","เราควรรักธรรมชาติและรักษาความสะอาด","We should care for nature and keep it clean.","自然，自己的自，自然的然","然 下面有灬","灬 อยู่ล่างของ 然","灬 is at the bottom.","ดูแลโลก"]
]);

export const p1Week7 = make(7, [
  ["早","zǎo","เช้า","Early","我每天早早起床，自己整理书包。","Wǒ měitiān zǎozǎo qǐchuáng, zìjǐ zhěnglǐ shūbāo.","ทุกวันฉันตื่นเช้าและจัดกระเป๋าเอง","I get up early and pack my bag daily.","早上的早","早 上日下十","早 มี 日 บน 十 ล่าง","早 has 日 above 十.","ตรงต่อเวลา"],
  ["晚","wǎn","เย็น / ค่ำ","Evening","每天晚上，我们一家人一起吃饭。","Měitiān wǎnshang, wǒmen yì jiā rén yìqǐ chīfàn.","ทุกค่ำครอบครัวกินข้าวด้วยกัน","We eat dinner together every evening.","晚上的晚","晚 有日和免","日 เกี่ยวกับเวลา","日 relates to time.","ใช้เวลากับครอบครัว"],
  ["今","jīn","วันนี้ / ปัจจุบัน","Now / today","今天我想帮老师整理教室里的书。","Jīntiān wǒ xiǎng bāng lǎoshī zhěnglǐ jiàoshì li de shū.","วันนี้ฉันอยากช่วยครูจัดหนังสือ","Today I want to help arrange classroom books.","今天的今","今 上面有人形","今 มีรูป 人 ด้านบน","今 has a 人-shaped top.","ทำวันนี้ให้ดี"],
  ["明","míng","สว่าง / พรุ่งนี้","Bright / tomorrow","明天我会带着准备好的书包上学。","Míngtiān wǒ huì dàizhe zhǔnbèi hǎo de shūbāo shàngxué.","พรุ่งนี้ฉันจะนำกระเป๋าที่เตรียมไปโรงเรียน","Tomorrow I will bring my prepared bag to school.","明天的明","明 有日和月","日 ดวงอาทิตย์ 月 ดวงจันทร์","日 is sun and 月 is moon.","เตรียมพร้อม"],
  ["做","zuò","ทำ","Do","我每天都自己做力所能及的事情。","Wǒ měitiān dōu zìjǐ zuò lìsuǒnéngjí de shìqing.","ฉันทำสิ่งที่ทำได้ด้วยตนเองทุกวัน","I do things I can manage by myself daily.","做事的做","做 有亻和故","亻 เกี่ยวกับคน","亻 relates to people.","รับผิดชอบ"],
  ["玩","wán","เล่น","Play","下课后，我们在安全的地方一起玩。","Xiàkè hòu, wǒmen zài ānquán de dìfang yìqǐ wán.","หลังเรียนเราเล่นในที่ปลอดภัยด้วยกัน","After class we play together somewhere safe.","玩具的玩","玩 有王形旁和元","王 รูปคล้ายหยก 元 อยู่ขวา","The jade-shaped 王 component is left of 元.","เล่นปลอดภัย"],
  ["起床","qǐchuáng","ตื่นนอน","Get up","每天听到闹钟，我就马上起床。","Měitiān tīngdào nàozhōng, wǒ jiù mǎshàng qǐchuáng.","ทุกวันพอได้ยินนาฬิกาฉันลุกทันที","Every day I get up when the alarm rings.","起床，起来的起，床铺的床","起 有走；床 有广","走 ชวนจำการลุกเดิน 广 อยู่บน 床","走 suggests movement; 床 contains 广.","ฝึกวินัย"],
  ["吃饭","chīfàn","กินข้าว","Eat a meal","吃饭的时候，我们不浪费盘里的食物。","Chīfàn de shíhou, wǒmen bù làngfèi pán li de shíwù.","เวลากินข้าวเราไม่ทิ้งอาหาร","At meals we do not waste food.","吃饭，吃东西的吃，米饭的饭","吃 有口；饭 有饣","口 เกี่ยวกับปาก 饣 เกี่ยวกับอาหาร","口 is mouth; 饣 relates to food.","ไม่ทิ้งอาหาร"],
  ["睡觉","shuìjiào","นอนหลับ","Sleep","每天按时睡觉，第二天才有精神。","Měitiān ànshí shuìjiào, dì’èr tiān cái yǒu jīngshen.","นอนตรงเวลาทุกวันเพื่อให้สดชื่นวันถัดไป","Sleeping on time helps us feel fresh next day.","睡觉，睡眠的睡，睡觉的觉","睡 有目","目 เกี่ยวกับดวงตา","目 relates to eyes.","พักผ่อน"],
  ["整理","zhěnglǐ","จัดระเบียบ","Organize","放学回家以后，我先整理自己的书桌。","Fàngxué huí jiā yǐhòu, wǒ xiān zhěnglǐ zìjǐ de shūzhuō.","กลับบ้านหลังเรียนฉันจัดโต๊ะก่อน","After school I first tidy my desk.","整理，整齐的整，道理的理","整 有正；理 有王形旁","正 ช่วยจำความเรียบร้อย","正 helps recall order.","จัดของตนเอง"]
]);

export const p1Week8 = make(8, [
  ["诚","chéng","จริงใจ","Sincerity","我们应该用真诚的态度对待每个人。","Wǒmen yīnggāi yòng zhēnchéng de tàidu duìdài měi ge rén.","เราควรจริงใจกับทุกคน","We should treat everyone sincerely.","诚实的诚","诚 有讠和成","讠 เกี่ยวกับคำพูด 成 ช่วยเสียง","讠 relates to speech; 成 is a sound clue.","จริงใจ"],
  ["信","xìn","เชื่อ / ความน่าเชื่อถือ","Trust","我们要讲信用，答应的事努力做到。","Wǒmen yào jiǎng xìnyòng, dāying de shì nǔlì zuòdào.","เรารักษาคำพูดและพยายามทำสิ่งที่รับปาก","We keep our word and try to fulfil promises.","信用的信","信 有亻和言","亻 คน 言 คำพูด","亻 is person; 言 is words.","รักษาคำมั่น"],
  ["勇","yǒng","กล้า","Courage","遇到困难时，我会勇敢地寻求帮助。","Yùdào kùnnan shí, wǒ huì yǒnggǎn de xúnqiú bāngzhù.","เจอปัญหาฉันจะกล้าขอความช่วยเหลือ","When facing difficulty I bravely ask for help.","勇敢的勇","勇 下面有力","力 คือแรง","力 means strength.","กล้าขอความช่วยเหลือ"],
  ["忍","rěn","อดทน","Endure","排队的时候，我耐心忍住着急的心情。","Páiduì de shíhou, wǒ nàixīn rěnzhù zháojí de xīnqíng.","เวลาเข้าแถวฉันอดทนไม่ใจร้อน","While queueing I patiently manage my impatience.","忍耐的忍","忍 上刃下心","心 เกี่ยวกับความรู้สึก","心 relates to feelings.","อดทน"],
  ["善","shàn","ดี / เมตตา","Kindness","我们用善意的语言鼓励身边的朋友。","Wǒmen yòng shànyì de yǔyán gǔlì shēnbiān de péngyou.","เราใช้คำพูดเมตตาให้กำลังใจเพื่อน","We encourage friends with kind words.","善良的善","善 下面有口","口 ชวนจำคำพูดดี","口 reminds us of kind words.","มีเมตตา"],
  ["行","xíng","เดิน / กระทำ","Walk / act","我们沿着人行道走，不在马路上奔跑。","Wǒmen yánzhe rénxíngdào zǒu, bú zài mǎlù shàng bēnpǎo.","เราเดินบนทางเท้า ไม่วิ่งบนถนน","We walk on the sidewalk and do not run in the road.","行走的行","行 左边有彳形","彳 เกี่ยวกับการก้าวเดิน","彳 relates to walking.","ระวังถนน"],
  ["诚实","chéngshí","ซื่อสัตย์","Honest","做错事情以后，我们应该诚实地承认。","Zuòcuò shìqing yǐhòu, wǒmen yīnggāi chéngshí de chéngrèn.","เมื่อทำผิดเราควรยอมรับอย่างซื่อสัตย์","When we make mistakes we should admit them honestly.","诚实，真诚的诚，实在的实","诚 有讠；实 有宀","诚 มี 讠 และ 实 มี 宀","诚 has 讠; 实 has 宀.","ยอมรับความผิด"],
  ["勇敢","yǒnggǎn","กล้าหาญ","Brave","我勇敢地说出自己的意见和感受。","Wǒ yǒnggǎn de shuōchū zìjǐ de yìjiàn hé gǎnshòu.","ฉันกล้าบอกความคิดเห็นและความรู้สึก","I bravely express my ideas and feelings.","勇敢，勇气的勇，敢于的敢","勇 有力；敢 有攵","力 ชวนจำความกล้า","力 reminds us of strength.","กล้าแสดงออก"],
  ["守信","shǒuxìn","รักษาคำพูด","Keep promises","守信的人会认真履行自己的承诺。","Shǒuxìn de rén huì rènzhēn lǚxíng zìjǐ de chéngnuò.","คนรักษาคำพูดทำตามคำมั่นอย่างตั้งใจ","A trustworthy person keeps their promises.","守信，遵守的守，信用的信","守 有宀和寸","宀 และ 寸 เป็นส่วนของ 守","守 contains 宀 and 寸.","รักษาสัญญา"],
  ["友爱","yǒu’ài","รักและเป็นมิตร","Friendship and care","我们在班上互相友爱，一起快乐学习。","Wǒmen zài bān shàng hùxiāng yǒu’ài, yìqǐ kuàilè xuéxí.","ในห้องเรียนเราเป็นมิตรและเรียนอย่างมีความสุข","In class we care for each other and learn happily.","友爱，朋友的友，爱心的爱","友 和 爱 都有又形笔画","สังเกตส่วน 又 และ 友 ใน 爱","Notice 又 in 友 and 友 in 爱.","รักเพื่อน"]
]);

export const vocabP1:P1Word[] = [
  ...p1Week1,
  ...p1Week2,
  ...p1Week3,
  ...p1Week4,
  ...p1Week5,
  ...p1Week6,
  ...p1Week7,
  ...p1Week8
];
export function getP1WeekVocab(week:number){return vocabP1.filter(word=>word.week===week);}
export default vocabP1;
