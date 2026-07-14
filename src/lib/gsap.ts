"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register plugins once, client-side only (module is only imported from client components).
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, TextPlugin);
}

/** Chunky stepped ease shared by every reveal so the site moves like a retro game, not a corporate fade. */
export const PIXEL_EASE = "steps(6)";

/** Glyphs used while text is still "decoding" in the hero scramble. */
const SCRAMBLE_GLYPHS = "█▓▒░<>/#_0101";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Terminal-style decode effect: characters resolve left-to-right from random
 * pixel glyphs into the element's current text. Random glyphs are generated
 * only after mount (inside the tween), so SSR markup always holds the final text.
 */
export function scrambleText(el: Element, duration = 0.8): gsap.core.Tween {
  const finalText = el.textContent ?? "";
  const proxy = { progress: 0 };

  return gsap.to(proxy, {
    progress: 1,
    duration,
    ease: `steps(${Math.max(finalText.length, 6)})`,
    onUpdate() {
      const resolved = Math.floor(proxy.progress * finalText.length);
      let output = finalText.slice(0, resolved);
      for (let i = resolved; i < finalText.length; i += 1) {
        output +=
          finalText[i] === " "
            ? " "
            : SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)];
      }
      el.textContent = output;
    },
    onComplete() {
      // Never leave the DOM half-scrambled.
      el.textContent = finalText;
    },
  });
}

export { gsap, ScrollTrigger, useGSAP };
