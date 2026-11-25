export type KindergartenPart2Category = "food" | "places" | "colors_shapes" | "numbers_counting" | "good_habits";
export interface KindergartenPart2Word {
  id: string; grade: 'K'; category: KindergartenPart2Category;
  hanzi: string; pinyin: string; meaning_th: string; meaning_en: string;
  sentences: {hanzi:string; pinyin:string; meaning_th:string; meaning_en:string}[];
  memory_tip_th:string; memory_tip_en:string; moral_lesson_th:string;
  illustration:{scene:string; animation:string};
}
type Row = [string,string,string,string,string,string,string,string,string,string,string,string,string];
function make(category: KindergartenPart2Category, unit:number, rows: Row[]): KindergartenPart2Word[] {
  return rows.map(([hanzi,pinyin,meaning_th,meaning_en,h,p,th,en,memory_tip_th,memory_tip_en,moral_lesson_th,scene,animation],i)=>({
    id:'K-'+unit+'-'+String(i+1).padStart(2,'0'), grade:'K', category,
    hanzi,pinyin,meaning_th,meaning_en,
    sentences:[
      {hanzi:h,pinyin:p,meaning_th:th,meaning_en:en},
      {hanzi:'我会读“'+hanzi+'”。',pinyin:'Wǒ huì dú “'+pinyin+'”.',meaning_th:'ฉันอ่านคำว่า '+hanzi+' ได้',meaning_en:'I can read “'+hanzi+'”.'}
    ],
    memory_tip_th,memory_tip_en,moral_lesson_th,illustration:{scene,animation}
  }));
}
export const kindergartenPart2Categories = [
  {
    "id": "food",
    "unit": 6,
    "title_th": "อาหารและเครื่องดื่ม",
    "title_en": "Food & Drinks",
    "icon": "🍚"
  },
  {
    "id": "places",
    "unit": 7,
    "title_th": "สถานที่รอบตัว",
    "title_en": "Places",
    "icon": "🏫"
  },
  {
    "id": "colors_shapes",
    "unit": 8,
    "title_th": "สีและรูปร่าง",
    "title_en": "Colors & Shapes",
    "icon": "🎨"
  },
  {
    "id": "numbers_counting",
    "unit": 9,
    "title_th": "ตัวเลขและการนับ",
    "title_en": "Numbers & Counting",
    "icon": "🔢"
  },
  {
    "id": "good_habits",
    "unit": 10,
    "title_th": "คำสุภาพและนิสัยดี",
    "title_en": "Polite Words & Good Habits",
    "icon": "🤝"
  }
] as const;

export const kindergartenFoodDrinks = make("food", 6, [
  ["米饭","mǐfàn","ข้าวสวย","Cooked rice","我吃米饭。","Wǒ chī mǐfàn.","ฉันกินข้าว","I eat rice.","米 คือเมล็ดข้าว 饭 คืออาหารที่หุงแล้ว","米 means rice grain; 饭 is cooked food.","กินข้าวให้พอดี ไม่ทิ้งอาหาร","rice-bowl","steam"],
  ["面条","miàntiáo","บะหมี่","Noodles","面条很长。","Miàntiáo hěn cháng.","บะหมี่เส้นยาว","The noodles are long.","条 ชวนให้นึกถึงเส้นยาว","条 suggests a long strip.","กินอาหารอย่างระมัดระวัง","noodles","slurp"],
  ["面包","miànbāo","ขนมปัง","Bread","我吃面包。","Wǒ chī miànbāo.","ฉันกินขนมปัง","I eat bread.","面 เกี่ยวกับแป้ง 包 คือห่อ","面 refers to flour; 包 means wrap.","แบ่งขนมให้เพื่อน","bread","slice"],
  ["鸡蛋","jīdàn","ไข่ไก่","Egg","鸡蛋是圆的。","Jīdàn shì yuán de.","ไข่ไก่มีรูปทรงมน","An egg is rounded.","鸡 คือไก่ 蛋 คือไข่","鸡 means chicken; 蛋 means egg.","ให้ผู้ใหญ่ช่วยปรุงไข่","egg","crack"],
  ["牛奶","niúnǎi","นมวัว","Milk","我喝牛奶。","Wǒ hē niúnǎi.","ฉันดื่มนมวัว","I drink milk.","牛 คือวัว 奶 คือนม","牛 means cow; 奶 means milk.","รู้จักขอบคุณผู้เตรียมอาหาร","milk","pour"],
  ["水","shuǐ","น้ำ","Water","我喝水。","Wǒ hē shuǐ.","ฉันดื่มน้ำ","I drink water.","นึกถึงน้ำที่ไหล","Picture flowing water.","ดื่มน้ำสะอาด","water","pour"],
  ["果汁","guǒzhī","น้ำผลไม้","Fruit juice","果汁很甜。","Guǒzhī hěn tián.","น้ำผลไม้หวาน","The juice is sweet.","果 คือผลไม้ 汁 คือน้ำคั้น","果 means fruit; 汁 means juice.","ดื่มในปริมาณพอดี","juice","pour"],
  ["汤","tāng","ซุป","Soup","汤很热。","Tāng hěn rè.","ซุปร้อน","The soup is hot.","氵 ชวนให้นึกถึงของเหลว","氵 suggests liquid.","รอให้อาหารเย็นก่อนกิน","soup","steam"],
  ["蔬菜","shūcài","ผัก","Vegetables","我吃蔬菜。","Wǒ chī shūcài.","ฉันกินผัก","I eat vegetables.","艹 ในทั้งสองตัวเกี่ยวกับพืช","艹 in both characters relates to plants.","กินอาหารหลากหลาย","vegetables","grow"],
  ["肉","ròu","เนื้อสัตว์","Meat","爸爸煮肉。","Bàba zhǔ ròu.","พ่อปรุงเนื้อ","Dad cooks meat.","นึกถึงเนื้อในจาน","Picture meat on a plate.","กินอาหารที่ปรุงสุก","meat","plate"],
  ["鱼肉","yúròu","เนื้อปลา","Fish meat","鱼肉很好吃。","Yúròu hěn hǎochī.","เนื้อปลาอร่อย","Fish is delicious.","鱼 คือปลา 肉 คือเนื้อ","鱼 means fish; 肉 means meat.","ให้ผู้ใหญ่ช่วยเอาก้างออก","fish-meat","serve"],
  ["鸡肉","jīròu","เนื้อไก่","Chicken meat","妈妈煮鸡肉。","Māma zhǔ jīròu.","แม่ปรุงเนื้อไก่","Mom cooks chicken.","鸡 คือไก่ 肉 คือเนื้อ","鸡 means chicken; 肉 means meat.","ขอบคุณคนทำอาหาร","chicken-meat","serve"],
  ["饺子","jiǎozi","เกี๊ยว","Dumplings","我吃饺子。","Wǒ chī jiǎozi.","ฉันกินเกี๊ยว","I eat dumplings.","饣 เกี่ยวกับอาหาร","饣 relates to food.","ช่วยจัดโต๊ะอาหาร","dumpling","fold"],
  ["包子","bāozi","ซาลาเปา","Steamed bun","包子很香。","Bāozi hěn xiāng.","ซาลาเปาหอม","The bun smells nice.","包 คือห่อ ลองนึกถึงไส้ในแป้ง","包 means wrap; picture filling inside dough.","แบ่งปันอาหาร","bun","steam"],
  ["蛋糕","dàngāo","เค้ก","Cake","生日吃蛋糕。","Shēngrì chī dàngāo.","วันเกิดกินเค้ก","We eat cake on birthdays.","蛋 คือไข่ 糕 คือขนมเค้ก","蛋 means egg; 糕 means cake.","ฉลองอย่างมีน้ำใจ","cake","candle-glow"],
  ["饼干","bǐnggān","คุกกี้ / บิสกิต","Biscuit","饼干很脆。","Bǐnggān hěn cuì.","บิสกิตกรอบ","The biscuit is crunchy.","饣 เกี่ยวกับอาหาร 干 คือแห้ง","饣 relates to food; 干 means dry.","เก็บขนมให้เรียบร้อย","biscuit","crunch"],
  ["冰淇淋","bīngqílín","ไอศกรีม","Ice cream","冰淇淋很冷。","Bīngqílín hěn lěng.","ไอศกรีมเย็น","Ice cream is cold.","冰 คือน้ำแข็ง","冰 means ice.","กินขนมหวานอย่างพอดี","ice-cream","melt"],
  ["巧克力","qiǎokèlì","ช็อกโกแลต","Chocolate","我喜欢巧克力。","Wǒ xǐhuan qiǎokèlì.","ฉันชอบช็อกโกแลต","I like chocolate.","คำนี้ออกเสียงคล้าย chocolate","This is a sound-based loanword.","แบ่งขนมและดูแลฟัน","chocolate","unwrap"],
  ["奶酪","nǎilào","ชีส","Cheese","奶酪是奶做的。","Nǎilào shì nǎi zuò de.","ชีสทำจากนม","Cheese is made from milk.","奶 คือนม 酪 คือผลิตภัณฑ์จากนม","奶 means milk; 酪 refers to dairy products.","ลองอาหารใหม่อย่างปลอดภัย","cheese","slice"],
  ["蜂蜜","fēngmì","น้ำผึ้ง","Honey","蜂蜜很甜。","Fēngmì hěn tián.","น้ำผึ้งหวาน","Honey is sweet.","蜂 คือผึ้ง 蜜 คือน้ำหวาน","蜂 means bee; 蜜 means honey.","เคารพผึ้งและดอกไม้","honey","drip"]
]);

export const kindergartenPlaces = make("places", 7, [
  ["家","jiā","บ้าน","Home","我回家了。","Wǒ huí jiā le.","ฉันกลับบ้านแล้ว","I am home.","宀 ชวนให้นึกถึงหลังคาบ้าน","宀 suggests a roof.","ช่วยดูแลบ้าน","home","door-open"],
  ["学校","xuéxiào","โรงเรียน","School","我去学校。","Wǒ qù xuéxiào.","ฉันไปโรงเรียน","I go to school.","学 คือเรียน 校 คือโรงเรียน","学 means learn; 校 means school.","ตั้งใจเรียน","school","bell"],
  ["教室","jiàoshì","ห้องเรียน","Classroom","教室很干净。","Jiàoshì hěn gānjìng.","ห้องเรียนสะอาด","The classroom is clean.","教 คือสอน 室 คือห้อง","教 means teach; 室 means room.","รักษาความสะอาดห้องเรียน","classroom","chalk"],
  ["公园","gōngyuán","สวนสาธารณะ","Park","我去公园玩。","Wǒ qù gōngyuán wán.","ฉันไปเล่นที่สวน","I play at the park.","园 คือสวนที่มีขอบล้อม","园 means a garden or enclosed park.","ไม่ทิ้งขยะ","park","swing"],
  ["医院","yīyuàn","โรงพยาบาล","Hospital","妈妈去医院。","Māma qù yīyuàn.","แม่ไปโรงพยาบาล","Mom goes to the hospital.","医 เกี่ยวกับการรักษา","医 relates to medical care.","บอกผู้ใหญ่เมื่อไม่สบาย","hospital","ambulance"],
  ["超市","chāoshì","ซูเปอร์มาร์เก็ต","Supermarket","我去超市买菜。","Wǒ qù chāoshì mǎi cài.","ฉันไปซื้อผักที่ซูเปอร์มาร์เก็ต","I buy vegetables at the supermarket.","市 คือตลาด","市 means market.","เดินกับผู้ใหญ่ในที่คนเยอะ","supermarket","cart"],
  ["商店","shāngdiàn","ร้านค้า","Shop","商店有面包。","Shāngdiàn yǒu miànbāo.","ร้านค้ามีขนมปัง","The shop has bread.","商 เกี่ยวกับการค้า 店 คือร้าน","商 relates to trade; 店 means shop.","ซื้อของอย่างพอดี","shop","door-open"],
  ["图书馆","túshūguǎn","ห้องสมุด","Library","我去图书馆看书。","Wǒ qù túshūguǎn kàn shū.","ฉันไปอ่านหนังสือที่ห้องสมุด","I read at the library.","书 คือหนังสือ 馆 คือสถานที่","书 means book; 馆 means a venue.","พูดเบา ๆ ในห้องสมุด","library","book-open"],
  ["动物园","dòngwùyuán","สวนสัตว์","Zoo","动物园有熊猫。","Dòngwùyuán yǒu xióngmāo.","สวนสัตว์มีแพนด้า","The zoo has pandas.","动物 คือสัตว์ 园 คือสวน","动物 means animal; 园 means park.","เคารพกฎการชมสัตว์","zoo","panda-wave"],
  ["海滩","hǎitān","ชายหาด","Beach","我在海滩玩。","Wǒ zài hǎitān wán.","ฉันเล่นที่ชายหาด","I play at the beach.","海 คือทะเล 滩 คือชายฝั่ง","海 means sea; 滩 means shore.","เล่นน้ำกับผู้ใหญ่","beach","waves"],
  ["游乐场","yóulèchǎng","สนามเด็กเล่น","Playground","我去游乐场。","Wǒ qù yóulèchǎng.","ฉันไปสนามเด็กเล่น","I go to the playground.","游乐 คือเล่นสนุก 场 คือพื้นที่","游乐 means recreation; 场 means place.","รอคิวและเล่นอย่างปลอดภัย","playground","slide"],
  ["餐厅","cāntīng","ร้านอาหาร","Restaurant","我们去餐厅吃饭。","Wǒmen qù cāntīng chīfàn.","เราไปกินข้าวที่ร้านอาหาร","We eat at the restaurant.","餐 คือมื้ออาหาร 厅 คือห้อง","餐 means meal; 厅 means hall.","มีมารยาทบนโต๊ะอาหาร","restaurant","serve"],
  ["机场","jīchǎng","สนามบิน","Airport","机场有飞机。","Jīchǎng yǒu fēijī.","สนามบินมีเครื่องบิน","The airport has planes.","机 คือเครื่อง 场 คือพื้นที่","机 means machine; 场 means place.","อยู่กับผู้ปกครองขณะเดินทาง","airport","plane-takeoff"],
  ["火车站","huǒchēzhàn","สถานีรถไฟ","Train station","火车站有火车。","Huǒchēzhàn yǒu huǒchē.","สถานีรถไฟมีรถไฟ","The station has trains.","火车 คือรถไฟ 站 คือสถานี","火车 means train; 站 means station.","รอหลังเส้นปลอดภัย","train-station","train-arrive"],
  ["银行","yínháng","ธนาคาร","Bank","爸爸去银行。","Bàba qù yínháng.","พ่อไปธนาคาร","Dad goes to the bank.","银 เกี่ยวกับเงิน 行 หมายถึงกิจการในคำนี้","银 relates to money; 行 means business here.","รู้จักออมเงิน","bank","coins"],
  ["邮局","yóujú","ที่ทำการไปรษณีย์","Post office","我去邮局寄信。","Wǒ qù yóujú jì xìn.","ฉันไปส่งจดหมายที่ไปรษณีย์","I mail a letter at the post office.","邮 เกี่ยวกับไปรษณีย์ 局 คือสำนักงาน","邮 relates to mail; 局 means office.","ส่งคำทักทายให้คนที่รัก","post-office","mail-letter"],
  ["警察局","jǐngchájú","สถานีตำรวจ","Police station","警察在警察局工作。","Jǐngchá zài jǐngchájú gōngzuò.","ตำรวจทำงานที่สถานีตำรวจ","Police work at the station.","警察 คือตำรวจ 局 คือสำนักงาน","警察 means police; 局 means office.","ขอความช่วยเหลือจากผู้ใหญ่ที่ไว้ใจ","police-station","police-wave"],
  ["消防局","xiāofángjú","สถานีดับเพลิง","Fire station","消防局有消防车。","Xiāofángjú yǒu xiāofángchē.","สถานีดับเพลิงมีรถดับเพลิง","The fire station has fire engines.","消防 คือการป้องกันและดับไฟ","消防 means fire protection.","ไม่เล่นกับไฟ","fire-station","truck-roll"],
  ["博物馆","bówùguǎn","พิพิธภัณฑ์","Museum","博物馆有很多东西。","Bówùguǎn yǒu hěn duō dōngxi.","พิพิธภัณฑ์มีสิ่งของมากมาย","The museum has many things.","物 คือสิ่งของ 馆 คือสถานที่","物 means object; 馆 means venue.","ชมสิ่งจัดแสดงโดยไม่แตะ","museum","display"],
  ["电影院","diànyǐngyuàn","โรงภาพยนตร์","Cinema","我们去电影院。","Wǒmen qù diànyǐngyuàn.","เราไปโรงภาพยนตร์","We go to the cinema.","电影 คือภาพยนตร์ 院 คือสถานที่","电影 means movie; 院 means venue.","ไม่ส่งเสียงรบกวนคนอื่น","cinema","screen-light"]
]);

export const kindergartenColorsShapes = make("colors_shapes", 8, [
  ["红色","hóngsè","สีแดง","Red","苹果是红色的。","Píngguǒ shì hóngsè de.","แอปเปิลสีแดง","The apple is red.","色 คือสี ลองนึกถึงแอปเปิลแดง","色 means colour; picture a red apple.","ชื่นชมสีสันของธรรมชาติ","red","color-fill"],
  ["蓝色","lánsè","สีน้ำเงิน","Blue","天空是蓝色的。","Tiānkōng shì lánsè de.","ท้องฟ้าสีน้ำเงิน","The sky is blue.","นึกถึงฟ้าใส","Picture a clear blue sky.","ดูแลสิ่งแวดล้อม","blue","color-fill"],
  ["黄色","huángsè","สีเหลือง","Yellow","香蕉是黄色的。","Xiāngjiāo shì huángsè de.","กล้วยสีเหลือง","The banana is yellow.","นึกถึงกล้วยสุก","Picture a ripe banana.","สังเกตสิ่งรอบตัว","yellow","color-fill"],
  ["绿色","lǜsè","สีเขียว","Green","叶子是绿色的。","Yèzi shì lǜsè de.","ใบไม้สีเขียว","The leaf is green.","นึกถึงใบไม้","Picture a green leaf.","ดูแลต้นไม้","green","color-fill"],
  ["橙色","chéngsè","สีส้ม","Orange","橙子是橙色的。","Chéngzi shì chéngsè de.","ส้มมีสีส้ม","The orange is orange.","橙 คือส้ม","橙 means orange.","กินผลไม้หลากหลาย","orange-color","color-fill"],
  ["紫色","zǐsè","สีม่วง","Purple","葡萄是紫色的。","Pútao shì zǐsè de.","องุ่นสีม่วง","The grapes are purple.","นึกถึงองุ่นม่วง","Picture purple grapes.","ยอมรับความชอบต่างกัน","purple","color-fill"],
  ["粉色","fěnsè","สีชมพู","Pink","花是粉色的。","Huā shì fěnsè de.","ดอกไม้สีชมพู","The flower is pink.","นึกถึงดอกไม้สีชมพูอ่อน","Picture a pink flower.","อ่อนโยนต่อผู้อื่น","pink","color-fill"],
  ["黑色","hēisè","สีดำ","Black","熊猫有黑色的毛。","Xióngmāo yǒu hēisè de máo.","แพนด้ามีขนสีดำ","Pandas have black fur.","นึกถึงหูแพนด้าสีดำ","Picture a panda's black ears.","เคารพความแตกต่าง","black","color-fill"],
  ["白色","báisè","สีขาว","White","云是白色的。","Yún shì báisè de.","เมฆสีขาว","Clouds are white.","นึกถึงเมฆขาว","Picture white clouds.","รักษาความสะอาด","white","color-fill"],
  ["棕色","zōngsè","สีน้ำตาล","Brown","树干是棕色的。","Shùgàn shì zōngsè de.","ลำต้นสีน้ำตาล","The trunk is brown.","นึกถึงเปลือกต้นไม้","Picture tree bark.","รักต้นไม้","brown","color-fill"],
  ["灰色","huīsè","สีเทา","Grey","大象是灰色的。","Dàxiàng shì huīsè de.","ช้างสีเทา","The elephant is grey.","灰 คือเถ้า ช่วยจำสีเทา","灰 means ash, a colour clue.","รักสัตว์","grey","color-fill"],
  ["金色","jīnsè","สีทอง","Gold","星星像金色的。","Xīngxing xiàng jīnsè de.","ดาวดูคล้ายสีทอง","The star looks golden.","金 คือทอง","金 means gold.","มีความสุขกับสิ่งเล็ก ๆ","gold","sparkle"],
  ["圆形","yuánxíng","วงกลม","Circle","球的图案是圆形。","Qiú de tú’àn shì yuánxíng.","ลวดลายลูกบอลเป็นวงกลม","The ball's pattern is circular.","圆 คือกลม 形 คือรูปร่าง","圆 means round; 形 means shape.","ฝึกสังเกตรูปร่าง","circle","roll"],
  ["正方形","zhèngfāngxíng","สี่เหลี่ยมจัตุรัส","Square","纸是正方形的。","Zhǐ shì zhèngfāngxíng de.","กระดาษเป็นสี่เหลี่ยมจัตุรัส","The paper is square.","มีสี่ด้านยาวเท่ากัน","It has four equal sides.","จัดของเป็นระเบียบ","square","rotate"],
  ["三角形","sānjiǎoxíng","สามเหลี่ยม","Triangle","屋顶像三角形。","Wūdǐng xiàng sānjiǎoxíng.","หลังคาคล้ายสามเหลี่ยม","The roof looks like a triangle.","三 คือสาม 角 คือมุม","三 means three; 角 means corner.","ฝึกนับมุม","triangle","rotate"],
  ["长方形","chángfāngxíng","สี่เหลี่ยมผืนผ้า","Rectangle","书是长方形的。","Shū shì chángfāngxíng de.","หนังสือเป็นสี่เหลี่ยมผืนผ้า","The book is rectangular.","长 คือยาว 方 คือสี่เหลี่ยม","长 means long; 方 suggests a four-sided shape.","ดูแลหนังสือ","rectangle","stretch"],
  ["心形","xīnxíng","รูปหัวใจ","Heart shape","我画一个心形。","Wǒ huà yí ge xīnxíng.","ฉันวาดรูปหัวใจ","I draw a heart.","心 คือหัวใจ 形 คือรูปทรง","心 means heart; 形 means shape.","แสดงน้ำใจ","heart","pulse"],
  ["星形","xīngxíng","รูปดาว","Star shape","我画一个星形。","Wǒ huà yí ge xīngxíng.","ฉันวาดรูปดาว","I draw a star shape.","星 คือดาว 形 คือรูปทรง","星 means star; 形 means shape.","ชื่นชมผลงานเพื่อน","star","twinkle"],
  ["大小","dàxiǎo","ขนาด / ใหญ่เล็ก","Size","两个球的大小不同。","Liǎng ge qiú de dàxiǎo bùtóng.","ลูกบอลสองลูกขนาดต่างกัน","The balls differ in size.","大 คือใหญ่ 小 คือเล็ก","大 means big; 小 means small.","ทุกขนาดมีคุณค่า","size","scale"],
  ["长短","chángduǎn","ความยาว / ยาวสั้น","Length","我们比较绳子的长短。","Wǒmen bǐjiào shéngzi de chángduǎn.","เราเปรียบเทียบความยาวเชือก","We compare the ropes' lengths.","长 คือยาว 短 คือสั้น","长 means long; 短 means short.","เรียนรู้จากการเปรียบเทียบ","length","compare"]
]);

export const kindergartenNumbersCounting = make("numbers_counting", 9, [
  ["一","yī","หนึ่ง","One","我有一个球。","Wǒ yǒu yí ge qiú.","ฉันมีลูกบอลหนึ่งลูก","I have one ball.","一 มีขีดเดียว","一 has one stroke.","นับอย่างตั้งใจ","count-one","count"],
  ["二","èr","สอง","Two","一加一等于二。","Yī jiā yī děngyú èr.","หนึ่งบวกหนึ่งเท่ากับสอง","One plus one equals two.","二 มีสองขีด","二 has two strokes.","แบ่งปันของกับเพื่อน","count-two","count"],
  ["三","sān","สาม","Three","我有三个苹果。","Wǒ yǒu sān ge píngguǒ.","ฉันมีแอปเปิลสามลูก","I have three apples.","三 มีสามขีด","三 has three strokes.","ฝึกนับทีละลูก","count-three","count"],
  ["四","sì","สี่","Four","桌子有四条腿。","Zhuōzi yǒu sì tiáo tuǐ.","โต๊ะมีสี่ขา","The table has four legs.","นึกถึงโต๊ะสี่ขา","Picture four table legs.","จัดโต๊ะให้เรียบร้อย","count-four","count"],
  ["五","wǔ","ห้า","Five","一只手有五根手指。","Yì zhī shǒu yǒu wǔ gēn shǒuzhǐ.","มือหนึ่งข้างมีห้านิ้ว","One hand has five fingers.","นับนิ้วมือหนึ่งข้าง","Count the fingers on one hand.","ล้างมือเสมอ","count-five","count"],
  ["六","liù","หก","Six","我有六支笔。","Wǒ yǒu liù zhī bǐ.","ฉันมีปากกาหกด้าม","I have six pens.","นับหกจุดบนลูกเต๋า","Picture six dots on a die.","ดูแลเครื่องเขียน","count-six","count"],
  ["七","qī","เจ็ด","Seven","一周有七天。","Yì zhōu yǒu qī tiān.","หนึ่งสัปดาห์มีเจ็ดวัน","A week has seven days.","นึกถึงเจ็ดวันในสัปดาห์","Remember seven days in a week.","ใช้เวลาอย่างมีประโยชน์","count-seven","count"],
  ["八","bā","แปด","Eight","章鱼有八条腕。","Zhāngyú yǒu bā tiáo wàn.","หมึกสายมีแขนแปดแขน","An octopus has eight arms.","八 มีขีดแยกออกสองข้าง","八 has two diverging strokes.","ช่างสังเกต","count-eight","count"],
  ["九","jiǔ","เก้า","Nine","这里有九个球。","Zhèlǐ yǒu jiǔ ge qiú.","ตรงนี้มีลูกบอลเก้าลูก","There are nine balls here.","เก้าอยู่ก่อนสิบ","Nine comes before ten.","ฝึกนับจนจบ","count-nine","count"],
  ["十","shí","สิบ","Ten","两只手有十根手指。","Liǎng zhī shǒu yǒu shí gēn shǒuzhǐ.","มือสองข้างมีสิบนิ้ว","Two hands have ten fingers.","十 มีขีดตัดกัน","十 has crossing strokes.","เรียนรู้ด้วยใจสนุก","count-ten","count"],
  ["零","líng","ศูนย์","Zero","盒子里有零个球。","Hézi li yǒu líng ge qiú.","ในกล่องมีลูกบอลศูนย์ลูก","There are zero balls in the box.","ศูนย์หมายถึงไม่มีจำนวน","Zero means none.","เข้าใจว่าศูนย์ก็สำคัญ","count-zero","empty-box"],
  ["百","bǎi","ร้อย","Hundred","一百就是十个十。","Yì bǎi jiù shì shí ge shí.","หนึ่งร้อยคือสิบกลุ่มของสิบ","One hundred is ten tens.","百 คือหนึ่งหน่วยร้อย","百 means a hundred.","ฝึกนับเป็นกลุ่ม","count-hundred","group"],
  ["第一","dìyī","ที่หนึ่ง","First","我排在第一。","Wǒ pái zài dìyī.","ฉันอยู่ลำดับแรก","I am first in line.","第 ใช้บอกลำดับ","第 marks an ordinal.","ไม่แย่งคิว","ordinal-first","first-place"],
  ["第二","dì’èr","ที่สอง","Second","他排在第二。","Tā pái zài dì’èr.","เขาอยู่ลำดับสอง","He is second in line.","第 บอกลำดับ 二 คือสอง","第 marks order; 二 means two.","รอคิวอย่างสุภาพ","ordinal-second","second-place"],
  ["多少","duōshao","เท่าไร / กี่","How many","你有多少本书？","Nǐ yǒu duōshao běn shū?","คุณมีหนังสือกี่เล่ม","How many books do you have?","多 คือมาก 少 คือน้อย","多 means many; 少 means few.","กล้าถามเมื่อสงสัย","how-many","question"],
  ["几个","jǐ ge","กี่อัน / กี่คน","How many","你有几个苹果？","Nǐ yǒu jǐ ge píngguǒ?","คุณมีแอปเปิลกี่ลูก","How many apples do you have?","几 ใช้ถามจำนวน 个 เป็นลักษณนาม","几 asks number; 个 is a measure word.","ฝึกถามและนับ","count-question","question"],
  ["一半","yíbàn","ครึ่งหนึ่ง","Half","我给你一半。","Wǒ gěi nǐ yíbàn.","ฉันให้คุณครึ่งหนึ่ง","I give you half.","半 คือครึ่ง","半 means half.","แบ่งปันอย่างยุติธรรม","half","split"],
  ["全部","quánbù","ทั้งหมด","All","我把全部积木收好。","Wǒ bǎ quánbù jīmù shōu hǎo.","ฉันเก็บบล็อกทั้งหมดเรียบร้อย","I put all the blocks away.","全 คือทั้งหมด","全 means whole or all.","เก็บของให้ครบ","all","collect"],
  ["加","jiā","บวก / เพิ่ม","Add","一加二等于三。","Yī jiā èr děngyú sān.","หนึ่งบวกสองเท่ากับสาม","One plus two equals three.","加 คือเพิ่มเข้าด้วยกัน","加 means add.","นับอย่างรอบคอบ","addition","combine"],
  ["减","jiǎn","ลบ / ลด","Subtract","三减一等于二。","Sān jiǎn yī děngyú èr.","สามลบหนึ่งเท่ากับสอง","Three minus one equals two.","减 คือเอาออกให้น้อยลง","减 means reduce or subtract.","ค่อย ๆ แก้โจทย์","subtraction","remove"]
]);

export const kindergartenGoodHabits = make("good_habits", 10, [
  ["你好","nǐ hǎo","สวัสดี","Hello","老师，你好！","Lǎoshī, nǐ hǎo!","สวัสดีคุณครู","Hello, teacher!","你 คือคุณ 好 คือดี","你 means you; 好 means good.","ทักทายด้วยรอยยิ้ม","greeting","wave"],
  ["谢谢","xièxie","ขอบคุณ","Thank you","谢谢妈妈。","Xièxie māma.","ขอบคุณคุณแม่","Thank you, Mom.","谢 เกี่ยวกับการขอบคุณ","谢 expresses thanks.","ขอบคุณเมื่อได้รับความช่วยเหลือ","thanks","bow"],
  ["不客气","bú kèqi","ไม่เป็นไร / ยินดี","You're welcome","不用谢，不客气。","Bú yòng xiè, bú kèqi.","ไม่ต้องขอบคุณ ยินดีจ้ะ","No need to thank me; you're welcome.","客气 คือเกรงใจหรือสุภาพ","客气 refers to politeness.","ช่วยผู้อื่นด้วยใจ","welcome","smile"],
  ["请","qǐng","กรุณา / เชิญ","Please","请坐这里。","Qǐng zuò zhèlǐ.","เชิญนั่งตรงนี้","Please sit here.","讠 เกี่ยวกับคำพูด","讠 relates to speech.","ขอสิ่งต่าง ๆ อย่างสุภาพ","please","offer-seat"],
  ["对不起","duìbuqǐ","ขอโทษ","Sorry","对不起，我迟到了。","Duìbuqǐ, wǒ chídào le.","ขอโทษ ฉันมาสาย","Sorry, I am late.","ใช้เมื่อเราทำผิดพลาด","Use it when apologising.","กล้ายอมรับความผิด","sorry","bow"],
  ["没关系","méi guānxi","ไม่เป็นไร","It's okay","没关系，慢慢来。","Méi guānxi, mànmàn lái.","ไม่เป็นไร ค่อย ๆ ทำ","It's okay, take your time.","ใช้ปลอบใจเมื่อคนอื่นขอโทษ","Use it to reassure someone.","ให้อภัยและให้โอกาส","forgive","smile"],
  ["早上好","zǎoshang hǎo","อรุณสวัสดิ์","Good morning","爸爸，早上好！","Bàba, zǎoshang hǎo!","อรุณสวัสดิ์คุณพ่อ","Good morning, Dad!","早 คือเช้า","早 means early.","เริ่มวันด้วยคำพูดดี ๆ","morning","sunrise"],
  ["晚安","wǎn’ān","ราตรีสวัสดิ์","Good night","妈妈，晚安！","Māma, wǎn’ān!","ราตรีสวัสดิ์คุณแม่","Good night, Mom!","晚 คือค่ำ 安 คือสงบ","晚 means evening; 安 means peace.","พักผ่อนให้เพียงพอ","good-night","moon"],
  ["再见","zàijiàn","ลาก่อน / แล้วพบกัน","Goodbye","朋友，再见！","Péngyou, zàijiàn!","แล้วพบกันนะเพื่อน","Goodbye, friend!","再 คืออีกครั้ง 见 คือพบ","再 means again; 见 means see.","กล่าวลาก่อนจากกัน","goodbye","wave"],
  ["帮忙","bāngmáng","ช่วยเหลือ","Help","我来帮忙。","Wǒ lái bāngmáng.","ฉันมาช่วย","I'll help.","帮 คือช่วย","帮 means help.","มีน้ำใจ","help","carry"],
  ["分享","fēnxiǎng","แบ่งปัน","Share","我和朋友分享玩具。","Wǒ hé péngyou fēnxiǎng wánjù.","ฉันแบ่งของเล่นกับเพื่อน","I share toys with friends.","分 คือแบ่ง","分 means divide or share.","แบ่งปันอย่างเต็มใจ","share","pass-toy"],
  ["排队","páiduì","เข้าแถว","Queue","我们排队等候。","Wǒmen páiduì děnghòu.","เราเข้าแถวรอ","We queue and wait.","排 คือเรียง 队 คือแถว","排 means arrange; 队 means line.","ไม่แซงคิว","queue","line-up"],
  ["洗手","xǐshǒu","ล้างมือ","Wash hands","吃饭前要洗手。","Chīfàn qián yào xǐshǒu.","ก่อนกินข้าวต้องล้างมือ","Wash hands before eating.","洗 คือล้าง 手 คือมือ","洗 means wash; 手 means hand.","รักษาความสะอาด","wash-hands","soap-bubbles"],
  ["刷牙","shuāyá","แปรงฟัน","Brush teeth","我每天刷牙。","Wǒ měitiān shuāyá.","ฉันแปรงฟันทุกวัน","I brush my teeth daily.","刷 คือแปรง 牙 คือฟัน","刷 means brush; 牙 means teeth.","ดูแลฟันทุกวัน","brush-teeth","brush"],
  ["睡觉","shuìjiào","นอนหลับ","Sleep","宝宝去睡觉。","Bǎobao qù shuìjiào.","เด็กน้อยไปนอน","Baby goes to sleep.","睡 มี 目 เกี่ยวกับตา","睡 contains 目, eye.","เข้านอนให้เป็นเวลา","sleep","rock"],
  ["读书","dúshū","อ่านหนังสือ / เรียน","Read books / study","我喜欢读书。","Wǒ xǐhuan dúshū.","ฉันชอบอ่านหนังสือ","I like reading books.","读 คืออ่าน 书 คือหนังสือ","读 means read; 书 means book.","รักการอ่าน","reading","page-turn"],
  ["听话","tīnghuà","ฟังคำแนะนำ","Listen to guidance","我听话，也会提问。","Wǒ tīnghuà, yě huì tíwèn.","ฉันฟังคำแนะนำและถามเมื่อสงสัย","I listen to guidance and ask questions.","听 คือฟัง 话 คือคำพูด","听 means listen; 话 means speech.","ฟังคำแนะนำที่ปลอดภัยและกล้าบอกเมื่อไม่สบายใจ","listen","ear-wiggle"],
  ["诚实","chéngshí","ซื่อสัตย์","Honest","我要做诚实的孩子。","Wǒ yào zuò chéngshí de háizi.","ฉันจะเป็นเด็กซื่อสัตย์","I want to be an honest child.","诚 เกี่ยวกับความจริงใจ","诚 relates to sincerity.","พูดความจริง","honesty","heart"],
  ["勇敢","yǒnggǎn","กล้าหาญ","Brave","我勇敢地说话。","Wǒ yǒnggǎn de shuōhuà.","ฉันกล้าพูด","I speak bravely.","勇 คือความกล้า","勇 means courage.","กล้าขอความช่วยเหลือ","courage","stand-tall"],
  ["礼貌","lǐmào","มารยาท","Politeness","我们要有礼貌。","Wǒmen yào yǒu lǐmào.","เราควรมีมารยาท","We should be polite.","礼 คือมารยาท 貌 คือลักษณะภายนอก","礼 means courtesy; 貌 refers to manner or appearance.","พูดและทำอย่างสุภาพ","polite","greet"]
]);

export const vocabKindergartenPart2: KindergartenPart2Word[] = [
  ...kindergartenFoodDrinks,
  ...kindergartenPlaces,
  ...kindergartenColorsShapes,
  ...kindergartenNumbersCounting,
  ...kindergartenGoodHabits
];
export function getKindergartenPart2Vocab(category: KindergartenPart2Category) {
  return vocabKindergartenPart2.filter(word=>word.category===category);
}
export default vocabKindergartenPart2;
