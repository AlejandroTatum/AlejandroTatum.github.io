import { copy, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="site-footer">
      <p>{copy[locale].footer}</p>
    </footer>
  );
}
