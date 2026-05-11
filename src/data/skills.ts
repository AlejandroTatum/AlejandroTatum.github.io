import type { Locale } from "@/lib/i18n";

export type SkillGroup = {
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: { en: "Languages", es: "Lenguajes" },
    subtitle: { en: "Core syntax and problem solving", es: "Sintaxis base y resolución de problemas" },
    items: ["Java", "TypeScript", "SQL"],
  },
  {
    title: { en: "Backend & Data", es: "Backend y datos" },
    subtitle: { en: "APIs, persistence and data handling", es: "APIs, persistencia y manejo de datos" },
    items: ["PostgreSQL", "Maven", "CSV data handling", "Prisma learning"],
  },
  {
    title: { en: "Frontend", es: "Frontend" },
    subtitle: { en: "Interfaces and full-stack apps", es: "Interfaces y apps full-stack" },
    items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: { en: "Tools", es: "Herramientas" },
    subtitle: { en: "Daily development workflow", es: "Flujo diario de desarrollo" },
    items: ["Git", "GitHub", "Docker", "Linux"],
  },
  {
    title: { en: "Foundations", es: "Fundamentos" },
    subtitle: { en: "Computer science fundamentals", es: "Fundamentos de computación" },
    items: ["Data Structures", "Algorithms", "Search", "Sorting", "OOP"],
  },
];
