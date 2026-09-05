// lib/actions.js
// Helper functions wrapping Firebase Firestore calls + Cloudinary upload.
// Foto disimpan di Cloudinary (gratis, tanpa kartu kredit) — metadata-nya
// (url, nama) dicatat di Firestore supaya dashboard admin bisa list.
// Schema:
//   Firestore collection "photos"      -> { url, name, uploadedAt }
//   Firestore doc "session/viola"      -> { journal: {...}, finalAnswer, updatedAt }

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

const SESSION_DOC_PATH = ["session", "viola"];

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a single photo file to Cloudinary (unsigned upload, no credit card
 * needed) and register its metadata in Firestore so the admin dashboard
 * can list it later.
 * @param {File} file
 * @param {(pct:number)=>void} onProgress optional progress callback (0-100)
 */
export async function uploadPhoto(file, onProgress) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary belum dikonfigurasi. Cek NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME dan NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET di .env.local"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const url = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
    );

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        reject(new Error("Upload ke Cloudinary gagal: " + xhr.responseText));
      }
    };
    xhr.onerror = () => reject(new Error("Upload ke Cloudinary gagal."));
    xhr.send(formData);
  });

  await addDoc(collection(db, "photos"), {
    url,
    name: file.name,
    uploadedAt: serverTimestamp(),
  });

  return url;
}

/** Fetch all uploaded photos, most recent first. Used by the admin gallery. */
export async function fetchPhotos() {
  const q = query(collection(db, "photos"), orderBy("uploadedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/** Save (merge) the journal answers from Sesi 3. */
export async function saveJournal(answers) {
  const ref = doc(db, ...SESSION_DOC_PATH);
  await setDoc(
    ref,
    {
      journal: answers,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Save the final Ya/Tidak answer from Sesi 6. */
export async function saveFinalAnswer(answer) {
  const ref = doc(db, ...SESSION_DOC_PATH);
  await setDoc(
    ref,
    {
      finalAnswer: answer,
      answeredAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/** Fetch the single session document (journal + final answer) for the dashboard. */
export async function fetchSessionData() {
  const ref = doc(db, ...SESSION_DOC_PATH);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

