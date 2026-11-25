/** Original starter content, not a claim of official grade-level alignment. */
export type Grade = 1 | 2 | 3 | 4 | 5 | 6;
export type LearningGrade = 0 | Grade;
export const grades = [1, 2, 3, 4, 5, 6] as const;
export const learningGrades = [0, 1, 2, 3, 4, 5, 6] as const;

export interface VocabWord {
  id: string;
  grade: LearningGrade;
  hanzi: string;
  pinyin: string;
  meaningTh: string;
  meaningEn: string;
  example: { hanzi: string; pinyin: string; th: string; en: string };
  is_mandatory_write: boolean;
  sentences: readonly [StudySentence, StudySentence];
  memory_tip_th: string;
  memory_tip_en: string;
}

export type StudySentence = { hanzi:string; pinyin:string; meaning_th:string; meaning_en:string };
type Enrichment = readonly [mandatory:boolean, hanzi:string, pinyin:string, th:string, en:string, tipTh:string, tipEn:string];
// Original practice prioritization, not an official Ministry mandatory-writing list.
const enrichment:Record<string,Enrichment> = {
  '你好':[true,'你好，小明！','Nǐ hǎo, Xiǎomíng!','สวัสดี เสี่ยวหมิง!','Hello, Xiaoming!','你 = คุณ, 好 = ดี รวมกันเป็นคำทักทาย','你 means you; 好 means good. Together they greet someone.'],
  '谢谢':[true,'谢谢你的帮助。','Xièxie nǐ de bāngzhù.','ขอบคุณที่ช่วยฉัน','Thank you for your help.','谢 = ขอบคุณ เขียนซ้ำสองครั้งแล้วพูดขอบคุณ','谢 means thank; repeat it twice to say thank you.'],
  '再见':[true,'明天再见！','Míngtiān zàijiàn!','พบกันพรุ่งนี้!','See you tomorrow!','再 = อีกครั้ง, 见 = พบ จึงหมายถึงพบกันใหม่','再 means again; 见 means see. See you again!'],
  '我':[true,'我很开心。','Wǒ hěn kāixīn.','ฉันมีความสุขมาก','I am very happy.','我 = ฉัน ชี้ที่ตัวเองแล้วพูด wǒ','我 means I or me. Point to yourself and say wǒ.'],
  '你':[true,'你是我的朋友。','Nǐ shì wǒ de péngyou.','เธอเป็นเพื่อนของฉัน','You are my friend.','你 = เธอ มี 亻 ซึ่งชวนให้นึกถึงคนอีกคน','你 means you; 亻 can remind you of another person.'],
  '妈妈':[true,'妈妈喜欢花。','Māma xǐhuan huā.','แม่ชอบดอกไม้','Mom likes flowers.','妈 = แม่ ด้านซ้ายมี 女 (ผู้หญิง) เขียนซ้ำเป็น妈妈','妈 means mother; 女 on the left means woman. Repeat 妈.'],
  '爸爸':[true,'爸爸喝茶。','Bàba hē chá.','พ่อดื่มชา','Dad drinks tea.','爸 = พ่อ ด้านบนมี 父 ซึ่งหมายถึงพ่อ','爸 means dad; 父 at the top means father.'],
  '水':[true,'我要喝水。','Wǒ yào hē shuǐ.','ฉันอยากดื่มน้ำ','I want to drink water.','水 = น้ำ ลองนึกถึงสายน้ำไหลออกสองข้าง','水 means water; imagine water flowing out on both sides.'],
  '猫':[false,'那只猫很可爱。','Nà zhī māo hěn kě’ài.','แมวตัวนั้นน่ารักมาก','That cat is very cute.','猫 = แมว เห็น 犭 ด้านซ้ายให้นึกถึงสัตว์','猫 means cat; 犭 on the left is a useful animal clue.'],
  '狗':[false,'狗在门口。','Gǒu zài ménkǒu.','สุนัขอยู่หน้าประตู','The dog is at the doorway.','狗 = สุนัข มี 犭 เหมือน 猫 เป็นคำเกี่ยวกับสัตว์','狗 means dog; 犭 also appears in 猫, another animal word.'],
  '学校':[true,'我们的学校很大。','Wǒmen de xuéxiào hěn dà.','โรงเรียนของพวกเราใหญ่มาก','Our school is very big.','学 = เรียน, 校 = โรงเรียน รวมกันเป็นสถานที่เรียน','学 means learn; 校 relates to school.'],
  '老师':[true,'老师教我们中文。','Lǎoshī jiāo wǒmen Zhōngwén.','ครูสอนภาษาจีนให้พวกเรา','The teacher teaches us Chinese.','老 = อาวุโส, 师 = ผู้สอน รวมเป็นคุณครู','老 can mean senior; 师 means teacher or master.'],
  '学生':[true,'学生们在教室里。','Xuéshengmen zài jiàoshì lǐ.','นักเรียนอยู่ในห้องเรียน','The students are in the classroom.','学 = เรียน, 生 = คนในคำนี้ จึงเป็นผู้เรียน','学 means learn; 生 here refers to a person, a learner.'],
  '书':[true,'书在桌子上。','Shū zài zhuōzi shàng.','หนังสืออยู่บนโต๊ะ','The book is on the table.','书 = หนังสือ นึกถึงหนังสือที่ถือเวลาอ่าน','书 means book; picture the book you hold when reading.'],
  '笔':[true,'我用笔写字。','Wǒ yòng bǐ xiě zì.','ฉันใช้ปากกาเขียนตัวอักษร','I use a pen to write characters.','笔 = เครื่องเขียน ด้านบนเป็น竹 (ไม้ไผ่) ด้านล่าง毛 (ขน) ชวนให้นึกถึงพู่กัน','笔 means pen; 竹 bamboo and 毛 hair are clues to a brush.'],
  '红色':[true,'这朵花是红色的。','Zhè duǒ huā shì hóngsè de.','ดอกไม้นี้สีแดง','This flower is red.','红 = แดง, 色 = สี จึงแปลว่าสีแดง','红 means red; 色 means colour.'],
  '蓝色':[false,'我的书包是蓝色的。','Wǒ de shūbāo shì lánsè de.','กระเป๋านักเรียนของฉันสีน้ำเงิน','My schoolbag is blue.','蓝 = น้ำเงิน, 色 = สี นึกถึงท้องฟ้า','蓝 means blue; 色 means colour. Think of the sky.'],
  '苹果':[false,'桌上有两个苹果。','Zhuō shàng yǒu liǎng ge píngguǒ.','บนโต๊ะมีแอปเปิลสองลูก','There are two apples on the table.','苹 ใช้ในคำว่าแอปเปิล, 果 = ผลไม้','苹 appears in apple; 果 means fruit.'],
  '米饭':[true,'晚饭有米饭。','Wǎnfàn yǒu mǐfàn.','มื้อเย็นมีข้าวสวย','Dinner includes cooked rice.','米 = เมล็ดข้าว, 饭 = ข้าวหรือมื้ออาหาร','米 means rice grains; 饭 means cooked rice or a meal.'],
  '牛奶':[true,'早上我喝牛奶。','Zǎoshang wǒ hē niúnǎi.','ตอนเช้าฉันดื่มนมวัว','I drink milk in the morning.','牛 = วัว, 奶 = นม นมจากวัว','牛 means cow; 奶 means milk.'],
  '今天':[true,'今天我很忙。','Jīntiān wǒ hěn máng.','วันนี้ฉันยุ่งมาก','I am very busy today.','今 = ตอนนี้, 天 = วัน จึงเป็นวันนี้','今 refers to now; 天 means day.'],
  '明天':[true,'明天见。','Míngtiān jiàn.','พบกันพรุ่งนี้','See you tomorrow.','明 = สว่างหรือถัดไปในคำนี้, 天 = วัน','明 can mean bright or next here; 天 means day.'],
  '时间':[true,'我们没有时间了。','Wǒmen méiyǒu shíjiān le.','พวกเราไม่มีเวลาแล้ว','We have no time left.','时 = เวลา, 间 = ช่วงหรือระหว่าง รวมเป็นเวลา','时 means time; 间 can mean an interval.'],
  '朋友':[true,'我有很多朋友。','Wǒ yǒu hěn duō péngyou.','ฉันมีเพื่อนหลายคน','I have many friends.','朋 และ 友 ต่างเกี่ยวกับเพื่อน นึกถึงเพื่อนสองคน','朋 and 友 both relate to friends. Picture two friends.'],
  '喜欢':[true,'你喜欢什么颜色？','Nǐ xǐhuan shénme yánsè?','เธอชอบสีอะไร','What colour do you like?','喜 = ยินดี, 欢 = มีความสุข รวมเป็นชอบ','喜 and 欢 relate to joy; together they mean like.'],
  '跑步':[true,'爸爸喜欢跑步。','Bàba xǐhuan pǎobù.','พ่อชอบวิ่ง','Dad likes jogging.','跑 = วิ่ง มี足 (เท้า), 步 = ก้าวเดิน','跑 means run and contains the foot clue 足; 步 means step.'],
  '看书':[true,'我晚上看书。','Wǒ wǎnshang kàn shū.','ฉันอ่านหนังสือตอนเย็น','I read books in the evening.','看 = ดูหรืออ่าน, 书 = หนังสือ','看 means look or read; 书 means book.'],
  '商店':[false,'商店里有很多东西。','Shāngdiàn lǐ yǒu hěn duō dōngxi.','ในร้านค้ามีของมากมาย','There are many things in the shop.','商 = ค้าขาย, 店 = ร้านค้า','商 relates to commerce; 店 means shop.'],
  '多少钱':[false,'这本书多少钱？','Zhè běn shū duōshao qián?','หนังสือเล่มนี้ราคาเท่าไร','How much is this book?','多 = มาก, 少 = น้อย, 钱 = เงิน ถามว่าเงินเท่าไร','多 means many, 少 means few, 钱 means money. How much money?'],
  '生日':[true,'生日快乐！','Shēngrì kuàilè!','สุขสันต์วันเกิด!','Happy birthday!','生 = เกิด, 日 = วัน วันเกิดของเรา','生 means be born; 日 means day.'],
  '天气':[true,'明天天气怎么样？','Míngtiān tiānqì zěnmeyàng?','พรุ่งนี้อากาศเป็นอย่างไร','What will the weather be like tomorrow?','天 = ท้องฟ้า, 气 = อากาศ','天 means sky; 气 relates to air.'],
  '下雨':[true,'下雨的时候我带伞。','Xià yǔ de shíhou wǒ dài sǎn.','เวลาฝนตกฉันพกร่ม','I carry an umbrella when it rains.','下 = ลง, 雨 = ฝน ลองนึกถึงฝนตกลงมา','下 means down; 雨 means rain.'],
  '左边':[true,'我的朋友坐在左边。','Wǒ de péngyou zuò zài zuǒbian.','เพื่อนของฉันนั่งด้านซ้าย','My friend sits on the left.','左 = ซ้าย, 边 = ด้าน ชี้มือซ้ายของตัวเอง','左 means left; 边 means side. Point left.'],
  '右边':[true,'右边有一棵树。','Yòubian yǒu yì kē shù.','ด้านขวามีต้นไม้หนึ่งต้น','There is a tree on the right.','右 = ขวา, 边 = ด้าน ชี้มือขวาของตัวเอง','右 means right; 边 means side. Point right.'],
  '医院':[false,'医院在学校旁边。','Yīyuàn zài xuéxiào pángbiān.','โรงพยาบาลอยู่ข้างโรงเรียน','The hospital is beside the school.','医 = รักษา, 院 = สถานที่หรือสถาบัน','医 relates to medicine; 院 can mean an institution.'],
  '帮助':[true,'我帮助妹妹学习。','Wǒ bāngzhù mèimei xuéxí.','ฉันช่วยน้องสาวเรียน','I help my younger sister study.','帮 และ 助 ต่างหมายถึงช่วยเหลือ','帮 and 助 both relate to helping.'],
  '完成':[true,'请完成这个练习。','Qǐng wánchéng zhège liànxí.','กรุณาทำแบบฝึกหัดนี้ให้เสร็จ','Please complete this exercise.','完 = จบ, 成 = สำเร็จ','完 means finish; 成 means succeed or achieve.'],
  '作业':[true,'今天的作业很多。','Jīntiān de zuòyè hěn duō.','การบ้านวันนี้เยอะมาก','There is a lot of homework today.','作 = ทำ, 业 = งาน งานที่ต้องทำ','作 means do; 业 relates to work.'],
  '因为':[true,'因为我累了，所以想休息。','Yīnwèi wǒ lèi le, suǒyǐ xiǎng xiūxi.','เพราะฉันเหนื่อยจึงอยากพัก','Because I am tired, I want to rest.','因 = เหตุ, 为 ในคำนี้ช่วยบอกสาเหตุ','因 means cause; 为 contributes to the expression because.'],
  '运动':[false,'你喜欢什么运动？','Nǐ xǐhuan shénme yùndòng?','เธอชอบกีฬาอะไร','What sport do you like?','运 = เคลื่อน, 动 = ขยับ นึกถึงการออกกำลัง','运 and 动 relate to movement; imagine exercising.'],
  '图书馆':[false,'图书馆里很安静。','Túshūguǎn lǐ hěn ānjìng.','ในห้องสมุดเงียบมาก','It is very quiet in the library.','图 = ภาพ, 书 = หนังสือ, 馆 = สถานที่','图 means picture; 书 means book; 馆 means a public venue.'],
  '旅行':[true,'这次旅行很开心。','Zhè cì lǚxíng hěn kāixīn.','การเที่ยวครั้งนี้สนุกมาก','This trip is very enjoyable.','旅 = การเดินทาง, 行 = ไปหรือเดิน','旅 means journey; 行 means go or travel.'],
  '飞机':[true,'飞机飞得很高。','Fēijī fēi de hěn gāo.','เครื่องบินบินสูงมาก','The plane flies very high.','飞 = บิน, 机 = เครื่อง เครื่องที่บินได้','飞 means fly; 机 means machine.'],
  '准备':[true,'我准备好了。','Wǒ zhǔnbèi hǎo le.','ฉันเตรียมพร้อมแล้ว','I am ready.','准 = พร้อมในคำนี้, 备 = เตรียมไว้','准 here helps express readiness; 备 means prepare.'],
  '问题':[true,'这个问题很有趣。','Zhège wèntí hěn yǒuqù.','คำถามนี้น่าสนใจมาก','This question is very interesting.','问 = ถาม, 题 = หัวข้อหรือโจทย์','问 means ask; 题 means topic or question.'],
  '回答':[true,'他回答得很好。','Tā huídá de hěn hǎo.','เขาตอบได้ดีมาก','He answers very well.','回 = กลับ, 答 = ตอบ คือส่งคำตอบกลับ','回 means return; 答 means answer.'],
  '健康':[true,'祝你身体健康。','Zhù nǐ shēntǐ jiànkāng.','ขอให้เธอสุขภาพแข็งแรง','I wish you good health.','健 = แข็งแรง, 康 = สุขภาพดี','健 means strong; 康 relates to well-being.'],
  '重要':[true,'家人对我很重要。','Jiārén duì wǒ hěn zhòngyào.','ครอบครัวสำคัญกับฉันมาก','Family is very important to me.','重 = หนักหรือสำคัญ, 要 = จำเป็น','重 can mean weighty; 要 means necessary.'],
  '容易':[false,'这个字很容易写。','Zhège zì hěn róngyì xiě.','ตัวอักษรนี้เขียนง่ายมาก','This character is easy to write.','容 ในคำนี้ประกอบกับ 易 = ง่าย รวมเป็นทำได้ง่าย','容 combines with 易, easy, to mean not difficult.'],
  '困难':[true,'我们一起解决困难。','Wǒmen yìqǐ jiějué kùnnan.','พวกเราแก้ปัญหาร่วมกัน','We overcome difficulties together.','困 = ติดขัด, 难 = ยาก','困 means stuck or troubled; 难 means difficult.'],
  '计划':[true,'我的计划是每天学习。','Wǒ de jìhuà shì měitiān xuéxí.','แผนของฉันคือเรียนทุกวัน','My plan is to study every day.','计 = คิดคำนวณ, 划 = วางแนวทาง','计 relates to calculating or planning; 划 relates to planning.'],
  '未来':[true,'未来我想当老师。','Wèilái wǒ xiǎng dāng lǎoshī.','ในอนาคตฉันอยากเป็นครู','In the future, I want to be a teacher.','未 = ยังไม่, 来 = มา เวลาที่ยังมาไม่ถึง','未 means not yet; 来 means come. Time that has not arrived.'],
  '环境':[true,'校园环境很干净。','Xiàoyuán huánjìng hěn gānjìng.','สภาพแวดล้อมโรงเรียนสะอาดมาก','The school environment is very clean.','环 = ล้อมรอบ, 境 = บริเวณ สิ่งรอบตัวเรา','环 relates to surrounding; 境 means surroundings or territory.'],
  '习惯':[true,'早睡是个好习惯。','Zǎo shuì shì ge hǎo xíguàn.','นอนเร็วเป็นนิสัยที่ดี','Going to bed early is a good habit.','习 = ฝึกซ้ำ, 惯 = เคยชิน','习 means practise; 惯 means accustomed to.'],
  '选择':[true,'你选择哪一个？','Nǐ xuǎnzé nǎ yí ge?','เธอเลือกอันไหน','Which one do you choose?','选 = เลือก, 择 = คัดเลือก','选 and 择 both relate to choosing.'],
  '比较':[false,'我们比较两张图片。','Wǒmen bǐjiào liǎng zhāng túpiàn.','พวกเราเปรียบเทียบรูปสองรูป','We compare two pictures.','比 = เทียบ, 较 = เปรียบเทียบ','比 and 较 both relate to comparing.'],
  '希望':[true,'我希望明天天气好。','Wǒ xīwàng míngtiān tiānqì hǎo.','ฉันหวังว่าพรุ่งนี้อากาศจะดี','I hope the weather is good tomorrow.','希 = หวัง, 望 = มองหรือหวัง','希 relates to hope; 望 can mean look toward or hope.'],
  '努力':[true,'努力就会有进步。','Nǔlì jiù huì yǒu jìnbù.','ถ้าพยายามก็จะก้าวหน้า','With effort, you will make progress.','努 = พยายาม, 力 = แรง ใช้แรงและความตั้งใจ','努 means exert effort; 力 means strength.'],
  '进步':[true,'他的中文进步了。','Tā de Zhōngwén jìnbù le.','ภาษาจีนของเขาดีขึ้นแล้ว','His Chinese has improved.','进 = ไปข้างหน้า, 步 = ก้าว','进 means advance; 步 means step.'],
  '成功':[true,'她成功完成了任务。','Tā chénggōng wánchéng le rènwu.','เธอทำภารกิจสำเร็จ','She successfully completed the task.','成 = สำเร็จ, 功 = ผลสำเร็จหรือผลงาน','成 means achieve; 功 means achievement or merit.'],
};

type Entry = readonly [hanzi: string, pinyin: string, th: string, en: string, sentence: string, sentencePinyin: string, sentenceTh: string, sentenceEn: string];
function group(grade: Grade, entries: readonly Entry[]): VocabWord[] {
  return entries.map(([hanzi, pinyin, meaningTh, meaningEn, sentence, sentencePinyin, th, en], i) => {
    const [mandatory,second,secondPinyin,secondTh,secondEn,tipTh,tipEn]=enrichment[hanzi];
    return {
    id: `p${grade}-${String(i + 1).padStart(2, '0')}`, grade, hanzi, pinyin, meaningTh, meaningEn,
    example: { hanzi: sentence, pinyin: sentencePinyin, th, en },
    is_mandatory_write:mandatory,
    sentences:[{hanzi:sentence,pinyin:sentencePinyin,meaning_th:th,meaning_en:en},{hanzi:second,pinyin:secondPinyin,meaning_th:secondTh,meaning_en:secondEn}],
    memory_tip_th:tipTh,memory_tip_en:tipEn,
  };});
}

export const sampleVocab: readonly VocabWord[] = [
  ...group(1, [
    ['你好','nǐ hǎo','สวัสดี','hello','老师，你好！','Lǎoshī, nǐ hǎo!','สวัสดีคุณครู!','Hello, teacher!'],
    ['谢谢','xièxie','ขอบคุณ','thank you','谢谢妈妈。','Xièxie māma.','ขอบคุณคุณแม่','Thank you, Mom.'],
    ['再见','zàijiàn','ลาก่อน','goodbye','同学们，再见！','Tóngxuémen, zàijiàn!','ลาก่อนเพื่อน ๆ!','Goodbye, classmates!'],
    ['我','wǒ','ฉัน','I; me','我是学生。','Wǒ shì xuésheng.','ฉันเป็นนักเรียน','I am a student.'],
    ['你','nǐ','เธอ; คุณ','you','你好吗？','Nǐ hǎo ma?','เธอสบายดีไหม','How are you?'],
    ['妈妈','māma','แม่','mother','我爱妈妈。','Wǒ ài māma.','ฉันรักแม่','I love Mom.'],
    ['爸爸','bàba','พ่อ','father','爸爸在家。','Bàba zài jiā.','พ่ออยู่บ้าน','Dad is at home.'],
    ['水','shuǐ','น้ำ','water','我喝水。','Wǒ hē shuǐ.','ฉันดื่มน้ำ','I drink water.'],
    ['猫','māo','แมว','cat','我喜欢猫。','Wǒ xǐhuan māo.','ฉันชอบแมว','I like cats.'],
    ['狗','gǒu','สุนัข','dog','这是我的狗。','Zhè shì wǒ de gǒu.','นี่คือสุนัขของฉัน','This is my dog.'],
  ]),
  ...group(2, [
    ['学校','xuéxiào','โรงเรียน','school','我去学校。','Wǒ qù xuéxiào.','ฉันไปโรงเรียน','I go to school.'],
    ['老师','lǎoshī','ครู','teacher','老师来了。','Lǎoshī lái le.','คุณครูมาแล้ว','The teacher has arrived.'],
    ['学生','xuésheng','นักเรียน','student','他是学生。','Tā shì xuésheng.','เขาเป็นนักเรียน','He is a student.'],
    ['书','shū','หนังสือ','book','我有一本书。','Wǒ yǒu yì běn shū.','ฉันมีหนังสือหนึ่งเล่ม','I have a book.'],
    ['笔','bǐ','ปากกา; ดินสอ','pen; writing instrument','这是我的笔。','Zhè shì wǒ de bǐ.','นี่คือปากกาของฉัน','This is my pen.'],
    ['红色','hóngsè','สีแดง','red','我喜欢红色。','Wǒ xǐhuan hóngsè.','ฉันชอบสีแดง','I like red.'],
    ['蓝色','lánsè','สีน้ำเงิน','blue','天空是蓝色的。','Tiānkōng shì lánsè de.','ท้องฟ้าเป็นสีฟ้า','The sky is blue.'],
    ['苹果','píngguǒ','แอปเปิล','apple','我吃苹果。','Wǒ chī píngguǒ.','ฉันกินแอปเปิล','I eat an apple.'],
    ['米饭','mǐfàn','ข้าวสวย','cooked rice','我吃米饭。','Wǒ chī mǐfàn.','ฉันกินข้าวสวย','I eat rice.'],
    ['牛奶','niúnǎi','นมวัว','milk','我喝牛奶。','Wǒ hē niúnǎi.','ฉันดื่มนม','I drink milk.'],
  ]),
  ...group(3, [
    ['今天','jīntiān','วันนี้','today','今天是星期一。','Jīntiān shì xīngqīyī.','วันนี้เป็นวันจันทร์','Today is Monday.'],
    ['明天','míngtiān','พรุ่งนี้','tomorrow','明天我去学校。','Míngtiān wǒ qù xuéxiào.','พรุ่งนี้ฉันไปโรงเรียน','I will go to school tomorrow.'],
    ['时间','shíjiān','เวลา','time','你有时间吗？','Nǐ yǒu shíjiān ma?','เธอมีเวลาไหม','Do you have time?'],
    ['朋友','péngyou','เพื่อน','friend','她是我的朋友。','Tā shì wǒ de péngyou.','เธอเป็นเพื่อนของฉัน','She is my friend.'],
    ['喜欢','xǐhuan','ชอบ','like','我喜欢画画。','Wǒ xǐhuan huàhuà.','ฉันชอบวาดรูป','I like drawing.'],
    ['跑步','pǎobù','วิ่ง','run; jog','我们一起跑步。','Wǒmen yìqǐ pǎobù.','พวกเราวิ่งด้วยกัน','We run together.'],
    ['看书','kàn shū','อ่านหนังสือ','read a book','妹妹在看书。','Mèimei zài kàn shū.','น้องสาวกำลังอ่านหนังสือ','My younger sister is reading.'],
    ['商店','shāngdiàn','ร้านค้า','shop','妈妈去商店。','Māma qù shāngdiàn.','แม่ไปร้านค้า','Mom goes to the shop.'],
    ['多少钱','duōshao qián','ราคาเท่าไร','how much (price)','这个多少钱？','Zhège duōshao qián?','อันนี้ราคาเท่าไร','How much is this?'],
    ['生日','shēngrì','วันเกิด','birthday','今天是我的生日。','Jīntiān shì wǒ de shēngrì.','วันนี้เป็นวันเกิดของฉัน','Today is my birthday.'],
  ]),
  ...group(4, [
    ['天气','tiānqì','สภาพอากาศ','weather','今天天气很好。','Jīntiān tiānqì hěn hǎo.','วันนี้อากาศดีมาก','The weather is lovely today.'],
    ['下雨','xià yǔ','ฝนตก','rain','外面下雨了。','Wàimiàn xià yǔ le.','ข้างนอกฝนตกแล้ว','It is raining outside.'],
    ['左边','zuǒbian','ด้านซ้าย','left side','书在左边。','Shū zài zuǒbian.','หนังสืออยู่ด้านซ้าย','The book is on the left.'],
    ['右边','yòubian','ด้านขวา','right side','门在右边。','Mén zài yòubian.','ประตูอยู่ด้านขวา','The door is on the right.'],
    ['医院','yīyuàn','โรงพยาบาล','hospital','爸爸去医院。','Bàba qù yīyuàn.','พ่อไปโรงพยาบาล','Dad goes to the hospital.'],
    ['帮助','bāngzhù','ช่วยเหลือ','help','请帮助我。','Qǐng bāngzhù wǒ.','กรุณาช่วยฉันด้วย','Please help me.'],
    ['完成','wánchéng','ทำเสร็จ','complete; finish','我完成了作业。','Wǒ wánchéng le zuòyè.','ฉันทำการบ้านเสร็จแล้ว','I finished my homework.'],
    ['作业','zuòyè','การบ้าน','homework','我每天做作业。','Wǒ měitiān zuò zuòyè.','ฉันทำการบ้านทุกวัน','I do homework every day.'],
    ['因为','yīnwèi','เพราะว่า','because','因为下雨，我们在家。','Yīnwèi xià yǔ, wǒmen zài jiā.','เพราะฝนตก พวกเราจึงอยู่บ้าน','Because it is raining, we are at home.'],
    ['运动','yùndòng','ออกกำลังกาย; กีฬา','exercise; sport','我每天运动。','Wǒ měitiān yùndòng.','ฉันออกกำลังกายทุกวัน','I exercise every day.'],
  ]),
  ...group(5, [
    ['图书馆','túshūguǎn','ห้องสมุด','library','我们去图书馆看书。','Wǒmen qù túshūguǎn kàn shū.','พวกเราไปอ่านหนังสือที่ห้องสมุด','We go to the library to read.'],
    ['旅行','lǚxíng','เดินทางท่องเที่ยว','travel','我想和家人去旅行。','Wǒ xiǎng hé jiārén qù lǚxíng.','ฉันอยากไปเที่ยวกับครอบครัว','I want to travel with my family.'],
    ['飞机','fēijī','เครื่องบิน','airplane','我们坐飞机去旅行。','Wǒmen zuò fēijī qù lǚxíng.','พวกเราเดินทางท่องเที่ยวโดยเครื่องบิน','We travel by airplane.'],
    ['准备','zhǔnbèi','เตรียม','prepare','我准备明天的课。','Wǒ zhǔnbèi míngtiān de kè.','ฉันเตรียมบทเรียนสำหรับพรุ่งนี้','I prepare for tomorrow’s lesson.'],
    ['问题','wèntí','คำถาม; ปัญหา','question; problem','我有一个问题。','Wǒ yǒu yí ge wèntí.','ฉันมีคำถามหนึ่งข้อ','I have a question.'],
    ['回答','huídá','ตอบ','answer; reply','请回答这个问题。','Qǐng huídá zhège wèntí.','กรุณาตอบคำถามข้อนี้','Please answer this question.'],
    ['健康','jiànkāng','สุขภาพ; แข็งแรง','health; healthy','运动对健康有好处。','Yùndòng duì jiànkāng yǒu hǎochu.','การออกกำลังกายดีต่อสุขภาพ','Exercise is good for your health.'],
    ['重要','zhòngyào','สำคัญ','important','学习很重要。','Xuéxí hěn zhòngyào.','การเรียนสำคัญมาก','Learning is very important.'],
    ['容易','róngyì','ง่าย','easy','这个问题很容易。','Zhège wèntí hěn róngyì.','คำถามข้อนี้ง่ายมาก','This question is very easy.'],
    ['困难','kùnnan','ยาก; ความยากลำบาก','difficult; difficulty','这个练习有点困难。','Zhège liànxí yǒudiǎn kùnnan.','แบบฝึกหัดนี้ยากนิดหน่อย','This exercise is a little difficult.'],
  ]),
  ...group(6, [
    ['计划','jìhuà','แผน; วางแผน','plan','我们有一个学习计划。','Wǒmen yǒu yí ge xuéxí jìhuà.','พวกเรามีแผนการเรียนหนึ่งแผน','We have a study plan.'],
    ['未来','wèilái','อนาคต','future','我想了解未来的世界。','Wǒ xiǎng liǎojiě wèilái de shìjiè.','ฉันอยากรู้จักโลกในอนาคต','I want to learn about the world of the future.'],
    ['环境','huánjìng','สิ่งแวดล้อม','environment','我们要保护环境。','Wǒmen yào bǎohù huánjìng.','พวกเราต้องรักษาสิ่งแวดล้อม','We should protect the environment.'],
    ['习惯','xíguàn','นิสัย; ความเคยชิน','habit','每天阅读是个好习惯。','Měitiān yuèdú shì ge hǎo xíguàn.','การอ่านทุกวันเป็นนิสัยที่ดี','Reading every day is a good habit.'],
    ['选择','xuǎnzé','เลือก; ทางเลือก','choose; choice','你可以选择一本书。','Nǐ kěyǐ xuǎnzé yì běn shū.','เธอสามารถเลือกหนังสือหนึ่งเล่มได้','You can choose a book.'],
    ['比较','bǐjiào','เปรียบเทียบ','compare','我们比较两个答案。','Wǒmen bǐjiào liǎng ge dá’àn.','พวกเราเปรียบเทียบคำตอบสองข้อ','We compare two answers.'],
    ['希望','xīwàng','หวัง','hope','我希望你快乐。','Wǒ xīwàng nǐ kuàilè.','ฉันหวังว่าเธอจะมีความสุข','I hope you are happy.'],
    ['努力','nǔlì','พยายาม; ขยัน','work hard','我会努力学习中文。','Wǒ huì nǔlì xuéxí Zhōngwén.','ฉันจะตั้งใจเรียนภาษาจีน','I will work hard at learning Chinese.'],
    ['进步','jìnbù','ก้าวหน้า','make progress','你每天都在进步。','Nǐ měitiān dōu zài jìnbù.','เธอก้าวหน้าขึ้นทุกวัน','You are making progress every day.'],
    ['成功','chénggōng','ประสบความสำเร็จ','succeed; success','我们一起努力，就能成功。','Wǒmen yìqǐ nǔlì, jiù néng chénggōng.','ถ้าพวกเราพยายามด้วยกัน ก็จะประสบความสำเร็จ','If we work hard together, we can succeed.'],
  ]),
];

export function vocabForGrade(grade: Grade): VocabWord[] {
  return sampleVocab.filter(word => word.grade === grade);
}
