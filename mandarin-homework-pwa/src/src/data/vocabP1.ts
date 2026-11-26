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
type Row = [string,string,string,string,string,string,string,string,string,string,string,string,string,[string,string,string,string]];
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
  return rows.map(([hanzi,pinyin,meaning_th,meaning_en,h,p,th,en,dictation,radical_tip_zh,radical_tip_th,radical_tip_en,moral_lesson_th,second],i)=>({
    id:'P1-W'+String(week)+'-'+String(i+1).padStart(2,'0'),
    grade:1,week,unit_title_th:unit.title_th,unit_title_en:unit.title_en,
    hanzi,pinyin,meaning_th,meaning_en,is_mandatory_write:true,
    sentences:[
      {hanzi:h,pinyin:p,meaning_th:th,meaning_en:en},
      {hanzi:second[0],pinyin:second[1],meaning_th:second[2],meaning_en:second[3]}
    ],
    example_sentence:h,example_pinyin:p,example_th:th,example_en:en,
    memory_tip_th:radical_tip_th,memory_tip_en:radical_tip_en,moral_lesson_th,
    tingxie_callout_th:'คำใบ้เขียนตามคำบอก: '+dictation,tingxie_callout_zh:dictation,
    radical_tip_th,radical_tip_en,radical_tip_zh,
    illustration:{scene:hanzi,animation:'bounce'}
  }));
}

export const p1Week1 = make(1, [
  ["听","tīng","ฟัง","Listen","上课的时候，我认真听老师讲故事。","Shàngkè de shíhou, wǒ rènzhēn tīng lǎoshī jiǎng gùshi.","เวลาเรียนฉันตั้งใจฟังครูเล่านิทาน","In class I listen carefully to my teacher's story.","听话的听","听 有口，联想到声音","ปาก 口 อยู่ข้างหูที่กำลังฟังเสียงร้องเพลง","口 reminds us of sounds.","ตั้งใจฟัง",["我喜欢听音乐。","Wǒ xǐhuan tīng yīnyuè.","ฉันชอบฟังเพลง","I like listening to music."]],
  ["说","shuō","พูด","Speak","我每天都用华语和同学说话。","Wǒ měitiān dōu yòng Huáyǔ hé tóngxué shuōhuà.","ทุกวันฉันพูดภาษาจีนกับเพื่อนร่วมชั้น","I speak Mandarin with classmates daily.","说话的说","说 有讠","จินตนาการคำพูดลอยออกจากปากเป็นเครื่องหมาย 讠","讠 relates to speech.","พูดสุภาพ",["妹妹会说中文。","Mèimei huì shuō Zhōngwén.","น้องสาวพูดภาษาจีนได้","My sister can speak Chinese."]],
  ["读","dú","อ่าน","Read","放学以后，我在家里读一本书。","Fàngxué yǐhòu, wǒ zài jiālǐ dú yì běn shū.","หลังเลิกเรียนฉันอ่านหนังสือที่บ้านหนึ่งเล่ม","After school I read a book at home.","读书的读","读 有讠","讠 เหมือนช่องคำพูดของคนอ่านหนังสือออกเสียง","讠 reminds us of spoken reading.","รักการอ่าน",["爷爷读报纸。","Yéye dú bàozhǐ.","คุณปู่อ่านหนังสือพิมพ์","Grandpa reads the newspaper."]],
  ["写","xiě","เขียน","Write","我每天认真写字，不让字迹太乱。","Wǒ měitiān rènzhēn xiězì, bú ràng zìjì tài luàn.","ฉันตั้งใจเขียนทุกวัน ไม่ให้ลายมือรก","I write neatly every day.","写字的写","写 上面是冖","ใต้ฝา 冖 มีมือกำลังเขียนตัวอักษรลงสมุด","冖 looks like a cover.","ฝึกเขียนสม่ำเสมอ",["我写下自己的名字。","Wǒ xiěxià zìjǐ de míngzi.","ฉันเขียนชื่อตัวเองลงไป","I write down my name."]],
  ["看","kàn","ดู","Look","我和姐姐一起看一本有趣的书。","Wǒ hé jiějie yìqǐ kàn yì běn yǒuqù de shū.","ฉันกับพี่สาวอ่านหนังสือน่าสนใจด้วยกัน","My sister and I look at an interesting book.","看书的看","看 下面是目","มือบังแดดเหนือดวงตา 目 เพื่อมองให้ชัด","目 means eye.","ช่างสังเกต",["我们看窗外的小鸟。","Wǒmen kàn chuāngwài de xiǎoniǎo.","เรามองนกน้อยนอกหน้าต่าง","We look at the little bird outside."]],
  ["问","wèn","ถาม","Ask","如果我不明白，就举手问老师。","Rúguǒ wǒ bù míngbai, jiù jǔshǒu wèn lǎoshī.","ถ้าไม่เข้าใจฉันยกมือถามครู","If I don't understand, I raise my hand and ask.","问题的问","问 有门和口","ปาก 口 อยู่ในกรอบประตู 门 เหมือนเด็กเคาะประตูแล้วถาม","口 inside 门 suggests asking.","กล้าถาม",["我问妈妈几点吃饭。","Wǒ wèn māma jǐ diǎn chīfàn.","ฉันถามแม่ว่ากินข้าวกี่โมง","I ask Mom what time we eat."]],
  ["答","dá","ตอบ","Answer","老师提问时，我举手认真地回答。","Lǎoshī tíwèn shí, wǒ jǔshǒu rènzhēn de huídá.","เมื่อครูถามฉันยกมือตอบอย่างตั้งใจ","When the teacher asks, I raise my hand and answer.","回答的答","答 上面是⺮","ใต้ยอดไผ่ ⺮ มีคำตอบ 合 ที่เขียนลงกระดาษ","⺮ is the bamboo component.","ตอบตามจริง",["他答对了这道题。","Tā dá duì le zhè dào tí.","เขาตอบโจทย์ข้อนี้ถูก","He answered this question correctly."]],
  ["读书","dúshū","อ่านหนังสือ","Read books","每天晚上，我和妈妈一起读书。","Měitiān wǎnshang, wǒ hé māma yìqǐ dúshū.","ทุกเย็นฉันอ่านหนังสือกับแม่","Every evening I read with Mom.","读书，读书的读，书本的书","读 有讠；书 要注意横折","เปิดหนังสือ 书 แล้วอ่านออกเสียงผ่าน 讠","读 has 讠; watch the turning stroke in 书.","รักการเรียน",["哥哥在树下读书。","Gēge zài shù xià dúshū.","พี่ชายอ่านหนังสือใต้ต้นไม้","My brother reads under a tree."]],
  ["写字","xiězì","เขียนตัวอักษร","Write characters","我在田字格里认真写字给老师看。","Wǒ zài tiánzìgé li rènzhēn xiězì gěi lǎoshī kàn.","ฉันตั้งใจเขียนในช่องตารางให้ครูดู","I write carefully in the grid for my teacher.","写字，写字的写，汉字的字","字 有宀和子","ใต้หลังคา 宀 เด็ก 子 เขียน 字 ลงสมุด","字 contains 宀 and 子.","ตั้งใจฝึก",["妹妹用铅笔写字。","Mèimei yòng qiānbǐ xiězì.","น้องสาวใช้ดินสอเขียนตัวอักษร","My sister writes characters with a pencil."]],
  ["听话","tīnghuà","ฟังคำแนะนำ","Listen to guidance","弟弟听话，也会说出自己的想法。","Dìdi tīnghuà, yě huì shuōchū zìjǐ de xiǎngfǎ.","น้องชายฟังคำแนะนำและบอกความคิดตนเองได้","Little brother listens and shares his own thoughts.","听话，听见的听，说话的话","话 有讠","ปากพูดและหูฟังคำแนะนำเหมือนลูกสุนัขทำตามคำสั่ง","讠 in 话 relates to speech.","ฟังอย่างมีเหตุผล",["小狗很听话。","Xiǎogǒu hěn tīnghuà.","ลูกสุนัขเชื่อฟังดีมาก","The puppy listens well."]]
]);

export const p1Week2 = make(2, [
  ["校","xiào","โรงเรียน","School","每天早上，我背着书包来到学校。","Měitiān zǎoshang, wǒ bēizhe shūbāo láidào xuéxiào.","ทุกเช้าฉันสะพายกระเป๋ามาโรงเรียน","Every morning I carry my bag to school.","学校的校","校 有木和交","นึกถึงต้นไม้ 木 ที่หน้าประตูโรงเรียน","木 is the left component; 交 is a sound clue.","รักโรงเรียน",["校门口有一棵树。","Xiàoménkǒu yǒu yì kē shù.","หน้าประตูโรงเรียนมีต้นไม้หนึ่งต้น","There is a tree at the school gate."]],
  ["学","xué","เรียน","Learn","我们每天都在学校学习新的知识。","Wǒmen měitiān dōu zài xuéxiào xuéxí xīn de zhīshi.","เราทุกวันเรียนความรู้ใหม่ที่โรงเรียน","We learn new things at school every day.","学习的学","学 下面是子","เด็ก 子 ใต้ส่วนบนของตัว 学 ก้มหน้าเรียนหนังสือ","子 means child.","ใฝ่เรียน",["我跟妈妈学唱歌。","Wǒ gēn māma xué chànggē.","ฉันเรียนร้องเพลงกับแม่","I learn to sing with Mom."]],
  ["师","shī","ครู","Teacher","老师耐心教我们读书和写字。","Lǎoshī nàixīn jiāo wǒmen dúshū hé xiězì.","ครูอดทนสอนเราอ่านและเขียน","The teacher patiently teaches us reading and writing.","老师的师","师 右边有巾","巾 คล้ายผ้าห้อยข้างกระดานของครู","巾 is on the right.","เคารพครู",["厨师做了好吃的饭。","Chúshī zuò le hǎochī de fàn.","พ่อครัวทำอาหารอร่อย","The chef made a delicious meal."]],
  ["生","shēng","นักเรียน / เกิด","Student / life","我是一个认真学习的小学生。","Wǒ shì yí ge rènzhēn xuéxí de xiǎoxuéshēng.","ฉันเป็นนักเรียนประถมที่ตั้งใจเรียน","I am a hardworking primary pupil.","学生的生","生 像向上生长","ขีดตั้งเหมือนต้นอ่อนโผล่ขึ้นเหนือพื้นดิน","生 suggests growing upward.","ขยันเรียน",["花园里生出小草。","Huāyuán lǐ shēngchū xiǎocǎo.","หญ้าเล็ก ๆ งอกในสวน","Little grasses sprout in the garden."]],
  ["门","mén","ประตู","Door","我轻轻地把教室的门关好。","Wǒ qīngqīng de bǎ jiàoshì de mén guān hǎo.","ฉันปิดประตูห้องเรียนเบา ๆ","I gently close the classroom door.","大门的门","门 像门框","กรอบ 门 เหมือนประตูเปิดให้เดินลอด","门 resembles a door frame.","ระวังประตู",["爸爸打开门。","Bàba dǎkāi mén.","พ่อเปิดประตู","Dad opens the door."]],
  ["课","kè","บทเรียน","Lesson","今天的华文课让我学到很多知识。","Jīntiān de Huáwén kè ràng wǒ xuédào hěn duō zhīshi.","คาบภาษาจีนวันนี้ทำให้ฉันมีความรู้มาก","Today's Mandarin lesson taught me many things.","上课的课","课 有讠和果","讠 เหมือนครูกำลังพูดสอนหน้าห้อง","讠 relates to speech; 果 is a sound clue.","ตั้งใจเรียน",["今天有三节课。","Jīntiān yǒu sān jié kè.","วันนี้มีสามคาบเรียน","There are three lessons today."]],
  ["学校","xuéxiào","โรงเรียน","School","我和朋友每天一起走进学校大门。","Wǒ hé péngyou měitiān yìqǐ zǒujìn xuéxiào dàmén.","ฉันกับเพื่อนเดินเข้าโรงเรียนด้วยกันทุกวัน","My friend and I enter school together daily.","学校，学习的学，学校的校","学 有子；校 有木","เด็ก 子 เดินผ่านต้นไม้ 木 เข้าสู่โรงเรียน","学 has 子; 校 has 木.","ตรงต่อเวลา",["学校有一个大操场。","Xuéxiào yǒu yí ge dà cāochǎng.","โรงเรียนมีสนามใหญ่หนึ่งแห่ง","The school has a big playground."]],
  ["老师","lǎoshī","คุณครู","Teacher","老师每天都耐心地教我们学习。","Lǎoshī měitiān dōu nàixīn de jiāo wǒmen xuéxí.","ครูสอนเราด้วยความอดทนทุกวัน","Our teacher teaches us patiently each day.","老师，老人的老，老师的师","老 上面像耂","นึกภาพครูถือสมุดยืนหน้ากระดาน","老 has 耂 at the top.","ขอบคุณครู",["老师在黑板上画花。","Lǎoshī zài hēibǎn shang huà huā.","ครูวาดดอกไม้บนกระดานดำ","The teacher draws a flower on the board."]],
  ["学生","xuéshēng","นักเรียน","Student","每个学生都要爱护自己的课本。","Měi ge xuéshēng dōu yào àihù zìjǐ de kèběn.","นักเรียนทุกคนควรดูแลหนังสือเรียนของตน","Every student should look after their textbooks.","学生，学习的学，生活的生","学 有子；生 有横画","เด็ก 子 มือถือหนังสือเหมือนต้นอ่อน 生 ที่กำลังโต","学 has 子; 生 has horizontal strokes.","ดูแลของเรียน",["学生们在排队。","Xuéshengmen zài páiduì.","นักเรียนกำลังเข้าแถว","The students are lining up."]],
  ["上课","shàngkè","เข้าเรียน","Attend class","上课以前，我们先把课本准备好。","Shàngkè yǐqián, wǒmen xiān bǎ kèběn zhǔnbèi hǎo.","ก่อนเรียนเราเตรียมหนังสือให้พร้อม","Before class we prepare our textbooks.","上课，上下的上，课本的课","上 的短画在横线上","ขีด 上 อยู่เหนือเส้นพื้น เหมือนก้าวขึ้นเข้าห้องเรียน","The short stroke is above the baseline in 上.","เตรียมตัว",["铃响了，我们上课。","Líng xiǎng le, wǒmen shàngkè.","ระฆังดังแล้ว เราเข้าเรียน","The bell rang; we start class."]]
]);

export const p1Week3 = make(3, [
  ["友","yǒu","เพื่อน","Friend","在学校里，我愿意和大家交朋友。","Zài xuéxiào li, wǒ yuànyì hé dàjiā jiāo péngyou.","ที่โรงเรียนฉันยินดีผูกมิตรกับทุกคน","At school I like making friends.","朋友的友","友 下面有又","又 คล้ายมือยื่นไปจับมือเพื่อน","又 is at the bottom.","เป็นมิตร",["他是我的好友。","Tā shì wǒ de hǎoyǒu.","เขาเป็นเพื่อนสนิทของฉัน","He is my good friend."]],
  ["礼","lǐ","มารยาท / พิธี","Courtesy","我见到长辈时会先行礼问好。","Wǒ jiàndào zhǎngbèi shí huì xiān xínglǐ wènhǎo.","พบผู้ใหญ่ฉันคารวะทักทายก่อน","When I meet elders, I greet them respectfully.","礼貌的礼","礼 有礻","礻 ชวนให้นึกถึงการไหว้หรือทำความเคารพ","礻 relates to ritual and respect.","สุภาพ",["我送奶奶一份礼物。","Wǒ sòng nǎinai yí fèn lǐwù.","ฉันให้ของขวัญคุณย่า","I give Grandma a gift."]],
  ["谢","xiè","ขอบคุณ","Thank","别人帮助我的时候，我会说谢谢。","Biérén bāngzhù wǒ de shíhou, wǒ huì shuō xièxie.","เมื่อคนอื่นช่วยฉัน ฉันจะขอบคุณ","When others help me, I say thanks.","谢谢的谢","谢 有讠和射","讠 เหมือนคำขอบคุณที่ลอยออกจากปาก","讠 relates to speech.","รู้คุณ",["我向医生道谢。","Wǒ xiàng yīshēng dàoxiè.","ฉันกล่าวขอบคุณคุณหมอ","I thank the doctor."]],
  ["请","qǐng","เชิญ / ขอ","Please","借书时我会说请，然后耐心等待。","Jiè shū shí wǒ huì shuō qǐng, ránhòu nàixīn děngdài.","เวลายืมหนังสือฉันขออย่างสุภาพแล้วรอ","I ask politely to borrow a book and wait patiently.","请问的请","请 有讠和青","讠 เหมือนป้ายคำพูดว่า กรุณา","讠 is speech; 青 is a sound clue.","ขออนุญาต",["请给我一杯水。","Qǐng gěi wǒ yì bēi shuǐ.","ขอน้ำหนึ่งแก้วค่ะ","Please give me a glass of water."]],
  ["让","ràng","ให้ทาง / ให้","Let / yield","在走廊里，我主动让同学先走。","Zài zǒuláng li, wǒ zhǔdòng ràng tóngxué xiān zǒu.","ในทางเดินฉันให้เพื่อนเดินก่อน","In the corridor I let classmates go first.","让座的让","让 有讠和上","ขีด 上 เหมือนยกมือเชิญเพื่อนเดินก่อน","讠 is left; 上 is right.","รู้จักเสียสละ",["哥哥让我先选。","Gēge ràng wǒ xiān xuǎn.","พี่ชายให้ฉันเลือกก่อน","My brother lets me choose first."]],
  ["帮","bāng","ช่วย","Help","看见朋友有困难，我会马上帮他。","Kànjiàn péngyou yǒu kùnnan, wǒ huì mǎshàng bāng tā.","เห็นเพื่อนลำบากฉันช่วยทันที","I help friends when they have difficulties.","帮忙的帮","帮 下面有巾","巾 คล้ายผ้าเช็ดหน้าที่ยื่นให้คนที่ต้องการความช่วยเหลือ","巾 is below.","มีน้ำใจ",["我帮妈妈拿菜。","Wǒ bāng māma ná cài.","ฉันช่วยแม่ถือผัก","I help Mom carry vegetables."]],
  ["朋友","péngyou","เพื่อน","Friend","我和朋友一起玩游戏，也一起学习。","Wǒ hé péngyou yìqǐ wán yóuxì, yě yìqǐ xuéxí.","ฉันเล่นและเรียนกับเพื่อน","My friend and I play and study together.","朋友，朋是两个月，友好的友","朋 有两个相同的月形","月 สองตัวอยู่เคียงกันเหมือนเพื่อนสองคนเดินด้วยกัน","朋 has two 月-shaped components.","แบ่งปัน",["朋友送我一张卡片。","Péngyou sòng wǒ yì zhāng kǎpiàn.","เพื่อนให้การ์ดฉันหนึ่งใบ","A friend gives me a card."]],
  ["礼貌","lǐmào","มารยาท","Politeness","有礼貌的孩子会认真听别人说话。","Yǒu lǐmào de háizi huì rènzhēn tīng biérén shuōhuà.","เด็กมีมารยาทตั้งใจฟังผู้อื่น","A polite child listens carefully to others.","礼貌，礼节的礼，相貌的貌","礼 有礻；貌 右边是皃","เด็กสองคนยืนไหว้ทักทายกัน","礼 has 礻; 貌 has 皃 on the right.","เคารพผู้อื่น",["他有礼貌地打招呼。","Tā yǒu lǐmào de dǎ zhāohu.","เขาทักทายอย่างสุภาพ","He greets people politely."]],
  ["谢谢","xièxie","ขอบคุณ","Thank you","同学借我铅笔，我微笑着说谢谢。","Tóngxué jiè wǒ qiānbǐ, wǒ wēixiàozhe shuō xièxie.","เพื่อนให้ยืมดินสอ ฉันยิ้มขอบคุณ","A classmate lends me a pencil; I smile and thank them.","谢谢，感谢的谢","谢 有讠","讠 สองตัวเหมือนคำขอบคุณซ้ำสองครั้ง","讠 relates to speech.","ขอบคุณเสมอ",["谢谢你送我花。","Xièxie nǐ sòng wǒ huā.","ขอบคุณที่ให้ดอกไม้ฉัน","Thank you for giving me flowers."]],
  ["帮忙","bāngmáng","ช่วยเหลือ","Help","妈妈在厨房做饭时，我主动帮忙。","Māma zài chúfáng zuòfàn shí, wǒ zhǔdòng bāngmáng.","แม่ทำอาหารในครัวฉันอาสาช่วย","I offer to help when Mom cooks.","帮忙，帮助的帮，忙碌的忙","忙 有忄和亡","มือยื่นช่วยอีกคนด้วยใจ 忄","忄 relates to feelings.","ช่วยงานบ้าน",["请你帮忙开门。","Qǐng nǐ bāngmáng kāi mén.","ช่วยเปิดประตูให้หน่อย","Please help open the door."]]
]);

export const p1Week4 = make(4, [
  ["孝","xiào","กตัญญู","Filial respect","我们用实际行动表达对父母的孝心。","Wǒmen yòng shíjì xíngdòng biǎodá duì fùmǔ de xiàoxīn.","เราแสดงความกตัญญูต่อพ่อแม่ด้วยการกระทำ","We show care for parents through actions.","孝顺的孝","孝 有耂和子","เด็ก 子 ประคองผู้สูงอายุที่อยู่ด้านบน 耂","耂 and 子 help recall generations.","กตัญญูอย่างเหมาะสม",["她很孝敬奶奶。","Tā hěn xiàojìng nǎinai.","เธอกตัญญูต่อคุณย่า","She treats Grandma with care and respect."]],
  ["父","fù","พ่อ","Father","我常常和父亲一起整理家里的书。","Wǒ chángcháng hé fùqīn yìqǐ zhěnglǐ jiālǐ de shū.","ฉันมักช่วยพ่อจัดหนังสือที่บ้าน","I often sort books with my father.","父亲的父","父 有交叉笔画","เส้นไขว้คล้ายแขนพ่อกางออกกอดลูก","父 has crossing strokes.","ช่วยเหลือพ่อ",["父亲带我去公园。","Fùqīn dài wǒ qù gōngyuán.","พ่อพาฉันไปสวนสาธารณะ","Father takes me to the park."]],
  ["母","mǔ","แม่","Mother","母亲忙碌的时候，我会帮她拿东西。","Mǔqīn mánglù de shíhou, wǒ huì bāng tā ná dōngxi.","แม่ยุ่งฉันช่วยหยิบของ","When Mother is busy, I help her carry things.","母亲的母","母 中间有两点","สองจุดใน 母 ชวนจำภาพแม่อุ้มลูกไว้ใกล้ตัว","母 has two dots inside.","ดูแลแม่",["母亲给我讲故事。","Mǔqīn gěi wǒ jiǎng gùshi.","แม่เล่านิทานให้ฉันฟัง","Mother tells me a story."]],
  ["兄","xiōng","พี่ชาย","Older brother","兄长耐心地教我怎样整理书包。","Xiōngzhǎng nàixīn de jiāo wǒ zěnyàng zhěnglǐ shūbāo.","พี่ชายสอนฉันจัดกระเป๋าอย่างอดทน","My older brother patiently teaches me to pack my bag.","兄弟的兄","兄 上面是口，下面是儿","口 อยู่เหนือ 儿 เหมือนพี่ชายยืนพูดกับน้อง","口 is above 儿.","รักพี่น้อง",["我的兄长爱画画。","Wǒ de xiōngzhǎng ài huàhuà.","พี่ชายของฉันชอบวาดรูป","My elder brother likes drawing."]],
  ["弟","dì","น้องชาย","Younger brother","弟弟摔倒的时候，我轻轻扶他起来。","Dìdi shuāidǎo de shíhou, wǒ qīngqīng fú tā qǐlái.","น้องล้มฉันพยุงเขาเบา ๆ","When my brother falls, I gently help him up.","弟弟的弟","弟 中间有弓形","ส่วนโค้งคล้ายคันธนูที่น้องชายกำลังถือเล่น","The middle resembles 弓.","ช่วยน้อง",["弟弟在吃香蕉。","Dìdi zài chī xiāngjiāo.","น้องชายกำลังกินกล้วย","My brother is eating a banana."]],
  ["爱","ài","รัก","Love","我爱我的家人，也尊重他们的想法。","Wǒ ài wǒ de jiārén, yě zūnzhòng tāmen de xiǎngfǎ.","ฉันรักครอบครัวและเคารพความคิดของเขา","I love my family and respect their ideas.","爱心的爱","爱 上爫下友","爫 ด้านบนกับ 友 ด้านล่างคล้ายมือที่ยื่นไปหาเพื่อนด้วยรัก","爱 has 爫 above and 友 below.","รักและเคารพ",["我爱我的小猫。","Wǒ ài wǒ de xiǎomāo.","ฉันรักแมวน้อยของฉัน","I love my kitten."]],
  ["家庭","jiātíng","ครอบครัว","Family","我们家庭的每个人都会互相帮助。","Wǒmen jiātíng de měi ge rén dōu huì hùxiāng bāngzhù.","ทุกคนในครอบครัวช่วยกัน","Everyone in our family helps each other.","家庭，家人的家，庭院的庭","家 有宀；庭 有广","หลังคา 宀 และ 广 เหมือนบ้านที่ครอบครัวอยู่พร้อมหน้า","宀 and 广 suggest buildings.","ร่วมมือกัน",["我们有一个温暖的家庭。","Wǒmen yǒu yí ge wēnnuǎn de jiātíng.","เรามีครอบครัวที่อบอุ่น","We have a loving family."]],
  ["孝顺","xiàoshùn","กตัญญูและเอาใจใส่","Care for parents","孝顺不是盲从，而是关心和尊重父母。","Xiàoshùn bú shì mángcóng, ér shì guānxīn hé zūnzhòng fùmǔ.","กตัญญูไม่ใช่เชื่อฟังโดยไม่คิด แต่ดูแลและเคารพพ่อแม่","Filial care means concern and respect, not blind obedience.","孝顺，孝心的孝，顺利的顺","孝 有子；顺 有页","เด็ก 子 ยื่นมือประคองปู่ย่าเดินช้า ๆ","孝 has 子; 顺 has 页.","รักพร้อมรู้ขอบเขต",["姐姐很孝顺，常陪爷爷散步。","Jiějie hěn xiàoshùn, cháng péi yéye sànbù.","พี่สาวกตัญญู มักเดินเล่นเป็นเพื่อนปู่","My sister is caring and often walks with Grandpa."]],
  ["长辈","zhǎngbèi","ผู้ใหญ่ในครอบครัว","Elder","见到长辈时，我们微笑着主动问好。","Jiàndào zhǎngbèi shí, wǒmen wēixiàozhe zhǔdòng wènhǎo.","พบผู้ใหญ่เรายิ้มทักทายก่อน","We greet our elders with a smile.","长辈，长大的长，辈分的辈","辈 上非下车","รถ 车 ใต้ 辈 ชวนจำผู้ใหญ่รุ่นก่อนที่เดินทางมาก่อนเรา","辈 has 非 above 车.","สุภาพกับผู้ใหญ่",["我给长辈倒茶。","Wǒ gěi zhǎngbèi dào chá.","ฉันรินชาให้ผู้ใหญ่","I pour tea for elders."]],
  ["关心","guānxīn","ใส่ใจ","Care about","我会关心家人，也会照顾自己。","Wǒ huì guānxīn jiārén, yě huì zhàogù zìjǐ.","ฉันใส่ใจครอบครัวและดูแลตนเอง","I care for my family and myself.","关心，关门的关，心脏的心","心 像心跳的点画","心 คล้ายหัวใจที่เปิดรับความรู้สึกคนอื่น","心 has dots and curved strokes.","เอาใจใส่",["老师关心每个孩子。","Lǎoshī guānxīn měi ge háizi.","ครูใส่ใจเด็กทุกคน","The teacher cares about every child."]]
]);

export const p1Week5 = make(5, [
  ["手","shǒu","มือ","Hand","我每天用双手帮助家人做些事情。","Wǒ měitiān yòng shuāngshǒu bāngzhù jiārén zuò xiē shìqing.","ฉันใช้มือช่วยงานครอบครัวทุกวัน","I use my hands to help my family daily.","双手的手","手 有弯钩","เส้นขีดของ 手 เหมือนนิ้วมือที่กำลังหยิบดินสอ","手 has a curved hook.","ช่วยเหลือ",["我用手捏面团。","Wǒ yòng shǒu niē miàntuán.","ฉันใช้มือนวดแป้ง","I knead dough with my hands."]],
  ["足","zú","เท้า","Foot","我用双足一步一步地走向教室。","Wǒ yòng shuāngzú yí bù yí bù de zǒuxiàng jiàoshì.","ฉันใช้เท้าสองข้างเดินไปห้องเรียน","I walk step by step to class.","足球的足","足 上面有口形","ด้านล่างคล้ายขาที่เหยียดก้าวเท้าไปข้างหน้า","足 has a 口-shaped top.","เดินระวัง",["小猫用四足走路。","Xiǎomāo yòng sì zú zǒulù.","แมวเดินด้วยเท้าทั้งสี่","The cat walks on four feet."]],
  ["口","kǒu","ปาก","Mouth","我们用自己的口说出温暖的话。","Wǒmen yòng zìjǐ de kǒu shuōchū wēnnuǎn de huà.","เราใช้ปากพูดคำอบอุ่น","We use our mouths to say kind words.","口中的口","口 是方框形","กรอบ 口 เหมือนปากอ้าเป็นช่อง","口 looks like a square opening.","พูดดี",["我喝了一口水。","Wǒ hē le yì kǒu shuǐ.","ฉันดื่มน้ำหนึ่งอึก","I took a sip of water."]],
  ["目","mù","ตา","Eye","我用目光认真观察窗外的小鸟。","Wǒ yòng mùguāng rènzhēn guānchá chuāngwài de xiǎoniǎo.","ฉันใช้สายตาสังเกตนกนอกหน้าต่าง","I observe the birds outside with my eyes.","耳目的目","目 像竖着的眼睛","กรอบ 目 และขีดกลางเหมือนตาที่มีเปลือกตา","目 resembles a vertical eye.","สังเกต",["我的目光跟着蝴蝶。","Wǒ de mùguāng gēnzhe húdié.","สายตาของฉันมองตามผีเสื้อ","My eyes follow the butterfly."]],
  ["耳","ěr","หู","Ear","我用耳朵仔细听清老师的指示。","Wǒ yòng ěrduo zǐxì tīngqīng lǎoshī de zhǐshì.","ฉันใช้หูฟังคำแนะนำครูอย่างตั้งใจ","I listen carefully to the teacher's instructions.","耳朵的耳","耳 有多条横画","ขีดนอนใน 耳 เหมือนรอยพับในใบหู","耳 has several horizontal strokes.","ฟังอย่างตั้งใจ",["兔子的耳朵很长。","Tùzi de ěrduo hěn cháng.","หูกระต่ายยาวมาก","The rabbit has long ears."]],
  ["牙","yá","ฟัน","Tooth","每天早晚，我都会认真刷干净牙齿。","Měitiān zǎowǎn, wǒ dōu huì rènzhēn shuā gānjìng yáchǐ.","ทุกเช้าเย็นฉันแปรงฟันให้สะอาด","I brush my teeth carefully morning and night.","牙齿的牙","牙 有弯钩和撇","ขีดงอเหมือนฟันที่ยื่นจากเหงือก","牙 has a hook and diagonal stroke.","รักษาสุขอนามัย",["小狗长出新牙。","Xiǎogǒu zhǎngchū xīn yá.","ลูกสุนัขมีฟันใหม่งอก","The puppy grows new teeth."]],
  ["洗手","xǐshǒu","ล้างมือ","Wash hands","吃饭以前，我们都要认真洗手。","Chīfàn yǐqián, wǒmen dōu yào rènzhēn xǐshǒu.","ก่อนกินข้าวเราต้องล้างมือให้ดี","Before eating, we should wash our hands carefully.","洗手，洗澡的洗，双手的手","洗 有氵和先","หยดน้ำ 氵 ไหลผ่านมือ 手","氵 suggests water.","ล้างมือ",["玩泥巴后要洗手。","Wán níba hòu yào xǐshǒu.","หลังเล่นโคลนต้องล้างมือ","Wash your hands after playing in mud."]],
  ["刷牙","shuāyá","แปรงฟัน","Brush teeth","睡觉以前，我会自己认真刷牙。","Shuìjiào yǐqián, wǒ huì zìjǐ rènzhēn shuāyá.","ก่อนนอนฉันแปรงฟันด้วยตนเอง","Before bed I brush my teeth myself.","刷牙，刷子的刷，牙齿的牙","刷 右边有刂","เห็น 刂 ข้าง 刷 ให้นึกถึงแนวแปรงที่ปัดผ่านฟัน","刂 is on the right.","ดูแลฟัน",["我早上刷牙。","Wǒ zǎoshang shuāyá.","ฉันแปรงฟันตอนเช้า","I brush my teeth in the morning."]],
  ["干净","gānjìng","สะอาด","Clean","我们把桌子擦得非常干净整齐。","Wǒmen bǎ zhuōzi cā de fēicháng gānjìng zhěngqí.","เราเช็ดโต๊ะให้สะอาดเรียบร้อย","We wipe the table clean and tidy.","干净，干燥的干，洁净的净","净 有冫和争","冫 ใน 净 ชวนจำความเย็นใสของผ้าที่ซักสะอาด","净 contains 冫 and 争.","รักษาความสะอาด",["这件衣服很干净。","Zhè jiàn yīfu hěn gānjìng.","เสื้อผ้าตัวนี้สะอาดมาก","This piece of clothing is clean."]],
  ["健康","jiànkāng","สุขภาพดี","Healthy","每天运动和休息能帮助我们保持健康。","Měitiān yùndòng hé xiūxi néng bāngzhù wǒmen bǎochí jiànkāng.","ออกกำลังและพักผ่อนช่วยให้สุขภาพดี","Exercise and rest help us stay healthy.","健康，健身的健，健康的康","健 有亻","亻 เหมือนคนยืนแข็งแรงหลังออกกำลัง","亻 relates to people.","ดูแลตนเอง",["吃水果有益健康。","Chī shuǐguǒ yǒuyì jiànkāng.","กินผลไม้ดีต่อสุขภาพ","Eating fruit is good for health."]]
]);

export const p1Week6 = make(6, [
  ["水","shuǐ","น้ำ","Water","我们每天都喝足量的干净清水。","Wǒmen měitiān dōu hē zúliàng de gānjìng qīngshuǐ.","เราดื่มน้ำสะอาดเพียงพอทุกวัน","We drink enough clean water every day.","喝水的水","水 像水流的分支","เส้นกลาง 水 เหมือนสายน้ำหลักแตกเป็นลำธารเล็ก","水 resembles branching water.","ประหยัดน้ำ",["杯子里有水。","Bēizi lǐ yǒu shuǐ.","ในแก้วมีน้ำ","There is water in the cup."]],
  ["火","huǒ","ไฟ","Fire","看见火时，我们应该立刻告诉大人。","Kànjiàn huǒ shí, wǒmen yīnggāi lìkè gàosu dàrén.","เมื่อเห็นไฟเราควรบอกผู้ใหญ่ทันที","When we see fire, we tell an adult immediately.","火苗的火","火 像跳动的火焰","สองขีดข้าง 火 เหมือนเปลวไฟกระจายขึ้น","火 resembles flames.","ไม่เล่นไฟ",["蜡烛上有小火苗。","Làzhú shang yǒu xiǎo huǒmiáo.","บนเทียนมีเปลวไฟเล็ก ๆ","There is a little flame on the candle."]],
  ["日","rì","ดวงอาทิตย์ / วัน","Sun / day","日出的时候，整个校园慢慢亮起来。","Rìchū de shíhou, zhěnggè xiàoyuán mànmàn liàng qǐlái.","เมื่อพระอาทิตย์ขึ้นโรงเรียนค่อย ๆ สว่าง","At sunrise the school gradually brightens.","日月的日","日 有方框和一横","กรอบ 日 เหมือนดวงอาทิตย์กลางท้องฟ้า","日 has a box and inner stroke.","ชื่นชมธรรมชาติ",["星期日我们去野餐。","Xīngqīrì wǒmen qù yěcān.","วันอาทิตย์เราไปปิกนิก","We go on a picnic on Sunday."]],
  ["月","yuè","ดวงจันทร์ / เดือน","Moon / month","晚上我们一起看天上的月亮和星星。","Wǎnshang wǒmen yìqǐ kàn tiānshàng de yuèliang hé xīngxing.","ตอนค่ำเราดูดวงจันทร์และดาวด้วยกัน","At night we look at the moon and stars together.","月亮的月","月 有两个内横","กรอบ 月 โค้งคล้ายจันทร์เสี้ยวที่มีขีดแสงด้านใน","月 has two inner horizontal strokes.","สนใจท้องฟ้า",["今天是五月一日。","Jīntiān shì wǔ yuè yī rì.","วันนี้คือวันที่หนึ่งพฤษภาคม","Today is May first."]],
  ["山","shān","ภูเขา","Mountain","假日里，我们和家人一起去看山。","Jiàrì li, wǒmen hé jiārén yìqǐ qù kàn shān.","วันหยุดเราไปชมภูเขากับครอบครัว","On holidays we visit the mountains together.","高山的山","山 像三个山峰","ยอดตั้งสามยอดคือภูเขาที่สูงต่ำไม่เท่ากัน","山 resembles three peaks.","รักษาธรรมชาติ",["山上有很多树。","Shān shang yǒu hěn duō shù.","บนภูเขามีต้นไม้หลายต้น","There are many trees on the mountain."]],
  ["木","mù","ไม้","Wood / tree","我们坐着木头做的小椅子一起聊天。","Wǒmen zuòzhe mùtou zuò de xiǎo yǐzi yìqǐ liáotiān.","เรานั่งเก้าอี้ไม้เล็ก ๆ คุยกัน","We sit together on little wooden chairs and chat.","木头的木","木 像树干和枝条","ขีดตั้งคือกิ่งลำต้น ขีดเฉียงคือกิ่งไม้","木 resembles a trunk and branches.","ไม่ทำลายต้นไม้",["桌子是木头做的。","Zhuōzi shì mùtou zuò de.","โต๊ะทำจากไม้","The table is made of wood."]],
  ["花","huā","ดอกไม้","Flower","我每天给窗边的小花浇一点水。","Wǒ měitiān gěi chuāngbiān de xiǎohuā jiāo yìdiǎn shuǐ.","ฉันรดน้ำดอกไม้ริมหน้าต่างทุกวัน","I water the little flower by the window daily.","花朵的花","花 有艹和化","艹 เหมือนยอดใบไม้เหนือดอกที่กำลังบาน","艹 relates to plants.","ดูแลพืช",["春天开了很多花。","Chūntiān kāi le hěn duō huā.","ฤดูใบไม้ผลิดอกไม้บานมากมาย","Many flowers bloom in spring."]],
  ["草","cǎo","หญ้า","Grass","我们走在小路上，不踩旁边的草。","Wǒmen zǒu zài xiǎolù shàng, bù cǎi pángbiān de cǎo.","เราเดินบนทาง ไม่เหยียบหญ้าข้างทาง","We stay on the path and avoid the grass.","青草的草","草 上面是艹","艹 เหมือนหญ้าสองกอที่งอกเหนือดิน","艹 is above.","รักพื้นที่สีเขียว",["小羊喜欢吃草。","Xiǎoyáng xǐhuan chī cǎo.","ลูกแกะชอบกินหญ้า","The lamb likes eating grass."]],
  ["树木","shùmù","ต้นไม้","Trees","校园里的树木给我们带来阴凉。","Xiàoyuán li de shùmù gěi wǒmen dàilái yīnliáng.","ต้นไม้ในโรงเรียนให้ร่มเงา","The school trees provide shade for us.","树木，大树的树，木头的木","树 有木旁","木 ที่ซ้ำกันคือแถวต้นไม้ให้ร่มเงา","木 relates to trees.","ปกป้องต้นไม้",["雨后树木更绿了。","Yǔ hòu shùmù gèng lǜ le.","หลังฝนตกต้นไม้เขียวขึ้น","The trees are greener after rain."]],
  ["自然","zìrán","ธรรมชาติ","Nature","我们应该爱护自然，保持环境清洁。","Wǒmen yīnggāi àihù zìrán, bǎochí huánjìng qīngjié.","เราควรรักธรรมชาติและรักษาความสะอาด","We should care for nature and keep it clean.","自然，自己的自，自然的然","然 下面有灬","ลองนึกภาพภูเขา ต้นไม้ และสัตว์ที่อยู่ตามธรรมชาติ","灬 is at the bottom.","ดูแลโลก",["我们在自然中散步。","Wǒmen zài zìrán zhōng sànbù.","เราเดินเล่นท่ามกลางธรรมชาติ","We walk in nature."]]
]);

export const p1Week7 = make(7, [
  ["早","zǎo","เช้า","Early","我每天早早起床，自己整理书包。","Wǒ měitiān zǎozǎo qǐchuáng, zìjǐ zhěnglǐ shūbāo.","ทุกวันฉันตื่นเช้าและจัดกระเป๋าเอง","I get up early and pack my bag daily.","早上的早","早 上日下十","日 ดวงอาทิตย์โผล่เหนือ 十 เหมือนแสงอรุณ","早 has 日 above 十.","ตรงต่อเวลา",["妈妈很早就起床了。","Māma hěn zǎo jiù qǐchuáng le.","แม่ตื่นนอนแต่เช้า","Mom got up very early."]],
  ["晚","wǎn","เย็น / ค่ำ","Evening","每天晚上，我们一家人一起吃饭。","Měitiān wǎnshang, wǒmen yì jiā rén yìqǐ chīfàn.","ทุกค่ำครอบครัวกินข้าวด้วยกัน","We eat dinner together every evening.","晚上的晚","晚 有日和免","日 อยู่ซ้ายของ 晚 เหมือนดวงอาทิตย์กำลังลับขอบฟ้า","日 relates to time.","ใช้เวลากับครอบครัว",["今晚我们吃面条。","Jīnwǎn wǒmen chī miàntiáo.","คืนนี้เรากินก๋วยเตี๋ยว","We eat noodles tonight."]],
  ["今","jīn","วันนี้ / ปัจจุบัน","Now / today","今天我想帮老师整理教室里的书。","Jīntiān wǒ xiǎng bāng lǎoshī zhěnglǐ jiàoshì li de shū.","วันนี้ฉันอยากช่วยครูจัดหนังสือ","Today I want to help arrange classroom books.","今天的今","今 上面有人形","รูปคน 人 ด้านบนคล้ายคนมองปฏิทินของวันนี้","今 has a 人-shaped top.","ทำวันนี้ให้ดี",["今天是我的生日。","Jīntiān shì wǒ de shēngrì.","วันนี้เป็นวันเกิดของฉัน","Today is my birthday."]],
  ["明","míng","สว่าง / พรุ่งนี้","Bright / tomorrow","明天我会带着准备好的书包上学。","Míngtiān wǒ huì dàizhe zhǔnbèi hǎo de shūbāo shàngxué.","พรุ่งนี้ฉันจะนำกระเป๋าที่เตรียมไปโรงเรียน","Tomorrow I will bring my prepared bag to school.","明天的明","明 有日和月","日 และ 月 อยู่คู่กัน นึกถึงแสงและวันพรุ่งนี้","日 is sun and 月 is moon.","เตรียมพร้อม",["明天我们去动物园。","Míngtiān wǒmen qù dòngwùyuán.","พรุ่งนี้เราไปสวนสัตว์","Tomorrow we go to the zoo."]],
  ["做","zuò","ทำ","Do","我每天都自己做力所能及的事情。","Wǒ měitiān dōu zìjǐ zuò lìsuǒnéngjí de shìqing.","ฉันทำสิ่งที่ทำได้ด้วยตนเองทุกวัน","I do things I can manage by myself daily.","做事的做","做 有亻和故","亻 คือคนที่ใช้มือทำเค้กหรือทำงาน","亻 relates to people.","รับผิดชอบ",["爸爸在做蛋糕。","Bàba zài zuò dàngāo.","พ่อกำลังทำเค้ก","Dad is making a cake."]],
  ["玩","wán","เล่น","Play","下课后，我们在安全的地方一起玩。","Xiàkè hòu, wǒmen zài ānquán de dìfang yìqǐ wán.","หลังเรียนเราเล่นในที่ปลอดภัยด้วยกัน","After class we play together somewhere safe.","玩具的玩","玩 有王形旁和元","นึกภาพเด็กเล่นลูกแก้วที่คล้ายหยก 王","The jade-shaped 王 component is left of 元.","เล่นปลอดภัย",["我和妹妹玩积木。","Wǒ hé mèimei wán jīmù.","ฉันเล่นตัวต่อกับน้องสาว","My sister and I play with blocks."]],
  ["起床","qǐchuáng","ตื่นนอน","Get up","每天听到闹钟，我就马上起床。","Měitiān tīngdào nàozhōng, wǒ jiù mǎshàng qǐchuáng.","ทุกวันพอได้ยินนาฬิกาฉันลุกทันที","Every day I get up when the alarm rings.","起床，起来的起，床铺的床","起 有走；床 有广","走 เหมือนลุกจากเตียง 床 แล้วก้าวเดิน","走 suggests movement; 床 contains 广.","ฝึกวินัย",["弟弟七点起床。","Dìdi qī diǎn qǐchuáng.","น้องชายตื่นนอนเจ็ดโมง","My brother gets up at seven."]],
  ["吃饭","chīfàn","กินข้าว","Eat a meal","吃饭的时候，我们不浪费盘里的食物。","Chīfàn de shíhou, wǒmen bù làngfèi pán li de shíwù.","เวลากินข้าวเราไม่ทิ้งอาหาร","At meals we do not waste food.","吃饭，吃东西的吃，米饭的饭","吃 有口；饭 有饣","口 อ้ารับอาหาร ส่วน 饣 ชวนจำจานข้าว","口 is mouth; 饣 relates to food.","ไม่ทิ้งอาหาร",["我们一起吃饭吧。","Wǒmen yìqǐ chīfàn ba.","มากินข้าวด้วยกันเถอะ","Let's eat together."]],
  ["睡觉","shuìjiào","นอนหลับ","Sleep","每天按时睡觉，第二天才有精神。","Měitiān ànshí shuìjiào, dì’èr tiān cái yǒu jīngshen.","นอนตรงเวลาทุกวันเพื่อให้สดชื่นวันถัดไป","Sleeping on time helps us feel fresh next day.","睡觉，睡眠的睡，睡觉的觉","睡 有目","目 คือดวงตาที่ค่อย ๆ ปิดเมื่อเข้านอน","目 relates to eyes.","พักผ่อน",["小猫在沙发上睡觉。","Xiǎomāo zài shāfā shang shuìjiào.","แมวน้อยนอนบนโซฟา","The kitten sleeps on the sofa."]],
  ["整理","zhěnglǐ","จัดระเบียบ","Organize","放学回家以后，我先整理自己的书桌。","Fàngxué huí jiā yǐhòu, wǒ xiān zhěnglǐ zìjǐ de shūzhuō.","กลับบ้านหลังเรียนฉันจัดโต๊ะก่อน","After school I first tidy my desk.","整理，整齐的整，道理的理","整 有正；理 有王形旁","正 ชวนจำอุปกรณ์วางตรงเป็นระเบียบ","正 helps recall order.","จัดของตนเอง",["我整理自己的玩具。","Wǒ zhěnglǐ zìjǐ de wánjù.","ฉันจัดของเล่นของตัวเอง","I tidy my own toys."]]
]);

export const p1Week8 = make(8, [
  ["诚","chéng","จริงใจ","Sincerity","我们应该用真诚的态度对待每个人。","Wǒmen yīnggāi yòng zhēnchéng de tàidu duìdài měi ge rén.","เราควรจริงใจกับทุกคน","We should treat everyone sincerely.","诚实的诚","诚 有讠和成","讠 สื่อถึงคำพูดที่ตรงกับสิ่งที่คิดจริง","讠 relates to speech; 成 is a sound clue.","จริงใจ",["他诚心向我道歉。","Tā chéngxīn xiàng wǒ dàoqiàn.","เขาขอโทษฉันอย่างจริงใจ","He sincerely apologizes to me."]],
  ["信","xìn","เชื่อ / ความน่าเชื่อถือ","Trust","我们要讲信用，答应的事努力做到。","Wǒmen yào jiǎng xìnyòng, dāying de shì nǔlì zuòdào.","เรารักษาคำพูดและพยายามทำสิ่งที่รับปาก","We keep our word and try to fulfil promises.","信用的信","信 有亻和言","亻 ยืนพูด 言 อย่างไว้ใจได้","亻 is person; 言 is words.","รักษาคำมั่น",["我相信你能做到。","Wǒ xiāngxìn nǐ néng zuòdào.","ฉันเชื่อว่าเธอทำได้","I believe you can do it."]],
  ["勇","yǒng","กล้า","Courage","遇到困难时，我会勇敢地寻求帮助。","Yùdào kùnnan shí, wǒ huì yǒnggǎn de xúnqiú bāngzhù.","เจอปัญหาฉันจะกล้าขอความช่วยเหลือ","When facing difficulty I bravely ask for help.","勇敢的勇","勇 下面有力","力 เหมือนแขนที่มีแรงใจจะทำสิ่งยาก","力 means strength.","กล้าขอความช่วยเหลือ",["小女孩很有勇气。","Xiǎo nǚhái hěn yǒu yǒngqì.","เด็กหญิงมีความกล้ามาก","The little girl has courage."]],
  ["忍","rěn","อดทน","Endure","排队的时候，我耐心忍住着急的心情。","Páiduì de shíhou, wǒ nàixīn rěnzhù zháojí de xīnqíng.","เวลาเข้าแถวฉันอดทนไม่ใจร้อน","While queueing I patiently manage my impatience.","忍耐的忍","忍 上刃下心","心 อยู่ล่าง 刃 เหมือนใจที่คุมความรู้สึกเมื่อเจอเรื่องยาก","心 relates to feelings.","อดทน",["我忍住了眼泪。","Wǒ rěnzhù le yǎnlèi.","ฉันกลั้นน้ำตาไว้","I held back my tears."]],
  ["善","shàn","ดี / เมตตา","Kindness","我们用善意的语言鼓励身边的朋友。","Wǒmen yòng shànyì de yǔyán gǔlì shēnbiān de péngyou.","เราใช้คำพูดเมตตาให้กำลังใจเพื่อน","We encourage friends with kind words.","善良的善","善 下面有口","口 ด้านล่างชวนจำปากที่พูดคำเมตตา","口 reminds us of kind words.","มีเมตตา",["奶奶很善良。","Nǎinai hěn shànliáng.","คุณย่าใจดีมาก","Grandma is very kind."]],
  ["行","xíng","เดิน / กระทำ","Walk / act","我们沿着人行道走，不在马路上奔跑。","Wǒmen yánzhe rénxíngdào zǒu, bú zài mǎlù shàng bēnpǎo.","เราเดินบนทางเท้า ไม่วิ่งบนถนน","We walk on the sidewalk and do not run in the road.","行走的行","行 左边有彳形","彳 คล้ายก้าวเท้าเล็ก ๆ ไปตามทางเดิน","彳 relates to walking.","ระวังถนน",["绿灯亮了，行人过马路。","Lǜdēng liàng le, xíngrén guò mǎlù.","ไฟเขียวแล้ว คนเดินเท้าข้ามถนน","The light turns green and pedestrians cross."]],
  ["诚实","chéngshí","ซื่อสัตย์","Honest","做错事情以后，我们应该诚实地承认。","Zuòcuò shìqing yǐhòu, wǒmen yīnggāi chéngshí de chéngrèn.","เมื่อทำผิดเราควรยอมรับอย่างซื่อสัตย์","When we make mistakes we should admit them honestly.","诚实，真诚的诚，实在的实","诚 有讠；实 有宀","讠 ชวนจำคำพูดตรงจริงเหมือนภาพบนกระจก","诚 has 讠; 实 has 宀.","ยอมรับความผิด",["诚实的孩子会说实话。","Chéngshí de háizi huì shuō shíhuà.","เด็กที่ซื่อสัตย์พูดความจริง","Honest children tell the truth."]],
  ["勇敢","yǒnggǎn","กล้าหาญ","Brave","我勇敢地说出自己的意见和感受。","Wǒ yǒnggǎn de shuōchū zìjǐ de yìjiàn hé gǎnshòu.","ฉันกล้าบอกความคิดเห็นและความรู้สึก","I bravely express my ideas and feelings.","勇敢，勇气的勇，敢于的敢","勇 有力；敢 有攵","力 ใน 勇 เหมือนเด็กใจแข็งแรงยกมือแม้จะตื่นเต้น","力 reminds us of strength.","กล้าแสดงออก",["他勇敢地举手发言。","Tā yǒnggǎn de jǔshǒu fāyán.","เขากล้ายกมือแสดงความคิดเห็น","He bravely raises his hand to speak."]],
  ["守信","shǒuxìn","รักษาคำพูด","Keep promises","守信的人会认真履行自己的承诺。","Shǒuxìn de rén huì rènzhēn lǚxíng zìjǐ de chéngnuò.","คนรักษาคำพูดทำตามคำมั่นอย่างตั้งใจ","A trustworthy person keeps their promises.","守信，遵守的守，信用的信","守 有宀和寸","宀 คล้ายหลังคาที่รักษาคำสัญญาไว้ไม่ให้หาย","守 contains 宀 and 寸.","รักษาสัญญา",["她守信，准时来见我。","Tā shǒuxìn, zhǔnshí lái jiàn wǒ.","เธอรักษาคำพูด มาพบฉันตรงเวลา","She keeps her word and meets me on time."]],
  ["友爱","yǒu’ài","รักและเป็นมิตร","Friendship and care","我们在班上互相友爱，一起快乐学习。","Wǒmen zài bān shàng hùxiāng yǒu’ài, yìqǐ kuàilè xuéxí.","ในห้องเรียนเราเป็นมิตรและเรียนอย่างมีความสุข","In class we care for each other and learn happily.","友爱，朋友的友，爱心的爱","友 和 爱 都有又形笔画","友 อยู่กับ 爱 เหมือนเพื่อนยื่นมือช่วยกัน","Notice 又 in 友 and 友 in 爱.","รักเพื่อน",["同学们友爱互助。","Tóngxuémen yǒu'ài hùzhù.","เพื่อนในชั้นรักและช่วยเหลือกัน","Classmates are friendly and help one another."]]
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
