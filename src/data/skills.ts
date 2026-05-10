export type SkillGroup = {
  title: string;
  subtitle: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    subtitle: "Core syntax and problem solving",
    items: ["Java", "TypeScript", "SQL"],
  },
  {
    title: "Backend & Data",
    subtitle: "APIs, persistence and data handling",
    items: ["PostgreSQL", "Maven", "CSV data handling", "Prisma learning"],
  },
  {
    title: "Frontend",
    subtitle: "Interfaces and full-stack apps",
    items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Tools",
    subtitle: "Daily development workflow",
    items: ["Git", "GitHub", "Docker", "Linux"],
  },
  {
    title: "Foundations",
    subtitle: "Computer science fundamentals",
    items: ["Data Structures", "Algorithms", "Search", "Sorting", "OOP"],
  },
];
