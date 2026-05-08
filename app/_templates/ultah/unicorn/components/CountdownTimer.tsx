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
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-card flex items-center justify-center animate-pulse-glow"
            style={{
              background: "linear-gradient(135deg, rgba(255,133,194,0.3), rgba(179,71,234,0.3))",
              border: "2px solid rgba(179,71,234,0.4)",
            }}
          >
            <span
              className="text-2xl sm:text-3xl font-bold"
              style={{
                fontFamily: "var(--font-display-loaded, serif)",
                color: "#7c15c8",
              }}
            >
              {String(value).padStart(2, "0")}
            </span>
          </div>
          <span
            className="mt-2 text-xs sm:text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#b347ea" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
