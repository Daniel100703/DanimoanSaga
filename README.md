# Saga Dani Moan — Bab 1–6

Edisi perbaikan deploy, 3 Oktober 2026. Semua file sekarang berada dalam satu folder. HTML, CSS, JavaScript, font, gambar, naskah, dan builder memakai jalur yang sesuai dengan struktur ini.

## Memperbaiki situs yang sudah terbit

1. Unduh ZIP versi ini, lalu **Extract All / Ekstrak Semua**. Buka folder hasil ekstraksi. Di dalamnya harus langsung terlihat `index.html`, `reader.css`, dan file gambar `.webp`.
2. Buka repository `Daniel100703/DanimoanSaga`, pada tab **Code** dan branch **main**.
3. Pilih **Add file → Upload files**.
4. Dari folder hasil ekstraksi, pilih seluruh file dengan **Ctrl+A**, lalu seret ke area unggah GitHub. Unggah file hasil ekstraksi, bukan file ZIP atau folder pembungkusnya. Seluruh file diletakkan di lokasi yang sama dengan `index.html` yang sudah ada.
5. Isi pesan commit, misalnya `Perbaiki jalur CSS dan ilustrasi`, lalu pilih **Commit changes** ke branch `main`. File dengan nama sama akan diperbarui. Tidak perlu menghapus repository atau mengubah pengaturan Pages yang sudah aktif.
6. Buka tab **Actions**. Tunggu proses Pages untuk commit terbaru selesai dengan tanda centang hijau.
7. Buka `https://daniel100703.github.io/DanimoanSaga/`, lalu tekan **Ctrl+F5** untuk memuat versi terbaru.

Jika file `.nojekyll` tidak terlihat saat memilih file, unggahan 47 file lainnya tetap dapat dilakukan. Paket ini menggunakan nama file biasa yang dapat diterbitkan GitHub Pages.

## Penyebab tampilan polos pada unggahan sebelumnya

Pada repository yang diperiksa, semua aset berada langsung di root. HTML lama meminta `assets/reader.css` dan `assets/images/bab-01-pembuka.webp`, sedangkan file sebenarnya berada di `reader.css` dan `bab-01-pembuka.webp`. URL lama menghasilkan HTTP 404. Paket ini menyesuaikan seluruh referensi HTML, font CSS, metadata buku, dan builder dengan lokasi file yang sebenarnya.

## Membaca secara lokal

Buka `index.html` di browser. Tersedia enam bab, 24 ilustrasi, tema krem/gelap, pengaturan ukuran huruf, dan tombol lanjut membaca. Posisi baca disimpan pada browser/perangkat yang sama.

## Mengedit atau menambah bab

Naskah berada pada `bab-01.md` sampai `bab-06.md`. Metadata bab, lokasi ilustrasi, dan kartu tokoh berada di `book.json`. Setelah mengedit, jalankan dari folder ini dengan Python 3:

```bash
python build.py
```

Tidak perlu npm, database, atau framework. Builder hanya menggunakan pustaka standar Python. Halaman HTML yang disertakan sudah siap diunggah; pengguna tidak perlu menjalankan builder untuk memperbaiki deploy.

Untuk menambah bab, buat `bab-07.md`, tambahkan objek bab pada `book.json`, dan simpan gambar pada folder yang sama. `file` pada metadata gambar cukup berisi nama berkas, misalnya `bab-07-pembuka.webp`. Setiap `anchor` ilustrasi harus cocok dengan potongan teks unik dalam naskah. Setelah itu jalankan builder dan unggah hasilnya.

Untuk membuat edisi HTML satu file:

```bash
python build.py --standalone Saga_Dani_Moan_Webnovel.html
```

Paket perbaikan ini tidak mengubah cerita, dialog, atau ilustrasi. Tindakan unggah ke repository dilakukan oleh pemilik akun; paket ini belum diterapkan ke situs secara otomatis.

Dokumentasi resmi: [Mengunggah file ke repository](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository) dan [Mengatur sumber GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
