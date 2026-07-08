"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex items-center justify-center relative overflow-hidden"
            style={{
              background: "rgba(42, 8, 16, 0.8)",
              border: "2px solid rgba(200, 168, 90, 0.4)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(245,230,200,0.08)",
            }}
          >
            {/* Subtle chalk texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(245,230,200,0.02) 4px, rgba(245,230,200,0.02) 5px)",
              }}
            />
            <span
              className="relative text-2xl sm:text-3xl font-bold"
              style={{
                fontFamily: "var(--font-display-loaded, sans-serif)",
                color: "var(--color-cd-cream, #f5e6c8)",
                textShadow: "0 0 10px rgba(232,114,138,0.3)",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span
            className="mt-2 text-xs sm:text-sm font-semibold tracking-widest uppercase"
            style={{
              color: "rgba(245,230,200,0.6)",
              fontFamily: "var(--font-body-loaded, sans-serif)",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
