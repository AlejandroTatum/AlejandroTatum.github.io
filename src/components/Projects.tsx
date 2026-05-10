import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">$ featured-projects</p>
        <h2>Projects with documentation and runnable setup.</h2>
        <p>
          These are academic projects, but they are cleaned, documented and positioned as
          evidence of fundamentals: Java, data structures, algorithms and CSV data handling.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article key={project.title} className="project-card">
            <div className="project-preview">
              <div className="preview-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="space-y-3 p-5 font-mono text-xs">
                <p className="text-emerald-300">$ run {project.title}</p>
                <div className="h-2 w-10/12 rounded bg-slate-700" />
                <div className="h-2 w-8/12 rounded bg-emerald-400/70" />
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="h-16 rounded-lg bg-emerald-400/15" />
                  <div className="h-16 rounded-lg bg-cyan-400/15" />
                  <div className="h-16 rounded-lg bg-emerald-400/20" />
                </div>
                <p className="text-slate-500">status: documented · build: passing · type: academic</p>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="rounded-full border border-emerald-400/20 px-3 py-1 font-mono text-xs text-emerald-300">
                  0{index + 1} / repo
                </span>
                <span className="text-xs text-slate-500">Java · Maven</span>
              </div>

              <h3 className="text-2xl font-black text-white">{project.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{project.description}</p>

              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="text-emerald-400">▸</span> {highlight}
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

              <a className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300" href={project.href} target="_blank" rel="noreferrer">
                View repository →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
