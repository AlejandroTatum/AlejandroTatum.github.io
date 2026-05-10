import { siteConfig } from "@/lib/constants";

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <div className="card overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="section-kicker">$ contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s connect.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              I&apos;m open to remote internships, junior programming opportunities and
              projects where I can keep improving as a backend/full-stack developer.
            </p>
          </div>

          <div className="space-y-3 font-mono text-sm">
            <a className="contact-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a className="contact-link" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="contact-link" href={siteConfig.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <p className="contact-link cursor-default">{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
