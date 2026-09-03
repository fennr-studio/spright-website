# Spright Software Systems — website

A rebuild of sprightsoft.com as a Next.js 15 App Router application.

All company content — statistics, service descriptions, domains served, the
recruitment procedure, office addresses and phone numbers — was taken from the
existing site and rewritten for clarity. No clients, testimonials,
certifications, awards, revenue figures, team members or founding dates have
been invented.

---

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

```bash
npm run typecheck   # tsc --noEmit
npm run lint
npm run build       # production build
```

> **Read this before your first run.** The project was written without network
> access, so `npm install` was never executed and neither `tsc` nor `next build`
> has been run against it. Expect to spend a short pass clearing type errors on
> first install — most likely around the Framer Motion ref signatures in
> `ProcessTimeline.tsx` and `CountUp.tsx`, where React 19's `RefObject<T | null>`
> is narrowed with a cast at the call site. Everything else has been checked
> statically: imports all resolve, no unused imports, braces balance, and every
> internal `href` maps to a real route.

---

## Architecture

```
src/
  app/                      routes (App Router, Server Components by default)
    api/contact/route.ts    enquiry endpoint
    api/careers/route.ts    talent-network endpoint (multipart, résumé upload)
    opengraph-image.tsx     social card, generated at build time
    sitemap.ts  robots.ts   SEO route handlers
  components/
    layout/                 header, footer, wordmark
    sections/               composable page sections
    ui/                     Section, Container, Button, Figure, SectionIntro
    animations/             Reveal, RevealItem, RevealMask, CountUp
    forms/                  ContactForm, CareerForm, field primitives
  data/                     all copy and content, typed
  lib/                      site facts, SEO, images, validation, email, schema
```

Pages compose sections; sections read from `src/data`. To change wording,
statistics, industries or hiring models, edit the data file — not the markup.

### Client components

Only five things ship JavaScript: the header (scroll state and mobile menu),
`ProcessTimeline` (scroll-linked progress rail), `HiringModels` (tabs), the two
forms, and the small reveal/count-up wrappers. Everything else is a Server
Component.

---

## Design system

Defined once in `tailwind.config.ts` and `src/app/globals.css`.

| Token | Value | Use |
|---|---|---|
| `ink` | `#17191C` | text, dark sections |
| `paper` | `#FAF9F6` | default background |
| `limestone` | `#E9E5DC` | alternating sections, hairlines |
| `cobalt` | `#1E3FCC` | the single accent |
| `cobalt-bright` | `#8AA3FF` | the accent on dark backgrounds |

One typeface, Manrope, loaded through `next/font`. Personality comes from the
type scale (`display-2xl` down to `meta`) rather than from a second family.

Motion is deliberate rather than ambient: section openers reveal once, images
are uncovered with a clip-path mask, statistics count up on first view, and the
process rail fills as you scroll. `prefers-reduced-motion` is respected at both
the CSS and component level — reduced-motion visitors get static markup with no
transforms at all.

---

## Images

Every photograph is referenced through a semantic key in `src/lib/images.ts`.
Components never contain a URL, so replacing the current royalty-free
placeholders with licensed brand photography is a single-file change.

To self-host: drop files into `public/photography/` and change each `src` to
`/photography/name.jpg`. Nothing else needs touching.

**These placeholder URLs have not been verified.** They point at Unsplash photo
IDs written from memory and some may 404. `Figure` paints a limestone base
underneath every image, so a failed load degrades to a filled block rather than
a hole — but check each one and swap it before launch.

---

## Forms and email

Both endpoints validate with the same Zod schema the browser uses
(`src/lib/validation.ts`), so client and server can't drift apart. Each has a
honeypot field, fixed-window rate limiting, size caps, and generic error
messages that never leak provider detail.

Résumé uploads are constrained to PDF/DOC/DOCX, 5 MB, with the filename
stripped of any path component before use.

Email delivery goes through `src/lib/email.ts`. With `RESEND_API_KEY` unset the
payload is logged instead of sent, so forms are testable locally without
credentials. Swapping providers means editing `deliver()` and nothing else.

**Rate limiting is in-memory** — it protects a single instance and resets on
deploy. For serverless or multi-region hosting, replace the two functions in
`src/lib/rate-limit.ts` with Upstash Redis or Vercel KV. The call sites don't
change.

---

## Job listings

`/careers` currently renders a talent-network form, because no vacancy database
exists. The page is built so listings drop in above the form without touching
anything else — see the comment marking the insertion point in
`src/app/careers/page.tsx`. The form then becomes the fallback for speculative
applications.

---

## Before launch

- [ ] `npm run typecheck` and `npm run build` clean
- [ ] Replace or verify every image source in `src/lib/images.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Add `RESEND_API_KEY`, verify the sending domain, send a test through both forms
- [ ] Have the privacy policy and terms (`src/data/legal.ts`) reviewed by a
      qualified adviser for both India and the United States — they are working
      drafts written to describe what this site actually does, not legal advice
- [ ] Lighthouse and axe pass on mobile and desktop
- [ ] Keyboard walk-through: skip link, mobile menu (Escape closes, focus
      returns to the toggle), hiring-model tabs (arrow keys, Home, End), both forms
- [ ] Swap the in-memory rate limiter if deploying serverless
