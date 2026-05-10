import { siteConfig } from "@/lib/constants";

const commands = [
  "status: open_to_remote_internship",
  "focus: backend_and_full_stack",
  "location: ecuador_remote",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_28%)]" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="mb-4 font-mono text-sm text-green-400">$ whoami</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-green-300 sm:text-2xl">
            {siteConfig.role}
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Computer Science student at Universidad Nacional de Loja. Open to remote
            programming internships and junior remote opportunities.
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
        </div>

        <div className="terminal-card">
          <div className="mb-5 flex items-center gap-2 border-b border-slate-800 pb-4">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 font-mono text-xs text-slate-500">portfolio.sh</span>
          </div>
          <div className="space-y-4 font-mono text-sm">
            {commands.map((command) => (
              <p key={command}>
                <span className="text-green-400">alejandro@portfolio</span>
                <span className="text-slate-500">:</span>
                <span className="text-cyan-300">~</span>
                <span className="text-slate-500">$ </span>
                <span className="text-slate-200">{command}</span>
              </p>
            ))}
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-slate-200">
              <p className="text-green-300">Ready to learn, contribute and improve.</p>
              <p className="mt-2 text-slate-400">Java · SQL · Docker · TypeScript · Next.js</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
