import type { Locale } from "@/lib/i18n";

const GITHUB_USER = "AlejandroTatum";
const CACHE_KEY = "portfolio-github-signal";
const CACHE_TTL_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type GithubSignalData = {
  publicRepos: number;
  lastCommitAt: string;
  fetchedAt: number;
};

type GithubEvent = { type?: string; created_at?: string };

/** Collapses concurrent callers (hero status line + about's GithubSignal) into
    one network request per page load — cleared once it settles so a later
    call past the cache TTL fetches fresh data again. */
let inFlightRequest: Promise<GithubSignalData | null> | null = null;

function readCache(): GithubSignalData | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GithubSignalData;
    if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(data: GithubSignalData): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage can be unavailable (private mode, quota) — skip caching silently.
  }
}

/**
 * Fetches the public-repo count and the most recent push event for the
 * portfolio's GitHub profile, cached in sessionStorage for an hour so
 * re-renders and locale toggles never refetch. Resolves to `null` on any
 * failure (rate limit, offline, malformed payload) — the caller renders
 * nothing in that case.
 */
async function requestGithubSignal(): Promise<GithubSignalData | null> {
  try {
    const [userRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`),
      fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`),
    ]);
    if (!userRes.ok || !eventsRes.ok) return null;

    const user = (await userRes.json()) as { public_repos?: unknown };
    const events = (await eventsRes.json()) as unknown;
    if (typeof user.public_repos !== "number" || !Array.isArray(events)) return null;

    const pushEvent = (events as GithubEvent[]).find((event) => event.type === "PushEvent");
    const latest = pushEvent ?? (events as GithubEvent[])[0];
    if (!latest?.created_at) return null;

    const data: GithubSignalData = {
      publicRepos: user.public_repos,
      lastCommitAt: latest.created_at,
      fetchedAt: Date.now(),
    };
    writeCache(data);
    return data;
  } catch {
    return null;
  }
}

export async function fetchGithubSignal(): Promise<GithubSignalData | null> {
  const cached = readCache();
  if (cached) return cached;

  if (!inFlightRequest) {
    inFlightRequest = requestGithubSignal().finally(() => {
      inFlightRequest = null;
    });
  }
  return inFlightRequest;
}

/** Manual fallback for runtimes without `Intl.RelativeTimeFormat`. */
function manualRelative(diffDays: number, locale: Locale): string {
  if (diffDays <= 0) return locale === "en" ? "today" : "hoy";
  if (diffDays === 1) return locale === "en" ? "yesterday" : "ayer";
  if (diffDays < 7) {
    return locale === "en" ? `${diffDays} days ago` : `hace ${diffDays} días`;
  }
  if (diffDays < 30) {
    const weeks = Math.round(diffDays / 7);
    return locale === "en"
      ? `${weeks} week${weeks === 1 ? "" : "s"} ago`
      : `hace ${weeks} semana${weeks === 1 ? "" : "s"}`;
  }
  const months = Math.round(diffDays / 30);
  return locale === "en"
    ? `${months} month${months === 1 ? "" : "s"} ago`
    : `hace ${months} mes${months === 1 ? "" : "es"}`;
}

/** "today / yesterday / 3 days ago / 2 weeks ago / 3 months ago" in the
    active locale, via `Intl.RelativeTimeFormat` where available. */
export function formatRelativeDate(iso: string, locale: Locale): string {
  const diffDays = Math.floor((Date.now() - new Date(iso).getTime()) / DAY_MS);

  if (typeof Intl === "undefined" || typeof Intl.RelativeTimeFormat !== "function") {
    return manualRelative(diffDays, locale);
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
  if (diffDays < 7) return rtf.format(-diffDays, "day");
  if (diffDays < 30) return rtf.format(-Math.round(diffDays / 7), "week");
  return rtf.format(-Math.round(diffDays / 30), "month");
}

export function formatGithubSignalLine(data: GithubSignalData, locale: Locale): string {
  const relative = formatRelativeDate(data.lastCommitAt, locale);
  return locale === "en"
    ? `last commit: ${relative} · ${data.publicRepos} public repos`
    : `último commit: ${relative} · ${data.publicRepos} repos públicos`;
}
