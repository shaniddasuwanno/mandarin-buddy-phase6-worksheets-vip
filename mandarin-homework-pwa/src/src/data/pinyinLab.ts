/** Standard teaching syllables for the requested initial/final inventory. */
export const initials=['b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s'] as const;
export const finals=['a','o','e','i','u','ü','ai','ei','ao','ou','an','en','ang','eng','ong'] as const;
export type Initial=typeof initials[number];export type Final=typeof finals[number];export type Tone=1|2|3|4;
export type PinyinExample={hanzi:string;pinyin:string;th:string;en:string;icon:string};
// Delimited original teaching examples. Pinyin syllables are separated by spaces so exact
// syllable matching is possible. Rare or alternative spellings are explicitly labelled in the UI.
const source=`
ba|爸爸~bà ba~พ่อ~Dad~👨|八~bā~แปด~Eight~8️⃣
bo|波浪~bō làng~คลื่น~Wave~🌊|伯伯~bó bo~ลุง~Uncle~👨
bi|笔~bǐ~ปากกา~Pen~🖊️|鼻子~bí zi~จมูก~Nose~👃
bu|布~bù~ผ้า~Cloth~🧵|补习~bǔ xí~เรียนเสริม~Extra lessons~📚
bai|白色~bái sè~สีขาว~White~⚪|百~bǎi~ร้อย~Hundred~💯
bei|杯子~bēi zi~แก้ว~Cup~🥛|背包~bēi bāo~เป้~Backpack~🎒
bao|包子~bāo zi~ซาลาเปา~Steamed bun~🥟|宝宝~bǎo bao~เด็กน้อย~Baby~👶
ban|班级~bān jí~ชั้นเรียน~Class~🏫|半~bàn~ครึ่ง~Half~🍰
ben|本子~běn zi~สมุด~Notebook~📒|书本~shū běn~หนังสือ~Book~📚
bang|帮助~bāng zhù~ช่วยเหลือ~Help~🤝|棒棒糖~bàng bàng táng~อมยิ้ม~Lollipop~🍭
beng|蹦跳~bèng tiào~กระโดด~Jump~🐇|绷带~bēng dài~ผ้าพันแผล~Bandage~🩹
pa|爬山~pá shān~ปีนเขา~Climb a mountain~⛰️|害怕~hài pà~กลัว~Afraid~😨
po|坡~pō~ทางลาด~Slope~⛰️|婆婆~pó po~แม่สามี~Mother-in-law~👵
pi|皮球~pí qiú~ลูกบอลยาง~Rubber ball~⚽|苹果皮~píng guǒ pí~เปลือกแอปเปิล~Apple peel~🍎
pu|葡萄~pú táo~องุ่น~Grapes~🍇|瀑布~pù bù~น้ำตก~Waterfall~🌊
pai|拍手~pāi shǒu~ตบมือ~Clap hands~👏|排队~pái duì~เข้าแถว~Queue~🧍
pei|陪伴~péi bàn~อยู่เป็นเพื่อน~Keep company~🤝|配对~pèi duì~จับคู่~Match~🧩
pao|跑步~pǎo bù~วิ่ง~Run~🏃|泡泡~pào pao~ฟองสบู่~Bubbles~🫧
pou|剖开~pōu kāi~ผ่าเปิด~Cut open~🍉|解剖~jiě pōu~ผ่าศึกษาโครงสร้าง~Dissection~🔬
pan|盘子~pán zi~จาน~Plate~🍽️|盼望~pàn wàng~เฝ้าหวัง~Look forward to~✨
pen|喷泉~pēn quán~น้ำพุ~Fountain~⛲|脸盆~liǎn pén~อ่างล้างหน้า~Washbasin~🫧
pang|旁边~páng biān~ข้างๆ~Beside~↔️|胖~pàng~อ้วน~Plump~🐻
peng|朋友~péng you~เพื่อน~Friend~🧑‍🤝‍🧑|碰球~pèng qiú~แตะลูกบอล~Touch a ball~⚽
ma|妈妈~mā ma~แม่~Mom~👩|小马~xiǎo mǎ~ม้าน้อย~Pony~🐴
mo|摸~mō~สัมผัส~Touch~✋|墨水~mò shuǐ~หมึก~Ink~🖋️
me|什么~shén me~อะไร~What~❓|怎么~zěn me~อย่างไร~How~💬
mi|米饭~mǐ fàn~ข้าว~Rice~🍚|秘密~mì mì~ความลับ~Secret~🤫
mu|木头~mù tou~ไม้~Wood~🪵|母亲~mǔ qīn~แม่~Mother~👩
mai|买~mǎi~ซื้อ~Buy~🛒|卖~mài~ขาย~Sell~🏪
mei|妹妹~mèi mei~น้องสาว~Younger sister~👧|美丽~měi lì~สวยงาม~Beautiful~🌷
mao|猫~māo~แมว~Cat~🐱|帽子~mào zi~หมวก~Hat~🧢
mou|某人~mǒu rén~บางคน~Someone~👤|谋划~móu huà~วางแผน~Plan~📝
man|慢慢~màn màn~ช้าๆ~Slowly~🐢|满~mǎn~เต็ม~Full~🥛
men|门~mén~ประตู~Door~🚪|闷热~mēn rè~อบอ้าว~Stuffy and hot~🌡️
mang|忙~máng~ยุ่ง~Busy~📚|芒果~máng guǒ~มะม่วง~Mango~🥭
meng|梦想~mèng xiǎng~ความฝัน~Dream~🌙|萌芽~méng yá~แตกหน่อ~Sprout~🌱
fa|发芽~fā yá~งอก~Sprout~🌱|方法~fāng fǎ~วิธี~Method~📝
fo|佛像~fó xiàng~พระพุทธรูป~Buddha statue~🛕|佛教~fó jiào~พุทธศาสนา~Buddhism~🪷
fu|父亲~fù qīn~พ่อ~Father~👨|幸福~xìng fú~ความสุข~Happiness~💛
fei|飞机~fēi jī~เครื่องบิน~Airplane~✈️|肥皂~féi zào~สบู่~Soap~🧼
fou|否定~fǒu dìng~ปฏิเสธ~Negate~❌|是否~shì fǒu~หรือไม่~Whether~❓
fan|米饭~mǐ fàn~ข้าว~Rice~🍚|翻书~fān shū~พลิกหนังสือ~Turn pages~📖
fen|分开~fēn kāi~แยก~Separate~↔️|粉色~fěn sè~สีชมพู~Pink~🌸
fang|房子~fáng zi~บ้าน~House~🏠|放下~fàng xià~วางลง~Put down~📦
feng|风~fēng~ลม~Wind~🍃|蜂蜜~fēng mì~น้ำผึ้ง~Honey~🍯
da|大~dà~ใหญ่~Big~🐘|打球~dǎ qiú~เล่นบอล~Play ball~⚽
de|得到~dé dào~ได้รับ~Receive~🎁|道德~dào dé~คุณธรรม~Morality~💛
di|弟弟~dì di~น้องชาย~Younger brother~👦|低~dī~ต่ำ~Low~⬇️
du|读书~dú shū~อ่านหนังสือ~Read~📖|肚子~dù zi~ท้อง~Belly~🙂
dai|袋子~dài zi~ถุง~Bag~🛍️|带~dài~พก~Carry~🎒
dei|得~děi~ต้อง~Must~❗|得走~děi zǒu~ต้องไป~Have to go~🚶
dao|刀~dāo~มีด~Knife~🔪|到~dào~มาถึง~Arrive~📍
dou|豆子~dòu zi~ถั่ว~Bean~🫘|抖动~dǒu dòng~สั่น~Shake~🫨
dan|鸡蛋~jī dàn~ไข่ไก่~Egg~🥚|丹顶鹤~dān dǐng hè~นกกระเรียนมงกุฎแดง~Red-crowned crane~🐦
den|扽~dèn~กระตุก~Tug~🪢|扽紧~dèn jǐn~ดึงให้ตึง~Pull tight~🪢
dang|当~dāng~เป็น (บทบาท)~Act as~👩‍🏫|挡住~dǎng zhù~กั้น~Block~🚧
deng|灯~dēng~โคมไฟ~Lamp~💡|等~děng~รอ~Wait~⏰
dong|冬天~dōng tiān~ฤดูหนาว~Winter~❄️|动物~dòng wù~สัตว์~Animal~🐾
ta|他~tā~เขา~He~👦|塔~tǎ~หอคอย~Tower~🗼
te|特别~tè bié~พิเศษ~Special~✨|特色~tè sè~ลักษณะพิเศษ~Characteristic~⭐
ti|踢球~tī qiú~เตะบอล~Kick a ball~⚽|身体~shēn tǐ~ร่างกาย~Body~🧍
tu|图画~tú huà~ภาพวาด~Picture~🎨|兔子~tù zi~กระต่าย~Rabbit~🐰
tai|太阳~tài yáng~ดวงอาทิตย์~Sun~☀️|抬头~tái tóu~เงยหน้า~Look up~⬆️
tao|桃子~táo zi~ลูกพีช~Peach~🍑|逃跑~táo pǎo~วิ่งหนี~Run away~🏃
tou|头~tóu~ศีรษะ~Head~🙂|投球~tóu qiú~โยนบอล~Throw a ball~⚾
tan|谈话~tán huà~สนทนา~Talk~💬|弹琴~tán qín~เล่นเครื่องดนตรี~Play music~🎹
tang|糖~táng~น้ำตาล~Sugar~🍬|汤~tāng~ซุป~Soup~🍲
teng|疼~téng~เจ็บ~Hurt~🩹|腾空~téng kōng~ลอยขึ้น~Rise into the air~🎈
tong|同学~tóng xué~เพื่อนร่วมชั้น~Classmate~🧑‍🎓|痛~tòng~เจ็บ~Pain~🩹
na|拿~ná~หยิบ~Take~✋|哪~nǎ~ไหน~Which~❓
ne|木讷~mù nè~พูดไม่คล่อง~Quiet and inarticulate~🤫|讷讷~nè nè~พูดตะกุกตะกัก~Speak haltingly~💬
ni|你~nǐ~เธอ~You~👉|泥土~ní tǔ~ดิน~Soil~🌱
nu|努力~nǔ lì~พยายาม~Work hard~💪|怒火~nù huǒ~ความโกรธ~Anger~🔥
nü|女孩~nǚ hái~เด็กผู้หญิง~Girl~👧|女儿~nǚ ér~ลูกสาว~Daughter~👧
nai|奶奶~nǎi nai~ย่า~Grandma~👵|耐心~nài xīn~ความอดทน~Patience~⏳
nei|那个~nèi ge~อันนั้น~That one~👉|那位~nèi wèi~ท่านนั้น~That person~👤
nao|脑袋~nǎo dai~ศีรษะ~Head~🧠|热闹~rè nao~คึกคัก~Lively~🎊
nou|耨草~nòu cǎo~ดายหญ้า~Hoe weeds~🌱|耕耨~gēng nòu~เพาะปลูกและพรวนดิน~Cultivate~🚜
nan|南方~nán fāng~ทิศใต้~South~🧭|困难~kùn nan~ยากลำบาก~Difficulty~🧩
nen|嫩芽~nèn yá~ยอดอ่อน~Young sprout~🌱|嫩绿~nèn lǜ~สีเขียวอ่อน~Fresh green~🍃
nang|皮囊~pí náng~ถุงหนัง~Leather pouch~👝|胶囊~jiāo náng~แคปซูล~Capsule~💊
neng|能~néng~สามารถ~Can~💪|能力~néng lì~ความสามารถ~Ability~🌟
nong|农场~nóng chǎng~ฟาร์ม~Farm~🚜|弄好~nòng hǎo~ทำให้เรียบร้อย~Finish arranging~✅
la|拉~lā~ดึง~Pull~🪢|辣椒~là jiāo~พริก~Chilli~🌶️
le|快乐~kuài lè~มีความสุข~Happy~😄|乐园~lè yuán~สวนสนุก~Amusement park~🎡
li|梨~lí~ลูกแพร์~Pear~🍐|礼物~lǐ wù~ของขวัญ~Gift~🎁
lu|路~lù~ถนน~Road~🛣️|鹿~lù~กวาง~Deer~🦌
lü|绿色~lǜ sè~สีเขียว~Green~🟢|旅行~lǚ xíng~ท่องเที่ยว~Travel~🧳
lai|来~lái~มา~Come~👋|未来~wèi lái~อนาคต~Future~🚀
lei|雷~léi~ฟ้าร้อง~Thunder~⛈️|累~lèi~เหนื่อย~Tired~😴
lao|老师~lǎo shī~ครู~Teacher~👩‍🏫|劳动~láo dòng~ทำงาน~Labour~🧹
lou|楼房~lóu fáng~ตึก~Building~🏢|漏水~lòu shuǐ~น้ำรั่ว~Water leak~💧
lan|蓝色~lán sè~สีฟ้า~Blue~🔵|篮子~lán zi~ตะกร้า~Basket~🧺
lang|狼~láng~หมาป่า~Wolf~🐺|波浪~bō làng~คลื่น~Wave~🌊
leng|冷~lěng~หนาว~Cold~🥶|愣住~lèng zhù~ตกตะลึง~Freeze in surprise~😯
long|龙~lóng~มังกร~Dragon~🐉|笼子~lóng zi~กรง~Cage~🪹
ga|嘎嘎~gā gā~เสียงเป็ดร้อง~Quack~🦆|嘎吱~gā zhī~เสียงเอี๊ยด~Creak~🚪
ge|哥哥~gē ge~พี่ชาย~Older brother~👦|歌~gē~เพลง~Song~🎵
gu|鼓~gǔ~กลอง~Drum~🥁|故事~gù shi~นิทาน~Story~📖
gai|盖子~gài zi~ฝาปิด~Lid~🫙|应该~yīng gāi~ควร~Should~✅
gei|给~gěi~ให้~Give~🎁|送给~sòng gěi~มอบให้~Give to~🎀
gao|高~gāo~สูง~Tall~📏|蛋糕~dàn gāo~เค้ก~Cake~🎂
gou|狗~gǒu~สุนัข~Dog~🐕|够~gòu~เพียงพอ~Enough~✅
gan|干净~gān jìng~สะอาด~Clean~🫧|感冒~gǎn mào~เป็นหวัด~Cold (illness)~🤧
gen|根~gēn~ราก~Root~🌱|跟着~gēn zhe~ตาม~Follow~🚶
gang|钢琴~gāng qín~เปียโน~Piano~🎹|刚才~gāng cái~เมื่อกี้~Just now~⏰
geng|耕田~gēng tián~ไถนา~Plough fields~🚜|更好~gèng hǎo~ดีกว่า~Better~🌟
gong|公园~gōng yuán~สวนสาธารณะ~Park~🌳|工作~gōng zuò~ทำงาน~Work~💼
ka|咖啡~kā fēi~กาแฟ~Coffee~☕|卡片~kǎ piàn~การ์ด~Card~🃏
ke|课~kè~บทเรียน~Lesson~📚|可爱~kě ài~น่ารัก~Cute~🐼
ku|哭~kū~ร้องไห้~Cry~😢|苦~kǔ~ขม~Bitter~🍋
kai|开门~kāi mén~เปิดประตู~Open the door~🚪|开心~kāi xīn~ดีใจ~Happy~😊
kao|考试~kǎo shì~สอบ~Exam~📝|烤面包~kǎo miàn bāo~ขนมปังปิ้ง~Toast~🍞
kou|口~kǒu~ปาก~Mouth~👄|扣子~kòu zi~กระดุม~Button~🧥
kan|看书~kàn shū~อ่านหนังสือ~Read a book~📖|看见~kàn jiàn~มองเห็น~See~👁️
ken|肯定~kěn dìng~ยืนยัน~Certain~✅|啃苹果~kěn píng guǒ~แทะแอปเปิล~Gnaw an apple~🍎
kang|健康~jiàn kāng~สุขภาพดี~Healthy~💪|康复~kāng fù~ฟื้นตัว~Recover~🩹
keng|坑~kēng~หลุม~Pit~🕳️|水坑~shuǐ kēng~แอ่งน้ำ~Puddle~💧
kong|天空~tiān kōng~ท้องฟ้า~Sky~☁️|恐龙~kǒng lóng~ไดโนเสาร์~Dinosaur~🦕
ha|哈哈~hā hā~หัวเราะ~Ha ha~😄|哈欠~hā qian~หาว~Yawn~🥱
he|河~hé~แม่น้ำ~River~🏞️|喝水~hē shuǐ~ดื่มน้ำ~Drink water~💧
hu|湖~hú~ทะเลสาบ~Lake~🏞️|老虎~lǎo hǔ~เสือ~Tiger~🐯
hai|海~hǎi~ทะเล~Sea~🌊|孩子~hái zi~เด็ก~Child~🧒
hei|黑色~hēi sè~สีดำ~Black~⚫|黑板~hēi bǎn~กระดานดำ~Blackboard~🏫
hao|好~hǎo~ดี~Good~👍|号~hào~หมายเลข~Number~🔢
hou|猴子~hóu zi~ลิง~Monkey~🐒|后面~hòu mian~ด้านหลัง~Behind~↩️
han|汗~hàn~เหงื่อ~Sweat~💧|寒冷~hán lěng~หนาวเย็น~Cold~❄️
hen|很~hěn~มาก~Very~⭐|恨~hèn~เกลียด~Hate~😠
hang|航海~háng hǎi~เดินเรือ~Sail~⛵|银行~yín háng~ธนาคาร~Bank~🏦
heng|横~héng~แนวนอน~Horizontal~↔️|平衡~píng héng~สมดุล~Balance~⚖️
hong|红色~hóng sè~สีแดง~Red~🔴|彩虹~cǎi hóng~สายรุ้ง~Rainbow~🌈
ji|鸡~jī~ไก่~Chicken~🐔|几~jǐ~กี่~How many~❓
ju|句子~jù zi~ประโยค~Sentence~📝|橘子~jú zi~ส้ม~Mandarin orange~🍊
qi|七~qī~เจ็ด~Seven~7️⃣|气球~qì qiú~ลูกโป่ง~Balloon~🎈
qu|去~qù~ไป~Go~🚶|有趣~yǒu qù~น่าสนใจ~Interesting~✨
xi|西瓜~xī guā~แตงโม~Watermelon~🍉|洗手~xǐ shǒu~ล้างมือ~Wash hands~🧼
xu|需要~xū yào~ต้องการ~Need~💭|许多~xǔ duō~มากมาย~Many~🔢
zha|油炸~yóu zhá~ทอดในน้ำมัน~Deep-fry~🍳|眨眼~zhǎ yǎn~กะพริบตา~Blink~👁️
zhe|这~zhè~นี่~This~👉|折纸~zhé zhǐ~พับกระดาษ~Paper folding~📄
zhi|纸~zhǐ~กระดาษ~Paper~📄|知道~zhī dào~รู้~Know~💡
zhu|猪~zhū~หมู~Pig~🐷|竹子~zhú zi~ไม้ไผ่~Bamboo~🎋
zhai|摘花~zhāi huā~เด็ดดอกไม้~Pick flowers~🌸|窄~zhǎi~แคบ~Narrow~↔️
zhei|这个~zhèi ge~อันนี้~This one~👉|这位~zhèi wèi~ท่านนี้~This person~👤
zhao|找~zhǎo~หา~Look for~🔍|照相~zhào xiàng~ถ่ายรูป~Take a photo~📷
zhou|周末~zhōu mò~สุดสัปดาห์~Weekend~📅|粥~zhōu~โจ๊ก~Porridge~🥣
zhan|站~zhàn~ยืน~Stand~🧍|展览~zhǎn lǎn~นิทรรศการ~Exhibition~🖼️
zhen|真的~zhēn de~จริงๆ~Really~✅|针~zhēn~เข็ม~Needle~🪡
zhang|长大~zhǎng dà~โตขึ้น~Grow up~🌱|张开~zhāng kāi~กางออก~Open wide~👐
zheng|正确~zhèng què~ถูกต้อง~Correct~✅|风筝~fēng zheng~ว่าว~Kite~🪁
zhong|中国~zhōng guó~ประเทศจีน~China~🇨🇳|钟~zhōng~นาฬิกา~Clock~🕰️
cha|茶~chá~ชา~Tea~🍵|叉子~chā zi~ส้อม~Fork~🍴
che|车~chē~รถ~Car~🚗|撤走~chè zǒu~ถอนออก~Remove~↩️
chi|吃~chī~กิน~Eat~🍽️|尺子~chǐ zi~ไม้บรรทัด~Ruler~📏
chu|出去~chū qù~ออกไป~Go out~🚪|厨房~chú fáng~ห้องครัว~Kitchen~🍳
chai|柴火~chái huǒ~ฟืน~Firewood~🪵|拆开~chāi kāi~แกะออก~Open up~📦
chao|超市~chāo shì~ซูเปอร์มาร์เก็ต~Supermarket~🛒|炒饭~chǎo fàn~ข้าวผัด~Fried rice~🍚
chou|抽屉~chōu ti~ลิ้นชัก~Drawer~🗄️|臭~chòu~เหม็น~Smelly~👃
chan|蝉~chán~จักจั่น~Cicada~🦗|铲子~chǎn zi~พลั่ว~Shovel~🌱
chen|早晨~zǎo chén~ตอนเช้า~Morning~🌅|灰尘~huī chén~ฝุ่น~Dust~🧹
chang|长~cháng~ยาว~Long~📏|唱歌~chàng gē~ร้องเพลง~Sing~🎤
cheng|城市~chéng shì~เมือง~City~🏙️|成功~chéng gōng~สำเร็จ~Success~🏆
chong|虫子~chóng zi~แมลง~Bug~🐛|冲水~chōng shuǐ~ล้างด้วยน้ำ~Flush~💧
sha|沙子~shā zi~ทราย~Sand~🏖️|沙发~shā fā~โซฟา~Sofa~🛋️
she|蛇~shé~งู~Snake~🐍|射箭~shè jiàn~ยิงธนู~Archery~🏹
shi|十~shí~สิบ~Ten~🔟|石头~shí tou~หิน~Stone~🪨
shu|书~shū~หนังสือ~Book~📖|树~shù~ต้นไม้~Tree~🌳
shai|晒太阳~shài tài yáng~ตากแดด~Sunbathe~☀️|筛子~shāi zi~ตะแกรง~Sieve~🧺
shei|谁~shéi~ใคร~Who~❓|谁的~shéi de~ของใคร~Whose~❔
shao|勺子~sháo zi~ช้อน~Spoon~🥄|少~shǎo~น้อย~Few~🤏
shou|手~shǒu~มือ~Hand~✋|收拾~shōu shi~เก็บให้เรียบร้อย~Tidy up~🧹
shan|山~shān~ภูเขา~Mountain~⛰️|扇子~shàn zi~พัด~Fan~🪭
shen|身体~shēn tǐ~ร่างกาย~Body~🧍|深~shēn~ลึก~Deep~🌊
shang|上~shàng~บน~Up~⬆️|商店~shāng diàn~ร้านค้า~Shop~🏪
sheng|生日~shēng rì~วันเกิด~Birthday~🎂|声音~shēng yīn~เสียง~Sound~🔊
re|热~rè~ร้อน~Hot~🌞|热水~rè shuǐ~น้ำร้อน~Hot water~☕
ri|日~rì~วัน / ดวงอาทิตย์~Day / sun~☀️|日历~rì lì~ปฏิทิน~Calendar~📅
ru|如果~rú guǒ~ถ้า~If~💭|入口~rù kǒu~ทางเข้า~Entrance~🚪
rao|绕圈~rào quān~วนรอบ~Go around~🔄|打扰~dǎ rǎo~รบกวน~Disturb~🤫
rou|肉~ròu~เนื้อสัตว์~Meat~🥩|柔软~róu ruǎn~นุ่ม~Soft~🧸
ran|然后~rán hòu~จากนั้น~Then~➡️|染色~rǎn sè~ย้อมสี~Dye~🎨
ren|人~rén~คน~Person~🧍|认识~rèn shi~รู้จัก~Know someone~🤝
rang|让~ràng~ให้ / อนุญาต~Let~🤲|土壤~tǔ rǎng~ดิน~Soil~🌱
reng|扔~rēng~โยน~Throw~🏀|仍然~réng rán~ยังคง~Still~⏳
rong|容易~róng yì~ง่าย~Easy~😊|融化~róng huà~ละลาย~Melt~🧊
za|杂志~zá zhì~นิตยสาร~Magazine~📖|砸~zá~ทุบ~Smash~🔨
ze|责任~zé rèn~ความรับผิดชอบ~Responsibility~✅|规则~guī zé~กฎ~Rule~📋
zi|字~zì~ตัวอักษร~Character~🔤|紫色~zǐ sè~สีม่วง~Purple~🟣
zu|足球~zú qiú~ฟุตบอล~Football~⚽|祖父~zǔ fù~ปู่~Grandfather~👴
zai|再见~zài jiàn~ลาก่อน~Goodbye~👋|在家~zài jiā~อยู่บ้าน~At home~🏠
zei|贼~zéi~โจร~Thief~🕵️|盗贼~dào zéi~ขโมย~Robber~🕵️
zao|早上~zǎo shang~ตอนเช้า~Morning~🌅|肥皂~féi zào~สบู่~Soap~🧼
zou|走~zǒu~เดิน~Walk~🚶|走路~zǒu lù~เดินเท้า~Walk on foot~🚶
zan|咱们~zán men~พวกเรา~We~🧑‍🤝‍🧑|赞美~zàn měi~ชมเชย~Praise~👏
zen|怎么~zěn me~อย่างไร~How~❓|怎样~zěn yàng~เป็นอย่างไร~How is it~❔
zang|脏~zāng~สกปรก~Dirty~🧹|心脏~xīn zàng~หัวใจ~Heart~❤️
zeng|增加~zēng jiā~เพิ่ม~Increase~📈|赠送~zèng sòng~มอบเป็นของขวัญ~Give as a gift~🎁
zong|总是~zǒng shì~เสมอ~Always~🔁|棕色~zōng sè~สีน้ำตาล~Brown~🟤
ca|擦黑板~cā hēi bǎn~เช็ดกระดาน~Wipe the board~🧽|擦手~cā shǒu~เช็ดมือ~Wipe hands~🧻
ce|厕所~cè suǒ~ห้องน้ำ~Toilet~🚻|测量~cè liáng~วัด~Measure~📏
ci|刺猬~cì wei~เม่น~Hedgehog~🦔|词语~cí yǔ~คำศัพท์~Word~🔤
cu|粗~cū~หนา / หยาบ~Thick / coarse~🪵|醋~cù~น้ำส้มสายชู~Vinegar~🍶
cai|菜~cài~ผัก / อาหาร~Vegetables / dish~🥬|彩色~cǎi sè~หลากสี~Colourful~🌈
cao|草~cǎo~หญ้า~Grass~🌱|操场~cāo chǎng~สนามกีฬา~Playground~🏟️
cou|凑近~còu jìn~ขยับเข้าใกล้~Move closer~🤝|拼凑~pīn còu~ปะติดปะต่อ~Piece together~🧩
can|餐厅~cān tīng~ร้านอาหาร~Restaurant~🍽️|参加~cān jiā~เข้าร่วม~Join~🙋
cen|岑寂~cén jì~เงียบสงัด~Quiet and lonely~🌙|汗涔涔~hàn cén cén~เหงื่อไหล~Sweating~💧
cang|仓库~cāng kù~โกดัง~Warehouse~🏬|藏起来~cáng qǐ lái~ซ่อน~Hide~🙈
ceng|层~céng~ชั้น~Layer~🏢|曾经~céng jīng~เคย~Once~⏳
cong|从~cóng~จาก~From~➡️|聪明~cōng ming~ฉลาด~Clever~💡
sa|洒水~sǎ shuǐ~พรมน้ำ~Sprinkle water~💧|撒种~sā zhǒng~หว่านเมล็ด~Sow seeds~🌱
se|颜色~yán sè~สี~Colour~🎨|色彩~sè cǎi~สีสัน~Colours~🌈
si|四~sì~สี่~Four~4️⃣|思考~sī kǎo~คิด~Think~💭
su|速度~sù dù~ความเร็ว~Speed~🏃|苏醒~sū xǐng~ฟื้นตื่น~Wake up~🌅
sai|比赛~bǐ sài~แข่งขัน~Competition~🏆|塞子~sāi zi~จุก~Stopper~🫙
sao|扫地~sǎo dì~กวาดพื้น~Sweep~🧹|扫把~sào ba~ไม้กวาด~Broom~🧹
sou|搜索~sōu suǒ~ค้นหา~Search~🔍|搜集~sōu jí~รวบรวม~Collect~📚
san|三~sān~สาม~Three~3️⃣|雨伞~yǔ sǎn~ร่ม~Umbrella~☂️
sen|森林~sēn lín~ป่า~Forest~🌳|森严~sēn yán~เคร่งครัด~Strict~🚧
sang|桑树~sāng shù~ต้นหม่อน~Mulberry tree~🌳|嗓子~sǎng zi~ลำคอ~Throat~🗣️
seng|僧人~sēng rén~พระสงฆ์~Monk~🧘|僧侣~sēng lǚ~นักบวช~Monk~🪷
song|送~sòng~ส่ง / มอบ~Send~🎁|松树~sōng shù~ต้นสน~Pine tree~🌲
`.trim();

export const examples:Record<string,PinyinExample[]>={};
for(const row of source.split('\n')){const [syllable,...words]=row.split('|');examples[syllable]=words.map(w=>{const [hanzi,pinyin,th,en,icon]=w.split('~');return {hanzi,pinyin,th,en,icon}})}
export const rareSyllables=new Set(['den','nou','pou','cen','zhei','shei','nei','dei','zei','ne','fo','me']);
export function blend(initial:Initial,final:Final):string|null{
 // j/q/x combine with ü, written u without dots. Back u is NOT an alternative sound.
 const base=initial+(['j','q','x'].includes(initial)&&final==='ü'?'u':final);
 if(['j','q','x'].includes(initial)&&final==='u')return null;
 return examples[base]?base:null;
}
const toneMarks:Record<string,string[]>={a:['ā','á','ǎ','à'],o:['ō','ó','ǒ','ò'],e:['ē','é','ě','è'],i:['ī','í','ǐ','ì'],u:['ū','ú','ǔ','ù'],ü:['ǖ','ǘ','ǚ','ǜ']};
export function markTone(syllable:string,tone:Tone){let index=syllable.indexOf('a');if(index<0)index=syllable.indexOf('e');if(index<0&&syllable.includes('ou'))index=syllable.indexOf('o');if(index<0){for(let i=syllable.length-1;i>=0;i--)if(toneMarks[syllable[i]]){index=i;break}}return index<0?syllable:syllable.slice(0,index)+toneMarks[syllable[index]][tone-1]+syllable.slice(index+1)}
export function barePinyin(marked:string){return marked.normalize('NFD').replace(/[\u0300\u0301\u0304\u030c]/g,'').normalize('NFC')}
