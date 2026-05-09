"use client";

import { useState, useCallback } from "react";
import { RSVPForm } from "./RSVPForm";
import { WishesWall } from "./WishesWall";
import { RSVPEntry } from "@/app/api/rsvp/route";

interface RSVPSectionProps {
  initialData: RSVPEntry[];
}

export function RSVPSection({ initialData }: RSVPSectionProps) {
  const [entries, setEntries] = useState<RSVPEntry[]>(initialData);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmitted = useCallback(async () => {
    try {
      const res = await fetch("/api/rsvp", { cache: "no-store" });
      const json = await res.json();
      if (json.success) {
        setEntries(json.data);
        setRefreshKey((k) => k + 1);
      }
    } catch {
      // silent fail — WishesWall has its own refresh
    }
  }, []);

  return (
    <>
      {/* RSVP Form card */}
      <section
        className="rounded-[2rem] p-7 card-shadow"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(255,255,255,0.6)",
        }}
      >
        <h2
          className="text-center text-xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display-loaded, serif)",
            color: "#1d4ed8",
          }}
        >
          💌 Konfirmasi Kehadiran
        </h2>
        <p className="text-center text-sm mb-6" style={{ color: "#3b82f6" }}>
          Beritahu kami sebelum 15 Mei 2026 ya!
        </p>
        <RSVPForm onSubmitted={handleSubmitted} />
      </section>

      {/* Wishes Wall card */}
      <section
        className="rounded-[2rem] p-7 card-shadow"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1.5px solid rgba(255,255,255,0.6)",
        }}
      >
        <h2
          className="text-center text-xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display-loaded, serif)",
            color: "#1d4ed8",
          }}
        >
          🌟 Ucapan & Doa
        </h2>
        <p className="text-center text-sm mb-6" style={{ color: "#3b82f6" }}>
          Pesan dari orang-orang tersayang ✨
        </p>
        <WishesWall key={refreshKey} initialData={entries} />
      </section>
    </>
  );
}
