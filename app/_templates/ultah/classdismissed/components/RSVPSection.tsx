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

  const sectionStyle = {
    background: "rgba(42, 8, 16, 0.75)",
    border: "1px solid rgba(200, 168, 90, 0.2)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  };

  const headingStyle = {
    fontFamily: "var(--font-display-loaded, sans-serif)",
    color: "var(--color-cd-cream, #f5e6c8)",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
  };

  return (
    <>
      {/* RSVP Form */}
      <section className="rounded-xl p-7" style={sectionStyle}>
        <h2 className="text-center text-xl font-bold mb-2" style={headingStyle}>
          💌 Konfirmasi Kehadiran
        </h2>
        <p
          className="text-center text-sm mb-6 tracking-wide"
          style={{ color: "rgba(245,230,200,0.5)" }}
        >
          Beritahu kami sebelum acara dimulai ya!
        </p>
        <RSVPForm onSubmitted={handleSubmitted} />
      </section>

      {/* Wishes Wall */}
      <section className="rounded-xl p-7" style={sectionStyle}>
        <h2 className="text-center text-xl font-bold mb-2" style={headingStyle}>
          🌟 Ucapan &amp; Doa
        </h2>
        <p
          className="text-center text-sm mb-6 tracking-wide"
          style={{ color: "rgba(245,230,200,0.5)" }}
        >
          Pesan dari orang-orang tersayang ✨
        </p>
        <WishesWall key={refreshKey} initialData={entries} />
      </section>
    </>
  );
}
