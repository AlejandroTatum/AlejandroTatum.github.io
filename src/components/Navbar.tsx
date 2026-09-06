"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { copy, type Locale } from "@/lib/i18n";

type NavbarProps = {
  locale: Locale;
  onToggleLocale: () => void;
};

export function Navbar({ locale, onToggleLocale }: NavbarProps) {
  const t = copy[locale].nav;
  const [scrolled, setScrolled] = useState(false);
  const navItems = [
    { label: t.about, href: "#about" },
    { label: t.stack, href: "#stack" },
    { label: t.projects, href: "#projects" },
    { label: t.contact, href: "#contact" },
  ];

  // Shift the navbar surface once the page scrolls past the hero top.
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      start: 120,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    return () => trigger.kill();
  });

  return (
    <header className="sticky top-0 z-50 px-4 py-3">
      <nav
        className={`site-nav mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 ${scrolled ? "nav-scrolled" : ""}`}
      >
        <a href="#top" className="group font-mono text-sm font-bold text-ink">
          <span className="text-ink-soft">{`<`}</span>
          {siteConfig.name.split(" ")[0]}
          <span className="text-ink-soft">{` />`}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="language-toggle"
            title={t.devMode}
            aria-label={t.devMode}
          >
            <span className="active">{`>_`}</span>
          </Link>
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
            className="btn-nav hidden sm:inline-flex"
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
