"use client";

import { useRef } from "react";
import { gsap, PIXEL_EASE, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Shared retro scroll-reveal mechanism used by every section.
 *
 * Attach the returned ref to a section, then mark elements inside it:
 * - `data-reveal`            → blocky slide-in with its own ScrollTrigger.
 * - `data-reveal-stagger`    → container whose `data-reveal-item` children
 *                              stagger in with a single ScrollTrigger.
 *
 * Content is fully visible without JavaScript and when
 * `prefers-reduced-motion: reduce` is set (we only use `gsap.from`).
 * Passing `locale` in `deps` reverts and rebuilds triggers on language switch
 * so nothing duplicates or leaks.
 */
export function useReveal(deps: unknown[] = []) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((el) => {
        gsap.from(el, {
          y: 26,
          opacity: 0,
          duration: 0.45,
          ease: PIXEL_EASE,
          // clamp() keeps triggers near the page edges reachable (e.g. the
          // footer, whose top can never cross 88% of the viewport otherwise).
          scrollTrigger: { trigger: el, start: "clamp(top 88%)", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]", root).forEach((group) => {
        // Groups can nest (e.g. a card grid whose cards contain tag groups):
        // each item belongs only to its nearest stagger container.
        const items = Array.from(group.querySelectorAll<HTMLElement>("[data-reveal-item]")).filter(
          (item) => item.parentElement?.closest("[data-reveal-stagger]") === group,
        );
        if (!items.length) return;
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: group, start: "clamp(top 88%)", once: true },
        });

        // Reveal the container together with its contents. Hiding only the
        // children left bordered cards visible as empty, orphaned shells.
        timeline.from(group, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          ease: PIXEL_EASE,
        });
        timeline.from(
          items,
          {
            y: 14,
            opacity: 0,
            duration: 0.55,
            ease: PIXEL_EASE,
            stagger: 0.1,
          },
          "-=0.35",
        );
      });
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );

  return scope;
}
