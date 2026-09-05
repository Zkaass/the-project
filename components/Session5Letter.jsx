// components/Session5Letter.jsx
// Sesi 5: Surat Spesial — amplop dibuka, surat pakai font handwriting.
// Lanjut terbuka saat user scroll sampai ujung bawah surat (IntersectionObserver).

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "../lib/SessionContext";

export default function Session5Letter() {
  const { unlockNext, isUnlocked } = useSession();
  const [opened, setOpened] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (!opened || !isUnlocked("letter")) return;
    const el = endRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) unlockNext("letter");
      },
      { threshold: 0.9 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [opened, isUnlocked, unlockNext]);

  return (
    <section className="min-h-screen bg-cream px-6 py-16 flex flex-col items-center">
      <p className="font-hand text-3xl text-blush-deep mb-6">surat spesial</p>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="envelope"
            onClick={() => setOpened(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative w-72 h-48 sm:w-80 sm:h-52"
          >
            <div className="absolute inset-0 bg-blush rounded-lg shadow-xl" />
            <div
              className="absolute inset-x-0 top-0 h-1/2 bg-blush-deep origin-top rounded-t-lg"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 70%)" }}
            />
            <div className="absolute inset-0 flex items-end justify-center pb-4 text-plum font-hand text-lg">
              klik untuk buka ✉️
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="glass-card rounded-2xl max-w-xl w-full p-8 sm:p-10 max-h-[70vh] overflow-y-auto"
          >
            <p className="font-hand text-2xl sm:text-3xl leading-relaxed text-plum">
              Hai Viola,
              <br />
              <br />
              Di hari ulang tahun kamu ini, aku cuma mau bilang: makasih ya,
              udah jadi salah satu orang paling tulus dan paling ceria yang
              pernah aku kenal. Cara kamu ketawa lepas di hal-hal kecil itu
              selalu berhasil bikin hari yang capek jadi lebih ringan.
              <br />
              <br />
              Aku tau tahun ini mungkin nggak semuanya berjalan mulus, tapi
              kamu tetap jadi orang yang berusaha baik ke semua orang di
              sekitarnya — termasuk aku. Itu nggak semua orang bisa lakuin,
              dan aku beneran menghargai itu.
              <br />
              <br />
              Semoga di umur yang baru ini, semua hal baik yang kamu
              perjuangkan pelan-pelan kelihatan hasilnya. Semoga kamu tetap
              jadi Viola yang ceria, tulus, dan selalu bikin sekitarnya
              nyaman.
              <br />
              <br />
              Selamat ulang tahun, Viola. Makasih udah jadi kamu.
              <br />
              <br />
              — dari orang yang seneng banget punya kamu di hidupnya
            </p>
            <div ref={endRef} className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {opened && (
        <p className="text-plum/50 text-sm mt-4">
          scroll sampai bawah suratnya ya, buat lanjut...
        </p>
      )}
    </section>
  );
}
