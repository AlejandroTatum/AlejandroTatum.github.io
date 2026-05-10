const timeline = [
  {
    title: "Computer Science Student",
    detail: "Universidad Nacional de Loja · Ecuador",
  },
  {
    title: "Current focus",
    detail: "Backend, databases, Docker, TypeScript, React and Next.js",
  },
  {
    title: "Opportunity goal",
    detail: "Remote programming internship or junior remote role",
  },
];

export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">$ about-me</p>
        <h2>Honest junior profile, clear direction.</h2>
        <p>
          I&apos;m not presenting myself as a senior. I&apos;m showing what I&apos;m learning, what I&apos;ve
          built, and where I want to grow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="card-large">
          <p className="text-lg leading-8 text-slate-300">
            I&apos;m Alejandro Padilla, a Computer Science student at Universidad Nacional de
            Loja, Ecuador.
          </p>
          <p className="mt-5 leading-8 text-slate-300">
            I&apos;m focused on backend and full-stack development, building solid foundations
            in Java, data structures, SQL/PostgreSQL, Git, Docker, TypeScript, React and
            Next.js.
          </p>
          <p className="mt-5 leading-8 text-slate-300">
            Spanish is my native language. I currently have a B1 English level, and I can
            read technical documentation and communicate basic technical ideas in English.
          </p>
        </div>

        <div className="timeline-card">
          {timeline.map((item, index) => (
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
