import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./proto.css";

// Workhorse mono face for the dev-mode TUI (self-hosted at build time, safe
// for the static GitHub Pages export). The pixel display font stays loaded
// from the root layout and is reserved for the name and boot title.
const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "alejandro@portfolio:~ — dev mode (proto)",
  description:
    "Prototype of a terminal-style dev mode for Alejandro Padilla's portfolio: the same bilingual content, presented as a live terminal session with GSAP ScrollTrigger.",
  robots: { index: false, follow: false },
};

export default function ProtoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`proto-scrollroot ${jetbrainsMono.variable}`}>{children}</div>;
}
