# Pegangan untuk melanjutkan Saga Dani Moan

Pembaruan 12 Oktober 2026: Bab 15 **Nyawa yang Tak Jadi Ditagih** selesai berdasarkan peta yang disetujui melalui “oke lanjutkan”, lalu “Lanjutkan tugas ini”. Naskah 5.251 kata, 196 paragraf, enam ilustrasi termasuk pembuka. Bab 16 belum mempunyai rencana rinci atau persetujuan penulisan.

## Sumber dan cara melanjutkan

Repositori `daniel100703/DanimoanSaga`, cabang `main`; situs https://daniel100703.github.io/DanimoanSaga/. Periksa kepala cabang sebelum bekerja agar tidak menimpa perubahan penulis. Baca `bab-15.md`, `editorial/bab-15-kontinuitas.md`, dan tahap wiki terakhir tokoh terkait, lalu sumber proyek:

- `project_sources/02-Saga_Dani_Moan_Lorebook_1.md` dan `project_sources/03-Instruksi_Saga_Dani_Moan_v4.md` pada ruang kerja unggahan; versi DOCX juga tersedia.
- `editorial/pedoman-suara-dan-kontinuitas.md`: koreksi terbaru, termasuk Dani lincah sebelum kehilangan lengan dan sapaan **Bibi**, bukan Gugu.
- `editorial/peta-bab-15.md`: seluruh Babak IX untuk Bab 15; Babak X Tragedi sebagai batas Bab 16. Batas arc bukan persetujuan otomatis rencana rinci berikutnya.

Prioritas: perintah terbaru penulis, lorebook, kemudian kanon. Jangan meminta unggah ulang selama sumber masih tersedia. Sebelum bab baru: maksimal lima poin lore, rencana maksimal lima baris berikut penyimpangan kanon, lalu tunggu persetujuan. Jangan menutup dengan pertanyaan penawaran generik. Target umum 2.500–3.500 kata; pengecualian Bab 15 tidak otomatis berlaku pada bab berikutnya.

## Keadaan akhir Bab 15

- Dani 19, Xiaolongnü 21, Fu 17, Xiang 10; Polu bayi baru lahir. Kedua lengan Dani utuh. Tapak Melankolis belum tercipta. Dani tetap jahil, bukan dingin permanen.
- Dani menyelamatkan Guo Jing di tembok dan kamp. Feng Mofeng gugur menahan Jinlun. Guo Jing masih dalam pemulihan. Dani memilih tidak menagih kepalanya untuk penawar, tetapi kebenaran Kang belum lengkap dan janji memastikan kesalahan kepada Cheng Ying masih berlaku.
- Enam hari berlalu sejak setengah pil Bab 14. Sisa dua belas hari menurut hitungan lama; akibat racun jarum yang masuk ketika menolong kedua Wu belum diketahui, bukan penawar pasti. Dani masih lemah. Kedua Wu hidup dan masih dirawat.
- Huang Rong melahirkan Polu. Ia mengetahui racun Dani dan menawarkan kepala sebagai pengganti sesudah bahaya lewat. Qiu tetap meminta kepala Guo Jing; penerimaan pengganti tidak dijamin dan tawaran belum dilaksanakan. Dani belum mendengar percakapan rahasia Huang–Xiaolongnü.
- Xiaolongnü sempat ingin membawa bayi ke lembah, lalu menerima keberatan Dani dan hendak mengembalikannya. Li Mochou merebut Polu, salah mengira anak pasangan itu. Bayi yang sama masih dalam tangannya; tidak ada penemuan kembali atau penculikan kedua.
- Dani mengaku menerima restu perjodohan yang diperbarui demi menghentikan duel Wu. Itu dusta. Xiaolongnü mendengar tanpa permohonan awal Wu Santong, mengira Dani memilih Fu, lalu pergi. Ia menitipkan kuda kepada Zhu Ziliu, tetap mencintai Dani dan membawa Pedang Perempuan serta sarung tangan. Niat menyerahkan pedang kepada Fu belum terlaksana.
- Wu Santong membawa Dani pulang dan memohon ampun. Fu terguncang, malu, defensif, tetapi membantu perawatan; belum mengonfrontasi tipu restu. Pedang Budiman, buntalan dan jarum ibu ada di kediaman perlindungan setelah kebakaran. Zhen belum membocorkan; tragedi lengan belum terjadi.

## Penerbitan dan visual

Sumber: `bab-XX.md`, `book.json`, `lore-data.json`; jalankan `python3 build.py`. Data bersama `reader-data.js` menghindari wiki disalin ke setiap HTML. Tambahan bab tidak perlu migrasi posisi selama naskah lama dan ID paragraf tidak bergeser.

Potret diambil dari ilustrasi adegan, bukan dibuat tersendiri. Guo Polu satu-satunya tokoh baru Bab 15: dikenal pada p-15-121, wajah tersedia mulai p-15-140. Tokoh lama mendapat status, hubungan, serta potret menurut adegan; batas lama dipertahankan. Arahan lengkap dan prompt produksi ada di `editorial/bab-15-visual.md`. Gambar tembok telah diperbaiki supaya Dani berada di atas menyelamatkan Guo Jing di bawahnya.

Enam wajah Bab 14 yang semula kosong sudah dilengkapi dan seruan reuni dikoreksi menjadi Bibi pada pekerjaan sebelumnya. Naskah Bab 1–14 tidak diubah dalam penerbitan Bab 15. Terdapat 62 gambar cerita unik ditambah satu sampul utama.

Periksa cerita, gambar, wajah kartu, batas paragraf, tautan, dan tampilan sebelum menerbitkan. Unggah hanya berkas berubah; jangan menampilkan base64/JSON wiki atau memasukkan HTML luring besar ke repositori. Cocokkan kepala `main` sebelum pembaruan, jangan menimpa perubahan lain. Simpan status akhir agar sesi terputus dapat dilanjutkan dari hasil yang ada.
