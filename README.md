# Kejutan Ulang Tahun — Viola 🌸

Website ulang tahun interaktif, gamifikasi sesi-demi-sesi, tema **glassmorphism**
(Soft Rose Pink + Warm Sunrise Yellow), dibangun dengan Next.js, Tailwind CSS,
Framer Motion, Firebase (Firestore), dan Cloudinary (foto).

## 1. Install

```bash
npm install
```

## 2. Setup Firebase (untuk jurnal & jawaban akhir)

1. Buat project di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Firestore Database** saja (Cloud Storage **tidak dipakai** — sejak
   Feb 2026 Google mewajibkan paket berbayar Blaze/kartu kredit untuk Storage,
   jadi foto disimpan lewat Cloudinary sebagai gantinya, lihat langkah 3).
3. Salin `.env.local.example` jadi `.env.local`, lalu isi bagian Firebase
   dengan config project kamu (Project settings → General → Your apps →
   SDK setup and config).
4. Set Firestore rules (contoh untuk testing — **perketat sebelum production**):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true; // TODO: ganti jadi aturan yang lebih aman
       }
     }
   }
   ```

## 3. Setup Cloudinary (untuk upload foto Sesi 2 — gratis, tanpa kartu kredit)

1. Daftar gratis di [cloudinary.com](https://cloudinary.com) (tidak perlu kartu).
2. Di Dashboard, catat **Cloud name** kamu (terlihat di halaman utama dashboard).
3. Masuk ke **Settings → Upload → Upload presets → Add upload preset**.
4. Set **Signing Mode** ke **Unsigned**, simpan, lalu catat **nama preset**-nya.
5. Isi `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` dan
   `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` di `.env.local` dengan nilai tadi.

## 4. Tambahkan aset

- `public/dev-photo.jpg` — foto profil kamu (developer), dipakai di Sesi 6.
- `public/audio/mixtape.mp3` — lagu untuk Sesi 4 (mixtape nostalgia).

## 5. Jalankan

```bash
npm run dev
```

Buka `http://localhost:3000` untuk pengalaman utama Viola, dan
`http://localhost:3000/dashboard-omet-dev` untuk dashboard developer
(password default: `viola-omet-2026`, ganti di
`pages/dashboard-omet-dev/index.js`).

## Struktur proyek

```
lib/
  firebase.js        -> init Firebase SDK v9
  actions.js          -> fungsi Firestore (jurnal, jawaban akhir) + upload foto ke Cloudinary
  SessionContext.js    -> state machine "Sesi Aktif" (chained sessions)
components/
  Session0Terminal.jsx    -> Sesi 0: layar crash + password
  Session1Welcome.jsx     -> Sesi 1: sambutan
  Session2PhotoWall.jsx   -> Sesi 2: upload foto (min 15)
  Session3Journal.jsx     -> Sesi 3: jurnal kejujuran
  Session4Mixtape.jsx     -> Sesi 4: vinyl player
  Session5Letter.jsx      -> Sesi 5: amplop & surat
  Session6Final.jsx       -> Sesi 6: validasi + pertanyaan rahasia
  dashboard/
    Sidebar.jsx
    DashboardLayout.jsx    -> auth guard dashboard
pages/
  index.js                 -> merangkai semua sesi
  dashboard-omet-dev/
    index.js                -> login
    gallery.js               -> galeri foto (metadata dari Firestore, gambar dari Cloudinary)
    journal.js               -> tabel jawaban jurnal
    result.js                 -> jawaban Ya/Tidak akhir
```

## Catatan keamanan

Password dashboard developer di-hardcode di sisi client (`pages/dashboard-omet-dev/index.js`)
dan status login disimpan di `sessionStorage`. Ini cukup untuk kebutuhan personal/prank
ulang tahun, **bukan untuk data sensitif produksi**. Untuk keamanan lebih baik,
ganti dengan Firebase Authentication + Firestore security rules berbasis UID.
