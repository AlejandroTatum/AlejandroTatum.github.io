"use client";

import { useEffect, useState, type ReactNode } from "react";
import { fetchGithubSignal, formatRelativeDate } from "@/components/proto/githubSignal";
import type { Locale } from "@/lib/i18n";

type HeroStatusLineProps = {
  locale: Locale;
  onlineLabel: string;
  commitLabel: (relative: string) => string;
  productionLabel: string;
};

/**
 * tmux-style live status line under the hero CTAs: an "online" indicator,
 * the last GitHub commit (fetch shared with the about section's
 * `GithubSignal` through `fetchGithubSignal`'s in-flight cache), a ticking
 * Loja clock and the production count. The commit segment is simply omitted
 * while it loads or on failure — no placeholder, no reserved space. The
 * clock starts empty and fills in after mount so server and client markup
 * match.
 */
export function HeroStatusLine({ locale, onlineLabel, commitLabel, productionLabel }: HeroStatusLineProps) {
  const [commitText, setCommitText] = useState<string | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchGithubSignal().then((data) => {
      if (!cancelled && data) setCommitText(commitLabel(formatRelativeDate(data.lastCommitAt, locale)));
    });
    return () => {
      cancelled = true;
    };
  }, [locale, commitLabel]);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const clockText = now
    ? new Intl.DateTimeFormat(locale === "es" ? "es-EC" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "America/Guayaquil",
      }).format(now)
    : null;

  const leftSegments: Array<{ key: string; node: ReactNode }> = [{ key: "online", node: onlineLabel }];
  if (commitText) leftSegments.push({ key: "commit", node: commitText });

  const rightSegments: Array<{ key: string; node: ReactNode }> = [];
  if (clockText) {
    rightSegments.push({
      key: "clock",
      node: <time dateTime={now?.toISOString()}>{clockText} Loja</time>,
    });
  }
  rightSegments.push({ key: "production", node: productionLabel });

  const renderGroup = (segments: Array<{ key: string; node: ReactNode }>) =>
    segments.map((segment, index) => (
      <span key={segment.key} className="proto-hero-status-segment">
        {index > 0 ? (
          <span className="proto-hero-status-sep" aria-hidden="true">
            {" "}
            ·{" "}
          </span>
        ) : null}
        {segment.node}
      </span>
    ));

  return (
    <p className="proto-hero-status" data-hero-status>
      <span className="proto-hero-status-group">
        <span className="proto-hero-status-dot" aria-hidden="true" />
        {renderGroup(leftSegments)}
      </span>
      <span className="proto-hero-status-group">{renderGroup(rightSegments)}</span>
    </p>
  );
}
