import { copy, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/constants";
import { PROTO_SECTIONS, toggleFullscreen } from "@/components/proto/Chrome";
import type { ProtoContextValue } from "@/components/proto/ProtoContext";

/**
 * One command registry, shared by the command palette, the real keyboard
 * shortcuts and the guest shell. Every actionable thing on the page is a row
 * here — nothing gets typed, clicked or pressed through a separate path.
 */
export type ProtoCommand = {
  id: string;
  kind: "section" | "shell" | "toggle" | "link" | "hidden";
  /** The command-line text shown for it — for shell/toggle commands this is
      also the literal text a visitor can type in the guest shell. */
  label: Record<Locale, string>;
  hint: Record<Locale, string>;
  /** Search/alias terms, matched by fuzzyMatch and completeCommand. The
      first entries are exact literal aliases usable in the guest shell. */
  keywords: string[];
  shortcut?: string;
  run(ctx: ProtoContextValue): string | void;
};

const SECTION_COPY: Record<string, { label: Record<Locale, string>; hint: Record<Locale, string> }> = {
  whoami: {
    label: { en: "whoami --verbose", es: "whoami --verbose" },
    hint: { en: "# profile", es: "# perfil" },
  },
  about: {
    label: { en: "cat about.md", es: "cat sobre-mi.md" },
    hint: { en: "# trajectory", es: "# trayectoria" },
  },
  stack: {
    label: { en: "open ~/stack", es: "open ~/stack" },
    hint: { en: "# visual mode", es: "# modo visual" },
  },
  projects: {
    label: { en: "ls ~/featured", es: "ls ~/destacados" },
    hint: { en: "# top 3 · production first", es: "# top 3 · producción primero" },
  },
  terminal: {
    label: { en: "ssh guest@alejandro", es: "ssh guest@alejandro" },
    hint: { en: "# interactive", es: "# interactiva" },
  },
  contact: {
    label: { en: "contact --interactive", es: "contacto --interactivo" },
    hint: { en: "# write me", es: "# escríbeme" },
  },
};

const sectionCommands: ProtoCommand[] = PROTO_SECTIONS.map((section, index) => {
  const meta = SECTION_COPY[section.id];
  return {
    id: `section-${section.id}`,
    kind: "section",
    label: meta.label,
    hint: meta.hint,
    keywords: [section.id, section.label.en, section.label.es, meta.label.en, meta.label.es],
    shortcut: String(index),
    run: (ctx) => {
      ctx.scrollToSection(section.id);
    },
  };
});

/** Exact promptCopy strings the guest shell has always printed — kept
    verbatim so `help`, `whoami`, `stack`, `projects`, `contact` and
    `sudo hire-me` never drift from the original copy. */
const shellOutput = {
  en: {
    whoami:
      "alejandro padilla — full-stack developer · python & typescript · applied ai · open to part-time / contract",
    stack:
      "gentle-ai at the core + 8 branches: automation-ai / languages / frontend / backend / data / computer-vision / quality / devops  (run `open ~/stack` above)",
    projects: "2 in production, 1 launching, 6 in .archive — run `ls -a ~/projects` for everything",
    contact:
      "mail → alejandro.padilla@unl.edu.ec · github → github.com/AlejandroTatum · linkedin → /in/alejandro-emanuel-padilla-espinoza",
    sudo: "[sudo] access granted — part-time / contract · remote · US overlap · next step: mail alejandro.padilla@unl.edu.ec",
  },
  es: {
    whoami:
      "alejandro padilla — desarrollador full-stack · python y typescript · ia aplicada · disponible part-time / contrato",
    stack:
      "gentle-ai en el núcleo + 8 ramas: automation-ai / languages / frontend / backend / data / computer-vision / quality / devops  (ejecuta `open ~/stack` arriba)",
    projects: "2 en producción, 1 por publicar, 6 en .archive — ejecuta `ls -a ~/proyectos` para ver todo",
    contact:
      "mail → alejandro.padilla@unl.edu.ec · github → github.com/AlejandroTatum · linkedin → /in/alejandro-emanuel-padilla-espinoza",
    sudo: "[sudo] acceso concedido — part-time / contrato · remoto · horario EE. UU. · siguiente paso: escribe a alejandro.padilla@unl.edu.ec",
  },
} as const;

/** `lang` and `crt` are "toggle"-kind (so the palette groups them with
    fullscreen) but they are still typed in the guest shell like any other
    command, so the cheat sheet and `help` document them too — fullscreen
    stays palette/hotkey-only since it needs a direct user gesture. */
const EXTRA_SHELL_HELP_IDS = new Set(["toggle-lang", "toggle-crt"]);

export function isShellHelpCommand(command: ProtoCommand): boolean {
  return command.kind === "shell" || EXTRA_SHELL_HELP_IDS.has(command.id);
}

/** Section directory listing printed by `ls`. */
function lsOutput(locale: Locale): string {
  return PROTO_SECTIONS.map((section) => `drwxr-xr-x  ${section.id}/  # ${section.label[locale]}`).join("\n");
}

// Kept in sync with sections.tsx's uiCopy.aboutLede (duplicated here to
// avoid a circular import between commands.ts, sections.tsx and
// ContactPrompt.tsx — sections.tsx already imports ContactPrompt, which
// imports this module).
const SECTION_ABOUT_LEDE: Record<Locale, string> = {
  en: "Computer Science student at Universidad Nacional de Loja (Ecuador), with client work in production before graduating.",
  es: "Estudiante de Computación en la Universidad Nacional de Loja (Ecuador), con trabajo de clientes en producción desde antes de graduarme.",
};

/** `cat about.md` output — the about lede plus the "how I work" row. */
function catAboutOutput(locale: Locale): string {
  const how = copy[locale].about.timeline[0];
  return `${SECTION_ABOUT_LEDE[locale]}\n${how.title}: ${how.detail}`;
}

const shellCommands: ProtoCommand[] = [
  {
    id: "shell-help",
    kind: "shell",
    label: { en: "help", es: "help" },
    hint: { en: "list available commands", es: "lista los comandos disponibles" },
    keywords: ["help"],
    run: (ctx) => {
      const rows = COMMANDS.filter(isShellHelpCommand);
      return rows.map((row) => `  ${row.label[ctx.locale].padEnd(20)} ${row.hint[ctx.locale]}`).join("\n");
    },
  },
  {
    id: "shell-whoami",
    kind: "shell",
    label: { en: "whoami", es: "whoami" },
    hint: { en: "who is behind this portfolio", es: "quién está detrás del portafolio" },
    keywords: ["whoami"],
    run: (ctx) => shellOutput[ctx.locale].whoami,
  },
  {
    id: "shell-stack",
    kind: "shell",
    label: { en: "stack", es: "stack" },
    hint: { en: "capability branches", es: "ramas de capacidades" },
    keywords: ["stack", "skills"],
    run: (ctx) => shellOutput[ctx.locale].stack,
  },
  {
    id: "shell-projects",
    kind: "shell",
    label: { en: "projects", es: "projects" },
    hint: { en: "what I've shipped", es: "lo que he construido" },
    keywords: ["projects"],
    run: (ctx) => shellOutput[ctx.locale].projects,
  },
  {
    id: "shell-contact",
    kind: "shell",
    label: { en: "contact", es: "contact" },
    hint: { en: "how to reach alejandro", es: "cómo contactar a alejandro" },
    keywords: ["contact", "mail"],
    run: (ctx) => shellOutput[ctx.locale].contact,
  },
  {
    id: "shell-sudo-hire-me",
    kind: "shell",
    label: { en: "sudo hire-me", es: "sudo hire-me" },
    hint: { en: "the fast path", es: "la vía rápida" },
    keywords: ["sudo hire-me", "sudo hire me", "sudo hire"],
    run: (ctx) => shellOutput[ctx.locale].sudo,
  },
  {
    id: "shell-clear",
    kind: "shell",
    label: { en: "clear", es: "clear" },
    hint: { en: "wipe the output", es: "limpia la salida" },
    keywords: ["clear"],
    // Clearing the screen is a ContactPrompt-local action (it resets the
    // line buffer); this run() only exists so the registry stays complete.
    run: () => undefined,
  },
  {
    id: "shell-neofetch",
    kind: "shell",
    label: { en: "neofetch", es: "neofetch" },
    hint: { en: "system info, portfolio edition", es: "info del sistema, edición portafolio" },
    keywords: ["neofetch"],
    // ContactPrompt renders the rich two-column block for this one; this
    // plain-text line is only the reduced-motion / non-visual fallback.
    run: (ctx) =>
      ctx.locale === "en"
        ? "alejandro padilla · full-stack developer · fastapi/next.js/postgresql/docker · llm+agents+yolo · ecuador/remote"
        : "alejandro padilla · desarrollador full-stack · fastapi/next.js/postgresql/docker · llm+agentes+yolo · ecuador/remoto",
  },
  {
    id: "shell-ls",
    kind: "shell",
    label: { en: "ls", es: "ls" },
    hint: { en: "list sections like a directory", es: "lista las secciones como un directorio" },
    keywords: ["ls"],
    run: (ctx) => lsOutput(ctx.locale),
  },
  {
    id: "shell-cat-about",
    kind: "shell",
    label: { en: "cat about.md", es: "cat about.md" },
    hint: { en: "print the about file", es: "imprime el archivo about" },
    keywords: ["cat about.md"],
    run: (ctx) => catAboutOutput(ctx.locale),
  },
  {
    id: "shell-open-cataclub",
    kind: "shell",
    label: { en: "open cataclub", es: "open cataclub" },
    hint: { en: "jump to the cataclub card", es: "salta a la tarjeta de cataclub" },
    keywords: ["open cataclub", "cataclub"],
    run: (ctx) => {
      ctx.openProject("cataclub");
      return ctx.locale === "en" ? "→ jumping to cataclub" : "→ saltando a cataclub";
    },
  },
  {
    id: "shell-open-elhornodelpinguino",
    kind: "shell",
    label: { en: "open elhornodelpinguino", es: "open elhornodelpinguino" },
    hint: { en: "jump to the horno card", es: "salta a la tarjeta del horno" },
    keywords: ["open elhornodelpinguino", "elhornodelpinguino", "horno"],
    run: (ctx) => {
      ctx.openProject("elhornodelpinguino");
      return ctx.locale === "en" ? "→ jumping to elhornodelpinguino" : "→ saltando a elhornodelpinguino";
    },
  },
  {
    id: "shell-open-yololab",
    kind: "shell",
    label: { en: "open yololab", es: "open yololab" },
    hint: { en: "jump to the yolo lab card", es: "salta a la tarjeta de yolo lab" },
    keywords: ["open yololab", "yololab", "yolo"],
    run: (ctx) => {
      ctx.openProject("yololab");
      return ctx.locale === "en" ? "→ jumping to yololab" : "→ saltando a yololab";
    },
  },
];

const toggleCommands: ProtoCommand[] = [
  {
    id: "toggle-lang",
    kind: "toggle",
    label: { en: "lang", es: "lang" },
    hint: { en: "switch en / es", es: "cambia en / es" },
    keywords: ["lang", "language", "idioma", "es", "en"],
    run: (ctx) => {
      const next: Locale = ctx.locale === "en" ? "es" : "en";
      ctx.toggleLocale();
      return `→ lang: ${next}`;
    },
  },
  {
    id: "toggle-crt",
    kind: "toggle",
    label: { en: "crt", es: "crt" },
    hint: { en: "toggle scanlines", es: "alterna las líneas crt" },
    keywords: ["crt", "scanlines"],
    run: (ctx) => {
      const turningOn = !ctx.crtOn;
      ctx.toggleCrt();
      return ctx.locale === "en"
        ? `→ crt scanlines: ${turningOn ? "on" : "off"}`
        : `→ líneas crt: ${turningOn ? "encendidas" : "apagadas"}`;
    },
  },
  {
    id: "toggle-fullscreen",
    kind: "toggle",
    label: { en: "fullscreen", es: "fullscreen" },
    hint: { en: "toggle fullscreen", es: "alterna pantalla completa" },
    keywords: ["fullscreen", "full screen", "pantalla completa"],
    run: () => {
      toggleFullscreen();
    },
  },
];

const linkCommands: ProtoCommand[] = [
  {
    id: "link-github",
    kind: "link",
    label: { en: "github", es: "github" },
    hint: { en: "open github profile", es: "abrir perfil de github" },
    keywords: ["github", "git"],
    run: () => {
      window.open(siteConfig.github, "_blank", "noopener,noreferrer");
    },
  },
  {
    id: "link-linkedin",
    kind: "link",
    label: { en: "linkedin", es: "linkedin" },
    hint: { en: "open linkedin profile", es: "abrir perfil de linkedin" },
    keywords: ["linkedin"],
    run: () => {
      window.open(siteConfig.linkedin, "_blank", "noopener,noreferrer");
    },
  },
  {
    id: "link-mail",
    kind: "link",
    label: { en: "mail", es: "mail" },
    hint: { en: "email alejandro", es: "escribir a alejandro" },
    keywords: ["mail", "email"],
    run: () => {
      window.open(siteConfig.emailHref, "_blank", "noopener,noreferrer");
    },
  },
];

const hiddenCommands: ProtoCommand[] = [
  {
    id: "hidden-pwd",
    kind: "hidden",
    label: { en: "pwd", es: "pwd" },
    hint: { en: "print working directory", es: "imprime el directorio actual" },
    keywords: ["pwd"],
    run: () => "/home/visitor/portfolio",
  },
  {
    id: "hidden-matrix",
    kind: "hidden",
    label: { en: "matrix", es: "matrix" },
    hint: { en: "wake up, neo", es: "despierta, neo" },
    keywords: ["matrix"],
    // ContactPrompt animates the katakana/hex rain for this one; this
    // string is only the reduced-motion static fallback line.
    run: () => "0100 1101 01110100 01110010 01101001 01111000",
  },
  {
    id: "hidden-konami",
    kind: "hidden",
    label: { en: "konami", es: "konami" },
    hint: { en: "toggle overdrive mode", es: "alterna el modo overdrive" },
    keywords: ["konami", "up up down down left right left right b a"],
    run: (ctx) => {
      const turningOn = !ctx.overdrive;
      ctx.toggleOverdrive();
      if (ctx.locale === "en") {
        return turningOn ? "[overdrive] unlocked — try 'help --all'" : "[overdrive] off";
      }
      return turningOn ? "[overdrive] desbloqueado — prueba 'help --all'" : "[overdrive] apagado";
    },
  },
];

export const COMMANDS: ProtoCommand[] = [
  ...sectionCommands,
  ...shellCommands,
  ...toggleCommands,
  ...linkCommands,
  ...hiddenCommands,
];

/** Text shown by the guest shell for an unknown command, with or without a
    fuzzy suggestion. */
export const shellCopy = {
  en: {
    notFound: (cmd: string) => `command not found: ${cmd} — try 'help'`,
    didYouMean: (cmd: string, suggestion: string) => `command not found: ${cmd} — did you mean '${suggestion}'?`,
  },
  es: {
    notFound: (cmd: string) => `comando no encontrado: ${cmd} — prueba 'help'`,
    didYouMean: (cmd: string, suggestion: string) => `comando no encontrado: ${cmd} — ¿quisiste decir '${suggestion}'?`,
  },
} as const;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Subsequence/prefix scorer: exact > prefix > word-start > subsequence. */
function scoreAgainst(query: string, text: string): number {
  if (!query) return 0;
  if (text === query) return 100;
  if (text.startsWith(query)) return 80;
  if (new RegExp(`(^|[\\s._~/-])${escapeRegExp(query)}`).test(text)) return 60;

  let cursor = 0;
  for (let i = 0; i < query.length; i += 1) {
    cursor = text.indexOf(query[i], cursor);
    if (cursor === -1) return -1;
    cursor += 1;
  }
  return 20;
}

/** Fuzzy score of a query against a command's id, keywords and labels.
    Returns -1 when nothing matches, higher is better. Shared by the
    command palette (ranks the visible list) and the guest shell (suggests
    a close command on a typo). */
export function fuzzyMatch(query: string, command: ProtoCommand): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const candidates = [command.id, ...command.keywords, command.label.en, command.label.es].map((value) =>
    value.toLowerCase(),
  );

  let best = -1;
  for (const candidate of candidates) {
    const score = scoreAgainst(q, candidate);
    if (score > best) best = score;
  }
  return best;
}

/** Commands the guest shell can execute by literal text — everything the
    visitor can type, including hidden easter eggs (matched exactly only). */
const SHELL_RUNNABLE_KINDS: ReadonlyArray<ProtoCommand["kind"]> = ["shell", "toggle", "hidden"];

/** Finds the command whose keywords (or id) exactly match a typed line. */
export function findShellCommand(input: string): ProtoCommand | undefined {
  const q = input.trim().toLowerCase();
  if (!q) return undefined;
  return COMMANDS.find(
    (command) => SHELL_RUNNABLE_KINDS.includes(command.kind) && command.keywords.some((keyword) => keyword.toLowerCase() === q),
  );
}

/** Best fuzzy suggestion for an unrecognized shell command, used for the
    "did you mean" hint. Only non-hidden, shell-runnable commands qualify. */
export function suggestShellCommand(input: string): ProtoCommand | undefined {
  // A subsequence hit (score 20) is a plausible typo only once the input is
  // long enough to be specific; two letters would match almost anything.
  const trimmed = input.trim();
  if (trimmed.length < 3) return undefined;
  let best: ProtoCommand | undefined;
  let bestScore = 15;
  for (const command of COMMANDS) {
    if (!SHELL_RUNNABLE_KINDS.includes(command.kind) || command.kind === "hidden") continue;
    const score = fuzzyMatch(input, command);
    if (score > bestScore) {
      bestScore = score;
      best = command;
    }
  }
  return best;
}

/** Tab-completion candidates for the guest shell: every keyword of every
    shell/toggle command whose text starts with the current input. */
export function completeCommand(input: string): string[] {
  const q = input.trim().toLowerCase();
  if (!q) return [];
  const candidates = new Set<string>();
  for (const command of COMMANDS) {
    if (command.kind !== "shell" && command.kind !== "toggle") continue;
    for (const keyword of command.keywords) {
      if (keyword.toLowerCase().startsWith(q)) candidates.add(keyword);
    }
  }
  return Array.from(candidates).sort();
}
