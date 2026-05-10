import { siteConfig } from "@/lib/constants";

const metrics = [
  { label: "Public repos", value: "4" },
  { label: "English", value: "B1" },
  { label: "Mode", value: "Remote" },
];

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-32 sm:pt-40">
      <div className="hero-glow" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 font-mono text-xs text-emerald-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Open to remote internships
          </div>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
            Alejandro <span className="text-gradient">Padilla</span>
          </h1>
          <p className="mt-4 text-2xl font-semibold text-slate-200 sm:text-3xl">
            Backend & Full-Stack Developer in Progress
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Computer Science student at Universidad Nacional de Loja. I build solid
            fundamentals with Java, SQL, Docker, TypeScript and Next.js while preparing for
            real remote software teams.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#projects">
              View Projects
            </a>
            <a className="btn-secondary" href={`mailto:${siteConfig.email}`}>
              Contact Me
            </a>
            <a className="btn-ghost" href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn-ghost" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <p className="text-2xl font-black text-white">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-[2rem] bg-emerald-400/10 blur-3xl" />
          <div className="profile-card">
            <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-[2rem] border border-emerald-300/30 bg-slate-900 shadow-2xl shadow-emerald-950/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://github.com/AlejandroTatum.png" alt="Alejandro Padilla profile photo" className="h-full w-full object-cover" />
            </div>

            <div className="mt-6 text-center">
              <p className="font-mono text-sm text-emerald-300">alejandro@portfolio</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Remote-ready junior profile</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Practical academic projects, clean documentation and a learning path focused on
                backend/full-stack fundamentals.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs text-slate-300">
              <p><span className="text-emerald-400">const</span> focus = [<span className="text-cyan-300">&quot;backend&quot;</span>, <span className="text-cyan-300">&quot;full-stack&quot;</span>]</p>
              <p className="mt-2"><span className="text-emerald-400">status</span>: learning + building</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
