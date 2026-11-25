const ts=require('typescript'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
function load(rel){const f=path.join(root,rel),m={exports:{}};const js=ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;new Function('require','module','exports',js)(require,m,m.exports);return m.exports}
const {initials,finals,blend,markTone,barePinyin,examples}=load('src/data/pinyinLab.ts');
const {toneSamples}=load('src/data/pinyinToneSamples.ts');
assert.equal(initials.length,21);assert.equal(finals.length,15);
const seen=new Set();for(const i of initials)for(const f of finals){const s=blend(i,f);if(s){assert.ok(!seen.has(s),s);seen.add(s)}}
assert.equal(seen.size,221);assert.equal(seen.size,Object.keys(examples).length);
assert.equal(blend('b','ong'),null);assert.equal(blend('b','ü'),null);assert.equal(blend('j','u'),null);assert.equal(blend('j','ü'),'ju');assert.equal(blend('q','ü'),'qu');assert.equal(blend('x','ü'),'xu');assert.equal(blend('n','ü'),'nü');
assert.deepEqual([1,2,3,4].map(t=>markTone('ba',t)),['bā','bá','bǎ','bà']);
assert.equal(markTone('nü',3),'nǚ');assert.equal(markTone('lou',2),'lóu');assert.equal(markTone('bei',1),'bēi');
let words=0,spoken=0;
for(const s of seen){const es=examples[s];assert.ok(es.length>=2&&es.length<=3,s);for(const e of es){assert.ok(e.hanzi&&e.th&&e.en&&e.icon,s);assert.ok(e.pinyin.split(' ').some(p=>barePinyin(p)===s),s+': '+e.pinyin);words++}assert.equal(toneSamples[s].length,4,s);for(let t=1;t<=4;t++){assert.equal(barePinyin(markTone(s,t)),s);if(toneSamples[s][t-1])spoken++}}
assert.deepEqual(toneSamples.ba,['八','拔','把','爸']);assert.deepEqual(toneSamples.ma,['妈','麻','马','骂']);
console.log(`PASS: ${seen.size} valid blends, ${words} matching bilingual examples, ${spoken} spoken tone samples, all four marked tones for every blend.`);
