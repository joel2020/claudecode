# Medism Design System — "Care Route"

Source of truth for tokens and component rules. Implemented in
`app/globals.css`; content shapes in `lib/content.ts`. Grounded in the
ui-ux-pro-max database (healthcare typography match: Figtree; style direction:
restrained minimalism, spacious density; anti-patterns: neon, motion-heavy,
AI-gradient) with the palette steered to the brief's warm-ivory + eucalyptus
direction instead of the database's default healthcare cyan.

## 1. Color tokens

| Token | Hex | Role |
|---|---|---|
| `--porcelain` | `#f7f6f1` | Page background — warm mineral white |
| `--paper` | `#ffffff` | Cards, form surfaces |
| `--ink` | `#14312c` | Primary text — deep pine ink |
| `--ink-soft` | `#4a6560` | Secondary copy |
| `--pine` | `#1f5b4e` | Primary action, trust cue |
| `--pine-hover` | `#174a3f` | Primary action hover |
| `--pine-deep` | `#0f332c` | Dark bands, footer |
| `--sea` | `#5c9188` | Care Route lines, decorative detail |
| `--sea-soft` | `#8fb3ab` | Route detail on dark |
| `--celadon` | `#e3ede6` | Quiet panels, selected states |
| `--line` | `#d3ddd5` | Borders, dividers |
| `--clay` | `#c8614d` | **Reserved**: human moments, disclosure, aftercare node |
| `--focus` | `#0b6fbe` | Focus ring (deliberately off-palette for visibility) |
| `--danger` | `#a63f35` | Errors |
| `--success` | `#2c6e49` | Confirmation |

### Verified contrast (WCAG 2.2 AA)

Computed 2026-08-01:

| Pair | Ratio | Requirement | Status |
|---|---|---|---|
| ink / porcelain | 12.89:1 | 4.5:1 body | Pass |
| ink-soft / porcelain | 5.84:1 | 4.5:1 body | Pass |
| ink-soft / paper | 6.32:1 | 4.5:1 body | Pass |
| pine / porcelain | 7.28:1 | 4.5:1 body | Pass |
| white / pine (buttons) | 7.88:1 | 4.5:1 | Pass |
| porcelain / pine-deep (dark bands) | 12.68:1 | 4.5:1 | Pass |
| clay / porcelain | 3.68:1 | 3:1 **large text only** | Pass (restricted) |
| sea / porcelain | 3.31:1 | decorative only, never text | N/A |
| focus / porcelain | 4.81:1 | 3:1 non-text | Pass |
| danger / paper | 6.21:1 | 4.5:1 | Pass |
| disclosure text `#6b3325` / `#f6e7e2` | 8.21:1 | 4.5:1 | Pass |

Rules: `--sea` never carries text. `--clay` as text only at display sizes
(≥24px / ≥18.66px bold) or on `--clay-soft` via the darker `#6b3325`/`#984a38`.

## 2. Typography

| Role | Face | Usage |
|---|---|---|
| Display (`.display`) | Newsreader (variable, optical sizing) | Hero, section headlines, story quote. Weight ~420, tight leading. Italic + clay = the single expressive gesture. |
| UI & body | Figtree | Everything else. Base 17px (`1.0625rem`), line-height 1.65. |

Scale (fluid clamps, defined in `globals.css`): `.t-hero` 2.5–4.4rem ·
`.t-section` 1.9–3rem · `.t-sub` 1.45–1.9rem · `.lede` 1.1–1.3rem · eyebrow
0.78rem caps. Measure capped at `--measure: 680px`.

## 3. Layout & spacing

- Container `--content: 1200px`, gutter `100% - 2.5rem`, mobile-first.
- Section rhythm: `.section` clamp(4rem→7.5rem); `--tight` variant.
- Radii: controls 10px, cards 16px, panels 24px.
- Surfaces alternate porcelain → paper → celadon → pine-deep; dark bands use
  `.on-dark` scope.

## 4. Signature element: the Care Route

A 2px sea-green rail with numbered checkpoint nodes (56px circles on paper)
and a terminal clay node. Usage: the seven-step journey (`RouteRail` +
`.journey__*`), dotted paths inside `Photo` placeholders, and — sparingly —
section transitions. The rail's scroll-draw is progressive enhancement; the
static rail is complete without it.

## 5. Component inventory (reuse from the previous build)

| Component | Status for dental rebuild |
|---|---|
| `SiteHeader`, `SiteFooter` | Reuse; nav now derives from the specialty registry |
| `Reveal` | Reuse as-is (motion primitive, reduced-motion aware) |
| `RouteRail` | Reuse; extend to 7 checkpoints, pinned-storytelling variant in the motion pass |
| `ConsultationFlow` | Adapt to the 7 dental steps in `consultationSteps` |
| `Photo` | Reuse; new dental art-direction briefs |
| `Faq`, `CtaSection`, `Wordmark`, `icons` | Reuse with new content |

New components expected in stages 4–5: dentist/clinic profile card, treatment
proposal ("transparency") section, trust band variant, patient-story stage.
Registry components (21st.dev / Magic UI) are surveyed in stage 3 and must be
restyled to these tokens before use.

## 6. Content architecture (specialty-keyed)

`lib/content.ts` exports a `specialties` registry; `dental` is the only
`active` entry. All treatment records carry `specialty: SpecialtyKey`.
Navigation, treatment indexes, and sitemap entries derive from the registry.

**Adding plastic surgery later** = set its registry status to `active`, give
it an index route, and add `Treatment` records with
`specialty: "plastic-surgery"`. No component, template, or token changes.

Route plan (finalized in stages 4–5): `/treatments` (dental index) ·
`/treatments/[slug]` · `/hospitals` → renamed to `/dentists` (profiles) ·
`/international-patients` (travel support) · `/how-it-works` ·
`/consultation`. `professional-programs` is removed from the IA.

## 7. Non-negotiables

- No invented facts: placeholders are labeled (`.tag-placeholder`,
  `.note-disclosure`), never faked.
- No guarantee language anywhere: suitability, results, duration, price,
  recovery.
- Focus visible everywhere; touch targets ≥44px (buttons 52px); forms with
  visible labels, inline errors, explained data collection.
- Reduced motion: full experience without animation; `gsap.matchMedia()`.
- Performance: system of two font families max, responsive media, reserved
  image space (CLS < 0.1), LCP < 2.5s, INP < 200ms.
