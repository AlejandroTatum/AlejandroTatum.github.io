export type Project = {
  title: string;
  href: string;
  description: string;
  tags: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    title: "AgendaInventarioInteligentes",
    href: "https://github.com/AlejandroTatum/AgendaInventarioInteligentes",
    description:
      "Academic Java project for managing appointments, patients and hospital inventory using CSV datasets, data structures, search algorithms and sorting algorithms.",
    tags: [
      "Java 21",
      "Maven",
      "Apache Commons CSV",
      "JUnit 5",
      "Data Structures",
      "Search Algorithms",
      "Sorting Algorithms",
    ],
    highlights: [
      "Loads and processes hospital-style CSV datasets.",
      "Compares sorting and search strategies over practical scenarios.",
      "Includes a documented CLI demo and Maven Wrapper setup.",
    ],
  },
  {
    title: "AlgoritmosDeBusqueda",
    href: "https://github.com/AlejandroTatum/AlgoritmosDeBusqueda",
    description:
      "Java project focused on practicing search algorithms with arrays, linked lists and CSV-based datasets.",
    tags: [
      "Java",
      "CSV",
      "Arrays",
      "Linked Lists",
      "Sequential Search",
      "Binary Search",
    ],
    highlights: [
      "Implements first, last, sentinel, findAll and binary search.",
      "Validates edge cases such as empty arrays, null keys and missing values.",
      "Runs with Maven Wrapper and documents execution steps.",
    ],
  },
];
