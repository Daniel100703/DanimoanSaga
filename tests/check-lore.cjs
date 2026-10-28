const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/../';
const data=JSON.parse(fs.readFileSync(root+'lore-data.json','utf8'));
const noop=()=>{},el={addEventListener:noop,dataset:{}};
const doc={body:{dataset:{mode:'pages'}},getElementById:id=>['lore-data','book-meta','edition-migration'].includes(id)?{textContent:fs.readFileSync(root+({'lore-data':'lore-data.json','book-meta':'book.json','edition-migration':'edition-migration.json'}[id]),'utf8')}:['wiki-boundary','wiki-search','wiki-kind'].includes(id)?null:el,addEventListener:noop};
const ctx={document:doc,localStorage:{getItem:()=>null,setItem:noop},window:{},console};
// Jalankan juga dengan DANI_TEST_SHARED=1 untuk jalur data situs.
if(process.env.DANI_TEST_SHARED){
 vm.runInNewContext(fs.readFileSync(root+'reader-data.js','utf8'),ctx);
 const get=doc.getElementById;
 doc.getElementById=id=>['lore-data','book-meta','edition-migration'].includes(id)?null:get(id);
}
let source=fs.readFileSync(root+'lore.js','utf8').replace('observeReading();renderWiki();','globalThis.testAPI={card,stage,relationship,portrait,resolveEntry};');
vm.runInNewContext(source,ctx);const api=ctx.testAPI,byId=id=>data.entries.find(e=>e.id===id);
for(const e of data.entries)for(const r of e.relationships||[]){
 const now=api.relationship(e,r.key);assert(now.key<=r.key);
 const before=api.relationship(e,r.key-1);assert(!before||before.key<r.key);
}
let fu=byId('guo-fu');assert(api.card(fu,40160).includes('bab-05-pembuka.webp'));assert(!api.card(fu,40160).includes('cemburu'));assert(api.card(fu,110160).includes('bab-11-ilustrasi-03.webp'));assert(api.card(fu,110160).includes('cemburu'));assert(!api.card(fu,110160).includes('utang budi semakin berat'));
assert(api.card(fu,120172).includes('utang budi semakin berat'));
assert(!api.card(byId('xiaolongnu'),70069).includes('Guru dan kekasih'));assert(api.card(byId('xiaolongnu'),110175).includes('Cinta kuat'));assert(!api.card(byId('xiaolongnu'),110175).includes('memilih pergi'));assert(api.card(byId('xiaolongnu'),120104).includes('memilih pergi'));
assert(!api.card(byId('huodu'),50166).includes('class="portrait"'));assert(api.card(byId('huodu'),110072).includes('bab-11-ilustrasi-04.webp'));
assert(api.card(byId('wu-dunru'),110033).includes('17 tahun'));assert(api.card(byId('wu-xiuwen'),110035).includes('16 tahun'));
assert(!api.card(byId('gadis-hijau'),90133).includes('class="portrait"'));let masked=api.card(byId('gadis-hijau'),120172,true);assert(masked.includes('bab-12-ilustrasi-02.webp'));assert(!masked.includes('Cheng Ying'));assert(masked.includes('identitas belum terungkap'));
assert(api.card(byId('cheng-ying'),120172).includes('bab-02-ilustrasi-01.webp'));
let final=api.card(byId('dani'),120172,true);assert(final.includes('bab-12-ilustrasi-02.webp'));assert(final.includes('Luka berat'));assert(final.includes('bab-12.html#p-12-172'));
console.log('PASS: relationship boundaries, old/new portraits, age phases, anonymous helper, evidence links.');

const helper=byId('gadis-hijau'),cheng=byId('cheng-ying');
assert.strictEqual(api.resolveEntry(helper,130016),helper);
assert.strictEqual(api.resolveEntry(helper,130017).id,'cheng-ying');
const beforeReveal=api.card(helper,130016,true),afterReveal=api.card(helper,130017,true);
assert(beforeReveal.includes('bab-13-pembuka.webp'));assert(!beforeReveal.includes('Cheng Ying'));
assert(afterReveal.includes('Cheng Ying'));assert(afterReveal.includes('bab-13-ilustrasi-03.webp'));
assert(!afterReveal.includes('bab-02-ilustrasi-01.webp'));
assert(!api.card(byId('shagu'),130042));assert(api.card(byId('shagu'),130043).includes('Shagu'));
assert(!api.card(byId('feng-mofeng'),130088));assert(api.card(byId('feng-mofeng'),130089).includes('Feng Mofeng'));
console.log('PASS: chapter 13 reveal boundary, adult portrait, new-character introduction gates.');

// Regresi: pembaruan luka/lokasi sejak Bab 17 pernah menghilangkan tingkat dan ilmu.
const dani=byId('dani'),long=byId('xiaolongnu');
assert(api.stage(dani,170047).fields.Tingkat.startsWith('3 ·'));
assert(api.stage(dani,170048).fields.Tingkat.startsWith('4 ·'));
for(const key of [170102,180110,190191,200132]) {
 assert(api.card(dani,key).includes('4 · Grandmaster'));
 assert(api.card(dani,key).includes('Pedang Berat Xuantie'));
}
assert(api.card(dani,200132,true).includes('bab-17.html#p-17-048'));
assert(!api.stage(long,180089).fields['Ilmu yang terlihat'].includes('Seni Dua Tangan'));
assert(api.stage(long,180090).fields['Ilmu yang terlihat'].includes('Seni Dua Tangan'));
assert(api.card(long,200132).includes('4 · Grandmaster'));
assert(api.card(long,200132).includes('sangat lemah'));
assert(!api.card(long,200132,true).includes('Kedua lengan masih utuh'));
assert(api.card(byId('zhou-botong'),200132).includes('5 · Tak Tertandingi'));
assert(api.card(byId('jinlun'),190191).includes('4–5'));
assert(api.card(byId('jinlun'),190191,true).includes('jarum'));
assert(!api.card(dani,170047).includes('4 · Grandmaster'));
// Sebuah pembaruan kondisi mendatang tidak boleh menghapus tingkat atau membawa lokasi lama.
const sample={type:'tokoh',id:'contoh',stages:[
 {key:10001,title:'Contoh',summary:'',fields:{Tingkat:'4 · Grandmaster','Ilmu yang terlihat':'Pedang','Kondisi':'Sehat','Lokasi':'Makam'}},
 {key:10002,title:'Contoh',summary:'',fields:{Kondisi:'Terluka'}}
]};
assert.strictEqual(api.stage(sample,10002).fields.Tingkat,'4 · Grandmaster');
assert.strictEqual(api.stage(sample,10002).fields.Kondisi,'Terluka');
assert(!Object.hasOwn(api.stage(sample,10002).fields,'Lokasi'));
assert(!api.stage(sample,10000));
for(const e of data.entries.filter(e=>e.type==='tokoh' && e.stages[0].key<=200132)) {
 const s=api.stage(e,200132);
 assert(s.fields.Tingkat,`${e.id}: tingkat mutakhir hilang`);
}
console.log('PASS: chapter 17–20 combat progression, evidence, injury separation, future boundaries and current character tiers.');

// Bab 21: batas pengungkapan, korban, penawar sementara, serta pengembalian Polu.
assert.strictEqual(data.chapterLengths['21'],194);
assert.strictEqual(api.stage(byId('hong-lingbo'),210162).fields.Kondisi,'Hidup; takut kepada gurunya.');
assert.strictEqual(api.stage(byId('hong-lingbo'),210163).fields.Kondisi,'Tewas.');
assert(api.stage(byId('li-mochou'),210194).fields.Kondisi.startsWith('Hidup, keracunan'));
assert(api.stage(dani,210194).fields.Tingkat.startsWith('4 ·'));
assert(api.stage(dani,210194).fields.Kondisi.includes('racun Bunga Cinta bertambah'));
assert(api.stage(long,210194).fields.Kondisi.includes('belum sembuh'));
assert(api.stage(long,210194).fields.Kondisi.includes('Hari keenam'));
assert.strictEqual(api.stage(byId('guo-polu'),210129).fields['Dalam penjagaan'],'Xiaolongnü, di luar ladang berduri.');
assert.strictEqual(api.stage(byId('guo-polu'),210138).fields['Dalam penjagaan'],'Yideng, di tanah bebas di tepi ladang.');
assert.strictEqual(api.stage(byId('guo-polu'),210152).fields['Dalam penjagaan'],'Huang Rong.');
assert.strictEqual(api.stage(byId('guo-polu'),210166).fields['Dalam penjagaan'],'Yelü Yan.');
assert.strictEqual(api.stage(byId('guo-polu'),210181).fields['Dalam penjagaan'],'Huang Rong.');
assert(api.stage(byId('cien'),210193).fields.Lokasi.includes('Aula'));
assert(api.stage(byId('qiu-qianchi'),210193).fields.Keluarga.includes('Ci’en'));
assert(!api.card(byId('hong-lingbo'),200132).includes('Tewas'));
assert(!api.card(byId('zhou-botong'),200132,true).includes('Sudah melihat Dani'));
assert(api.card(byId('zhou-botong'),210194,true).includes('Sudah melihat Dani'));
assert(api.card(dani,210194,true).includes('bab-17.html#p-17-048'));
for(const e of data.entries.filter(e=>e.type==='tokoh')) assert(api.stage(e,210194).fields.Tingkat, e.id);
console.log('PASS: chapter 21 deaths, temporary medicine, one-arm progression, baby custody and reunion boundaries.');


// Revisi 28 Oktober: sapaan pascanikah dan keterlibatan Huodu tidak bocor lebih awal.
const keyAt=(ch,needle)=>{
 const ps=fs.readFileSync(root+`bab-${String(ch).padStart(2,'0')}.md`,'utf8').split('\n---\n')[0].split('\n\n').slice(1).filter(p=>p.trim()&&p.trim()!=='***');
 const i=ps.findIndex(p=>p.includes(needle));assert(i>=0,needle);return ch*10000+i+1;
};
const named=keyAt(19,'“Long’er.” Senyum Xiaolongnü');
assert(!api.card(long,named-1).includes('sapaan pribadi'));
assert(api.card(long,named).includes('Long’er'));
const arrived=keyAt(21,'Huodu belum mengenali wajah di balik abu.');
assert(!(api.stage(byId('huodu'),arrived-1).fields.Lokasi||'').includes('Pondok bersalju'));
assert(api.stage(byId('huodu'),arrived).fields.Lokasi.includes('Pondok bersalju'));
assert(api.stage(byId('huodu'),211000).fields.Kondisi.includes('Hidup'));
for(const n of [20,21])assert(!/\bBibi\b(?! Guo| Guru)/.test(fs.readFileSync(root+`bab-${n}.md`,'utf8')));
const migration=JSON.parse(fs.readFileSync(root+'edition-migration.json','utf8'));
assert.strictEqual(migration.edition,'2026-10-28-canon');
for(const n of [18,19,20,21])assert.strictEqual(migration.lengths[`bab-${n}`],data.chapterLengths[n]);
assert.strictEqual(migration.previousMap['p-19-137'],'p-19-191');
assert.strictEqual(migration.previousMap['p-21-160'],'p-21-194');
console.log('PASS: revised address, Huodu presence and survival, Ci’en blindness, reader migration.');

const deathHe=keyAt(21,'Yideng berlutut di sisi korban.');
assert(!api.stage(byId('he-shiwo'),deathHe-1).fields.Kondisi.includes('Tewas'));
assert(api.stage(byId('he-shiwo'),deathHe).fields.Kondisi.includes('Tewas'));
assert(!byId('tetua-peng')&&!byId('pengemis-kurus'));
const blind=keyAt(21,'“Penglihatannya telah hilang,” kata Yideng');
assert(api.stage(byId('cien'),blind).fields.Kondisi.includes('Buta'));
assert(api.stage(byId('cien'),219999).fields.Kondisi.includes('buta'));
const trick=keyAt(21,'“Tetua tidak perlu melukai siapa pun');
assert(api.stage(byId('huodu'),trick).fields.Tindakan.includes('Menghasut'));
assert(!fs.readFileSync(root+'bab-21.md','utf8').includes('pisau'));
console.log('PASS: 2014 snowman causality, He Shiwo reveal/death boundary, preserved lore.');
