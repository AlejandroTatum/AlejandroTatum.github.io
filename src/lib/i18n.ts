export type Locale = "en" | "es";

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
      role: "Full-Stack Developer · Python & TypeScript",
      description:
        "I design, ship, and operate full-stack systems in production — FastAPI and Next.js services, asynchronous processing, and LLM-backed automation where it measurably removes manual work.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      githubLabel: "View Alejandro's GitHub profile",
      linkedinLabel: "View Alejandro's LinkedIn profile",
      metadataLabel: "Professional details",
      metadata: ["Full-stack", "EN / ES", "Ecuador, remote"],
      heroImageAlt: "Pixel-art portrait of Alejandro Padilla",
      status: "building practical systems",
    },
    about: {
      kicker: "$ about-me",
      title: "Technical execution with a business purpose.",
      paragraphs: [
        "I'm Alejandro Padilla, a full-stack developer and Computer Science student at Universidad Nacional de Loja in Ecuador.",
        "I build and operate systems that real clients depend on: domain modeling, backend services, asynchronous job processing, authentication, automated tests, and deployment. I also apply AI as an engineering tool — LLM-backed automation and agent-orchestrated development workflows — when it removes measurable manual work.",
      ],
      languageBadge: "EN B2 · ES native",
      timeline: [
        {
          title: "Backend & full-stack",
          detail: "Python, FastAPI, Celery, PostgreSQL, TypeScript, Next.js, Docker",
        },
        {
          title: "Applied AI",
          detail: "LLM-backed automation, agent-orchestrated workflows, computer vision with YOLO",
        },
        {
          title: "Open to collaboration",
          detail: "Part-time and contract work, remote with full overlap on US time zones",
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
      title: "Let's build something useful.",
      description:
        "Have a system to build, a production codebase that needs an extra engineer, or a part-time role that fits this focus? Send the problem, scope or role details and I will respond with relevant questions.",
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
      role: "Desarrollador Full-Stack · Python y TypeScript",
      description:
        "Diseño, publico y opero sistemas full-stack en producción: servicios en FastAPI y Next.js, procesamiento asíncrono y automatización con LLM donde elimina trabajo manual medible.",
      viewProjects: "Ver proyectos",
      contactMe: "Contactarme",
      githubLabel: "Ver el perfil de GitHub de Alejandro",
      linkedinLabel: "Ver el perfil de LinkedIn de Alejandro",
      metadataLabel: "Datos profesionales",
      metadata: ["Full-stack", "EN / ES", "Ecuador, remoto"],
      heroImageAlt: "Retrato pixel art de Alejandro Padilla",
      status: "construyendo sistemas prácticos",
    },
    about: {
      kicker: "$ sobre-mi",
      title: "Ejecución técnica con propósito de negocio.",
      paragraphs: [
        "Soy Alejandro Padilla, desarrollador full-stack y estudiante de Computación en la Universidad Nacional de Loja, Ecuador.",
        "Construyo y opero sistemas de los que dependen clientes reales: modelado de dominio, servicios de backend, procesamiento asíncrono, autenticación, pruebas automatizadas y despliegue. También aplico IA como herramienta de ingeniería —automatización con LLM y flujos de desarrollo orquestados por agentes— cuando elimina trabajo manual medible.",
      ],
      languageBadge: "EN B2 · ES nativo",
      timeline: [
        {
          title: "Backend y full-stack",
          detail: "Python, FastAPI, Celery, PostgreSQL, TypeScript, Next.js, Docker",
        },
        {
          title: "IA aplicada",
          detail: "Automatización con LLM, flujos orquestados por agentes, visión por computador con YOLO",
        },
        {
          title: "Disponible para colaborar",
          detail: "Trabajo part-time y por contrato, remoto con solapamiento total con husos horarios de EE. UU.",
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
      title: "Construyamos algo útil.",
      description:
        "¿Tienes un sistema por construir, una base de código en producción que necesita un ingeniero más o un rol part-time alineado con este enfoque? Envía el problema, alcance o detalles del rol y responderé con preguntas relevantes.",
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
      },
    },
    footer: "Construido con Next.js, TypeScript, Tailwind CSS y GitHub Pages.",
  },
} as const;
