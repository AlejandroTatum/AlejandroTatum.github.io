import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">$ featured-projects</p>
        <h2>Small but documented projects with clear fundamentals.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="card flex flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
              </div>
              <span className="rounded-full border border-green-400/30 px-3 py-1 font-mono text-xs text-green-300">
                repo
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-sm text-slate-400">
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <span className="text-green-400">▸</span> {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-small">
                  {tag}
                </span>
              ))}
            </div>

            <a className="mt-8 inline-flex text-sm font-semibold text-green-300 hover:text-green-200" href={project.href} target="_blank" rel="noreferrer">
              View repository →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
