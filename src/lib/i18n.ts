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
      },
    },
    footer: "Construido con Next.js, TypeScript, Tailwind CSS y GitHub Pages.",
  },
} as const;
