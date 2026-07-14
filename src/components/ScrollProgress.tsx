"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Thin pixel-styled progress bar pinned to the top of the viewport, tied to
 * page scroll. Hidden under `prefers-reduced-motion: reduce` (JS skip here
 * plus a CSS media-query safety net in globals.css).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    const setScaleX = gsap.quickSetter(bar, "scaleX");
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScaleX(self.progress),
      onRefresh: (self) => setScaleX(self.progress),
    });

    return () => trigger.kill();
  });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
