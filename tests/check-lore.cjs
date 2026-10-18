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
for(const key of [170102,180090,190137,200120]) {
 assert(api.card(dani,key).includes('4 · Grandmaster'));
 assert(api.card(dani,key).includes('Pedang Berat Xuantie'));
}
assert(api.card(dani,200120,true).includes('bab-17.html#p-17-048'));
assert(!api.stage(long,180071).fields['Ilmu yang terlihat'].includes('Seni Dua Tangan'));
assert(api.stage(long,180072).fields['Ilmu yang terlihat'].includes('Seni Dua Tangan'));
assert(api.card(long,200120).includes('4 · Grandmaster'));
assert(api.card(long,200120).includes('sangat lemah'));
assert(!api.card(long,200120,true).includes('Kedua lengan masih utuh'));
assert(api.card(byId('zhou-botong'),200120).includes('5 · Tak Tertandingi'));
assert(api.card(byId('jinlun'),190137).includes('4–5'));
assert(api.card(byId('jinlun'),190137,true).includes('jarum'));
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
for(const e of data.entries.filter(e=>e.type==='tokoh')) {
 const s=api.stage(e,200120);
 assert(s.fields.Tingkat,`${e.id}: tingkat mutakhir hilang`);
}
console.log('PASS: chapter 17–20 combat progression, evidence, injury separation, future boundaries and current character tiers.');
