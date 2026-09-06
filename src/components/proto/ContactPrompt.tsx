"use client";

import { FormEvent, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Line = { kind: "in" | "out" | "ok" | "err"; text: string };

const promptCopy = {
  en: {
    placeholder: "type 'help' for commands",
    initial: "interactive prompt ready. type 'help' to list commands.",
    help: [
      ["whoami", "who is behind this portfolio"],
      ["stack", "capability branches"],
      ["projects", "what has been shipped"],
      ["contact", "how to reach alejandro"],
      ["sudo hire-me", "the fast path"],
      ["clear", "wipe the output"],
    ],
    whoami: "alejandro padilla — full-stack developer · python & typescript · applied ai",
    stack: "gentle-ai at the core + 5 branches: automation-ai / backend-data / frontend / tools / delivery  (run `open ~/stack` above)",
    projects: "top 3 in ~/featured (1 draft) — 6 more hidden in .archive; the curious run `ls -a ~/projects`",
    contact: "mail → alejandro.padilla@unl.edu.ec · github → github.com/AlejandroTatum · linkedin → /in/alejandro-emanuel-padilla-espinoza",
    sudo: "[sudo] permission granted — offer under construction… use 'contact' for the real channel",
    notFound: (cmd: string) => `command not found: ${cmd} — try 'help'`,
  },
  es: {
    placeholder: "escribe 'help' para comandos",
    initial: "prompt interactivo listo. escribe 'help' para ver comandos.",
    help: [
      ["whoami", "quién está detrás de este portafolio"],
      ["stack", "ramas de capacidades"],
      ["projects", "qué se ha construido"],
      ["contact", "cómo contactar a alejandro"],
      ["sudo hire-me", "la vía rápida"],
      ["clear", "limpiar la salida"],
    ],
    whoami: "alejandro padilla — desarrollador full-stack · python y typescript · ia aplicada",
    stack: "gentle-ai en el núcleo + 5 ramas: automation-ai / backend-data / frontend / tools / delivery  (ejecuta `open ~/stack` arriba)",
    projects: "top 3 en ~/featured (1 borrador) — 6 más ocultos en .archive; los curiosos ejecutan `ls -a ~/proyectos`",
    contact: "mail → alejandro.padilla@unl.edu.ec · github → github.com/AlejandroTatum · linkedin → /in/alejandro-emanuel-padilla-espinoza",
    sudo: "[sudo] permiso concedido — oferta en construcción… usa 'contact' para el canal real",
    notFound: (cmd: string) => `comando no encontrado: ${cmd} — prueba 'help'`,
  },
} as const;

/**
 * A tiny working shell. Real commands, honest outputs, one easter egg.
 * This is the signature interactive moment of the dev-mode prototype.
 */
export function ContactPrompt({ locale }: { locale: Locale }) {
  const t = promptCopy[locale];
  const [lines, setLines] = useState<Array<Line>>([{ kind: "out", text: t.initial }]);
  const [value, setValue] = useState("");

  const run = (raw: string) => {
    const cmd = raw.trim();
    const lower = cmd.toLowerCase();
    const outputs: Array<Line> = [{ kind: "in", text: cmd }];

    if (!cmd) {
      setLines((prev) => [...prev.slice(-40), ...outputs]);
      return;
    }

    if (lower === "clear") {
      setLines([]);
      setValue("");
      return;
    }

    if (lower === "help") {
      outputs.push(...t.help.map(([name, desc]) => ({ kind: "out" as const, text: `  ${name.padEnd(14)} ${desc}` })));
    } else if (lower === "whoami") {
      outputs.push({ kind: "ok", text: t.whoami });
    } else if (lower === "stack" || lower === "skills") {
      outputs.push({ kind: "out", text: t.stack });
    } else if (lower === "projects" || lower === "ls") {
      outputs.push({ kind: "out", text: t.projects });
    } else if (lower === "contact" || lower === "mail") {
      outputs.push({ kind: "ok", text: t.contact });
    } else if (lower === "sudo hire-me" || lower === "sudo hire me" || lower === "sudo hire") {
      outputs.push({ kind: "ok", text: t.sudo });
    } else if (lower === "pwd") {
      outputs.push({ kind: "out", text: "/home/visitor/portfolio" });
    } else {
      outputs.push({ kind: "err", text: t.notFound(cmd) });
    }

    setLines((prev) => [...prev.slice(-40), ...outputs]);
    setValue("");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(value);
  };

  return (
    <div>
      <div className="proto-term-out" aria-live="polite" aria-label="terminal output">
        {lines.map((line, index) => (
          <div key={`${index}-${line.text}`} className={`term-line is-${line.kind}`}>
            {line.kind === "in" ? <span className="cmd-prompt">❯</span> : null}
            {line.text}
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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              run(value);
            }
          }}
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
