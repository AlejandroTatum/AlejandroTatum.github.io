import type { Metadata, Viewport } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

// Pixel display font, used only for kickers, group labels, buttons and small
// accents (not body text). Self-hosted at build time, so it is safe for the
// static GitHub Pages export.
const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alejandro Padilla | Automation, AI Agents & Full-Stack Software",
  description:
    "Portfolio of Alejandro Padilla, a software developer in Ecuador building automation, AI-agent, backend and full-stack solutions for business problems.",
  keywords: [
    "Alejandro Padilla",
    "automation developer",
    "AI agents",
    "backend developer",
    "full-stack developer",
    "Ecuador",
  ],
  openGraph: {
    title: "Alejandro Padilla | Automation & Software Development",
    description:
      "Automation, AI-agent, backend and full-stack software built around practical business problems.",
    type: "website",
    url: "https://alejandrotatum.github.io/",
  },
};

export const viewport: Viewport = {
  themeColor: "#fffbfc",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={pressStart.variable}>
      <body>{children}</body>
    </html>
  );
}
