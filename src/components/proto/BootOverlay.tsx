"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type BootOverlayProps = {
  onDone: () => void;
};

const BOOT_LINES: Array<{ kind: "cmd" | "ok" | "info"; text: string }> = [
  { kind: "info", text: "portfolio-os 2.0 (dev-mode) — alejandro padilla" },
  { kind: "cmd", text: "$ ./boot --mode=dev" },
  { kind: "ok", text: "mounted ~/projects (8 entries)" },
  { kind: "ok", text: "loaded skills.tree (5 branches)" },
  { kind: "ok", text: "linked github.com/AlejandroTatum" },
  { kind: "ok", text: "bilingual content: en / es" },
  { kind: "cmd", text: "$ whoami --verbose &" },
];

/**
 * CRT power-on: boot lines type out fast, then the overlay collapses like an
 * old monitor turning on. Any key, click or wheel input skips it. Reduced
 * motion never sees it — CSS keeps `.proto-boot` display:none and page.tsx
 * flips `booted` straight away.
 */
export function BootOverlay({ onDone }: BootOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const doneRef = useRef(false);

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      // Reduced motion: CSS keeps the overlay hidden and every section stays
      // static — nothing needs to boot or unlock.
      if (prefersReducedMotion()) return;

      const lines = lineRefs.current.filter((el): el is HTMLDivElement => Boolean(el));
      const texts = lines.map((el) => el.dataset.bootText ?? "");
      const title = titleRef.current;
      const titleText = title?.dataset.bootText ?? "";

      const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onDone();
      };

      const messageEls = lines.map((el) => el.querySelector<HTMLElement>("[data-boot-message]"));
      messageEls.forEach((message) => {
        if (message) message.textContent = "";
      });
      if (title) title.textContent = "";

      const collapse = () => {
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

      const tl = gsap.timeline({ onComplete: collapse });

      if (title) {
        const proxy = { count: 0 };
        tl.to(proxy, {
          count: titleText.length,
          duration: 0.5,
          ease: `steps(${Math.max(titleText.length, 4)})`,
          onUpdate: () => {
            if (title) title.textContent = titleText.slice(0, Math.round(proxy.count));
          },
        }, 0);
      }

      lines.forEach((el, index) => {
        const message = messageEls[index];
        const text = texts[index];
        if (!message) return;
        const at = 0.55 + index * 0.24;
        tl.set(el, { visibility: "visible" }, at);
        const proxy = { count: 0 };
        tl.to(proxy, {
          count: text.length,
          duration: Math.max(text.length * 0.012, 0.12),
          ease: `steps(${Math.max(text.length, 4)})`,
          onUpdate: () => {
            message.textContent = text.slice(0, Math.round(proxy.count));
          },
        }, at + 0.02);
      });

      tl.to({}, { duration: 0.42 });

      const skip = () => {
        tl.kill();
        lines.forEach((el, index) => {
          el.style.visibility = "visible";
          const message = messageEls[index];
          if (message) message.textContent = texts[index];
        });
        gsap.set(overlay, { autoAlpha: 0 });
        finish();
      };

      window.addEventListener("keydown", skip, { once: true });
      window.addEventListener("pointerdown", skip, { once: true });
      window.addEventListener("wheel", skip, { once: true, passive: true });
      const failsafe = window.setTimeout(skip, 6800);

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
        <div ref={titleRef} className="proto-boot-title" data-boot-text="ALEJANDRO://PORTFOLIO">
          ALEJANDRO://PORTFOLIO
        </div>
        {BOOT_LINES.map((line, index) => (
          <div
            key={line.text}
            ref={(el) => {
              lineRefs.current[index] = el;
            }}
            className="boot-line"
            data-boot-text={line.text}
            style={{ visibility: "hidden" }}
          >
            {line.kind === "ok" ? <span className="boot-ok">[ OK ]</span> : null}
            {line.kind === "info" ? <span className="boot-info">:::</span> : null}
            {line.kind === "cmd" ? <span className="boot-cmd">$</span> : null}
            <span data-boot-message>{line.text}</span>
          </div>
        ))}
        <div className="proto-boot-skip">press any key to skip…</div>
      </div>
    </div>
  );
}
