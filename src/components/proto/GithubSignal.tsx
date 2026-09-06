"use client";

import { useEffect, useState } from "react";
import { fetchGithubSignal, formatGithubSignalLine } from "@/components/proto/githubSignal";
import type { Locale } from "@/lib/i18n";

/**
 * Client-only line under the about section's "wc -l" stats: last commit and
 * public repo count, straight from the GitHub API. Renders nothing while
 * loading and on any failure (rate limit, offline, ...) — the reserved
 * min-height keeps the block from jumping once (or if) it resolves.
 */
export function GithubSignal({ locale }: { locale: Locale }) {
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGithubSignal().then((data) => {
      if (!cancelled && data) setLine(formatGithubSignalLine(data, locale));
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div className="proto-about-github">{line ? <span className="proto-about-github-out">{line}</span> : null}</div>
  );
}
