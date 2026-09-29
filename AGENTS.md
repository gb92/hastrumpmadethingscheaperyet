<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository guide

## What this project is

`hastrumpmadethingscheaperyet.com` is a small, deliberately opinionated price
tracker. It answers a campaign-style political question with current U.S.
consumer-price data and plain-English context.

The site exists primarily as a joke and as an outlet for the owner's political
frustration. It is not intended to read like a neutral government dashboard,
institutional policy paper, or comprehensive economics product. Preserve its
sharp, irreverent, skeptical voice and its simple punchline-first presentation.
Humor, sarcasm, and pointed criticism of Donald Trump, his administration, and
their policies are part of the product rather than incidental copy.

That tone does not license fabricated claims. The joke works because the
underlying numbers are real.

## Editorial principles

- Keep the central question and verdict immediately understandable.
- Prefer concise, conversational copy over bureaucratic or academic language.
- Political frustration may be direct, funny, and opinionated; do not
  automatically sanitize it into false neutrality.
- Aim criticism at public figures, political promises, policies, and measurable
  outcomes. Do not introduce threats, slurs, dehumanizing language, or attacks
  on private people.
- Distinguish broad consumer-price levels from the inflation rate. Slower
  inflation does not mean prices became cheaper.
- Avoid claiming that a president single-handedly controls prices. Explain
  relevant policy effects without erasing the roles of Congress, the Federal
  Reserve, businesses, supply chains, energy markets, weather, and global events.
- Do not turn the site into a general news publication or add unrelated
  political commentary unless explicitly requested.

## Data integrity

- The scoreboard uses seasonally adjusted CPI-U series from the U.S. Bureau of
  Labor Statistics and compares the latest available observation with January 2025.
- `src/lib/data.ts` is the source of truth for series IDs, baseline selection,
  change calculations, and BLS error handling.
- Never hard-code a favorable result, invent data, silently substitute a
  different source, or change the baseline merely to improve the punchline.
- Keep source links and methodology visible when changing displayed metrics or
  adding factual claims.
- Treat unavailable or malformed upstream data as an explicit error state, not
  as evidence for either a "Yes" or "No" verdict.

## Product and design direction

- Preserve the editorial, poster-like visual identity rather than drifting
  toward a generic SaaS dashboard.
- The answer should remain prominent; charts and context support the joke rather
  than burying it.
- Keep the page accessible, responsive, fast, and useful without client-side
  JavaScript where practical.
- Avoid unnecessary accounts, tracking, personalization, complex navigation, or
  backend infrastructure. This is intentionally a focused single-purpose site.

## Technical conventions

- The app uses Next.js App Router, React, TypeScript, Tailwind CSS, and pnpm.
- Respect the Node version in `.nvmrc` and the pnpm version declared by
  `packageManager` in `package.json`.
- Use Oxlint for linting and Oxfmt for formatting. Do not reintroduce ESLint or
  Prettier unless explicitly requested.
- Run `pnpm lint`, `pnpm format:check`, and `pnpm build` for relevant code
  changes.
- Keep changes narrow and reuse the existing data and presentation patterns.
