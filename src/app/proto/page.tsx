"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BootOverlay } from "@/components/proto/BootOverlay";
import { Chrome, PROTO_SECTIONS } from "@/components/proto/Chrome";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  ProjectsSection,
  StackSection,
  uiCopy,
} from "@/components/proto/sections";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import type { Locale } from "@/lib/i18n";

export default function ProtoPage() {
  // Spanish first: it is Alejandro's native language and the primary audience.
  const [locale, setLocale] = useState<Locale>("es");
  const [booted, setBooted] = useState(false);
  const [crtOn, setCrtOn] = useState(true);
  const [active, setActive] = useState(PROTO_SECTIONS[0].id);
  const ui = uiCopy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Keep overscroll behind the TUI dark (body is light for the pixel site).
  useEffect(() => {
    const previous = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#131017";
    return () => {
      document.body.style.backgroundColor = previous;
    };
  }, []);

  const toggleLocale = () => setLocale((current) => (current === "en" ? "es" : "en"));

  return (
    <SmoothScrollProvider>
      <div className="proto-root">
        {!booted ? <BootOverlay onDone={() => setBooted(true)} /> : null}
        <div className={crtOn ? "proto-scanlines" : "proto-scanlines is-off"} aria-hidden="true" />
        <Chrome
          locale={locale}
          active={active}
          crtOn={crtOn}
          onToggleLocale={toggleLocale}
          onToggleCrt={() => setCrtOn((current) => !current)}
          onActiveChange={setActive}
        />

        {/* Remounting on locale swap re-arms every ScrollTrigger reveal. */}
        <main className="proto-main" key={locale}>
          <HeroSection locale={locale} booted={booted} />
          <AboutSection locale={locale} />
          <StackSection locale={locale} />
          <ProjectsSection locale={locale} />
          <ContactSection locale={locale} />

          <footer className="proto-footer">
            <span>© 2026 alejandro padilla</span>
            <span>{ui.footerNote}</span>
            <Link href="/">{`[ ${ui.exitToPixel} ]`}</Link>
          </footer>
        </main>
      </div>
    </SmoothScrollProvider>
  );
}
