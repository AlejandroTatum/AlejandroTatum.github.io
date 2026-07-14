"use client";

import { copy, type Locale } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

type AboutProps = {
  locale: Locale;
};

export function About({ locale }: AboutProps) {
  const t = copy[locale].about;
  const sectionRef = useReveal([locale]);

  return (
    <section ref={sectionRef} id="about" className="section-shell">
      <div className="section-heading" data-reveal-stagger>
        <p className="section-kicker" data-reveal-item>{t.kicker}</p>
        <h2 data-reveal-item>{t.title}</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card-large" data-reveal>
          {t.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={`${index === 0 ? "text-lg" : "mt-5"} leading-8 text-ink-soft`}>
              {paragraph}
            </p>
          ))}
          <span className="language-badge">{t.languageBadge}</span>
        </div>

        <div className="timeline-card" data-reveal-stagger>
          {t.timeline.map((item, index) => (
            <div key={item.title} className="timeline-item" data-reveal-item>
              <span className="timeline-dot">{index + 1}</span>
              <div>
                <h3 className="font-bold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-ink-soft">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
