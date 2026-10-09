# Saga Dani Moan — Bab 1–10

Novel wuxia berilustrasi karya Daniel Halomoan Siregar.

**Baca langsung:** https://daniel100703.github.io/DanimoanSaga/

## Edisi revisi Bab 1–10

- Bab lama 2–3 digabung menjadi **Malapetaka di Kediaman Lu**. Kesembilan ilustrasi dari kedua bab tetap hadir, termasuk kedua pembuka lama.
- Riwayat perkenalan Quanzhen diperbaiki: Zhen Zhibing muncul sejak Bab 5, kemudian hadir kembali dalam gangguan latihan, pertemuan di dekat gubuk, dan tragedi Bab 8.
- Bab 6–8 memperjelas sumpah makam, kedekatan Dani dan Xiaolongnü setelah dewasa, jahitan jubah dengan jarum ibunya, pertengkaran, rekonsiliasi saat hujan, dan sebab perpisahan.
- Sapaan memakai bahasa Indonesia. Dialog mengalir melalui atribusi naratif tanpa format `Nama: ucapan`.
- Bab 10: **Dua Nama di Bawah Salju**, dengan satu pembuka dan dua ilustrasi peristiwa. Pertemuan serta warisan dua tetua selesai dalam satu arc.
- Semua 33 ilustrasi lama dipertahankan. Empat ilustrasi baru ditambahkan: rekonsiliasi hujan dan tiga gambar Bab 10.
- Wiki berisi 52 catatan dengan 178 tahap informasi. Kartu mengikuti paragraf bacaan; penguasaan ilmu Dani dibedakan dari kekuatan gurunya.
- Penanda baca edisi lama dipetakan ke adegan terdekat dalam pembagian baru. Tema dan ukuran huruf tetap tersimpan. Salinan posisi sebelum revisi tetap disimpan di peramban.

## Pembaruan narasi dan Bab 9

Bab 9 ditulis ulang untuk memulihkan latar dendam Wanyan Ping, perkenalan keluarga Yelü, dan identitas penolong yang masih dirahasiakan. Bab 1–8 serta 10 mendapat revisi terarah pada motivasi dan pikiran langsung tokoh. Sampul utama kini menggunakan ilustrasi konseptual tersendiri; semua 37 ilustrasi cerita tetap dipertahankan.

- [Catatan revisi](editorial/revisi-2026-10-08.md)
- [Peta Bab 11 untuk persetujuan penulis](https://daniel100703.github.io/DanimoanSaga/peta-bab-11.html) — belum menjadi bab terbit.

## Membaca

Gunakan daftar bab untuk berpindah, tombol A−/A+ untuk ukuran huruf, dan tombol tema untuk beralih antara tampilan krem dan gelap. Posisi baca tersimpan pada peramban yang dipakai.

Ketuk istilah **tebal bergaris bawah** untuk membuka kartu lore. Kartu mengikuti pengetahuan pada paragraf itu, termasuk ketika membaca kembali bab lama. Wiki menyediakan pencarian, filter jenis, dan pilihan batas informasi. Memilih akhir bab yang lebih jauh akan membuka informasi sampai bab tersebut.

Potret tokoh diambil dari ilustrasi adegan yang sudah ada. Gambar, font, CSS, dan JavaScript berada sejajar dengan `index.html`; struktur ini aman untuk alamat proyek `/DanimoanSaga/`.

## Membangun halaman dari naskah

Repositori ini adalah situs statis; Python dipakai hanya saat menyusun halaman. Tidak memerlukan npm, database, API key, atau server aplikasi.

```bash
python3 build.py
```

Perintah itu membangun `index.html`, `wiki.html`, peta editorial `peta-bab-11.html`, dan semua `bab-XX.html` dari `book.json`, `bab-XX.md`, serta `lore-data.json`. Catatan kontinuitas penulis tetap di Markdown dan tidak masuk ke halaman bacaan.

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

Jangan menghapus aset lama yang masih dipakai bab atau potret tokoh. Jika revisi mengubah nomor bab atau paragraf, perbarui pemetaan `edition-migration.json` dan kutipan bukti wiki. Jangan memasukkan hasil HTML luring yang besar ke repositori; halaman situs sudah memakai aset bersama.
