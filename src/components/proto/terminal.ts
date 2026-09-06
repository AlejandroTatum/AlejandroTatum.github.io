import { gsap, PIXEL_EASE, prefersReducedMotion } from "@/lib/gsap";

/**
 * Shared motion helpers for the /proto TUI. Every helper is a no-op under
 * `prefers-reduced-motion: reduce` so server-rendered text stays intact.
 */

/** Crisply typed text: characters resolve in steps, like a real terminal. */
export function typeInto(el: HTMLElement, text: string, duration = 0.8): gsap.core.Tween {
  const proxy = { count: 0 };
  return gsap.to(proxy, {
    count: text.length,
    duration: Math.max(duration, 0.25),
    ease: `steps(${Math.max(text.length, 4)})`,
    onUpdate() {
      el.textContent = text.slice(0, Math.round(proxy.count));
    },
    onComplete() {
      el.textContent = text;
    },
  });
}

export type TerminalCleanup = () => void;

/**
 * Binds the scroll-driven "commands execute as you scroll" grammar to a
 * section: `[data-typed]` command lines type once on enter, `[data-rise]`
 * blocks step up, `[data-window]` panels wipe open top-to-bottom.
 * Returns a cleanup that restores original text (for locale swaps).
 */
export function bindTerminalReveals(section: HTMLElement): TerminalCleanup {
  if (prefersReducedMotion()) return () => {};

  const typedEls = gsap.utils.toArray<HTMLElement>("[data-typed]", section);
  const finalTexts = typedEls.map((el) => el.dataset.typedText ?? el.textContent ?? "");

  // Command lines start empty only when JS is driving the reveal.
  typedEls.forEach((el) => {
    el.textContent = "";
  });

  typedEls.forEach((el, index) => {
    const text = finalTexts[index];
    const proxy = { count: 0 };
    gsap.to(proxy, {
      count: text.length,
      duration: Math.max(text.length * 0.022, 0.3),
      ease: `steps(${Math.max(text.length, 4)})`,
      scrollTrigger: {
        trigger: el,
        start: "top 82%",
        once: true,
      },
      onUpdate() {
        el.textContent = text.slice(0, Math.round(proxy.count));
      },
      onComplete() {
        el.textContent = text;
      },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-window]", section).forEach((el) => {
    gsap.from(el, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.55,
      ease: "steps(9)",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-rise]", section).forEach((el) => {
    gsap.from(el, {
      y: 18,
      autoAlpha: 0,
      duration: 0.45,
      ease: PIXEL_EASE,
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  return () => {
    typedEls.forEach((el, index) => {
      el.textContent = finalTexts[index];
    });
  };
}
