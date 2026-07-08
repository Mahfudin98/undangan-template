import { RSVPEntry } from "@/app/api/rsvp/route";
import { CountdownTimer } from "./components/CountdownTimer";
import { RSVPSection } from "./components/RSVPSection";
import { WelcomeSplash } from "./components/WelcomeSplash";
import fs from "fs";
import path from "path";

async function getRSVPData(): Promise<RSVPEntry[]> {
  try {
    const file = path.join(process.cwd(), "data", "rsvp.json");
    if (!fs.existsSync(file)) return [];
    const raw = fs.readFileSync(file, "utf-8");
    return JSON.parse(raw) as RSVPEntry[];
  } catch {
    return [];
  }
}

// =============================================
// DATA UNDANGAN — Edit bagian ini sesuai kebutuhan
// =============================================
const INVITATION_DATA = {
  /** Nama yang berulang tahun */
  birthdayPerson: "Mianurmasunanto",
  /** Label initial / monogram (maks 1-2 karakter) */
  initial: "M",
  /** Tanggal tampilan */
  date: "Jumat – Minggu, 17–19 Juli 2026",
  /** ISO date untuk countdown — arahkan ke Main Event */
  isoDate: "2026-07-18T19:00:00",
  /** Waktu tampil */
  time: "Start 19.00 WIB — Till Drop",
  /** Waktu main event */
  mainEventDate: "Sabtu, 18 Juli 2026",
  /** Nama venue */
  venue: "Lingga Tjiburial Villa",
  /** Alamat */
  address: "Dago, Bandung",
  /** Google Maps query */
  mapsQuery: "Lingga Tjiburial Villa Dago Bandung",
  /** Dresscode */
  dresscode: "Putih Abu-Abu",
  /** Sub dresscode label */
  dresscodeNote: "SMA",
  /** Tema pesta */
  theme: "Back to School: Last Bell Before the Party",
  /** Nama penyelenggara / orang tua */
  ownerName: "Mianurmasunanto",
  /** Label owner */
  ownerLabel: "Owner",
  /** Catatan khusus */
  note: "DON'T FORGET PATUHI DRESSCODE !!! Karena jika kamu beruntung dapat DOORPRIZE / SPECIAL GIFT tidak akan SAH jika kamu tidak pakai DRESSCODE yang sesuai.",
  /** Nama tamu (bisa diubah dinamis) */
  guestName: "Special Guest",
};
// =============================================

// ── Helper decorative components ──

/** Tanda bintang chalk kecil */
function ChalkStar({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

/** Divider bergaya garis kapur */
function ChalkDivider({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(245,230,200,0.35) 20%, rgba(245,230,200,0.35) 80%, transparent)",
        margin: "0.75rem 0",
      }}
    />
  );
}

/** Label ala "stempel kertas" */
function PaperStamp({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-block px-4 py-1 text-xs font-bold tracking-widest uppercase ${className ?? ""}`}
      style={{
        background: "var(--color-cd-cream, #f5e6c8)",
        color: "var(--color-cd-maroon, #3a0a14)",
        borderRadius: "2px",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.4)",
        fontFamily: "var(--font-body-loaded, sans-serif)",
      }}
    >
      {children}
    </div>
  );
}

/** Card ala potongan kertas kusam (cream / paper feel) */
function PaperCard({ children, className, rotate }: { children: React.ReactNode; className?: string; rotate?: string }) {
  return (
    <div
      className={`relative rounded-sm px-5 py-4 ${className ?? ""}`}
      style={{
        background: "var(--color-cd-cream, #f5e6c8)",
        color: "var(--color-cd-maroon, #3a0a14)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.45), 2px 2px 0 rgba(0,0,0,0.15)",
        transform: rotate ?? "none",
      }}
    >
      {/* Tape strip top */}
      <div className="tape-top" />
      {children}
    </div>
  );
}

export default async function InvitationPage() {
  const initialRSVP = await getRSVPData();

  return (
    <main
      className="min-h-screen relative overflow-hidden chalkboard-bg"
      style={{
        zIndex: 0,
        background: "linear-gradient(160deg, #3a0a14 0%, #200608 45%, #3a0a14 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* ── Music / Welcome splash ── */}
      <WelcomeSplash
        src="/music/ku-bahagia_FwVExBPJ.mp3"
        birthdayPerson={INVITATION_DATA.birthdayPerson}
      />

      {/* ── Background chalk line texture (fixed) ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 34px, rgba(245,230,200,0.03) 34px, rgba(245,230,200,0.03) 35px)
          `,
          zIndex: 0,
        }}
      />

      {/* ── Floating chalk doodles ── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
        aria-hidden="true"
      >
        {/* Stars */}
        {[
          { top: "4%", left: "4%", size: 28, delay: 0, color: "rgba(232,114,138,0.45)" },
          { top: "7%", right: "5%", size: 20, delay: 0.6, color: "rgba(245,230,200,0.3)" },
          { top: "18%", left: "2%", size: 16, delay: 1.2, color: "rgba(200,168,90,0.4)" },
          { top: "22%", right: "3%", size: 22, delay: 0.3, color: "rgba(232,114,138,0.35)" },
          { top: "45%", left: "3%", size: 18, delay: 1.5, color: "rgba(245,230,200,0.25)" },
          { top: "55%", right: "4%", size: 14, delay: 0.8, color: "rgba(200,168,90,0.35)" },
          { bottom: "35%", left: "5%", size: 20, delay: 2, color: "rgba(232,114,138,0.4)" },
          { bottom: "20%", right: "4%", size: 24, delay: 1, color: "rgba(245,230,200,0.3)" },
          { bottom: "8%", left: "3%", size: 16, delay: 0.4, color: "rgba(200,168,90,0.35)" },
          { bottom: "5%", right: "6%", size: 18, delay: 1.8, color: "rgba(232,114,138,0.3)" },
        ].map((s, i) => (
          <ChalkStar
            key={i}
            className={`absolute animate-${i % 3 === 0 ? "twinkle" : i % 3 === 1 ? "float-slow" : "sparkle"}`}
            style={{
              top: s.top,
              left: (s as unknown as Record<string, string>).left,
              right: (s as unknown as Record<string, string>).right,
              bottom: s.bottom,
              width: s.size,
              height: s.size,
              color: s.color,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* Paper airplane chalk doodle left */}
        <svg
          viewBox="0 0 60 50"
          className="absolute animate-float"
          style={{
            top: "30%",
            left: "2%",
            width: 40,
            opacity: 0.2,
            color: "var(--color-cd-cream, #f5e6c8)",
            animationDelay: "0.7s",
          }}
          aria-hidden="true"
        >
          <path
            d="M5 25 L55 5 L30 45 L25 28 Z M25 28 L35 22"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Crown doodle right */}
        <svg
          viewBox="0 0 60 45"
          className="absolute animate-bounce-gentle"
          style={{
            top: "28%",
            right: "2%",
            width: 36,
            opacity: 0.22,
            color: "var(--color-cd-pink, #e8728a)",
            animationDelay: "1.1s",
          }}
          aria-hidden="true"
        >
          <path
            d="M5 38 L10 15 L22 28 L30 8 L38 28 L50 15 L55 38 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinejoin="round"
          />
        </svg>

        {/* Heart doodle */}
        <svg
          viewBox="0 0 50 45"
          className="absolute animate-float-slow"
          style={{
            bottom: "30%",
            right: "3%",
            width: 30,
            opacity: 0.2,
            color: "var(--color-cd-pink, #e8728a)",
            animationDelay: "2s",
          }}
          aria-hidden="true"
        >
          <path
            d="M25 40 C25 40 5 25 5 13 A10 10 0 0 1 25 10 A10 10 0 0 1 45 13 C45 25 25 40 25 40Z"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
          />
        </svg>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="relative mx-auto max-w-lg px-4 py-12 space-y-6"
        style={{ zIndex: 2 }}
      >
        {/* ═══════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════ */}
        <section className="text-center animate-fade-up space-y-3">
          {/* You're Invited ribbon */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1 text-sm font-semibold tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-script-loaded, cursive)",
              color: "var(--color-cd-pink, #e8728a)",
              fontSize: "1.1rem",
              textShadow: "0 0 10px rgba(232,114,138,0.4)",
            }}
          >
            ♥ You&apos;re Invited! ♥
          </div>

          {/* PRIVATE BIRTHDAY PARTY sticker (top right feel) */}
          <div className="flex justify-end">
            <div
              className="px-4 py-2 rounded-sm text-center"
              style={{
                background: "var(--color-cd-cream, #f5e6c8)",
                color: "var(--color-cd-maroon, #3a0a14)",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.5)",
                transform: "rotate(3deg)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  opacity: 0.6,
                  fontWeight: 500,
                }}
              >
                ★ ★ ★
              </div>
              <div
                className="font-black tracking-wider"
                style={{ fontSize: "0.95rem", lineHeight: 1.1 }}
              >
                PRIVATE
              </div>
              <div
                className="font-bold tracking-wide"
                style={{ fontSize: "0.8rem", lineHeight: 1.2, opacity: 0.85 }}
              >
                BIRTHDAY PARTY
              </div>
            </div>
          </div>

          {/* CLASS DISMISSED */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display-loaded, 'Anton', 'Impact', sans-serif)",
                fontSize: "clamp(3.8rem, 16vw, 5.5rem)",
                lineHeight: 0.9,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                color: "#f5e6c8",
                textShadow: "3px 3px 0 rgba(0,0,0,0.6), 0 0 24px rgba(245,230,200,0.15)",
                margin: 0,
              }}
            >
              CLASS
              <br />
              DISMISSED.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-script-loaded, 'Dancing Script', cursive)",
                fontSize: "clamp(2.2rem, 10vw, 3.5rem)",
                lineHeight: 1,
                marginTop: "0.25rem",
                color: "#e8728a",
                textShadow: "2px 2px 0 rgba(0,0,0,0.5), 0 0 24px rgba(232,114,138,0.45)",
              }}
            >
              Let&apos;s Party!
            </p>
          </div>

          {/* Tagline */}
          <div className="space-y-0.5 mt-2">
            <p
              className="text-sm tracking-widest uppercase"
              style={{
                color: "rgba(245,230,200,0.85)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              One last day at school.
            </p>
            <p
              className="text-sm tracking-widest uppercase"
              style={{
                color: "rgba(245,230,200,0.85)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
                textShadow: "0 1px 4px rgba(0,0,0,0.5)",
              }}
            >
              One{" "}
              <span
                style={{
                  color: "var(--color-cd-pink, #e8728a)",
                  fontWeight: 700,
                  textShadow: "0 0 12px rgba(232,114,138,0.5)",
                }}
              >
                EPIC NIGHT
              </span>{" "}
              to Remember.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            THEME BANNER (Paper card)
        ═══════════════════════════════════ */}
        <section className="animate-fade-up-delay">
          <PaperCard rotate="rotate(-1deg)">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-1"
              style={{
                color: "rgba(58,10,20,0.55)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              THEME:
            </p>
            <p
              style={{
                fontFamily: "var(--font-script-loaded, cursive)",
                fontSize: "1.3rem",
                lineHeight: 1.3,
                color: "var(--color-cd-maroon, #3a0a14)",
              }}
            >
              {INVITATION_DATA.theme}
            </p>
            {/* Chalk heart doodle */}
            <span
              className="absolute bottom-3 right-4 text-lg"
              style={{ color: "rgba(192,66,90,0.3)" }}
            >
              ♥
            </span>
          </PaperCard>
        </section>

        {/* ═══════════════════════════════════
            DETAIL ACARA
        ═══════════════════════════════════ */}
        <section
          className="rounded-lg p-6 animate-fade-up-delay2"
          style={{
            background: "rgba(42, 8, 16, 0.8)",
            border: "1px solid rgba(200,168,90,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* Kepada */}
          <div className="text-center mb-5">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{
                color: "rgba(245,230,200,0.7)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              Kepada Yth.
            </p>
            <p
              style={{
                fontFamily: "var(--font-script-loaded, cursive)",
                fontSize: "1.6rem",
                color: "var(--color-cd-pink, #e8728a)",
                textShadow: "0 0 10px rgba(232,114,138,0.3)",
              }}
            >
              {INVITATION_DATA.guestName}
            </p>
          </div>

          <ChalkDivider />

          {/* Date / Venue / Main Event grid */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Date column */}
            <div
              className="rounded-lg p-4 text-center"
              style={{
                background: "rgba(58,10,20,0.6)",
                border: "1px solid rgba(200,168,90,0.2)",
              }}
            >
              {/* Calendar icon */}
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: "1.2rem" }}>📅</span>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{
                    color: "rgba(245,230,200,0.75)",
                    fontFamily: "var(--font-body-loaded, sans-serif)",
                  }}
                >
                  Friday – Sunday
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display-loaded, sans-serif)",
                  fontSize: "2.2rem",
                  lineHeight: 1,
                  color: "var(--color-cd-cream, #f5e6c8)",
                }}
              >
                17 – 19
              </p>
              <p
                className="font-semibold tracking-widest"
                style={{
                  color: "rgba(245,230,200,0.85)",
                  fontFamily: "var(--font-body-loaded, sans-serif)",
                  fontSize: "0.8rem",
                }}
              >
                JULY ♥
              </p>
            </div>

            {/* Venue column */}
            <div
              className="rounded-lg p-4"
              style={{
                background: "rgba(58,10,20,0.6)",
                border: "1px solid rgba(200,168,90,0.2)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span style={{ fontSize: "1.2rem" }}>📍</span>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{
                    color: "rgba(245,230,200,0.75)",
                    fontFamily: "var(--font-body-loaded, sans-serif)",
                  }}
                >
                  Venue
                </span>
              </div>
              <p
                className="font-bold leading-tight"
                style={{
                  fontFamily: "var(--font-body-loaded, sans-serif)",
                  fontSize: "0.95rem",
                  color: "var(--color-cd-cream, #f5e6c8)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {INVITATION_DATA.venue}
              </p>
              <p
                style={{
                  color: "rgba(245,230,200,0.75)",
                  fontSize: "0.8rem",
                  marginTop: "4px",
                }}
              >
                {INVITATION_DATA.address}
              </p>
            </div>
          </div>

          {/* Main Event highlight */}
          <div
            className="mt-4 rounded-lg p-4 text-center"
            style={{
              background: "rgba(90,21,37,0.6)",
              border: "1px solid rgba(200,168,90,0.35)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <ChalkStar
                style={{ width: 14, height: 14, color: "var(--color-cd-gold, #c8a85a)" }}
              />
              <span
                className="text-xs font-bold tracking-[0.2em] uppercase"
                style={{
                  color: "var(--color-cd-gold, #c8a85a)",
                  fontFamily: "var(--font-body-loaded, sans-serif)",
                }}
              >
                MAIN EVENT
              </span>
              <ChalkStar
                style={{ width: 14, height: 14, color: "var(--color-cd-gold, #c8a85a)" }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-display-loaded, sans-serif)",
                fontSize: "2.5rem",
                lineHeight: 1,
                color: "var(--color-cd-cream, #f5e6c8)",
              }}
            >
              SATURDAY
            </p>
            <p
              style={{
                fontFamily: "var(--font-display-loaded, sans-serif)",
                fontSize: "3rem",
                lineHeight: 1,
                color: "var(--color-cd-cream, #f5e6c8)",
                textShadow: "0 0 20px rgba(232,114,138,0.3)",
              }}
            >
              18 JULY
            </p>
            <p
              className="mt-1 text-sm tracking-widest"
              style={{
                color: "rgba(245,230,200,0.9)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              {INVITATION_DATA.time}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            DRESSCODE & NOTE
        ═══════════════════════════════════ */}
        <section className="grid grid-cols-2 gap-4">
          {/* Dresscode Shield */}
          <div
            className="rounded-lg p-5 text-center"
            style={{
              background: "rgba(42, 8, 16, 0.8)",
              border: "2px solid rgba(200,168,90,0.3)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            <p
              className="text-xs font-bold tracking-[0.15em] uppercase mb-2"
              style={{
                color: "rgba(245,230,200,0.8)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              DRESS CODE
            </p>
            <p
              style={{
                fontFamily: "var(--font-display-loaded, sans-serif)",
                fontSize: "1.8rem",
                lineHeight: 1,
                color: "var(--color-cd-cream, #f5e6c8)",
                textTransform: "uppercase",
              }}
            >
              {INVITATION_DATA.dresscode.split(" ").map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </p>
            <div
              className="mt-2 inline-block px-3 py-0.5 text-xs font-bold tracking-widest"
              style={{
                border: "1px solid rgba(200,168,90,0.5)",
                borderRadius: "2px",
                color: "var(--color-cd-gold, #c8a85a)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              ★ {INVITATION_DATA.dresscodeNote} ★
            </div>
          </div>

          {/* Note paper card */}
          <div
            className="rounded-sm p-4 relative"
            style={{
              background: "var(--color-cd-cream, #f5e6c8)",
              color: "var(--color-cd-maroon, #3a0a14)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
            }}
          >
            <div className="tape-top" />
            <div className="flex items-center gap-2 mb-2">
              <span
                className="font-black text-sm tracking-wide uppercase"
                style={{ fontFamily: "var(--font-body-loaded, sans-serif)" }}
              >
                CAUTION...!
              </span>
              <span style={{ fontSize: "0.9rem" }}>🚨</span>
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                lineHeight: 1.5,
                fontFamily: "var(--font-body-loaded, sans-serif)",
                color: "rgba(58,10,20,0.85)",
              }}
            >
              {INVITATION_DATA.note.split("SPECIAL GIFT / DORPRIZE MENARIK").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <strong>SPECIAL GIFT / DORPRIZE MENARIK</strong>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════
            COUNTDOWN
        ═══════════════════════════════════ */}
        <section
          className="rounded-lg p-7"
          style={{
            background: "rgba(42, 8, 16, 0.8)",
            border: "1px solid rgba(200,168,90,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            className="text-center text-lg font-bold mb-6 tracking-[0.15em] uppercase"
            style={{
              fontFamily: "var(--font-display-loaded, sans-serif)",
              color: "var(--color-cd-cream, #f5e6c8)",
            }}
          >
            ⏳ Hitung Mundur
          </h2>
          <CountdownTimer targetDate={INVITATION_DATA.isoDate} />
        </section>

        {/* ═══════════════════════════════════
            MAPS / LOCATION
        ═══════════════════════════════════ */}
        <section
          className="rounded-lg overflow-hidden"
          style={{
            background: "rgba(42, 8, 16, 0.8)",
            border: "1px solid rgba(200,168,90,0.2)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <div className="p-6">
            <h2
              className="text-center text-lg font-bold mb-2 tracking-[0.15em] uppercase"
              style={{
                fontFamily: "var(--font-display-loaded, sans-serif)",
                color: "var(--color-cd-cream, #f5e6c8)",
              }}
            >
              📍 Lokasi Acara
            </h2>
            <p
              className="text-center font-bold text-base tracking-wide uppercase"
              style={{
                color: "var(--color-cd-cream, #f5e6c8)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
              }}
            >
              {INVITATION_DATA.venue}
            </p>
            <p
              className="text-center text-sm mt-1 mb-4"
              style={{ color: "rgba(245,230,200,0.75)" }}
            >
              {INVITATION_DATA.address}
            </p>
          </div>

          {/* Map embed */}
          <div className="w-full h-48 relative">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(INVITATION_DATA.mapsQuery)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Acara"
            />
          </div>

          <div className="p-4 flex justify-center">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(INVITATION_DATA.mapsQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 hover:scale-105 tracking-widest uppercase"
              style={{
                background: "linear-gradient(135deg, #7a2035, #c0425a)",
                boxShadow: "0 8px 25px rgba(192,66,90,0.4)",
                color: "var(--color-cd-cream, #f5e6c8)",
                fontFamily: "var(--font-body-loaded, sans-serif)",
                border: "1px solid rgba(200,168,90,0.3)",
              }}
            >
              🗺️ Buka di Google Maps
            </a>
          </div>
        </section>

        {/* ═══════════════════════════════════
            RSVP + WISHES
        ═══════════════════════════════════ */}
        <RSVPSection initialData={initialRSVP} />

        {/* ═══════════════════════════════════
            FOOTER — "With love, Owner"
        ═══════════════════════════════════ */}
        <footer className="text-center py-10 space-y-4">
          {/* Chalk doodle divider */}
          <div className="flex items-center gap-3 justify-center">
            <div
              style={{
                height: "1px",
                flex: 1,
                background: "rgba(245,230,200,0.15)",
              }}
            />
            <span style={{ color: "rgba(232,114,138,0.5)", fontSize: "1rem" }}>
              ♥
            </span>
            <div
              style={{
                height: "1px",
                flex: 1,
                background: "rgba(245,230,200,0.15)",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-script-loaded, cursive)",
              fontSize: "1.1rem",
              color: "rgba(245,230,200,0.8)",
              letterSpacing: "0.05em",
            }}
          >
            With love,
          </p>

          <p
            style={{
              fontFamily: "var(--font-script-loaded, cursive)",
              fontSize: "2.2rem",
              color: "var(--color-cd-pink, #e8728a)",
              textShadow:
                "2px 2px 0 rgba(0,0,0,0.4), 0 0 15px rgba(232,114,138,0.3)",
              lineHeight: 1.1,
            }}
          >
            {INVITATION_DATA.ownerName}
          </p>

          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{
              color: "rgba(245,230,200,0.55)",
              fontFamily: "var(--font-body-loaded, sans-serif)",
            }}
          >
            — ({INVITATION_DATA.ownerLabel}) —
          </p>

          {/* Closing quote paper note */}
          <div
            className="inline-block px-5 py-4 rounded-sm mt-2 text-left"
            style={{
              background: "var(--color-cd-cream, #f5e6c8)",
              color: "rgba(58,10,20,0.7)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
              transform: "rotate(1.5deg)",
              fontFamily: "var(--font-script-loaded, cursive)",
              fontSize: "0.85rem",
              lineHeight: 1.8,
              maxWidth: "220px",
            }}
          >
            Good friends.
            <br />
            Great vibes.
            <br />
            Great night.
            <br />
            Let&apos;s make it
            <br />
            <strong style={{ fontSize: "1rem", color: "var(--color-cd-maroon, #3a0a14)" }}>
              UNFORGETTABLE!
            </strong>{" "}
            😊
          </div>

          {/* Bottom decorations */}
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            {["🎓", "⭐", "🎉", "🏆", "💕", "🎊"].map((emoji, i) => (
              <span
                key={i}
                className="text-xl animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
