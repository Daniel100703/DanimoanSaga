# Saga Dani Moan — Webnovel Bab 1–6

Pembaca novel berilustrasi untuk HP dan desktop. Naskah Bab 1–5 memakai atribusi dialog dalam prosa; Bab 6 mengikuti naskah yang sudah selesai. Ilustrasi berasal dari edisi sebelumnya.

## Membaca sekarang

Ekstrak ZIP, lalu buka `index.html` dengan browser. Semua bab, gambar, dan font ada di dalam paket. Tidak perlu memasang Node.js, npm, atau database.

- Beranda memuat daftar enam bab dan tombol lanjut membaca.
- Tombol daftar bab tersedia ketika membaca, termasuk pada HP.
- Tombol A−/A+ mengatur huruf dari 16–26 px. Ukuran awal 18 px pada HP dan 20 px pada desktop.
- Tombol bulan mengganti tema krem/gelap.
- Posisi baca, ukuran huruf, dan tema disimpan pada browser/perangkat yang sama. Data ini belum disinkronkan antarperangkat.
- Tokoh dan catatan kontinuitas berada di bagian lipat setelah cerita.

Edisi HTML satu file yang disertakan terpisah juga bisa dibuka langsung. Untuk hosting, gunakan paket ini: aset terpisah dapat disimpan dalam cache browser dan dimuat per bab.

## Memasang di GitHub Pages

1. Buat repository baru, misalnya `saga-dani-moan`. Pada GitHub Free, gunakan repository **Public** untuk GitHub Pages. Isi yang diterbitkan dapat dibaca melalui internet.
2. Pada repository, pilih **Add file → Upload files**. Unggah **isi folder hasil ekstraksi**, sehingga `index.html`, `bab-01.html`, dan folder `assets` berada langsung di tingkat teratas repository. Jangan unggah ZIP sebagai pengganti isinya.
3. Buka **Settings → Pages**. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch **main** dan folder **/(root)**, lalu **Save**.
5. Tunggu proses penerbitan selesai. GitHub menampilkan alamat situs pada halaman Pages, biasanya `https://USERNAME.github.io/saga-dani-moan/`.

Semua tautan bab dan aset menggunakan jalur relatif, sehingga dapat bekerja di alamat proyek seperti `/saga-dani-moan/`. Tidak perlu mengubah URL di kode. File `.nojekyll` sudah disertakan; jika unggahan melalui browser melewatkannya, tambahkan file kosong bernama `.nojekyll` pada root repository.

Paket ini sudah disiapkan untuk deploy, tetapi belum diterbitkan ke akun GitHub mana pun.

## Mengubah bab yang tersedia

1. Edit naskah di `content/chapters/bab-01.md` hingga `bab-06.md`.
2. Metadata judul, ilustrasi, dan kartu tokoh berada di `content/book.json`.
3. Dengan Python 3, jalankan perintah berikut dari folder ini:

```bash
python build.py
```

4. Buka `index.html` untuk memeriksa hasil, lalu unggah perubahan ke repository. GitHub Pages menerbitkan ulang setelah perubahan masuk ke branch sumber.

Naskah dibagi menjadi paragraf dengan baris kosong. `***` adalah pemisah adegan. `---` memisahkan cerita dari catatan kontinuitas. Setiap ilustrasi mempunyai `anchor`: potongan teks unik dari paragraf tempat gambar ditampilkan. Jika paragraf tersebut diubah, perbarui anchor yang bersangkutan. Builder akan berhenti bila sebuah ilustrasi kehilangan tempatnya.

## Menambahkan bab berikutnya

1. Buat `content/chapters/bab-07.md` dengan pola judul, cerita, pemisah, dan catatan yang sama.
2. Duplikat satu objek bab di `content/book.json`, lalu ubah `id`, `slug`, `source`, `han`, `title`, `description`, `quote`, dan `accent`. Contoh: `id: 7`, `slug: "bab-07"`, `source: "bab-07.md"`, dan `han: "七"`.
3. Simpan ilustrasinya di `assets/images/`. Pada metadata gambar, isi jalur relatif serta ukuran piksel yang benar. Perbarui `plates` dan `cast` sesuai bab baru.
4. Jalankan `python build.py`. Daftar isi serta tombol bab sebelumnya/berikutnya dibuat otomatis dari urutan dalam `book.json`.

Font aksara bab dalam paket ini memuat angka Tionghoa dasar sampai ratusan. Font isi memuat karakter Latin yang digunakan dalam naskah. Jika menambahkan aksara dari bahasa lain, perluas font yang sesuai.

## Membuat HTML satu file

```bash
python build.py --standalone Saga_Dani_Moan_Webnovel.html
```

Semua gambar, font, gaya, dan kontrol baca akan ditanamkan ke file tersebut. Ukurannya lebih besar daripada satu halaman bab biasa karena memuat seluruh isi buku.

## Menjalankan server lokal (opsional)

```bash
python -m http.server 8000
```

Buka `http://localhost:8000` di browser. Ini berguna untuk menguji perilaku situs sebelum deploy, meskipun pembaca juga dapat dibuka dari file lokal.

## Struktur paket

| Berkas/folder | Fungsi |
| --- | --- |
| `index.html` | Beranda dan daftar bab |
| `bab-01.html` … `bab-06.html` | Halaman bacaan yang sudah siap ditayangkan |
| `assets/reader.css` | Desain responsif dan dua tema |
| `assets/reader.js` | Navigasi, pengaturan huruf, dan penanda baca |
| `assets/images/` | 24 ilustrasi yang dipakai ulang |
| `assets/fonts/` | Font lokal, tanpa CDN |
| `content/book.json` | Metadata buku dan bab |
| `content/chapters/` | Naskah Markdown |
| `build.py` | Pembuat HTML menggunakan pustaka standar Python |

Tidak ada layanan eksternal yang diperlukan oleh pembaca. Sistem ini belum menyediakan akun pengguna, komentar, panel admin, atau sinkronisasi kemajuan antarperangkat.

## Referensi deployment

Dokumentasi resmi diperiksa 3 Oktober 2026:

- GitHub Docs, [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- GitHub Docs, [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
- GitHub Docs, [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).
