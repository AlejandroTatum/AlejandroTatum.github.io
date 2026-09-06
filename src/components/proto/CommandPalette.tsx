"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, PIXEL_EASE, prefersReducedMotion } from "@/lib/gsap";
import { setScrollLocked } from "@/components/providers/SmoothScrollProvider";
import { COMMANDS, fuzzyMatch, type ProtoCommand } from "@/components/proto/commands";
import { useProtoContext } from "@/components/proto/ProtoContext";
import { TerminalWindow } from "@/components/proto/TerminalWindow";

const paletteCopy = {
  en: {
    title: "command palette",
    placeholder: "type a command or section…",
    footer: "↑↓ navigate · ⏎ run · esc close",
    groups: { section: "sections", shell: "shell", toggle: "toggles", link: "links" },
    empty: "no matching command",
  },
  es: {
    title: "paleta de comandos",
    placeholder: "escribe un comando o sección…",
    footer: "↑↓ navegar · ⏎ ejecutar · esc cerrar",
    groups: { section: "secciones", shell: "shell", toggle: "ajustes", link: "enlaces" },
    empty: "sin comandos coincidentes",
  },
} as const;

const GROUP_ORDER: Array<ProtoCommand["kind"]> = ["section", "shell", "toggle", "link"];

/**
 * Cmd+K / Ctrl+K / ":" command palette — the same registry the guest shell
 * and the keyboard shortcuts use. Sections and toggles run immediately;
 * shell commands scroll to the terminal and are injected there so the
 * guest shell stays the single place that actually executes typed text.
 */
export function CommandPalette() {
  const ctx = useProtoContext();
  const t = paletteCopy[ctx.locale];
  const { paletteOpen, closePalette } = ctx;

  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Reset the query/selection as part of rendering the open transition
  // (not in an effect) — the render-time "adjust state" pattern React
  // recommends instead of syncing derived state through a side effect.
  const [wasOpen, setWasOpen] = useState(paletteOpen);
  if (paletteOpen !== wasOpen) {
    setWasOpen(paletteOpen);
    if (paletteOpen) {
      setQuery("");
      setHighlight(0);
    }
  }

  const visible = useMemo(() => COMMANDS.filter((command) => command.kind !== "hidden"), []);

  const results = useMemo(() => {
    if (!query.trim()) return visible;
    return visible
      .map((command) => ({ command, score: fuzzyMatch(query, command) }))
      .filter((entry) => entry.score > -1)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.command);
  }, [query, visible]);

  const grouped = useMemo(() => {
    if (query.trim()) return null;
    const map = new Map<ProtoCommand["kind"], ProtoCommand[]>();
    for (const kind of GROUP_ORDER) map.set(kind, []);
    for (const command of results) map.get(command.kind)?.push(command);
    return map;
  }, [query, results]);

  const activeIndex = Math.min(highlight, Math.max(results.length - 1, 0));

  // Open/close side effects on external systems: focus, Lenis scroll lock,
  // restoring focus, and the entrance tween. No React state changes here.
  useEffect(() => {
    if (!paletteOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setScrollLocked(true);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);

    if (!prefersReducedMotion() && containerRef.current) {
      // Opacity only: `autoAlpha` would set visibility:hidden during the
      // first frame, and a hidden input refuses focus.
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96, y: -10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.16,
          ease: PIXEL_EASE,
          onComplete: () => inputRef.current?.focus(),
        },
      );
    }

    return () => {
      window.clearTimeout(focusTimer);
      setScrollLocked(false);
      restoreFocusRef.current?.focus?.();
    };
  }, [paletteOpen]);

  if (!paletteOpen) return null;

  const runCommand = (command: ProtoCommand) => {
    if (command.kind === "shell") {
      ctx.runShellCommand?.(command.label[ctx.locale]);
    } else {
      command.run(ctx);
    }
    closePalette();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => Math.max(current - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const command = results[activeIndex];
      if (command) {
        runCommand(command);
      } else if (query.trim()) {
        // Nothing matched visibly — allow an exact hidden-command literal
        // (e.g. "matrix") to still run, same as typing it in the shell.
        ctx.runShellCommand?.(query.trim());
        closePalette();
      }
    }
  };

  const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closePalette();
  };

  const renderRow = (command: ProtoCommand) => {
    const index = results.indexOf(command);
    return (
      <li key={command.id}>
        <button
          type="button"
          className={index === activeIndex ? "proto-cmdk-row is-active" : "proto-cmdk-row"}
          onMouseEnter={() => setHighlight(index)}
          onClick={() => runCommand(command)}
        >
          <span className="proto-cmdk-label">{command.label[ctx.locale]}</span>
          <span className="proto-cmdk-hint">{command.hint[ctx.locale]}</span>
          {command.shortcut ? <span className="proto-cmdk-shortcut">{command.shortcut}</span> : null}
        </button>
      </li>
    );
  };

  return (
    <div className="proto-cmdk-backdrop" onMouseDown={onBackdropClick}>
      <div ref={containerRef} role="dialog" aria-modal="true" aria-label={t.title} onKeyDown={onKeyDown}>
        <TerminalWindow className="proto-cmdk" title={t.title}>
          <div className="proto-cmdk-input-row">
            <span className="cmd-prompt" aria-hidden="true">
              ❯
            </span>
            <input
              ref={inputRef}
              className="proto-cmdk-input"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setHighlight(0);
              }}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="proto-cmdk-list">
            {results.length === 0 ? <p className="proto-cmdk-empty">{t.empty}</p> : null}

            {grouped
              ? GROUP_ORDER.filter((kind) => (grouped.get(kind)?.length ?? 0) > 0).map((kind) => (
                  <div key={kind} className="proto-cmdk-group">
                    <span className="proto-cmdk-group-label">{t.groups[kind as keyof typeof t.groups]}</span>
                    <ul>{(grouped.get(kind) ?? []).map(renderRow)}</ul>
                  </div>
                ))
              : results.length > 0 && <ul>{results.map(renderRow)}</ul>}
          </div>

          <div className="proto-cmdk-footer">{t.footer}</div>
        </TerminalWindow>
      </div>
    </div>
  );
}
