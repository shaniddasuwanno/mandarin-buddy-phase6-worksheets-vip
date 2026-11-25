const ts=require('typescript'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),m={exports:{}};
new Function('require','module','exports',ts.transpileModule(fs.readFileSync(path.join(root,'src/data/kidsSongs.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(require,m,m.exports);
const {kidsSongs,frequency,songTimeline}=m.exports;
assert.deepEqual(kidsSongs.map(s=>s.id),['guest','happy','birthday','mom','friends','tigers','ducks','bunny']);
assert.equal(frequency('A4'),440);assert.ok(Math.abs(frequency('C4')-261.625565)<.001);
assert.equal(kidsSongs.filter(s=>s.kind==='traditional').length,2);
let total=0;for(const s of kidsSongs){assert.ok(s.moral_value_th&&s.moral_value_en&&s.practice_title);for(const l of s.lyrics){assert.ok(l.hanzi&&l.pinyin&&l.meaning_th&&l.meaning_en);assert.equal(Array.from(l.hanzi).length,l.notes.length,s.id+': '+l.hanzi);assert.equal(l.pinyin.split(' ').length,l.notes.length,l.hanzi);for(const n of l.notes){assert.ok(n.frequency>0&&n.beats>0&&n.duration>0);assert.ok(Math.abs(n.duration-n.beats*60/s.bpm)<1e-9)}total++}const tl=songTimeline(s);assert.ok(tl.total>0);assert.equal(tl.lines.at(-1).end,tl.total);for(let i=1;i<tl.lines.length;i++)assert.equal(tl.lines[i-1].end,tl.lines[i].start);assert.ok(Math.abs(songTimeline(s,.75).total-tl.total/.75)<1e-8)}
const birthday=kidsSongs.find(s=>s.id==='birthday'),tigers=kidsSongs.find(s=>s.id==='tigers');
assert.deepEqual(birthday.lyrics[0].notes.map(n=>n.pitch),['G3','G3','A3','G3','C4','B3']);assert.deepEqual(birthday.lyrics.map(l=>l.notes.reduce((a,n)=>a+n.beats,0)),[6,6,6,6]);
assert.deepEqual(tigers.lyrics[0].notes.map(n=>n.pitch),['C4','D4','E4','C4']);assert.ok(tigers.lyrics.every(l=>l.notes.reduce((a,n)=>a+n.beats,0)===4));
console.log('PASS: '+kidsSongs.length+' song cards, '+total+' bilingual lyric lines, precise note frequencies, durations, classic melody phrases, karaoke synchronization and speed scaling.');
