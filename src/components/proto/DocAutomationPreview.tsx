"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Looping demo of academic-report-automation at work: a terminal run that
 * parses Markdown, validates IEEE references, builds figures and renders a
 * PDF. Server-renders the finished state; the loop only runs when motion is
 * allowed, so no-JS and reduced-motion users see the complete output.
 */
export function DocAutomationPreview() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const lineEls = gsap.utils.toArray<HTMLElement>("[data-doc-line]", root);
      const texts = lineEls.map((el) => el.dataset.docLine ?? "");
      const barEl = root.querySelector<HTMLElement>("[data-doc-bar]");

      // Type one line: a stepped counter filling the element's text.
      const typeLine = (tl: gsap.core.Timeline, el: HTMLElement, text: string, at: number, speed = 0.014) => {
        const proxy = { count: 0 };
        tl.to(
          proxy,
          {
            count: text.length,
            duration: Math.max(text.length * speed, 0.12),
            ease: `steps(${Math.max(text.length, 4)})`,
            onUpdate: () => {
              el.textContent = text.slice(0, Math.round(proxy.count));
            },
          },
          at,
        );
      };

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });

      // Start with everything hidden except the prompt line.
      lineEls.forEach((el, index) => {
        tl.set(el, { autoAlpha: index === 0 ? 1 : 0 }, 0);
        if (index > 0) el.textContent = "";
      });
      if (barEl) {
        tl.set(barEl, { autoAlpha: 0 }, 0);
        tl.call(
          () => {
            if (barEl) barEl.textContent = "";
          },
          undefined,
          0,
        );
      }

      let cursor = 0.3;
      lineEls.forEach((el, index) => {
        if (index === 0) {
          typeLine(tl, el, texts[0], cursor);
          cursor += 0.75;
          return;
        }
        if (el.hasAttribute("data-doc-render") && barEl) {
          // The render step: type the label, then fill the progress bar.
          tl.set(el, { autoAlpha: 1 }, cursor);
          typeLine(tl, el, texts[index], cursor);
          cursor += 0.55;
          tl.set(barEl, { autoAlpha: 1 }, cursor);
          const barProxy = { count: 0 };
          tl.to(
            barProxy,
            {
              count: 10,
              duration: 0.9,
              ease: `steps(10)`,
              onUpdate: () => {
                if (barEl) {
                  const filled = Math.round(barProxy.count);
                  barEl.textContent = `${"█".repeat(filled)}${"░".repeat(10 - filled)} ${filled * 10}%`;
                }
              },
            },
            cursor,
          );
          cursor += 1.05;
          return;
        }
        tl.set(el, { autoAlpha: 1 }, cursor);
        typeLine(tl, el, texts[index], cursor, 0.008);
        cursor += 0.42;
      });

      if (barEl) {
        tl.to(lineEls, { autoAlpha: 0.25, duration: 0.4 }, cursor + 0.9);
        tl.to(lineEls, { autoAlpha: 1, duration: 0.4 }, cursor + 1.5);
      }
    },
    { scope: rootRef },
  );

  return (
    <div className="doc-preview" ref={rootRef} aria-label="terminal demo: report automation">
      <div className="doc-line is-cmd" data-doc-line="$ python build_report.py informe.md">
        $ python build_report.py informe.md
      </div>
      <div className="doc-line" data-doc-line="parsing markdown ................ ok">
        parsing markdown ................ ok
      </div>
      <div className="doc-line" data-doc-line="validating IEEE refs ............ ok">
        validating IEEE refs ............ ok
      </div>
      <div className="doc-line" data-doc-line="building figures ................ ok">
        building figures ................ ok
      </div>
      <div className="doc-line" data-doc-line="rendering pdf" data-doc-render>
        rendering pdf
      </div>
      <div className="doc-bar" data-doc-bar>
        ██████████ 100%
      </div>
      <div className="doc-line is-ok" data-doc-line="✓ informe.pdf generated">
        ✓ informe.pdf generated
      </div>
    </div>
  );
}
