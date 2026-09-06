"use client";

import { useEffect, useRef } from "react";
import { gsap, PIXEL_EASE, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/projects";
import { STACK_TREE } from "@/components/proto/sections";
import { siteConfig } from "@/lib/constants";

type BootOverlayProps = {
  onDone: () => void;
};

const BOOT_TITLE = "ALEJANDRO://PORTFOLIO";
const BOOT_SEEN_KEY = "portfolio-boot-seen";
const BAR_STEPS = 10;

type BootLine =
  | { kind: "info"; text: string }
  | { kind: "cmd"; text: string }
  | { kind: "progress"; label: string };

function lineText(line: BootLine): string {
  return line.kind === "progress" ? line.label : line.text;
}

function renderBar(filled: number): string {
  return `[${"█".repeat(filled)}${"░".repeat(BAR_STEPS - filled)}]`;
}

function readBootSeen(): boolean {
  try {
    return window.sessionStorage.getItem(BOOT_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markBootSeen(): void {
  try {
    window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
  } catch {
    /* private mode / storage disabled — the full boot just replays */
  }
}

/** Live counts so the boot log never drifts from the actual content. */
function buildBootLines(): BootLine[] {
  return [
    { kind: "info", text: "portfolio-os 2.0 (dev-mode) — alejandro padilla" },
    { kind: "cmd", text: "$ ./boot --mode=dev" },
    { kind: "progress", label: `mounted ~/projects        ${projects.length} entries` },
    { kind: "progress", label: `loaded skills.tree        ${STACK_TREE.length} branches` },
    { kind: "progress", label: `linked ${siteConfig.github.replace(/^https?:\/\//, "")}` },
    { kind: "progress", label: "bilingual content: es / en" },
    { kind: "cmd", text: "$ whoami --verbose &" },
  ];
}

/**
 * CRT power-on: boot lines fill in as progress bars + typed labels, then the
 * overlay hands off to the hero prompt. Any key, click or wheel input skips
 * it. Reduced motion never sees it — CSS keeps `.proto-boot` display:none and
 * page.tsx flips `booted` straight away, so this effect never even attaches
 * its listeners.
 */
export function BootOverlay({ onDone }: BootOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const doneRef = useRef(false);
  const lines = buildBootLines();
  const lastIndex = lines.length - 1;

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      // Reduced motion: CSS keeps the overlay hidden and every section stays
      // static — nothing needs to boot or unlock.
      if (prefersReducedMotion()) return;

      const isRepeat = readBootSeen();
      const lineEls = lineRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const title = titleRef.current;
      const messageEls = lineEls.map((el) => el.querySelector<HTMLElement>("[data-boot-message]"));
      const barEls = lineEls.map((el) => el.querySelector<HTMLElement>("[data-boot-bar]"));
      const cursor = overlay.querySelector<HTMLElement>("[data-boot-cursor]");

      const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        markBootSeen();
        onDone();
      };

      messageEls.forEach((message) => {
        if (message) message.textContent = "";
      });
      barEls.forEach((bar) => {
        if (bar) bar.textContent = renderBar(0);
      });
      if (title) title.textContent = "";

      const collapse = () => {
        // Exit transition: the last line's cursor tweens toward the hero
        // prompt, handing the boot off to the page underneath. Falls back to
        // the plain CRT-collapse fade if that target can't be resolved.
        const heroPrompt = document.querySelector<HTMLElement>("#whoami .cmd-line");

        if (cursor && heroPrompt) {
          const from = cursor.getBoundingClientRect();
          const to = heroPrompt.getBoundingClientRect();
          const exit = gsap.timeline({ onComplete: finish });
          exit.to(cursor, {
            x: to.left - from.left,
            y: to.top - from.top,
            scale: 0.7,
            duration: 0.45,
            ease: PIXEL_EASE,
          });
          exit.to(overlay, { autoAlpha: 0, duration: 0.18, ease: "power2.in" }, "-=0.12");
          return;
        }

        gsap.to(overlay, {
          scaleY: 0.006,
          duration: 0.3,
          ease: "power3.in",
          transformOrigin: "center center",
          onComplete: () => {
            gsap.to(overlay, {
              scaleX: 0,
              duration: 0.22,
              ease: "power3.in",
              onComplete: finish,
            });
          },
        });
      };

      const typeLabel = (tl: gsap.core.Timeline, el: HTMLElement, text: string, at: number) => {
        const proxy = { count: 0 };
        tl.to(
          proxy,
          {
            count: text.length,
            duration: Math.max(text.length * 0.012, 0.12),
            ease: `steps(${Math.max(text.length, 4)})`,
            onUpdate: () => {
              el.textContent = text.slice(0, Math.round(proxy.count));
            },
          },
          at,
        );
      };

      const typeTitle = (tl: gsap.core.Timeline, duration: number) => {
        if (!title) return;
        const proxy = { count: 0 };
        tl.to(
          proxy,
          {
            count: BOOT_TITLE.length,
            duration,
            ease: `steps(${Math.max(BOOT_TITLE.length, 4)})`,
            onUpdate: () => {
              if (title) title.textContent = BOOT_TITLE.slice(0, Math.round(proxy.count));
            },
          },
          0,
        );
      };

      const fillBar = (tl: gsap.core.Timeline, el: HTMLElement, at: number) => {
        const proxy = { count: 0 };
        tl.to(
          proxy,
          {
            count: BAR_STEPS,
            duration: 0.25,
            ease: `steps(${BAR_STEPS})`,
            onUpdate: () => {
              el.textContent = renderBar(Math.round(proxy.count));
            },
          },
          at,
        );
      };

      const tl = gsap.timeline({ onComplete: collapse });

      if (isRepeat) {
        // Condensed replay: title + the final line only, ~0.6s total.
        typeTitle(tl, 0.2);
        tl.set(lineEls[lastIndex], { visibility: "visible" }, 0.22);
        const message = messageEls[lastIndex];
        if (message) typeLabel(tl, message, lineText(lines[lastIndex]), 0.24);
        tl.to({}, { duration: 0.12 });
      } else {
        // Full boot: every line fills in, ~2s total.
        typeTitle(tl, 0.45);
        lineEls.forEach((el, index) => {
          const line = lines[index];
          const at = 0.5 + index * 0.2;
          tl.set(el, { visibility: "visible" }, at);

          const bar = barEls[index];
          const message = messageEls[index];
          if (line.kind === "progress" && bar) {
            fillBar(tl, bar, at);
            if (message) typeLabel(tl, message, line.label, at + 0.05);
          } else if (message) {
            typeLabel(tl, message, lineText(line), at + 0.02);
          }
        });
        tl.to({}, { duration: 0.3 });
      }

      const skip = () => {
        tl.kill();
        lineEls.forEach((el, index) => {
          el.style.visibility = "visible";
          const message = messageEls[index];
          if (message) message.textContent = lineText(lines[index]);
          const bar = barEls[index];
          if (bar) bar.textContent = renderBar(BAR_STEPS);
        });
        if (title) title.textContent = BOOT_TITLE;
        gsap.set(overlay, { autoAlpha: 0 });
        finish();
      };

      window.addEventListener("keydown", skip, { once: true });
      window.addEventListener("pointerdown", skip, { once: true });
      window.addEventListener("wheel", skip, { once: true, passive: true });
      const failsafe = window.setTimeout(skip, 4000);

      return () => {
        window.clearTimeout(failsafe);
        window.removeEventListener("keydown", skip);
        window.removeEventListener("pointerdown", skip);
        window.removeEventListener("wheel", skip);
      };
    },
    { scope: overlayRef },
  );

  // Lock scrolling while the machine "boots" (effect cleanup restores it).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div ref={overlayRef} className="proto-boot" role="presentation" aria-hidden="true">
      <div className="proto-boot-inner">
        <div ref={titleRef} className="proto-boot-title">
          {BOOT_TITLE}
        </div>
        {lines.map((line, index) => (
          <div
            key={lineText(line)}
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            className="boot-line"
            style={{ visibility: "hidden" }}
          >
            {line.kind === "info" ? <span className="boot-info">:::</span> : null}
            {line.kind === "cmd" ? <span className="boot-cmd">$</span> : null}
            {line.kind === "progress" ? (
              <span className="boot-bar" data-boot-bar aria-hidden="true">
                {renderBar(BAR_STEPS)}
              </span>
            ) : null}
            <span data-boot-message>{lineText(line)}</span>
            {index === lastIndex ? <span className="cursor-block" data-boot-cursor aria-hidden="true" /> : null}
          </div>
        ))}
        <div className="proto-boot-skip">press any key to skip…</div>
      </div>
    </div>
  );
}
