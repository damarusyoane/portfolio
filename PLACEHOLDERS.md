# Things to provide / confirm

The site is fully functional. Here's what's already set and what's optional to refine.

## ✅ Done
- **LinkedIn**: `linkedin.com/in/damarusngankou`
- **WhatsApp / phone**: `+237 674 411 479`
- **Email**: `damarusngankou@gmail.com`
- **No photo** (removed by design — standard practice for this market).
- **No country mentions** (open to roles & freelance, anywhere / remote).

## 1. Workflow screenshots (recommended — makes flagships feel real)
Drop your n8n canvas screenshots into `public/projects/` using the filenames in
`public/projects/README.md`. Until then each card shows a clean placeholder.

## 2. Contact form email — Brevo (free, 300 emails/day)
- Create a free account at https://www.brevo.com
- **Verify a sender** (Senders, Domains & IPs → add `damarusngankou@gmail.com`, confirm).
- Create an **API key** — *not* SMTP credentials: SMTP & API → API Keys → Generate.
- Put it in `.env.local` as `BREVO_API_KEY` (see `.env.example`), and also in Vercel env vars.
- Without a key the form validates but reports an error instead of silently dropping the message.

## 3. Experience dates — `lib/content.ts`
- Confirm the periods/titles in `experience[]` (kept anonymized). Adjust to your reality.

## 4. Impact numbers
- Flagship `metrics` (in `lib/projects.ts`) and catalog `impact` (in `lib/solutions.ts`)
  use realistic, modest figures. Tweak any you'd like to phrase differently — they're
  one-liners.

## 5. Domain (optional)
- Ships on a free `*.vercel.app` URL. Add a custom domain anytime in Vercel →
  Settings → Domains, then set `NEXT_PUBLIC_SITE_URL` to it.
