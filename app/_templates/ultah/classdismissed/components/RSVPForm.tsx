"use client";

import { useState } from "react";

type RSVPStatus = "hadir" | "tidak_hadir" | null;

interface RSVPFormProps {
  onSubmitted?: () => void;
}

// ── Small icon helpers ──────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M7 10.4l2.5 2.5 3.5-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-5 h-5" aria-hidden="true">
      <line x1="7" y1="7" x2="13" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="7" x2="7" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
// ───────────────────────────────────────────────────────────────────────────

export function RSVPForm({ onSubmitted }: RSVPFormProps) {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<RSVPStatus>(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !status) return;
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
      setError(e instanceof Error ? e.message : "Gagal mengirim. Coba lagi ya!");
    } finally {
      setLoading(false);
    }
  };

  // ── Success State ──────────────────────────────────────────────────────────
  if (submitted) {
    const isHadir = status === "hadir";
    return (
      <div
        className="text-center py-10 px-4 rounded-xl animate-fade-up"
        style={{
          background: isHadir
            ? "linear-gradient(135deg, rgba(90,21,37,0.5), rgba(42,8,16,0.7))"
            : "rgba(42,8,16,0.5)",
          border: isHadir
            ? "1px solid rgba(200,168,90,0.35)"
            : "1px solid rgba(245,230,200,0.1)",
        }}
      >
        <div
          className="text-5xl mb-4 inline-block"
          style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          {isHadir ? "🎉" : "🥺"}
        </div>

        <p
          className="font-black tracking-wider uppercase mb-2"
          style={{
            fontFamily: "var(--font-display-loaded, sans-serif)",
            fontSize: "1.4rem",
            color: isHadir ? "var(--color-cd-cream, #f5e6c8)" : "rgba(245,230,200,0.7)",
          }}
        >
          {isHadir ? "See You There!" : "We'll Miss You!"}
        </p>

        <p
          className="text-sm leading-relaxed"
          style={{
            color: "rgba(245,230,200,0.55)",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
        >
          {isHadir
            ? "Konfirmasi kehadiranmu sudah kami terima. Sampai jumpa di party! 🎓"
            : "Terima kasih sudah memberitahu kami. Semoga lain kali bisa hadir!"}
        </p>

        {/* Divider */}
        <div
          className="my-5 mx-auto"
          style={{
            height: 1,
            width: "60%",
            background: "linear-gradient(90deg, transparent, rgba(200,168,90,0.3), transparent)",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-script-loaded, cursive)",
            fontSize: "1.1rem",
            color: "var(--color-cd-pink, #e8728a)",
          }}
        >
          With love, the team ♥
        </p>

        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.5); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  const canSubmit = name.trim() !== "" && status !== null;

  return (
    <div className="space-y-6">

      {/* ── Name Field ── */}
      <div className="space-y-2">
        <label
          className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase"
          style={{
            color: "rgba(245,230,200,0.65)",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
        >
          <span style={{ color: "var(--color-cd-gold, #c8a85a)" }}>01.</span>
          Nama Lengkap
        </label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama kamu..."
            className="w-full rounded-lg transition-all duration-300 outline-none"
            style={{
              padding: "13px 16px 13px 44px",
              background: "rgba(32, 6, 12, 0.8)",
              border: name
                ? "1.5px solid rgba(200,168,90,0.55)"
                : "1.5px solid rgba(200,168,90,0.2)",
              color: "var(--color-cd-cream, #f5e6c8)",
              fontFamily: "var(--font-body-loaded, sans-serif)",
              fontSize: "0.95rem",
              boxShadow: name ? "0 0 12px rgba(200,168,90,0.12)" : "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1.5px solid rgba(232,114,138,0.7)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(232,114,138,0.18)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = name
                ? "1.5px solid rgba(200,168,90,0.55)"
                : "1.5px solid rgba(200,168,90,0.2)";
              e.currentTarget.style.boxShadow = name ? "0 0 12px rgba(200,168,90,0.12)" : "none";
            }}
          />
          {/* Icon */}
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none"
            style={{ opacity: 0.5 }}
          >
            ✏️
          </span>
        </div>
      </div>

      {/* ── Attendance Toggle ── */}
      <div className="space-y-3">
        <label
          className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase"
          style={{
            color: "rgba(245,230,200,0.65)",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
        >
          <span style={{ color: "var(--color-cd-gold, #c8a85a)" }}>02.</span>
          Konfirmasi Kehadiran
        </label>

        <div className="grid grid-cols-2 gap-3">
          {/* HADIR */}
          <button
            type="button"
            onClick={() => setStatus("hadir")}
            className="relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer group"
            style={{
              padding: "14px 8px",
              background:
                status === "hadir"
                  ? "linear-gradient(135deg, #7a2035, #c0425a)"
                  : "rgba(32,6,12,0.8)",
              border:
                status === "hadir"
                  ? "1.5px solid rgba(200,168,90,0.5)"
                  : "1.5px solid rgba(200,168,90,0.18)",
              boxShadow:
                status === "hadir"
                  ? "0 8px 24px rgba(192,66,90,0.45), inset 0 1px 0 rgba(245,230,200,0.1)"
                  : "none",
              transform: status === "hadir" ? "scale(1.02)" : "scale(1)",
              color:
                status === "hadir"
                  ? "var(--color-cd-cream, #f5e6c8)"
                  : "rgba(245,230,200,0.45)",
            }}
          >
            {/* Shimmer on selected */}
            {status === "hadir" && (
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.08) 50%, transparent 65%)",
                  animation: "shimmerCard 2s ease-in-out infinite",
                }}
              />
            )}
            <span className="relative flex flex-col items-center gap-1.5">
              <span
                style={{
                  color: status === "hadir" ? "var(--color-cd-cream)" : "rgba(245,230,200,0.3)",
                }}
              >
                <CheckIcon />
              </span>
              <span
                className="font-bold tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-body-loaded, sans-serif)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                }}
              >
                Hadir
              </span>
            </span>
          </button>

          {/* TIDAK HADIR */}
          <button
            type="button"
            onClick={() => setStatus("tidak_hadir")}
            className="relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer"
            style={{
              padding: "14px 8px",
              background:
                status === "tidak_hadir"
                  ? "rgba(32, 6, 12, 0.95)"
                  : "rgba(32,6,12,0.8)",
              border:
                status === "tidak_hadir"
                  ? "1.5px solid rgba(245,230,200,0.3)"
                  : "1.5px solid rgba(200,168,90,0.18)",
              boxShadow:
                status === "tidak_hadir"
                  ? "0 6px 18px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,230,200,0.05)"
                  : "none",
              transform: status === "tidak_hadir" ? "scale(1.02)" : "scale(1)",
              color:
                status === "tidak_hadir"
                  ? "rgba(245,230,200,0.75)"
                  : "rgba(245,230,200,0.35)",
            }}
          >
            <span className="relative flex flex-col items-center gap-1.5">
              <span>
                <CrossIcon />
              </span>
              <span
                className="font-bold tracking-widest uppercase"
                style={{
                  fontFamily: "var(--font-body-loaded, sans-serif)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                }}
              >
                Tidak Hadir
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* ── Message Field ── */}
      <div className="space-y-2">
        <label
          className="flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase"
          style={{
            color: "rgba(245,230,200,0.65)",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
        >
          <span style={{ color: "var(--color-cd-gold, #c8a85a)" }}>03.</span>
          Ucapan / Pesan
          <span
            className="ml-1 text-xs font-normal tracking-normal normal-case"
            style={{ color: "rgba(245,230,200,0.3)" }}
          >
            (opsional)
          </span>
        </label>

        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis ucapan atau doa untuk ulang tahun ini..."
            rows={3}
            className="w-full rounded-lg transition-all duration-300 outline-none resize-none"
            style={{
              padding: "13px 16px 13px 44px",
              background: "rgba(32, 6, 12, 0.8)",
              border: message
                ? "1.5px solid rgba(200,168,90,0.45)"
                : "1.5px solid rgba(200,168,90,0.2)",
              color: "var(--color-cd-cream, #f5e6c8)",
              fontFamily: "var(--font-body-loaded, sans-serif)",
              fontSize: "0.9rem",
              lineHeight: 1.6,
              boxShadow: message ? "0 0 12px rgba(200,168,90,0.1)" : "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1.5px solid rgba(232,114,138,0.6)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(232,114,138,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = message
                ? "1.5px solid rgba(200,168,90,0.45)"
                : "1.5px solid rgba(200,168,90,0.2)";
              e.currentTarget.style.boxShadow = message ? "0 0 12px rgba(200,168,90,0.1)" : "none";
            }}
          />
          <span
            className="absolute left-3.5 top-3.5 text-base pointer-events-none"
            style={{ opacity: 0.45 }}
          >
            💬
          </span>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
          style={{
            background: "rgba(192,66,90,0.15)",
            border: "1px solid rgba(192,66,90,0.35)",
            color: "var(--color-cd-pink, #e8728a)",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
        >
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* ── Submit Button ── */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
        className="relative w-full overflow-hidden rounded-lg font-bold transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
        style={{
          padding: "15px 0",
          background: canSubmit
            ? "linear-gradient(135deg, #7a2035 0%, #c0425a 50%, #7a2035 100%)"
            : "rgba(50,10,20,0.5)",
          backgroundSize: canSubmit ? "200% 100%" : "100% 100%",
          animation: canSubmit ? "btnShift 3s ease infinite" : "none",
          border: canSubmit
            ? "1.5px solid rgba(200,168,90,0.4)"
            : "1.5px solid rgba(200,168,90,0.1)",
          boxShadow: canSubmit
            ? "0 12px 30px rgba(192,66,90,0.45)"
            : "none",
          color: canSubmit ? "var(--color-cd-cream, #f5e6c8)" : "rgba(245,230,200,0.2)",
          fontFamily: "var(--font-body-loaded, sans-serif)",
          fontSize: "0.95rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: !canSubmit ? 0.45 : 1,
          transform: canSubmit ? undefined : undefined,
        }}
      >
        {/* Shimmer sweep */}
        {canSubmit && (
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              animation: "shimmerCard 2.5s ease-in-out infinite",
            }}
          />
        )}
        <span className="relative">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2 a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              Mengirim...
            </span>
          ) : (
            "Kirim Konfirmasi 🎓"
          )}
        </span>
      </button>

      <style>{`
        @keyframes shimmerCard {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes btnShift {
          0%, 100% { background-position: 0% center; }
          50%       { background-position: 100% center; }
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(245,230,200,0.25);
        }
        input:-webkit-autofill,
        textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px #20060c inset !important;
          -webkit-text-fill-color: #f5e6c8 !important;
        }
      `}</style>
    </div>
  );
}
