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
    demoUrl: "https://yolo-complexity-lab-unl.streamlit.app/",
    sourceUrl: "https://github.com/AlejandroTatum/yolo-complexity-lab",
    description: {
      en: "End-to-end computer vision lab for exploring YOLO model complexity, inference behavior and practical deployment tradeoffs through an interactive web interface.",
      es: "Laboratorio de visión por computadora implementado de extremo a extremo para explorar la complejidad de modelos YOLO, su inferencia y decisiones prácticas de despliegue mediante una interfaz web interactiva.",
    },
    context: {
      en: "End-to-end implementation · Public source",
      es: "Implementación de extremo a extremo · Código público",
    },
    status: {
      en: "Live demo · Free-tier hosting may require startup time",
      es: "Demo en vivo · El hosting gratuito puede requerir tiempo de inicio",
    },
    tags: ["Python", "Streamlit", "YOLO", "Computer Vision", "Model Analysis"],
    highlights: {
      en: [
        "Built the complete interactive analysis and visualization workflow.",
        "Turns model architecture and inference data into comparable technical evidence.",
        "Deployed the application as a browser-accessible demonstration.",
      ],
      es: [
        "Construí el flujo completo de análisis y visualización interactiva.",
        "Convierte datos de arquitectura e inferencia en evidencia técnica comparable.",
        "Desplegué la aplicación como una demostración accesible desde el navegador.",
      ],
    },
  },
  {
    title: "El Horno del Pingüino",
    category: "production",
    image: "/pixel/project-horno-pixel.png",
    demoUrl: "https://el-horno-del-pinguino-landing-page.pages.dev/",
    description: {
      en: "End-to-end frontend implementation for a local bakery, designed to present its catalog, business-order offering and direct WhatsApp conversion path.",
      es: "Implementación frontend de extremo a extremo para una pastelería local, diseñada para presentar su catálogo, oferta para negocios y ruta de conversión directa por WhatsApp.",
    },
    context: {
      en: "Private business repository · End-to-end frontend implementation",
      es: "Repositorio privado del negocio · Implementación frontend de extremo a extremo",
    },
    status: {
      en: "Live demo · Free-tier hosting may require startup time",
      es: "Demo en vivo · El hosting gratuito puede requerir tiempo de inicio",
    },
    tags: ["Frontend", "Responsive Design", "Business Landing Page", "WhatsApp", "Render"],
    highlights: {
      en: [
        "Implemented the complete responsive customer-facing experience.",
        "Structured product discovery and business-order paths around clear calls to action.",
        "Delivered and deployed the frontend while keeping the business source private.",
      ],
      es: [
        "Implementé la experiencia completa y adaptable orientada al cliente.",
        "Estructuré el descubrimiento de productos y pedidos empresariales con llamados a la acción claros.",
        "Entregué y desplegué el frontend manteniendo privado el código del negocio.",
      ],
    },
  },
  {
    title: "academic-report-automation",
    category: "academic",
    image: "/pixel/project-reports-pixel.png",
    sourceUrl: "https://github.com/AlejandroTatum/academic-report-automation",
    description: {
      en: "Python toolkit that automates repetitive report production while preserving human review and responsibility.",
      es: "Kit en Python que automatiza tareas repetitivas de producción de informes y mantiene la revisión y responsabilidad humana.",
    },
    context: { en: "Public automation project", es: "Proyecto público de automatización" },
    status: { en: "Source and setup documented", es: "Código y configuración documentados" },
    tags: ["Python", "Document Automation", "Validation", "WeasyPrint", "Playwright"],
    highlights: {
      en: [
        "Generates structured HTML and PDF outputs from Markdown content.",
        "Validates report quality and IEEE-style references.",
        "Builds reproducible diagrams, charts and visual assets.",
      ],
      es: [
        "Genera salidas HTML y PDF estructuradas desde contenido Markdown.",
        "Valida la calidad de los informes y referencias con estilo IEEE.",
        "Construye diagramas, gráficos y recursos visuales reproducibles.",
      ],
    },
  },
  {
    title: "AlejandroTatum.github.io",
    category: "academic",
    image: "/pixel/project-portfolio-pixel.png",
    sourceUrl: "https://github.com/AlejandroTatum/AlejandroTatum.github.io",
    description: {
      en: "Bilingual, responsive portfolio built to present software capabilities and project evidence clearly to clients and hiring teams.",
      es: "Portafolio bilingüe y adaptable creado para presentar capacidades de software y evidencia de proyectos a clientes y equipos de contratación.",
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
      en: "Academic teacher-test implementation of a SIGED-style education management system, built with a Django backend and a React frontend.",
      es: "Implementación académica tipo prueba docente de un sistema de gestión educativa estilo SIGED, construida con backend en Django y frontend en React.",
    },
    context: { en: "Public academic project", es: "Proyecto académico público" },
    status: { en: "Source and setup documented", es: "Código y configuración documentados" },
    tags: ["Django", "React", "Python", "Education Management"],
    highlights: {
      en: [
        "Implements an education management domain following a SIGED-style reference system.",
        "Separates a Django backend from a React client interface.",
        "Developed as a teacher-test exercise under academic requirements.",
      ],
      es: [
        "Implementa un dominio de gestión educativa siguiendo un sistema de referencia estilo SIGED.",
        "Separa un backend en Django de una interfaz cliente en React.",
        "Desarrollado como ejercicio de prueba docente bajo requisitos académicos.",
      ],
    },
  },
  {
    title: "hmm-speech-recognition-research",
    category: "academic",
    sourceUrl: "https://github.com/AlejandroTatum/hmm-speech-recognition-research",
    description: {
      en: "Academic research on HMM-based speech recognition and its evolution toward hybrid and deep learning models, written and typeset in LaTeX.",
      es: "Investigación académica sobre reconocimiento de voz basado en HMM y su evolución hacia modelos híbridos y de aprendizaje profundo, redactada y compuesta en LaTeX.",
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
