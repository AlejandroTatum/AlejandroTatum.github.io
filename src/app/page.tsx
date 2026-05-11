"use client";

import { useEffect, useState } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";
import type { Locale } from "@/lib/i18n";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => setLocale((current) => (current === "en" ? "es" : "en"));

  return (
    <main>
      <Navbar locale={locale} onToggleLocale={toggleLocale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <TechStack locale={locale} />
      <Projects locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </main>
  );
}
