// components/dashboard/Sidebar.jsx
import Link from "next/link";
import { useRouter } from "next/router";

const NAV = [
  { href: "/dashboard-omet-dev/gallery", label: "Galeri", icon: "🖼️" },
  { href: "/dashboard-omet-dev/journal", label: "Jurnal", icon: "📓" },
  { href: "/dashboard-omet-dev/result", label: "Hasil Akhir", icon: "💌" },
];

export default function Sidebar() {
  const router = useRouter();

  function handleLogout() {
    sessionStorage.removeItem("omet_dev_auth");
    router.push("/dashboard-omet-dev");
  }

  return (
    <aside className="w-56 shrink-0 bg-neutral-950 text-neutral-300 min-h-screen p-5 flex flex-col border-r border-neutral-800">
      <p className="font-mono text-sm text-pink-400 mb-8">omet-dev // admin</p>
      <nav className="flex flex-col gap-1 flex-1">
        {NAV.map((item) => {
          const active = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                active
                  ? "bg-pink-500/10 text-pink-300"
                  : "hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="text-xs text-neutral-500 hover:text-pink-300 mt-6 text-left"
      >
        ⎋ Logout
      </button>
    </aside>
  );
}
