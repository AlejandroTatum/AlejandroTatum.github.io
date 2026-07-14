"use client";

import { useRef } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";
import { siteConfig } from "@/lib/constants";
import { gsap, PIXEL_EASE, prefersReducedMotion, scrambleText, useGSAP } from "@/lib/gsap";
import { copy, type Locale } from "@/lib/i18n";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const t = copy[locale].hero;
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      // Terminal decode on the headline. Snapshot final texts so cleanup can
      // always restore them, even if the tween is reverted mid-scramble
      // (e.g. the user toggles the locale while it plays).
      const scrambleTargets = gsap.utils.toArray<HTMLElement>("[data-scramble]", section);
      const finalTexts = scrambleTargets.map((el) => el.textContent ?? "");
      const timeline = gsap.timeline({ delay: 0.15 });
      scrambleTargets.forEach((el, index) => {
        timeline.add(scrambleText(el, 0.85), index * 0.2);
      });

      // Staggered blocky entrance for role, description, actions and metadata.
      gsap.from("[data-hero-item]", {
        y: 26,
        opacity: 0,
        duration: 0.45,
        ease: PIXEL_EASE,
        stagger: 0.09,
        delay: 0.1,
      });

      // Subtle scrub parallax while the hero leaves the viewport.
      gsap.to("[data-hero-card]", {
        y: 70,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-glow", {
        yPercent: 24,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        scrambleTargets.forEach((el, index) => {
          el.textContent = finalTexts[index];
        });
      };
    },
    { scope: sectionRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative overflow-hidden px-5 pb-16 pt-10 sm:pt-20 lg:pt-28"
    >
      <div className="hero-glow" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-ink sm:text-7xl">
            <span data-scramble>{t.titleFirst}</span>{" "}
            <span data-scramble className="text-gradient">
              {t.titleLast}
            </span>
          </h1>
          <p data-hero-item className="mt-4 text-2xl font-semibold text-ink-soft sm:text-3xl">
            {t.role}
          </p>
          <p data-hero-item className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
            {t.description}
          </p>

          <div data-hero-item className="hero-actions mt-8 flex flex-wrap items-center gap-3">
            <a className="btn-primary" href="#projects">
              {t.viewProjects}
            </a>
            <a className="btn-secondary" href={siteConfig.emailHref} target="_blank" rel="noreferrer">
              {t.contactMe}
            </a>
            <a
              className="social-link"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label={t.githubLabel}
            >
              <SiGithub aria-hidden="true" />
            </a>
            <a
              className="social-link"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={t.linkedinLabel}
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>

          <ul data-hero-item className="hero-metadata mt-8" aria-label={t.metadataLabel}>
            {t.metadata.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

	        <div data-hero-card className="relative mx-auto mt-4 w-full max-w-md lg:mt-0">
	          <div className="absolute -inset-5 rounded-xl bg-pixel-lavender/50 blur-2xl" />
	          <div className="profile-card">
	            <div className="h-[19rem] overflow-hidden rounded-md border-2 border-ink bg-pixel-blue sm:h-[22rem] lg:h-[24rem]">
	              {/* eslint-disable-next-line @next/next/no-img-element */}
	              <img
	                src="/pixel/alejandro-pixel-portrait.png"
	                alt={t.heroImageAlt}
	                className="pixel-img block h-full w-full object-cover object-[center_38%]"
	              />
	            </div>

	            <div className="mt-4 border-l-4 border-ink bg-pixel-mint px-4 py-3">
	              <h2 className="profile-name">Alejandro Padilla</h2>
	              <p className="mt-2 font-mono text-xs font-bold uppercase tracking-wide text-ink-soft">
	                {t.status}
	              </p>
	            </div>
	          </div>
        </div>
      </div>
    </section>
  );
}
