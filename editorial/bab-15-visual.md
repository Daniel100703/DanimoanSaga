# Ilustrasi Bab 15 — Nyawa yang Tak Jadi Ditagih

Peta, panjang 4.500–5.500 kata, dan enam gambar disetujui penulis pada 12 Oktober 2026. Semua ilustrasi diproduksi dengan **imagegen bawaan** memakai gambar resmi Saga sebagai rujukan wajah, kemudian disimpan sebagai WebP berkualitas 93. Aset bab terdahulu dipertahankan. Potret memakai area pada gambar adegan melalui CSS; tidak ada gambar potret terpisah.

## Aset dan penempatan

| Berkas | Ukuran | Penempatan | Adegan |
| --- | --- | --- | --- |
| `bab-15-pembuka.webp` | 1024 × 1536 | Pembuka | Sambutan Guo Jing di Xiangyang. |
| `bab-15-ilustrasi-01.webp` | 1536 × 1024 | Sesudah p-15-027 | Dani bertaut pada tali dan meraih Guo Jing di bawahnya; Xiaolongnü membantu dari atas tembok. |
| `bab-15-ilustrasi-02.webp` | 1536 × 1024 | Sesudah p-15-067 | Feng Mofeng menahan Jinlun agar Dani dapat membawa Guo Jing menuju kuda. |
| `bab-15-ilustrasi-03.webp` | 1536 × 1024 | Sesudah p-15-099 | Huang Rong yang hamil tua menawarkan pengorbanannya kepada Xiaolongnü dalam percakapan malam. |
| `bab-15-ilustrasi-04.webp` | 1536 × 1024 | Sesudah p-15-140 | Li Mochou menggendong Guo Polu yang baru direbut; Dani dan Xiaolongnü meminta bayi dikembalikan. |
| `bab-15-ilustrasi-05.webp` | 1536 × 1024 | Sesudah p-15-160 | Xiaolongnü mendengar dari balik pohon ketika Dani mengaku akan menikahi Fu di depan kedua Wu. |

## Pemeriksaan visual

Wajah, busana, serta usia mengikuti gambar rujukan terdahulu. Kedua lengan Dani utuh. Huang Rong hamil dalam percakapan sebelum kelahiran; bayi Polu baru muncul pada ilustrasi penculikan. Pedang dan sarung tangan sesuai adegan. Gambar penyelamatan di tembok direvisi satu kali karena hasil pertama membalik posisi kedua lelaki: hasil yang dipakai menempatkan Dani di atas dan Guo Jing di bawah, bertumpu pada tali yang ditahan penolong. Gambar awal yang salah tidak dimasukkan ke situs. Tidak ada gore, tulisan, atau simbol tenaga sihir.

## Potret pada kartu

Batas potret: pembuka 150001; pengorbanan Feng 150067; percakapan Huang 150099; perebutan bayi 150140; kebohongan perjodohan 150160. Area wajah persis tersimpan pada `lore-data.json`. Potret tidak mengubah usia, membuka peristiwa masa depan, atau menggantikan potret pada fase kanak-kanak. Guo Polu baru dikenal pada p-15-121 dan mendapat gambar setelah ilustrasi pada p-15-140.

## Prompt produksi

Semua prompt berikut memakai mode bawaan dengan latar tidak transparan. Berkas rujukan hanya menetapkan wajah, usia, busana, dan gaya; adegan baru ditentukan naskah.

### bab-15-pembuka.webp

Rujukan: `bab-14-ilustrasi-02.webp`, `bab-11-ilustrasi-05.webp`.

```text
Use case: illustration-story. Create a NEW portrait chapter opener, 1024x1536, for an Indonesian wuxia novel. Reference 1 is identity/clothing reference for Dani (young man left) and Xiaolongnu (white woman middle); reference 2 is identity reference for Guo Jing on right. Same highly detailed realistic cinematic historical painting, tactile fabrics, natural faces. Scene: arrival inside Xiangyang's tall weathered stone gate, 13th-century Chinese fortress. Three main people at medium-full distance: Dani age19 handsome long black half-tied hair wearing worn indigo patched robe, small travel bundle and sheathed straight sword at waist, both arms intact; Xiaolongnu age21 slender beautiful adult in flowing modest white hanfu with small white hair ornament and a sheathed sword, standing close beside him; Guo Jing age39 broad mature face short beard and dark teal/brown layered cloth robes, warmly welcoming him with a hand on his shoulder. Dani's smile is tentative and burdened, Xiaolongnu watchful. Background refuge carts and indistinct guards, tall gate and distant banners, morning dusty sunlight, subdued ochre/indigo/white palette. This is a warm reunion with hidden anxiety, not the angry confrontation in references. Preserve exact facial identities; no Gongsun character, no wedding, no text, no letters, no watermark, no magic, no futuristic armor. Make all three faces readable.
```

### bab-15-ilustrasi-03.webp

Rujukan: `bab-12-ilustrasi-02.webp`, `bab-14-ilustrasi-02.webp`.

```text
Use case: illustration-story. New landscape 1536x1024 emotionally intimate cinematic realistic wuxia painting consistent with references' actual facial identities and natural textiles. Reference1: Huang Rong is mature woman in sage-green brocade at RIGHT; reference2: Xiaolongnu is white-robed young woman in middle. ONLY these TWO women in frame, no men. Scene night inside modest wooden room in besieged Xiangyang, low candle, latticed window cool moonlight. Huang Rong age36, visibly late pregnant under loose sage green patterned hanfu, hair pinned up with jade flower, sits left on a wooden chair, one hand resting on belly, looking directly at Xiaolongnu with calm grave self-sacrificing resolve. Xiaolongnu age21 in plain elegant flowing white hanfu with small white hair ornament, long half-down black hair, sits right slightly leaning toward her, tearful shocked compassion, hands clasped on lap, sheathed slim straight sword beside chair. They are discussing an unbearable offer, not fighting. Medium shot shows faces distinctly and hands naturally; different ages discernible. Warm lamp beside cool dim doorway at back, quiet dramatic depth, no glam beauty filter, no baby yet, no text, no watermark, no fantasy lights, no graphic violence.
```

### bab-15-ilustrasi-04.webp

Rujukan: `bab-14-ilustrasi-02.webp`, `bab-13-ilustrasi-01.webp`.

```text
Use case: illustration-story. New landscape1536x1024 cinematic realistic historical wuxia painting matching reference faces and subdued tactile historical clothing. Reference1 is Dani left age19 patched indigo robe and Xiaolongnu center white robe age21; reference2 Li Mochou is purple-robed adult woman at far LEFT, use exactly that elegant cool face, age35. Scene in smoky stone-paved narrow alley near Xiangyang at dusk, red firelight distant. Foreground RIGHT Li Mochou has just seized and is holding a small NEWBORN boy securely in both arms, entirely clothed in cream swaddling blanket, tiny newborn face fully visible near center-right, eyes closed and safe with supported head. Her expression is composed faintly mocking, not monstrous. Foreground LEFT wounded Dani with a plain bandage on right forearm and both arms intact reaches urgently with empty left hand toward baby, sword lowered safely away in right hand. Xiaolongnu middle behind Dani turns toward Li Mochou, stricken and protective, her white sleeves dusty, slim straight sword held low and away from baby. Three adults only plus ONE tiny newborn, clearly different adult faces. All weapons well away from baby, no direct harm or gore. Focus meaningful faces and baby's clearly visible face so it can be cropped for a cast card. No weapons touching body, no beheading, no text or panels/watermarks. Background smoke gives atmosphere without obscuring people.
```

### bab-15-ilustrasi-05.webp

Rujukan: `bab-14-ilustrasi-02.webp`, `bab-11-ilustrasi-03.webp`.

```text
Use case: illustration-story. New landscape1536x1024 cinematic realistic historical wuxia painting, same natural detailed faces, textile detail and painting finish as references. Reference1 Dani left patched indigo19 male and Xiaolongnu middle white21 woman; reference2 brothers Wu Dunru second from left dark slate robes age17, Wu Xiuwen third from left sage green robes age16. ONLY these four people. Scene a wooded rocky clearing outside Xiangyang at night with credible cool moonlight and faint warm distant city glow. Foreground RIGHT Xiaolongnu stands partially behind dark tree trunk listening unseen, her face clear in three-quarter profile, stunned with restrained tears, lips parted, white hanfu and small white hair ornament, sheathed narrow straight sword held against her side. In middle LEFT background Dani, right forearm wrapped with plain bandage, both arms intact, standing between and addressing the two brothers with a brittle teasing smile and firm theatrical gesture, his sheathed sword visible. The brothers have lowered their swords, looking at him with angry disbelieving faces, not looking at Xiaolongnu. Their spatial separation matters: Dani DOES NOT SEE Xiaolongnu and her hurt expression is emotional focus. Clear quiet tragic scene, no embrace, no wedding, no Guo Fu present, no elderly man, no flames on trees, no magic, no text or watermark. All figures anatomically plausible, no duplicate people.
```

## Revisi penulis 13 Oktober 2026

Pembuka lama diganti. Urutan kiri ke kanan kini Guo Jing, Dani, Xiaolongnü. Guo Jing hanya merangkul Dani, dan tiga potret dari gambar ini dipetakan ulang. Rincian produksi revisi ada pada `bab-16-visual.md`.
