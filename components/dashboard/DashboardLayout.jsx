// components/dashboard/DashboardLayout.jsx
// Guard sederhana: cek flag di sessionStorage yang di-set saat login berhasil.
// (Ini bukan pengganti auth server-side yang sesungguhnya — cukup untuk
// dashboard internal developer. Untuk produksi, ganti dengan Firebase Auth.)

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem("omet_dev_auth") === "true";
    setAuthed(ok);
    setChecked(true);
    if (!ok) router.replace("/dashboard-omet-dev");
  }, [router]);

  if (!checked) return null;
  if (!authed) return null;

  return (
    <div className="flex bg-neutral-900 text-neutral-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
