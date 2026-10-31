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
const fengKey=byId('feng-mofeng').stages[0].key;assert(!api.card(byId('feng-mofeng'),fengKey-1));assert(api.card(byId('feng-mofeng'),fengKey).includes('Feng Mofeng'));
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
assert(api.card(long,200142).toLowerCase().includes('sangat lemah'));
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

// Corrected canon facts are gated by actual manuscript anchors, not obsolete numbers.
const paragraphs=ch=>fs.readFileSync(root+`bab-${String(ch).padStart(2,'0')}.md`,'utf8').split('\n---\n')[0].split('\n\n').slice(1).filter(p=>p.trim()&&p.trim()!=='***');
const keyAt=(ch,needle)=>{const a=paragraphs(ch),i=a.findIndex(p=>p.includes(needle));assert(i>=0,needle);return ch*10000+i+1;};
for(const ch of [20,21,22]) assert.strictEqual(data.chapterLengths[ch],paragraphs(ch).length);
const needle=keyAt(20,'Jarum itu menancap');
assert(!api.stage(byId('jarum-perak'),needle-1).fields.Sasaran);
assert(api.stage(byId('jarum-perak'),needle).fields.Sasaran.includes('Dani tidak terkena'));
assert(!JSON.stringify(data).includes('Kaki kanan Dani dan bahu kiri'));
const victory=keyAt(21,'Dani berdiri tegap dengan tangan kiri');
assert(api.stage(dani,victory).fields.Perkembangan.includes('meyakinkan'));
assert(!api.stage(dani,victory-1).fields.Perkembangan.includes('Mengalahkan Ci’en'));
assert(api.stage(byId('yideng'),victory).fields.Kondisi.includes('Terluka berat'));
assert(api.stage(byId('yideng'),victory).fields['Ilmu yang terlihat'].includes('Tidak mengalihkan'));
assert(api.stage(byId('cien'),keyAt(21,'“Aku kalah,” katanya serak.')).fields.Kondisi.includes('berhenti menyerang'));
const betrayal=keyAt(21,'Dari balik dinding terdengar Huodu menyebut');
assert(!api.stage(byId('he-shiwo'),betrayal-1));
assert(api.stage(byId('he-shiwo'),betrayal).fields.Tindakan.includes('demi keuntungan'));
const heDeath=keyAt(21,'Yideng berlutut di sisi korban.');
assert(!api.stage(byId('he-shiwo'),heDeath-1).fields.Kondisi.includes('Tewas'));
assert(api.stage(byId('he-shiwo'),heDeath).fields.Kondisi.includes('Tewas'));
assert(api.stage(byId('huodu'),219999).fields.Kondisi.includes('Hidup'));
assert(api.stage(byId('cien'),219999).fields.Kondisi.includes('dapat melihat'));
assert(!byId('tetua-peng')&&!byId('pengemis-kurus'));
const hongDeath=keyAt(21,'Hong tidak bergerak lagi.');
assert(api.stage(byId('hong-lingbo'),hongDeath-1).fields.Kondisi.includes('Hidup'));
assert.strictEqual(api.stage(byId('hong-lingbo'),hongDeath).fields.Kondisi,'Tewas.');
assert(api.stage(byId('li-mochou'),219999).fields.Kondisi.includes('Hidup, keracunan'));
const babyReturn=keyAt(21,'Xiaolongnü mengambil kembali Polu');
assert(api.stage(byId('guo-polu'),babyReturn-1).fields['Dalam penjagaan'].includes('Yideng'));
assert.strictEqual(api.stage(byId('guo-polu'),babyReturn).fields['Dalam penjagaan'],'Huang Rong.');
assert(api.stage(dani,219999).fields.Kondisi.includes('racun Bunga Cinta bertambah'));
assert(api.stage(long,219999).fields.Kondisi.includes('Hari keenam'));
for(const ch of [20,21,22]) for(const p of paragraphs(ch))assert(!p.includes('\n***'),`separator merged in chapter ${ch}`);
assert(paragraphs(21).some(p=>p.includes('Dia tidak bodoh')));
assert(paragraphs(21).some(p=>p.includes('Nona ini tentu Xiaolongnü')));
assert(paragraphs(21).some(p=>p.includes('Ketiganya tidak ikut mengeroyok')));
// New deaths and the false rescue story must not leak to previous chapters.
for(const [id,needle] of [['gongsun-lue','Ketika genggamannya terlepas,'],['tianzhu','Tianzhu telah sadar lebih awal.'],['qiu-qianchi','Sesudah benturan terakhir, lembah'],['gongsun-zhi','Sesudah benturan terakhir, lembah'],['li-mochou','Bayangannya hilang di balik nyala']]){
 const k=keyAt(22,needle);assert(!api.stage(byId(id),k-1).fields.Kondisi.includes('Tewas'),id);assert(api.stage(byId(id),k).fields.Kondisi.includes('Tewas'),id);
}
assert(api.stage(byId('cien'),229999).fields.Kondisi.includes('Hidup'));
assert(api.stage(long,229999).fields.Kondisi.includes('belum diketahui'));
assert(!api.card(long,219999).includes('Pesan'));
assert(api.stage(long,229999).fields.Pesan.includes('tujuh tahun'));
const lie=keyAt(22,'Kisah itu lahir pada saat Huang Rong');
assert(!api.stage(byId('biarawati-laut-selatan'),lie-1));
assert(api.stage(byId('biarawati-laut-selatan'),lie).fields.Kepastian.includes('Tidak ada kedatangan'));
assert(api.stage(dani,229999).fields.Kondisi.includes('percobaan obat dimulai pada Bab 23'));
assert(api.stage(dani,229999).fields.Batas.includes('Belum ada lompatan'));
for(const e of data.entries.filter(e=>e.type==='tokoh')) assert(api.stage(e,229999).fields.Tingkat,e.id);
// Evidence links always resolve to their exact sentence.
for(const e of data.entries) for(const kind of ['stages','relationships'])for(const s of e[kind]||[]){
 const a=paragraphs(s.chapter),n=s.key%10000;assert.strictEqual(s.quote.replaceAll("*", "").trim(),a[n-1].replaceAll("*", "").trim(),`${e.id} ${kind} ${s.paragraph}`);
 assert.strictEqual(s.paragraph,`p-${String(s.chapter).padStart(2,'0')}-${String(n).padStart(3,'0')}`);
}
const migration=JSON.parse(fs.readFileSync(root+'edition-migration.json','utf8'));
assert.strictEqual(migration.edition,'2026-10-31-revisi');
assert.strictEqual(migration.previousEdition,'2026-10-29-canon');
for(const ch of [20,21,22])assert.strictEqual(migration.lengths[`bab-${ch}`],data.chapterLengths[ch]);
assert.strictEqual(migration.editionMaps['2026-10-28-canon']['p-21-194'],`p-21-${data.chapterLengths[21]}`);
for(const mapping of [migration.map,migration.previousMap,...Object.values(migration.editionMaps)])for(const id of Object.values(mapping)){
 const match=/^p-(\d+)-(\d+)$/.exec(id);assert(match,id);assert(Number(match[2])<=data.chapterLengths[Number(match[1])],id);
}
const book=JSON.parse(fs.readFileSync(root+'book.json','utf8'));
assert.strictEqual(book.chapters.length,22);assert.strictEqual(book.chapters[21].plates.length,5);
assert(book.chapters[19].plates[0].image.file.includes('-v2'));
assert(book.chapters[20].plates[0].image.file.includes('-v2'));
console.log('PASS: canon corrections, single needle victim, snowman cause, decisive duel, rescue, death/reveal gates, exact evidence, six chapter 22 images and all migration editions.');

// Every character has a numeric tier, a biography and a separate event record.
for(const e of data.entries.filter(e=>e.type==='tokoh')) for(const s of e.stages){
 assert(/^\d/.test(s.fields.Tingkat),`${e.id}: missing numeric tier`);
 assert(s.summary.length>40,`${e.id}: biography missing`);
}
const meiKey=keyAt(13,'“Mei Chaofeng,” jawab Huang.');
assert(!api.stage(byId('mei-chaofeng'),meiKey-1));assert(api.stage(byId('mei-chaofeng'),meiKey));
const herbKey=keyAt(22,'Huang Rong menyerahkan bungkusan itu.');
assert(!api.stage(dani,herbKey-1).fields.Kondisi.includes('percobaan obat'));
assert(api.stage(dani,herbKey).fields.Kondisi.includes('percobaan obat'));
assert(!api.stage(byId('rumput-patah-hati'),keyAt(22,'Huang Rong membuka sedikit kain')-1));
assert(!JSON.stringify(byId('cien').stages).includes('Hidup, buta'));
assert(paragraphs(22).findIndex(p=>p.includes('“Ia meminta aku datang,”'))<paragraphs(22).findIndex(p=>p.includes('“Sekarang dengarkanlah satu perkara lagi.')));
assert(paragraphs(22).some(p=>p.includes('Xiaolongnü, istrimu, memohon perkenanmu, suamiku Dani Moan')));
assert(!api.stage(dani,229999).fields.Tingkat.startsWith('5'));
console.log('PASS: biographies, all numerical tiers, new backstory gates and corrected herb sequence.');
