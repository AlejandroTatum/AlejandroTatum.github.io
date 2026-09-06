"use client";

import { useEffect, useRef, useState } from "react";
import { PROTO_SECTIONS } from "@/components/proto/Chrome";
import { useProtoContext } from "@/components/proto/ProtoContext";

/** "g" then "g" (vim gg) must land inside this window to count as one chord. */
const GG_CHORD_MS = 500;

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

/**
 * Global keyboard shortcuts for the dev-mode page: digits jump to a
 * section, j/k step through sections, gg/G jump to the ends, "?" toggles
 * the shortcuts overlay, and ⌘K/Ctrl+K/":" open the command palette.
 * Disabled while the boot overlay is up, while typing in a field, or
 * (beyond ⌘K itself) while the palette already owns the keyboard.
 */
export function useProtoHotkeys(booted: boolean) {
  const ctx = useProtoContext();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const lastGPressRef = useRef(0);

  useEffect(() => {
    if (!booted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const isCommandK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isCommandK) {
        event.preventDefault();
        ctx.openPalette();
        return;
      }

      // Every other shortcut ignores modifier combos, typing fields, the
      // boot overlay (guarded above) and a palette that already has focus.
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (ctx.paletteOpen) return;
      if (isTypingTarget(event.target)) return;

      if (event.key === ":") {
        event.preventDefault();
        ctx.openPalette();
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        setShortcutsOpen((current) => !current);
        return;
      }

      if (event.key === "Escape") {
        setShortcutsOpen(false);
        return;
      }

      if (/^[0-5]$/.test(event.key)) {
        const section = PROTO_SECTIONS[Number(event.key)];
        if (section) ctx.scrollToSection(section.id);
        return;
      }

      if (event.key === "j" || event.key === "k") {
        const currentIndex = PROTO_SECTIONS.findIndex((section) => section.id === ctx.activeSection);
        const step = event.key === "j" ? 1 : -1;
        const bounded = Math.min(Math.max(currentIndex + step, 0), PROTO_SECTIONS.length - 1);
        const next = PROTO_SECTIONS[bounded];
        if (next) ctx.scrollToSection(next.id);
        return;
      }

      if (event.key === "G") {
        ctx.scrollToSection(PROTO_SECTIONS[PROTO_SECTIONS.length - 1].id);
        return;
      }

      if (event.key === "g") {
        const now = Date.now();
        if (now - lastGPressRef.current < GG_CHORD_MS) {
          ctx.scrollToSection(PROTO_SECTIONS[0].id);
          lastGPressRef.current = 0;
        } else {
          lastGPressRef.current = now;
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [booted, ctx]);

  return { shortcutsOpen, closeShortcuts: () => setShortcutsOpen(false) };
}
