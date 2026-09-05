// components/Session3Journal.jsx
// Sesi 3: Jurnal Kejujuran — 3 pertanyaan, minimal 10 karakter tiap jawaban.

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "../lib/SessionContext";
import { saveJournal } from "../lib/actions";

const QUESTIONS = [
  { key: "gift", label: "Kalau boleh milih bebas, hadiah impian kamu apa?" },
  { key: "hope", label: "Ada harapan buat diri kamu sendiri di tahun ini?" },
  { key: "funnyMoment", label: "Momen paling terkocak kita berdua, versi kamu?" },
];

const MIN_CHARS = 10;

export default function Session3Journal() {
  const { unlockNext, journalAnswers, setJournalAnswers } = useSession();
  const [saving, setSaving] = useState(false);

  const allValid = QUESTIONS.every(
    (q) => (journalAnswers[q.key] || "").trim().length >= MIN_CHARS
  );

  function handleChange(key, value) {
    setJournalAnswers((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSeal() {
    if (!allValid || saving) return;
    setSaving(true);
    try {
      await saveJournal(journalAnswers);
    } catch (err) {
      console.error("Gagal menyimpan jurnal:", err);
    } finally {
      setSaving(false);
      unlockNext("journal");
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-cream to-blush/30 px-6 py-16 flex flex-col items-center">
      <div className="max-w-xl w-full text-center mb-10">
        <p className="font-hand text-3xl text-blush-deep">jurnal kejujuran</p>
        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-plum mt-1">
          Nah, sekarang giliran kamu cerita
        </h2>
        <p className="text-plum/70 mt-2">
          Aku nyiapin beberapa pertanyaan santai. Jujur ya jawabnya, ini cuma
          buat kita berdua kok!
        </p>
      </div>

      <div className="glass-card rounded-[2rem] max-w-xl w-full p-8 space-y-6">
        {QUESTIONS.map((q) => {
          const val = journalAnswers[q.key] || "";
          const valid = val.trim().length >= MIN_CHARS;
          return (
            <div key={q.key}>
              <label className="block font-medium text-plum mb-2">
                {q.label}
              </label>
              <textarea
                value={val}
                onChange={(e) => handleChange(q.key, e.target.value)}
                rows={3}
                placeholder="tulis di sini..."
                className="glass-input w-full rounded-xl px-4 py-3 text-plum placeholder-plum/40 resize-none"
              />
              <p
                className={`text-xs mt-1 ${
                  valid ? "text-green-600" : "text-plum/40"
                }`}
              >
                {val.trim().length}/{MIN_CHARS} karakter minimal
              </p>
            </div>
          );
        })}
      </div>

      <motion.button
        onClick={handleSeal}
        disabled={!allValid || saving}
        whileTap={allValid ? { scale: 0.95 } : {}}
        className={`mt-10 rounded-full px-8 py-3 font-semibold transition flex items-center gap-2 ${
          allValid
            ? "bg-blush-deep text-white hover:scale-105 shadow-lg"
            : "bg-plum/10 text-plum/40 cursor-not-allowed"
        }`}
      >
        🕯️ {saving ? "Menyegel..." : "Segel jurnal & lanjut"}
      </motion.button>
    </section>
  );
}
