// lib/actions.js
// Helper functions wrapping Firebase Firestore + Storage calls.
// Schema:
//   Firestore collection "photos"      -> { url, path, name, uploadedAt }
//   Firestore doc "session/viola"      -> { journal: {...}, finalAnswer, updatedAt }

import { db, storage } from "./firebase";
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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const SESSION_DOC_PATH = ["session", "viola"];

/**
 * Upload a single photo file to Firebase Storage and register its metadata
 * in Firestore so the admin dashboard can list it later.
 * @param {File} file
 * @param {(pct:number)=>void} onProgress optional progress callback (0-100)
 */
export async function uploadPhoto(file, onProgress) {
  const safeName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const storageRef = ref(storage, `photos/${safeName}`);
  const task = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(pct);
        }
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        await addDoc(collection(db, "photos"), {
          url,
          path: `photos/${safeName}`,
          name: file.name,
          uploadedAt: serverTimestamp(),
        });
        resolve(url);
      }
    );
  });
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
