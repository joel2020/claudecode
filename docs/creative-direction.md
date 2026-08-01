# Medism — Creative Direction (dental-first)

**Brand idea:** *Confident smiles, carefully coordinated.*
**Supporting thought:** *Expert dental care, planned around you.*

## The concept: the Care Route

Medism's job is to turn an unfamiliar, anxiety-laden decision — trusting your
teeth to a clinic in another country — into one clear route. The design makes
that literal. A single fine sea-green line with named checkpoints — the **Care
Route** — is the site's signature device. It appears as the drawn rail beside
the seven-step patient journey, as quiet dotted paths inside image
placeholders, and ends at a clay-colored node: the human moment of aftercare.

The concept survives the pivot from the earlier general-medical build because
it describes coordination, not a clinical vertical. What changes is everything
the route passes through: the checkpoints, copy, imagery, and content model
are now dental, and the emotional register is tuned to dental anxiety
specifically.

## Designing for dental anxiety

Every audience for this site is assumed anxious about pain, safety, quality,
hidden costs, travel, recovery, or trusting an unfamiliar clinic. Design
responses, in order of importance:

1. **Nothing sudden.** No urgency devices, countdowns, or promotional
   interruptions. Motion is slow, small, and optional.
2. **Explain before asking.** Every form step states why the information is
   requested. Every upload sits beside a privacy reassurance.
3. **Show the process, not the drill.** Imagery is consultation,
   craftsmanship, and life after treatment — never instruments in mouths.
4. **Honesty as the aesthetic.** Unverified facts are visibly labeled rather
   than faked. "Published only after verification" is a trust feature.
5. **A person, not a funnel.** The recurring emotional register is *"someone
   responsible, nearby"* — a named coordinator, a clear next step, permission
   to decide slowly.

## Voice

Calm, compassionate, precise. Short sentences in globally understandable,
translation-friendly English. The site never sells; it explains.

- Say: "Understand your options before deciding."
- Never: "Get a perfect smile for a fraction of the price."
- Say: "Treatment recommendations depend on a professional assessment."
- Never: any guarantee of suitability, results, duration, price, or recovery.

## Palette

Warm porcelain field; deep pine ink; pine for trust and action; sea for the
route; celadon for quiet panels; **clay reserved for human moments** (the
italic phrase in a headline, the aftercare node, disclosure notes). Clay is
never decoration and never a generic CTA color.

This deliberately refuses the standard dental-clinic look: no bright cyan, no
blanket white-and-blue, no glowing gradients. The palette reads as mineral,
botanical, and calm — checked against the ui-ux-pro-max database's healthcare
guidance (calm, trustworthy, accessible) while rejecting its default cyan in
favor of the brief's warm-ivory-and-eucalyptus direction.

## Typography

- **Newsreader** (editorial serif, optical sizing, real italics) — large
  statements only: hero, section headlines, the patient-story quote. Its
  italic in clay is the brand's single expressive gesture.
- **Figtree** (warm humanist sans; the database's healthcare-matched face) —
  everything else: UI, body, navigation, forms.

The serif is confined to large statements so body reading stays entirely in
the legible sans. Base body size 17px, line-height 1.65, generous measure.

## Photography direction

Documentary, unposed, warm natural light. What the camera sees:

- Dentists explaining treatment across a desk, patient's shoulder in frame
- Hands at work: a technician shading a crown, a scan reviewed on screen
- Calm, modern, hygienic clinic spaces with daylight
- International patients welcomed — arrival, greeting, orientation
- Life after treatment: ordinary moments, natural believable smiles
- Companions present: a partner in the waiting room, a translated conversation

Never: drilling, needles, blood, open-mouth clinical close-ups, floating
teeth, cartoon dental icons, unrealistically white veneers, crossed-arm doctor
poses, staged handshakes, luxury-tourism framing, before/after sliders,
holograms — anything that increases dental anxiety or promises transformation.

Until Medism supplies rights-confirmed photography, every image slot renders
an art-directed placeholder that states the required shot — the photo brief
ships inside the design (`components/Photo.tsx`).

## The aesthetic risk

A healthcare site that shows its placeholders. Unverified statistics, partner
names, credentials, and testimonials are not faked — the design treats
"published only after verification" as a visible trust feature: coral
disclosure notes, labeled profile templates, a reserved patient-story stage.
The honesty is the luxury.

## Motion principles

Refinement, not spectacle. Gentle parallax, soft mask reveals, the Care Route
rail drawing itself on scroll, quiet hover feedback. Everything works with
animation off; `prefers-reduced-motion` is honored via `gsap.matchMedia()`.
No scroll hijacking, no constant movement, no loaders, no text shredding.

## Specialty extensibility

Dental is unmistakably dominant at launch. The content model, navigation, and
templates are specialty-keyed: plastic surgery is a registry entry with status
`in-development`, surfaced — if at all — as a single quiet "Additional
specialties in development" line. Activating it later adds a nav item and
treatment records; it does not add a redesign.
