/* Pembaca statis. Data pribadi tidak dikirim ke server; kemajuan disimpan lokal.
 * Mendukung halaman per bab dan edisi satu file dengan rute hash yang sama.
 */
(() => {
  'use strict';
  const root=document.documentElement, body=document.body;
  root.classList.add('js');
  const book=JSON.parse(document.querySelector('#book-meta').textContent);
  const single=body.dataset.mode==='single';
  const storageKey='dani-moan-webnovel-v1';
  const toolbar=document.querySelector('.topbar');
  const dialog=document.querySelector('#toc-dialog');
  let state={positions:{}}, active=null, timer, ready=false;
  try {
    const stored=JSON.parse(localStorage.getItem(storageKey)||'{}');
    if(stored && typeof stored==='object')state={...state,...stored};
    if(!state.positions || typeof state.positions!=='object')state.positions={};
    localStorage.setItem(storageKey+'-check','1');localStorage.removeItem(storageKey+'-check');
  } catch(_){root.classList.add('no-storage');}
  let size=Math.min(26,Math.max(16,Number(state.size)||(innerWidth<=760?18:20)));
  const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(state));}catch(_){}};
  const href=(id,anchor='')=>single?'#'+id+(anchor?'/'+anchor:''):(id==='beranda'?'index':id)+'.html'+(anchor?'#'+anchor:'');
  const top=()=>toolbar.getBoundingClientRect().bottom+22;
  function updateHeader(){root.style.setProperty('--header',toolbar.offsetHeight+'px');}
  function locationInStory(){
    const article=active?.querySelector('.prose');
    if(!article || article.getBoundingClientRect().top>top()+40)return null;
    const paragraphs=[...article.querySelectorAll('p[id]')];
    const p=paragraphs.find(p=>p.getBoundingClientRect().bottom>top())||paragraphs.at(-1);
    return p?{p,article}:null;
  }
  function percentage(){
    const article=active?.querySelector('.prose');if(!article)return 0;
    const start=article.getBoundingClientRect().top+scrollY;
    const distance=Math.max(1,article.offsetHeight-innerHeight+toolbar.offsetHeight);
    return Math.round(Math.max(0,Math.min(1,(scrollY-start)/distance))*100);
  }
  function updateProgress(){
    const n=percentage();
    document.querySelector('.progress-track span').style.width=n+'%';
    document.querySelector('.progress-track').setAttribute('aria-valuenow',String(n));
  }
  function savePosition(){
    if(!ready)return;
    const at=locationInStory();if(!at)return;
    const id=active.dataset.view;
    state.positions[id]={anchor:at.p.id,offset:Math.max(0,top()-at.p.getBoundingClientRect().top),percent:percentage()};
    state.last=id;persist();
  }
  function applySize(keepPosition=false){
    const at=keepPosition?locationInStory():null;
    const old=at?.p.getBoundingClientRect().top;
    root.style.setProperty('--size',size+'px');
    document.querySelector('#size-value').textContent=size+'px';
    document.querySelector('#smaller').disabled=size===16;
    document.querySelector('#larger').disabled=size===26;
    state.size=size;persist();
    if(at)scrollBy(0,at.p.getBoundingClientRect().top-old);
    updateProgress();
  }
  function applyTheme(){
    root.dataset.theme=state.theme==='dark'?'dark':'cream';
    const label=root.dataset.theme==='dark'?'Ganti ke tema krem':'Ganti ke tema gelap';
    const btn=document.querySelector('#theme');btn.setAttribute('aria-label',label);btn.title=label;
    btn.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));persist();
  }
  function refreshLinks(){
    const last=book.find(c=>c.slug===state.last), pos=state.positions[state.last];
    document.querySelectorAll('[data-home-resume]').forEach(a=>{
      if(!last||!pos)return;
      a.href=href(last.slug,pos.anchor);a.innerHTML='Lanjutkan Bab '+last.id+' <span aria-hidden="true">→</span>';
    });
    document.querySelectorAll('.resume-home').forEach(e=>{
      if(last&&pos){e.textContent='Terakhir dibaca: '+last.title;e.classList.add('visible');}
    });
    for(const ch of book){
      const p=state.positions[ch.slug];
      document.querySelectorAll('[data-progress-for="'+ch.slug+'"]').forEach(e=>{
        if(p){e.textContent=p.percent>=98?'Selesai dibaca':p.percent+'% dibaca';e.classList.add('visible');}
      });
      const a=document.querySelector('[data-resume="'+ch.slug+'"]');
      if(a&&p){a.href=href(ch.slug,p.anchor);a.classList.add('visible');}
    }
  }
  function goToAnchor(anchor,restore=false){
    const target=anchor?document.getElementById(anchor):null;
    if(!target || !active.contains(target)){scrollTo(0,0);return;}
    const position=state.positions[active.dataset.view];
    const offset=restore&&position?.anchor===anchor?Math.min(position.offset||0,target.offsetHeight-1):0;
    scrollTo(0,scrollY+target.getBoundingClientRect().top-top()+offset);
    target.setAttribute('tabindex','-1');target.focus({preventScroll:true});
  }
  function route(){
    ready=false;
    let id=body.dataset.page,anchor=location.hash.slice(1);
    if(single){[id,anchor='']=anchor.split('/');if(!document.querySelector('[data-view="'+CSS.escape(id||'beranda')+'"]'))id='beranda';}
    id=id||'beranda';
    document.querySelectorAll('[data-view]').forEach(v=>v.classList.toggle('is-active',v.dataset.view===id));
    active=document.querySelector('[data-view="'+CSS.escape(id)+'"]');
    body.dataset.current=id;
    const ch=book.find(c=>c.slug===id);
    document.querySelector('.skip').href=href(id,ch?'cerita-'+id:'daftar-bab');
    document.title=ch?'Bab '+ch.id+' · '+ch.title+' — Saga Dani Moan':'Saga Dani Moan · Novel berilustrasi';
    document.querySelector('.bar-title').textContent=ch?'Bab '+ch.id+' · '+ch.title:'Novel berilustrasi';
    document.querySelectorAll('.toc a').forEach(a=>{if(a.dataset.chapter===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    refreshLinks();updateHeader();
    document.fonts.ready.then(()=>requestAnimationFrame(()=>{goToAnchor(anchor,true);ready=true;updateProgress();}));
  }
  document.querySelector('#smaller').addEventListener('click',()=>{size=Math.max(16,size-2);applySize(true);});
  document.querySelector('#larger').addEventListener('click',()=>{size=Math.min(26,size+2);applySize(true);});
  document.querySelector('#theme').addEventListener('click',()=>{state.theme=state.theme==='dark'?'cream':'dark';applyTheme();});
  document.querySelector('#open-toc').addEventListener('click',()=>dialog.showModal());
  document.querySelector('#close-toc').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  document.addEventListener('click',e=>{
    const a=e.target.closest('a');if(!a||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;
    const destination=a.getAttribute('href');
    if(!destination || !/^(#|bab-\d+\.html|index\.html)/.test(destination))return;
    // Simpan sebelum rute diganti; jangan tertimpa posisi awal bab berikutnya.
    savePosition();clearTimeout(timer);
    if(dialog.open)dialog.close();
    if(single && destination.startsWith('#')){
      e.preventDefault();history.pushState(null,'',destination);route();
    }else if(!single&&destination.startsWith('#')){
      e.preventDefault();history.pushState(null,'',destination);goToAnchor(destination.slice(1),true);updateProgress();
    }
  });
  addEventListener('scroll',()=>{updateProgress();if(!ready)return;clearTimeout(timer);timer=setTimeout(savePosition,180);},{passive:true});
  addEventListener('resize',()=>{updateHeader();updateProgress();});
  addEventListener('pagehide',savePosition);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)savePosition();});
  addEventListener('popstate',()=>{savePosition();route();});
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  applyTheme();applySize();route();
})();
