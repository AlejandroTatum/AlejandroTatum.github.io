export function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-heading">
        <p className="section-kicker">$ about</p>
        <h2>Building strong fundamentals for real software work.</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card">
          <p className="text-slate-300">
            I&apos;m Alejandro Padilla, a Computer Science student at Universidad Nacional de
            Loja, Ecuador.
          </p>
          <p className="mt-4 text-slate-300">
            I&apos;m focused on backend and full-stack development, building solid foundations
            in Java, data structures, SQL/PostgreSQL, Git, Docker, TypeScript, React and
            Next.js.
          </p>
        </div>

        <div className="card">
          <ul className="space-y-4 text-slate-300">
            <li>
              <span className="text-green-400">▹</span> Spanish is my native language.
            </li>
            <li>
              <span className="text-green-400">▹</span> I currently have a B1 English
              level and can read technical documentation and communicate basic technical
              ideas in English.
            </li>
            <li>
              <span className="text-green-400">▹</span> I&apos;m looking for a remote
              programming internship or junior remote opportunity where I can learn from
              real projects, receive technical feedback and contribute with responsibility.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
