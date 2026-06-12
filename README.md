# Allan Binu — Portfolio

Personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Dark, terminal-inspired design system with a network-traffic particle hero, typewriter terminal card, animated experience timeline, live GitHub repo grid, and a rate-limited contact form.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Type checking:

```bash
npm run typecheck
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need. Everything is optional — the site runs with zero configuration.

| Variable | Purpose |
|---|---|
| `GITHUB_TOKEN` | Raises GitHub API rate limit from 60 to 5000 req/hr for the Open Source section. Create at github.com/settings/tokens (no scopes needed). |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials for contact form delivery via Nodemailer. When unset, submissions are logged to the server console. |
| `CONTACT_EMAIL` | Destination address for contact form submissions. |

## Updating content

All portfolio content lives in **`lib/constants.ts`** — no component edits needed:

- `SITE` — name, email, social URLs, tagline, bio
- `EXPERIENCE` — timeline entries (role, company, period, bullet points, tags)
- `FEATURED_PROJECTS` — featured project cards; add a `prize` field to show the trophy badge, or a `demo` field for a live-demo link
- `SKILL_GROUPS` — the four skill categories (the marquee ticker derives from these automatically)
- `TERMINAL_LINES` — the hero terminal script

The GitHub grid is fully dynamic — it pulls your top 6 non-fork repos (by stars, then recency) from `github.com/abinu2` via `/api/github`, cached for 1 hour.

## Design system

Every color, font size, spacing unit, radius, and animation duration is defined once in **`styles/tokens.ts`**. `tailwind.config.ts` generates the utility classes from those tokens, so re-theming the entire site is a one-file change. No raw hex codes appear in any component.

## Assets to replace

- `public/resume.pdf` — currently a placeholder; drop in your real resume (the filename is referenced by both hero and mobile-nav download buttons)
- `public/og-image.png` — a generated 1200×630 social card matching the design system; replace if you want a custom one

## Architecture notes

- **API routes**: `app/api/github` (cached, typed, graceful-failure) and `app/api/contact` (validation + 3/IP/hour in-memory rate limit — swap for Redis/Upstash if deploying serverless at scale)
- **Performance**: sections below the hero are code-split via `next/dynamic`; the particle canvas is client-only (`ssr: false`) and skips rendering entirely under `prefers-reduced-motion`
- **Accessibility**: visible focus rings, `aria-label` on all icon buttons, labeled form fields, reduced-motion support across every animation
- **Animations** use `transform`/`opacity` only — no layout-triggering properties

## Deploying

Push to GitHub and import into [Vercel](https://vercel.com/new) — zero config required. Add the env vars above in the Vercel dashboard if you want the contact form to send email.
