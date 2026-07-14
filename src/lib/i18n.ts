export type Locale = "en" | "es";

export const copy = {
  en: {
    nav: {
      about: "About",
      stack: "Stack",
      projects: "Projects",
      contact: "Contact",
      hire: "Work with me",
      switchLabel: "Cambiar a español",
    },
    hero: {
      titleFirst: "Alejandro",
      titleLast: "Padilla",
      role: "Automation, AI Agents & Full-Stack Developer",
      description:
        "I build automation, AI agents and full-stack software that turn repetitive work into reliable systems.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      githubLabel: "View Alejandro's GitHub profile",
      linkedinLabel: "View Alejandro's LinkedIn profile",
      metadataLabel: "Professional details",
      metadata: ["Automation", "EN / ES", "Ecuador, remote"],
      heroImageAlt: "Pixel-art portrait of Alejandro Padilla",
      status: "building practical systems",
    },
    about: {
      kicker: "$ about-me",
      title: "Technical execution with a business purpose.",
      paragraphs: [
        "I'm Alejandro Padilla, a software developer and Computer Science student at Universidad Nacional de Loja in Ecuador.",
        "I build automation, AI-assisted workflows and full-stack software that turn defined problems into documented, maintainable solutions.",
      ],
      languageBadge: "EN B1 · ES native",
      timeline: [
        {
          title: "Automation & AI agents",
          detail: "Reducing repetitive work through structured, reviewable workflows",
        },
        {
          title: "Backend & full-stack",
          detail: "Python, Java, TypeScript, Next.js, SQL, PostgreSQL and Docker",
        },
        {
          title: "Open to collaboration",
          detail: "Freelance projects and software development roles, remote or in Ecuador",
        },
      ],
    },
    stack: {
      kicker: "$ tech-stack",
      title: "Tools for automation and reliable software.",
    },
    projects: {
      kicker: "$ featured-projects",
      title: "Selected work, from automation to full-stack.",
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
        "Have a repetitive workflow to automate, a software product to build, or a development role that fits this focus? Send the problem, scope or role details and I will respond with relevant questions.",
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
      switchLabel: "Switch to English",
    },
    hero: {
      titleFirst: "Alejandro",
      titleLast: "Padilla",
      role: "Desarrollador de Automatización, Agentes de IA y Full-Stack",
      description:
        "Construyo automatizaciones, agentes de IA y software full-stack que convierten trabajo repetitivo en sistemas confiables.",
      viewProjects: "Ver proyectos",
      contactMe: "Contactarme",
      githubLabel: "Ver el perfil de GitHub de Alejandro",
      linkedinLabel: "Ver el perfil de LinkedIn de Alejandro",
      metadataLabel: "Datos profesionales",
      metadata: ["Automatización", "EN / ES", "Ecuador, remoto"],
      heroImageAlt: "Retrato pixel art de Alejandro Padilla",
      status: "construyendo sistemas prácticos",
    },
    about: {
      kicker: "$ sobre-mi",
      title: "Ejecución técnica con propósito de negocio.",
      paragraphs: [
        "Soy Alejandro Padilla, desarrollador de software y estudiante de Computación en la Universidad Nacional de Loja, Ecuador.",
        "Construyo automatizaciones, flujos asistidos por IA y software full-stack que convierten problemas definidos en soluciones documentadas y mantenibles.",
      ],
      languageBadge: "EN B1 · ES nativo",
      timeline: [
        {
          title: "Automatización y agentes de IA",
          detail: "Reducción de trabajo repetitivo mediante flujos estructurados y revisables",
        },
        {
          title: "Backend y full-stack",
          detail: "Python, Java, TypeScript, Next.js, SQL, PostgreSQL y Docker",
        },
        {
          title: "Disponible para colaborar",
          detail: "Proyectos freelance y roles de desarrollo, remotos o en Ecuador",
        },
      ],
    },
    stack: {
      kicker: "$ stack-tecnico",
      title: "Herramientas para automatización y software confiable.",
    },
    projects: {
      kicker: "$ proyectos-destacados",
      title: "Trabajo seleccionado, desde automatización hasta full-stack.",
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
        "¿Tienes un flujo repetitivo por automatizar, un producto de software por construir o un rol de desarrollo alineado con este enfoque? Envía el problema, alcance o detalles del rol y responderé con preguntas relevantes.",
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
