// components/Session4Mixtape.jsx
// Sesi 4: Mixtape Nostalgia — vinyl berputar + visualizer, minimal dengar 10 detik.

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "../lib/SessionContext";

const REQUIRED_SECONDS = 10;

export default function Session4Mixtape() {
  const { unlockNext } = useSession();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (elapsed >= REQUIRED_SECONDS) setReady(true);
  }, [elapsed]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  function handleTimeUpdate() {
    setElapsed(audioRef.current?.currentTime || 0);
  }

  // 12 bar visualizer sederhana, tinggi acak yang berubah saat playing
  const bars = new Array(14).fill(0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blush/30 to-sunrise/40 px-6 py-16 flex flex-col items-center justify-center text-center">
      <p className="font-hand text-3xl text-blush-deep">mixtape nostalgia</p>
      <h2 className="font-display text-2xl sm:text-3xl font-semibold text-plum mt-1 max-w-md">
        Dengerin lagu ini dulu, biar inget momen kita ya
      </h2>

      {/* Vinyl */}
      <motion.div
        animate={playing ? { rotate: 360 } : {}}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="mt-10 w-56 h-56 rounded-full bg-plum shadow-2xl flex items-center justify-center relative"
      >
        <div className="absolute inset-3 rounded-full border-4 border-plum/40" />
        <div className="absolute inset-8 rounded-full border border-plum/30" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blush to-sunrise-deep flex items-center justify-center text-plum font-hand text-sm">
          Viola
        </div>
      </motion.div>

      {/* Visualizer */}
      <div className="flex items-end gap-1 h-12 mt-8">
        {bars.map((_, i) => (
          <motion.span
            key={i}
            animate={
              playing
                ? { height: [6, 24 + ((i * 7) % 20), 6] }
                : { height: 6 }
            }
            transition={{
              duration: 0.6 + (i % 4) * 0.15,
              repeat: playing ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="w-1.5 bg-blush-deep rounded-full"
          />
        ))}
      </div>

      <audio
        ref={audioRef}
        src="/audio/mixtape.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setPlaying(false)}
      />

      <button
        onClick={togglePlay}
        className="mt-8 glass-card rounded-full w-16 h-16 flex items-center justify-center text-2xl text-plum hover:scale-105 transition"
      >
        {playing ? "⏸" : "▶️"}
      </button>

      <p className="text-plum/60 text-sm mt-3">
        {Math.min(Math.floor(elapsed), REQUIRED_SECONDS)}/{REQUIRED_SECONDS} detik
      </p>

      {ready && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => unlockNext("mixtape")}
          className="mt-8 rounded-full px-8 py-3 font-semibold bg-blush-deep text-white shadow-lg animate-floaty"
        >
          Lanjut ke surat →
        </motion.button>
      )}
    </section>
  );
}
