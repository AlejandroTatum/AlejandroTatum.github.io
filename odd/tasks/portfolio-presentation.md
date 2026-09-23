# Portfolio presentation proposal

Objective: Produce a local, reviewable portfolio improvement candidate in this isolated worktree only. Preserve the terminal/pixel identity, factual claims and bilingual experience. Do not push, open a PR or merge.

Problem: Friction in contact, language and mobile navigation; proof categories are ambiguous; section hierarchy and concise hiring narrative can improve.

Scope: Root terminal portfolio and shared contact/locale data. Pixel route receives shared email link behavior only; no redesign of pixel route. Preserve Spanish as root default; make the HTML language consistent with rendered root text and allow ?lang=en deep links. No new factual claims or external dependencies.

Constraints: Never touch the original checkout; keep all source edits and commits in this worktree. Existing main worktree has user changes. Use existing lint/build and local Playwright as checks. TDD mode: not configured in repository; ordinary validation, no claim of RED/GREEN. Runner: pnpm lint; pnpm build; global Playwright against local export. Delivery: local feature branch only, no push/PR. Strategy: ask-on-risk if authored scope exceeds approximately 400 diff lines. Branch: feat/portfolio-presentation-proposal. Base: 2043aed76f961ffc3e8172a7e5d4eb56978831e7. Forecast: 300–500 authored lines across focused work units.

## Tasks
- [x] P1 Conversion and language: mailto as primary, copy email option; root language metadata consistent with Spanish default and linkable/persisted EN/ES selection. Route: delegated writer (multi-file). Acceptance: valid links, language switch/deep link and reload behave; lint/build and browser smoke. Commit: 74f89f8eea74976b118d50df3623fc552a61f829.
- [ ] P2 Mobile navigation and accessibility: make projects/contact discoverable on mobile; add semantic section headings, correct labels and keyboard behavior where verified. Route: delegated writer (multi-file). Acceptance: keyboard/mobile paths work in browser and headings form valid hierarchy. Commit: pending.
- [ ] P3 Content and proof: distinguish client live, public demo and coming soon; condense redundant narrative/stack where safe without new claims; keep links in data. Route: delegated writer (multi-file). Acceptance: claims match project data, contact and project proof remain reachable; lint/build and browser smoke. Commit: pending.
- [ ] P4 Local verification and handoff: browser desktop/mobile ES/EN with interactions, audit failures honestly, provide proposal with screenshots and comparison to base. Route: delegated verifier. Acceptance: bounded evidence and no remote delivery. Commit: not applicable (read-only).

Progress: P1 implemented on this branch (74f89f8eea74976b118d50df3623fc552a61f829): mailto primary on both routes, copy-email chip on the root contact row, static lang=es, ?lang deep link + persisted locale via a useSyncExternalStore store. Evidence: pnpm lint clean; pnpm build clean (static export); static HTML has lang="es" and mailto hrefs on both routes; headless Chromium smoke 16/16 behaviors (default ES, deep link EN, reload persistence both ways, toggle URL sync, clipboard copy, pixel runtime lang=en + 3 mailto links). Next: implement P2.
