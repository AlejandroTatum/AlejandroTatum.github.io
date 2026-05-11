export type Locale = "en" | "es";

export const copy = {
  en: {
    nav: {
      about: "About",
      stack: "Stack",
      projects: "Projects",
      contact: "Contact",
      hire: "Hire / Contact",
      switchLabel: "Cambiar a español",
    },
    hero: {
      badge: "Open to remote internships",
      titleFirst: "Alejandro",
      titleLast: "Padilla",
      role: "Backend & Full-Stack Developer in Progress",
      description:
        "Computer Science student at Universidad Nacional de Loja. I build solid fundamentals with Java, SQL, Docker, TypeScript and Next.js while preparing for real remote software teams.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
      metrics: [
        { label: "Public repos", value: "4" },
        { label: "English", value: "B1" },
        { label: "Mode", value: "Remote" },
      ],
      cardLabel: "alejandro@portfolio",
      cardTitle: "Remote-ready junior profile",
      cardText:
        "Practical academic projects, clean documentation and a learning path focused on backend/full-stack fundamentals.",
      status: "learning + building",
    },
    about: {
      kicker: "$ about-me",
      title: "Honest junior profile, clear direction.",
      intro:
        "I'm not presenting myself as a senior. I'm showing what I'm learning, what I've built, and where I want to grow.",
      paragraphs: [
        "I'm Alejandro Padilla, a Computer Science student at Universidad Nacional de Loja, Ecuador.",
        "I'm focused on backend and full-stack development, building solid foundations in Java, data structures, SQL/PostgreSQL, Git, Docker, TypeScript, React and Next.js.",
        "Spanish is my native language. I currently have a B1 English level, and I can read technical documentation and communicate basic technical ideas in English.",
      ],
      timeline: [
        {
          title: "Computer Science Student",
          detail: "Universidad Nacional de Loja · Ecuador",
        },
        {
          title: "Current focus",
          detail: "Backend, databases, Docker, TypeScript, React and Next.js",
        },
        {
          title: "Opportunity goal",
          detail: "Remote programming internship or junior remote role",
        },
      ],
    },
    stack: {
      kicker: "$ tech-stack",
      title: "Tools I can explain, not just list.",
      intro:
        "The goal is not to collect logos. The goal is to understand the fundamentals behind the stack and apply them in small, finished projects.",
    },
    projects: {
      kicker: "$ featured-projects",
      title: "Projects with documentation and runnable setup.",
      intro:
        "These are academic projects, but they are cleaned, documented and positioned as evidence of fundamentals: Java, data structures, algorithms and CSV data handling.",
      status: "status: documented · build: passing · type: academic",
      repoLabel: "repo",
      stackLabel: "Java · Maven",
      viewRepo: "View repository →",
    },
    contact: {
      kicker: "$ contact",
      title: "Let's build something useful.",
      description:
        "I'm open to remote internships, junior programming opportunities and projects where I can keep improving as a backend/full-stack developer.",
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
      hire: "Contactar",
      switchLabel: "Switch to English",
    },
    hero: {
      badge: "Disponible para prácticas remotas",
      titleFirst: "Alejandro",
      titleLast: "Padilla",
      role: "Desarrollador Backend & Full-Stack en formación",
      description:
        "Estudiante de Computación en la Universidad Nacional de Loja. Estoy construyendo bases sólidas con Java, SQL, Docker, TypeScript y Next.js para integrarme a equipos remotos reales.",
      viewProjects: "Ver proyectos",
      contactMe: "Contactarme",
      metrics: [
        { label: "Repos públicos", value: "4" },
        { label: "Inglés", value: "B1" },
        { label: "Modalidad", value: "Remoto" },
      ],
      cardLabel: "alejandro@portfolio",
      cardTitle: "Perfil junior listo para remoto",
      cardText:
        "Proyectos académicos prácticos, documentación limpia y una ruta de aprendizaje enfocada en fundamentos backend/full-stack.",
      status: "aprendiendo + construyendo",
    },
    about: {
      kicker: "$ sobre-mi",
      title: "Perfil junior honesto, dirección clara.",
      intro:
        "No me presento como senior. Muestro lo que estoy aprendiendo, lo que ya construí y hacia dónde quiero crecer.",
      paragraphs: [
        "Soy Alejandro Padilla, estudiante de Computación en la Universidad Nacional de Loja, Ecuador.",
        "Estoy enfocado en desarrollo backend y full-stack, construyendo bases sólidas en Java, estructuras de datos, SQL/PostgreSQL, Git, Docker, TypeScript, React y Next.js.",
        "El español es mi idioma nativo. Actualmente tengo nivel B1 de inglés; puedo leer documentación técnica y comunicar ideas técnicas básicas en inglés.",
      ],
      timeline: [
        {
          title: "Estudiante de Computación",
          detail: "Universidad Nacional de Loja · Ecuador",
        },
        {
          title: "Enfoque actual",
          detail: "Backend, bases de datos, Docker, TypeScript, React y Next.js",
        },
        {
          title: "Objetivo profesional",
          detail: "Práctica remota de programación o primer rol junior remoto",
        },
      ],
    },
    stack: {
      kicker: "$ stack-tecnico",
      title: "Herramientas que puedo explicar, no solo listar.",
      intro:
        "El objetivo no es coleccionar logos. El objetivo es entender los fundamentos detrás del stack y aplicarlos en proyectos pequeños pero terminados.",
    },
    projects: {
      kicker: "$ proyectos-destacados",
      title: "Proyectos documentados y ejecutables.",
      intro:
        "Son proyectos académicos, pero están limpios, documentados y presentados como evidencia de fundamentos: Java, estructuras de datos, algoritmos y manejo de CSV.",
      status: "estado: documentado · build: correcto · tipo: académico",
      repoLabel: "repo",
      stackLabel: "Java · Maven",
      viewRepo: "Ver repositorio →",
    },
    contact: {
      kicker: "$ contacto",
      title: "Construyamos algo útil.",
      description:
        "Estoy abierto a prácticas remotas, oportunidades junior de programación y proyectos donde pueda seguir mejorando como desarrollador backend/full-stack.",
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
