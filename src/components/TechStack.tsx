import { skillGroups } from "@/data/skills";
import { copy, type Locale } from "@/lib/i18n";

type TechStackProps = {
  locale: Locale;
};

export function TechStack({ locale }: TechStackProps) {
  const t = copy[locale].stack;

  return (
    <section id="stack" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title.en} className="skill-card">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl">
              ⚙️
            </div>
            <h3 className="font-mono text-lg font-semibold text-emerald-300">{group.title[locale]}</h3>
            <p className="mt-2 text-sm text-slate-500">{group.subtitle[locale]}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
