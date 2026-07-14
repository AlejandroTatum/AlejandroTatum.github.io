"use client";

import { useRef } from "react";
import { projects, type Project } from "@/data/projects";
import { gsap, PIXEL_EASE, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { copy, type Locale } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

type ProjectsProps = {
  locale: Locale;
};

type ProjectCopy = (typeof copy)[Locale]["projects"];

type ProjectCardProps = {
  project: Project;
  index: number;
  locale: Locale;
  t: ProjectCopy;
};

/** Pixel-art illustration preview, used when the project ships an image. */
function ImagePreview({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <div className="project-image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={`${project.title} pixel-art preview`}
        className="pixel-img"
      />
      <span className="project-image-caption">{project.status[locale]}</span>
    </div>
  );
}

/** Full-size card for production work: pixel illustration or fake terminal. */
function ProductionCard({ project, index, locale, t }: ProjectCardProps) {
  return (
    <article className="project-card">
      {project.image ? (
        <ImagePreview project={project} locale={locale} />
      ) : (
        <div className="project-preview">
          <div className="preview-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="space-y-3 p-5 font-mono text-xs">
            <p className="text-pixel-mint" data-terminal-line>$ run {project.title}</p>
            <div className="h-2 w-10/12 rounded-sm bg-white/20" />
            <div className="h-2 w-8/12 rounded-sm bg-pixel-mint/70" />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="h-16 rounded-sm bg-pixel-pink/30" />
              <div className="h-16 rounded-sm bg-pixel-blue/30" />
              <div className="h-16 rounded-sm bg-pixel-mint/30" />
            </div>
            <p className="text-pixel-blue">{project.status[locale]}</p>
          </div>
        </div>
      )}

      <ProjectCardBody project={project} index={index} locale={locale} t={t} />
    </article>
  );
}

/** Compact card for academic projects: pixel illustration or slim terminal strip. */
function AcademicCard({ project, index, locale, t }: ProjectCardProps) {
  return (
    <article className="project-card">
      {project.image ? (
        <ImagePreview project={project} locale={locale} />
      ) : (
        <div className="project-preview">
          <div className="preview-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="space-y-2 p-4 font-mono text-xs">
            <p className="text-pixel-mint" data-terminal-line>$ run {project.title}</p>
            <p className="text-pixel-blue">{project.status[locale]}</p>
          </div>
        </div>
      )}

      <ProjectCardBody project={project} index={index} locale={locale} t={t} compact />
    </article>
  );
}

function ProjectCardBody({
  project,
  index,
  locale,
  t,
  compact = false,
}: ProjectCardProps & { compact?: boolean }) {
  return (
    <div className={compact ? "p-5" : "p-6"}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="pixel-chip bg-pixel-peach px-3 py-1 font-mono text-xs font-bold">
          0{index + 1} / {t.projectLabel}
        </span>
        <span className="text-right text-xs text-ink-soft">{project.context[locale]}</span>
      </div>

      <h3 className={`${compact ? "text-xl" : "text-2xl"} font-black text-ink`}>{project.title}</h3>
      <p className={`${compact ? "mt-3 text-sm leading-6" : "mt-4 leading-7"} text-ink-soft`}>
        {project.description[locale]}
      </p>

      <ul className={`${compact ? "mt-4 space-y-2" : "mt-6 space-y-3"} text-sm text-ink-soft`}>
        {project.highlights[locale].map((highlight) => (
          <li key={highlight}>
            <span className="font-bold text-ink">▸</span> {highlight}
          </li>
        ))}
      </ul>

      <div className={`${compact ? "mt-4" : "mt-6"} flex flex-wrap gap-2`}>
        {project.tags.map((tag, tagIndex) => (
          <span key={tag} className="tag-small" data-chip={tagIndex % 5}>
            {tag}
          </span>
        ))}
      </div>

      <div className={`${compact ? "mt-5" : "mt-7"} flex flex-wrap gap-3`}>
        {project.demoUrl && (
          <a className="btn-card-primary" href={project.demoUrl} target="_blank" rel="noreferrer">
            {t.liveDemo}
          </a>
        )}
        {project.sourceUrl && (
          <a className="btn-card-ghost" href={project.sourceUrl} target="_blank" rel="noreferrer">
            {t.sourceCode}
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects({ locale }: ProjectsProps) {
  const t = copy[locale].projects;
  const sectionRef = useReveal([locale]);
  const groupsRef = useRef<HTMLDivElement>(null);

  const productionProjects = projects.filter((project) => project.category === "production");
  const academicProjects = projects.filter((project) => project.category === "academic");

  useGSAP(
    () => {
      const wrapper = groupsRef.current;
      if (!wrapper || prefersReducedMotion()) return;

      // Cards from both groups stagger in as batches enter the viewport.
      const cards = gsap.utils.toArray<HTMLElement>(".project-card", wrapper);
      gsap.set(cards, { y: 36, opacity: 0 });
      ScrollTrigger.batch(cards, {
        start: "clamp(top 88%)",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: PIXEL_EASE,
            stagger: 0.12,
          }),
      });

      // Each fake terminal types its `$ run <title>` line once, on first view.
      const lines = gsap.utils.toArray<HTMLElement>("[data-terminal-line]", wrapper);
      const finalLines = lines.map((line) => line.textContent ?? "");
      lines.forEach((line, index) => {
        const full = finalLines[index];
        line.textContent = "";
        line.classList.add("terminal-typing");
        gsap.to(line, {
          text: { value: full },
          duration: Math.min(1.2, Math.max(0.5, full.length * 0.04)),
          ease: "none",
          scrollTrigger: {
            trigger: line.closest(".project-card") ?? line,
            start: "clamp(top 80%)",
            once: true,
          },
          onComplete: () => line.classList.remove("terminal-typing"),
        });
      });

      return () => {
        // Never leave a terminal line empty or half-typed after a revert.
        lines.forEach((line, index) => {
          line.textContent = finalLines[index];
          line.classList.remove("terminal-typing");
        });
      };
    },
    { scope: groupsRef, dependencies: [locale], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} id="projects" className="section-shell">
      <div className="section-heading" data-reveal-stagger>
        <p className="section-kicker" data-reveal-item>{t.kicker}</p>
        <h2 data-reveal-item>{t.title}</h2>
      </div>

      <div ref={groupsRef} className="space-y-14">
        <div>
          <h3 className="project-group-label" data-reveal>
            {t.groups.production}
          </h3>
          <div className="grid gap-8 lg:grid-cols-2">
            {productionProjects.map((project, index) => (
              <ProductionCard key={project.title} project={project} index={index} locale={locale} t={t} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="project-group-label" data-reveal>
            {t.groups.academic}
          </h3>
          <div className="grid gap-6 lg:grid-cols-2">
            {academicProjects.map((project, index) => (
              <AcademicCard key={project.title} project={project} index={index} locale={locale} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
