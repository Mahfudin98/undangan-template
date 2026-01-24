"use client";

import { useState } from "react";
import { MdOutlineHistoryEdu, MdOutlineVerified } from "react-icons/md";

export default function FormMessage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget; // simpan dulu
    setLoading(true);

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      attendance: formData.get("attendance"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal kirim");

      alert("Ucapan berhasil dikirim");
      form.reset(); // aman
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 px-6 bg-soft-gray" id="ucapan">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl lg:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/3 bg-burgundy p-6 lg:p-12 text-white">
            <h3 className="text-4xl font-serif font-bold mb-6">
              Pesan &amp; Harapan
            </h3>
            <p className="text-white/70 leading-relaxed mb-8">
              Bagikan doa dan ucapan terbaik Anda untuk Babang dan Aa di hari
              yang berbahagia ini.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MdOutlineVerified className="text-rose-gold size-6" />
                <span className="text-sm font-medium">
                  Konfirmasi Kehadiran
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineHistoryEdu className="text-rose-gold size-6" />
                <span className="text-sm font-medium">Tinggalkan Doa</span>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 p-6 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full border-slate-200 focus:ring-burgundy focus:border-burgundy rounded-xl p-4 bg-slate-50"
                    placeholder="Masukkan nama Anda"
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Kehadiran
                  </label>
                  <select
                    name="attendance"
                    required
                    className="w-full border-slate-200 focus:ring-burgundy focus:border-burgundy rounded-xl p-4 bg-slate-50"
                  >
                    <option value="akan hadir">Akan Hadir</option>
                    <option value="maaf, berhalangan">Maaf, Berhalangan</option>
                    <option value="ragu">Masih Ragu</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                  Pesan Untuk Babang &amp; Aa
                </label>
                <textarea
                  name="message"
                  required
                  className="w-full border-slate-200 focus:ring-burgundy focus:border-burgundy rounded-xl p-4 bg-slate-50 min-h-30"
                  placeholder="Tuliskan doa terbaik..."
                ></textarea>
              </div>
              <button
                disabled={loading}
                className="w-full bg-burgundy text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-xl shadow-burgundy/10"
              >
                {loading ? "Mengirim..." : "Kirim Ucapan"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
