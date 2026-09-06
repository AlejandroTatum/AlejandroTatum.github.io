"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

// The active Lenis instance, tracked as a module singleton so anything
// outside this component (the hotkeys hook, the command palette, the
// section context) can trigger the exact same scroll path as a tab click.
let activeLenis: Lenis | null = null;

/**
 * Scrolls to a section by id (or "#id"), through the active Lenis instance
 * when one is running — the same code path anchor clicks use — and falls
 * back to a native scroll when Lenis is off (reduced motion, not mounted).
 */
export function scrollToSection(id: string): void {
  if (typeof document === "undefined") return;
  const hash = id.startsWith("#") ? id : `#${id}`;
  const target = document.querySelector(hash);
  if (!target) return;
  if (activeLenis) {
    activeLenis.scrollTo(target as HTMLElement, { offset: -16 });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
  window.history.replaceState(null, "", hash);
}

/** Pauses/resumes Lenis — used to lock body scroll while the command
    palette is open. A no-op when Lenis isn't running (reduced motion). */
export function setScrollLocked(locked: boolean): void {
  if (!activeLenis) return;
  if (locked) activeLenis.stop();
  else activeLenis.start();
}

/**
 * Site-wide Lenis smooth scroll, driven by the GSAP ticker and kept in sync
 * with ScrollTrigger. Skipped entirely when `prefers-reduced-motion: reduce`
 * is set — native scrolling (and native anchor jumps) take over.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });
    activeLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Route internal anchor links (#projects, #top, ...) through Lenis.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      event.preventDefault();
      scrollToSection(hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      activeLenis = null;
    };
  }, []);

  return <>{children}</>;
}
