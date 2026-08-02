# Stage 2 — Framer direction study and Higgsfield art system

## Framer design study

Built with Framer External Agents (Framer's official Claude Code connection —
their successor to a standalone Framer MCP) in project **Clean Lynx**
(`BU3FwmR28U7LMJpsCC0x`), page `/`. The study is composition-only; the Next.js
repo remains the production source of truth.

The study implements the full "Morning Arch" homepage composition at high
fidelity: header with pill CTA, arch-masked cinematic hero using the final
Higgsfield hero photograph, four-item service strip on white, mint emotional
split ("Understand your options before deciding."), mixed-size editorial
treatments grid (apricot feature card, photographic full-arch card, white and
sun-wash support cards), 7-step patient-journey grid with Fraunces numerals,
transparency panel ("A responsible proposal leaves nothing vague."),
verification-first dentist-profile card with arch portrait and explicit
"Placeholder — pending verification" tag, ink final CTA band and footer with
emergency disclaimer. Tokens and text styles were created as real Framer color
styles / text presets (Fraunces w/ optical sizing + SOFT axis, Hanken Grotesk).

Study snapshot: `qa/framer-study-home.jpg` (canvas screenshot, desktop breakpoint).

Decisions validated by the study:
- The arch mask reads as a brand signature at hero scale and at card scale.
- Color-blocked bands (ivory → white → mint → ivory → sun → ink) give the page
  rhythm without repetitive white card walls.
- Fraunces at 420–460 weight with SOFT=40 feels warm and premium, not stuffy.
- Journey works as a numbered grid without any animation.
- Papaya (#C2410C) survives as the single action color against all wash bands.

## Higgsfield photography system

Model: `soul_2` (text2image_soul_v2), 2K quality, style "General".
Account: Ultra plan. **Estimated cost: 3–4 credits. Actual: 2.16 credits**
(2375.87 → 2373.71) across 18 generations (10 initial + 8 rejection re-rolls).

Every image was downloaded and inspected at original resolution before
acceptance. Reject reasons logged below — the two systematic failure modes were
baked-in gibberish typography and malformed dental-arch anatomy, both called out
as rejection criteria in the brief.

### Accepted set (masters in `assets-src/higgsfield/`, gitignored; optimized
responsive derivatives to be produced in Stage 3)

| Asset | Scene | Job ID | Seed |
|---|---|---|---|
| hero-consultation.png | 1. Hero — patient + coordinator, clinic lounge, 16:9 | 25c34f60-d84b-42e8-93ed-0d41696870a2 | 615927 |
| hero-alternate.png | 1b. Hero alternate (posed to camera) | 285b0213-eefe-4bbe-a746-ed1e5d0e0b29 | 430948 |
| dentist-explains.png | 2. Dentist explaining a plan | f4230f58-00ff-4446-ab78-8fb97af62142 | 89831 |
| coordinator-review.png | 3. Patient + coordinator reviewing options | 04321b56-cc60-43a2-8468-7657b3b90e22 | 477576 |
| lab-craftsmanship.png | 4. Ceramist refining crown/bridge unit | 3b057e97-fe2b-4a98-9983-4c4ada46671e | 654263 |
| arrival-support.png | 5. Arrival greeting (tight crop) | 0620d0a8-5a24-4119-bff1-19eb03be3663 | 938176 |
| travel-planning.png | 6. Travel-planning still life (blank pages) | f468b641-c5da-4d26-817e-d2952a0d3c77 | 112016 |
| clinic-environment.png | 7. Calm clinic interior with arches | 6fe28626-8a82-475f-b0f2-f116fe305c93 | 107730 |
| aftercare-followup.png | 8. Remote follow-up at home | d5c2d666-0a57-43df-8739-9f7fc1cc04a7 | 955119 |
| story-portrait-placeholder.png | 9. Verified-story placeholder portrait | 4b2edffb-0453-4103-b94e-69a463aaeaf9 | 212140 |
| smile-woman-laughing.png | 10. Backlit joyful portrait (reference-mood addition, post-Stage 6) | a840638c-beb1-4a25-8fc0-904f29d80385 | 676895 |
| smile-woman-joy.png | 11. Head-back laughing portrait (alternate) | c5b9c6e1-9615-4506-81e7-2049466f6490 | — |
| smile-man-serene.png | 12. Serene backlit man portrait (Dovena-mood) | 9f5bfe64-7435-473e-b11e-53424d057db2 | 84002 |

### Rejection log

| Job | Reason |
|---|---|
| dbeaea1f… hero v1a | Gibberish headline typography baked into image |
| 739329fd… hero v1b | Same |
| 21a77b52… dentist v1 | Dental arch model rendered as floating malformed tooth horseshoe |
| 2465b196… lab v1 | Foreground cast was a circular "donut" of uniform teeth (anatomically wrong) |
| faecb737… arrival v1 | Greeting card with readable gibberish lettering |
| ceec8aa9… travel v1 | Gibberish on passport cover, booklet, and handwriting |
| 1296312a… arrival v3 | Negative prompt backfired: lanyard badges on everyone + gibberish departure boards |

Prompt-engineering notes for future re-shoots: never mention "text/headline
space" (it summons fake type); never name banned objects ("no lanyards" produces
lanyards) — describe clothing/props positively and crop tight instead; avoid
full dental arches — a single crown or small bridge unit in tweezers renders
credibly.

### Compliance check against the brief

No blood, needles, drilling, procedures, distress, fabricated clinic branding,
readable patient records, invented certifications, staged handshakes,
crossed-arm portraits, luxury-resort tourism, holograms, before/afters, or
testimonials. Smiles are natural; no unnaturally white veneer rows. The one
borderline case (arrival v2 badge micro-text) was rejected.

Provenance: all images synthetic, generated 2026-08-01/02 via Higgsfield
(soul_2) under the account's Ultra plan. They depict fictional people and must
never be captioned as real patients, dentists, or staff. The story portrait is
explicitly a placeholder pending a real, consented patient story.

## Open items for Stage 3

- Optimize accepted masters to responsive WebP/AVIF in `public/images/`.
- Framer free-plan limits publishing; the study is canvas-only (screenshots in `qa/`).
- Mobile-breakpoint study deferred to Stage 3 implementation (Framer desktop
  breakpoint only; the production build is mobile-first regardless).
