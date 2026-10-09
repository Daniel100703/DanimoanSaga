/* Wiki statis: tahap informasi ditentukan oleh paragraf, bukan kemampuan masa depan.
 * Data tertanam agar edisi satu HTML juga bekerja tanpa server/internet.
 */
(() => {
  'use strict';
  const data = JSON.parse(document.getElementById('lore-data').textContent);
  const entries = data.entries, byId = new Map(entries.map(e => [e.id, e]));
  const dialog = document.getElementById('lore-dialog');
  const content = document.getElementById('lore-content');
  const book = JSON.parse(document.getElementById('book-meta').textContent);
  const single = document.body.dataset.mode === 'single';
  const storageKey = 'dani-moan-lore-v1';
  const migration=JSON.parse(document.getElementById('edition-migration').textContent);
  const edition=migration.edition;
  let progress = 0, opener = null, savedY = 0, observer;
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const href = (page, anchor = '') => single ? '#' + page + (anchor ? '/' + anchor : '') : (page === 'beranda' ? 'index' : page) + '.html' + (anchor ? '#' + anchor : '');
  const stage = (e, key) => e.stages.filter(s => s.key <= key).at(-1);
  const endKey = c => Number(c) * 10000 + Number(data.chapterLengths[c] || 0);
  const keyOf = id => { const m = /^p-(\d+)-(\d+)$/.exec(id || ''); return m ? Number(m[1])*10000 + Number(m[2]) : 0; };
  try {
    const stored=JSON.parse(localStorage.getItem(storageKey) || '{}');
    progress=Number(stored.progress)||0;
    if(progress && stored.edition!==edition){
      const anchor='p-'+String(Math.floor(progress/10000)).padStart(2,'0')+'-'+String(progress%10000).padStart(3,'0');
      const mapping=stored.edition===migration.previousEdition?migration.previousMap:migration.map;
      progress=keyOf(mapping[anchor]);
    }
    const old = JSON.parse(localStorage.getItem('dani-moan-webnovel-v1') || '{}');
    for (const p of Object.values(old.positions || {})) progress = Math.max(progress, keyOf(p.anchor));
    localStorage.setItem(storageKey,JSON.stringify({progress,edition}));
  } catch (_) {}
  const remember = key => {
    if (key <= progress) return;
    progress = key;
    try { localStorage.setItem(storageKey, JSON.stringify({progress,edition})); } catch (_) {}
  };
  const context = key => {
    const c = Math.floor(key / 10000), p = key % 10000;
    return c ? (p >= Number(data.chapterLengths[c]) ? 'Sampai akhir Bab '+c : 'Sampai adegan ini · Bab '+c) : 'Belum ada bacaan tersimpan';
  };
  const portrait = (e, key) => {
    const p = (e.portraits || []).filter(p => p.key <= key).at(-1);
    if (!p) return '';
    const [l,t,r,b] = p.roi, iw=p.image.width, ih=p.image.height;
    const scale=Math.max(82/((r-l)*iw),96/((b-t)*ih)),dw=iw*scale,dh=ih*scale;
    const dx=-l*dw+(82-(r-l)*dw)/2,dy=-t*dh+(96-(b-t)*dh)/2;
    return `<div class="portrait" style="--iw:${dw}px;--ih:${dh}px;--ix:${dx}px;--iy:${dy}px" aria-hidden="true"><img src="${esc(window.DANI_ASSETS?.[p.image.file] || p.image.file)}" width="${iw}" height="${ih}" alt="" loading="lazy"></div>`;
  };
  const types = {tokoh:'Tokoh',ilmu:'Ilmu & jurus',senjata:'Senjata',perguruan:'Perguruan',kondisi:'Kondisi',istilah:'Istilah',benda:'Benda bermakna'};
  function card(e, key, detailed = false) {
    const s = stage(e,key); if (!s) return '';
    const fields = Object.entries(s.fields);
    const limit = detailed ? fields : fields.filter(([k]) => ['Tingkat','Ilmu yang terlihat','Bahaya teramati','Kondisi','Dampak teramati','Dampak','Risiko terbukti'].includes(k)).slice(0,3);
    const heading = detailed ? 'h2' : 'h3';
    return `<div class="lore-card-head">${portrait(e,key)}<div><p class="eyebrow">${esc(types[e.type])}</p><${heading}${detailed?' id="lore-title"':''}>${esc(s.title)}</${heading}></div></div><p class="lore-summary">${esc(s.summary)}</p>${limit.length?'<dl class="lore-stats">'+limit.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')+'</dl>':''}${detailed?evidence(e,key):`<button type="button" class="lore-open" data-lore="${e.id}" data-at="${key}" aria-haspopup="dialog">Buka catatan ${esc(s.title)}</button>`}`;
  }
  function evidence(e,key) {
    const stages=e.stages.filter(s=>s.key<=key);
    const current=stages.at(-1), first=stages[0];
    const list = current===first ? [first] : [first,current];
    return '<details class="lore-evidence"><summary>Lihat dasar dalam cerita</summary>'+list.map(s=>`<blockquote>${esc(s.quote)}</blockquote><a class="lore-evidence-link" href="${href('bab-'+String(s.chapter).padStart(2,'0'),s.paragraph)}">Baca adegan · Bab ${s.chapter}</a>`).join('')+'</details>';
  }
  function openCard(button) {
    const e=byId.get(button.dataset.lore), key=Number(button.dataset.at);
    if(!e || !stage(e,key))return;
    remember(key); opener=button; savedY=scrollY;
    document.getElementById('lore-context').textContent=context(key);
    content.innerHTML=card(e,key,true);
    dialog.showModal(); document.body.classList.add('lore-is-open');
    dialog.scrollTop=0; document.getElementById('close-lore').focus({preventScroll:true});
  }
  function closeCard(restore=true) {
    dialog.dataset.restore = restore ? 'yes' : 'no';
    dialog.close();
  }
  dialog.addEventListener('close',()=>{
    document.body.classList.remove('lore-is-open');
    if(dialog.dataset.restore!=='no') { scrollTo(0,savedY); opener?.focus({preventScroll:true}); }
    dialog.dataset.restore='yes';
  });
  document.getElementById('close-lore').addEventListener('click',()=>closeCard());
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeCard();
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-lore]');
    if(button)openCard(button);
    if(event.target.closest('.lore-evidence-link'))closeCard(false);
  });
  function populateChapter(section) {
    const c=Number(section.dataset.view.slice(4)), key=endKey(c);
    if(!c)return;
    section.querySelectorAll('[data-cast-lore]').forEach(el=>{
      const e=byId.get(el.dataset.castLore); el.className='wiki-card';el.innerHTML=card(e,key);
    });
    section.querySelectorAll('[data-lore-chapter]').forEach(el=>{
      const relevant=entries.filter(e=>e.type!=='tokoh' && e.stages.some(s=>s.chapter===c));
      const people=entries.filter(e=>e.type==='tokoh' && e.stages.some(s=>s.chapter===c));
      el.innerHTML=(relevant.length?'':'<p class="lore-note">Belum ada ilmu baru pada bab ini.</p>')+
        [...relevant,...people].map(e=>`<article class="wiki-card">${card(e,key)}</article>`).join('');
    });
  }
  function renderWiki() {
    const boundary=document.getElementById('wiki-boundary'); if(!boundary)return;
    const key=boundary.value==='reading'?progress:endKey(boundary.value);
    const query=document.getElementById('wiki-search').value.trim().toLocaleLowerCase('id');
    const kind=document.getElementById('wiki-kind').value;
    const visible=entries.map(e=>({e,s:stage(e,key)})).filter(({e,s})=>s && (kind==='all'||e.type===kind) && (!query || (s.title+' '+s.summary+' '+Object.values(s.fields).join(' ')).toLocaleLowerCase('id').includes(query)));
    document.getElementById('wiki-scope').textContent=context(key)+' · '+visible.length+' catatan terbuka';
    document.getElementById('wiki-list').innerHTML=visible.length?visible.map(({e})=>`<article class="wiki-card">${card(e,key)}</article>`).join(''):
      `<div class="wiki-empty"><h2>${key?'Belum ada catatan yang cocok':'Mulai dari cerita'}</h2><p>${key?'Coba kata lain atau lihat batas informasi yang dipilih.':'Kartu akan terbuka ketika kamu membaca. Kamu juga dapat memilih akhir suatu bab pada Batas informasi.'}</p><a href="${href('bab-01')}">Baca Bab 1</a></div>`;
  }
  ['wiki-boundary','wiki-kind'].forEach(id=>document.getElementById(id)?.addEventListener('change',renderWiki));
  document.getElementById('wiki-search')?.addEventListener('input',renderWiki);
  function observeReading() {
    observer?.disconnect();
    const active=document.querySelector('[data-view].is-active');
    if(!active)return;
    if(active.dataset.view==='wiki'){renderWiki();return;}
    if(!active.dataset.view.startsWith('bab-'))return;
    populateChapter(active);
    // Informasi baru disimpan setelah paragraf mencapai area baca bagian atas.
    observer=new IntersectionObserver(list=>{
      for(const item of list)if(item.isIntersecting)remember(keyOf(item.target.id));
    },{rootMargin:'-15% 0px -65% 0px',threshold:0});
    active.querySelectorAll('.prose p[id]').forEach(p=>observer.observe(p));
  }
  document.addEventListener('novel:route',observeReading);
  document.addEventListener('novel:progress',event=>remember(keyOf(event.detail.anchor)));
  // Bekerja juga bila pembaca sudah selesai merutekan halaman saat script dimuat.
  observeReading();renderWiki();
})();
