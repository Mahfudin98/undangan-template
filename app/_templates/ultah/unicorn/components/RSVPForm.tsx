"use client";

import { useState } from "react";

type RSVPStatus = "hadir" | "tidak_hadir" | null;

interface RSVPFormProps {
  onSubmitted?: () => void;
}

export function RSVPForm({ onSubmitted }: RSVPFormProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<RSVPStatus>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !status) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          status,
          message: message.trim(),
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error ?? "Terjadi kesalahan");

      setSubmitted(true);
      onSubmitted?.();
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Gagal mengirim. Coba lagi ya!",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-fade-up">
        <div className="text-5xl mb-4">🦄</div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display-loaded, serif)",
            color: "#1d4ed8",
          }}
        >
          {status === "hadir"
            ? "Yay! Sampai Jumpa! 🎉"
            : "Kami Akan Merindukanmu 🥺"}
        </h3>
        <p className="text-sm" style={{ color: "#3b82f6" }}>
          {status === "hadir"
            ? "Konfirmasi kehadiranmu sudah kami terima. Sampai jumpa di hari yang ajaib!"
            : "Terima kasih sudah memberitahu kami. Semoga lain kali bisa hadir!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label
          className="block text-sm font-semibold mb-2 tracking-wide"
          style={{ color: "#1d4ed8" }}
        >
          Nama Lengkap ✨
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama kamu..."
          className="w-full px-4 py-3 rounded-2xl outline-none transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "2px solid rgba(59,130,246,0.3)",
            color: "#0f172a",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
          onFocus={(e) => {
            e.target.style.border = "2px solid rgba(59,130,246,0.8)";
            e.target.style.boxShadow = "0 0 20px rgba(59,130,246,0.2)";
          }}
          onBlur={(e) => {
            e.target.style.border = "2px solid rgba(59,130,246,0.3)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-3 tracking-wide"
          style={{ color: "#1d4ed8" }}
        >
          Konfirmasi Kehadiran 🎈
        </label>
        <div className="flex gap-3">
          {[
            { value: "hadir", label: "🎉 Hadir" },
            { value: "tidak_hadir", label: "😢 Tidak Hadir" },
          ].map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value as RSVPStatus)}
              className="flex-1 py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-300 cursor-pointer"
              style={{
                background:
                  status === value
                    ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                    : "rgba(255,255,255,0.6)",
                border:
                  status === value
                    ? "2px solid transparent"
                    : "2px solid rgba(59,130,246,0.3)",
                color: status === value ? "#fff" : "#1d4ed8",
                transform: status === value ? "scale(1.02)" : "scale(1)",
                boxShadow:
                  status === value ? "0 8px 25px rgba(59,130,246,0.4)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-semibold mb-2 tracking-wide"
          style={{ color: "#1d4ed8" }}
        >
          Ucapan / Pesan (Opsional) 💌
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis ucapan atau pesan untuk ulang tahun ini..."
          rows={3}
          className="w-full px-4 py-3 rounded-2xl outline-none transition-all duration-300 resize-none"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "2px solid rgba(59,130,246,0.3)",
            color: "#0f172a",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
          onFocus={(e) => {
            e.target.style.border = "2px solid rgba(59,130,246,0.8)";
            e.target.style.boxShadow = "0 0 20px rgba(59,130,246,0.2)";
          }}
          onBlur={(e) => {
            e.target.style.border = "2px solid rgba(59,130,246,0.3)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {error && (
        <p
          className="text-sm text-center font-medium"
          style={{ color: "#2563eb" }}
        >
          ⚠️ {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!name || !status || loading}
        className="w-full py-4 rounded-2xl font-bold text-white text-lg tracking-wide transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background:
            name && status
              ? "linear-gradient(135deg, #60a5fa, #3b82f6, #1d4ed8)"
              : "rgba(59,130,246,0.3)",
          boxShadow:
            name && status ? "0 10px 30px rgba(59,130,246,0.4)" : "none",
          fontFamily: "var(--font-display-loaded, serif)",
        }}
      >
        {loading ? "⏳ Mengirim..." : "Kirim Konfirmasi ✨"}
      </button>
    </div>
  );
}
