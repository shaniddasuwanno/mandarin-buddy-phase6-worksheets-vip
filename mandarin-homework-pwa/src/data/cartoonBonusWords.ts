import { sampleVocab,type VocabWord,type StudySentence } from './sampleVocab';
type Item=readonly [string,string,string,string,readonly [string,string,string,string],readonly [string,string,string,string]];
const entries:Item[]=[
 ['哥哥','gēge','พี่ชาย','older brother',['我有一个哥哥。','Wǒ yǒu yí ge gēge.','ฉันมีพี่ชายหนึ่งคน','I have an older brother.'],['哥哥在家。','Gēge zài jiā.','พี่ชายอยู่บ้าน','My older brother is at home.']],
 ['妹妹','mèimei','น้องสาว','younger sister',['妹妹喜欢猫。','Mèimei xǐhuan māo.','น้องสาวชอบแมว','My younger sister likes cats.'],['我爱妹妹。','Wǒ ài mèimei.','ฉันรักน้องสาว','I love my younger sister.']],
 ['爷爷','yéye','ปู่','paternal grandfather',['爷爷喝茶。','Yéye hē chá.','ปู่ดื่มชา','Grandpa drinks tea.'],['爷爷在家。','Yéye zài jiā.','ปู่อยู่บ้าน','Grandpa is at home.']],
 ['奶奶','nǎinai','ย่า','paternal grandmother',['奶奶喜欢花。','Nǎinai xǐhuan huā.','ย่าชอบดอกไม้','Grandma likes flowers.'],['我爱奶奶。','Wǒ ài nǎinai.','ฉันรักย่า','I love Grandma.']],
 ['小狗','xiǎogǒu','ลูกสุนัข','puppy',['小狗很可爱。','Xiǎogǒu hěn kě’ài.','ลูกสุนัขน่ารักมาก','The puppy is very cute.'],['我喜欢小狗。','Wǒ xǐhuan xiǎogǒu.','ฉันชอบลูกสุนัข','I like puppies.']],
 ['香蕉','xiāngjiāo','กล้วย','banana',['我吃香蕉。','Wǒ chī xiāngjiāo.','ฉันกินกล้วย','I eat bananas.'],['香蕉是黄色的。','Xiāngjiāo shì huángsè de.','กล้วยมีสีเหลือง','Bananas are yellow.']],
 ['橙子','chéngzi','ส้ม','orange',['我喜欢橙子。','Wǒ xǐhuan chéngzi.','ฉันชอบส้ม','I like oranges.'],['这个橙子很甜。','Zhège chéngzi hěn tián.','ส้มลูกนี้หวาน','This orange is sweet.']],
 ['葡萄','pútáo','องุ่น','grapes',['我吃葡萄。','Wǒ chī pútáo.','ฉันกินองุ่น','I eat grapes.'],['葡萄很甜。','Pútáo hěn tián.','องุ่นหวานมาก','Grapes are very sweet.']],
 ['西瓜','xīguā','แตงโม','watermelon',['我喜欢西瓜。','Wǒ xǐhuan xīguā.','ฉันชอบแตงโม','I like watermelon.'],['这个西瓜很大。','Zhège xīguā hěn dà.','แตงโมลูกนี้ใหญ่มาก','This watermelon is very big.']],
 ['上','shàng','บน','up / on top',['熊猫在箱子上。','Xióngmāo zài xiāngzi shàng.','แพนด้าอยู่บนกล่อง','The panda is on the box.'],['书在桌子上。','Shū zài zhuōzi shàng.','หนังสืออยู่บนโต๊ะ','The book is on the table.']],
 ['下','xià','ล่าง','down / underneath',['熊猫在桌子下。','Xióngmāo zài zhuōzi xià.','แพนด้าอยู่ใต้โต๊ะ','The panda is under the table.'],['猫在椅子下。','Māo zài yǐzi xià.','แมวอยู่ใต้เก้าอี้','The cat is under the chair.']],
 ['左','zuǒ','ซ้าย','left',['熊猫在左边。','Xióngmāo zài zuǒbian.','แพนด้าอยู่ด้านซ้าย','The panda is on the left.'],['书在左边。','Shū zài zuǒbian.','หนังสืออยู่ด้านซ้าย','The book is on the left.']],
 ['右','yòu','ขวา','right',['熊猫在右边。','Xióngmāo zài yòubian.','แพนด้าอยู่ด้านขวา','The panda is on the right.'],['门在右边。','Mén zài yòubian.','ประตูอยู่ด้านขวา','The door is on the right.']],
 ['中','zhōng','ตรงกลาง','middle',['熊猫在箱子中。','Xióngmāo zài xiāngzi zhōng.','แพนด้าอยู่ในกล่อง','The panda is inside the box.'],['红色在中间。','Hóngsè zài zhōngjiān.','สีแดงอยู่ตรงกลาง','Red is in the middle.']],
 ['前','qián','ด้านหน้า','in front',['熊猫在箱子前。','Xióngmāo zài xiāngzi qián.','แพนด้าอยู่หน้ากล่อง','The panda is in front of the box.'],['我在学校前面。','Wǒ zài xuéxiào qiánmiàn.','ฉันอยู่ด้านหน้าโรงเรียน','I am in front of the school.']],
 ['后','hòu','ด้านหลัง','behind',['熊猫在箱子后。','Xióngmāo zài xiāngzi hòu.','แพนด้าอยู่หลังกล่อง','The panda is behind the box.'],['狗在门后面。','Gǒu zài mén hòumiàn.','สุนัขอยู่หลังประตู','The dog is behind the door.']],
 ['前后','qiánhòu','ด้านหน้าและด้านหลัง','front and back',['看看箱子的前后。','Kànkan xiāngzi de qiánhòu.','ดูด้านหน้าและด้านหลังของกล่อง','Look at the front and back of the box.'],['房子的前后都有树。','Fángzi de qiánhòu dōu yǒu shù.','มีต้นไม้ทั้งด้านหน้าและด้านหลังบ้าน','There are trees in front of and behind the house.']],
];
const toSentence=([hanzi,pinyin,meaning_th,meaning_en]:Item[4]):StudySentence=>({hanzi,pinyin,meaning_th,meaning_en});
const extras=entries.map(([hanzi,pinyin,meaningTh,meaningEn,first,second],i):VocabWord=>({id:`cartoon-bonus-${i}`,grade:1,hanzi,pinyin,meaningTh,meaningEn,example:{hanzi:first[0],pinyin:first[1],th:first[2],en:first[3]},is_mandatory_write:false,sentences:[toSentence(first),toSentence(second)],memory_tip_th:`ดูภาพ แล้วพูด ${hanzi} (${pinyin}) ซ้ำ ๆ`,memory_tip_en:`Tap the illustration and say ${hanzi} (${pinyin}) aloud.`}));
export const cartoonBonusWords=[...sampleVocab.filter(w=>['爸爸','妈妈'].includes(w.hanzi)),...extras];
