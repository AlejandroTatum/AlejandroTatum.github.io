"use client";

import { useRef, useState, type CSSProperties } from "react";
import { FaGitAlt, FaGithub, FaHtml5, FaJava, FaLinkedinIn, FaLinux } from "react-icons/fa6";
import {
  FiCheckSquare,
  FiCloud,
  FiCpu,
  FiDatabase,
  FiFilePlus,
  FiFileText,
  FiGlobe,
  FiLayers,
  FiMail,
  FiPlay,
  FiServer,
  FiTerminal,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import {
  SiAstro,
  SiCaddy,
  SiCelery,
  SiDjango,
  SiDocker,
  SiElixir,
  SiFastapi,
  SiGithub,
  SiGithubactions,
  SiNextdotjs,
  SiOpencv,
  SiPlotly,
  SiPostgresql,
  SiPrisma,
  SiPytest,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiStreamlit,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { gsap, PIXEL_EASE, prefersReducedMotion, scrambleText, useGSAP } from "@/lib/gsap";
import { copy, type Locale } from "@/lib/i18n";
import { projects, type Project } from "@/data/projects";
import { siteConfig } from "@/lib/constants";
import { bindTerminalReveals, typeInto } from "@/components/proto/terminal";
import { TerminalWindow } from "@/components/proto/TerminalWindow";
import { ContactPrompt, TERMINAL_COMMANDS } from "@/components/proto/ContactPrompt";
import { DocAutomationPreview } from "@/components/proto/DocAutomationPreview";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

const uiCopy = {
  en: {
    heroCmd: "whoami --verbose",
    heroComment: "# full-stack · applied ai",
    heroShort:
      "I design, ship and operate full-stack systems — FastAPI & Next.js services, async processing, and LLM automation where it removes real work.",
    ctaProjects: "./view-projects",
    ctaContact: "./contact",
    portraitTitle: "alejandro.png — pixel viewer",
    sysinfo: [
      { key: "focus", value: "Full-stack · FastAPI · Next.js" },
      { key: "ai", value: "LLM automation · agents · YOLO" },
      { key: "languages", value: "es native · en b2" },
    ],
    sysLocation: "Ecuador · remote",
    aboutCmd: "cat about.md",
    aboutComment: "# trajectory",
    aboutTitle: "about.md — read-only",
    aboutLede: "Full-stack developer & CS student @ Universidad Nacional de Loja (Ecuador).",
    aboutChips: ["cs student @ UNL", "es native · en b2", "ecuador · remote"],
    stackCmd: "open ~/stack",
    stackComment: "# visual mode",
    stackTitle: "stack — capability explorer",
    gentleName: "gentle-ai",
    gentleComment: "core of my AI-assisted workflow",
    projectsCmd: "ls ~/featured",
    projectsComment: "# top 3 · draft",
    projectsTitle: "featured — top 3 (draft)",
    topSub: "the three builds that represent me best — everything else lives in the archive below",
    visitSite: "open elhornodelpinguino.com",
    draftBadge: "draft",
    draftDesc: "Entry being curated — final data coming soon.",
    draftStatus: "draft — do not publish yet",
    cataclubDesc:
      "Website for CATA CLUB — Loja's table tennis club: schedules, fees, gallery and a members' area. Final home: cataclub.com.",
    cataclubCtx: "client project · draft",
    cataclubStatus: "almost done — coming soon at cataclub.com",
    cataclubPreview: "cataclub.com — soon",
    cataclubImageAlt: "Preview of the CATA CLUB website under construction",
    cataclubTags: ["web", "table tennis", "loja"],
    hornoStatus: "live · finished",
    hornoPreview: "elhornodelpinguino.com — live",
    hornoImageAlt: "Preview of the El Horno del Pingüino website",
    reportPreview: "report build — demo",
    openSourceTag: "open source",
    uniBadge: "university work",
    yoloPreviewTitle: "yololab.streamlit.app — demo",
    yoloPreviewAlt: "Preview of the YOLO Complexity Lab web app",
    archiveHint: (count: number) => `# ${count} more entries — for the curious`,
    revealLabel: "ls -a ~/projects",
    hideLabel: "ls ~/projects",
    archiveDir: ".archive/",
    contactCmd: "contact --interactive",
    contactComment: "# say hi",
    contactTitle: "visitor@alejandro:~ — live prompt",
    terminalCmd: "ssh guest@alejandro",
    terminalComment: "# interactive",
    terminalTitle: "guest@alejandro — live shell",
    guideTitle: "commands — cheat sheet",
    guideHint: "type them in the shell →",
    footerNote: "next.js · gsap scrolltrigger · lenis",
    exitToPixel: "return to pixel mode",
  },
  es: {
    heroCmd: "whoami --verbose",
    heroComment: "# full-stack · ia aplicada",
    heroShort:
      "Diseño, publico y opero sistemas full-stack — servicios FastAPI y Next.js, procesamiento asíncrono y automatización con LLM donde elimina trabajo real.",
    ctaProjects: "./ver-proyectos",
    ctaContact: "./contacto",
    portraitTitle: "alejandro.png — visor de píxeles",
    sysinfo: [
      { key: "enfoque", value: "Full-stack · FastAPI · Next.js" },
      { key: "ia", value: "automatización LLM · agentes · YOLO" },
      { key: "idiomas", value: "es nativo · en b2" },
    ],
    sysLocation: "Ecuador · remoto",
    aboutCmd: "cat sobre-mi.md",
    aboutComment: "# trayectoria",
    aboutTitle: "sobre-mi.md — solo lectura",
    aboutLede: "Desarrollador full-stack y estudiante de Cs. de la Computación @ Universidad Nacional de Loja (Ecuador).",
    aboutChips: ["cs @ UNL", "es nativo · en b2", "ecuador · remoto"],
    stackCmd: "open ~/stack",
    stackComment: "# modo visual",
    stackTitle: "stack — explorador de capacidades",
    gentleName: "gentle-ai",
    gentleComment: "# núcleo de mi flujo de trabajo con IA",
    projectsCmd: "ls ~/destacados",
    projectsComment: "# top 3 · borrador",
    projectsTitle: "destacados — top 3 (borrador)",
    topSub: "los tres trabajos que mejor me representan — todo lo demás queda en el archivo, abajo",
    visitSite: "abrir elhornodelpinguino.com",
    draftBadge: "borrador",
    draftDesc: "Entrada en curación — los datos finales llegan pronto.",
    draftStatus: "borrador — no publicar todavía",
    cataclubDesc:
      "Sitio para CATA CLUB — el club de tenis de mesa de Loja: horarios, valores, galería y área de socios. Casa final: cataclub.com.",
    cataclubCtx: "proyecto de cliente · borrador",
    cataclubStatus: "casi terminado — pronto en cataclub.com",
    cataclubPreview: "cataclub.com — pronto",
    cataclubImageAlt: "Vista previa del sitio de CATA CLUB en construcción",
    cataclubTags: ["web", "tenis de mesa", "loja"],
    hornoStatus: "en vivo · terminado",
    hornoPreview: "elhornodelpinguino.com — en vivo",
    hornoImageAlt: "Vista previa del sitio de El Horno del Pingüino",
    reportPreview: "compilación de informe — demo",
    openSourceTag: "código abierto",
    uniBadge: "trabajo universitario",
    yoloPreviewTitle: "yololab.streamlit.app — demo",
    yoloPreviewAlt: "Vista previa de la app web YOLO Complexity Lab",
    archiveHint: (count: number) => `# ${count} entradas más — para los curiosos`,
    revealLabel: "ls -a ~/proyectos",
    hideLabel: "ls ~/proyectos",
    archiveDir: ".archive/",
    contactCmd: "contacto --interactivo",
    contactComment: "# saluda",
    contactTitle: "visitante@alejandro:~ — prompt en vivo",
    terminalCmd: "ssh guest@alejandro",
    terminalComment: "# interactiva",
    terminalTitle: "guest@alejandro — shell en vivo",
    guideTitle: "comandos — chuleta",
    guideHint: "escríbelos en la shell →",
    footerNote: "next.js · gsap scrolltrigger · lenis",
    exitToPixel: "volver al modo píxel",
  },
} as const;

/** Ecuador tricolor in pixel-art form. The simplified coat of arms — condor
    over the oval with sky and Chimborazo — is what separates it from
    Colombia's plain tricolor. */
function EcuadorFlag({ className = "proto-flag" }: { className?: string }) {
  const GOLD = "#FCD116";
  const SKY = "#8FBEE8";
  const SNOW = "#EDF3F8";
  const GREEN = "#3E8948";
  const DARK = "#3B2F2F";

  // Emblem cells on a 12×8 pixel grid (each cell renders 2×2 viewBox units).
  const emblem: Array<[number, number, string]> = [
    // condor perched on top of the oval
    [5, 1, DARK],
    [6, 1, DARK],
    [4, 2, DARK],
    [7, 2, DARK],
    // oval ring
    [5, 2, GOLD],
    [6, 2, GOLD],
    [4, 3, GOLD],
    [7, 3, GOLD],
    [4, 4, GOLD],
    [7, 4, GOLD],
    [5, 5, GOLD],
    [6, 5, GOLD],
    // interior: sky, snowcap and the green mountain
    [5, 3, SKY],
    [6, 3, SNOW],
    [5, 4, GREEN],
    [6, 4, GREEN],
  ];

  return (
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label="Bandera del Ecuador (pixel art)">
      <rect width="24" height="8" fill="#FFDD00" />
      <rect y="8" width="24" height="4" fill="#034EA2" />
      <rect y="12" width="24" height="4" fill="#ED1C24" />
      {emblem.map(([x, y, fill]) => (
        <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="2" height="2" fill={fill} />
      ))}
    </svg>
  );
}

function CommandLine({ cmd, comment }: { cmd: string; comment?: string }) {
  return (
    <div className="cmd-line">
      <span className="cmd-prompt" aria-hidden="true">
        $
      </span>
      <span className="cmd-text" data-typed data-typed-text={cmd}>
        {cmd}
      </span>
      {comment ? <span className="cmd-comment">{comment}</span> : null}
    </div>
  );
}

/** Shared scroll-reveal wiring for the below-the-fold sections. */
function useSectionReveals(locale: Locale) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      return bindTerminalReveals(section);
    },
    { scope: sectionRef, dependencies: [locale], revertOnUpdate: true },
  );

  return sectionRef;
}

/* ------------------------------------------------------------------ */
/* 0 · whoami                                                          */
/* ------------------------------------------------------------------ */

function HeroSection({ locale, booted }: { locale: Locale; booted: boolean }) {
  const t = copy[locale].hero;
  const ui = uiCopy[locale];
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || prefersReducedMotion()) return;

      const typedEls = gsap.utils.toArray<HTMLElement>("[data-typed]", section);
      const finalTexts = typedEls.map((el) => el.dataset.typedText ?? el.textContent ?? "");
      const rises = gsap.utils.toArray<HTMLElement>("[data-rise]", section);

      if (!booted) {
        // Parked invisible while the boot overlay plays.
        gsap.set(rises, { autoAlpha: 0, y: 18 });
        typedEls.forEach((el) => {
          el.textContent = "";
        });
        return;
      }

      const tl = gsap.timeline({ delay: 0.15 });
      typedEls.forEach((el, index) => {
        tl.add(typeInto(el, finalTexts[index], 0.7), index * 0.5);
      });
      tl.from(rises, {
        y: 18,
        autoAlpha: 0,
        duration: 0.5,
        ease: PIXEL_EASE,
        stagger: 0.08,
      }, 0.35);

      // Portrait drifts slower than the scroll while the hero leaves.
      gsap.to("[data-portrait]", {
        y: 48,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        typedEls.forEach((el, index) => {
          el.textContent = finalTexts[index];
        });
      };
    },
    { scope: sectionRef, dependencies: [booted, locale], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} id="whoami" data-proto-section="whoami" className="proto-section">
      <CommandLine cmd={ui.heroCmd} comment={ui.heroComment} />
      <div className="proto-hero-grid">
        <div>
          <h1 className="proto-hero-name" data-rise>
            Alejandro <span className="accent">Padilla</span>
          </h1>
          <p className="proto-hero-role" data-rise>
            {t.role}
          </p>
          <p className="proto-hero-desc" data-rise>
            {ui.heroShort}
          </p>
          <div className="proto-sysinfo" data-rise>
            {ui.sysinfo.map((row) => (
              <div key={row.key} className="sysinfo-row">
                <span className="sysinfo-key">{row.key}</span>
                <span className="sysinfo-val">{row.value}</span>
              </div>
            ))}
            <div className="sysinfo-row">
              <span className="sysinfo-key">{locale === "en" ? "location" : "ubicación"}</span>
              <span className="sysinfo-val sysinfo-loc">
                <EcuadorFlag />
                {ui.sysLocation}
              </span>
            </div>
            <div className="sysinfo-row">
              <span className="sysinfo-key">{locale === "en" ? "status" : "estado"}</span>
              <span className="sysinfo-val">
                {t.status}
                <span className="cursor-block" aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="proto-cta-row" data-rise>
            <a className="bracket-btn" href="#projects">
              <span className="bracket">[</span> {ui.ctaProjects} <span className="bracket">]</span>
            </a>
            <a className="bracket-btn is-ghost" href="#contact">
              <span className="bracket">[</span> {ui.ctaContact} <span className="bracket">]</span>
            </a>
            <a
              className="icon-btn"
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              aria-label={t.githubLabel}
            >
              <SiGithub aria-hidden="true" />
            </a>
            <a
              className="icon-btn"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={t.linkedinLabel}
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
          </div>
        </div>

        <div data-rise>
          <div data-portrait>
            <TerminalWindow
              title={
                <>
                  {ui.portraitTitle}
                  <EcuadorFlag className="proto-flag proto-titlebar-flag" />
                </>
              }
            >
              <div className="proto-portrait-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pixel/alejandro-pixel-portrait.png"
                  alt={t.heroImageAlt}
                  className="proto-portrait-img"
                />
                <div className="proto-scan-corners" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · cat about.md — trajectory as a git log, not walls of text       */
/* ------------------------------------------------------------------ */
/* 1 · cat about.md — the panel powers on like a CRT and the file      */
/*     dumps line by line, like real terminal output                   */
/* ------------------------------------------------------------------ */

const GLOG_ROWS: Array<{ icon: IconType; color: string }> = [
  { icon: FiServer, color: "#ff9ec7" },
  { icon: FiCpu, color: "#7ce8d8" },
  { icon: FiMail, color: "#ffd6a5" },
];

function AboutSection({ locale }: { locale: Locale }) {
  const t = copy[locale].about;
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);
  const windowRef = useRef<HTMLDivElement>(null);

  // Signature transition: CRT power-on → the file "prints" as a stream of
  // output lines, and the lede decodes from glyph noise.
  useGSAP(
    () => {
      const win = windowRef.current;
      if (!win || prefersReducedMotion()) return;

      const items = gsap.utils.toArray<HTMLElement>("[data-stream]", win);
      const lede = win.querySelector<HTMLElement>("[data-scramble]");
      const ledeText = lede?.textContent ?? "";
      const flash = win.querySelector<HTMLElement>("[data-flash]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: win, start: "top 78%", once: true },
      });

      // power-on: a thin bright line expands into the panel
      tl.from(win, {
        scaleY: 0.004,
        transformOrigin: "50% 50%",
        duration: 0.42,
        ease: "power3.in",
      });
      if (flash) {
        tl.fromTo(flash, { autoAlpha: 0.9 }, { autoAlpha: 0, duration: 0.4, ease: "power2.out" }, "<");
      }

      // output stream: every line prints in sequence
      tl.from(items, {
        autoAlpha: 0,
        y: 10,
        duration: 0.15,
        ease: "steps(3)",
        stagger: 0.13,
      }, "-=0.1");

      // the lede resolves from terminal glyph noise
      if (lede) {
        tl.add(() => {
          if (lede) scrambleText(lede, 0.7);
        }, "-=0.3");
      }

      return () => {
        if (lede) lede.textContent = ledeText;
      };
    },
    { scope: sectionRef, dependencies: [locale], revertOnUpdate: true },
  );

  const statsLine = `${projects.length} ${locale === "en" ? "projects" : "proyectos"} · ${STACK_TREE[1].items.length} ${locale === "en" ? "languages" : "lenguajes"} · 1 ${locale === "en" ? "open-source skill" : "skill open-source"}`;

  return (
    <section ref={sectionRef} id="about" data-proto-section="about" className="proto-section">
      <CommandLine cmd={ui.aboutCmd} comment={ui.aboutComment} />
      <div ref={windowRef}>
        <TerminalWindow title={ui.aboutTitle}>
          <span className="proto-flash" data-flash aria-hidden="true" />
          <div className="tui-body">
            <p className="proto-about-lede" data-stream data-scramble>
              {ui.aboutLede}
            </p>
            <div className="proto-glog">
              {t.timeline.map((item, index) => {
                const meta = GLOG_ROWS[index % GLOG_ROWS.length];
                const NodeIcon = meta.icon;
                return (
                  <div key={item.title} className="glog-row" data-stream>
                    <span className="glog-rail" aria-hidden="true">
                      <span className="glog-node" style={{ "--node": meta.color } as CSSProperties}>
                        <NodeIcon />
                      </span>
                      {index < t.timeline.length - 1 ? <span className="glog-line" /> : null}
                    </span>
                    <div>
                      <span className="glog-title">{item.title}</span>
                      <span className="glog-detail">{item.detail}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="proto-about-chips" data-stream>
              {ui.aboutChips.map((chip) => (
                <span key={chip} className="proto-tag">
                  {chip}
                </span>
              ))}
            </div>
            <div className="proto-about-stats" data-stream>
              <span className="proto-about-stats-cmd">wc -l ~/trajectory</span>
              <span className="proto-about-stats-out">{statsLine}</span>
              <span className="cursor-block" aria-hidden="true" />
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · open ~/stack — visual capability explorer                       */
/* ------------------------------------------------------------------ */

const STACK_ICONS: Record<string, IconType> = {
  // automation-ai
  "AI Agents": FiCpu,
  "Report Automation": FiFileText,
  "Document Generation": FiFilePlus,
  "Validation Workflows": FiCheckSquare,
  // languages
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: FiFileText,
  Elixir: SiElixir,
  Java: FaJava,
  SQL: FiDatabase,
  // frontend
  "Next.js": SiNextdotjs,
  React: SiReact,
  Astro: SiAstro,
  "Tailwind CSS": SiTailwindcss,
  "GSAP + Lenis": FiZap,
  "HTML + CSS": FaHtml5,
  // backend
  FastAPI: SiFastapi,
  Django: SiDjango,
  DRF: FiLayers,
  Phoenix: FiCloud,
  LiveView: FiZap,
  Celery: SiCelery,
  // data
  PostgreSQL: SiPostgresql,
  SQLAlchemy: FiLayers,
  Alembic: FiTrendingUp,
  Prisma: SiPrisma,
  Ecto: FiDatabase,
  Redis: SiRedis,
  // computer vision
  PyTorch: SiPytorch,
  "Ultralytics YOLO": FiCpu,
  OpenCV: SiOpencv,
  Streamlit: SiStreamlit,
  Plotly: SiPlotly,
  // quality
  Playwright: FiPlay,
  Vitest: FiCheckSquare,
  pytest: SiPytest,
  // devops
  Git: FaGitAlt,
  GitHub: FaGithub,
  Docker: SiDocker,
  "Docker Compose": FiLayers,
  Caddy: SiCaddy,
  "GitHub Actions": SiGithubactions,
  "GitHub Pages": FiGlobe,
  Linux: FaLinux,
};

/**
 * Capability tree derived from the actual apps in ~/devwork/apps — every tile
 * is backed by real code (cata_club, horno, siged, app-inventario, yolo-lab,
 * academic-report-automation, this portfolio). Design-phase experiments stay
 * out on purpose.
 */
const STACK_TREE: Array<{ slug: string; subtitle: Record<Locale, string>; items: string[] }> = [
  {
    slug: "automation-ai",
    subtitle: { en: "workflows, agents and document systems", es: "flujos, agentes y sistemas documentales" },
    items: ["AI Agents", "Report Automation", "Document Generation", "Validation Workflows"],
  },
  {
    slug: "languages",
    subtitle: { en: "typed, scripted and functional", es: "tipados, scripting y funcional" },
    items: ["Python", "TypeScript", "JavaScript", "Elixir", "Java", "SQL"],
  },
  {
    slug: "frontend",
    subtitle: { en: "interfaces and full-stack apps", es: "interfaces y apps full-stack" },
    items: ["Next.js", "React", "Astro", "Tailwind CSS", "GSAP + Lenis", "HTML + CSS"],
  },
  {
    slug: "backend",
    subtitle: { en: "APIs, async jobs and services", es: "APIs, tareas asíncronas y servicios" },
    items: ["FastAPI", "Django", "DRF", "Phoenix", "LiveView", "Celery"],
  },
  {
    slug: "data",
    subtitle: { en: "persistence, migrations and queues", es: "persistencia, migraciones y colas" },
    items: ["PostgreSQL", "SQLAlchemy", "Alembic", "Prisma", "Ecto", "Redis"],
  },
  {
    slug: "computer-vision",
    subtitle: { en: "detection, benchmarking and visual apps", es: "detección, benchmarking y apps visuales" },
    items: ["PyTorch", "Ultralytics YOLO", "OpenCV", "Streamlit", "Plotly"],
  },
  {
    slug: "quality",
    subtitle: { en: "e2e, unit and integration evidence", es: "evidencia e2e, unit e integración" },
    items: ["Playwright", "Vitest", "pytest"],
  },
  {
    slug: "devops",
    subtitle: { en: "ship, serve and deploy", es: "desplegar, servir y publicar" },
    items: ["Git", "GitHub", "Docker", "Docker Compose", "Caddy", "GitHub Actions", "GitHub Pages", "Linux"],
  },
];

const GROUP_COLORS = ["#ff9ec7", "#7ce8d8", "#ffd6a5", "#c4b5fd", "#9fe8a8"];

function StackSection({ locale }: { locale: Locale }) {
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);

  return (
    <section ref={sectionRef} id="stack" data-proto-section="stack" className="proto-section">
      <CommandLine cmd={ui.stackCmd} comment={ui.stackComment} />
      <TerminalWindow title={ui.stackTitle} animated>
        <div className="tui-body">
          <div className="proto-stack-featured" data-rise>
            <FiZap className="proto-stack-featured-icon" aria-hidden="true" />
            <div>
              <span className="proto-stack-featured-name">{ui.gentleName}</span>
              <span className="tree-dir-comment"># {ui.gentleComment}</span>
            </div>
            <span className="proto-stack-featured-pulse" aria-hidden="true" />
          </div>

          {STACK_TREE.map((group, groupIndex) => (
            <div
              key={group.slug}
              className="proto-stack-group"
              data-rise
              style={{ "--grp": GROUP_COLORS[groupIndex % GROUP_COLORS.length] } as CSSProperties}
            >
              <div className="proto-stack-dir">
                <span className="tree-branch" aria-hidden="true">
                  {groupIndex === STACK_TREE.length - 1 ? "└──" : "├──"}
                </span>
                <span className="tree-dir">{group.slug}/</span>
                <span className="tree-dir-comment"># {group.subtitle[locale]}</span>
              </div>
              <div className="proto-stack-tiles">
                {group.items.map((item) => {
                  const Icon = STACK_ICONS[item] ?? FiTerminal;
                  return (
                    <div key={item} className="stack-tile" data-rise>
                      <Icon className="stack-tile-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </TerminalWindow>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · ls ~/featured — top 3 with live previews + hidden .archive      */
/* ------------------------------------------------------------------ */

function ProjectRow({ project, locale, dim, uni }: { project: Project; locale: Locale; dim?: boolean; uni?: boolean }) {
  const t = copy[locale].projects;
  const ui = uiCopy[locale];
  return (
    <article className={dim ? "proto-proj is-dim" : "proto-proj"} data-rise>
      <div className="proto-proj-head">
        <span className="proto-proj-name">▸ {project.title}</span>
        {uni ? <span className="proto-uni-badge">{ui.uniBadge}</span> : null}
        {project.context[locale] ? <span className="proto-proj-ctx">{project.context[locale]}</span> : null}
      </div>
      <p className="proto-proj-desc">{project.description[locale]}</p>
      <span className="proto-proj-status">{project.status[locale]}</span>
      {project.tags.length > 0 ? (
        <div className="proto-proj-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="proto-tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {project.demoUrl || project.sourceUrl ? (
        <div className="proto-proj-links">
          {project.demoUrl ? (
            <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">
              {t.liveDemo}
            </a>
          ) : null}
          {project.sourceUrl ? (
            <a className="text-link" href={project.sourceUrl} target="_blank" rel="noreferrer">
              {t.sourceCode}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

function ProjectsSection({ locale }: { locale: Locale }) {
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);
  const [showArchive, setShowArchive] = useState(false);

  const horno = projects.find((p) => p.title === "El Horno del Pingüino");
  const report = projects.find((p) => p.title === "academic-report-automation");
  const archive = projects.filter(
    (p) => p.title !== "El Horno del Pingüino" && p.title !== "academic-report-automation",
  );

  return (
    <section ref={sectionRef} id="projects" data-proto-section="projects" className="proto-section">
      <CommandLine cmd={ui.projectsCmd} comment={ui.projectsComment} />
      <TerminalWindow title={ui.projectsTitle} animated>
        <div className="tui-body">
          <div className="proto-top3" data-rise>
            <span className="proto-top3-label">★ TOP 3</span>
            <span className="proto-top3-line" aria-hidden="true" />
            <span className="proto-top3-sub">{ui.topSub}</span>
          </div>

          {/* 1 · cataclub — draft with staging preview */}
          <article className="proto-proj is-featured" data-rise>
            <div className="proto-featured-info">
              <div className="proto-proj-head">
                <span className="proto-rank" style={{ "--rank": "#ff9ec7" } as CSSProperties}>
                  01
                </span>
                <span className="proto-proj-name">▸ cataclub</span>
                <span className="proto-draft-badge">{ui.draftBadge}</span>
                <span className="proto-proj-ctx">{ui.cataclubCtx}</span>
              </div>
              <p className="proto-proj-desc">{ui.cataclubDesc}</p>
              <span className="proto-proj-status">{ui.cataclubStatus}</span>
              <div className="proto-proj-tags">
                {ui.cataclubTags.map((tag) => (
                  <span key={tag} className="proto-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="proto-featured-preview">
              <TerminalWindow title={ui.cataclubPreview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/previews/cataclub.png" alt={ui.cataclubImageAlt} className="proto-featured-img" />
              </TerminalWindow>
            </div>
          </article>

          {/* 2 · el horno del pingüino — live on its own domain, direct site button */}
          {horno ? (
            <article className="proto-proj is-featured" data-rise>
              <div className="proto-featured-info">
                <div className="proto-proj-head">
                  <span className="proto-rank" style={{ "--rank": "#7ce8d8" } as CSSProperties}>
                    02
                  </span>
                  <span className="proto-proj-name">▸ {horno.title}</span>
                  <span className="proto-proj-ctx">{horno.context[locale]}</span>
                </div>
                <p className="proto-proj-desc">{horno.description[locale]}</p>
                <span className="proto-proj-status">
                  <span className="proto-live-dot" aria-hidden="true" /> {ui.hornoStatus}
                </span>
                <div className="proto-proj-tags">
                  {horno.tags.map((tag) => (
                    <span key={tag} className="proto-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  className="bracket-btn proto-site-btn"
                  href="https://elhornodelpinguino.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="bracket">[</span> {ui.visitSite} ↗ <span className="bracket">]</span>
                </a>
              </div>
              <div className="proto-featured-preview">
                <TerminalWindow title={ui.hornoPreview}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/previews/horno.png" alt={ui.hornoImageAlt} className="proto-featured-img" />
                </TerminalWindow>
              </div>
            </article>
          ) : null}

          {/* 3 · academic-report-automation — animated terminal demo, open source */}
          {report ? (
            <article className="proto-proj is-featured" data-rise>
              <div className="proto-featured-info">
                <div className="proto-proj-head">
                  <span className="proto-rank" style={{ "--rank": "#ffd6a5" } as CSSProperties}>
                    03
                  </span>
                  <span className="proto-proj-name">▸ {report.title}</span>
                  <span className="proto-proj-ctx">{report.context[locale]}</span>
                </div>
                <p className="proto-proj-desc">{report.description[locale]}</p>
                <span className="proto-proj-status">{report.status[locale]}</span>
                <div className="proto-proj-tags">
                  {report.tags.map((tag) => (
                    <span key={tag} className="proto-tag">
                      {tag}
                    </span>
                  ))}
                  <span className="proto-tag is-open">{ui.openSourceTag}</span>
                </div>
                <div className="proto-proj-links">
                  {report.sourceUrl ? (
                    <a className="text-link" href={report.sourceUrl} target="_blank" rel="noreferrer">
                      github → {ui.openSourceTag}
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="proto-featured-preview">
                <TerminalWindow title={ui.reportPreview}>
                  <DocAutomationPreview />
                </TerminalWindow>
              </div>
            </article>
          ) : null}

          <div className="proto-archive-toggle" data-rise>
            <button
              type="button"
              className="bracket-btn is-ghost proto-archive-btn"
              onClick={() => setShowArchive((current) => !current)}
              aria-expanded={showArchive}
            >
              <span className="bracket">[</span> {showArchive ? ui.hideLabel : ui.revealLabel}{" "}
              <span className="bracket">]</span>
            </button>
            <span className="proto-archive-hint">{ui.archiveHint(archive.length)}</span>
          </div>

          {showArchive ? (
            <div className="proto-archive">
              <div className="proto-proj-dir proto-archive-dir">
                <span className="tree-branch" aria-hidden="true">
                  └──
                </span>
                <span>{ui.archiveDir}</span>
              </div>
              {archive.map((project, index) => {
                const isUni = index >= archive.length - 4;
                if (project.title === "YOLO Complexity Lab") {
                  // The one archive entry with a live app gets the full
                  // featured-card structure — info left, screen right.
                  return (
                    <article key={project.title} className="proto-proj is-featured is-dim" data-rise>
                      <div className="proto-featured-info">
                        <div className="proto-proj-head">
                          <span className="proto-proj-name">▸ {project.title}</span>
                          {isUni ? <span className="proto-uni-badge">{ui.uniBadge}</span> : null}
                          <span className="proto-proj-ctx">{project.context[locale]}</span>
                        </div>
                        <p className="proto-proj-desc">{project.description[locale]}</p>
                        <span className="proto-proj-status">{project.status[locale]}</span>
                        <div className="proto-proj-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="proto-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="proto-proj-links">
                          {project.demoUrl ? (
                            <a className="text-link" href={project.demoUrl} target="_blank" rel="noreferrer">
                              {copy[locale].projects.liveDemo}
                            </a>
                          ) : null}
                          {project.sourceUrl ? (
                            <a className="text-link" href={project.sourceUrl} target="_blank" rel="noreferrer">
                              {copy[locale].projects.sourceCode}
                            </a>
                          ) : null}
                        </div>
                      </div>
                      <div className="proto-featured-preview">
                        <TerminalWindow title={ui.yoloPreviewTitle}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src="/previews/yololab.png"
                            alt={ui.yoloPreviewAlt}
                            className="proto-featured-img"
                            loading="lazy"
                          />
                        </TerminalWindow>
                      </div>
                    </article>
                  );
                }
                return <ProjectRow key={project.title} project={project} locale={locale} dim uni={isUni} />;
              })}
            </div>
          ) : null}
        </div>
      </TerminalWindow>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · ssh guest@alejandro — the interactive guest shell                */
/* ------------------------------------------------------------------ */

function TerminalSection({ locale }: { locale: Locale }) {
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);

  return (
    <section ref={sectionRef} id="terminal" data-proto-section="terminal" className="proto-section">
      <CommandLine cmd={ui.terminalCmd} comment={ui.terminalComment} />
      <div className="proto-contact-grid">
        <div data-rise>
          <TerminalWindow title={ui.guideTitle} animated>
            <div className="tui-body">
              <div className="proto-guide-list">
                {TERMINAL_COMMANDS.map(({ cmd, desc }) => (
                  <div key={cmd} className="proto-guide-row" data-rise>
                    <span className="proto-guide-cmd">❯ {cmd}</span>
                    <span className="proto-guide-desc">{desc[locale]}</span>
                  </div>
                ))}
              </div>
              <p className="proto-guide-hint" data-rise>
                # {ui.guideHint}
              </p>
            </div>
          </TerminalWindow>
        </div>
        <div data-rise>
          <TerminalWindow title={ui.terminalTitle} animated>
            <div className="tui-body">
              <ContactPrompt locale={locale} />
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}

/* 5 · contact --interactive                                           */
/* ------------------------------------------------------------------ */

function ContactSection({ locale }: { locale: Locale }) {
  const t = copy[locale].contact;
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);

  return (
    <section ref={sectionRef} id="contact" data-proto-section="contact" className="proto-section">
      <CommandLine cmd={ui.contactCmd} comment={ui.contactComment} />
      <p className="proto-contact-desc" data-rise>
        {t.description}
      </p>
      <div className="proto-contact-rows" data-rise>
        <a className="proto-contact-row" href={siteConfig.emailHref} target="_blank" rel="noreferrer">
          <span className="cmd-name">mail</span>
          <span className="cmd-value">{siteConfig.email}</span>
        </a>
        <a className="proto-contact-row" href={siteConfig.github} target="_blank" rel="noreferrer">
          <span className="cmd-name">github</span>
          <span className="cmd-value">github.com/AlejandroTatum</span>
        </a>
        <a className="proto-contact-row" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
          <span className="cmd-name">linkedin</span>
          <span className="cmd-value">in/alejandro-emanuel-padilla-espinoza</span>
        </a>
      </div>
      <p className="cmd-comment proto-contact-pointer" data-rise>
        # {locale === "en" ? "prefer typing? run the guest shell above ↑" : "¿prefieres escribir? corre la shell de invitados arriba ↑"}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export {
  HeroSection,
  AboutSection,
  StackSection,
  ProjectsSection,
  TerminalSection,
  ContactSection,
  uiCopy,
};
