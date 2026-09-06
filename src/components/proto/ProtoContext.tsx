"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { scrollToSection as scrollTo } from "@/components/providers/SmoothScrollProvider";
import type { Locale } from "@/lib/i18n";

export type ProtoContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  crtOn: boolean;
  toggleCrt: () => void;
  overdrive: boolean;
  toggleOverdrive: () => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
  openProject: (slug: string) => void;
  openPalette: () => void;
  closePalette: () => void;
  paletteOpen: boolean;
  runShellCommand?: (command: string) => void;
};

const ProtoContext = createContext<ProtoContextValue | null>(null);

/** How long a `.is-flash` highlight stays on a project card — matches the
    CSS transition in terminal.css. Skipped entirely under reduced motion. */
const FLASH_DURATION_MS = 900;

type ProtoProviderProps = {
  children: ReactNode;
  locale: Locale;
  toggleLocale: () => void;
  crtOn: boolean;
  toggleCrt: () => void;
  overdrive: boolean;
  toggleOverdrive: () => void;
  activeSection: string;
};

/**
 * Shares the page-level state (locale, CRT, overdrive, active section) and
 * the few cross-cutting actions (scroll, open a project, open the palette,
 * run a shell command) with anything that needs to act on the whole page:
 * the command palette, the keyboard shortcuts hook, and the guest shell.
 */
export function ProtoProvider({
  children,
  locale,
  toggleLocale,
  crtOn,
  toggleCrt,
  overdrive,
  toggleOverdrive,
  activeSection,
}: ProtoProviderProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const openProject = useCallback((slug: string) => {
    const id = `project-${slug}`;
    scrollTo(id);
    if (typeof document === "undefined" || prefersReducedMotion()) return;
    const card = document.getElementById(id);
    if (!card) return;
    card.classList.add("is-flash");
    window.setTimeout(() => card.classList.remove("is-flash"), FLASH_DURATION_MS);
  }, []);

  const runShellCommand = useCallback((command: string) => {
    scrollTo("terminal");
    window.dispatchEvent(new CustomEvent("proto:shell", { detail: { command } }));
  }, []);

  const value = useMemo<ProtoContextValue>(
    () => ({
      locale,
      toggleLocale,
      crtOn,
      toggleCrt,
      overdrive,
      toggleOverdrive,
      activeSection,
      scrollToSection: scrollTo,
      openProject,
      openPalette,
      closePalette,
      paletteOpen,
      runShellCommand,
    }),
    [
      locale,
      toggleLocale,
      crtOn,
      toggleCrt,
      overdrive,
      toggleOverdrive,
      activeSection,
      openProject,
      openPalette,
      closePalette,
      paletteOpen,
      runShellCommand,
    ],
  );

  return <ProtoContext.Provider value={value}>{children}</ProtoContext.Provider>;
}

export function useProtoContext(): ProtoContextValue {
  const ctx = useContext(ProtoContext);
  if (!ctx) {
    throw new Error("useProtoContext must be used within a ProtoProvider");
  }
  return ctx;
}
