import { siteConfig } from "@/lib/constants";

const info = [
  { label: "Location", value: "Ecuador / Remote" },
  { label: "Native language", value: "Spanish" },
  { label: "English", value: "B1" },
];

export function Contact() {
  return (
    <section id="contact" className="section-shell pb-24">
      <div className="contact-card">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">$ contact</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-300">
              I&apos;m open to remote internships, junior programming opportunities and projects
              where I can keep improving as a backend/full-stack developer.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {info.map((item) => (
                <div key={item.label} className="info-tile" aria-label={`${item.label}: ${item.value}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                  <p className="mt-2 font-semibold text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <a className="contact-action" href={`mailto:${siteConfig.email}`}>
              <span>Email</span>
              <strong>{siteConfig.email}</strong>
            </a>
            <a className="contact-action" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <strong>View profile</strong>
            </a>
            <a className="contact-action" href={siteConfig.github} target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <strong>@AlejandroTatum</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
