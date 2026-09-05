# Kejutan Ulang Tahun — Viola 🌸

Website ulang tahun interaktif, gamifikasi sesi-demi-sesi, tema **glassmorphism**
(Soft Rose Pink + Warm Sunrise Yellow), dibangun dengan Next.js, Tailwind CSS,
Framer Motion, dan Firebase (Firestore + Storage).

## 1. Install

```bash
npm install
```

## 2. Setup Firebase

1. Buat project di [Firebase Console](https://console.firebase.google.com/).
2. Aktifkan **Firestore Database** dan **Storage**.
3. Salin `.env.local.example` jadi `.env.local`, lalu isi dengan config
   project kamu (Project settings → General → Your apps → SDK setup and config).
4. Set Firestore & Storage rules (contoh untuk testing — **perketat sebelum
   production**):

   Firestore:
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

   Storage:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read, write: if true; // TODO: ganti jadi aturan yang lebih aman
       }
     }
   }
   ```

## 3. Tambahkan aset

- `public/dev-photo.jpg` — foto profil kamu (developer), dipakai di Sesi 6.
- `public/audio/mixtape.mp3` — lagu untuk Sesi 4 (mixtape nostalgia).

## 4. Jalankan

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
  actions.js          -> semua fungsi Firestore/Storage (upload foto, simpan jurnal, dst)
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
    gallery.js               -> galeri foto (Firestore + Storage)
    journal.js               -> tabel jawaban jurnal
    result.js                 -> jawaban Ya/Tidak akhir
```

## Catatan keamanan

Password dashboard developer di-hardcode di sisi client (`pages/dashboard-omet-dev/index.js`)
dan status login disimpan di `sessionStorage`. Ini cukup untuk kebutuhan personal/prank
ulang tahun, **bukan untuk data sensitif produksi**. Untuk keamanan lebih baik,
ganti dengan Firebase Authentication + Firestore security rules berbasis UID.
