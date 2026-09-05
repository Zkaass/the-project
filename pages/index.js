// pages/index.js
// Halaman utama — merangkai Sesi 0 s/d Sesi 6 sesuai state "Sesi Aktif".
// User tidak bisa melihat/scroll ke sesi berikutnya sebelum syarat sesi
// saat ini terpenuhi (dikontrol lewat SessionProvider + SESSIONS order).

import Head from "next/head";
import { SessionProvider, useSession, SESSIONS } from "../lib/SessionContext";
import Session0Terminal from "../components/Session0Terminal";
import Session1Welcome from "../components/Session1Welcome";
import Session2PhotoWall from "../components/Session2PhotoWall";
import Session3Journal from "../components/Session3Journal";
import Session4Mixtape from "../components/Session4Mixtape";
import Session5Letter from "../components/Session5Letter";
import Session6Final from "../components/Session6Final";

const SESSION_COMPONENTS = {
  terminal: Session0Terminal,
  welcome: Session1Welcome,
  photos: Session2PhotoWall,
  journal: Session3Journal,
  mixtape: Session4Mixtape,
  letter: Session5Letter,
  final: Session6Final,
};

function JourneyContent() {
  const { unlockedIndex } = useSession();

  // Sesi 0 ("terminal") adalah overlay fullscreen — begitu password benar
  // dan sesi berikutnya terbuka, ia harus lepas dari layar sepenuhnya
  // (bukan cuma di-cover), makanya di-unmount total di sini. Sesi 1
  // seterusnya ditumpuk vertikal supaya "tidak bisa scroll ke sesi
  // berikutnya sebelum syarat sesi ini selesai" terasa natural.
  const visibleSessions =
    unlockedIndex === 0 ? ["terminal"] : SESSIONS.slice(1, unlockedIndex + 1);

  return (
    <>
      {visibleSessions.map((key) => {
        const Component = SESSION_COMPONENTS[key];
        return <Component key={key} />;
      })}
    </>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Untuk Viola 🌸</title>
        <meta
          name="description"
          content="Kejutan ulang tahun spesial buat Viola"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider>
        <main className="relative">
          <JourneyContent />
        </main>
      </SessionProvider>
    </>
  );
}
