# Pegangan penulisan setelah Bab 14

Diperbarui 12 Oktober 2026. Ini indeks kerja dan catatan posisi cerita, bukan pengganti lorebook, naskah lengkap, atau rujukan kanon. Periksa versi terbaru repositori sebelum melanjutkan.

## Proyek dan sumber

- Situs: https://daniel100703.github.io/DanimoanSaga/
- Repositori: https://github.com/daniel100703/DanimoanSaga, cabang `main`.
- Sumber utama penulis: `Saga_Dani_Moan_Lorebook_1.md` dan `Instruksi_Saga_Dani_Moan_v4.md`, tersedia sebagai lampiran/sumber proyek ChatGPT. Jika belum tersedia pada chat baru, minta berkasnya; jangan menebak isinya dari ringkasan ini.
- Urutan keputusan: arahan terbaru penulis, lorebook, kemudian kanon. Konflik yang sengaja mengikuti lore dicatat dalam editorial.
- Baca `editorial/pedoman-suara-dan-kontinuitas.md`, naskah bab terakhir, serta catatan kontinuitasnya. Buka bab lebih lama jika adegan yang akan ditulis merujuk peristiwa tersebut.

## Standar cerita yang harus dipertahankan

Model, kedalaman narasi, jumlah dan mutu ilustrasi, serta pemeriksaan kanon tidak diturunkan untuk menghemat pemakaian. Ringkas catatan kerja dan hasil teknis, bukan isi novel.

Satu arc diselesaikan dalam satu bab. Ikuti proses peta bab dalam instruksi penulis; peta Bab 14 sudah disetujui dan selesai diadaptasi. Peta Bab 15 belum disetujui. Panjang Bab 14 mendapat pengecualian 4.500–5.500 kata; jangan menjadikan pengecualian ini aturan panjang semua bab.

Untuk dialog kanon, periksa percakapan, maksud tokoh, urutan pengungkapan, dan pemicunya pada bagian sumber yang relevan. Tulis adaptasi dialog yang utuh sesuai lore Dani dan tahapan hubungan saat itu. Jangan menggantinya dengan ringkasan peristiwa atau membuat tokoh mengetahui masa depan. Jika versi berbeda, catat sumber dan pilihan adaptasinya.

Dani sekarang 19 tahun, Xiaolongnü 21. Kedua lengan Dani utuh. Dani masih lincah, jahil, genit, suka menyindir, dan mudah tersulut; belum menjadi sosok dingin permanen. Xiaolongnü polos dalam urusan dunia, punya perasaan dalam dan kehendak sendiri, dingin terhadap orang asing, tetapi hangat dan kadang bermain bersama Dani. Jangan membuatnya pasif atau kehilangan akal karena cinta. Tapak Melankolis belum tercipta.

## Posisi akhir Bab 14

Bab 14: **Bunga Cinta, Harga Sebuah Nyawa**, 5.362 kata cerita, 199 paragraf, satu pembuka dan lima ilustrasi adegan setelah tambahan wajah kartu pada 12 Oktober 2026. Naskah dan semua ilustrasi Bab 1–13 dipertahankan.

- Xiaolongnü sengaja menghindari makam setelah berpisah, mengalami gangguan tenaga karena rindu, lalu ditolong Gongsun. Ia menerima rencana nikah untuk memutus harapan Dani dan mencegah dirinya kembali. Penyangkalan runtuh saat Dani muntah darah. Pernikahan dengan Gongsun tidak terjadi.
- Pil utuh yang diselipkan Zhou Botong diberikan Dani kepada Xiaolongnü. Ia sembuh dari racun; Dani tetap keracunan.
- Qiu Qianchi menguasai lembah. Gongsun melarikan diri dengan satu mata terluka; Fan Yiweng hidup. Lü’e tetap di lembah dan masih hendak menolong pasangan.
- Setengah pil terakhir justru mempercepat tenggat Dani dari 36 menjadi 18 hari. Sisa obat dikuasai Qiu dengan tuntutan kepala Guo Jing. Dani belum bersumpah membunuhnya; janji kepada Cheng Ying untuk memastikan kebenaran masih berlaku.
- Dani dan Xiaolongnü meninggalkan rombongan Mongol, menuju Xiangyang bersama. Bambu patah; keduanya membawa Pedang Budiman dan Pedang Perempuan. Sarung tangan kembali kepada Xiaolongnü. Buntalan serta jarum Mu Nianci tetap bersama Dani.
- Perbedaan sadar terhadap kanon: pelaku pembunuhan Rou’er mengikuti lore, yaitu Qiu. Detail lainnya serta rujukan tersimpan di `editorial/bab-14-kontinuitas.md`.

## Rujukan dan visual

Gunakan rujukan per bagian yang telah dicatat dalam `editorial/bab-14-kontinuitas.md`; riset baru difokuskan pada arc yang akan ditulis, sambil membuka bagian terdahulu bila kontinuitas memerlukannya. Catatan sumber tidak menggantikan pemeriksaan ulang bagian kanon yang belum diverifikasi.

Arahan visual Bab 14 ada di `editorial/bab-14-visual.md`. Wajah dan usia mengacu pada gambar resmi yang sudah terbit. Potret kartu diambil dari ilustrasi adegan, bukan dibuat terpisah. Pertahankan aset lama. Kartu tokoh, ilmu, hubungan, dan kondisi mengikuti paragraf pengungkapan; informasi akhir bab tidak boleh tampil saat pembaca membuka bab lama.

## Penerbitan yang efisien

Sumber: `bab-XX.md`, `book.json`, `lore-data.json`, dan `edition-migration.json`. Jalankan `python3 build.py`; unggah berkas yang berubah saja. `reader-data.js` dihasilkan otomatis sebagai satu salinan data bersama untuk seluruh halaman. Jangan menyisipkan kembali seluruh wiki ke setiap HTML. Edisi `--standalone` tetap menyertakan data dan gambar agar dapat dibaca luring.

Jangan tampilkan HTML, JSON wiki, atau base64 gambar dalam percakapan. Baca bagian yang dibutuhkan, simpan hasil naskah dan ilustrasi, lalu lanjut dari hasil yang sudah ada jika tugas terputus. Sebelum menerbitkan, periksa naskah, ilustrasi, tautan, batas kartu, dan posisi baca. Cocokkan kepala `main` sebelum pembaruan; jangan menimpa perubahan lain. Satu akhir tugas harus meninggalkan catatan status yang bisa dibaca chat berikutnya.

## Status tugas 12 Oktober 2026

Enam kartu Bab 14 yang sebelumnya belum memiliki potret sudah dilengkapi: Kublai, Xiaoxiangzi, Nimoxing, Yin Kexi, Zhou Botong, dan Fan Yiweng. Dua ilustrasi tambahan memakai peristiwa yang sudah ada pada paragraf 5 dan 36; ID paragraf tidak bergeser. Atas koreksi penulis dalam sesi yang dilanjutkan, seruan “Gugu!” pada reuni Bab 14 diganti menjadi “Bibi!”. Tidak ada perubahan narasi lain. Sumber serta batas wajah dicatat di `bab-14-visual.md`. Sapaan berikutnya tetap Bibi, sesuai pedoman terbaru.

`editorial/peta-bab-15.md` dan `peta-bab-15.html` memuat usulan **Nyawa yang Tak Jadi Ditagih**, seluruh Babak IX, dengan lima bagian. Usulan pengecualian panjang 4.500–5.500 kata dan enam ilustrasi belum disetujui. Bab 16 hanya dipetakan sebagai batas arc Tragedi; rencana rincinya belum dibuat. Jangan menulis naskah atau membuat gambar Bab 15 sebelum persetujuan. Perhatian khusus: syarat Qiu tetap kepala Guo Jing; tawaran kepala Huang Rong adalah pengganti yang belum dijamin diterima, Polu menggantikan bayi Xiang, kedua Wu sudah tahu penolakan perjodohan pada Bab 11, dan Wu Santong bukan orang baru.

## Pesan pembuka yang dapat dipakai

> Lanjutkan proyek Saga Dani Moan dari versi terbaru repositori dan baca `editorial/pegangan-chat-berikutnya.md`. Gunakan lorebook serta instruksi v4 pada sumber proyek. Baca bab terakhir dan kontinuitas yang relevan. Pertahankan model, kedalaman narasi, visual, dan dialog kanon yang diadaptasi sesuai lore serta tahap hubungan; hemat pekerjaan teknis berulang. Ikuti proses persetujuan peta bab yang berlaku.
