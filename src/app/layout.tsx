import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import "./terminal.css";

// Pixel display font, used only for kickers, group labels, buttons and small
// accents (not body text). Self-hosted at build time, so it is safe for the
// static GitHub Pages export.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

// Workhorse mono face of the dev-mode home. Also self-hosted at build time.
const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alejandro Padilla · Full-Stack Developer",
  description:
    "Full-stack developer in Ecuador building FastAPI and Next.js systems on PostgreSQL, with LLM automation and computer vision where they remove real work. Open to part-time and contract roles, remote with US-timezone overlap.",
  keywords: [
    "Alejandro Padilla",
    "full-stack developer",
    "Python developer",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "applied AI",
    "remote developer",
    "Ecuador",
  ],
  openGraph: {
    title: "Alejandro Padilla · Full-Stack Developer",
    description:
      "FastAPI · Next.js · PostgreSQL · Docker · applied AI. Client work, public code, open to part-time and contract roles.",
    type: "website",
    url: "https://alejandrotatum.github.io/",
  },
};

export const viewport: Viewport = {
  themeColor: "#131017",
};

// Static export serves one HTML for both routes; Spanish is the root
// route's rendered default, so lang must say "es". The pixel route (English
// default) corrects document.documentElement.lang at runtime.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${pressStart.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
