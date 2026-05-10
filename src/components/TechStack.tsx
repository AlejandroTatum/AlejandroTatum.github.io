import { skillGroups } from "@/data/skills";

export function TechStack() {
  return (
    <section id="stack" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">$ tech-stack</p>
        <h2>Tools I can explain, not just list.</h2>
        <p>
          The goal is not to collect logos. The goal is to understand the fundamentals behind
          the stack and apply them in small, finished projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="skill-card">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-2xl">
              ⚙️
            </div>
            <h3 className="font-mono text-lg font-semibold text-emerald-300">{group.title}</h3>
            <p className="mt-2 text-sm text-slate-500">{group.subtitle}</p>
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
