import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Nunito } from "next/font/google";
import "./theme.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script-loaded",
  display: "swap",
  weight: ["400", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "🦄 Undangan Ulang Tahun — Tema Unicorn",
  description: "You're invited to a magical unicorn birthday celebration!",
  keywords: ["undangan", "ulang tahun", "unicorn", "birthday", "invitation"],
  openGraph: {
    title: "🦄 Undangan Ulang Tahun — Tema Unicorn",
    description: "You're invited to a magical unicorn birthday celebration!",
    type: "website",
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${playfairDisplay.variable} ${dancingScript.variable} ${nunito.variable}`}
        style={{
          fontFamily: "var(--font-body-loaded, var(--font-body))",
        }}
      >
        {children}
      </body>
    </html>
  );
}
