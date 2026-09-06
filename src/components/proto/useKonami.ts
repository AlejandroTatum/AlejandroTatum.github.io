"use client";

import { useEffect, useRef } from "react";

/** ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a. */
const KONAMI_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

/**
 * Global Konami code listener (↑↑↓↓←→←→ b a). On completion it fires the
 * same `konami` hidden shell command a visitor could type directly — so the
 * overdrive toggle and its feedback message live in exactly one place: the
 * shared command registry. Disabled while the boot overlay is up or while
 * typing in a field.
 */
export function useKonami(booted: boolean) {
  const progressRef = useRef(0);

  useEffect(() => {
    if (!booted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();
      const expected = KONAMI_SEQUENCE[progressRef.current];

      if (key === expected) {
        progressRef.current += 1;
        if (progressRef.current === KONAMI_SEQUENCE.length) {
          progressRef.current = 0;
          window.dispatchEvent(new CustomEvent("proto:shell", { detail: { command: "konami" } }));
        }
        return;
      }

      // A miss can still be the start of a fresh attempt.
      progressRef.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [booted]);
}
