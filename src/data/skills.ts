export type SkillGroup = {
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Java", "TypeScript", "SQL"],
  },
  {
    title: "Backend & Databases",
    items: ["PostgreSQL", "Maven", "CSV data handling", "Prisma learning"],
  },
  {
    title: "Frontend",
    items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Linux"],
  },
  {
    title: "Foundations",
    items: [
      "Data Structures",
      "Algorithms",
      "Search Algorithms",
      "Sorting Algorithms",
      "OOP",
    ],
  },
];
