"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
import { ContactPrompt } from "@/components/proto/ContactPrompt";
import { SHELL_HELP_ROWS } from "@/components/proto/commands";
import { GithubSignal } from "@/components/proto/GithubSignal";
import { HeroStatusLine } from "@/components/proto/HeroStatusLine";
import { useProtoContext } from "@/components/proto/ProtoContext";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

const uiCopy = {
  en: {
    heroCmd: "whoami --verbose",
    heroComment: "# profile",
    heroHeadline: "From a business problem to a system in production.",
    heroShort:
      "I design, build and run the whole piece: API, database, frontend and deployment. Live client sites and public code to prove it.",
    ctaProjects: "./view-projects",
    ctaContact: "./contact",
    portraitTitle: "alejandro.png — pixel viewer",
    flagLabel: "Flag of Ecuador (pixel art)",
    sysinfo: [
      { key: "stack", value: "FastAPI · Next.js · PostgreSQL · Docker" },
      { key: "ai", value: "LLM · agents · YOLO" },
      { key: "base", value: "Ecuador · remote · US hours" },
    ],
    heroStatusOnline: "online",
    heroStatusCommit: (relative: string) => `last commit: ${relative}`,
    heroStatusProduction: "2 sites in production · 1 launching",
    aboutCmd: "cat about.md",
    aboutComment: "# trajectory",
    aboutTitle: "about.md — read-only",
    aboutLede: "Computer Science student at Universidad Nacional de Loja (Ecuador).",
    aboutChips: ["cs student @ UNL", "es native · en b1"],
    stackCmd: "open ~/stack",
    stackComment: "# visual mode",
    stackTitle: "stack — capability explorer",
    stackToggle: "ls",
    stackCollapse: "cd ..",
    gentleName: "gentle-ai",
    gentleComment: "spec-driven dev workflow I use daily",
    projectsCmd: "ls ~/featured",
    projectsComment: "# top 3 · production first",
    projectsTitle: "featured — top 3",
    topSub: "the three builds that best show what I ship",
    visitSite: "open elhornodelpinguino.com",
    draftBadge: "final review",
    cataclubDesc:
      "CATA CLUB, Loja's table tennis club, needed one place where members and new players could find schedules, fees and a gallery. The site solves it with a public site and a private members' area with login. Launching at cataclub.com.",
    cataclubCtx: "Client project",
    cataclubStatus: "launching at cataclub.com",
    cataclubPreview: "cataclub.com — launching soon",
    cataclubImageAlt: "Preview of the CATA CLUB website under construction",
    cataclubTags: ["Next.js", "FastAPI", "PostgreSQL"],
    hornoStatus: "live · client site",
    hornoPreview: "elhornodelpinguino.com — live",
    hornoImageAlt: "Preview of the El Horno del Pingüino website",
    visitYolo: "open yololab.streamlit.app",
    openSourceTag: "open source",
    sourceLink: "source → github",
    uniBadge: "university work",
    yoloPreviewTitle: "yololab.streamlit.app — demo",
    yoloPreviewAlt: "Preview of the YOLO Complexity Lab web app",
    archiveHint: (count: number) => `# ${count} more entries — for the curious`,
    revealLabel: "ls -a ~/projects",
    hideLabel: "ls ~/projects",
    archiveDir: ".archive/",
    contactCmd: "contact --interactive",
    contactComment: "# write me",
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
    heroComment: "# perfil",
    heroHeadline: "De un problema de negocio a un sistema en producción.",
    heroShort:
      "Diseño, construyo y opero la pieza completa: API, base de datos, frontend y despliegue. Sitios de clientes en vivo y código público para comprobarlo.",
    ctaProjects: "./ver-proyectos",
    ctaContact: "./contacto",
    portraitTitle: "alejandro.png — visor de píxeles",
    flagLabel: "Bandera del Ecuador (pixel art)",
    sysinfo: [
      { key: "stack", value: "FastAPI · Next.js · PostgreSQL · Docker" },
      { key: "ia", value: "LLM · agentes · YOLO" },
      { key: "base", value: "Ecuador · remoto · horario EE. UU." },
    ],
    heroStatusOnline: "en línea",
    heroStatusCommit: (relative: string) => `último commit: ${relative}`,
    heroStatusProduction: "2 sitios en producción · 1 por publicar",
    aboutCmd: "cat sobre-mi.md",
    aboutComment: "# trayectoria",
    aboutTitle: "sobre-mi.md — solo lectura",
    aboutLede: "Estudiante de Computación en la Universidad Nacional de Loja (Ecuador).",
    aboutChips: ["cs @ UNL", "es nativo · en b1"],
    stackCmd: "open ~/stack",
    stackComment: "# modo visual",
    stackTitle: "stack — explorador de capacidades",
    stackToggle: "ls",
    stackCollapse: "cd ..",
    gentleName: "gentle-ai",
    gentleComment: "flujo spec-driven que uso a diario",
    projectsCmd: "ls ~/destacados",
    projectsComment: "# top 3 · producción primero",
    projectsTitle: "destacados — top 3",
    topSub: "los tres trabajos que mejor muestran lo que entrego",
    visitSite: "abrir elhornodelpinguino.com",
    draftBadge: "revisión final",
    cataclubDesc:
      "CATA CLUB, el club de tenis de mesa de Loja, necesitaba un solo lugar donde socios y nuevos jugadores encontraran horarios, cuotas y galería. El sitio lo resuelve con un sitio público y un área privada de socios con inicio de sesión. Se publica en cataclub.com.",
    cataclubCtx: "Proyecto de cliente",
    cataclubStatus: "se publica en cataclub.com",
    cataclubPreview: "cataclub.com — próximamente",
    cataclubImageAlt: "Vista previa del sitio de CATA CLUB en construcción",
    cataclubTags: ["Next.js", "FastAPI", "PostgreSQL"],
    hornoStatus: "en vivo · sitio de cliente",
    hornoPreview: "elhornodelpinguino.com — en vivo",
    hornoImageAlt: "Vista previa del sitio de El Horno del Pingüino",
    visitYolo: "abrir yololab.streamlit.app",
    openSourceTag: "código abierto",
    sourceLink: "código → github",
    uniBadge: "trabajo universitario",
    yoloPreviewTitle: "yololab.streamlit.app — demo",
    yoloPreviewAlt: "Vista previa de la app web YOLO Complexity Lab",
    archiveHint: (count: number) => `# ${count} entradas más — para los curiosos`,
    revealLabel: "ls -a ~/proyectos",
    hideLabel: "ls ~/proyectos",
    archiveDir: ".archive/",
    contactCmd: "contacto --interactivo",
    contactComment: "# escríbeme",
    contactTitle: "visitante@alejandro:~ — prompt en vivo",
    terminalCmd: "ssh guest@alejandro",
    terminalComment: "# interactiva",
    terminalTitle: "guest@alejandro — shell en vivo",
    guideTitle: "comandos — guía rápida",
    guideHint: "escríbelos en la shell →",
    footerNote: "next.js · gsap scrolltrigger · lenis",
    exitToPixel: "volver al modo píxel",
  },
} as const;

/** Ecuador tricolor in pixel-art form. The simplified coat of arms — condor
    over the oval with sky and Chimborazo — is what separates it from
    Colombia's plain tricolor. */
function EcuadorFlag({
  className = "proto-flag",
  label,
}: {
  className?: string;
  label: string;
}) {
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
    <svg viewBox="0 0 24 16" className={className} role="img" aria-label={label}>
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
  const commentRef = useRef<HTMLSpanElement>(null);
  const retypingRef = useRef(false);

  const retypeComment = () => {
    const el = commentRef.current;
    if (!el || !comment || retypingRef.current || prefersReducedMotion()) return;
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    retypingRef.current = true;
    typeInto(el, comment, 0.4).eventCallback("onComplete", () => {
      retypingRef.current = false;
    });
  };

  return (
    <div className="cmd-line" onMouseEnter={retypeComment}>
      <span className="cmd-prompt" aria-hidden="true">
        $
      </span>
      <span className="cmd-text" data-typed data-typed-text={cmd}>
        {cmd}
      </span>
      {comment ? (
        <span className="cmd-comment" ref={commentRef}>
          {comment}
        </span>
      ) : null}
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

/** Plays once per page load: `<main key={locale}>` remounts the hero on every
    language switch, but the power-on sequence itself should only ever run
    the first time the boot overlay hands off. Module scope survives that
    remount (it only resets on a real page load), so later mounts read it
    straight away and render the finished frame with no tween. */
let heroIntroPlayed = false;

const PORTRAIT_TILE_TOKENS = ["--trose", "--tpurple", "--tcyan", "--tgreen", "--tpeach", "--tbg"] as const;
const PORTRAIT_TILE_COUNT = 144;

/** Deterministic pseudo-random tile colors (12×12 grid): a fixed hash of the
    index, never `Math.random()`, so server and client render the exact same
    markup and hydration never mismatches. */
const PORTRAIT_TILES: string[] = Array.from({ length: PORTRAIT_TILE_COUNT }, (_, index) => {
  const hash = (index * 2654435761) >>> 0;
  return PORTRAIT_TILE_TOKENS[hash % PORTRAIT_TILE_TOKENS.length];
});

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
      const fadeGroup = gsap.utils.toArray<HTMLElement>("[data-hero-fade]", section);
      const sysinfoRows = gsap.utils.toArray<HTMLElement>(".sysinfo-row", section);
      const ctaRow = section.querySelector<HTMLElement>("[data-hero-cta]");
      const statusLine = section.querySelector<HTMLElement>("[data-hero-status]");
      const parkTargets = [...fadeGroup, ...sysinfoRows, ctaRow, statusLine].filter(
        (el): el is HTMLElement => Boolean(el),
      );

      if (!booted) {
        // Parked invisible while the boot overlay plays. The hero name and
        // portrait park themselves via plain CSS defaults (clip-path /
        // filter), so only the plain fade groups need JS here.
        gsap.set(parkTargets, { autoAlpha: 0, y: 18 });
        typedEls.forEach((el) => {
          el.textContent = "";
        });
        return;
      }

      // Portrait drifts slower than the scroll while the hero leaves — wired
      // on every boot regardless of whether the intro still needs to play.
      gsap.to("[data-portrait]", {
        y: 48,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      if (heroIntroPlayed) return;

      const nameEl = section.querySelector<HTMLElement>("[data-hero-name]");
      const scanEl = section.querySelector<HTMLElement>("[data-hero-scan]");
      const tiles = gsap.utils.toArray<HTMLElement>("[data-portrait-tile]", section);
      const portraitImg = section.querySelector<HTMLElement>("[data-portrait-img]");
      const tileWrap = section.querySelector<HTMLElement>("[data-portrait-tiles]");

      // ~1.6s power-on sequence: command types, the name raster-paints top to
      // bottom, the portrait decodes from color tiles, sysinfo prints line by
      // line, then the CTAs and the live status line settle in.
      const tl = gsap.timeline({
        onComplete: () => {
          heroIntroPlayed = true;
        },
      });

      typedEls.forEach((el, index) => {
        tl.add(typeInto(el, finalTexts[index], 0.5), 0);
      });

      if (nameEl) {
        tl.fromTo(
          nameEl,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "steps(14)" },
          0.15,
        );
      }
      if (scanEl) {
        tl.fromTo(
          scanEl,
          { top: "0%", autoAlpha: 1 },
          { top: "100%", autoAlpha: 0, duration: 0.57, ease: "none" },
          0.15,
        );
      }

      if (tiles.length) {
        tl.to(tiles, { autoAlpha: 0, duration: 0.18, stagger: { each: 0.0035, from: "random" } }, 0.4);
      }
      if (portraitImg) {
        tl.fromTo(
          portraitImg,
          { filter: "blur(6px) saturate(0) contrast(1.3)" },
          { filter: "blur(0px) saturate(1) contrast(1)", duration: 0.7, ease: PIXEL_EASE },
          0.4,
        );
      }
      if (tileWrap) {
        tl.set(tileWrap, { display: "none" }, 1.12);
      }

      if (fadeGroup.length) {
        tl.from(fadeGroup, { autoAlpha: 0, y: 10, duration: 0.3, ease: PIXEL_EASE }, 0.9);
      }
      if (sysinfoRows.length) {
        tl.from(
          sysinfoRows,
          { x: -6, autoAlpha: 0, duration: 0.22, ease: "steps(4)", stagger: 0.1 },
          0.95,
        );
      }
      if (ctaRow) {
        tl.from(ctaRow, { autoAlpha: 0, duration: 0.2, ease: PIXEL_EASE }, 1.25);
      }
      if (statusLine) {
        tl.from(statusLine, { y: 6, autoAlpha: 0, duration: 0.3, ease: PIXEL_EASE }, 1.35);
      }

      return () => {
        typedEls.forEach((el, index) => {
          el.textContent = finalTexts[index];
        });
      };
    },
    { scope: sectionRef, dependencies: [booted, locale], revertOnUpdate: true },
  );

  const introDone = heroIntroPlayed;

  return (
    <section ref={sectionRef} id="whoami" data-proto-section="whoami" className="proto-section">
      <CommandLine cmd={ui.heroCmd} comment={ui.heroComment} />
      <div className="proto-hero-grid">
        <div>
          <h1 className={introDone ? "proto-hero-name is-decoded" : "proto-hero-name"} data-hero-name>
            <span className="proto-hero-name-scan" data-hero-scan aria-hidden="true" />
            Alejandro <span className="accent">Padilla</span>
          </h1>
          <p className="proto-hero-role" data-hero-fade>
            {t.role}
          </p>
          <p className="proto-hero-headline" data-hero-fade>
            {ui.heroHeadline}
          </p>
          <p className="proto-hero-desc" data-hero-fade>
            {ui.heroShort}
          </p>
          <div className="proto-sysinfo">
            {ui.sysinfo.map((row) => (
              <div key={row.key} className="sysinfo-row">
                <span className="sysinfo-key">{row.key}</span>
                <span className="sysinfo-val">{row.value}</span>
              </div>
            ))}
            <div className="sysinfo-row">
              <span className="sysinfo-key">{locale === "en" ? "status" : "estado"}</span>
              <span className="sysinfo-val">
                {t.status}
                <span className="cursor-block" aria-hidden="true" />
              </span>
            </div>
          </div>
          <div className="proto-cta-row" data-hero-cta>
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
          <HeroStatusLine
            locale={locale}
            onlineLabel={ui.heroStatusOnline}
            commitLabel={ui.heroStatusCommit}
            productionLabel={ui.heroStatusProduction}
          />
        </div>

        <div>
          <div data-portrait>
            <TerminalWindow
              title={
                <>
                  {ui.portraitTitle}
                  <EcuadorFlag className="proto-flag proto-titlebar-flag" label={ui.flagLabel} />
                </>
              }
            >
              <div className={introDone ? "proto-portrait-frame is-decoded" : "proto-portrait-frame"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/pixel/alejandro-pixel-portrait-900.png"
                  srcSet="/pixel/alejandro-pixel-portrait-480.png 480w, /pixel/alejandro-pixel-portrait-900.png 900w, /pixel/alejandro-pixel-portrait-1400.png 1400w"
                  sizes="(max-width: 768px) 90vw, 420px"
                  width={900}
                  height={672}
                  fetchPriority="high"
                  alt={t.heroImageAlt}
                  className="proto-portrait-img"
                  data-portrait-img
                />
                <div
                  className={introDone ? "proto-portrait-tiles is-decoded" : "proto-portrait-tiles"}
                  data-portrait-tiles
                  aria-hidden="true"
                >
                  {PORTRAIT_TILES.map((tileToken, index) => (
                    <span key={index} data-portrait-tile style={{ background: `var(${tileToken})` }} />
                  ))}
                </div>
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

  const productionCount = projects.filter((p) => p.category === "production").length;
  const statsLine = `${projects.length} ${locale === "en" ? "projects" : "proyectos"} · ${STACK_TREE[1].items.length} ${locale === "en" ? "languages" : "lenguajes"} · ${productionCount} ${locale === "en" ? "in production" : "en producción"}`;

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
            <GithubSignal locale={locale} />
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
    subtitle: { en: "e2e, unit and integration tests", es: "tests e2e, unitarios y de integración" },
    items: ["Playwright", "Vitest", "pytest"],
  },
  {
    slug: "devops",
    subtitle: { en: "ship, serve and deploy", es: "desplegar, servir y publicar" },
    items: ["Git", "GitHub", "Docker", "Docker Compose", "Caddy", "GitHub Actions", "GitHub Pages", "Linux"],
  },
];

const GROUP_COLORS = ["#ff9ec7", "#7ce8d8", "#ffd6a5", "#c4b5fd", "#9fe8a8"];

/** Every group can be folded behind a per-group `ls` / `cd ..` toggle,
    mirroring the archive pattern. Below 768px only the first groups start
    expanded; wider viewports start with everything open. */
const MOBILE_EXPANDED_COUNT = 3;
const ALL_SLUGS = STACK_TREE.map((group) => group.slug);
const MOBILE_DEFAULT_SLUGS = ALL_SLUGS.slice(0, MOBILE_EXPANDED_COUNT);
const MOBILE_QUERY = "(max-width: 767px)";

function StackSection({ locale }: { locale: Locale }) {
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);
  // Server and initial client render both expand everything — matches ≥768px
  // behavior exactly, so there is no hydration mismatch. The effect below
  // narrows it down once we know the real viewport.
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => new Set(ALL_SLUGS));

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const applyDefault = (isMobile: boolean) => {
      setExpandedGroups(new Set(isMobile ? MOBILE_DEFAULT_SLUGS : ALL_SLUGS));
    };
    applyDefault(mql.matches);
    const onChange = (event: MediaQueryListEvent) => applyDefault(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const toggleGroup = (slug: string) => {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

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

          {STACK_TREE.map((group, groupIndex) => {
            const isExpanded = expandedGroups.has(group.slug);
            return (
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
                  <button
                    type="button"
                    className="bracket-btn is-ghost proto-archive-btn proto-stack-toggle"
                    onClick={() => toggleGroup(group.slug)}
                    aria-expanded={isExpanded}
                  >
                    <span className="bracket">[</span> {isExpanded ? ui.stackCollapse : ui.stackToggle}{" "}
                    <span className="bracket">]</span>
                  </button>
                </div>
                {isExpanded ? (
                  <div className="proto-stack-tiles">
                    {group.items.map((item) => {
                      const Icon = STACK_ICONS[item] ?? FiTerminal;
                      // Collapsible groups render their tiles fresh every time a
                      // visitor toggles them open — they never pass through the
                      // section's one-time scroll reveal, so they skip
                      // `data-rise` entirely and stay visible immediately
                      // instead of depending on a reveal that will never fire.
                      return (
                        <div key={item} className="stack-tile">
                          <Icon className="stack-tile-icon" aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
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
  const yolo = projects.find((p) => p.title === "YOLO Complexity Lab");
  const archive = projects.filter(
    (p) => p.title !== "El Horno del Pingüino" && p.title !== "YOLO Complexity Lab",
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
          <article id="project-cataclub" className="proto-proj is-featured" data-rise>
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
                <div className="proto-featured-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/previews/cataclub-900.png"
                    srcSet="/previews/cataclub-900.png 900w, /previews/cataclub.png 1440w"
                    sizes="(max-width: 768px) 90vw, 440px"
                    width={900}
                    height={563}
                    loading="lazy"
                    decoding="async"
                    alt={ui.cataclubImageAlt}
                    className="proto-featured-img"
                  />
                </div>
              </TerminalWindow>
            </div>
          </article>

          {/* 2 · el horno del pingüino — live on its own domain, direct site button */}
          {horno ? (
            <article id="project-elhornodelpinguino" className="proto-proj is-featured" data-rise>
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
                  <div className="proto-featured-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/previews/horno-900.png"
                      srcSet="/previews/horno-900.png 900w, /previews/horno.png 1440w"
                      sizes="(max-width: 768px) 90vw, 440px"
                      width={900}
                      height={563}
                      loading="lazy"
                      decoding="async"
                      alt={ui.hornoImageAlt}
                      className="proto-featured-img"
                    />
                  </div>
                </TerminalWindow>
              </div>
            </article>
          ) : null}

          {/* 3 · yolo complexity lab — public source, live streamlit demo */}
          {yolo ? (
            <article id="project-yololab" className="proto-proj is-featured" data-rise>
              <div className="proto-featured-info">
                <div className="proto-proj-head">
                  <span className="proto-rank" style={{ "--rank": "#ffd6a5" } as CSSProperties}>
                    03
                  </span>
                  <span className="proto-proj-name">▸ {yolo.title}</span>
                  <span className="proto-proj-ctx">{yolo.context[locale]}</span>
                </div>
                <p className="proto-proj-desc">{yolo.description[locale]}</p>
                <span className="proto-proj-status">{yolo.status[locale]}</span>
                <div className="proto-proj-tags">
                  {yolo.tags.map((tag) => (
                    <span key={tag} className="proto-tag">
                      {tag}
                    </span>
                  ))}
                  <span className="proto-tag is-open">{ui.openSourceTag}</span>
                </div>
                <div className="proto-proj-links">
                  {yolo.sourceUrl ? (
                    <a className="text-link" href={yolo.sourceUrl} target="_blank" rel="noreferrer">
                      {ui.sourceLink}
                    </a>
                  ) : null}
                </div>
                {yolo.demoUrl ? (
                  <a
                    className="bracket-btn proto-site-btn"
                    href={yolo.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="bracket">[</span> {ui.visitYolo} ↗ <span className="bracket">]</span>
                  </a>
                ) : null}
              </div>
              <div className="proto-featured-preview">
                <TerminalWindow title={ui.yoloPreviewTitle}>
                  <div className="proto-featured-frame">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/previews/yololab-900.png"
                      srcSet="/previews/yololab-900.png 900w, /previews/yololab.png 1440w"
                      sizes="(max-width: 768px) 90vw, 440px"
                      width={900}
                      height={449}
                      loading="lazy"
                      decoding="async"
                      alt={ui.yoloPreviewAlt}
                      className="proto-featured-img"
                    />
                  </div>
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

/** The cheat sheet reads straight off the shared curated overview — the
    same 8 rows plain `help` prints — so it can never drift from the guest
    shell's real command set. */
const GUIDE_COMMANDS = SHELL_HELP_ROWS;

function TerminalSection({ locale }: { locale: Locale }) {
  const ui = uiCopy[locale];
  const sectionRef = useSectionReveals(locale);
  const { runShellCommand } = useProtoContext();

  return (
    <section ref={sectionRef} id="terminal" data-proto-section="terminal" className="proto-section">
      <CommandLine cmd={ui.terminalCmd} comment={ui.terminalComment} />
      <div className="proto-contact-grid">
        <div className="proto-guide-card" data-rise>
          <TerminalWindow title={ui.guideTitle} animated>
            <div className="tui-body">
              <div className="proto-guide-list">
                {GUIDE_COMMANDS.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    className="proto-guide-row"
                    data-rise
                    onClick={() => runShellCommand?.(command.label[locale])}
                  >
                    <span className="proto-guide-cmd">❯ {command.label[locale]}</span>
                    <span className="proto-guide-desc">{command.hint[locale]}</span>
                  </button>
                ))}
              </div>
              <p className="proto-guide-hint" data-rise>
                # {ui.guideHint}
              </p>
            </div>
          </TerminalWindow>
        </div>
        <div className="proto-term-card" data-rise>
          <TerminalWindow title={ui.terminalTitle} animated>
            <div className="tui-body proto-term-body">
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
  STACK_TREE,
};
