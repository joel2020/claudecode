# Stage 1 — Audit and visual reset plan (Fable redesign)

Restore point: tag `restore-pre-fable-redesign` on `main` (5272d65). Work happens on branch `fable-redesign`.

## 1. What the reset removes

The current "Care Route" system is, structurally, the look the redesign must escape:
muted porcelain background (#f7f6f1), pine/celadon greens, Newsreader italic serif
with terracotta (clay) accents, hairline rails, uniform quiet cards. Every visible
token and component below is replaced — none survives as-is.

### Tokens (app/globals.css `:root`)
All of them: porcelain/paper/ink/pine/sea/celadon/clay palette, Figtree + Newsreader
font stack, radius scale (10/16/24), 76px header height, 1200px content width.

### CSS component classes (globals.css, 1349 lines — full rewrite)
- Typography: `.display` (Newsreader + clay italics), `.t-hero/.t-section/.t-sub`, `.eyebrow` (dash prefix), `.lede`, `.muted`, `.on-dark` scheme
- Layout: `.container`, `.section` variants (`--dark`, `--panel`, `--paper`), `.section-head`, `.hairline`
- Actions: `.btn` (`--primary` pine, `--secondary` outline, `--quiet`), `.text-link`, `.assurance`
- Surfaces: `.card`, `.panel`, `.note-disclosure`, `.tag-placeholder`
- Media: `.photo` (`--deep`, `__art`, `__brief`)
- Chrome: `.site-header`, `.site-nav`, `.nav-toggle`, `.mobile-menu`, `.site-footer` (pine-deep band)
- Home sections: `.hero`, `.trust-band`, `.journey` (+ rail), `.treatment-index`, `.split`, `.defs`, `.story`
- Interaction: `.faq` accordion, all `.field`/`.choice`/`.steps-progress`/`.upload-*`/`.form-callout`/`.status` form styles
- Misc: `.wordmark` (dot + type treatment), `.contact-routes`, `.crumbs`

### React components (components/)
Rebuilt with new markup + styling: `SiteHeader`, `SiteFooter`, `Wordmark`,
`CtaSection`, `Faq`, `Photo`, `Reveal`, `RouteRail` (deleted — signature of old
system), `icons.tsx`, and the full visual layer of `ConsultationFlow` (579 lines).

### Routes (all visible presentation replaced)
Home, `/treatments` + `[slug]`, `/hospitals` + `[slug]` (renamed, see §4),
`/how-it-works`, `/international-patients`, `/consultation`, `/contact`, `/about`,
`/privacy`, `/terms`, `/medical-disclaimer`, `not-found`.

### Assets
`public/medism-care-coordination.webp` (old-system illustration) and
`qa/home-full.jpeg` (stale screenshot of pre-dental build) — superseded; removed
once Higgsfield replacements are verified.

## 2. What stays (logic and data)

- `lib/content.ts` — the entire dental-first content model: specialty-keyed
  architecture (`SpecialtyKey` supports later plastic-surgery expansion),
  treatments taxonomy, dentist/clinic profile types with placeholder discipline,
  FAQs, consultation steps, upload requirements, emergency disclaimer copy.
- `app/api/consultation/route.ts` — submission handling.
- Consultation flow logic in `ConsultationFlow.tsx`: step state, validation,
  consent gating, failure fallback. Only its interface is rebuilt.
- Healthcare safeguards: no fabricated claims, Organization-only JSON-LD,
  placeholder tagging pattern, no dentist–patient relationship implied.
- Accessibility primitives as behaviors (skip link, `:focus-visible`, reduced-motion
  handling, aria patterns) — re-expressed in new styling.
- SEO plumbing: `robots.ts`, `sitemap.ts`, metadata templates (URLs updated for the
  route rename).

## 3. New design system proposal — "Morning Arch"

Verified against WCAG 2.2 AA (ratios computed this stage; see table).

### Palette
| Token | Hex | Role | Contrast evidence |
|---|---|---|---|
| `--ivory` | `#FFF9F0` | page base, warm luminous | ink on ivory 15.6:1 |
| `--paper` | `#FFFFFF` | raised surfaces, forms | ink on white 16.4:1 |
| `--ink` | `#231F1A` | text, dark band bg | white on ink 16.4:1 |
| `--ink-soft` | `#5A5248` | secondary copy | 7.3:1 on ivory |
| `--papaya` | `#C2410C` | primary action, key accents | white on papaya 5.2:1; as text on ivory 4.9:1 |
| `--apricot` | `#FFE4D1` | warm wash panels | ink on it 13.5:1 |
| `--mint` | `#DFF2E9` | fresh wash bands | ink on it 14.1:1 |
| `--eucalyptus` | `#1F6F54` | supporting accent text/icons | 5.8:1 ivory, 5.2:1 mint |
| `--sun` | `#FFE9B0` | highlight wash, never text | ink on it 13.7:1 |
| `--sky` | `#1465A8` | links, focus ring, selective | 5.8:1 ivory, 6.1:1 white |

Bright colors appear as generous washes and blocks behind AA-dark text; saturated
papaya is reserved for actions and small emotional accents. No greens-on-green
quietness, no terracotta-on-cream default.

### Typography
- Display/editorial serif: **Fraunces** (optical sizing, warm soft terminals) —
  hero, section statements, pull-quotes. Sparing, large, confident.
- Sans: **Hanken Grotesk** — body, UI, nav, forms. Highly readable, contemporary,
  slightly warm. Replaces Figtree/Newsreader entirely.
- Scale: hero clamp ~3–5.2rem, sections ~2.2–3.4rem, body 1.0625rem/1.65.
  Editorial statements may use Fraunces italic in papaya — checked at 4.9:1.

### Shape & layout ("the arch")
Signature element: the **rounded arch** — image masks and feature panels crowned
with a full-radius arch top. It reads as dental arch + doorway/gateway (travel),
and is the one bold recurring device. Everything else stays disciplined:
- Buttons: pill (999px), solid papaya primary / ink-outline secondary.
- Cards 20px radius, panels 28px; borders mostly replaced by surface-color changes
  and soft warm shadows (`rgba(35,31,26,.08)` range).
- Section rhythm: color-blocked bands — ivory → white → mint → apricot/sun → ink
  (final CTA) — instead of uniform porcelain. Generous spacing (96–140px desktop).
- Content width 1240px; editorial splits use asymmetric 7/5 and 5/7 grids.

### Iconography
Lucide-style rounded strokes in ink/eucalyptus, seated on small mint or apricot
wash chips — replaces the old thin bespoke icon set.

### Motion language (Stage 6 implementation)
Soft arch-mask image reveals, gentle parallax on hero media, quiet section color
transitions, journey progression line drawn on scroll, 150–300ms hovers.
`useGSAP` + `gsap.matchMedia()`; full content visible without JS or with
reduced motion. No scroll hijack, no beams/shimmer/particles.

## 4. Route rename

`/hospitals` → `/clinics` (data is already `clinicProfiles`; `hospitalProfiles` is
just an alias to delete). Permanent redirects in `next.config.ts` for
`/hospitals` and `/hospitals/:slug`. Sitemap, nav, and internal links updated.

## 5. Tooling status for Stage 2

- **Framer MCP: not connected in this session.** Searched connected MCP servers —
  no Framer tools are callable. Per the brief this is reported rather than
  simulated. Design-direction studies can proceed via an alternative (local
  high-fidelity HTML studies) only if you approve; otherwise connect Framer MCP
  before Stage 2.
- **Higgsfield: connected** (image/video generation + upscale/outpaint tools
  present). Credit estimate will be run before any generation.
- Next.js 16 docs confirmed at `node_modules/next/dist/docs/` (01-app guides);
  relevant guides will be read before route/metadata/redirect code in Stage 3+.
