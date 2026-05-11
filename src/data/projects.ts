import type { Locale } from "@/lib/i18n";

export type Project = {
  title: string;
  href: string;
  description: Record<Locale, string>;
  tags: string[];
  highlights: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    title: "AgendaInventarioInteligentes",
    href: "https://github.com/AlejandroTatum/AgendaInventarioInteligentes",
    description: {
      en: "Academic Java project for managing appointments, patients and hospital inventory using CSV datasets, data structures, search algorithms and sorting algorithms.",
      es: "Proyecto académico en Java para gestionar citas, pacientes e inventario hospitalario usando datasets CSV, estructuras de datos, algoritmos de búsqueda y algoritmos de ordenamiento.",
    },
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
    title: "AlgoritmosDeBusqueda",
    href: "https://github.com/AlejandroTatum/AlgoritmosDeBusqueda",
    description: {
      en: "Java project focused on practicing search algorithms with arrays, linked lists and CSV-based datasets.",
      es: "Proyecto en Java enfocado en practicar algoritmos de búsqueda con arreglos, listas enlazadas y datasets basados en CSV.",
    },
    tags: ["Java", "CSV", "Arrays", "Linked Lists", "Sequential Search", "Binary Search"],
    highlights: {
      en: [
        "Implements first, last, sentinel, findAll and binary search.",
        "Validates edge cases such as empty arrays, null keys and missing values.",
        "Runs with Maven Wrapper and documents execution steps.",
      ],
      es: [
        "Implementa búsqueda first, last, centinela, findAll y búsqueda binaria.",
        "Valida casos borde como arreglos vacíos, claves nulas y valores inexistentes.",
        "Ejecuta con Maven Wrapper y documenta los pasos de uso.",
      ],
    },
  },
];
