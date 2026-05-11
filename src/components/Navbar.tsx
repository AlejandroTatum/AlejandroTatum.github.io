import { navItems, siteConfig } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-emerald-400/15 bg-slate-950/75 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-6">
        <a href="#top" className="group font-mono text-sm font-semibold text-slate-100">
          <span className="text-emerald-400">{`<`}</span>
          {siteConfig.name.split(" ")[0]}
          <span className="text-emerald-400">{` />`}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </a>
          ))}
        </div>

        <a className="hidden rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-emerald-950 transition hover:bg-emerald-300 sm:inline-flex" href={siteConfig.emailHref} target="_blank" rel="noreferrer">
          Hire / Contact
        </a>
      </nav>
    </header>
  );
}
