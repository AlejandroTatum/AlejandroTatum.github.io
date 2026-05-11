import { copy, type Locale } from "@/lib/i18n";

type AboutProps = {
  locale: Locale;
};

export function About({ locale }: AboutProps) {
  const t = copy[locale].about;

  return (
    <section id="about" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">{t.kicker}</p>
        <h2>{t.title}</h2>
        <p>{t.intro}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card-large">
          {t.paragraphs.map((paragraph, index) => (
            <p key={paragraph} className={`${index === 0 ? "text-lg" : "mt-5"} leading-8 text-slate-300`}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="timeline-card">
          {t.timeline.map((item, index) => (
            <div key={item.title} className="timeline-item">
              <span className="timeline-dot">{index + 1}</span>
              <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
