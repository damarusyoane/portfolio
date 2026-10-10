# Ottomate — AI automation agency website

Bilingual (EN/FR) website for **Ottomate**, an AI automation agency for small
and mid-sized businesses. White pages, deep-green bands and one sun-yellow
signal; a phone in the hero that plays back SMS threads for several services
(missed calls, invoices, reviews, reminders); screenshots rebuilt from
delivered projects, case studies, industry landing pages, a cost calculator,
a blog and a working contact form.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4** — design tokens in `app/globals.css` (`.theme-ink` flips
  them for the green bands); Bricolage Grotesque for titles and text
- **next-intl** — bilingual routing (`/en`, `/fr`)
- **Framer Motion** — animations
- **MDX** (`next-mdx-remote`) — blog in `content/blog/{en,fr}`
- **Resend** — contact-form email (server action in `lib/actions.ts`)
- **Vercel Analytics + Speed Insights**

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

## Content map

| What | Where |
|---|---|
| Identity, contact links, WhatsApp message | `lib/site.ts` |
| Case studies | `lib/projects.ts` (+ screenshots in `lib/galleries.ts`) |
| Industry pages | `lib/niches.ts` |
| Automation catalog | `lib/solutions.ts` |
| UI text (EN/FR) | `messages/en.json`, `messages/fr.json` |
| Blog posts | `content/blog/{en,fr}/*.mdx` |

## Deploy

Push to GitHub and import in Vercel (or `vercel --prod`). Set the env vars from
`.env.example` in the Vercel dashboard.
