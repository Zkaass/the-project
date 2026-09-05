// lib/SessionContext.js
// Central "Sesi Aktif" state machine. A session can only advance forward,
// never skipped — each Session component calls `unlockNext()` once its own
// requirement is satisfied.

import { createContext, useContext, useState, useCallback } from "react";

export const SESSIONS = [
  "terminal", // Sesi 0
  "welcome", // Sesi 1
  "photos", // Sesi 2
  "journal", // Sesi 3
  "mixtape", // Sesi 4
  "letter", // Sesi 5
  "final", // Sesi 6
];

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [unlockedIndex, setUnlockedIndex] = useState(0); // furthest unlocked
  const [journalAnswers, setJournalAnswers] = useState({
    gift: "",
    hope: "",
    funnyMoment: "",
  });
  const [photoCount, setPhotoCount] = useState(0);

  const unlockNext = useCallback((currentKey) => {
    const currentIdx = SESSIONS.indexOf(currentKey);
    setUnlockedIndex((prev) => Math.max(prev, currentIdx + 1));
  }, []);

  const isUnlocked = useCallback(
    (key) => SESSIONS.indexOf(key) <= unlockedIndex,
    [unlockedIndex]
  );

  const value = {
    unlockedIndex,
    unlockNext,
    isUnlocked,
    journalAnswers,
    setJournalAnswers,
    photoCount,
    setPhotoCount,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
