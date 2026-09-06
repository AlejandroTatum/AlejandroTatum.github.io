"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  FiCommand,
  FiCpu,
  FiFileText,
  FiFilm,
  FiFolder,
  FiMail,
  FiMaximize,
  FiTerminal,
  FiUser,
  FiX,
} from "react-icons/fi";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Locale } from "@/lib/i18n";

export type ProtoSection = {
  id: string;
  cmd: string;
  label: Record<Locale, string>;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  color: string;
};

export const PROTO_SECTIONS: ProtoSection[] = [
  { id: "whoami", cmd: "whoami", label: { en: "whoami", es: "quien-soy" }, icon: FiUser, color: "#ff9ec7" },
  { id: "about", cmd: "cat about.md", label: { en: "about", es: "sobre-mi" }, icon: FiFileText, color: "#c4b5fd" },
  { id: "stack", cmd: "open ~/stack", label: { en: "stack", es: "stack" }, icon: FiCpu, color: "#7ce8d8" },
  { id: "projects", cmd: "ls ~/featured", label: { en: "projects", es: "proyectos" }, icon: FiFolder, color: "#ffd6a5" },
  { id: "terminal", cmd: "ssh guest@alejandro", label: { en: "terminal", es: "terminal" }, icon: FiTerminal, color: "#9fe8a8" },
  { id: "contact", cmd: "contact --interactive", label: { en: "contact", es: "contacto" }, icon: FiMail, color: "#c4b5fd" },
];

const protoCopy = {
  en: {
    tabHint: "sections",
    crt: "toggle CRT scanlines",
    fullscreen: "toggle fullscreen",
    close: "close dev mode — switch to the pixel site",
    commands: "commands (⌘K)",
    statusHint: "? shortcuts · ⌘K commands",
    statusHintNarrow: "⌘K",
  },
  es: {
    tabHint: "secciones",
    crt: "alternar líneas CRT",
    fullscreen: "alternar pantalla completa",
    close: "cerrar modo dev — cambiar al sitio píxel",
    commands: "comandos (⌘K)",
    statusHint: "? atajos · ⌘K comandos",
    statusHintNarrow: "⌘K",
  },
} as const;

/** Toggles fullscreen on the document — shared by the window control button
    and the "fullscreen" command in the shared command registry. */
export function toggleFullscreen(): void {
  try {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  } catch {
    // Fullscreen can be unavailable (embedded webviews) — stay silent.
  }
}

type ChromeProps = {
  locale: Locale;
  active: string;
  crtOn: boolean;
  overdrive: boolean;
  onToggleLocale: () => void;
  onToggleCrt: () => void;
  onActiveChange: (id: string) => void;
  onOpenPalette: () => void;
};

/**
 * Fixed TUI chrome: a terminal-window title bar whose tabs are real attached
 * tabs (color-coded per section) and window controls that all do something —
 * CRT scanlines toggle, fullscreen, and close (back to the pixel site).
 */
export function Chrome({
  locale,
  active,
  crtOn,
  overdrive,
  onToggleLocale,
  onToggleCrt,
  onActiveChange,
  onOpenPalette,
}: ChromeProps) {
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const t = protoCopy[locale];

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const sections = gsap.utils.toArray<HTMLElement>("[data-proto-section]");
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) onActiveChange(section.dataset.protoSection ?? "");
          },
        }),
      );
    });

    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const percent = Math.round(self.progress * 100);
        const filled = Math.round(self.progress * 10);
        const bar = "█".repeat(filled) + "░".repeat(10 - filled);
        if (progressBarRef.current) progressBarRef.current.textContent = bar;
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${String(percent).padStart(2, "0")}%`;
        }
      },
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      progress.kill();
    };
  }, []);

  return (
    <>
      <div className="proto-topbar">
        <span className="proto-brand">
          <span className="proto-brand-path">alejandro</span>@portfolio
          <span className="proto-brand-path">:~</span>
          <span className="cursor-block proto-brand-cursor" aria-hidden="true" />
        </span>

        <nav className="proto-tabs" aria-label={t.tabHint}>
          {PROTO_SECTIONS.map((section, index) => {
            const Icon = section.icon;
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`proto-tab${isActive ? " is-active" : ""}`}
                style={{ "--tab-accent": section.color } as React.CSSProperties}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="proto-tab-index">{index}</span>
                <Icon className="proto-tab-icon" aria-hidden={true} />
                <span className="proto-tab-label">{section.label[locale]}</span>
              </a>
            );
          })}
        </nav>

        <div className="proto-topbar-right">
          <button
            type="button"
            className="proto-chip-btn"
            onClick={onToggleLocale}
            aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
          >
            <span className={locale === "en" ? "proto-lang-active" : undefined}>en</span>
            <span className="proto-lang-sep">/</span>
            <span className={locale === "es" ? "proto-lang-active" : undefined}>es</span>
          </button>
          <div className="proto-winctl">
            <button type="button" onClick={onOpenPalette} title={t.commands} aria-label={t.commands}>
              <FiCommand aria-hidden="true" />
            </button>
            <button
              type="button"
              className={crtOn ? "is-on" : undefined}
              onClick={onToggleCrt}
              title={t.crt}
              aria-label={t.crt}
              aria-pressed={crtOn}
            >
              <FiFilm aria-hidden="true" />
            </button>
            <button type="button" onClick={toggleFullscreen} title={t.fullscreen} aria-label={t.fullscreen}>
              <FiMaximize aria-hidden="true" />
            </button>
            <Link className="proto-winctl-close" href="/pixel" title={t.close} aria-label={t.close}>
              <FiX aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="proto-statusbar">
        <span className="proto-cwd">~/portfolio/{active}</span>
        <span className="proto-branch">(main)</span>
        <span className="proto-status-right">
          {overdrive ? <span className="proto-overdrive-badge">OVERDRIVE</span> : null}
          <span className="proto-scroll-hint">{locale === "en" ? "scroll = execute ↓" : "scroll = ejecutar ↓"}</span>
          <span className="proto-keys-hint">
            <span className="proto-keys-hint-full">{t.statusHint}</span>
            <span className="proto-keys-hint-narrow">{t.statusHintNarrow}</span>
          </span>
          <span className="proto-progress">
            [<span ref={progressBarRef} className="proto-progress-bar">░░░░░░░░░░</span>]{" "}
            <span ref={progressTextRef}>00%</span>
          </span>
        </span>
      </div>
    </>
  );
}
