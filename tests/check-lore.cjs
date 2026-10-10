const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname+'/../';
const data=JSON.parse(fs.readFileSync(root+'lore-data.json','utf8'));
const noop=()=>{},el={addEventListener:noop,dataset:{}};
const doc={body:{dataset:{mode:'pages'}},getElementById:id=>['lore-data','book-meta','edition-migration'].includes(id)?{textContent:fs.readFileSync(root+({'lore-data':'lore-data.json','book-meta':'book.json','edition-migration':'edition-migration.json'}[id]),'utf8')}:['wiki-boundary','wiki-search','wiki-kind'].includes(id)?null:el,addEventListener:noop};
const ctx={document:doc,localStorage:{getItem:()=>null,setItem:noop},window:{},console};
let source=fs.readFileSync(root+'lore.js','utf8').replace('observeReading();renderWiki();','globalThis.testAPI={card,stage,relationship,portrait};');
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
