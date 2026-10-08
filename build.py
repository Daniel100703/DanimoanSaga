#!/usr/bin/env python3
"""Bangun webnovel statis dari book.json dan naskah Markdown.

Jalankan: python build.py
Edisi satu file: python build.py --standalone Nama_File.html
Hanya menggunakan pustaka standar Python 3; tidak memerlukan npm atau server.
"""
from pathlib import Path
import argparse, base64, html, json, math, re
import lore

BASE=Path(__file__).resolve().parent
BOOK=json.loads((BASE/'book.json').read_text(encoding='utf-8'))
CHAPTERS=BOOK['chapters']
META=[{k:c[k] for k in ('id','slug','title')} for c in CHAPTERS]
MIGRATION=json.loads((BASE/'edition-migration.json').read_text(encoding='utf-8'))
ICONS={
 'menu':'<path d="M4 5h16M4 12h16M4 19h16"/>',
 'moon':'<path d="M20 15.3A8.3 8.3 0 018.7 4a8.4 8.4 0 1011.3 11.3z"/>',
 'close':'<path d="m6 6 12 12M18 6 6 18"/>',
 'book':'<path d="M12 5v15M3 4h5c2 0 4 1 4 3 0-2 2-3 4-3h5v15h-5c-2 0-4 1-4 2 0-1-2-2-4-2H3z"/>',
}
def esc(s):return html.escape(str(s))
def inline(s):
    s=esc(s)
    s=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
    return re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)',r'<em>\1</em>',s)
def icon(name):return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'+ICONS[name]+'</svg>'
def link(slug,anchor='',single=False):
    if single:return '#'+slug+('/'+anchor if anchor else '')
    return ('index' if slug=='beranda' else slug)+'.html'+('#'+anchor if anchor else '')
def load_chapter(c):
    source=(BASE/c['source']).read_text(encoding='utf-8')
    body,tail=source.split('\n---\n',1)
    paragraphs=[p for p in body.split('\n\n')[1:] if p.strip()]
    notes=[line[2:] for line in tail.splitlines() if line.startswith('- ')][:6]
    return paragraphs,notes
def ornament():
    return '<div class="ornament" role="separator" aria-label="Pergantian adegan"><svg viewBox="0 0 52 28" fill="none" stroke="currentColor" stroke-width="1"><path d="M3 18c5 0 4-4 8-3-5-6 2-10 6-7 2-9 12-8 13-2 6-4 12 1 10 6 10-1 12 9 3 10-7 1-10-4-6-6-1-5-7-4-7 0-6 3-12-1-9-5M4 22c8 2 13-1 19 0m-4 4h19"/></svg></div>'
def image_tag(asset,alt,lazy=True,extra=''):
    src=asset["file"]+("?v="+asset["version"] if asset.get("version") else "")
    return f'<img src="{esc(src)}" width="{asset["width"]}" height="{asset["height"]}" alt="{esc(alt)}" loading="{"lazy" if lazy else "eager"}" decoding="async" {extra}>'
def toc(current,single):
    return '<ol class="toc">'+''.join(f'<li><a href="{link(c["slug"],single=single)}" data-chapter="{c["slug"]}"'+(' aria-current="page"' if c['slug']==current else '')+f'><span>{c["id"]:02}</span>{esc(c["title"])}</a></li>' for c in CHAPTERS)+'</ol>'
def header(current,single):
    return f'''<a class="skip" href="{link('wiki','wiki-list',single) if current=='wiki' else link(current,'cerita-'+current,single) if current!='beranda' else link('beranda','daftar-bab',single)}">Langsung ke bacaan</a>
<header class="topbar"><div class="bar-inner"><a class="brand" href="{link('beranda',single=single)}"><span class="brand-seal" lang="zh" aria-hidden="true">丹</span><span>SAGA DANI MOAN<small>Novel berilustrasi</small></span></a><span class="bar-title">Novel berilustrasi</span><div class="bar-actions"><a class="control wiki-nav" href="{link('wiki',single=single)}" aria-label="Buka Wiki Persilatan" title="Wiki Persilatan">{icon('book')}</a><button class="control" id="open-toc" aria-label="Buka daftar bab" aria-haspopup="dialog">{icon('menu')}<span>Daftar bab</span></button><div class="type-controls" role="group" aria-label="Ukuran huruf"><button class="control" id="smaller" aria-label="Perkecil huruf">A−</button><output class="font-value" id="size-value" aria-live="polite">20px</output><button class="control" id="larger" aria-label="Perbesar huruf">A+</button></div><button class="control" id="theme" aria-label="Ganti ke tema gelap" aria-pressed="false">{icon('moon')}</button></div></div><div class="progress-track" role="progressbar" aria-label="Kemajuan membaca bab" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div></header>
<dialog class="toc-modal" id="toc-dialog" aria-labelledby="toc-title"><div class="modal-head"><h2 id="toc-title">Daftar bab</h2><button class="control" id="close-toc" aria-label="Tutup daftar bab">{icon('close')}</button></div>{toc(current,single)}<a class="modal-home" href="{link('wiki',single=single)}">Wiki Persilatan</a><a class="modal-home" href="{link('beranda',single=single)}">Kembali ke beranda</a></dialog>
<nav class="shelf-side" aria-label="Navigasi bab"><h2>SAGA DANI MOAN</h2>{toc(current,single)}<a class="side-wiki" href="{link('wiki',single=single)}">Wiki Persilatan</a><p class="local-note">Tema, ukuran huruf, dan posisi baca tersimpan di peramban ini.</p><p class="storage-warning">Penyimpanan posisi tidak tersedia di peramban ini.</p></nav>'''
def home(single):
    rows=[]
    for c in CHAPTERS:
        ps,_=load_chapter(c);words=len(re.findall(r'\b\w+(?:[-’]\w+)*\b',' '.join(ps)))
        rows.append(f'''<li><a class="chapter-row" href="{link(c['slug'],single=single)}"><span class="chapter-index">{c['id']:02}</span>{image_tag(c['cover'],'',True)}<div><h3>{esc(c['title'])}</h3><p class="desc">{esc(c['description'])}</p><p class="time">± {math.ceil(words/220)} menit membaca</p><p class="row-progress" data-progress-for="{c['slug']}"></p></div><span class="arrow" aria-hidden="true">→</span></a></li>''')
    return f'''<section class="home is-active" data-view="beranda" id="beranda"><div class="home-hero"><figure class="home-cover">{image_tag(CHAPTERS[0]['cover'],'Dani di ambang rumah yang ditinggalkannya.',False)}</figure><div class="home-copy"><p class="eyebrow">Sebuah perjalanan di dunia persilatan</p><h1 class="home-title">Saga<br>Dani Moan</h1><p class="home-intro">Seorang remaja meninggalkan rumah yang kehilangan suara. Di jalan yang membawanya ke dunia persilatan, pertolongan, kehilangan, dan ikatan baru mengubah arah hidupnya.</p><p class="byline">Daniel Halomoan Siregar</p><p class="edition-note">Edisi revisi · Diperbarui sampai Bab {len(CHAPTERS)}</p><div class="hero-meta"><span>Novel wuxia</span><span>Bab 1–{len(CHAPTERS)}</span><span>Berilustrasi</span></div><div class="hero-actions"><a class="primary" data-home-resume href="{link(CHAPTERS[0]['slug'],single=single)}">Mulai Bab 1 <span aria-hidden="true">→</span></a><a class="quiet-link" href="{link('beranda','daftar-bab',single)}">Lihat daftar bab</a></div><p class="resume-home"></p></div></div><section id="daftar-bab" aria-labelledby="list-title"><div class="section-head"><h2 id="list-title">Daftar bab</h2><span>{len(CHAPTERS)} bab tersedia</span></div><ol class="chapter-list">{''.join(rows)}</ol></section></section>'''
def chapter(c,single):
    ps,notes=load_chapter(c);parts=[];used=set();memory=False;num=0;seen={}
    for p in ps:
        if p=='***':parts.append(ornament());continue
        # Panel kenangan adalah perubahan tata letak; teksnya tetap naskah asli.
        if c['id']==1 and (p.startswith('“Selama masih bisa dipakai,') or p.startswith('“Untuk apa kau mengambil ini?”') or p.startswith('Ia berumur lima tahun')):
            memory=True;parts.append('<section class="memory" aria-label="Kenangan"><p class="eyebrow">Kenangan</p>')
        num+=1;pid=f'p-{c["id"]:02}-{num:03}'
        parts.append(f'<p id="{pid}"'+(' data-first' if num==1 else '')+'>'+lore.annotate(p,c['id'],num,seen)+'</p>')
        for i,plate in enumerate(c['plates']):
            if plate['anchor'] in p:
                assert i not in used,(c['id'],i,'Ilustrasi ganda')
                used.add(i);parts.append('<figure class="plate">'+image_tag(plate['image'],plate['alt'])+'<figcaption>'+esc(plate['caption'])+'</figcaption></figure>')
        if memory and any(end in p for end in ['Ibunya tidak tertawa sampai katak itu ditemukan di bawah keranjang jahitan.','ketika ibunya berusaha tetap marah dan gagal sedikit demi sedikit.','Ingatan itu berhenti di sana.']):parts.append('</section>');memory=False
    assert not memory,'Panel kenangan belum ditutup'
    assert len(used)==len(c['plates']),(c['id'],'Ada ilustrasi belum masuk',used)
    cards=[]
    for item in c['cast']:
        portrait=''
        if item.get('image'):
            asset=item['image'];iw,ih=asset['width'],asset['height'];l,t,r,b=item['roi']
            scale=max(82/((r-l)*iw),96/((b-t)*ih));dw=iw*scale;dh=ih*scale
            dx=-l*dw+(82-(r-l)*dw)/2;dy=-t*dh+(96-(b-t)*dh)/2
            style=f'--iw:{dw:.2f}px;--ih:{dh:.2f}px;--ix:{dx:.2f}px;--iy:{dy:.2f}px'
            portrait=f'<div class="portrait" style="{style}" aria-hidden="true">{image_tag(asset,"")}</div>'
        cards.append(f'<div class="cast-card">{portrait}<div><h3>{esc(item["name"])}</h3><p class="age">{esc(item["age"])}</p><p class="trait">{esc(item["description"])}</p></div></div>')
    index=CHAPTERS.index(c);prev=CHAPTERS[index-1] if index else None;nextch=CHAPTERS[index+1] if index+1<len(CHAPTERS) else None
    def navlink(ch,next=False):
        if not ch:return f'<a class="{"next" if next else "previous"}" href="{link("beranda",single=single)}"><span>{"BACAAN SAAT INI SELESAI" if next else "SAGA DANI MOAN"}</span><strong>Kembali ke daftar bab</strong></a>'
        return f'<a class="{"next" if next else "previous"}" href="{link(ch["slug"],single=single)}"><span>{"BAB BERIKUTNYA →" if next else "← BAB SEBELUMNYA"}</span><strong>{esc(ch["title"])}</strong></a>'
    cn=c.get('han',str(c['id']))
    cast_section='<details class="extras"><summary>Tokoh yang baru hadir</summary><div class="extras-content">'+lore.cast_buttons(c['id'],c['cast'])+'</div></details>' if c['cast'] else ''
    return f'''<section data-view="{c['slug']}" id="{c['slug']}" class="chapter-view" style="--chapter:{c['accent']}"><header class="chapter-heading"><div class="chapter-kicker"><a href="{link('beranda','daftar-bab',single)}">← Daftar bab</a><span>BAB {c['id']:02} / {len(CHAPTERS):02}</span></div><span class="number" lang="zh">第{cn}章</span><h1>{esc(c['title'])}</h1><p class="epigraph">“{esc(c['quote'])}”</p><p class="byline">Daniel Halomoan Siregar</p><div class="read-start"><a href="{link(c['slug'],'cerita-'+c['slug'],single)}">Mulai membaca ↓</a><a class="resume-chapter" data-resume="{c['slug']}" href="{link(c['slug'],single=single)}">Lanjutkan posisi terakhir →</a></div></header><figure class="cover-plate">{image_tag(c['cover'],'Ilustrasi pembuka: '+c['title'],not single)}<figcaption>Bab {c['id']} · {esc(c['title'])}</figcaption></figure><article class="prose" id="cerita-{c['slug']}" aria-label="Cerita Bab {c['id']}">{''.join(parts)}</article><div class="end-seal" lang="zh" aria-label="Akhir Bab {c['id']}">{cn}</div><div class="after-story"><nav class="chapter-nav" aria-label="Baca bab lain">{navlink(prev)}{navlink(nextch,True)}</nav>{cast_section}{lore.end_lore(c['id'])}</div></section>'''
def document(current='beranda',single=False):
    c=next((x for x in CHAPTERS if x['slug']==current),None)
    title=f'Bab {c["id"]} · {c["title"]} — Saga Dani Moan' if c else 'Saga Dani Moan · Novel berilustrasi'
    content=(home(single)+''.join(chapter(c,single) for c in CHAPTERS)+lore.wiki_view(CHAPTERS)) if single else (chapter(c,False) if c else lore.wiki_view(CHAPTERS) if current=='wiki' else home(False))
    return f'''<!doctype html>
<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="description" content="{esc(c['description'] if c else BOOK['description'])}"><meta name="author" content="Daniel Halomoan Siregar"><title>{esc(title)}</title><link rel="icon" type="image/svg+xml" href="favicon.svg"><link rel="stylesheet" href="reader.css"></head><body data-mode="{'single' if single else 'pages'}" data-page="{current}" data-current="{current}">{header(current,single)}<main>{content}</main><footer class="footer"><p>SAGA DANI MOAN · NOVEL BERILUSTRASI</p><p>Daniel Halomoan Siregar</p><a href="{link('beranda',single=single)}">Kembali ke beranda</a></footer><script type="application/json" id="book-meta">{json.dumps(META,ensure_ascii=False).replace('<','&lt;')}</script><script type="application/json" id="edition-migration">{json.dumps(MIGRATION,ensure_ascii=False,separators=(",",":")).replace("<","&lt;")}</script><script src="reader.js?v=20261008"></script>{lore.shell()}</body></html>'''
def uri(path):
    mime={'.woff':'font/woff','.webp':'image/webp','.svg':'image/svg+xml'}[path.suffix]
    return 'data:'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()
def standalone(path):
    doc=document(single=True)
    css=(BASE/'reader.css').read_text(encoding='utf-8')
    css=re.sub(r"url\('([^']+)'\)",lambda m:"url('"+uri(BASE/m[1])+"')",css)
    doc=doc.replace('<link rel="stylesheet" href="reader.css">','<style>'+css+'</style>')
    doc=doc.replace('<script src="reader.js?v=20261008"></script>','<script>'+(BASE/'reader.js').read_text(encoding='utf-8')+'</script>')
    doc=doc.replace('<script src="lore.js?v=20261008"></script>','<script>'+(BASE/'lore.js').read_text(encoding='utf-8')+'</script>')
    cache={}
    def embed(m):
        name=m[2]
        if name not in cache:cache[name]=uri(BASE/name)
        if m[1]=='href':return 'href="'+cache[name]+'"'
        return 'data-asset="'+name+'"'
    doc=re.sub(r'(src|href)="((?:[^" /]+\.webp|favicon\.svg))(?:\?v=[A-Za-z0-9_-]+)?"',embed,doc)
    for e in lore.ENTRIES:
        for portrait in e.get('portraits',[]):
            name=portrait['image']['file']
            if name not in cache:cache[name]=uri(BASE/name)
    assets=json.dumps(cache,ensure_ascii=False).replace('<','\\u003c')
    loader='<script>window.DANI_ASSETS='+assets+';document.querySelectorAll("[data-asset]").forEach(i=>{i.src=window.DANI_ASSETS[i.dataset.asset];});</script>'
    doc=doc.replace('<script type="application/json" id="book-meta">',loader+'<script type="application/json" id="book-meta">')
    path.write_text(doc,encoding='utf-8')
    print('Edisi satu file:',path.name)
def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('--standalone',type=Path);args=ap.parse_args()
    (BASE/'wiki.html').write_text(document('wiki'),encoding='utf-8')
    (BASE/'index.html').write_text(document(),encoding='utf-8')
    for c in CHAPTERS:(BASE/(c['slug']+'.html')).write_text(document(c['slug']),encoding='utf-8')
    (BASE/'.nojekyll').touch()
    if args.standalone:standalone(args.standalone.resolve())
    print('Selesai:',len(CHAPTERS),'bab. Buka index.html atau unggah isi folder ke GitHub Pages.')
if __name__=='__main__':main()
