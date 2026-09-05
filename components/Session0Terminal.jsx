// components/Session0Terminal.jsx
// Sesi 0: layar "system crash" — user harus mengetik "Viola" untuk masuk.

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "../lib/SessionContext";

export default function Session0Terminal() {
  const { unlockNext } = useSession();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [breaking, setBreaking] = useState(false);
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().toLowerCase() === "viola") {
      setError(false);
      setBreaking(true);
      // beri jeda untuk animasi "layar runtuh" sebelum pindah sesi
      setTimeout(() => unlockNext("terminal"), 1100);
    } else {
      setError(true);
      setValue("");
      inputRef.current?.focus();
    }
  }

  return (
    <AnimatePresence>
      {!breaking ? (
        <motion.div
          key="terminal"
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black scanlines flex items-center justify-center px-6"
        >
          <div className="max-w-xl w-full font-mono text-neon">
            <motion.p
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="text-sm sm:text-base leading-relaxed animate-glitch"
            >
              WARNING: SYSTEM CRASH.
              <br />
              UNAUTHORIZED ACCESS DETECTED.
              <br />
              ENCRYPTED FILES LOCKED.
            </motion.p>

            <p className="mt-6 text-xs sm:text-sm text-pink-200/80 leading-relaxed">
              Waduh, sistemnya crash! Kayaknya butuh password buat perbaikin.
              <br />
              Clue: <span className="text-neon">nama panggilan paling cantik?</span>
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex items-center gap-2">
              <span className="text-neon">&gt;</span>
              <input
                ref={inputRef}
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-transparent border-b border-neon/50 focus:border-neon outline-none text-neon placeholder-neon/30 py-1 tracking-wide"
                placeholder="ketik password lalu tekan Enter..."
              />
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs text-red-400"
              >
                ACCESS DENIED. Coba lagi ya.
              </motion.p>
            )}

            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block mt-6 w-2 h-4 bg-neon"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="glitchout"
          initial={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1, opacity: 1 }}
              animate={{ scaleY: 0, opacity: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeIn" }}
              style={{ top: `${i * 12.5}%` }}
              className="absolute left-0 w-full h-[12.5%] bg-gradient-to-r from-pink-500/40 to-yellow-300/30"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
