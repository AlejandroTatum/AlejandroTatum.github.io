import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alejandro Padilla | Portfolio",
  description:
    "Backend and full-stack developer in progress. Computer Science student open to remote programming internships.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
