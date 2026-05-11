import { siteConfig } from "@/lib/constants";
import { copy, type Locale } from "@/lib/i18n";

type ContactProps = {
  locale: Locale;
};

export function Contact({ locale }: ContactProps) {
  const t = copy[locale].contact;

  return (
    <section id="contact" className="section-shell contact-section">
      <div className="contact-card">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="section-kicker">{t.kicker}</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-300">{t.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {t.info.map((item) => (
                <div key={item.label} className="info-tile" aria-label={`${item.label}: ${item.value}`}>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                  <p className="mt-2 font-semibold text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <a className="contact-action" href={siteConfig.emailHref} target="_blank" rel="noreferrer">
              <span>{t.actions.email}</span>
              <strong>{siteConfig.email}</strong>
            </a>
            <a className="contact-action" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              <span>{t.actions.linkedin}</span>
              <strong>{t.actions.viewProfile}</strong>
            </a>
            <a className="contact-action" href={siteConfig.github} target="_blank" rel="noreferrer">
              <span>{t.actions.github}</span>
              <strong>@AlejandroTatum</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
