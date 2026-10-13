# Ilustrasi Bab 16 dan revisi pembuka Bab 15

Mode produksi: **imagegen bawaan**, bukan CLI/API tambahan. Empat ilustrasi Bab 16 mengikuti peta; semua gambar diintegrasikan ke repositori. Potret berasal dari ilustrasi, bukan gambar terpisah.

## Penempatan dan pemeriksaan

| Berkas | Letak | Pemeriksaan |
| --- | --- | --- |
| `bab-16-pembuka.webp` | Pembuka | Dani dan Fu; dua lengan Dani masih utuh, kedua pedang bersarung. |
| `bab-16-ilustrasi-01.webp` | Sesudah p-16-025 | Xiaolongnü bersarung tangan menghadapi Zhen; Fu mendengar. Tidak ada Dani dalam adegan. |
| `bab-16-ilustrasi-02.webp` | Sesudah p-16-095 | Guo Jing dan Huang Rong berseberangan; bayi tidak hadir, Huang Rong sudah melahirkan. |
| `bab-16-ilustrasi-03.webp` | Sesudah p-16-111 | Lengan kanan Dani hilang di atas siku dan tertutup kain; tangan kiri utuh. Tanpa pedang atau Kondor. |
| `bab-15-pembuka.webp` | Pembuka revisi | Guo Jing kiri merangkul Dani tengah. Xiaolongnü kanan menyentuh lengan Dani; tidak dirangkul Guo Jing. |

Wajah dan busana diperiksa terhadap gambar sumber. Gambar cedera tidak memperlihatkan luka terbuka atau anggota tubuh terlepas. Area potret tercatat sebagai koordinat pada `lore-data.json`; informasi cedera tidak terbuka sebelum adegan.

## Prompt produksi Bab 16

### bab-16-pembuka.webp

Rujukan: `bab-15-pembuka.webp`, `bab-11-ilustrasi-03.webp`.

```text
Use case: illustration-story. Create a NEW portrait 1024x1536 cinematic realistic wuxia novel chapter opener, same photographic historical costume-drama aesthetic and exact facial identities. Reference 1: Dani is young man CENTER in patched navy robe, use his face and clothes only. Reference 2: Guo Fu is girl on LEFT in red gold embroidered hanfu, use her face/hair/outfit only. Scene is a tense private confrontation in a modest temporary wooden refuge bedroom in Xiangyang, 13th-century China, cool early morning through lattice window. EXACTLY TWO people. Dani age19 is pale and exhausted, seated at edge of a low wooden bed, patched navy outer robe loosely over ivory inner garment, both arms and both hands still fully intact, a plain cloth bandage on right forearm from an earlier battle. His dark eyes look steadily at Guo Fu, expression wary, lips just beginning a strained reply. Guo Fu age17 stands on screen right beside the bed, fully clothed in modest red embroidered hanfu, red hair ribbon, eyebrows drawn in angry hurt pride, tears gathering but refusing to fall. Her own simple straight sword is sheathed at her waist. Dani's ornate brass-hilt straight sword remains sheathed leaning beside head of bed. Strong visual space between them, neither touching. Small wooden medicine bowl on side table, unadorned refuge room, no palatial throne. Medium-full two-person composition, both faces clearly readable. Mood of words becoming irreversible, no physical attack yet. No extra people, no sexualization, no gore, no severed limb, no glowing magic, no text, no watermark.
```

### bab-16-ilustrasi-01.webp

Rujukan: `bab-15-pembuka.webp`, `bab-08-ilustrasi-01.webp`, `bab-11-ilustrasi-03.webp`.

```text
Use case: illustration-story. NEW landscape 1536x1024 realistic cinematic wuxia narrative illustration, natural faces, detailed fabric, same identity continuity as refs. Reference1: Xiaolongnu is young woman on RIGHT in white, preserve face/hair. Reference2: Zhen Zhibing is Taoist man on RIGHT kneeling in dark gray-brown robes, preserve his lean face small mustache topknot; do not recreate that scene or include Dani. Reference3: Guo Fu is red-robed girl LEFT, identity only. Exactly three clear named protagonists in the courtyard corridor of a modest refugee dwelling in Xiangyang, cold predawn light with dim hanging lantern. Xiaolongnu age21 screen LEFT foreground, modest white layered hanfu, white flower hair ornament, fine white silk gloves, holding a newly drawn straight sword lowered diagonally before her, stern controlled fury facing Zhen. Zhen mature lean man screen RIGHT foreground, dark gray Taoist robe and hairpin topknot, face drained and fearful, one palm half raised trying to defend his accusation, his own sword still sheathed. Guo Fu age17 in red-gold hanfu stands middle background near an open doorway, looking between them with unsettled pride and shock. Two or three distant anonymous witnesses barely discernible, no extra dominant faces. Capture public exposure and confrontation through gestures and eyes, NOT a swordfight yet. Modest historically grounded costumes, no erotic content, no nudity, no depiction of assault, no blood, no magic, no text, no watermark, faces large enough for character-card crops.
```

### bab-16-ilustrasi-02.webp

Rujukan: `bab-15-pembuka.webp`, `bab-15-ilustrasi-03.webp`.

```text
Use case: illustration-story. NEW landscape 1536x1024 highly realistic cinematic historical wuxia painting, tactile cloth and skin, same identities. Reference1 Guo Jing is mature mustached man LEFT wearing gray-green/brown worn layered robe. Reference2 Huang Rong is mature woman LEFT in sage-green embroidered robe with jade hairpin; use her face and clothing but she has NOW ALREADY GIVEN BIRTH and wears loose modest postpartum robes, NOT heavily pregnant, no large pregnancy belly. EXACTLY TWO PEOPLE. In a damaged temporary refuge room in Xiangyang after a family tragedy, late afternoon light through lattice window. Guo Jing age39 stands screen LEFT, injured and pale but rigid with righteous grief, one hand braces on the back of wooden chair, other hand clenched at side. His eyes are reddened, controlled anger directed toward his wife, no raised weapon, no attack. Huang Rong age36 screen RIGHT stands near open door holding a simple bamboo staff, face exhausted and resolute yet guilty, turning partly toward the doorway while looking back at him. They stand several steps apart. An EMPTY rumpled bed and a fallen small medicine bowl appear quietly in background. No baby present. Nobody is in bed. No Guo Fu, no Dani. Mood: parental protection dividing a marriage, solemn moral conflict, avoid melodrama or exaggerated tears. Hands correct, no magical glow, no blood, no detached body parts, no lettering, no watermark. Both faces clear in three-quarter view.
```

### bab-16-ilustrasi-03.webp

Rujukan: `bab-15-pembuka.webp`.

```text
Use case: illustration-story. NEW landscape 1536x1024 realistic cinematic wuxia illustration, same exact Dani face/hair and patched dark navy robe as the young man CENTER in reference. ONLY ONE PERSON: Dani Moan age19, exhausted and pale, deep hurt and stubborn will to live. Late dusk in lonely reeds at edge of a wooded rocky rise outside Xiangyang, city wall small in distant background. Dani is seated against a low stone on screen center-left, face front three-quarter to camera, looking toward a distant mountain path. His anatomical RIGHT ARM has been amputated above the elbow: show NO right forearm and NO right hand. Right upper arm stump entirely wrapped in opaque cream cloth under a short collapsed torn navy sleeve, the stump held securely against his right torso by cloth binding. No exposed injury whatsoever. Anatomical LEFT ARM intact; his one visible LEFT HAND presses against the stone to support him, fingers anatomically correct. The empty lower right sleeve hangs folded with no limb inside, unmistakably not a second usable arm. A small cloth travel bundle secured on his back/left shoulder. NO sword: both swords left behind elsewhere. No bird or condor yet, no other characters, no gore, no exposed wound, no detached limb, no pools of blood, no horror. Fully clothed. Muted blue dusk and last amber sky, immersive texture and restrained emotional intensity. Face clearly readable for character card, no text, no letters, no watermark.
```

## Revisi pembuka Bab 15

```text
Use case: identity-preserve. Edit target: the supplied portrait-format wuxia chapter illustration. Correct ONLY the three protagonists' arrangement and embracing gesture. Preserve all three exact face identities, ages, facial proportions, hairstyles, outfits, photorealistic cinematic period-drama style, daylight, gate, carts and crowd. Required screen-left to screen-right order: Guo Jing (mature mustached man in dark green/gray robe), Dani Moan (19-year-old young man in patched navy robe) IN THE CENTER, Xiaolongnu (21-year-old woman in white) ON SCREEN RIGHT beside Dani. Guo Jing warmly puts one arm around ONLY Dani's shoulders, a clearly paternal uncle-nephew welcome. His embracing hand rests on Dani's far shoulder, never on Xiaolongnu. Dani and Guo Jing exchange a warm look. Xiaolongnu stands on Dani's other side, close to Dani, touching only Dani's forearm and looking at Dani with quiet affection. Dani physically separates the older man from the woman. No contact between Guo Jing and Xiaolongnu. Exactly these three foreground people. Natural anatomically correct arms and hands, no extra limbs, no doubled people, no romantic gesture from Guo Jing to the woman. Keep Dani's two arms whole. Both swords stay sheathed. Full figures, portrait 1024x1536, no letters, no text or watermark.
```

Rujukan/edit target: `bab-15-pembuka.webp` sebelum revisi. Hasil mengganti berkas yang diminta penulis, dengan versi cache baru. Prompt inti: pertahankan identitas, busana, gaya realistis dan gerbang; urutkan Guo Jing–Dani–Xiaolongnü dari kiri ke kanan. Guo Jing merangkul hanya bahu Dani, sedangkan Xiaolongnü berada di sisi lain dan menyentuh hanya lengan Dani. Kedua lengan Dani tetap utuh.
