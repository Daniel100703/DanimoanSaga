# Saga Dani Moan — Bab 1–9

Novel wuxia berilustrasi karya Daniel Halomoan Siregar.

**Baca langsung:** https://daniel100703.github.io/DanimoanSaga/

## Edisi dialog v4

- Percakapan Bab 1–8 disunting sesuai suara tokoh, usia, kedudukan, dan hubungan. Sapaan seperti Gugu, Shifu, Paman Guo, Bibi Guo, Qianbei, Dani-gege, dan Kak Ying mengikuti lawan bicara.
- Dialog tanpa label nama; atribusi ucapan diperjelas. Peristiwa, urutan adegan, ilustrasi lama, dan penanda paragraf lama dipertahankan. Pengantar singkat di sekitar beberapa dialog disesuaikan agar selaras dengan ucapan.
- Bab 9: **Di Hadapan Iblis Merah**, dengan satu pembuka dan dua ilustrasi peristiwa. Arc pertemuan sekutu dan penyelamatan Wushuang selesai dalam satu bab.
- Wiki Persilatan mengikuti paragraf bacaan. Tokoh baru tidak langsung memperoleh statistik kemampuan yang belum diperlihatkan. Kutipan bukti memakai naskah hasil revisi.
- Pembaruan diterapkan langsung melalui konektor GitHub. Pembaca cukup membuka situs; tidak perlu mengunggah berkas sendiri.

## Membaca

Gunakan daftar bab untuk berpindah, tombol A−/A+ untuk ukuran huruf, dan tombol tema untuk beralih antara tampilan krem dan gelap. Posisi baca tersimpan pada peramban yang dipakai.

Ketuk istilah bergaris bawah untuk membuka kartu lore. Kartu mengikuti pengetahuan pada paragraf itu, termasuk ketika membaca kembali bab lama. Wiki menyediakan pencarian, filter jenis, dan pilihan batas informasi. Memilih akhir bab yang lebih jauh akan membuka informasi sampai bab tersebut.

Potret tokoh diambil dari ilustrasi adegan yang sudah ada. Gambar, font, CSS, dan JavaScript berada sejajar dengan `index.html`; struktur ini aman untuk alamat proyek `/DanimoanSaga/`.

## Membangun halaman dari naskah

Repositori ini adalah situs statis; Python dipakai hanya saat menyusun halaman. Tidak memerlukan npm, database, API key, atau server aplikasi.

```bash
python3 build.py
```

Perintah itu membangun `index.html`, `wiki.html`, dan semua `bab-XX.html` dari `book.json`, `bab-XX.md`, serta `lore-data.json`. Catatan kontinuitas penulis tetap di Markdown dan tidak masuk ke halaman bacaan.

Untuk satu berkas HTML yang dapat dibaca tanpa internet:

```bash
python3 build.py --standalone Saga_Dani_Moan_Offline.html
```

Untuk memeriksa tampilan secara lokal:

```bash
python3 -m http.server 8000
```

Buka `http://localhost:8000` setelah server berjalan. Tekan Ctrl+C untuk menghentikannya.

## Menambahkan bab berikutnya

1. Tulis `bab-XX.md`, lalu tambahkan metadata bab, gambar, posisi ilustrasi, dan tokoh baru pada `book.json`.
2. Perbarui panjang bab dan tahap informasi di `lore-data.json`. Setiap tahap harus menunjuk paragraf yang benar; jangan memuat rahasia masa depan pada kartu awal.
3. Jalankan `python3 build.py`; periksa gambar, navigasi, wiki, serta tampilan ponsel dan desktop.
4. Commit seluruh berkas yang berubah beserta aset baru ke `main`. GitHub Pages menerbitkan situs dari cabang yang sudah dikonfigurasi.

Jangan menghapus aset lama yang masih dipakai bab atau potret tokoh. Penanda paragraf bab terdahulu dijaga agar bookmark dan tautan bukti tetap bekerja. Jangan memasukkan hasil HTML luring yang besar ke repositori; halaman situs sudah memakai aset bersama.
