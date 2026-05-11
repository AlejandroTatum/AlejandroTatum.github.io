import { siteConfig } from "@/lib/constants";
import { copy, type Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
  onToggleLocale: () => void;
};

export function Navbar({ locale, onToggleLocale }: NavbarProps) {
  const t = copy[locale].nav;
  const navItems = [
    { label: t.about, href: "#about" },
    { label: t.stack, href: "#stack" },
    { label: t.projects, href: "#projects" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-emerald-400/15 bg-slate-950/90 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-6">
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

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t.switchLabel}
            onClick={onToggleLocale}
            className="language-toggle"
          >
            <span className={locale === "en" ? "active" : ""}>EN</span>
            <span className={locale === "es" ? "active" : ""}>ES</span>
          </button>
          <a
            className="hidden rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-emerald-950 transition hover:bg-emerald-300 sm:inline-flex"
            href={siteConfig.emailHref}
            target="_blank"
            rel="noreferrer"
          >
            {t.hire}
          </a>
        </div>
      </nav>
    </header>
  );
}
