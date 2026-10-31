"""Check generated chapters and current illustration references without network access."""
from pathlib import Path
from html.parser import HTMLParser
import json,re,hashlib
R=Path(__file__).resolve().parents[1]
book=json.loads((R/'book.json').read_text())
lore=json.loads((R/'lore-data.json').read_text())
class Page(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.images=[];self.links=[]
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id'in d:self.ids.append(d['id'])
  if tag=='img':self.images.append(d)
  if tag=='a'and 'href'in d:self.links.append(d['href'])
for ch in book['chapters']:
 n=ch['id'];p=R/f'bab-{n:02}.html';html=p.read_text();a=Page();a.feed(html)
 assert len(a.ids)==len(set(a.ids)),f'duplicate ID {n}'
 ids=[x for x in a.ids if re.fullmatch(r'p-\d+-\d+',x)]
 assert len(ids)==lore['chapterLengths'][str(n)],n
 assert ids[-1]==f'p-{n:02}-{len(ids):03}',n
 assert 'Fanfiksi The Return of the Condor Heroes'in html,n
 for cue in ch.get('musicCues',[]):
  raw=(R/ch['source']).read_text().split('\n---\n')[0];assert raw.count(cue['anchor'])==1,(n,cue)
  assert f'data-music-cue="{cue["mood"]}"' in html,(n,cue)
 for plate in ch['plates']:
  file=plate['image']['file']; expected=sum(x['image']['file']==file for x in ch['plates'])+int(ch['cover']['file']==file)
  assert sum(x['src'].split('?')[0]==file for x in a.images)==expected,(n,file)
 if n==22:
  assert len(a.images)==6
  assert 'bab-21.html'in a.links
  assert 'Aku akan hidup, Long’er.' in html
  assert 'Xiaolongnü, istrimu, memohon perkenanmu, suamiku Dani Moan' in html
 for im in [ch['cover']]+[x['image']for x in ch['plates']]:
  if n==22 or '-v2.'in im['file']:
   data=(R/im['file']).read_bytes();assert data[:4]==b'RIFF'and data[8:12]==b'WEBP',im['file']
   assert hashlib.sha256(data).hexdigest()[:12]==im['version'],im['file']
for e in lore['entries']:
 for p in e.get('portraits',[]):
  left,top,right,bottom=p['roi'];assert 0<=left<right<=1 and 0<=top<bottom<=1,e['id']
  ch,para=divmod(p['key'],10000);assert para<=lore['chapterLengths'][str(ch)],(e['id'],p['key'])
print('PASS: 22 generated chapters, valid paragraph IDs, fanfiction labels, six chapter 22 images, new asset hashes and portrait boundaries.')
