# Saga Dani Moan — Bab 1–8 + Wiki Persilatan

Edisi 4 Oktober 2026. Novel berilustrasi karya Daniel Halomoan Siregar.

## Isi pembaruan

- Bab 8, **Yang Tak Sempat Dikatakan**, dengan tiga ilustrasi baru. Xiaolongnü memperbaiki jubah biru Dani memakai alat jahit Mu Nianci sebagai bagian perkembangan hubungan mereka.
- Kartu lore di seluruh Bab 1–8: tokoh, ilmu, senjata, kondisi, perguruan, dan benda bermakna. Ketuk istilah bergaris bawah untuk membukanya.
- Wiki Persilatan dengan pencarian, jenis, dan batas informasi. Kemampuan yang belum muncul tetap belum diketahui. Kartu di tengah cerita mengikuti paragraf tempat dibuka.
- Ringkasan ilmu dan bahaya di akhir bab. Kartu tokoh berisi kemampuan, tingkat bila sudah layak diungkapkan, kondisi, dan bukti adegan.
- Tema krem/gelap, ukuran huruf, serta posisi baca. Teks dan ID paragraf Bab 1–7 dipertahankan. Catatan penulis yang memuat informasi masa depan tetap tersimpan dalam Markdown, tidak ditampilkan dalam bacaan.

## Memperbarui situs yang sudah berisi Bab 1–7

1. Unduh dan ekstrak **Saga_Dani_Moan_Update_Bab_08_dan_Wiki.zip**.
2. Buka repository **Daniel100703/DanimoanSaga**, di folder yang memuat `index.html`, pada branch yang dipakai GitHub Pages.
3. Gunakan **Add file → Upload files**. Unggah **seluruh file hasil ekstraksi**, termasuk halaman Bab 1–7 yang diperbarui, CSS, JavaScript, dan wiki. Jangan hanya mengunggah `bab-08.html`, dan jangan mengunggah ZIP-nya.
4. Simpan melalui **Commit changes**. Tunggu penerbitan Pages untuk commit itu selesai pada tab **Actions**.
5. Muat ulang situs. Jika masih menampilkan versi lama, gunakan **Ctrl+F5** pada desktop atau muat ulang/buka tab baru pada ponsel.

Paket menimpa berkas bernama sama dan menambahkan berkas baru. Jangan menghapus ilustrasi, font, atau bab lama yang tidak terdapat dalam ZIP update. Semua berkas tetap sejajar dengan `index.html`, tanpa folder `assets` atau `content`.

Jika situs masih Bab 1–6, susunan filenya berbeda, atau ada aset hilang, gunakan **Saga_Dani_Moan_GitHub_Pages.zip** versi terbaru. Paket lengkap mencakup seluruh Bab 1–8 dan asetnya. Ekstrak dan unggah semua berkas ke lokasi yang sama dengan `index.html`.

## Membaca langsung tanpa GitHub

- **Saga_Dani_Moan_Bab_01-08_Webnovel.html** memuat seluruh bab, gambar, font, dan wiki dalam satu berkas. Unduh lalu buka di browser seperti Chrome; pratinjau dokumen yang tidak menjalankan JavaScript tidak dapat mengoperasikan kartunya.
- Paket lengkap juga dapat dibaca dengan membuka `index.html` setelah diekstrak. Pertahankan semua berkas dalam satu folder.
- Tidak diperlukan akun pembaca, internet untuk aset, npm, atau database. Posisi baca tersimpan pada browser/perangkat yang sama. Bookmark situs daring tidak otomatis dipindahkan ke file lokal karena alamat penyimpanannya berbeda.

## Batas informasi

- Kartu dari kalimat hanya memuat informasi sampai adegan tersebut, sekalipun pembaca telah menamatkan bab berikutnya.
- Wiki memakai posisi baca tersimpan. Pilihan **Akhir Bab…** membuka rangkuman bab tertentu; memilih bab yang belum dibaca dapat membuka informasi bab itu.
- **Belum diketahui/belum terukur** bukan berarti lemah. Tingkat kekuatan, penguasaan ilmu, cedera, dan bahaya pada suatu pertarungan dibedakan.
- Bukti dapat dibuka melalui **Lihat dasar dalam cerita → Baca adegan**.
- Batas informasi melindungi pengalaman membaca, bukan menyembunyikan isi berkas dari pemeriksaan kode sumber.

## Menambah bab berikutnya

| Berkas | Fungsi |
| --- | --- |
| `bab-01.md` sampai `bab-08.md` | Naskah dan catatan kontinuitas pengarang. |
| `book.json` | Judul, urutan bab, ilustrasi, dan tokoh baru. |
| `lore-data.json` | Isi kartu dan tahap pembukaan menurut bab/paragraf. |
| `build.py`, `lore.py` | Pembuat halaman statis; hanya memerlukan Python 3. |
| `reader.js`, `lore.js`, `reader.css` | Antarmuka membaca dan wiki. |

Untuk membangun ulang setelah menyunting, jalankan dari folder ini:

```bash
python build.py
```

Untuk membuat edisi satu HTML:

```bash
python build.py --standalone Saga_Dani_Moan_Webnovel.html
```

Untuk Bab 9: tambahkan `bab-09.md`, metadata pada `book.json`, dan ilustrasi dalam folder ini. Tambahkan panjang bab serta entri/tahap baru pada `lore-data.json` sesuai bukti naskah. Jangan mengisi kekuatan otomatis untuk tokoh yang belum memperlihatkannya. Pertahankan urutan paragraf lama agar bookmark dan rujukan bukti tetap benar. Bangun ulang, lalu unggah berkas baru/berubah; halaman HTML lama ikut diperbarui untuk navigasi.

Paket siap diunggah pemilik repository. Pembuatan paket ini tidak mengubah situs GitHub secara otomatis.
