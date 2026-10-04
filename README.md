# Saga Dani Moan — Bab 1–7

## Update Bab 7 — Janji di Bawah Tanah

Paket pembaruan Bab 7 ditujukan untuk situs yang sudah memakai edisi satu folder dan menampilkan Bab 1–6 dengan benar.

1. Unduh `Saga_Dani_Moan_Update_Bab_07.zip`, lalu ekstrak.
2. Buka repository **Daniel100703/DanimoanSaga → Add file → Upload files**, pada branch **main**.
3. Unggah **seluruh file hasil ekstraksi** ke lokasi yang sama dengan `index.html`. Jangan unggah ZIP-nya. File bernama sama akan diperbarui; file Bab 7 akan ditambahkan.
4. Pilih **Commit changes**. Tunggu proses terbaru di **Actions** selesai dengan centang hijau.
5. Muat ulang situs dengan **Ctrl+F5**. Daftar isi sekarang memuat tujuh bab, dan tombol berikutnya pada Bab 6 menuju Bab 7.

Pembaruan berisi satu bab baru, tiga gambar baru, naskahnya, metadata buku, panduan ini, serta halaman HTML yang berubah. Halaman Bab 1–6 ikut diperbarui agar daftar bab dan navigasi mengenali Bab 7; isi ceritanya tetap sama. Gambar/font/CSS/JavaScript lama tidak perlu diunggah ulang. Posisi baca Bab 1–6 tetap memakai ID paragraf dan kunci penyimpanan yang sama.

Paket lengkap `Saga_Dani_Moan_GitHub_Pages.zip` juga sudah mencakup Bab 1–7 dan semua aset. Paket lengkap dipakai untuk pemasangan baru atau pemulihan, sedangkan paket update dipakai untuk menambah bab pada situs yang sudah berjalan.

Edisi perbaikan deploy, 3 Oktober 2026. Semua file sekarang berada dalam satu folder. HTML, CSS, JavaScript, font, gambar, naskah, dan builder memakai jalur yang sesuai dengan struktur ini.

## Memperbaiki situs yang sudah terbit

1. Unduh ZIP versi ini, lalu **Extract All / Ekstrak Semua**. Buka folder hasil ekstraksi. Di dalamnya harus langsung terlihat `index.html`, `reader.css`, dan file gambar `.webp`.
2. Buka repository `Daniel100703/DanimoanSaga`, pada tab **Code** dan branch **main**.
3. Pilih **Add file → Upload files**.
4. Dari folder hasil ekstraksi, pilih seluruh file dengan **Ctrl+A**, lalu seret ke area unggah GitHub. Unggah file hasil ekstraksi, bukan file ZIP atau folder pembungkusnya. Seluruh file diletakkan di lokasi yang sama dengan `index.html` yang sudah ada.
5. Isi pesan commit, misalnya `Perbaiki jalur CSS dan ilustrasi`, lalu pilih **Commit changes** ke branch `main`. File dengan nama sama akan diperbarui. Tidak perlu menghapus repository atau mengubah pengaturan Pages yang sudah aktif.
6. Buka tab **Actions**. Tunggu proses Pages untuk commit terbaru selesai dengan tanda centang hijau.
7. Buka `https://daniel100703.github.io/DanimoanSaga/`, lalu tekan **Ctrl+F5** untuk memuat versi terbaru.

Jika file `.nojekyll` tidak terlihat saat memilih file, unggahan file lainnya tetap dapat dilakukan. Paket ini menggunakan nama file biasa yang dapat diterbitkan GitHub Pages.

## Penyebab tampilan polos pada unggahan sebelumnya

Pada repository yang diperiksa, semua aset berada langsung di root. HTML lama meminta `assets/reader.css` dan `assets/images/bab-01-pembuka.webp`, sedangkan file sebenarnya berada di `reader.css` dan `bab-01-pembuka.webp`. URL lama menghasilkan HTTP 404. Paket ini menyesuaikan seluruh referensi HTML, font CSS, metadata buku, dan builder dengan lokasi file yang sebenarnya.

## Membaca secara lokal

Buka `index.html` di browser. Tersedia tujuh bab, 27 ilustrasi, tema krem/gelap, pengaturan ukuran huruf, dan tombol lanjut membaca. Posisi baca disimpan pada browser/perangkat yang sama. HTML Bab 7 mandiri dapat dibaca tanpa aset terpisah; tautan menuju bab lain di versi mandiri membuka situs GitHub Pages.

## Mengedit atau menambah bab

Naskah berada pada `bab-01.md` sampai `bab-07.md`. Metadata bab, lokasi ilustrasi, dan kartu tokoh berada di `book.json`. Setelah mengedit, jalankan dari folder ini dengan Python 3:

```bash
python build.py
```

Tidak perlu npm, database, atau framework. Builder hanya menggunakan pustaka standar Python. Halaman HTML yang disertakan sudah siap diunggah; pengguna tidak perlu menjalankan builder untuk memperbaiki deploy.

Untuk menambah bab berikutnya, buat `bab-08.md`, tambahkan objek bab pada `book.json`, dan simpan gambar pada folder yang sama. `file` pada metadata gambar cukup berisi nama berkas, misalnya `bab-08-pembuka.webp`. Setiap `anchor` ilustrasi harus cocok dengan potongan teks unik dalam naskah. Setelah itu jalankan builder dan unggah semua halaman HTML yang diperbarui, `book.json`, naskah baru, dan gambar baru. Pertahankan nama dan urutan paragraf bab lama bila ingin posisi baca lama tetap tepat.

Untuk membuat edisi HTML satu file:

```bash
python build.py --standalone Saga_Dani_Moan_Webnovel.html
```

Tindakan unggah ke repository dilakukan oleh pemilik akun; pembaruan Bab 7 ini belum diterapkan ke situs secara otomatis.

Dokumentasi resmi: [Mengunggah file ke repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) dan [Mengatur sumber GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
