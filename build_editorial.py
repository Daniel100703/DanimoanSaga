"""Render the author-review map using the site's typography, without reader spoilers."""
from pathlib import Path
import re,html
B=Path(__file__).resolve().parent
def inline(s):
 s=html.escape(s)
 s=re.sub(r'\[([^\]]+)\]\((https://[^)]+)\)',r'<a href="\2">\1</a>',s)
 return re.sub(r'\*\*(.+?)\*\*',r'<strong>\1</strong>',s)
def render():
 parts=[]
 for block in (B/'editorial/peta-bab-11.md').read_text().strip().split('\n\n'):
  lines=block.splitlines()
  if block.startswith('# '):parts.append('<h1>'+inline(block[2:])+'</h1>')
  elif block.startswith('## '):parts.append('<h2>'+inline(block[3:])+'</h2>')
  elif block.startswith('|'):
   rows=[[inline(x.strip()) for x in line.strip('|').split('|')] for line in lines]
   parts.append('<table><thead><tr>'+''.join('<th scope="col">'+c+'</th>' for c in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+c+'</td>' for c in row)+'</tr>' for row in rows[2:])+'</tbody></table>')
  elif block.startswith('- '):parts.append('<ul>'+''.join('<li>'+inline(l[2:])+'</li>' for l in lines)+'</ul>')
  elif re.match(r'\d+\. ',block):parts.append('<ol>'+''.join('<li>'+inline(re.sub(r'^\d+\. ','',l))+'</li>' for l in lines)+'</ol>')
  else:parts.append('<p>'+inline(block)+'</p>')
 css='main{max-width:860px;margin:0 auto;padding:36px 24px 70px}h1{font-size:clamp(32px,5vw,46px);line-height:1.2;margin:30px 0;color:var(--accent)}h2{font-size:25px;margin:36px 0 16px}p,li,td{font-size:18px;line-height:1.8}p,li{margin-bottom:16px}ol,ul{padding-left:26px}table{border-collapse:collapse;width:100%}th,td{text-align:left;vertical-align:top;border-bottom:1px solid var(--line);padding:16px}th{font:600 14px system-ui;background:var(--panel)}td:first-child{width:25%;font-weight:700;color:var(--accent)}a{overflow-wrap:anywhere}.status{font:600 13px system-ui;color:var(--copper)}@media(max-width:620px){thead{display:none}table,tbody,tr,td{display:block}td{padding:10px 0;border:0}td:first-child{width:100%;padding-top:22px}tr{border-bottom:1px solid var(--line);padding-bottom:16px}p,li,td{font-size:17px}main{padding:24px 20px 50px}}'
 doc='<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Peta Bab 11 — Saga Dani Moan</title><link rel="icon" href="favicon.svg"><link rel="stylesheet" href="reader.css?v=20261008b"><style>'+css+'</style></head><body><main><a href="index.html">← Kembali ke novel</a><p class="status">PETA DISETUJUI · BAB 11 TELAH TERBIT</p><a href="bab-11.html">Baca Bab 11 →</a>'+''.join(parts)+'</main></body></html>'
 (B/'peta-bab-11.html').write_text(doc)
if __name__=='__main__':render()
