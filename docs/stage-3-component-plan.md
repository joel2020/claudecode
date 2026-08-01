# Stage 3 — Registry Component Plan (21st.dev & Magic UI)

Survey date: 2026-08-01. Magic UI surveyed via its MCP (77 components
enumerated); 21st.dev surveyed via its public registry (the 21st MCP server is
not connected in this session — noted under Risks).

Governing rule: registries are a parts bin, not the aesthetic. Everything
pulled is restyled to the Care Route tokens (`docs/design-system.md`) and must
pass WCAG 2.2 AA and the reduced-motion requirement before use.

## A. Components to pull and adapt

### 1. Stepper structure — Origin UI Stepper (21st.dev)
- **Source:** `21st.dev/@originui/components/stepper` (vertical + horizontal
  variants; icons-only dependency; aria-live step announcements).
- **Appears in:** the consultation flow's progress header (`ConsultationFlow`),
  replacing the current bare progressbar with named, per-step markers; the
  same primitives back any future multi-step pattern.
- **Restyle:** strip shadcn utility classes → Care Route tokens: paper nodes,
  `--sea` connectors, `--pine` active state, 56px touch targets to match the
  journey nodes. No animation beyond the existing 0.3s width/color ease.
- **Dependencies:** none adopted (icon imports replaced by our `icons.tsx`).
- **Concerns:** verify keyboard focus order and `aria-current="step"` on
  adaptation; registry a11y is not trusted as shipped.

### 2. Upload interaction — react-dropzone pattern (21st.dev)
- **Source pattern:** `21st.dev/@ephraimduncan/components/file-upload-1
  /multi-file-dropzone` and `@haydenbleasel/components/dropzone` — both are
  thin skins over `react-dropzone`.
- **Appears in:** consultation step 6 (photographs, X-rays, scans, records).
- **What we adopt:** the `react-dropzone` dependency itself (small, mature,
  zero transitive deps, keyboard/SR-tested) plus the candidates' file-list
  and progress markup structure. We do **not** adopt their shadcn component
  stack (button/card/input/label/select/separator) — our `.upload-zone`,
  `.upload-list`, and `.field` CSS already exists.
- **Restyle:** dashed `--sea` border, celadon selected state, clay reserved
  for the privacy note. Upload progress uses the existing
  `.steps-progress__bar` treatment.
- **Concerns:** progress + errors must be announced (`aria-live="polite"`);
  file requirements stated in text (JPG/PNG/HEIC/PDF/DICOM, 25 MB) — already
  modeled in `uploadRequirements` in `lib/content.ts`.

That is the entire pull list. Nothing else in either registry beats what the
repo already has.

## B. Surveyed and rejected

| Candidate | Registry | Why rejected |
|---|---|---|
| `blur-fade`, `text-reveal` | Magic UI | Require `motion` (framer-motion) — a second animation runtime beside GSAP; no reduced-motion handling. Existing GSAP `Reveal` already does this job. |
| `marquee` | Magic UI | Only honest use is verified partner logos; none exist at launch. Constant motion also conflicts with the calm direction. |
| `number-ticker` | Magic UI | No verified statistics exist; animated counters imply claims we cannot make. |
| `hero-video-dialog` | Magic UI | Hero spec is a calm inline silent film, not click-to-play modal. |
| `dotted-map` (+`svg-dotted-map` dep) | Magic UI | Attractive for the travel section, but "locations served" is a verified-signals item with no verified data yet. Revisit post-verification. |
| Beams, shimmer, neon, meteors, particles, retro grids, glare, sparkles, smooth-cursor, pulsating/rainbow buttons (~50 items) | Magic UI | Exactly the technology-startup flourish the brief forbids for an anxious-patient healthcare brand. |
| Accordion/FAQ components (69 surveyed) | 21st.dev | Existing `Faq` uses native `<details>/<summary>` — accessible, zero-JS. Radix accordions add deps without adding capability. Smooth open/close comes free via modern CSS (`interpolate-size: allow-keywords`) in the motion pass. |
| Multistep-form composites (Ruixen, Jatin Yadav, etc.) | 21st.dev | Opinionated login/checkout flows with heavy styling; our `ConsultationFlow` logic (validation, state, API) already works and only needs the 7-step dental content + stepper header. |
| Timeline/`timeline-rail` components | 21st.dev | `RouteRail` is the signature element; replacing it with a generic timeline would erase the brand device. |
| Testimonial layouts | both | The patient story is a bespoke art-directed editorial stage with strict verification rules — registry testimonial cards fight both. |
| Navigation/mega-menus | 21st.dev | Flat nav + specialty registry covers the two-specialty future; a mega menu is dead flexibility today. |

## C. Keep as-is (existing components already suitable)

`SiteHeader`, `SiteFooter`, `Reveal`, `RouteRail` (extended to 7 stops in
stage 4), `Faq`, `CtaSection`, `Photo`, `Wordmark`, `icons` — content changes
only, no structural replacement.

## D. Net new dependencies

| Package | Why | Size/risk |
|---|---|---|
| `react-dropzone` | Accessible drag-and-drop file selection for medical records | ~small, no transitive runtime deps, MIT, actively maintained |

No other dependency is added by this plan. GSAP + @gsap/react (already
installed) cover all motion.

## E. Risks & notes

- **21st MCP server not connected in this session** — survey done via the
  public registry; component source is visible there, so stage-5 adaptation
  can proceed by hand-porting. If the MCP's authenticated pulls are wanted
  instead, it needs to be authorized in an interactive session (`claude mcp`).
- Registry components are adapted into `components/` under our conventions —
  never installed via `npx shadcn add` (which would scaffold a parallel
  ui/ directory and utils we don't use).
- Anything adapted is re-verified for AA contrast, focus visibility, touch
  target size, and reduced-motion before it ships.
