import type { Locale } from "@/lib/i18n";

export type SkillGroup = {
  title: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: { en: "Automation & AI", es: "Automatización e IA" },
    subtitle: { en: "Workflows, agents and document systems", es: "Flujos, agentes y sistemas documentales" },
    items: ["Python", "AI Agents", "Report Automation", "Document Generation", "Validation Workflows"],
  },
  {
    title: { en: "Backend & Data", es: "Backend y datos" },
    subtitle: { en: "APIs, persistence and data handling", es: "APIs, persistencia y manejo de datos" },
    items: ["Java", "PostgreSQL", "SQL", "Prisma", "Maven", "CSV Data Processing"],
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
    title: { en: "Delivery", es: "Entrega" },
    subtitle: { en: "Documented, reproducible software", es: "Software documentado y reproducible" },
    items: ["GitHub Actions", "GitHub Pages", "Testing", "Documentation", "Responsive UI"],
  },
];
