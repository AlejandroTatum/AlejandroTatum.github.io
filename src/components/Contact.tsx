"use client";

import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { siteConfig } from "@/lib/constants";
import { copy, type Locale } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

type ContactProps = {
  locale: Locale;
};

export function Contact({ locale }: ContactProps) {
  const t = copy[locale].contact;
  const sectionRef = useReveal([locale]);

  return (
    <section ref={sectionRef} id="contact" className="section-shell contact-section">
      <div className="contact-card" data-reveal>
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">{t.kicker}</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-ink-soft">{t.description}</p>

            <div className="contact-meta-group mt-8" data-reveal-stagger>
              {t.info.map((item) => (
                <div
                  key={item.label}
                  className="contact-meta-item"
                  data-reveal-item
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <p className="contact-meta-label">{item.label}</p>
                  <p className="contact-meta-value">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-actions" data-reveal-stagger>
            <a className="contact-action" data-reveal-item href={siteConfig.emailHref} target="_blank" rel="noreferrer">
              <span className="contact-action-icon" aria-hidden="true"><FaEnvelope /></span>
              <span className="contact-action-copy">
                <span>{t.actions.email}</span>
                <strong>{siteConfig.email}</strong>
              </span>
            </a>
            <a className="contact-action" data-reveal-item href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              <span className="contact-action-icon" aria-hidden="true"><FaLinkedinIn /></span>
              <span className="contact-action-copy">
                <span>{t.actions.linkedin}</span>
                <strong>{t.actions.viewProfile}</strong>
              </span>
            </a>
            <a className="contact-action" data-reveal-item href={siteConfig.github} target="_blank" rel="noreferrer">
              <span className="contact-action-icon" aria-hidden="true"><FaGithub /></span>
              <span className="contact-action-copy">
                <span>{t.actions.github}</span>
                <strong>@AlejandroTatum</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
