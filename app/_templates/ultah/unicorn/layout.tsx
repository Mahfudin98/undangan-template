import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Nunito, Anton, Oswald } from "next/font/google";
import "./theme.css";

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["400"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script-loaded",
  display: "swap",
  weight: ["400", "600", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "🎓 Undangan Ulang Tahun — Class Dismissed",
  description: "You're invited to a Private Birthday Party! Class Dismissed, Let's Party!",
  keywords: ["undangan", "ulang tahun", "birthday", "party", "school", "class dismissed"],
  openGraph: {
    title: "🎓 Undangan Ulang Tahun — Class Dismissed",
    description: "You're invited to a Private Birthday Party! Class Dismissed, Let's Party!",
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
        className={`${anton.variable} ${dancingScript.variable} ${oswald.variable} ${playfairDisplay.variable}`}
        style={{
          fontFamily: "var(--font-body-loaded, var(--font-body))",
        }}
      >
        {children}
      </body>
    </html>
  );
}
