// components/Session6Final.jsx
// Sesi 6: Pintu Terakhir & Pertanyaan Rahasia.
// Tahap 1: validasi foto developer + pop-bubble lucu.
// Tahap 2: pertanyaan Ya/Tidak, kirim semua data ke Firebase, tampilkan penutup.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveFinalAnswer } from "../lib/actions";

export default function Session6Final() {
  const [stage, setStage] = useState("validate"); // validate -> question -> done
  const [showBubble, setShowBubble] = useState(false);
  const [sending, setSending] = useState(false);
  const [answer, setAnswer] = useState(null);

  async function handleAnswer(value) {
    if (sending) return;
    setSending(true);
    setAnswer(value);
    try {
      await saveFinalAnswer(value);
    } catch (err) {
      console.error("Gagal mengirim jawaban akhir:", err);
    } finally {
      setSending(false);
      setStage("done");
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-sunrise/40 to-blush/40 px-6 py-16 flex flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {stage === "validate" && (
          <motion.div
            key="validate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <p className="font-hand text-3xl text-blush-deep mb-4">
              satu pintu lagi...
            </p>

            <div className="relative">
              <button
                onClick={() => setShowBubble((v) => !v)}
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition"
              >
                {/* Ganti /dev-photo.jpg dengan foto profil developer di folder /public */}
                <img
                  src="/dev-photo.jpg"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </button>

              <AnimatePresence>
                {showBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    className="absolute -top-4 left-full ml-3 glass-card rounded-2xl rounded-bl-none px-4 py-2 text-sm text-plum whitespace-nowrap"
                  >
                    Iya, ini aku developer-nya! 👋
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-plum/70 mt-4 max-w-xs">
              itu aku, yang bikinin website ini buat kamu.
            </p>

            <button
              onClick={() => setStage("question")}
              className="mt-8 rounded-full px-8 py-3 font-semibold bg-blush-deep text-white shadow-lg hover:scale-105 transition"
            >
              Tahu Lah, Kamu!
            </button>
          </motion.div>
        )}

        {stage === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-[2rem] max-w-md w-full p-8"
          >
            <p className="font-hand text-2xl text-blush-deep mb-2">
              ada satu pertanyaan dari hati...
            </p>
            <p className="text-plum leading-relaxed">
              Sip, validasi aman. Berawal dari teman dekat yang berbagi banyak
              cerita... apakah selama ini, kamu punya perasaan lebih dari
              sekadar teman kepadaku?
            </p>

            <div className="flex gap-4 justify-center mt-8">
              <button
                disabled={sending}
                onClick={() => handleAnswer("ya")}
                className="rounded-full px-8 py-3 font-semibold bg-blush-deep text-white shadow-lg hover:scale-105 transition disabled:opacity-50"
              >
                Ya
              </button>
              <button
                disabled={sending}
                onClick={() => handleAnswer("tidak")}
                className="rounded-full px-8 py-3 font-semibold bg-plum/10 text-plum hover:scale-105 transition disabled:opacity-50"
              >
                Tidak
              </button>
            </div>
            {sending && (
              <p className="text-plum/50 text-sm mt-4">mengirim jawaban...</p>
            )}
          </motion.div>
        )}

        {stage === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-[2rem] max-w-md w-full p-10"
          >
            <p className="text-4xl mb-3">🎉</p>
            <h2 className="font-display text-2xl font-semibold text-plum">
              Makasih ya, Viola!
            </h2>
            <p className="text-plum/70 mt-3 leading-relaxed">
              Apapun jawaban kamu, aku seneng banget kamu udah mau main
              sampai akhir. Selamat ulang tahun sekali lagi — semoga tahun
              ini penuh hal-hal baik buat kamu. 🌸
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
