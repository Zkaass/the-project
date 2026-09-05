// pages/dashboard-omet-dev/gallery.js
import { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { fetchPhotos } from "../../lib/actions";

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    fetchPhotos()
      .then(setPhotos)
      .catch((err) => {
        console.error("Gagal memuat galeri:", err);
        setErrored(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>omet-dev // galeri</title>
      </Head>
      <DashboardLayout>
        <h1 className="text-xl font-semibold mb-1">Galeri Sesi 2</h1>
        <p className="text-neutral-400 text-sm mb-6">
          Semua foto yang diunggah Viola ({photos.length} total)
        </p>

        {loading && <p className="text-neutral-500 text-sm">Memuat foto...</p>}
        {errored && (
          <p className="text-red-400 text-sm">
            Gagal memuat foto. Cek konfigurasi Firebase kamu.
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {photos.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="block aspect-square rounded-lg overflow-hidden border border-neutral-800 hover:border-pink-400 transition"
            >
              <img
                src={p.url}
                alt={p.name || "foto"}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>

        {!loading && !errored && photos.length === 0 && (
          <p className="text-neutral-500 text-sm">Belum ada foto yang diunggah.</p>
        )}
      </DashboardLayout>
    </>
  );
}
