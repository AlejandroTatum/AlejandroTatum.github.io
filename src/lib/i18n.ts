export type Locale = "en" | "es";

/* Locale selection plumbing: deep link (?lang=en|es), persistence, and URL
   sync. Only called from client components after hydration, so the server
   HTML and the first client render always agree (no hydration mismatch). */

/** Query parameter that deep-links a locale: /?lang=en or /?lang=es. */
export const LOCALE_QUERY_KEY = "lang";

const LOCALE_STORAGE_KEY = "portfolio.locale";

function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es";
}

/** Reads a valid ?lang= deep link from a query string; null otherwise. */
export function readLocaleFromSearch(search: string): Locale | null {
  const value = new URLSearchParams(search).get(LOCALE_QUERY_KEY);
  return isLocale(value) ? value : null;
}

/** Reads the persisted locale choice; null when storage is unavailable. */
export function readPersistedLocale(): Locale | null {
  try {
    const value = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null; // storage can be blocked (private mode, sandboxed frame)
  }
}

/** Persists the locale choice; storage failures stay silent by design. */
export function persistLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // storage unavailable — the in-page choice still applies
  }
}

/** Reflects the locale in the URL so the current choice is linkable. The
    Spanish default keeps a clean URL (?lang=es would be redundant). */
export function syncLocaleQuery(locale: Locale): void {
  try {
    const url = new URL(window.location.href);
    if (locale === "es") {
      url.searchParams.delete(LOCALE_QUERY_KEY);
    } else {
      url.searchParams.set(LOCALE_QUERY_KEY, locale);
    }
    window.history.replaceState(null, "", url);
  } catch {
    // history can be unavailable in sandboxed frames — ignore
  }
}

/** Tiny observable locale store for useSyncExternalStore. The server snapshot
    is always the Spanish default, so hydration matches and browser-only state
    (deep link, persisted choice) applies right after mount. */
let activeLocale: Locale = "es";
const localeListeners = new Set<() => void>();

export const localeStore = {
  get: (): Locale => activeLocale,
  getServerSnapshot: (): Locale => "es",
  subscribe: (listener: () => void) => {
    localeListeners.add(listener);
    return () => {
      localeListeners.delete(listener);
    };
  },
  set: (locale: Locale): void => {
    if (locale === activeLocale) return;
    activeLocale = locale;
    localeListeners.forEach((listener) => listener());
  },
};

export const copy = {
  en: {
    nav: {
      about: "About",
      stack: "Stack",
      projects: "Projects",
      contact: "Contact",
      hire: "Work with me",
      devMode: "dev mode",
      switchLabel: "Cambiar a español",
    },
    hero: {
      titleFirst: "Alejandro",
      titleLast: "Padilla",
      role: "Full-Stack Developer",
      description:
        "I build and run full-stack systems: FastAPI and Next.js services on PostgreSQL, shipped with Docker, and LLM automation where it cuts real manual work.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      githubLabel: "View Alejandro's GitHub profile",
      linkedinLabel: "View Alejandro's LinkedIn profile",
      metadataLabel: "Professional details",
      metadata: ["Full-stack", "EN / ES", "Ecuador, remote"],
      heroImageAlt: "Pixel-art portrait of Alejandro Padilla",
      status: "open · part-time / contract",
    },
    about: {
      kicker: "$ about-me",
      title: "Systems that ship, built for a business reason.",
      paragraphs: [
        "I'm Alejandro Padilla, a full-stack developer and Computer Science student at Universidad Nacional de Loja in Ecuador.",
        "I build and operate systems that real clients depend on: domain modeling, backend services, asynchronous job processing, authentication, automated tests, and deployment. I also apply AI as an engineering tool — LLM-backed automation and agent-orchestrated development workflows — when it removes measurable manual work.",
      ],
      languageBadge: "EN B1 · ES native",
      timeline: [
        {
          title: "How I work",
          detail:
            "Clear scope before code, short deliveries, documented tests and deployment. AI as a working tool, not a headline.",
        },
      ],
    },
    stack: {
      kicker: "$ tech-stack",
      title: "Tools for building and operating reliable software.",
    },
    projects: {
      kicker: "$ featured-projects",
      title: "Selected work, from production systems to applied AI.",
      projectLabel: "project",
      liveDemo: "Live demo →",
      sourceCode: "Source code →",
      groups: {
        production: "In Production",
        academic: "Academic & Open Source",
      },
    },
    contact: {
      kicker: "$ contact",
      title: "Let's build something that ships.",
      description:
        "A system to build, or a team that needs another engineer? Tell me the problem. You'll get a read on scope and the first steps.",
      info: [
        { label: "Location", value: "Ecuador / Remote" },
        { label: "Native language", value: "Spanish" },
        { label: "English", value: "B1" },
      ],
      actions: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        viewProfile: "View profile",
        copyEmail: "copy email",
        copied: "copied ✓",
      },
    },
    footer: "Built with Next.js, TypeScript, Tailwind CSS and GitHub Pages.",
  },
  es: {
    nav: {
      about: "Sobre mí",
      stack: "Stack",
      projects: "Proyectos",
      contact: "Contacto",
      hire: "Trabajemos juntos",
      devMode: "modo dev",
      switchLabel: "Switch to English",
    },
    hero: {
      titleFirst: "Alejandro",
      titleLast: "Padilla",
      role: "Desarrollador Full-Stack",
      description:
        "Construyo y opero sistemas full-stack: servicios FastAPI y Next.js sobre PostgreSQL, desplegados con Docker, y automatización con LLM donde recorta trabajo manual real.",
      viewProjects: "Ver proyectos",
      contactMe: "Contactarme",
      githubLabel: "Ver el perfil de GitHub de Alejandro",
      linkedinLabel: "Ver el perfil de LinkedIn de Alejandro",
      metadataLabel: "Datos profesionales",
      metadata: ["Full-stack", "EN / ES", "Ecuador, remoto"],
      heroImageAlt: "Retrato pixel art de Alejandro Padilla",
      status: "disponible · part-time / contrato",
    },
    about: {
      kicker: "$ sobre-mi",
      title: "Sistemas que salen a producción, con un porqué de negocio.",
      paragraphs: [
        "Soy Alejandro Padilla, desarrollador full-stack y estudiante de Computación en la Universidad Nacional de Loja, Ecuador.",
        "Construyo y opero sistemas de los que dependen clientes reales: modelado de dominio, servicios de backend, procesamiento asíncrono, autenticación, pruebas automatizadas y despliegue. También aplico IA como herramienta de ingeniería —automatización con LLM y flujos de desarrollo orquestados por agentes— cuando elimina trabajo manual medible.",
      ],
      languageBadge: "EN B1 · ES nativo",
      timeline: [
        {
          title: "Cómo trabajo",
          detail:
            "Alcance claro antes de escribir código, entregas cortas, tests y despliegue documentados. IA como herramienta de trabajo, no como titular.",
        },
      ],
    },
    stack: {
      kicker: "$ stack-tecnico",
      title: "Herramientas para construir y operar software confiable.",
    },
    projects: {
      kicker: "$ proyectos-destacados",
      title: "Trabajo seleccionado, desde sistemas en producción hasta IA aplicada.",
      projectLabel: "proyecto",
      liveDemo: "Demo en vivo →",
      sourceCode: "Código fuente →",
      groups: {
        production: "En producción",
        academic: "Académicos y código abierto",
      },
    },
    contact: {
      kicker: "$ contacto",
      title: "Construyamos algo que llegue a producción.",
      description:
        "¿Un sistema por construir o un equipo que necesita otro ingeniero? Cuéntame el problema. Te respondo con una lectura del alcance y los primeros pasos.",
      info: [
        { label: "Ubicación", value: "Ecuador / Remoto" },
        { label: "Idioma nativo", value: "Español" },
        { label: "Inglés", value: "B1" },
      ],
      actions: {
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        viewProfile: "Ver perfil",
        copyEmail: "copiar email",
        copied: "copiado ✓",
      },
    },
    footer: "Construido con Next.js, TypeScript, Tailwind CSS y GitHub Pages.",
  },
} as const;
