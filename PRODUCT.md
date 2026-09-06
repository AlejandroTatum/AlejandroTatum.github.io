# PRODUCT.md — Alejandro Padilla Portfolio

## What this is

Personal portfolio of Alejandro Padilla: full-stack developer (Python/FastAPI, TypeScript/Next.js) and CS student at Universidad Nacional de Loja, Ecuador, with applied AI as a working capability (LLM automation, agent workflows, YOLO computer vision). Bilingual EN/ES, statically deployed on GitHub Pages.

## Audience and scene

Hiring teams and small clients looking for a part-time / contract full-stack or automation developer, remote with US-timezone overlap. They arrive from a GitHub profile, a CV link, or a referral, skim for 1–3 minutes on desktop or phone, and need: who he is, what he can build, verifiable proof, and a contact path.

## Job to be done (Experience + Persuade)

- Let the visitor judge skill from the artifact itself: the portfolio should demonstrate craft, not claim it.
- Present real, verifiable project evidence (live demos, public repos) — production work and academic work clearly separated.
- Convert: clear path to email / GitHub / LinkedIn.

## Product truth that must never drift

- All projects, links, emails and claims come from `src/data/projects.ts`, `src/lib/constants.ts` and `src/lib/i18n.ts`. Never invent metrics, percentages, clients or capabilities.
- Contact: alejandro.padilla@unl.edu.ec · github.com/AlejandroTatum · LinkedIn.
- Bilingual EN/ES is a feature (EN B2 / ES native) and must survive any redesign.

## Constraints

- Static export (GitHub Pages): no server, self-hosted fonts at build time.
- Current incumbent world: light pastel pixel-art identity (Press Start 2P accents, hard ink shadows, pixel assets in `public/pixel/`). A prototype "dev mode" (terminal/TUI skin, `/proto` route) is being evaluated as a companion or successor — approval pending, it must not alter the live site.
- Stack: Next.js, TypeScript, Tailwind v4, GSAP + ScrollTrigger + TextPlugin, Lenis. Respect `prefers-reduced-motion`.

## Brand commitments

- Pixel-art assets (portrait, project illustrations) are original identity material and may cross between modes.
- Voice: direct, technical, honest about status (e.g. "free-tier hosting may require startup time").
