"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { copy, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/gsap";
import {
  COMMANDS,
  completeCommand,
  findShellCommand,
  isShellHelpCommand,
  shellCopy,
  suggestShellCommand,
} from "@/components/proto/commands";
import { useProtoContext } from "@/components/proto/ProtoContext";

type Line = { kind: "in" | "out" | "ok" | "err"; text: string; node?: ReactNode };

const MAX_LINES = 40;
const MAX_HISTORY = 50;

/** Commands whose registry output has always rendered in the "ok" (green)
    tone — everything else from the registry renders as plain "out" text. */
const OK_TONE_IDS = new Set(["shell-whoami", "shell-contact", "shell-sudo-hire-me"]);

const promptCopy = {
  en: {
    placeholder: "type 'help' for commands",
    initial: "interactive prompt ready. type 'help' to list commands.",
  },
  es: {
    placeholder: "escribe 'help' para comandos",
    initial: "prompt interactivo listo. escribe 'help' para ver comandos.",
  },
} as const;

// neofetch reuses the same values as sections.tsx's uiCopy — duplicated
// here (not imported) because sections.tsx imports this component, and
// importing uiCopy back would create a circular module dependency.
const NEOFETCH_INFO = {
  en: { stack: "FastAPI · Next.js · PostgreSQL · Docker", ai: "LLM · agents · YOLO", base: "Ecuador · remote · US hours" },
  es: { stack: "FastAPI · Next.js · PostgreSQL · Docker", ai: "LLM · agentes · YOLO", base: "Ecuador · remoto · horario EE. UU." },
} as const;

const MATRIX_GLYPHS = "アイウエオカキクケコサシスセソ0123456789ABCDEF";
const MATRIX_ROWS = 12;
const MATRIX_FRAME_MS = 100;

function randomMatrixLine(): string {
  let line = "";
  const length = 18 + Math.floor(Math.random() * 10);
  for (let i = 0; i < length; i += 1) {
    line += MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
  }
  return line;
}

/** `matrix` easter egg: 12 lines of katakana/hex rain for ~1.2s, then it
    settles. Renders one static line under reduced motion. */
function MatrixRain() {
  const [rows, setRows] = useState<string[]>(() => Array.from({ length: MATRIX_ROWS }, randomMatrixLine));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ticks = 0;
    const id = window.setInterval(() => {
      ticks += 1;
      setRows(Array.from({ length: MATRIX_ROWS }, randomMatrixLine));
      if (ticks >= MATRIX_ROWS) window.clearInterval(id);
    }, MATRIX_FRAME_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="proto-matrix" aria-hidden="true">
      {rows.map((row, index) => (
        <div key={index}>{row}</div>
      ))}
    </div>
  );
}

/** `neofetch`: pixel portrait + the same profile facts shown in the hero. */
function Neofetch({ locale }: { locale: Locale }) {
  const hero = copy[locale].hero;
  const info = NEOFETCH_INFO[locale];
  const rows: Array<[string, string]> = [
    ["name", siteConfig.name],
    ["role", hero.role],
    ["stack", info.stack],
    ["ai", info.ai],
    ["base", info.base],
    ["status", hero.status],
    ["lang", locale.toUpperCase()],
  ];

  return (
    <div className="proto-neofetch">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pixel/alejandro-pixel-portrait-480.png"
        width={96}
        height={72}
        alt=""
        aria-hidden="true"
        className="proto-neofetch-portrait"
      />
      <dl className="proto-neofetch-facts">
        {rows.map(([key, value]) => (
          <div key={key} className="proto-neofetch-row">
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * The guest shell: history, tab completion, fuzzy "did you mean" tolerance,
 * and every command in the shared registry — including the two rich ones
 * (neofetch, matrix) that need more than a plain string of output.
 */
export function ContactPrompt({ locale }: { locale: Locale }) {
  const ctx = useProtoContext();
  const t = promptCopy[locale];
  const [lines, setLines] = useState<Array<Line>>([{ kind: "out", text: t.initial }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const historyIndexRef = useRef<number | null>(null);
  const draftRef = useRef("");

  const run = (raw: string) => {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    const outputs: Array<Line> = [{ kind: "in", text: cmd }];

    if (!cmd) {
      setLines((prev) => [...prev.slice(-MAX_LINES), ...outputs]);
      return;
    }

    if (lower === "clear") {
      setLines([]);
      setValue("");
      setHistory((prev) => [...prev.slice(-(MAX_HISTORY - 1)), cmd]);
      historyIndexRef.current = null;
      return;
    }

    if (lower === "help --all") {
      const rows = COMMANDS.filter((command) => isShellHelpCommand(command) || command.kind === "hidden");
      outputs.push(
        ...rows.map((command) => ({
          kind: "out" as const,
          text: `  ${command.label[locale].padEnd(20)} ${command.hint[locale]}`,
        })),
      );
    } else if (lower === "neofetch") {
      outputs.push({ kind: "out", text: "", node: <Neofetch locale={locale} /> });
    } else if (lower === "matrix") {
      if (prefersReducedMotion()) {
        const result = findShellCommand("matrix")?.run(ctx);
        outputs.push({ kind: "out", text: typeof result === "string" ? result : "" });
      } else {
        outputs.push({ kind: "out", text: "", node: <MatrixRain /> });
      }
    } else {
      const command = findShellCommand(lower);
      if (command) {
        const result = command.run(ctx);
        if (typeof result === "string" && result.length > 0) {
          const kind: Line["kind"] = OK_TONE_IDS.has(command.id) ? "ok" : "out";
          outputs.push(...result.split("\n").map((text) => ({ kind, text })));
        }
      } else {
        const suggestion = suggestShellCommand(lower);
        const text = suggestion
          ? shellCopy[locale].didYouMean(cmd, suggestion.label[locale])
          : shellCopy[locale].notFound(cmd);
        outputs.push({ kind: "err", text });
      }
    }

    setLines((prev) => [...prev.slice(-MAX_LINES), ...outputs]);
    setValue("");
    setHistory((prev) => [...prev.slice(-(MAX_HISTORY - 1)), cmd]);
    historyIndexRef.current = null;
  };

  // The command palette and the cheat sheet both trigger commands through
  // this event, so the guest shell stays the single place that executes
  // typed input — nothing bypasses it. Re-subscribed every render so the
  // handler always closes over the latest context (crt/locale toggles).
  useEffect(() => {
    const onShellEvent = (event: Event) => {
      const detail = (event as CustomEvent<{ command: string }>).detail;
      if (detail?.command) run(detail.command);
    };
    window.addEventListener("proto:shell", onShellEvent);
    return () => window.removeEventListener("proto:shell", onShellEvent);
  });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(value);
  };

  const navigateHistory = (direction: 1 | -1) => {
    if (history.length === 0) return;
    const current = historyIndexRef.current;
    if (current === null) {
      if (direction === 1) return;
      draftRef.current = value;
      historyIndexRef.current = history.length - 1;
      setValue(history[history.length - 1]);
      return;
    }

    const next = current + direction;
    if (next < 0) return;
    if (next >= history.length) {
      historyIndexRef.current = null;
      setValue(draftRef.current);
      return;
    }
    historyIndexRef.current = next;
    setValue(history[next]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      run(value);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      navigateHistory(-1);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      navigateHistory(1);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const matches = completeCommand(value);
      if (matches.length === 1) {
        setValue(matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [...prev.slice(-MAX_LINES), { kind: "out", text: matches.join("   ") }]);
      }
    }
  };

  return (
    <div>
      <div className="proto-term-out" aria-live="polite" aria-label="terminal output">
        {lines.map((line, index) => (
          <div key={`${index}-${line.text}`} className={`term-line is-${line.kind}`}>
            {line.kind === "in" ? <span className="cmd-prompt">❯</span> : null}
            {line.node ?? line.text}
          </div>
        ))}
      </div>
      <form className="proto-term-input-row" onSubmit={onSubmit}>
        <span className="cmd-prompt proto-term-host" aria-hidden="true">
          visitor@alejandro:~$
        </span>
        <input
          className="proto-term-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t.placeholder}
          aria-label="terminal command input"
          autoComplete="off"
          spellCheck={false}
          maxLength={80}
        />
        <button type="submit" className="proto-run-btn">
          run ⏎
        </button>
      </form>
    </div>
  );
}
