// lib/firebase.js
// Firebase SDK v9 (modular) initialization — Firestore only.
// (Cloud Storage tidak dipakai lagi karena sekarang wajib paket Blaze/kartu
// kredit; foto disimpan di Cloudinary sebagai gantinya, lihat lib/actions.js)
// Fill these values from your Firebase project settings, or set them as
// environment variables in `.env.local` (recommended, see README.md).

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Avoid re-initializing during Next.js hot reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;

