"use client";

import { useState, useRef, useEffect } from "react";

interface WelcomeSplashProps {
  src: string;
  birthdayPerson: string;
}

export function WelcomeSplash({ src, birthdayPerson }: WelcomeSplashProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
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

    const t = setTimeout(() => setOpen(true), 300);
    return () => {
      audio.pause();
      audio.src = "";
      clearTimeout(t);
    };
  }, [src]);

  const handleOpen = () => {
    audioRef.current?.play().catch(() => {});
    setClosing(true);
    setTimeout(() => setOpen(false), 700);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playing ? audio.pause() : audio.play().catch(() => {});
  };

  return (
    <>
      {/* ════════════════════════════════════
          SPLASH SCREEN
      ════════════════════════════════════ */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #2a0810 0%, #3a0a14 50%, #1e0608 100%)",
            opacity: closing ? 0 : 1,
            transform: closing ? "scale(1.04)" : "scale(1)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {/* ── Chalk horizontal lines (classroom effect) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(245,230,200,0.045) 38px, rgba(245,230,200,0.045) 39px)",
            }}
          />

          {/* ── Radial vignette corners ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 45%, rgba(10,2,5,0.65) 100%)",
            }}
          />

          {/* ── Floating chalk symbols (background layer) ── */}
          {[
            { sym: "★", top: "5%",  left: "6%",  sz: 28, c: "rgba(232,114,138,0.45)", d: 0 },
            { sym: "✦", top: "8%",  right: "8%", sz: 22, c: "rgba(245,230,200,0.3)",  d: 0.5 },
            { sym: "♥", top: "20%", left: "3%",  sz: 26, c: "rgba(232,114,138,0.35)", d: 1 },
            { sym: "✦", top: "25%", right: "4%", sz: 18, c: "rgba(200,168,90,0.4)",   d: 0.3 },
            { sym: "★", bottom: "22%", left: "4%", sz: 24, c: "rgba(245,230,200,0.28)", d: 1.5 },
            { sym: "♥", bottom: "16%", right: "6%", sz: 20, c: "rgba(232,114,138,0.4)", d: 0.8 },
            { sym: "✦", top: "50%", left: "2%", sz: 16, c: "rgba(200,168,90,0.3)",    d: 2 },
            { sym: "★", top: "55%", right: "3%", sz: 20, c: "rgba(232,114,138,0.3)",   d: 1.2 },
          ].map((d, i) => (
            <span
              key={i}
              className="absolute pointer-events-none animate-twinkle select-none"
              style={{
                top: d.top,
                left: (d as Record<string, unknown>).left as string | undefined,
                right: (d as Record<string, unknown>).right as string | undefined,
                bottom: d.bottom,
                fontSize: d.sz,
                color: d.c,
                animationDelay: `${d.d}s`,
                textShadow: "0 0 8px currentColor",
                fontFamily: "serif",
              }}
            >
              {d.sym}
            </span>
          ))}

          {/* ── Paper airplane chalk doodle ── */}
          <svg
            viewBox="0 0 70 55"
            className="absolute pointer-events-none animate-float"
            style={{ top: "32%", left: "1.5%", width: 44, opacity: 0.18, animationDelay: "0.6s" }}
            aria-hidden="true"
          >
            <path d="M4 28 L64 6 L36 50 L30 30 Z M30 30 L40 24" stroke="#f5e6c8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
          <svg
            viewBox="0 0 50 44"
            className="absolute pointer-events-none animate-bounce-gentle"
            style={{ top: "26%", right: "2%", width: 34, opacity: 0.2, animationDelay: "1s" }}
            aria-hidden="true"
          >
            <path d="M5 37 L10 14 L22 26 L25 7 L28 26 L40 14 L45 37 Z" stroke="#e8728a" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
          </svg>

          {/* ════ MAIN CARD ════ */}
          <div
            className="relative mx-5 max-w-sm w-full text-center"
            style={{ animation: "splashCardIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both" }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-3 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(192,66,90,0.18) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(32, 6, 12, 0.96)",
                border: "1.5px solid rgba(200,168,90,0.4)",
                boxShadow:
                  "0 0 0 1px rgba(200,168,90,0.1), 0 32px 80px rgba(0,0,0,0.75), inset 0 0 80px rgba(58,10,20,0.4)",
              }}
            >
              {/* ── Top accent bar ── */}
              <div
                style={{
                  height: 4,
                  background: "linear-gradient(90deg, #7a2035, #c0425a, #e8728a, #c0425a, #7a2035)",
                  backgroundSize: "200% 100%",
                  animation: "shimmerBar 3s linear infinite",
                }}
              />

              <div className="px-7 pt-6 pb-7">
                {/* ── Badge: PRIVATE BIRTHDAY PARTY ── */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-sm"
                  style={{
                    background: "rgba(245,230,200,0.06)",
                    border: "1px solid rgba(200,168,90,0.5)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(245,230,200,0.06)",
                  }}
                >
                  <span style={{ color: "var(--color-cd-gold, #c8a85a)", fontSize: "0.7rem" }}>★</span>
                  <span
                    className="text-xs font-bold tracking-[0.2em] uppercase"
                    style={{
                      color: "var(--color-cd-gold, #c8a85a)",
                      fontFamily: "var(--font-body-loaded, sans-serif)",
                    }}
                  >
                    Private Birthday Party
                  </span>
                  <span style={{ color: "var(--color-cd-gold, #c8a85a)", fontSize: "0.7rem" }}>★</span>
                </div>

                {/* ── You're Invited script ── */}
                <p
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-script-loaded, cursive)",
                    fontSize: "1.15rem",
                    color: "var(--color-cd-pink, #e8728a)",
                    textShadow: "0 0 12px rgba(232,114,138,0.4)",
                    letterSpacing: "0.02em",
                  }}
                >
                  ♥ You&apos;re Invited! ♥
                </p>

                {/* ── CLASS DISMISSED ── */}
                <h1
                  style={{
                    fontFamily: "var(--font-display-loaded, sans-serif)",
                    fontSize: "clamp(2.6rem, 12vw, 3.4rem)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    color: "var(--color-cd-cream, #f5e6c8)",
                    textShadow: "3px 3px 0 rgba(0,0,0,0.6), 0 0 24px rgba(245,230,200,0.12)",
                    margin: "0.35rem 0 0.1rem",
                  }}
                >
                  CLASS
                  <br />
                  DISMISSED.
                </h1>

                {/* ── Let's Party script ── */}
                <p
                  style={{
                    fontFamily: "var(--font-script-loaded, cursive)",
                    fontSize: "clamp(1.7rem, 7vw, 2.2rem)",
                    color: "var(--color-cd-pink, #e8728a)",
                    textShadow: "2px 2px 0 rgba(0,0,0,0.5), 0 0 20px rgba(232,114,138,0.35)",
                    marginBottom: "1.25rem",
                    lineHeight: 1.1,
                  }}
                >
                  Let&apos;s Party!
                </p>

                {/* ── Gold divider ── */}
                <div
                  style={{
                    height: 1,
                    background: "linear-gradient(90deg, transparent, rgba(200,168,90,0.45) 30%, rgba(200,168,90,0.45) 70%, transparent)",
                    marginBottom: "1.25rem",
                  }}
                />

                {/* ── "for" + name ── */}
                <p
                  className="text-xs tracking-[0.2em] uppercase mb-1"
                  style={{
                    color: "rgba(245,230,200,0.45)",
                    fontFamily: "var(--font-body-loaded, sans-serif)",
                  }}
                >
                  A special party for
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-script-loaded, cursive)",
                    fontSize: "1.5rem",
                    color: "var(--color-cd-pink, #e8728a)",
                    textShadow: "0 0 12px rgba(232,114,138,0.3)",
                    marginBottom: "1.5rem",
                    lineHeight: 1.2,
                  }}
                >
                  {birthdayPerson}
                </p>

                {/* ── Music hint ── */}
                <p
                  className="text-xs mb-5"
                  style={{
                    color: "rgba(245,230,200,0.42)",
                    fontFamily: "var(--font-body-loaded, sans-serif)",
                    letterSpacing: "0.03em",
                  }}
                >
                  🎵 Tap untuk membuka undangan &amp; memutar musik
                </p>

                {/* ── CTA BUTTON ── */}
                <button
                  onClick={handleOpen}
                  className="relative w-full overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98]"
                  style={{
                    padding: "14px 0",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #7a2035 0%, #c0425a 50%, #7a2035 100%)",
                    backgroundSize: "200% 100%",
                    animation: "btnPulse 3s ease-in-out infinite",
                    boxShadow:
                      "0 12px 30px rgba(192,66,90,0.55), 0 2px 0 rgba(200,168,90,0.3) inset",
                    border: "1.5px solid rgba(200,168,90,0.35)",
                    fontFamily: "var(--font-body-loaded, sans-serif)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-cd-cream, #f5e6c8)",
                  }}
                >
                  {/* Shimmer sweep */}
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
                      backgroundSize: "200% 100%",
                      animation: "shimmerBtn 2.5s ease-in-out infinite",
                    }}
                  />
                  <span className="relative">🎓 Buka Undangan</span>
                </button>
              </div>

              {/* ── Bottom accent bar ── */}
              <div
                style={{
                  height: 3,
                  background: "linear-gradient(90deg, #7a2035, #c0425a, #e8728a, #c0425a, #7a2035)",
                  backgroundSize: "200% 100%",
                  animation: "shimmerBar 3s linear infinite reverse",
                }}
              />
            </div>
          </div>

          <style>{`
            @keyframes splashCardIn {
              from { opacity: 0; transform: scale(0.82) translateY(28px); }
              to   { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes shimmerBtn {
              0%   { background-position: 200% center; }
              100% { background-position: -200% center; }
            }
            @keyframes shimmerBar {
              0%   { background-position: 0% center; }
              100% { background-position: 200% center; }
            }
            @keyframes btnPulse {
              0%, 100% { background-position: 0% center; box-shadow: 0 12px 30px rgba(192,66,90,0.55); }
              50%       { background-position: 100% center; box-shadow: 0 14px 40px rgba(192,66,90,0.75); }
            }
          `}</style>
        </div>
      )}

      {/* ════════════════════════════════════
          FLOATING MUSIC PLAYER (post-splash)
      ════════════════════════════════════ */}
      {!open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          style={{ animation: "fadeUpPlayer 0.5s ease both" }}
        >
          {/* Now playing pill */}
          <div
            className="overflow-hidden transition-all duration-500"
            style={{ maxWidth: playing ? "155px" : "0px", opacity: playing ? 1 : 0 }}
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #5a1525, #c0425a)",
                boxShadow: "0 4px 16px rgba(192,66,90,0.45)",
                color: "var(--color-cd-cream, #f5e6c8)",
                border: "1px solid rgba(200,168,90,0.3)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              {/* EQ bars */}
              <span className="flex items-end gap-0.5 h-3">
                {[0.6, 0.9, 0.7].map((dur, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full"
                    style={{
                      height: "4px",
                      background: "var(--color-cd-cream, #f5e6c8)",
                      animation: playing
                        ? `eqBar${i} ${dur}s ease-in-out infinite alternate`
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
            className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #5a1525, #c0425a)",
              boxShadow: playing
                ? "0 0 0 3px rgba(192,66,90,0.35), 0 8px 24px rgba(192,66,90,0.55)"
                : "0 8px 24px rgba(192,66,90,0.4)",
              border: "1.5px solid rgba(200,168,90,0.35)",
            }}
          >
            {/* Pulsing ring when playing */}
            {playing && (
              <span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  border: "2px solid rgba(232,114,138,0.55)",
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
            <span
              className="absolute -top-1.5 -right-1.5 text-base leading-none select-none"
              style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
            >
              🎓
            </span>
          </button>

          <style>{`
            @keyframes fadeUpPlayer {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes pingRing {
              0%   { transform: scale(1);   opacity: 0.75; }
              100% { transform: scale(1.55); opacity: 0; }
            }
            @keyframes eqBar0 { from { height: 3px; } to { height: 11px; } }
            @keyframes eqBar1 { from { height: 3px; } to { height: 15px; } }
            @keyframes eqBar2 { from { height: 3px; } to { height: 8px;  } }
          `}</style>
        </div>
      )}
    </>
  );
}
