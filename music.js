/* Original instrumental cues. Browser audio starts after a reader gesture. */
(function(){
'use strict';
const common={root:50,scale:[0,2,5,7,9],tempo:56,chords:[[0,7,12],[5,9,12],[2,7,14],[0,7,12]],melody:[0,null,2,null,3,null,2,null,1,null,0,null,2,null,null,null],pad:.035,bass:.045,lead:.12,drum:0,instrument:'pluck'};
const moods={
 hening:{...common,title:'Jalan di antara gunung'},
 hangat:{...common,title:'Sejenak bersama',root:53,tempo:62,melody:[0,null,2,3,null,2,1,null,2,null,3,4,null,3,2,null],pad:.025},
 kenangan:{...common,title:'Yang tak sempat diucapkan',root:48,tempo:46,scale:[0,3,5,7,10],melody:[4,null,null,3,2,null,0,null,2,null,null,1,0,null,null,null]},
 tegang:{...common,title:'Di ujung pilihan',root:43,tempo:78,scale:[0,2,3,7,10],chords:[[0,7,12],[3,7,10]],melody:[0,null,0,2,null,1,3,null],instrument:'wood',pad:.025,drum:.07},
 perpisahan:{...common,title:'Senandung perpisahan',root:48,tempo:43,scale:[0,2,3,7,10],melody:[2,null,null,1,0,null,null,null,3,null,2,null,1,null,0,null],instrument:'bell',pad:.025,lead:.10},
 penantian:{...common,title:'Janji untuk pulang',root:50,tempo:48,melody:[0,null,null,2,3,null,null,null,4,null,3,null,2,null,0,null],pad:.03}
};
const dock=document.createElement('details');dock.className='music-dock';dock.hidden=true;
dock.innerHTML='<summary aria-label="Pengaturan musik bacaan"><span aria-hidden="true">♫</span> Musik <span class="music-indicator">siap</span></summary><div class="music-panel"><p class="music-title"></p><button type="button" class="music-toggle" aria-pressed="false">Putar musik</button><label>Volume <input type="range" min="0" max="65" step="1" value="24" aria-label="Volume musik"></label><p class="music-help">Musik instrumental orisinal mengikuti adegan saat digulir. Ketuk untuk mulai.</p></div>';
document.body.append(dock);
const button=dock.querySelector('button'),title=dock.querySelector('.music-title'),indicator=dock.querySelector('.music-indicator'),volume=dock.querySelector('input'),help=dock.querySelector('.music-help');
let enabled=true,storedVolume=.24,current=null,cues=[],lastAnchor=null;
try{const raw=localStorage.getItem('dani-music-v1');if(raw){const prefs=JSON.parse(raw);enabled=prefs.enabled!==false;if(Number.isFinite(prefs.volume))storedVolume=prefs.volume;}}catch(_){}
const score=new window.SagaScore({moods,motifs:{}},render);
score.setVolume(storedVolume);volume.value=Math.round(score.volume*100);
function persist(){try{localStorage.setItem('dani-music-v1',JSON.stringify({enabled,volume:score.volume}));}catch(_){}}
function render(){
 title.textContent=moods[score.key].title;
 button.textContent=score.playing?'Matikan musik':'Putar musik';button.setAttribute('aria-pressed',String(score.playing));
 indicator.textContent=score.playing?'aktif':enabled?'siap':'mati';
}
function route(){
 current=document.querySelector('.chapter-view.is-active');dock.hidden=!current;
 cues=current?[...current.querySelectorAll('[data-music-cue]')]:[];lastAnchor=null;
 if(!current){score.pause();return;}
 select();
}
function select(anchor){
 if(!current)return;
 let key='hening';
 if(anchor){const n=Number(anchor.split('-').pop());for(const p of cues){if(Number(p.id.split('-').pop())<=n)key=p.dataset.musicCue;}}
 else{const threshold=Math.max(140,window.innerHeight*.32);for(const p of cues){if(p.getBoundingClientRect().top<=threshold)key=p.dataset.musicCue;}}
 if(!moods[key])key='hening';score.choose(key);render();
}
async function start(){
 if(!enabled||!current||document.hidden)return;
 try{await score.play();help.textContent='Musik instrumental orisinal mengikuti adegan saat digulir.';}
 catch(_){help.textContent='Audio belum dapat dimulai. Ketuk Putar musik untuk mencoba lagi.';render();}
}
button.addEventListener('click',()=>{
 if(score.playing||score.pending){enabled=false;score.pause();persist();}
 else{enabled=true;persist();start();}
 render();
});
volume.addEventListener('input',()=>{score.setVolume(Number(volume.value)/100);persist();});
function gesture(e){
 if(e.type==='keydown'&&(e.ctrlKey||e.metaKey||e.altKey||!['Enter',' ','ArrowDown','PageDown'].includes(e.key)))return;
 if(e.target.closest&&e.target.closest('.music-toggle'))return;
 if(enabled&&!score.playing)start();
}
document.addEventListener('pointerdown',gesture,{passive:true});document.addEventListener('keydown',gesture);
document.addEventListener('novel:route',route);
document.addEventListener('novel:progress',e=>{if(e.detail&&e.detail.anchor!==lastAnchor){lastAnchor=e.detail.anchor;select(lastAnchor);}});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden)score.suspendHidden().catch(()=>{});
 else if(score.playing)score.resumeVisible().catch(()=>{score.pause();render();});
});
window.addEventListener('pagehide',()=>score.pause());
route();render();
})();
