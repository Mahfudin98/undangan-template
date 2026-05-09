"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface WelcomeSplashProps {
  src: string;
  birthdayPerson: string;
}

export function WelcomeSplash({ src, birthdayPerson }: WelcomeSplashProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false); // splash visible
  const [closing, setClosing] = useState(false); // exit animation
  const [playing, setPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.5;
    audio.addEventListener("canplaythrough", () => setMusicReady(true));
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));
    audioRef.current = audio;

    // Show splash after tiny delay so page renders first
    const t = setTimeout(() => setOpen(true), 300);
    return () => {
      audio.pause();
      audio.src = "";
      clearTimeout(t);
    };
  }, [src]);

  const handleOpen = () => {
    // This click IS the user interaction — browser allows play here
    audioRef.current?.play().catch(() => {});
    setClosing(true);
    setTimeout(() => setOpen(false), 600);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.pause() : audio.play().catch(() => {});
  };

  return (
    <>
      {/* ── Splash overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(160deg, #ffe0f5 0%, #e8b4f8 40%, #c8a8f9 100%)",
            opacity: closing ? 0 : 1,
            transform: closing ? "scale(1.05)" : "scale(1)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Sparkles background */}
          {[
            { top: "8%", left: "10%", size: 28, delay: 0 },
            { top: "12%", right: "8%", size: 20, delay: 0.4 },
            { top: "30%", left: "4%", size: 16, delay: 0.8 },
            { top: "25%", right: "5%", size: 24, delay: 0.2 },
            { bottom: "20%", left: "8%", size: 20, delay: 1 },
            { bottom: "15%", right: "6%", size: 28, delay: 0.6 },
            { bottom: "35%", left: "3%", size: 14, delay: 1.2 },
            { bottom: "28%", right: "3%", size: 18, delay: 0.3 },
          ].map((s, i) => (
            <span
              key={i}
              className="absolute text-yellow-300 animate-sparkle pointer-events-none"
              style={{
                top: s.top,
                left: (s as { left?: string }).left,
                right: (s as { right?: string }).right,
                bottom: s.bottom,
                fontSize: s.size,
                animationDelay: `${s.delay}s`,
                filter: "drop-shadow(0 0 4px #ffd700)",
              }}
            >
              ✦
            </span>
          ))}

          {/* Card */}
          <div
            className="relative mx-6 max-w-sm w-full rounded-[2.5rem] p-8 text-center"
            style={{
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              border: "1.5px solid rgba(255,255,255,0.6)",
              boxShadow: "0 30px 80px rgba(179,71,234,0.25)",
              animation:
                "splashCardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
            }}
          >
            {/* Unicorn */}
            <div
              className="text-7xl mb-2 animate-bounce-gentle inline-flex border border-unicorn-purple h-52 w-52 rounded-full justify-center items-center overflow-hidden"
              style={{ filter: "drop-shadow(0 4px 12px rgba(179,71,234,0.3))" }}
            >
              <Image
                width={1080}
                height={1080}
                src="/images/Kaka1.jpeg"
                alt={"Cecel 1"}
                className="rounded-full object-cover"
              />
            </div>

            <div
              className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "#b347ea" }}
            >
              ✨ Sebuah Undangan Istimewa ✨
            </div>

            <h1
              className="text-3xl font-black leading-tight mb-1"
              style={{
                fontFamily: "var(--font-display-loaded, serif)",
                background: "linear-gradient(135deg, #7c15c8, #ff3399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ulang Tahun
            </h1>
            <p
              className="text-2xl font-bold mb-5"
              style={{
                fontFamily: "var(--font-script-loaded, cursive)",
                color: "#b347ea",
              }}
            >
              {birthdayPerson}
            </p>

            {/* Music note */}
            <p
              className="text-xs mb-6"
              style={{ color: "#7c15c8", opacity: 0.8 }}
            >
              🎵 Tap untuk membuka undangan &amp; memutar musik
            </p>

            {/* CTA button */}
            <button
              onClick={handleOpen}
              className="relative w-full py-4 rounded-2xl font-black text-white text-lg tracking-wide overflow-hidden cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, #ff85c2, #b347ea, #7c15c8)",
                boxShadow: "0 12px 35px rgba(179,71,234,0.5)",
                fontFamily: "var(--font-display-loaded, serif)",
              }}
            >
              {/* Shimmer effect on button */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmerBtn 2s linear infinite",
                }}
              />
              <span className="relative">🎀 Buka Undangan</span>
            </button>
          </div>

          <style>{`
            @keyframes splashCardIn {
              from { opacity: 0; transform: scale(0.8) translateY(20px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes shimmerBtn {
              0%   { background-position: -200% center; }
              100% { background-position:  200% center; }
            }
          `}</style>
        </div>
      )}

      {/* ── Floating music toggle (shown after splash dismissed) ── */}
      {!open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          style={{
            animation: "fadeUpPlayer 0.5s ease forwards",
          }}
        >
          {/* Now playing pill */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{
              maxWidth: playing ? "145px" : "0px",
              opacity: playing ? 1 : 0,
            }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #ff85c2, #b347ea)",
                boxShadow: "0 4px 15px rgba(179,71,234,0.4)",
              }}
            >
              <span className="flex items-end gap-0.5 h-3">
                {[0.6, 0.9, 0.7].map((dur, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-white rounded-full"
                    style={{
                      height: "4px",
                      animation: playing
                        ? `bar${i} ${dur}s ease-in-out infinite alternate`
                        : "none",
                    }}
                  />
                ))}
              </span>
              🎵 Now Playing
            </div>
          </div>

          {/* Play / Pause button */}
          <button
            onClick={toggleMusic}
            disabled={!musicReady}
            title={playing ? "Pause musik" : "Play musik"}
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #ff85c2, #b347ea, #7c15c8)",
              boxShadow: playing
                ? "0 0 0 4px rgba(179,71,234,0.3), 0 8px 25px rgba(179,71,234,0.5)"
                : "0 8px 25px rgba(179,71,234,0.4)",
            }}
          >
            {playing && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  border: "2px solid rgba(255,133,194,0.6)",
                  animation: "pingRing 1.5s ease-out infinite",
                }}
              />
            )}
            {playing ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <span className="absolute -top-1 -right-1 text-sm">🦄</span>
          </button>

          <style>{`
            @keyframes fadeUpPlayer {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes pingRing {
              0%   { transform: scale(1);   opacity: 0.8; }
              100% { transform: scale(1.5); opacity: 0;   }
            }
            @keyframes bar0 { from { height: 4px; } to { height: 10px; } }
            @keyframes bar1 { from { height: 4px; } to { height: 14px; } }
            @keyframes bar2 { from { height: 4px; } to { height: 8px;  } }
          `}</style>
        </div>
      )}
    </>
  );
}
