import { navItems, siteConfig } from "@/lib/constants";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="group font-mono text-sm font-semibold text-slate-100">
          <span className="text-green-400">~/</span>
          {siteConfig.name.toLowerCase().replace(" ", "-")}
          <span className="text-green-400 transition group-hover:ml-1">_</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition hover:text-green-400"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
