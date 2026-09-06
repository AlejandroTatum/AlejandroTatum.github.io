"use client";

import { useEffect, useState } from "react";
import { BootOverlay } from "@/components/proto/BootOverlay";
import { Chrome, PROTO_SECTIONS } from "@/components/proto/Chrome";
import { CommandPalette } from "@/components/proto/CommandPalette";
import { ProtoProvider, useProtoContext } from "@/components/proto/ProtoContext";
import { ShortcutsOverlay } from "@/components/proto/ShortcutsOverlay";
import {
  AboutSection,
  ContactSection,
  HeroSection,
  ProjectsSection,
  StackSection,
  TerminalSection,
  uiCopy,
} from "@/components/proto/sections";
import { useProtoHotkeys } from "@/components/proto/useProtoHotkeys";
import { useKonami } from "@/components/proto/useKonami";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import type { Locale } from "@/lib/i18n";

function ProtoHotkeysAndOverlay({ booted, locale }: { booted: boolean; locale: Locale }) {
  const { shortcutsOpen, closeShortcuts } = useProtoHotkeys(booted);
  useKonami(booted);
  return <ShortcutsOverlay open={shortcutsOpen} onClose={closeShortcuts} locale={locale} />;
}

type ChromeConnectedProps = {
  locale: Locale;
  active: string;
  crtOn: boolean;
  onToggleLocale: () => void;
  onToggleCrt: () => void;
  onActiveChange: (id: string) => void;
};

/** Wires the shared context's `openPalette`/`overdrive` into Chrome. */
function ChromeConnected(props: ChromeConnectedProps) {
  const { openPalette, overdrive } = useProtoContext();
  return <Chrome {...props} onOpenPalette={openPalette} overdrive={overdrive} />;
}

export default function ProtoPage() {
  // Spanish first: it is Alejandro's native language and the primary audience.
  const [locale, setLocale] = useState<Locale>("es");
  const [booted, setBooted] = useState(false);
  const [crtOn, setCrtOn] = useState(true);
  const [overdrive, setOverdrive] = useState(false);
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

  const toggleCrt = () => setCrtOn((current) => !current);

  const toggleOverdrive = () => setOverdrive((current) => !current);

  return (
    <SmoothScrollProvider>
      <ProtoProvider
        locale={locale}
        toggleLocale={toggleLocale}
        crtOn={crtOn}
        toggleCrt={toggleCrt}
        overdrive={overdrive}
        toggleOverdrive={toggleOverdrive}
        activeSection={active}
      >
        <div className={overdrive ? "proto-root is-overdrive" : "proto-root"}>
          {!booted ? <BootOverlay onDone={() => setBooted(true)} /> : null}
          <div className={crtOn ? "proto-scanlines" : "proto-scanlines is-off"} aria-hidden="true" />
          <ChromeConnected
            locale={locale}
            active={active}
            crtOn={crtOn}
            onToggleLocale={toggleLocale}
            onToggleCrt={toggleCrt}
            onActiveChange={setActive}
          />
          <ProtoHotkeysAndOverlay booted={booted} locale={locale} />
          <CommandPalette />

          {/* Remounting on locale swap re-arms every ScrollTrigger reveal. */}
          <main className="proto-main" key={locale}>
            <HeroSection locale={locale} booted={booted} />
            <AboutSection locale={locale} />
            <StackSection locale={locale} />
            <ProjectsSection locale={locale} />
            <TerminalSection locale={locale} />
            <ContactSection locale={locale} />

            <footer className="proto-footer">
              <span>© 2026 alejandro padilla</span>
              <span>{ui.footerNote}</span>
            </footer>
          </main>
        </div>
      </ProtoProvider>
    </SmoothScrollProvider>
  );
}
