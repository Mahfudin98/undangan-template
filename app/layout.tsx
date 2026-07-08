import type { Metadata, Viewport } from "next";
import { Anton, Fredoka, Oswald, Geist } from "next/font/google";
import "./_templates/ultah/unicorn/theme.css";

// ── Root Fonts (Geist untuk default UI) ──
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// ── Class Dismissed Template Fonts ──
// Anton — display/judul besar (CLASS DISMISSED.)
const anton = Anton({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "block",   // "block" mencegah FOUT
  weight: ["400"],
});

// Fredoka — font clear non-cursive pengganti Dancing Script
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-script-loaded", // Keep variable name sama agar tidak perlu edit file lain
  display: "block",
  weight: ["400", "600", "700"],
});

// Oswald — font body utama (label, button, uppercase text)
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "block",
  weight: ["300", "400", "500", "600", "700"],
});

// ── Viewport — WAJIB untuk mobile agar ukuran dan font render dengan benar ──
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// ── Metadata (fallback / default) ──
export const metadata: Metadata = {
  title: "Undangan Digital",
  description: "Undangan digital berbasis web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`scroll-smooth ${anton.variable} ${fredoka.variable} ${oswald.variable} ${geistSans.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
