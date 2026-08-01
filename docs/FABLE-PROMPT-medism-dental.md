# Fable 5 prompt — Medism dental-first rebuild

Paste everything below the line into Fable 5, running in `/Users/joel/claudecode`.

---

Rebuild the Medism website in this repository as a **dental-first** care-coordination brand.

## Read this first — repository context

The site already exists in this working directory. Do not scaffold a new project and do not go looking for the site elsewhere.

- **Location:** `/Users/joel/claudecode` (this repo)
- **Stack:** Next.js 16.2.12 (App Router), React 19.2.4, Tailwind CSS 4, TypeScript, GSAP 3.15 with `@gsap/react`
- **Existing routes:** `app/{about,consultation,contact,hospitals,how-it-works,international-patients,medical-disclaimer,privacy,professional-programs,terms,treatments}`, plus `[slug]` detail routes under `treatments/` and `hospitals/`, and `app/api/consultation`
- **Existing components:** `SiteHeader`, `SiteFooter`, `ConsultationFlow`, `CtaSection`, `Faq`, `Photo`, `Reveal`, `RouteRail`, `Wordmark`, `icons`
- **Content source:** `lib/content.ts`
- **Uncommitted:** the entire build is uncommitted on top of `338043c Initial commit from Create Next App`. Commit a restore point before making changes.

**`AGENTS.md` in this repo states this is not the Next.js in your training data.** Before writing any Next.js-specific code (routing, metadata, caching, server actions, image handling), read the relevant guide in `node_modules/next/dist/docs/` and follow it. Heed deprecation notices.

## The problem you are fixing

A prior session built this site against the **wrong brief**. It implemented general medical tourism — cardiology, oncology, transplants, "World-class care, coordinated around you", hospital directories, international-patient services, professional programs.

The actual strategy is **dental first**. There are currently **zero** occurrences of "dental" or "implant" in `app/` or `components/`.

Your job is to convert this into a dental-first site — reusing the component architecture, design tokens, motion system, and consultation flow that already work, and replacing the clinical vertical, content model, information architecture, and copy.

Preserve and reuse: the component shell, `Reveal`/`RouteRail` motion primitives, the multi-step consultation pattern, accessibility behavior, and route conventions.
Replace: `lib/content.ts` entirely, all treatment taxonomy, all hero and section copy, and the specialty framing throughout.

## Required skill usage — mandatory

A prior attempt at this build invoked exactly **one** skill across 772 messages, despite stating it would use several. Announcing an intention to use a skill is not using it. **Load each of these with the Skill tool before the work it governs, and state which one you are invoking as you do.**

1. **`ui-ux-pro-max`** — **before** any palette, typography, spacing, or layout decision. Query it for the healthcare/medical product type and for the Next.js/React/Tailwind stack. Use its returned palette and font-pairing recommendations as the basis of the design tokens; do not invent a palette first and retrofit.
2. **`frontend-design`** — before committing to the aesthetic direction.
3. **`gsap-core`**, **`gsap-scrolltrigger`**, **`gsap-react`** — before writing any animation. `gsap@3.15` and `@gsap/react` are already installed. Follow the skills' `useGSAP` cleanup and `gsap.matchMedia()` reduced-motion patterns rather than recalled GSAP idioms.
4. **`web-interface-guidelines`** — during component implementation.
5. **`impeccable`** — run `/impeccable critique` and `/impeccable audit` against the homepage and consultation flow once built. An `impeccable` PostToolUse hook already lints every write in this repo; that deterministic detector is **not** a substitute for the skill's design guidance.

Do not use Three.js or WebGL for this build.

## Component sourcing — 21st.dev and Magic UI

Two component MCPs are configured. Use them for polished primitives instead of hand-rolling everything, but **subordinate them to the design system** — they are a parts bin, not the aesthetic.

- **`21st` MCP** — HTTP server at `https://21st.dev/api/mcp`, already configured with credentials. Use it to search for and pull component implementations.
- **Magic UI MCP** (`mcp___magicuidesign_mcp__*`) — `searchRegistryItems`, `listRegistryItems`, `getRegistryItem`. Use `searchRegistryItems` by use case, then `getRegistryItem` with `includeSource: true` to retrieve the implementation.

Rules for using them:

- Search these registries **before** writing a non-trivial interactive component from scratch — accordions, marquees, multi-step forms, reveal wrappers, testimonial layouts, navigation.
- **Restyle every pulled component to the Medism tokens.** These registries lean toward the exact aesthetic this brief forbids — glowing gradients, animated beams, shimmer effects, neon borders, particle backgrounds. Strip that. Keep the structure, interaction model, and accessibility behavior; replace the visual treatment entirely.
- Reject anything that reads as a technology-startup or AI-product flourish. This is a healthcare brand for anxious patients.
- Verify each pulled component meets WCAG 2.2 AA before use — registry components are not reliably accessible.
- Do not add a dependency a component pulls in unless it is genuinely needed. Prefer adapting the source into `components/`.

If a 21st.dev or Magic UI component conflicts with the reduced-motion requirement or the calm-over-spectacle direction, do not use it.

## Business strategy

Medism is a medical-travel and care-coordination brand launching with a focused **dental** offering. **Plastic surgery** is phase two, introduced only after the dental business gains traction.

- Dental must be unmistakably dominant at launch.
- Architect content and navigation so plastic surgery can be added later as a second top-level specialty **without a redesign** — use a specialty-keyed content model and modular navigation, not hardcoded dental routes.
- If plastic surgery appears at all pre-launch, it is a subtle "Additional specialties in development". Do not promote it.
- Do not build a generic medical-tourism marketplace, and do not imply Medism currently offers every specialty.

Medism is a **coordination service**. It does not replace the treating dentist and does not guarantee clinical results.

## Brand idea

**"Confident smiles, carefully coordinated."**
Supporting: "Expert dental care, planned around you."

## Audiences

1. Patients seeking implants, restorations, or full-arch rehabilitation
2. International patients considering travel for dental treatment
3. Patients seeking high-quality care at more accessible cost
4. People comparing clinics, specialists, plans, and destinations
5. Family members helping someone decide

Assume anxiety about pain, safety, quality, hidden costs, travel, recovery, and trusting an unfamiliar clinic. Address those directly and calmly.

## Conversion

- Primary CTA: **"Request a Dental Consultation"**
- Secondary CTA: **"Send Your Dental Records"**
- Optional third: **"Chat With a Care Coordinator"**

No "Book now", "Limited offer", or "Get your perfect smile today".

## Creative direction

Polished, editorial, quietly confident. Clinically credible, warm, premium but approachable, precise, transparent, internationally capable, calm rather than promotional.

**Avoid the standard dental-clinic aesthetic:** oversized smiling stock faces, floating teeth, cartoon dental icons, decorative before/after sliders, bright cyan gradients, blanket white-and-blue layouts, artificially perfect veneers, glowing medical graphics, generic feature-card grids, discount-led cosmetic-tourism messaging.

**Palette:** warm ivory or mineral white; deep charcoal or midnight navy; muted teal, eucalyptus, or mineral green; one restrained warm accent.

**Typography:** a highly readable modern sans paired with an elegant editorial serif used selectively for major statements, patient stories, and emotional moments. Generous negative space, crisp structure, subtle dividers.

## Photography

Communicate trust, craftsmanship, consultation, and human care: dentists explaining treatment, calm consultations, precise craftsmanship, modern hygienic environments, natural believable smiles, patients supported before and after, international patients being welcomed, life after treatment without exaggerated transformation.

**Avoid:** graphic treatment imagery, needles, blood, drilling, visibly invasive procedures, unrealistically white smiles, crossed-arm doctor poses, staged handshakes, luxury-tourism framing, futuristic holograms, anything that increases dental anxiety.

Use clearly labeled placeholders with specific art-direction notes where real assets are unavailable.

## Homepage

**Header** — logo, Dental Treatments, How It Works, Dentists & Clinics, Travel Support, Patient Stories, About, Contact, primary CTA. Content model must allow "Plastic Surgery" to become a second top-level specialty later.

**Hero** — calm cinematic image or short silent film of genuine human interaction, not a close-up of teeth.
Headline: "Expert dental care, coordinated around you."
Copy: "Medism helps you understand your dental options, connect with carefully selected professionals, and coordinate every step of your treatment journey."
CTAs: "Request a Dental Consultation" / "Explore Dental Treatments"
Reassurance: "Confidential case review • Personal care coordinator • Clear next steps"

**Trust layer** — verified signals only: clinic partners, dentist qualifications, accreditations, locations served, languages, coordination capabilities, genuine feedback.

**Dental treatments** — implants; All-on-4 / full-arch; crowns and bridges; veneers; smile rehabilitation; cosmetic dentistry; orthodontics and clear aligners; root canal; periodontal care; oral surgery; preventive and restorative. Only treatments Medism can genuinely coordinate.

Each treatment page: who it may be relevant for; what it generally involves; information required for initial review; questions patients should ask; possible stages; travel and recovery considerations; what Medism coordinates; route to request a professional assessment. **No guaranteed suitability, results, duration, price, or recovery time.**

**Patient journey** — 1) Tell us what you need 2) Share photographs, scans, X-rays, records 3) Receive an initial professional review 4) Understand the proposed options 5) Plan appointments and travel 6) Support during treatment 7) Aftercare and follow-up. A guided visual pathway, not seven cards. The existing `RouteRail` component is a starting point. Must remain fully usable without animation.

**Why Medism** — finding an appropriate professional; coordinating case information; comparing options; journey planning; appointment coordination; travel and accommodation; language assistance; support for companions; aftercare. Do not claim Medism independently verifies clinical quality unless a documented process exists.

**Dentists and clinics** — reusable profile system: name, photograph, qualifications, specialty, professional registrations, languages, years of experience, clinic and location, treatment areas, accreditations, consultation route. Never fabricate credentials or imply exclusive partnership.

**Treatment planning and transparency** — what a responsible proposal contains: clinical findings, recommended treatment, alternatives, stages, number of visits, travel requirements, cost inclusions and exclusions, aftercare, risks and limitations, who performs the treatment. This section is what separates Medism from sales-led competitors.

**International travel support** — record collection, remote consultation coordination, appointment scheduling, travel planning, visa documentation where applicable, transport, accommodation, language support, companion assistance, recovery planning, remote follow-up. Answer: "Who will help me before, during, and after the trip?"

**Patient story** — one art-directed section focused on the decision process, care experience, support, and recovery — not a dramatic smile transformation. Verified stories only; otherwise a clearly labeled placeholder. Before/after imagery requires documented consent and honest, consistent conditions.

**FAQ** — how to request an assessment; which photographs or records to send; whether a panoramic X-ray or CBCT is needed; who decides suitability; comparing options; how many visits; how prices are confirmed; what a quotation includes; travel and accommodation help; follow-up care; how medical information is protected; whether Medism is the treating provider.

**Final CTA** — "Take the first step with a clearer understanding of your options." / "Share your needs with Medism. A care coordinator will explain what information is required and help arrange the appropriate next step." Privacy reassurance beside every upload action.

**Footer** — dental treatments, dentists and clinics, patient process, international travel support, about, contact, privacy, medical disclaimer, terms, cookie controls, emergency disclaimer. State clearly Medism is not an emergency service.

## Consultation flow

Adapt the existing `ConsultationFlow` component. Steps: 1) location and preferred language 2) dental concern or desired treatment 3) previous diagnosis or treatment 4) current symptoms and urgency 5) preferred contact method 6) optional upload of photographs, X-rays, scans, records 7) consent and submission.

Explain why each item is requested. Collect no more health information than necessary. Include accessible validation, secure upload patterns, upload progress, file requirements, clear consent, submission confirmation, expected response process, and an alternative contact route on failure. Do not imply submission creates a dentist–patient relationship.

## Motion

Gentle image parallax, image-mask reveals, controlled clip-path transitions, soft typography reveals, subtle color transitions, pinned patient-journey storytelling, quiet hover feedback, smooth anchor navigation. GSAP and ScrollTrigger where useful.

Respect `prefers-reduced-motion` via `gsap.matchMedia()`. The complete experience must work without animation.

Avoid scroll hijacking, constant movement, long loaders, cursor distractions, excessive text splitting, graphic clinical animation, and anything that increases dental anxiety. Motion is refinement, not spectacle.

## Accessibility and mobile

Mobile-first, WCAG 2.2 AA. Semantic structure, keyboard navigation, visible focus states, strong contrast, accessible forms and file uploads, descriptive alt text, correct heading hierarchy, accessible menus and accordions, reduced-motion support, captions for video, no autoplay audio, large touch targets, readable text, obvious contact actions, and good performance on slower international connections.

## Healthcare safeguards

Do not invent or exaggerate clinical outcomes, success rates, treatment suitability, dentist credentials, clinic affiliations, testimonials, accreditations, prices or savings, treatment duration, recovery time, or guarantees.

No manipulative urgency, fear, shame, unrealistic beauty standards, or guaranteed-result language.

Clearly distinguish general educational content, Medism's coordination services, professional dental advice, and final clinical recommendations. Flag all content requiring legal, clinical, privacy, or client approval.

## Voice

Globally understandable English. Calm, compassionate, clear, precise, respectful, translation-friendly, confident without exaggeration. Short sentences.

Prefer "Understand your options before deciding" over "Get a perfect smile for a fraction of the price".
Prefer "Treatment recommendations depend on a professional assessment" over "You are guaranteed to be suitable".

## Performance and SEO

Reusable components and design tokens, responsive media, minimal layout shift, strong Core Web Vitals (LCP < 2.5s, CLS < 0.1, INP < 200ms), accessible forms, clear loading and error states, SEO-friendly URLs, appropriate metadata, internal linking, analytics on key conversion actions, secure handling of submitted records, no unnecessary libraries.

Scalable SEO pages for dental treatments, dental concerns, dentists, clinics and destinations, international patient guides, treatment-planning guides, travel and aftercare, and FAQs. No thin or repetitive destination pages, no misleading price pages. Use structured data only where content genuinely qualifies.

## Execution order

The previous attempt ran 190 turns and was interrupted mid-way through documentation. Work in this order and **stop for review after each stage** rather than attempting everything in one pass:

1. Commit a restore point. Read `AGENTS.md` and the relevant `node_modules/next/dist/docs/` guides. Invoke `ui-ux-pro-max` and `frontend-design`.
2. Creative direction + design-system spec + dental content model in `lib/content.ts`. **Stop for review.**
3. Survey the `21st` and Magic UI registries for the interactive primitives this build needs; list what you intend to pull and how you will restyle it. **Stop for review.**
4. Homepage rebuild, dental-first, reusing existing components. **Stop for review.**
5. Treatment and dentist/clinic detail templates; consultation flow adaptation. **Stop for review.**
6. Motion pass with the GSAP skills; accessibility pass; SEO and metadata.
7. `/impeccable critique` and `/impeccable audit`; QA pass; placeholder and unverified-claim inventory.

Do not write the documentation deliverables until the implementation is reviewed.

## Deliverables

Creative direction; design system flexible enough for dental now and plastic surgery later; homepage IA; responsive homepage; dental treatment templates; dentist and clinic profile templates; consultation and record-upload flow; international patient journey; motion spec; accessibility behavior; SEO architecture; plastic-surgery expansion plan; inventory of missing assets, claims, and approvals; final QA review.

The visitor should leave thinking: *"I understand how Medism can help, I feel safe speaking with them, and I know exactly what to do next."*
