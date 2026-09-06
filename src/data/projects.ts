import type { Locale } from "@/lib/i18n";

export type ProjectCategory = "production" | "academic";

export type Project = {
  title: string;
  category: ProjectCategory;
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
    title: "YOLO Complexity Lab",
    category: "production",
    image: "/pixel/project-yolo-pixel.png",
    demoUrl: "https://yololab.streamlit.app/",
    sourceUrl: "https://github.com/AlejandroTatum/yolo-complexity-lab",
    description: {
      en: "Interactive computer-vision lab that benchmarks YOLO11n against Faster R-CNN and SSDLite on the same input — latency, FPS, GFLOPs and parameters — with a live webcam mode and custom-weights support.",
      es: "Laboratorio interactivo de visión por computador que compara YOLO11n con Faster R-CNN y SSDLite sobre la misma entrada — latencia, FPS, GFLOPs y parámetros — con modo webcam en vivo y soporte de pesos propios.",
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
    image: "/pixel/project-horno-pixel.png",
    demoUrl: "https://elhornodelpinguino.com/",
    description: {
      en: "Site for an artisanal bakery in Loja: catalog with pricing, business orders, FAQ and a single WhatsApp ordering flow, the channel the business actually sells through.",
      es: "Sitio para una pastelería artesanal de Loja: catálogo con precios, pedidos para negocios, FAQ y un único flujo de pedido por WhatsApp, el canal por el que el negocio vende.",
    },
    context: {
      en: "Client project",
      es: "Proyecto de cliente",
    },
    status: {
      en: "Live client site · custom domain",
      es: "Sitio de cliente en vivo · dominio propio",
    },
    tags: ["Frontend", "Responsive", "Landing Page", "WhatsApp CTA", "Cloudflare Pages"],
    highlights: {
      en: [
        "Built the full responsive storefront: catalog, flavors, bulk orders, FAQ and a three-step ordering guide.",
        "Every section funnels into one WhatsApp CTA, matching how the business closes sales.",
        "Shipped on a custom domain; the business source stays private.",
      ],
      es: [
        "Construí la tienda completa y responsive: catálogo, sabores, pedidos al por mayor, FAQ y guía de pedido en tres pasos.",
        "Cada sección desemboca en un único CTA de WhatsApp, que es como el negocio cierra ventas.",
        "Publicado en dominio propio; el código del negocio se mantiene privado.",
      ],
    },
  },
  {
    title: "academic-report-automation",
    category: "academic",
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
