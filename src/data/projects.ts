import type { Locale } from "@/lib/i18n";

export type ProjectCategory = "production" | "academic" | "client";

/** Evidence tier a visitor can verify right now. Every live/production
    claim on the site (hero status line, shell output, about stats) is
    derived from this field, so copy can never outrun the data. */
export type ProjectProof =
  | "client-live" // live client site on its own domain
  | "public-demo" // publicly reachable demo, not a client production site
  | "upcoming" // real client work, not yet publicly verifiable
  | "open-source"; // public repository, no hosted instance claimed

export type Project = {
  title: string;
  category: ProjectCategory;
  proof: ProjectProof;
  /** Optional pixel-art preview illustration served from public/pixel/. */
  image?: string;
  demoUrl?: string;
  sourceUrl?: string;
  description: Record<Locale, string>;
  context: Record<Locale, string>;
  status: Record<Locale, string>;
  tags: string[];
  highlights: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    title: "cataclub",
    category: "client",
    proof: "client-live",
    demoUrl: "https://cataclub.com/",
    description: {
      en: "Management system for Loja's table tennis club: memberships, payment validation, attendance and ranking, plus a public site and a members' portal.",
      es: "Sistema de gestión del club de tenis de mesa de Loja: membresías, validación de pagos, asistencia y ranking, más un sitio público y un portal de socios.",
    },
    context: { en: "Client project", es: "Proyecto de cliente" },
    status: {
      en: "Live client system · custom domain",
      es: "Sistema de cliente en vivo · dominio propio",
    },
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Celery", "Docker"],
    highlights: {
      en: [
        "Staff validate payments and take attendance; overdue members lose access after a grace period.",
        "Public site plus a private members' portal with login.",
        "Runs in production on its own domain with versioned releases per deploy.",
      ],
      es: [
        "El personal valida pagos y toma asistencia; los socios en mora pierden acceso tras un período de gracia.",
        "Sitio público más un portal privado de socios con inicio de sesión.",
        "En producción con dominio propio y versiones numeradas por cada despliegue.",
      ],
    },
  },
  {
    title: "YOLO Complexity Lab",
    category: "production",
    proof: "public-demo",
    image: "/pixel/project-yolo-pixel.png",
    demoUrl: "https://yololab.streamlit.app/",
    sourceUrl: "https://github.com/AlejandroTatum/yolo-complexity-lab",
    description: {
      en: "Computer-vision lab that benchmarks YOLO11n against Faster R-CNN and SSDLite on the same input — latency, FPS, GFLOPs, parameters — with a live webcam mode and custom weights.",
      es: "Laboratorio de visión por computador que compara YOLO11n con Faster R-CNN y SSDLite sobre la misma entrada — latencia, FPS, GFLOPs y parámetros — con webcam en vivo y pesos propios.",
    },
    context: {
      en: "Public source",
      es: "Código público",
    },
    status: {
      en: "Live demo · free tier, first load may take a few seconds",
      es: "Demo en vivo · plan gratuito, la primera carga puede tardar unos segundos",
    },
    tags: ["Python", "PyTorch", "Streamlit", "YOLO11", "Benchmarking"],
    highlights: {
      en: [
        "Live webcam mode: per-frame latency, FPS and detections through YOLO11n.",
        "Two-stage vs one-stage vs YOLO benchmark with mean/p95 latency, a winners chart and CSV export.",
        "Deployed on Streamlit Cloud with GitHub Actions CI.",
      ],
      es: [
        "Modo webcam en vivo: latencia, FPS y detecciones por frame con YOLO11n.",
        "Benchmark two-stage vs one-stage vs YOLO con latencia media/p95, gráfico de ganadores y exportación CSV.",
        "Desplegado en Streamlit Cloud con CI en GitHub Actions.",
      ],
    },
  },
  {
    title: "El Horno del Pingüino",
    category: "production",
    proof: "client-live",
    image: "/pixel/project-horno-pixel.png",
    demoUrl: "https://elhornodelpinguino.com/",
    description: {
      en: "Artisanal bakery in Loja: a storefront with catalog, business orders, FAQ and a single WhatsApp ordering flow, plus an admin panel where the owners keep products, banners and FAQ up to date themselves.",
      es: "Pastelería artesanal de Loja: tienda con catálogo, pedidos para negocios, FAQ y un único flujo de pedido por WhatsApp, más un panel de administración donde los dueños mantienen productos, banners y preguntas frecuentes sin depender de mí.",
    },
    context: {
      en: "Client project",
      es: "Proyecto de cliente",
    },
    status: {
      en: "Live client site · custom domain",
      es: "Sitio de cliente en vivo · dominio propio",
    },
    tags: ["Astro", "Next.js", "Prisma", "PostgreSQL", "WhatsApp CTA"],
    highlights: {
      en: [
        "Built the full responsive storefront: catalog, flavors, bulk orders, FAQ and a three-step ordering guide.",
        "The catalog comes from a Next.js + Prisma admin panel; a nightly rebuild publishes the owners' changes with no code edits.",
        "Every section funnels into one WhatsApp CTA, matching how the business closes sales.",
      ],
      es: [
        "Construí la tienda completa y responsive: catálogo, sabores, pedidos al por mayor, FAQ y guía de pedido en tres pasos.",
        "El catálogo sale de un panel de administración en Next.js + Prisma; una reconstrucción nocturna publica los cambios de los dueños sin tocar código.",
        "Cada sección desemboca en un único CTA de WhatsApp, que es como el negocio cierra ventas.",
      ],
    },
  },
  {
    title: "academic-report-automation",
    category: "academic",
    proof: "open-source",
    image: "/pixel/project-reports-pixel.png",
    sourceUrl: "https://github.com/AlejandroTatum/academic-report-automation",
    description: {
      en: "Python toolkit that turns Markdown and YAML sources into university-grade PDF reports: a LaTeX route with bibliography and validation gates, a WeasyPrint route for fast previews, IEEE reference checks and reproducible figures.",
      es: "Kit en Python que convierte fuentes Markdown y YAML en informes PDF de nivel universitario: ruta LaTeX con bibliografía y compuertas de validación, ruta WeasyPrint para previsualización rápida, chequeo de referencias IEEE y figuras reproducibles.",
    },
    context: { en: "Public source", es: "Código público" },
    status: { en: "Source and setup documented", es: "Código y configuración documentados" },
    tags: ["Python", "LaTeX", "WeasyPrint", "Playwright", "Validation"],
    highlights: {
      en: [
        "Two build routes: Markdown → LaTeX → PDF with bibliography and validation gates, and Markdown → HTML → PDF for previews.",
        "Validates report structure and IEEE-style references before anything ships.",
        "Generates Mermaid, Vega-Lite and ECharts figures as reproducible assets.",
      ],
      es: [
        "Dos rutas de compilación: Markdown → LaTeX → PDF con bibliografía y validación, y Markdown → HTML → PDF para previsualizar.",
        "Valida estructura del informe y referencias IEEE antes de entregar.",
        "Genera figuras Mermaid, Vega-Lite y ECharts como recursos reproducibles.",
      ],
    },
  },
  {
    title: "AlejandroTatum.github.io",
    category: "academic",
    proof: "open-source",
    image: "/pixel/project-portfolio-pixel.png",
    sourceUrl: "https://github.com/AlejandroTatum/AlejandroTatum.github.io",
    description: {
      en: "Bilingual portfolio with a terminal-style dev-mode UI: one typed content model for EN/ES, GSAP ScrollTrigger and Lenis motion with reduced-motion support, static export to GitHub Pages.",
      es: "Portafolio bilingüe con interfaz \"modo dev\" estilo terminal: un modelo de contenido tipado para EN/ES, animación con GSAP ScrollTrigger y Lenis respetando reduced-motion, exportación estática a GitHub Pages.",
    },
    context: { en: "Public full-stack project", es: "Proyecto full-stack público" },
    status: { en: "Source and deployment documented", es: "Código y despliegue documentados" },
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "GitHub Pages"],
    highlights: {
      en: [
        "Supports English and Spanish content from one typed content model.",
        "Uses a responsive interface with accessible semantic sections.",
        "Builds and deploys as a static site through GitHub Pages.",
      ],
      es: [
        "Ofrece contenido en inglés y español desde un modelo de contenido tipado.",
        "Usa una interfaz adaptable con secciones semánticas accesibles.",
        "Se compila y despliega como sitio estático mediante GitHub Pages.",
      ],
    },
  },
  {
    title: "hospital-appointment-inventory",
    category: "academic",
    proof: "open-source",
    sourceUrl: "https://github.com/AlejandroTatum/hospital-appointment-inventory",
    description: {
      en: "Documented Java CLI that models appointment, patient and inventory workflows over hospital-style CSV datasets.",
      es: "CLI documentada en Java que modela flujos de citas, pacientes e inventario sobre datasets CSV de contexto hospitalario.",
    },
    context: { en: "Public Java project", es: "Proyecto Java público" },
    status: { en: "Source and CLI demo documented", es: "Código y demo CLI documentados" },
    tags: [
      "Java 21",
      "Maven",
      "Apache Commons CSV",
      "JUnit 5",
      "Data Structures",
      "Search Algorithms",
      "Sorting Algorithms",
    ],
    highlights: {
      en: [
        "Loads and processes hospital-style CSV datasets.",
        "Compares sorting and search strategies over practical scenarios.",
        "Includes a documented CLI demo and Maven Wrapper setup.",
      ],
      es: [
        "Carga y procesa datasets CSV con contexto hospitalario.",
        "Compara estrategias de ordenamiento y búsqueda en escenarios prácticos.",
        "Incluye demo CLI documentada y configuración con Maven Wrapper.",
      ],
    },
  },
  {
    title: "siged",
    category: "academic",
    proof: "open-source",
    sourceUrl: "https://github.com/AlejandroTatum/siged",
    description: {
      en: "Coursework implementation of a SIGED-style school management system: Django backend and React client, built against a real reference system.",
      es: "Implementación de curso de un sistema de gestión escolar estilo SIGED: backend en Django y cliente en React, construido sobre un sistema de referencia real.",
    },
    context: { en: "Public academic project", es: "Proyecto académico público" },
    status: { en: "Source and setup documented", es: "Código y configuración documentados" },
    tags: ["Django", "React", "Python", "Education Management"],
    highlights: {
      en: [
        "Implements an education management domain following a SIGED-style reference system.",
        "Separates a Django backend from a React client interface.",
        "Built as graded coursework against a real reference system.",
      ],
      es: [
        "Implementa un dominio de gestión educativa siguiendo un sistema de referencia estilo SIGED.",
        "Separa un backend en Django de una interfaz cliente en React.",
        "Construido como trabajo de curso evaluado sobre un sistema de referencia real.",
      ],
    },
  },
  {
    title: "hmm-speech-recognition-research",
    category: "academic",
    proof: "open-source",
    sourceUrl: "https://github.com/AlejandroTatum/hmm-speech-recognition-research",
    description: {
      en: "Literature review of HMM-based speech recognition and its evolution toward hybrid and deep models, typeset as a reproducible LaTeX document.",
      es: "Revisión bibliográfica del reconocimiento de voz basado en HMM y su evolución hacia modelos híbridos y profundos, compuesta como documento LaTeX reproducible.",
    },
    context: { en: "Public academic research", es: "Investigación académica pública" },
    status: {
      en: "Research document and references documented",
      es: "Documento de investigación y referencias documentados",
    },
    tags: ["Research", "HMM", "Speech Recognition", "LaTeX"],
    highlights: {
      en: [
        "Reviews the foundations of Hidden Markov Models for speech recognition.",
        "Traces the evolution from classic HMM pipelines to hybrid and deep models.",
        "Typeset as a reproducible LaTeX research document.",
      ],
      es: [
        "Revisa los fundamentos de los Modelos Ocultos de Markov para reconocimiento de voz.",
        "Traza la evolución desde pipelines HMM clásicos hacia modelos híbridos y profundos.",
        "Compuesto como documento de investigación reproducible en LaTeX.",
      ],
    },
  },
  {
    title: "search-algorithms-java",
    category: "academic",
    proof: "open-source",
    sourceUrl: "https://github.com/AlejandroTatum/search-algorithms-java",
    description: {
      en: "Java academic project implementing sequential and binary search over arrays and linked lists using CSV datasets.",
      es: "Proyecto académico en Java que implementa búsqueda secuencial y binaria sobre arreglos y listas enlazadas usando datasets CSV.",
    },
    context: { en: "Public Java academic project", es: "Proyecto académico Java público" },
    status: { en: "Source and setup documented", es: "Código y configuración documentados" },
    tags: ["Java", "Data Structures", "Search Algorithms", "CSV"],
    highlights: {
      en: [
        "Implements sequential and binary search over arrays and linked lists.",
        "Loads CSV datasets to compare search behavior on real data.",
        "Structured as a documented academic exercise.",
      ],
      es: [
        "Implementa búsqueda secuencial y binaria sobre arreglos y listas enlazadas.",
        "Carga datasets CSV para comparar el comportamiento de búsqueda con datos reales.",
        "Estructurado como un ejercicio académico documentado.",
      ],
    },
  },
];
