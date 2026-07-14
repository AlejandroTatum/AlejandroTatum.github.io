"use client";

import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa6";
import {
  LuBadgeCheck,
  LuBookOpen,
  LuBot,
  LuDatabase,
  LuFileOutput,
  LuFileText,
  LuMonitorSmartphone,
  LuTableProperties,
  LuTestTubeDiagonal,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiApachemaven,
  SiCss,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGithubpages,
  SiHtml5,
  SiLinux,
  SiNextdotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import { skillGroups } from "@/data/skills";
import { copy, type Locale } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

type TechStackProps = {
  locale: Locale;
};

const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  "AI Agents": LuBot,
  "Report Automation": LuFileText,
  "Document Generation": LuFileOutput,
  "Validation Workflows": LuWorkflow,
  Java: FaJava,
  PostgreSQL: SiPostgresql,
  SQL: LuDatabase,
  Prisma: SiPrisma,
  Maven: SiApachemaven,
  "CSV Data Processing": LuTableProperties,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Linux: SiLinux,
  "GitHub Actions": SiGithubactions,
  "GitHub Pages": SiGithubpages,
  Testing: LuTestTubeDiagonal,
  Documentation: LuBookOpen,
  "Responsive UI": LuMonitorSmartphone,
};

export function TechStack({ locale }: TechStackProps) {
  const t = copy[locale].stack;
  const sectionRef = useReveal([locale]);

  return (
    <section ref={sectionRef} id="stack" className="section-shell">
      <div className="section-heading" data-reveal-stagger>
        <p className="section-kicker" data-reveal-item>{t.kicker}</p>
        <h2 data-reveal-item>{t.title}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal-stagger>
        {skillGroups.map((group) => (
          <article key={group.title.en} className="skill-card" data-reveal-item>
            <h3 className="font-mono text-lg font-bold text-ink">{group.title[locale]}</h3>
            <p className="mt-2 text-sm text-ink-soft">{group.subtitle[locale]}</p>
            <div className="mt-5 flex flex-wrap gap-2" data-reveal-stagger>
              {group.items.map((item, index) => {
                const Icon = skillIcons[item] ?? LuBadgeCheck;

                return (
                  <span key={item} className="tag" data-chip={index % 5} data-reveal-item>
                    <Icon aria-hidden="true" />
                    {item}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
