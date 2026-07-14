"use client";

import { copy, type Locale } from "@/lib/i18n";
import { useReveal } from "@/lib/useReveal";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const footerRef = useReveal([locale]);

  return (
    <footer ref={footerRef} className="site-footer">
      <p data-reveal>{copy[locale].footer}</p>
    </footer>
  );
}
