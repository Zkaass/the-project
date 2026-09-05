// pages/dashboard-omet-dev/journal.js
import { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { fetchSessionData } from "../../lib/actions";

const LABELS = {
  gift: "Hadiah impian",
  hope: "Harapan diri sendiri",
  funnyMoment: "Momen terkocak kita",
};

export default function JournalPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessionData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  const journal = data?.journal;

  return (
    <>
      <Head>
        <title>omet-dev // jurnal</title>
      </Head>
      <DashboardLayout>
        <h1 className="text-xl font-semibold mb-1">Jurnal Sesi 3</h1>
        <p className="text-neutral-400 text-sm mb-6">
          Jawaban jurnal kejujuran Viola
        </p>

        {loading && <p className="text-neutral-500 text-sm">Memuat...</p>}

        {!loading && !journal && (
          <p className="text-neutral-500 text-sm">
            Belum ada jawaban jurnal yang tersimpan.
          </p>
        )}

        {journal && (
          <table className="w-full text-sm border-collapse">
            <tbody>
              {Object.entries(LABELS).map(([key, label]) => (
                <tr key={key} className="border-b border-neutral-800 align-top">
                  <td className="py-3 pr-4 w-48 text-neutral-400 font-medium">
                    {label}
                  </td>
                  <td className="py-3 text-neutral-100">
                    {journal[key] || <span className="text-neutral-600">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DashboardLayout>
    </>
  );
}
