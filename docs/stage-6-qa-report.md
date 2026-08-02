# Stage 6 — Final QA report (Fable "Morning Arch" redesign)

Branch `fable-redesign`. Restore point: tag `restore-pre-fable-redesign` on the
pre-redesign `main`. Stages 1–6 committed separately (`9286163` → this commit).

## Verification evidence

| Check | Result |
|---|---|
| `npx tsc --noEmit` | Clean |
| `npm run lint` | Clean (fixed one real `react-hooks/set-state-in-effect` in SiteHeader) |
| `npm run build` | Clean — 34 static pages, all routes generate |
| Console errors (homepage, dev) | None |
| Mobile 375px horizontal overflow | None (`scrollWidth === innerWidth`) |
| Mobile menu | Opens, closes on link tap, restores body scroll |
| `/hospitals` → `/clinics` redirect | Verified in browser (both index and slug pattern configured, 308) |
| Consultation flow | Walked end-to-end in browser: 7 steps, per-step validation messages, urgent-symptoms warning, upload type/size rejection rules, consent gating, successful POST, confirmation state; failure fallback renders contact-page route |
| FAQ disclosures | Native `<details>`, keyboard operable, all 12 items |
| Headings | Single h1 per page, no level jumps (homepage verified programmatically) |
| Images | All `next/image` with alt text; local WebP 92–290 KB; hero `priority` |
| Landmarks | header/nav/main/footer present; skip link; `html lang="en"` |
| Focus | 3px sky `:focus-visible` outline globally; choice cards show ring via `:focus-visible + label` |
| Reduced motion | GSAP effects only run under `(prefers-reduced-motion: no-preference)`; content fully visible without JS; `?nomotion` QA escape hatch |
| Motion system | `Reveal` (scroll reveals, stagger) + `Parallax` (scrub drift, desktop-only) via `useGSAP` + `gsap.matchMedia()`, auto-cleanup; no scroll hijack, no loaders, no cursor effects |
| SEO | Per-page titles/descriptions, Organization + FAQPage JSON-LD, sitemap (incl. `/clinics`), robots; profile templates `noindex` until real data |
| Contrast | Token pairs computed at Stage 1: body 15.6:1, secondary 7.3:1, button 5.2:1, accents 4.9–6.1:1 — all AA |

Interaction spot-checks were run in the in-app browser against the dev server;
production behavior verified by the static build.

## Design-reset confirmation

No visible element of the retired "Care Route" system remains: porcelain/pine/
celadon tokens, Figtree/Newsreader, RouteRail, dash-eyebrows, the old wordmark,
old hero illustration, and stale QA screenshot are deleted. The general-medical
framing (hospitals, physicians, oncology copy, professional-programs links) is
gone from every route.

## Performance posture

Static prerender for all marketing routes; one hero image with `priority` and
`sizes`; local WebP under 300 KB; fonts via `next/font` (swap, subset); GSAP is
the only animation dependency; no new packages added in the redesign. Formal
Core Web Vitals measurement (LCP < 2.5s / CLS < 0.1 / INP < 200ms) should be
re-run on production hosting; nothing in the build works against those targets
(no layout-shifting media, no blocking third-party scripts).

## Inventory — awaiting real data, approvals, or infrastructure

1. **Dentist & clinic profiles** — all five are labeled placeholders; no names,
   credentials, registrations, or accreditations published until verified.
2. **Patient story** — placeholder clearly marked; requires written consent and
   verifiable facts (requirements listed in `lib/content.ts`).
3. **Contact details** — email/phone/WhatsApp pending publication (nulls in
   `site.contact` render as "pending" states).
4. **Consultation intake** — `/api/consultation` validates and acknowledges but
   does not persist; needs secure CRM/case-store + coordinator notification
   (TODO marked in route).
5. **Secure record upload** — deliberately a labeled non-production preview;
   files are listed, never transmitted. Needs encrypted storage before launch.
6. **Legal pages** — privacy/terms/disclaimer are drafts for counsel review.
7. **Company facts** on About — founding year, leadership, locations pending.
8. **Photography** — current images are Higgsfield-generated (provenance in
   stage-2 doc, synthetic people; never caption as real patients/staff). Replace
   with commissioned photography when available; briefs live in `Photo` slots.
9. **Analytics** — `track()` pushes to `dataLayer` only if one exists; none is
   configured.
10. **Plastic surgery** — registered `in-development` in the specialty registry;
    activation adds records, no redesign.

## Expansion path

Navigation, treatment index, sitemap, and consultation options derive from the
specialty registry in `lib/content.ts` — adding plastic surgery means flipping
its status and adding `Treatment` records with `specialty: "plastic-surgery"`.
