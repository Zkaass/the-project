// components/Session1Welcome.jsx
// Sesi 1: sambutan hangat. Trigger lanjut saat user scroll ke bawah section ini.

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSession } from "../lib/SessionContext";

export default function Session1Welcome() {
  const { unlockNext, isUnlocked } = useSession();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!isUnlocked("welcome")) return; // hanya observe kalau sesi ini aktif
    const el = bottomRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlockNext("welcome");
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isUnlocked, unlockNext]);

  return (
    <section className="relative min-h-screen bg-sunrise-drift animate-gradientMove flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* dekorasi bulat lembut yang mengambang */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blush/40 rounded-full blur-3xl animate-floaty" />
      <div className="absolute bottom-0 -right-16 w-80 h-80 bg-sunrise-deep/40 rounded-full blur-3xl animate-floaty" style={{ animationDelay: "1.5s" }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative glass-card rounded-[2rem] px-8 py-10 max-w-lg"
      >
        <p className="font-hand text-3xl text-blush-deep mb-2">psst, Viola...</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-plum leading-snug">
          Woy, akhirnya masuk juga! <br /> Selamat ulang tahun ya!
        </h1>
        <p className="mt-4 text-plum/80 leading-relaxed">
          Website kecil ini sengaja aku bikin buat kamu di hari spesial ini.
          Coba scroll ke bawah, ada banyak hal seru di dalam.
        </p>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="mt-8 text-blush-deep text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* spacer supaya user beneran perlu scroll */}
      <div className="h-[60vh]" />
      <div ref={bottomRef} className="h-2 w-2" />
    </section>
  );
}
