# Damarus Ngankou — Portfolio

Bilingual (EN/FR) portfolio for an **AI & Automation Engineer**, targeting the
 IT market. Dark, premium design with an animated automation-graph hero,
anonymized case studies, a technical blog, and a working contact form.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — design system in `app/globals.css`
- **next-intl** — bilingual routing (`/en`, `/fr`)
- **Framer Motion** — animations
- **MDX** (`next-mdx-remote`) — blog in `content/blog/{en,fr}`
- **Resend** — contact-form email (server action in `lib/actions.ts`)
- **Vercel Analytics + Speed Insights**

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000  -> redirects to /en
```

## Content map

| What | Where |
|---|---|
| Identity, links, photo flag | `lib/site.ts` |
| Skills, experience, facts | `lib/content.ts` |
| Case studies | `lib/projects.ts` |
| UI text (EN/FR) | `messages/en.json`, `messages/fr.json` |
| Blog posts | `content/blog/{en,fr}/*.mdx` |

See `PLACEHOLDERS.md` for the short list of things to confirm/replace.

## Deploy

Push to GitHub and import in Vercel (or `vercel --prod`). Set the env vars from
`.env.example` in the Vercel dashboard.
