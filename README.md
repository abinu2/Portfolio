# Allan Binu — Portfolio

Personal portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Neo-brutalist zine design system with a typewriter terminal hero, a curated project grid, an animated experience timeline, and a rate-limited contact form.

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
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials for contact form delivery via Nodemailer. When unset, submissions are logged to the server console. |
| `CONTACT_EMAIL` | Destination address for contact form submissions. |

## Updating content

Portfolio content lives in `data/`:

- `data/featured-projects.ts` — hand-picked project exhibits (title, description, tags, GitHub link, optional live demo + prize)
- `data/experience.ts` — the Field Log timeline (role, company, period, bullet points, tags)
- `data/skills.ts` — skill groups (the marquee ticker derives from these automatically)

## Design system

Every color, font size, spacing unit, radius, and animation duration is defined once in `styles/tokens.ts`. `tailwind.config.ts` generates the utility classes from those tokens, so re-theming the entire site is a one-file change. No raw hex codes appear in any component.

## Architecture notes

- **Contact form**: `app/api/contact/route.ts` validates, rate-limits (3/IP/hour in-memory — swap for Redis/Upstash at serverless scale), and delivers form submissions.
- **Metadata**: `app/icon.tsx` and `app/opengraph-image.tsx` generate the favicon and social card on the fly via `next/og` — no static image assets to keep in sync.
- **Accessibility**: visible focus rings, `aria-label` on icon buttons, labeled form fields, a skip-to-content link, and full `prefers-reduced-motion` support.
- **Animations** use `transform`/`opacity` only — no layout-triggering properties.

## Deploying

Push to GitHub and import into [Vercel](https://vercel.com/new) — zero config required. Add the env vars above in the Vercel dashboard if you want a working contact form.
