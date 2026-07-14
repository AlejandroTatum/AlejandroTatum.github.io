"use client";

import { useRef, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const CURSOR_MEDIA_QUERY =
  "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)";

function subscribeToCursorEligibility(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(CURSOR_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getCursorEligibility() {
  return window.matchMedia(CURSOR_MEDIA_QUERY).matches;
}

// Server snapshot: never render the follower during SSR/prerender.
function getServerCursorEligibility() {
  return false;
}

/**
 * Pixel-square cursor follower for desktop pointers. The native cursor stays
 * visible (accessibility); this square trails it with GSAP quickTo and grows
 * over interactive elements. Never rendered on touch/coarse pointers or when
 * `prefers-reduced-motion: reduce` is set (checked after mount, plus a CSS
 * media-query safety net in globals.css).
 */
export function PixelCursor() {
  const enabled = useSyncExternalStore(
    subscribeToCursorEligibility,
    getCursorEligibility,
    getServerCursorEligibility,
  );
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cursor = cursorRef.current;
      if (!enabled || !cursor) return;

      const xTo = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3" });

      const onMove = (event: PointerEvent) => {
        cursor.classList.add("is-visible");
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const onOver = (event: MouseEvent) => {
        const interactive = (event.target as Element | null)?.closest?.("a, button, [role='button']");
        cursor.classList.toggle("is-active", Boolean(interactive));
      };
      const onLeave = () => cursor.classList.remove("is-visible");

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver);
      document.documentElement.addEventListener("mouseleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("mouseover", onOver);
        document.documentElement.removeEventListener("mouseleave", onLeave);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <div ref={cursorRef} className="pixel-cursor" aria-hidden="true">
      <span className="pixel-cursor-box" />
    </div>
  );
}
