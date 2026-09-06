"use client";

import { PROTO_SECTIONS } from "@/components/proto/Chrome";
import { TerminalWindow } from "@/components/proto/TerminalWindow";
import type { Locale } from "@/lib/i18n";

const overlayCopy = {
  en: {
    title: "keyboard shortcuts",
    nav: "navigation",
    shell: "guest shell",
    close: "press esc or click outside to close",
    jk: "next / previous section",
    gg: "scroll to top",
    G: "scroll to bottom",
    palette: "open the command palette",
    escHint: "close this / the palette",
    history: "command history",
    tab: "complete a command",
  },
  es: {
    title: "atajos de teclado",
    nav: "navegación",
    shell: "shell de invitado",
    close: "presiona esc o haz clic afuera para cerrar",
    jk: "sección siguiente / anterior",
    gg: "ir al inicio",
    G: "ir al final",
    palette: "abrir la paleta de comandos",
    escHint: "cerrar esto o la paleta",
    history: "historial de comandos",
    tab: "completar un comando",
  },
} as const;

type ShortcutsOverlayProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
};

/** "?" toggles this: a read-only cheat sheet for every keyboard shortcut. */
export function ShortcutsOverlay({ open, onClose, locale }: ShortcutsOverlayProps) {
  if (!open) return null;
  const t = overlayCopy[locale];

  return (
    <div className="proto-shortcuts-backdrop" onClick={onClose}>
      <div
        className="proto-shortcuts"
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        onClick={(event) => event.stopPropagation()}
      >
        <TerminalWindow title={t.title}>
          <div className="tui-body">
            <button
              type="button"
              className="bracket-btn is-ghost proto-cmdk-close proto-shortcuts-close"
              onClick={onClose}
              aria-label={t.title}
            >
              <span className="bracket">[</span> esc <span className="bracket">]</span>
            </button>
            <div className="proto-shortcuts-group">
              <span className="proto-shortcuts-label">{t.nav}</span>
              <div className="proto-shortcuts-rows">
                {PROTO_SECTIONS.map((section, index) => (
                  <div key={section.id} className="proto-shortcuts-row">
                    <span className="proto-shortcuts-key">{index}</span>
                    <span>{section.label[locale]}</span>
                  </div>
                ))}
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">j / k</span>
                  <span>{t.jk}</span>
                </div>
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">g g</span>
                  <span>{t.gg}</span>
                </div>
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">G</span>
                  <span>{t.G}</span>
                </div>
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">⌘K</span>
                  <span>{t.palette}</span>
                </div>
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">:</span>
                  <span>{t.palette}</span>
                </div>
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">esc</span>
                  <span>{t.escHint}</span>
                </div>
              </div>
            </div>

            <div className="proto-shortcuts-group">
              <span className="proto-shortcuts-label">{t.shell}</span>
              <div className="proto-shortcuts-rows">
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">↑ ↓</span>
                  <span>{t.history}</span>
                </div>
                <div className="proto-shortcuts-row">
                  <span className="proto-shortcuts-key">tab</span>
                  <span>{t.tab}</span>
                </div>
              </div>
            </div>

            <p className="proto-shortcuts-close">{t.close}</p>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
