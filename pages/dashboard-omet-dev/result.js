// pages/dashboard-omet-dev/result.js
import { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { fetchSessionData } from "../../lib/actions";

export default function ResultPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessionData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const answer = data?.finalAnswer;

  return (
    <>
      <Head>
        <title>omet-dev // hasil akhir</title>
      </Head>
      <DashboardLayout>
        <h1 className="text-xl font-semibold mb-1">Hasil Akhir Sesi 6</h1>
        <p className="text-neutral-400 text-sm mb-8">
          Jawaban dari pertanyaan rahasia
        </p>

        {loading && <p className="text-neutral-500 text-sm">Memuat...</p>}

        {!loading && !answer && (
          <p className="text-neutral-500 text-sm">
            Viola belum menjawab pertanyaan terakhir.
          </p>
        )}

        {answer && (
          <div
            className={`rounded-2xl p-10 text-center border ${
              answer === "ya"
                ? "bg-pink-500/10 border-pink-400"
                : "bg-neutral-800 border-neutral-700"
            }`}
          >
            <p className="text-5xl mb-4">{answer === "ya" ? "💗" : "🤍"}</p>
            <p className="text-3xl font-bold uppercase tracking-wide">
              {answer}
            </p>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
