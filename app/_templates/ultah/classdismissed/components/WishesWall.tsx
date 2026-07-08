"use client";

import { RSVPEntry } from "@/app/api/rsvp/route";
import { useState, useEffect, useCallback } from "react";

const EMOJIS_HADIR = ["🎉", "🎓", "⭐", "🏆", "🎈", "✨", "🎊", "🏅"];
const EMOJIS_TIDAK = ["😢", "💌", "📝", "📚", "🌙", "💫"];

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
      className="rounded-lg p-4 transition-all duration-300 hover:scale-[1.01]"
      style={{
        background: isHadir
          ? "rgba(90, 21, 37, 0.5)"
          : "rgba(42, 8, 16, 0.6)",
        border: isHadir
          ? "1px solid rgba(200,168,90,0.3)"
          : "1px solid rgba(245,230,200,0.1)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm flex-shrink-0 font-bold"
          style={{
            background: isHadir
              ? "linear-gradient(135deg, #7a2035, #c0425a)"
              : "rgba(58,10,20,0.8)",
            border: "1px solid rgba(200,168,90,0.25)",
            color: "var(--color-cd-cream, #f5e6c8)",
            fontFamily: "var(--font-display-loaded, sans-serif)",
          }}
        >
          {entry.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-bold text-sm truncate"
              style={{
                color: "var(--color-cd-cream, #f5e6c8)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              {entry.name}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-sm font-semibold flex-shrink-0 tracking-wider uppercase"
              style={{
                background: isHadir
                  ? "rgba(192,66,90,0.4)"
                  : "rgba(42,8,16,0.6)",
                border: isHadir
                  ? "1px solid rgba(200,168,90,0.35)"
                  : "1px solid rgba(245,230,200,0.1)",
                color: isHadir
                  ? "var(--color-cd-gold, #c8a85a)"
                  : "rgba(245,230,200,0.5)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
                fontSize: "0.65rem",
              }}
            >
              {emoji} {isHadir ? "Hadir" : "Tidak Hadir"}
            </span>
          </div>

          {/* Message */}
          {entry.message && (
            <p
              className="mt-1.5 text-sm leading-relaxed italic"
              style={{ color: "rgba(245,230,200,0.65)" }}
            >
              &ldquo;{entry.message}&rdquo;
            </p>
          )}

          {/* Date */}
          <p
            className="mt-1.5 text-xs"
            style={{ color: "rgba(245,230,200,0.35)" }}
          >
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
        {[
          { label: "🎉 Hadir", value: totalHadir, highlight: true },
          { label: "😢 Tidak", value: totalTidak, highlight: false },
          { label: "✨ Total", value: entries.length, highlight: false },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className="flex-1 min-w-[80px] rounded-lg p-3 text-center"
            style={{
              background: highlight
                ? "rgba(90, 21, 37, 0.5)"
                : "rgba(42, 8, 16, 0.6)",
              border: highlight
                ? "1px solid rgba(200,168,90,0.3)"
                : "1px solid rgba(245,230,200,0.1)",
            }}
          >
            <p
              className="text-2xl font-black"
              style={{
                fontFamily: "var(--font-display-loaded, sans-serif)",
                color: highlight
                  ? "var(--color-cd-gold, #c8a85a)"
                  : "rgba(245,230,200,0.6)",
              }}
            >
              {value}
            </p>
            <p
              className="text-xs font-semibold tracking-wider uppercase"
              style={{
                color: "rgba(245,230,200,0.45)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(["semua", "hadir", "tidak_hadir"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-1 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer"
            style={{
              background:
                filter === f
                  ? "linear-gradient(135deg, #7a2035, #c0425a)"
                  : "rgba(42, 8, 16, 0.6)",
              color:
                filter === f
                  ? "var(--color-cd-cream, #f5e6c8)"
                  : "rgba(245,230,200,0.45)",
              border:
                filter === f
                  ? "1px solid rgba(200,168,90,0.4)"
                  : "1px solid rgba(245,230,200,0.1)",
              fontFamily: "var(--font-body-loaded, sans-serif)",
            }}
          >
            {f === "semua"
              ? "✨ Semua"
              : f === "hadir"
                ? "🎉 Hadir"
                : "😢 Tidak"}
          </button>
        ))}
      </div>

      {/* Refresh button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={refresh}
          disabled={loading}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 tracking-widest uppercase"
          style={{
            background: "rgba(42, 8, 16, 0.6)",
            border: "1px solid rgba(245,230,200,0.15)",
            color: "rgba(245,230,200,0.5)",
            fontFamily: "var(--font-body-loaded, sans-serif)",
          }}
        >
          {loading ? "⏳ Memuat..." : "🔄 Refresh"}
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🎓</p>
          <p
            className="text-sm font-medium tracking-wide"
            style={{
              color: "rgba(245,230,200,0.45)",
              fontFamily: "var(--font-body-loaded, sans-serif)",
            }}
          >
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        </div>
      ) : (
        <div
          className="space-y-3 max-h-96 overflow-y-auto pr-1"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(200,168,90,0.4) transparent",
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
