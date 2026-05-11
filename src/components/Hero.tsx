import { siteConfig } from "@/lib/constants";
import { copy, type Locale } from "@/lib/i18n";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const t = copy[locale].hero;

  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-5 pb-16 pt-32 sm:pt-40">
      <div className="hero-glow" />
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 font-mono text-xs text-emerald-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {t.badge}
          </div>

          <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
            {t.titleFirst} <span className="text-gradient">{t.titleLast}</span>
          </h1>
          <p className="mt-4 text-2xl font-semibold text-slate-200 sm:text-3xl">{t.role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#projects">
              {t.viewProjects}
            </a>
            <a className="btn-secondary" href={siteConfig.emailHref} target="_blank" rel="noreferrer">
              {t.contactMe}
            </a>
            <a className="btn-ghost" href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn-ghost" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {t.metrics.map((metric) => (
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
              <p className="font-mono text-sm text-emerald-300">{t.cardLabel}</p>
              <h2 className="mt-2 text-2xl font-bold text-white">{t.cardTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{t.cardText}</p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 font-mono text-xs text-slate-300">
              <p><span className="text-emerald-400">const</span> focus = [<span className="text-cyan-300">&quot;backend&quot;</span>, <span className="text-cyan-300">&quot;full-stack&quot;</span>]</p>
              <p className="mt-2"><span className="text-emerald-400">status</span>: {t.status}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
