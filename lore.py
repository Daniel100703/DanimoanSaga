"""Penyisipan tautan lore tanpa mengubah kalimat dan identitas paragraf."""
import html
import json
import re
from pathlib import Path

BASE=Path(__file__).resolve().parent
DATA=json.loads((BASE/'lore-data.json').read_text())
ENTRIES=DATA['entries']
BY_ID={e['id']:e for e in ENTRIES}
ALIASES={alias:e for e in ENTRIES for alias in e['aliases']}
PATTERN=re.compile(r'(?<!\w)('+ '|'.join(re.escape(a) for a in sorted(ALIASES,key=len,reverse=True))+r')(?!\w)',re.I)
LOWER={a.lower():e for a,e in ALIASES.items()}

def annotate(text,c,n,seen):
    """Satu tombol untuk suatu istilah per paragraf; nama diulang secukupnya."""
    at=c*10000+n
    def replace(m):
        e=LOWER[m.group().lower()]
        if e['stages'][0]['key']>at:return html.escape(m.group())
        # Nama tidak menutupi setiap dialog. Pembaruan pada adegan tetap dapat diketuk.
        gap=14 if e['type']=='tokoh' else 5
        if n-seen.get(e['id'],-100)<gap:return html.escape(m.group())
        seen[e['id']]=n
        return f'<button class="lore-term" type="button" data-lore="{e["id"]}" data-at="{at}" aria-haspopup="dialog" aria-label="Buka lore: {html.escape(m.group(),quote=True)}">{html.escape(m.group())}</button>'
    parts=[];end=0
    for m in PATTERN.finditer(text):parts.append(html.escape(text[end:m.start()]));parts.append(replace(m));end=m.end()
    parts.append(html.escape(text[end:]));s=''.join(parts)
    s=re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
    return re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)',r'<em>\1</em>',s)

def end_lore(c):
    return f'''<details class="extras lore-extras"><summary>Ilmu, bahaya &amp; tokoh · Bab {c}</summary><div class="extras-content"><p class="lore-note">Ringkasan ini memuat informasi sampai akhir Bab {c}.</p><div class="chapter-lore-list" data-lore-chapter="{c}"></div></div></details>'''

def cast_buttons(c,cast):
    items=[]
    for person in cast:
        e=next((e for e in ENTRIES if e['type']=='tokoh' and e['stages'][0]['title'].replace('’',"'")==person['name'].replace('’',"'")),None)
        if e:items.append(f'<div data-cast-lore="{e["id"]}" data-cast-chapter="{c}"></div>')
    return ''.join(items)

def wiki_view(chapters):
    options=''.join(f'<option value="{c["id"]}">Akhir Bab {c["id"]}</option>' for c in chapters)
    return f'''<section class="wiki-view" data-view="wiki" id="wiki"><div class="wiki-heading"><p class="eyebrow">Catatan perjalanan</p><h1>Wiki Persilatan</h1><p>Kenali tokoh, ilmu, dan akibatnya. Informasi terbuka mengikuti bacaanmu.</p></div><div class="wiki-controls"><label>Batas informasi<select id="wiki-boundary"><option value="reading">Posisi bacaan tersimpan</option>{options}</select></label><label>Cari dalam informasi terbuka<input id="wiki-search" type="search" placeholder="Nama tokoh atau ilmu…" autocomplete="off"></label><label>Jenis<select id="wiki-kind"><option value="all">Semua</option><option value="tokoh">Tokoh</option><option value="ilmu">Ilmu &amp; jurus</option><option value="senjata">Senjata</option><option value="perguruan">Perguruan</option><option value="kondisi">Kondisi</option><option value="istilah">Istilah</option><option value="benda">Benda bermakna</option></select></label></div><p id="wiki-scope" class="lore-note" aria-live="polite"></p><div id="wiki-list" class="wiki-grid"></div><noscript>Aktifkan JavaScript untuk membuka kartu lore yang mengikuti posisi bacaan.</noscript></section>'''

def shell():
    return '<dialog id="lore-dialog" class="lore-dialog" aria-labelledby="lore-title"><div class="lore-dialog-bar"><span id="lore-context"></span><button class="control" id="close-lore" aria-label="Tutup kartu lore">×</button></div><div id="lore-content"></div></dialog><script type="application/json" id="lore-data">'+json.dumps(DATA,ensure_ascii=False).replace('<','\\u003c')+'</script><script src="lore.js?v=20261008b"></script>'
