// pages/dashboard-omet-dev/index.js
// Login sederhana untuk dashboard developer. Password hardcode — ganti
// sebelum deploy, atau lebih baik ganti ke Firebase Auth untuk produksi.

import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const DEV_PASSWORD = "viola-omet-2026"; // TODO: ganti password ini

export default function DashboardLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === DEV_PASSWORD) {
      sessionStorage.setItem("omet_dev_auth", "true");
      router.push("/dashboard-omet-dev/gallery");
    } else {
      setError(true);
    }
  }

  return (
    <>
      <Head>
        <title>omet-dev // login</title>
      </Head>
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 w-full max-w-sm"
        >
          <p className="font-mono text-pink-400 text-sm mb-1">omet-dev // admin</p>
          <h1 className="text-neutral-100 text-lg font-semibold mb-6">
            Dashboard Developer
          </h1>

          <label className="block text-neutral-400 text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-neutral-100 focus:outline-none focus:border-pink-400"
            autoFocus
          />

          {error && (
            <p className="text-red-400 text-xs mt-2">Password salah, coba lagi.</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full bg-pink-500 hover:bg-pink-400 transition rounded-lg py-2 text-neutral-950 font-medium"
          >
            Masuk
          </button>
        </form>
      </div>
    </>
  );
}
