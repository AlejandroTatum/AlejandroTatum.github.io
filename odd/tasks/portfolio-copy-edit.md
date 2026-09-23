# Portfolio copy edit

Objective: Tighten the root terminal portfolio's text for hiring teams and clients while preserving personality, evidence, bilingual parity and the original worktree boundary. No invented claims, no redesign, no changes to the original checkout, push or PR.

Worktree: pi-portfolio-proposal; branch feat/portfolio-presentation-proposal. Current served preview: localhost:4173 from out/. TDD not configured; ordinary validation via pnpm lint, pnpm build and global Playwright. Delivery: one local branch, small copy work-unit commit. Scope: root terminal copy in src/components/proto/sections.tsx and featured descriptions in src/data/projects.ts; avoid touching shared pixel copy unless required.

## Tasks
- [x] C1 Tighten the hero/about and redundant section framing in ES/EN. Keep role, delivery scope, availability and proof prominent. Verify copy meaning and locale parity. Route: delegated writer, 2-file write.
- [x] C2 Tighten featured project descriptions in ES/EN without losing client problem, intervention, status or action; keep technical specifics accessible as tags/links. Route: same bounded writer, coherent copy work unit. Verify data integrity.
- [ ] C3 Run lint/build and Playwright mobile/desktop browser readback against refreshed local export; report screenshot and any failures, leave server running on 4173. Route: delegated verification.

Progress: C1/C2 complete. C3 pending (delegated verification already partially run: lint/build/Playwright clean; C3 formal record outstanding).

## C1/C2 evidence

Commit: 32f88d6 `copy(portfolio): tighten bilingual hero, about and featured copy` (src/components/proto/sections.tsx + src/data/projects.ts only).

C1 (sections.tsx, EN+ES):
- heroShort: dropped the proof sentence ("A live client site and public code to prove it." / "Un sitio de cliente en vivo y código público para comprobarlo.") — duplicated by HeroStatusLine directly below; delivery scope kept.
- aboutChips: removed the UNL chip duplicating aboutLede; kept the language chip (es native · en b1). aboutLede left byte-identical on purpose: it is mirrored into commands.ts (outside edit surfaces).
- topSub removed (copy + span): redundant with "featured — top 3" title, "# top 3 · client work first" comment and ★ TOP 3 badge; comment shortened to "# client work first" / "# trabajo de cliente primero".

C2 (projects.ts, EN+ES, featured three):
- cataclub 36→23 words EN (−36%): client, one-place problem, public+members' intervention kept; leading "CATA CLUB," dropped (redundant with rendered title).
- YOLO 33→25 EN (−24%): same-input benchmark, metrics, webcam, custom weights kept; dropped "Interactive"/"support" filler.
- Horno 30→21 EN (−30%): bakery, catalog/pricing/orders/FAQ, single WhatsApp flow, "how the business actually sells" insight kept.
- Status fields, tags, links, highlights untouched; locale parity kept.

Validation: pnpm lint clean; pnpm build clean (static export, 5/5 pages). Served export at :4173 verified by curl (new ES strings present, old strings absent). Playwright EN render smoke desktop 1366px + mobile 390px: 6/6 target strings visible, 0 stray removed strings. Server process untouched.
