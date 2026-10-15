Refresh the portfolio and the GitHub profile README now that Cata Club is in production and El Horno del Pingüino gained an admin-backed catalog.
Portfolio branch: feat/cataclub-live (from origin/main 8d6dd79). Profile repo: AlejandroTatum/AlejandroTatum.
Out of scope here: GitHub profile settings (bio, pins, avatar) — next feature.

## Specs

- S1 "ya tengo cata club en prod" — portfolio shows Cata Club as a live client site at https://cataclub.com/ (verified 200, www redirects to apex); no "in development" / "under construction" copy remains.
- S2 "el horno del pinguino actualizado" — portfolio Horno entry reflects the current system: Astro landing whose catalog is served by a Next.js + Prisma + PostgreSQL admin panel the business uses (catalog, banners, FAQ, site settings).
- S3 Derived status lines (hero status, shell `ls`/about output) never print a zero-count segment such as "0 client builds in development".
- S4 "actualiza mi perfil de git que esta hecho un asco" + user chose "También el diseño": profile README is redesigned sober and direct, centered on the production projects; Cata Club added; Horno linked to https://elhornodelpinguino.com/; frozen stats SVG and third-party streak widget removed.
- S5 Publishing the profile README (push) waits for the user's explicit approval of the draft.

## Tasks

- T1 S1 S3 portfolio: Cata Club live (data, featured card, counts, preview) — inline — commit: daffb8d
- T2 S2 portfolio: Horno data refresh — inline — commit: daffb8d (shared with T1)
- T3 S4 S5 profile README redesign draft in a local clone, user approval, push — inline — commit: AlejandroTatum/AlejandroTatum@456d8c7 (pushed to main, raw README verified)

## Log

- L1 (user, 2026-10-14): "ya tengo cata club en prod y el horno del pinguino actualizado, actualiza mi perfil de git que esta hecho un asco y el portafolio tambien. luego nos dedicamos a arreglar el perfil de github"
- L2 (user): "perfil de git" = README del perfil (AlejandroTatum/AlejandroTatum); "arreglar el perfil de GitHub" later = bio, pins, avatar, settings.
- L3 (user): what is wrong with the README → "También el diseño" (overloaded: many SVGs, badges, sections; wants it sober, focused on production projects).
- L4 (evidence): live README ≈ readme-profile-prototype; Horno points to *.pages.dev; cata_club repo is PUBLIC without homepage; cataclub.com and elhornodelpinguino.com return 200.
- L5 (user): approved publishing the README draft ("Sí, publicalo").
