"use client";

import { RSVPEntry } from "@/app/api/rsvp/route";
import { useState, useEffect, useCallback } from "react";

const EMOJIS_HADIR = ["🎉", "🦄", "🌈", "💙", "🎂", "✨", "🌸", "🎈"];
const EMOJIS_TIDAK = ["😢", "💌", "🌷", "💫", "🥺", "🌙"];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function randomEmoji(list: string[], seed: string): string {
  // Deterministic from id seed so SSR & client match
  let n = 0;
  for (let i = 0; i < seed.length; i++) n += seed.charCodeAt(i);
  return list[n % list.length];
}

interface WishCardProps {
  entry: RSVPEntry;
  index: number;
}

function WishCard({ entry, index }: WishCardProps) {
  const isHadir = entry.status === "hadir";
  const emoji = randomEmoji(isHadir ? EMOJIS_HADIR : EMOJIS_TIDAK, entry.id);

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: isHadir
          ? "linear-gradient(135deg, rgba(96,165,250,0.12), rgba(59,130,246,0.12))"
          : "rgba(255,255,255,0.5)",
        border: isHadir
          ? "1.5px solid rgba(59,130,246,0.25)"
          : "1.5px solid rgba(147,197,253,0.25)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 font-bold"
          style={{
            background: isHadir
              ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
              : "linear-gradient(135deg, #93c5fd, #60a5fa)",
          }}
        >
          {entry.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-bold text-sm truncate"
              style={{ color: "#0f172a" }}
            >
              {entry.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
              style={{
                background: isHadir
                  ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                  : "rgba(147,197,253,0.3)",
                color: isHadir ? "#fff" : "#1d4ed8",
              }}
            >
              {emoji} {isHadir ? "Hadir" : "Tidak Hadir"}
            </span>
          </div>

          {/* Message */}
          {entry.message && (
            <p
              className="mt-1.5 text-sm leading-relaxed"
              style={{ color: "#1e40af" }}
            >
              &ldquo;{entry.message}&rdquo;
            </p>
          )}

          {/* Date */}
          <p className="mt-1.5 text-xs" style={{ color: "#93c5fd" }}>
            {formatDate(entry.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WishesWall({ initialData }: { initialData: RSVPEntry[] }) {
  const [entries, setEntries] = useState<RSVPEntry[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"semua" | "hadir" | "tidak_hadir">(
    "semua",
  );

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", { cache: "no-store" });
      const json = await res.json();
      if (json.success) setEntries(json.data);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh every 30s to pick up new submissions
  useEffect(() => {
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const filtered =
    filter === "semua" ? entries : entries.filter((e) => e.status === filter);

  const totalHadir = entries.filter((e) => e.status === "hadir").length;
  const totalTidak = entries.filter((e) => e.status === "tidak_hadir").length;

  return (
    <div>
      {/* Stats bar */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div
          className="flex-1 min-w-[80px] rounded-2xl p-3 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(59,130,246,0.2))",
            border: "1.5px solid rgba(59,130,246,0.2)",
          }}
        >
          <p className="text-2xl font-black" style={{ color: "#3b82f6" }}>
            {totalHadir}
          </p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            🎉 Hadir
          </p>
        </div>
        <div
          className="flex-1 min-w-[80px] rounded-2xl p-3 text-center"
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "1.5px solid rgba(147,197,253,0.3)",
          }}
        >
          <p className="text-2xl font-black" style={{ color: "#60a5fa" }}>
            {totalTidak}
          </p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            😢 Tidak Hadir
          </p>
        </div>
        <div
          className="flex-1 min-w-[80px] rounded-2xl p-3 text-center"
          style={{
            background: "rgba(255,255,255,0.5)",
            border: "1.5px solid rgba(147,197,253,0.3)",
          }}
        >
          <p className="text-2xl font-black" style={{ color: "#38bdf8" }}>
            {entries.length}
          </p>
          <p className="text-xs font-semibold" style={{ color: "#1d4ed8" }}>
            ✨ Total
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(["semua", "hadir", "tidak_hadir"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-1 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer"
            style={{
              background:
                filter === f
                  ? "linear-gradient(135deg, #60a5fa, #3b82f6)"
                  : "rgba(255,255,255,0.5)",
              color: filter === f ? "#fff" : "#1d4ed8",
              border:
                filter === f ? "none" : "1.5px solid rgba(59,130,246,0.2)",
            }}
          >
            {f === "semua"
              ? "✨ Semua"
              : f === "hadir"
                ? "🎉 Hadir"
                : "😢 Tidak Hadir"}
          </button>
        ))}
      </div>

      {/* Refresh button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={refresh}
          disabled={loading}
          className="text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1.5px solid rgba(59,130,246,0.2)",
            color: "#3b82f6",
          }}
        >
          {loading ? "⏳ Memuat..." : "🔄 Refresh"}
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🦄</p>
          <p className="text-sm font-medium" style={{ color: "#3b82f6" }}>
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        </div>
      ) : (
        <div
          className="space-y-3 max-h-96 overflow-y-auto pr-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#3b82f6 transparent",
          }}
        >
          {filtered.map((entry, i) => (
            <WishCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
