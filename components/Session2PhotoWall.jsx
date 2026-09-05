// components/Session2PhotoWall.jsx
// Sesi 2: Kepingan Memori — upload foto (min. 15) ke Cloudinary.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "../lib/SessionContext";
import { uploadPhoto } from "../lib/actions";

const MIN_PHOTOS = 15;

export default function Session2PhotoWall() {
  const { unlockNext, photoCount, setPhotoCount } = useSession();
  const [previews, setPreviews] = useState([]); // {id, url, uploading}

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newPreviews = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      localUrl: URL.createObjectURL(file),
      uploading: true,
      rot: Math.floor(Math.random() * 12 - 6),
    }));
    setPreviews((prev) => [...newPreviews, ...prev]);
    setPhotoCount((c) => c + files.length);

    // upload tiap file ke Firebase Storage (paralel)
    files.forEach(async (file, idx) => {
      try {
        await uploadPhoto(file);
        setPreviews((prev) =>
          prev.map((p) =>
            p.id === newPreviews[idx].id ? { ...p, uploading: false } : p
          )
        );
      } catch (err) {
        console.error("Gagal upload foto:", err);
        setPreviews((prev) =>
          prev.map((p) =>
            p.id === newPreviews[idx].id
              ? { ...p, uploading: false, failed: true }
              : p
          )
        );
      }
    });

    e.target.value = "";
  }

  const canContinue = photoCount >= MIN_PHOTOS;

  return (
    <section className="min-h-screen bg-cream px-6 py-16 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-8">
        <p className="font-hand text-3xl text-blush-deep">kepingan memori</p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-plum mt-1">
          Yuk, unggah foto-foto berharga kamu
        </h2>
        <p className="text-plum/70 mt-2">
          Bebas foto apa aja — bareng aku, bareng temen, atau momen random
          yang berkesan. Minimal {MIN_PHOTOS} foto ya biar bisa lanjut!
        </p>

        <label className="mt-6 inline-flex cursor-pointer items-center gap-2 glass-card rounded-full px-6 py-3 text-plum font-medium hover:scale-105 transition">
          📸 Pilih foto
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
            className="hidden"
          />
        </label>

        <p className="mt-3 text-sm text-plum/60">
          ({photoCount}/{MIN_PHOTOS})
        </p>
      </div>

      {/* grid masonry polaroid */}
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 max-w-4xl w-full">
        <AnimatePresence>
          {previews.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ "--rot": `${p.rot}deg` }}
              className="mb-4 break-inside-avoid bg-white p-2 pb-6 rounded-sm shadow-lg rotate-[var(--rot)] animate-floaty"
            >
              <img
                src={p.localUrl}
                alt="kenangan"
                className="w-full object-cover rounded-sm"
              />
              {p.uploading && (
                <p className="text-[10px] text-center text-plum/50 mt-1">
                  mengunggah...
                </p>
              )}
              {p.failed && (
                <p className="text-[10px] text-center text-red-400 mt-1">
                  gagal, coba lagi
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        disabled={!canContinue}
        onClick={() => unlockNext("photos")}
        className={`mt-10 rounded-full px-8 py-3 font-semibold transition ${
          canContinue
            ? "bg-blush-deep text-white hover:scale-105 shadow-lg"
            : "bg-plum/10 text-plum/40 cursor-not-allowed"
        }`}
      >
        Lanjut →
      </button>
    </section>
  );
}
