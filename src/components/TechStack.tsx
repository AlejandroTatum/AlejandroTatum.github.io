import { skillGroups } from "@/data/skills";

export function TechStack() {
  return (
    <section id="stack" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">$ tech-stack</p>
        <h2>Technologies and foundations I&apos;m working with.</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <article key={group.title} className="card group">
            <h3 className="font-mono text-lg font-semibold text-green-300">{group.title}</h3>
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
