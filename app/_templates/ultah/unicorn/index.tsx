import { RSVPEntry } from "@/app/api/rsvp/route";
import { CountdownTimer } from "./components/CountdownTimer";
import { RSVPSection } from "./components/RSVPSection";
import {
  UnicornHead,
  FloatingElement,
  RainbowDivider,
} from "./components/UnicornElements";
import fs from "fs";
import path from "path";
import { WelcomeSplash } from "./components/WelcomeSplash";
import Image from "next/image";

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
  birthdayPerson: "Princess Cecel", // Nama yang berulang tahun
  age: 5, // Usia
  date: "Sabtu, 16 Mei 2026",
  isoDate: "2026-05-16T14:00:00",
  time: "13:00 WIB — Selesai",
  venue: "Ballroom Hotel Fitra",
  address:
    "Jl. K.H.Abdul Halim No.88, Munjul, Kec. Majalengka, Kabupaten Majalengka, Jawa Barat 45418", // Tambahkan alamat lengkap
  dresscode: "Pink & Ungu",
  parentName: "Aceng Sunanto & Mia Nurma Sunanto", // Nama orang tua / penyelenggara
  guestName: "Tamu Istimewa", // Bisa diubah dinamis per tamu
};
// =============================================

export default async function InvitationPage() {
  const initialRSVP = await getRSVPData();
  return (
    <main
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #fff0f9 0%, #f5e8ff 30%, #ffe0f5 60%, #f8e8ff 100%)",
      }}
    >
      {/* Music Player */}
      <WelcomeSplash
        src="/music/birthday.mp3"
        birthdayPerson={INVITATION_DATA.birthdayPerson}
      />
      {/* Background decorative circles */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #b347ea, transparent)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[-8%] w-72 h-72 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #ff85c2, transparent)",
          }}
        />
        <div
          className="absolute top-[40%] left-[5%] w-48 h-48 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #ffd700, transparent)",
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <FloatingElement
          type="star"
          className="absolute w-8 h-8 animate-float"
          style={{ top: "8%", left: "5%", animationDelay: "0s" }}
        />
        <FloatingElement
          type="sparkle"
          className="absolute w-6 h-6 animate-float-slow"
          style={{ top: "15%", right: "8%", animationDelay: "1s" }}
        />
        <FloatingElement
          type="heart"
          className="absolute w-10 h-10 animate-bounce-gentle"
          style={{ top: "25%", left: "2%", animationDelay: "0.5s" }}
        />
        <FloatingElement
          type="diamond"
          className="absolute w-8 h-8 animate-float"
          style={{ top: "35%", right: "3%", animationDelay: "2s" }}
        />
        <FloatingElement
          type="flower"
          className="absolute w-10 h-10 animate-float-slow"
          style={{ bottom: "30%", left: "4%", animationDelay: "1.5s" }}
        />
        <FloatingElement
          type="star"
          className="absolute w-6 h-6 animate-sparkle"
          style={{ bottom: "20%", right: "5%", animationDelay: "0.8s" }}
        />
        <FloatingElement
          type="heart"
          className="absolute w-7 h-7 animate-float"
          style={{ bottom: "10%", left: "8%", animationDelay: "2.5s" }}
        />
        <FloatingElement
          type="sparkle"
          className="absolute w-8 h-8 animate-twinkle"
          style={{ top: "60%", right: "2%", animationDelay: "1.2s" }}
        />
        <FloatingElement
          type="diamond"
          className="absolute w-6 h-6 animate-float-slow"
          style={{ top: "70%", left: "6%", animationDelay: "3s" }}
        />
      </div>

      {/* Main content */}
      <div
        className="relative mx-auto max-w-lg px-4 py-12 space-y-6"
        style={{ zIndex: 2 }}
      >
        {/* ═══ HERO SECTION ═══ */}
        <section className="text-center animate-fade-up">
          <div className="relative inline-block">
            {/* Rotating ring behind unicorn */}
            <div
              className="absolute inset-0 rounded-full animate-rotate-slow opacity-30"
              style={{
                background:
                  "conic-gradient(#ff85c2, #b347ea, #ffd700, #ff3399, #ff85c2)",
                margin: "-8px",
                filter: "blur(4px)",
              }}
            />
            {/* <UnicornHead className="relative w-36 h-36 mx-auto drop-shadow-2xl" /> */}
            <div
              className="text-7xl mb-2 animate-bounce-gentle inline-flex w-32 h-32 rounded-full object-cover overflow-hidden items-center"
              style={{ filter: "drop-shadow(0 4px 12px rgba(179,71,234,0.3))" }}
            >
              <Image
                width={1080}
                height={1080}
                src={"/images/kaka2.jpeg"}
                alt="cecel2"
              />
            </div>
          </div>

          <div
            className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, #ffd700, #ff85c2)",
              color: "#fff",
              letterSpacing: "0.15em",
            }}
          >
            ✨ You&apos;re Invited ✨
          </div>
        </section>

        {/* ═══ INVITATION CARD ═══ */}
        <section
          className="rounded-[2rem] p-8 text-center animate-fade-up-delay card-shadow"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1.5px solid rgba(255,255,255,0.6)",
          }}
        >
          <p
            className="text-sm font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: "#b347ea" }}
          >
            Dengan penuh suka cita
          </p>

          <h1
            className="text-shimmer text-5xl sm:text-6xl font-black leading-tight mb-1"
            style={{ fontFamily: "var(--font-display-loaded, serif)" }}
          >
            Happy
            <br />
            Birthday!
          </h1>

          <p
            className="text-4xl sm:text-5xl font-bold mt-2 mb-1"
            style={{
              fontFamily: "var(--font-script-loaded, cursive)",
              color: "#b347ea",
            }}
          >
            {INVITATION_DATA.birthdayPerson}
          </p>

          <div
            className="inline-block px-6 py-2 rounded-full font-black text-2xl text-white mt-2"
            style={{
              background: "linear-gradient(135deg, #ff85c2, #b347ea)",
              boxShadow: "0 8px 25px rgba(179,71,234,0.4)",
            }}
          >
            🎂 {INVITATION_DATA.age} Tahun 🎂
          </div>

          <RainbowDivider />

          <p className="text-sm" style={{ color: "#7c15c8" }}>
            Kepada Yth.
          </p>
          <p
            className="text-2xl font-bold mt-1"
            style={{
              fontFamily: "var(--font-script-loaded, cursive)",
              color: "#ff3399",
            }}
          >
            {INVITATION_DATA.guestName}
          </p>

          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "#7c15c8" }}
          >
            Kami dengan gembira mengundang kamu untuk merayakan hari yang ajaib
            bersama kami! 🦄✨
          </p>
        </section>

        {/* ═══ EVENT DETAILS ═══ */}
        <section
          className="rounded-[2rem] p-7 animate-fade-up-delay2 card-shadow"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1.5px solid rgba(255,255,255,0.6)",
          }}
        >
          <h2
            className="text-center text-xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display-loaded, serif)",
              color: "#7c15c8",
            }}
          >
            ✨ Detail Acara ✨
          </h2>

          <div className="space-y-4">
            {[
              { icon: "🎉", label: "Acara", value: "Ulang Tahun" },
              { icon: "📅", label: "Tanggal", value: INVITATION_DATA.date },
              { icon: "⏰", label: "Waktu", value: INVITATION_DATA.time },
              { icon: "📍", label: "Tempat", value: INVITATION_DATA.venue },
              {
                icon: "👗",
                label: "Dresscode",
                value: INVITATION_DATA.dresscode,
                highlight: true,
              },
            ].map(({ icon, label, value, highlight }) => (
              <div
                key={label}
                className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300"
                style={{
                  background: highlight
                    ? "linear-gradient(135deg, rgba(255,133,194,0.15), rgba(179,71,234,0.15))"
                    : "rgba(255,255,255,0.5)",
                  border: highlight
                    ? "1.5px solid rgba(179,71,234,0.3)"
                    : "1.5px solid rgba(255,255,255,0.6)",
                }}
              >
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-0.5"
                    style={{ color: "#b347ea" }}
                  >
                    {label}
                  </p>
                  <p
                    className="font-semibold text-base"
                    style={{
                      color: "#3d0a5c",
                      fontFamily: highlight
                        ? "var(--font-script-loaded, cursive)"
                        : "inherit",
                      fontSize: highlight ? "1.1rem" : undefined,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dresscode visual hint */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="flex gap-2 items-center">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                style={{ background: "#ff85c2" }}
                title="Pink"
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#b347ea" }}
              >
                Pink
              </span>
            </div>
            <span className="text-[#b347ea] text-lg">&amp;</span>
            <div className="flex gap-2 items-center">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                style={{ background: "#b347ea" }}
                title="Ungu"
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#b347ea" }}
              >
                Ungu
              </span>
            </div>
          </div>
        </section>

        {/* ═══ COUNTDOWN ═══ */}
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
            className="text-center text-xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display-loaded, serif)",
              color: "#7c15c8",
            }}
          >
            🎈 Hitung Mundur 🎈
          </h2>
          <CountdownTimer targetDate={INVITATION_DATA.isoDate} />
          <p
            className="text-center text-xs mt-5 font-medium tracking-wide"
            style={{ color: "#b347ea" }}
          >
            Menuju hari yang paling ajaib! ✨
          </p>
        </section>

        {/* ═══ MAP / LOCATION PLACEHOLDER ═══ */}
        <section
          className="rounded-[2rem] overflow-hidden card-shadow"
          style={{
            background: "rgba(255,255,255,0.55)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1.5px solid rgba(255,255,255,0.6)",
          }}
        >
          <div className="p-6">
            <h2
              className="text-center text-xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display-loaded, serif)",
                color: "#7c15c8",
              }}
            >
              📍 Lokasi Acara
            </h2>
            <p
              className="text-center font-bold text-lg"
              style={{ color: "#3d0a5c" }}
            >
              {INVITATION_DATA.venue}
            </p>
            <p
              className="text-center text-sm mt-1 mb-4"
              style={{ color: "#b347ea" }}
            >
              {INVITATION_DATA.address}
            </p>
          </div>

          {/* Map embed placeholder */}
          <div
            className="w-full h-48 flex items-center justify-center relative"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,133,194,0.1), rgba(179,71,234,0.1))",
            }}
          >
            {/* Replace iframe src with actual Google Maps embed URL */}
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(INVITATION_DATA.venue + " " + INVITATION_DATA.address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Acara"
            />
          </div>

          <div className="p-4 flex justify-center">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(INVITATION_DATA.venue + " " + INVITATION_DATA.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ff85c2, #b347ea)",
                boxShadow: "0 8px 25px rgba(179,71,234,0.3)",
              }}
            >
              🗺️ Buka di Google Maps
            </a>
          </div>
        </section>

        {/* ═══ RSVP + WISHES SECTION ═══ */}
        <RSVPSection initialData={initialRSVP} />

        {/* ═══ FOOTER ═══ */}
        <footer className="text-center py-8 space-y-3">
          <div className="flex justify-center gap-3 flex-wrap">
            {["🦄", "🌈", "✨", "🎂", "💜", "🌸", "⭐"].map((emoji, i) => (
              <span
                key={i}
                className="text-2xl animate-bounce-gentle"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
          <p
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-script-loaded, cursive)",
              color: "#b347ea",
            }}
          >
            With love & unicorn magic ✨
          </p>
          <p className="text-xs" style={{ color: "#c8a8f9" }}>
            — {INVITATION_DATA.parentName} —
          </p>
        </footer>
      </div>
    </main>
  );
}
