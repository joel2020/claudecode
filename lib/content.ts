/**
 * Medism content model — dental-first, specialty-keyed.
 *
 * Rules:
 * 1. Nothing here may state an unverified fact. Statistics, partner names,
 *    dentist credentials, accreditations, testimonials, prices, treatment
 *    durations, and outcomes are never invented. Anything awaiting client
 *    confirmation is marked `placeholder: true` and rendered with a visible
 *    "awaiting verification" treatment.
 * 2. No guarantees. Copy never promises suitability, results, visit counts,
 *    prices, or recovery times. Suitability is decided only by the treating
 *    dentist after a professional assessment.
 * 3. Specialty-keyed. Dental is the only active specialty at launch. Plastic
 *    surgery is registered as "in-development" and is never promoted. Adding
 *    a second specialty means adding a registry entry and treatment records —
 *    not a redesign.
 */

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */

export const site = {
  name: "Medism",
  tagline: "Confident smiles, carefully coordinated.",
  supporting: "Expert dental care, planned around you.",
  description:
    "Medism helps you understand your dental options, connect with carefully selected professionals, and coordinate every step of your treatment journey — from record review and remote consultation to travel, treatment, and aftercare.",
  url: "https://medism.care",
  /**
   * Contact routes. Values are placeholders until Medism supplies verified
   * production details — the UI labels them accordingly.
   */
  contact: {
    email: null as string | null, // PLACEHOLDER: production email pending
    phone: null as string | null, // PLACEHOLDER: production phone pending
    whatsapp: null as string | null, // PLACEHOLDER: WhatsApp Business number pending
  },
};

/* ------------------------------------------------------------------ */
/* Specialties registry                                                */
/*                                                                     */
/* The registry is the single point where a new clinical vertical is   */
/* introduced. Navigation, treatment indexes, and sitemaps derive from */
/* it. Plastic surgery launches later by flipping its status to        */
/* "active" and adding treatment records with specialty: "plastic-     */
/* surgery" — no layout or component changes required.                 */
/* ------------------------------------------------------------------ */

export type SpecialtyKey = "dental" | "plastic-surgery";

export type Specialty = {
  key: SpecialtyKey;
  status: "active" | "in-development";
  label: string;
  navLabel: string;
  /** Index route for this specialty's treatments. */
  href: string;
  short: string;
};

export const specialties: Specialty[] = [
  {
    key: "dental",
    status: "active",
    label: "Dental",
    navLabel: "Dental Treatments",
    href: "/treatments",
    short: "Implants, restorations, orthodontics, and full-arch rehabilitation, coordinated end to end.",
  },
  {
    key: "plastic-surgery",
    status: "in-development",
    label: "Plastic Surgery",
    navLabel: "Plastic Surgery",
    href: "/treatments", // route assigned when the specialty becomes active
    short: "Additional specialties in development.",
  },
];

export const activeSpecialties = specialties.filter((s) => s.status === "active");

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/*                                                                     */
/* Specialty entries are generated from the registry; shared entries   */
/* follow. When plastic surgery activates, its nav item appears here   */
/* automatically.                                                      */
/* ------------------------------------------------------------------ */

export const nav = [
  ...activeSpecialties.map((s) => ({ label: s.navLabel, href: s.href })),
  { label: "How It Works", href: "/how-it-works" },
  { label: "Dentists & Clinics", href: "/hospitals" }, // route renames to /dentists in the template stage
  { label: "Travel Support", href: "/international-patients" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Conversion actions                                                  */
/* ------------------------------------------------------------------ */

export const ctas = {
  primary: { label: "Request a Dental Consultation", href: "/consultation" },
  secondary: { label: "Send Your Dental Records", href: "/consultation?start=records" },
  tertiary: { label: "Chat With a Care Coordinator", href: "/contact" },
  explore: { label: "Explore Dental Treatments", href: "/treatments" },
};

export const hero = {
  headline: "Expert dental care, coordinated around you.",
  copy: "Medism helps you understand your dental options, connect with carefully selected professionals, and coordinate every step of your treatment journey.",
  reassurance: ["Confidential case review", "Personal care coordinator", "Clear next steps"],
};

/* ------------------------------------------------------------------ */
/* Patient journey — seven steps                                       */
/* ------------------------------------------------------------------ */

export const journey = [
  {
    title: "Tell us what you need",
    body: "Describe your dental concern in your own words. A missing tooth, an old crown, a treatment plan you want a second view on — whatever brings you here. There is no obligation, and everything you share is confidential.",
    aside: "Confidential from the first message",
  },
  {
    title: "Share photographs, scans, and records",
    body: "Send what you already have: photographs of your teeth, a panoramic X-ray, a CBCT scan, or previous dental records. If something important is missing, we tell you exactly what to obtain and how.",
    aside: "Whatever you have is enough to start",
  },
  {
    title: "Receive an initial professional review",
    body: "Your case is reviewed by a dental professional. You receive an honest first assessment of what your situation may involve — and if travelling for treatment is not the right step for you, we say so.",
    aside: "An honest first view, not a sales pitch",
  },
  {
    title: "Understand the proposed options",
    body: "Where more than one reasonable approach exists, you see the options side by side: what each involves, its stages, and what remains a clinical decision for the treating dentist. You decide at your own pace.",
    aside: "You decide, with full information",
  },
  {
    title: "Plan appointments and travel",
    body: "Once you choose a path, your coordinator schedules the appointments and helps plan flights, accommodation near the clinic, local transport, and visa documentation where it applies.",
    aside: "One coordinator for the whole plan",
  },
  {
    title: "Support during treatment",
    body: "During your visits, your coordinator stays reachable — appointments, language support, day-to-day questions, and help for anyone travelling with you.",
    aside: "Someone who knows your case, nearby",
  },
  {
    title: "Aftercare and follow-up",
    body: "Before you travel home, your aftercare is planned: care instructions from the treating dentist, what to do if something feels wrong, and how follow-up continues remotely or with a dentist near you.",
    aside: "The journey ends with aftercare, not the last appointment",
  },
];

/* ------------------------------------------------------------------ */
/* Dental treatments                                                   */
/*                                                                     */
/* Educational content only. Every record avoids promised outcomes,    */
/* durations, visit counts, and prices. Suitability language is always */
/* conditional: "may be relevant", "commonly involves".                */
/* ------------------------------------------------------------------ */

export type Treatment = {
  specialty: SpecialtyKey;
  slug: string;
  name: string;
  short: string;
  summary: string;
  /** Who this treatment may be relevant for. Never "you are suitable". */
  whoFor: string[];
  /** What the treatment generally involves — educational, not prescriptive. */
  involves: string[];
  /** Information required for an initial professional review. */
  infoNeeded: string[];
  /** Questions patients should ask before deciding. */
  questionsToAsk: string[];
  /** Possible stages. Actual staging is set by the treating dentist. */
  stages: string[];
  /** Travel and recovery considerations. */
  travelRecovery: string[];
  /** What Medism coordinates. Never clinical work. */
  coordination: string[];
};

const baseInfoNeeded = [
  "Clear photographs of your teeth and smile, taken in daylight",
  "A panoramic X-ray (OPG), if you have one",
  "A CBCT scan, if one has already been taken",
  "Recent dental reports or treatment records, if available",
  "A list of current medications and relevant health conditions",
  "A short description of your concern, in your own words",
];

const baseCoordination = [
  "Collecting and organizing your records for professional review",
  "Arranging a remote consultation before you commit to anything",
  "Scheduling appointments around your travel dates",
  "Travel, accommodation, and local transport planning",
  "Language support during consultations and visits",
  "A named coordinator reachable before, during, and after treatment",
];

const baseQuestions = [
  "Who will perform my treatment, and what are their qualifications?",
  "What are the alternatives, including doing nothing for now?",
  "What are the risks and limitations in my specific case?",
  "What is included in the quoted cost, and what could change it?",
  "What happens if I need adjustment or follow-up after I return home?",
];

export const treatments: Treatment[] = [
  {
    specialty: "dental",
    slug: "dental-implants",
    name: "Dental implants",
    short: "Replacing missing teeth with fixed, long-term restorations",
    summary:
      "A dental implant replaces a missing tooth root with a small titanium or ceramic post, which later supports a crown. Whether implants are appropriate for you depends on a professional assessment of your bone, gums, and general health.",
    whoFor: [
      "People missing one or more teeth",
      "People with a failing tooth that may need replacement",
      "Denture wearers looking for a fixed alternative",
      "People advised elsewhere that they need bone grafting, seeking a second view",
    ],
    involves: [
      "A detailed assessment of your jawbone, usually with a CBCT scan",
      "Surgical placement of the implant under local anesthesia",
      "A healing period while the implant integrates with the bone",
      "Fitting of the final crown or bridge once healing is confirmed",
    ],
    infoNeeded: baseInfoNeeded,
    questionsToAsk: [
      "Is my bone volume sufficient, or would grafting be considered?",
      "What implant system would be used, and why?",
      ...baseQuestions,
    ],
    stages: [
      "Assessment and treatment planning, often possible remotely at first",
      "Implant placement, with any preparatory work the dentist advises",
      "Healing and integration, monitored by the treating team",
      "Final restoration and bite adjustment",
    ],
    travelRecovery: [
      "Implant treatment is usually staged, so more than one visit is common — the treating dentist confirms what your plan requires",
      "Swelling and tenderness for some days after placement are common; plan quiet time after surgery",
      "Healing between stages can often take place at home, with remote check-ins",
      "Your aftercare plan states what to avoid and who to contact with concerns",
    ],
    coordination: baseCoordination,
  },
  {
    specialty: "dental",
    slug: "full-arch-rehabilitation",
    name: "All-on-4 & full-arch rehabilitation",
    short: "Fixed replacement of a full arch of teeth on implants",
    summary:
      "Full-arch rehabilitation replaces all teeth in the upper or lower jaw with a fixed bridge supported by implants — often four or more per arch. It is a significant, staged treatment that always begins with a detailed clinical assessment.",
    whoFor: [
      "People who have lost, or are close to losing, most teeth in one or both jaws",
      "Long-term denture wearers seeking a fixed solution",
      "People with widespread tooth damage where single repairs are no longer realistic",
    ],
    involves: [
      "Comprehensive assessment of bone, gums, bite, and general health",
      "Removal of teeth that cannot be kept, where the dentist advises it",
      "Placement of implants positioned to support a full bridge",
      "A provisional bridge during healing, then the final fixed bridge",
    ],
    infoNeeded: [
      ...baseInfoNeeded,
      "Details of any dentures or previous large-scale dental work",
    ],
    questionsToAsk: [
      "Am I a candidate for a fixed full-arch bridge, and what does that depend on?",
      "What materials would the final bridge use, and how are repairs handled?",
      "How will my bite and speech be checked and adjusted?",
      ...baseQuestions,
    ],
    stages: [
      "Assessment, imaging, and planning of implant positions",
      "Surgery: extractions where required and implant placement",
      "Healing with a provisional bridge, monitored by the treating team",
      "Design, fitting, and adjustment of the final bridge",
    ],
    travelRecovery: [
      "This is staged treatment; the treating dentist confirms how many visits your plan needs and how they are spaced",
      "Plan for rest after the surgical stage, with soft foods for the period your dentist advises",
      "The provisional phase is part of the treatment, not a delay — healing time protects the final result",
      "Aftercare includes cleaning routines for the bridge and scheduled reviews",
    ],
    coordination: [
      ...baseCoordination,
      "Planning longer or repeat stays around surgical and fitting stages",
    ],
  },
  {
    specialty: "dental",
    slug: "crowns-and-bridges",
    name: "Crowns & bridges",
    short: "Restoring damaged teeth and closing gaps with fixed restorations",
    summary:
      "A crown covers and protects a damaged tooth; a bridge uses neighbouring teeth to close a gap left by a missing one. Both are fixed restorations designed and fitted to match your bite and appearance.",
    whoFor: [
      "People with broken, cracked, or heavily filled teeth",
      "People with a missing tooth where an implant is not preferred or advised",
      "People with failing older crowns or bridges",
      "People with discoloured or worn teeth where a filling is no longer enough",
    ],
    involves: [
      "Assessment of the tooth, its root, and the surrounding gum",
      "Preparation of the tooth and a precise impression or digital scan",
      "A temporary restoration while the final one is made",
      "Fitting, bite adjustment, and polishing of the final crown or bridge",
    ],
    infoNeeded: baseInfoNeeded,
    questionsToAsk: [
      "Can this tooth be saved, and is a crown the right way to protect it?",
      "What material is proposed, and why is it right for this tooth?",
      ...baseQuestions,
    ],
    stages: [
      "Assessment and preparation",
      "Laboratory or in-clinic fabrication of the restoration",
      "Fitting and adjustment",
      "Review of fit, bite, and comfort",
    ],
    travelRecovery: [
      "Fabrication time between preparation and fitting varies by clinic and case — your plan states what to expect",
      "Mild sensitivity after preparation is common and usually settles",
      "Your aftercare plan explains how to care for the restoration and what to do if the bite feels off after you return home",
    ],
    coordination: baseCoordination,
  },
  {
    specialty: "dental",
    slug: "veneers",
    name: "Veneers",
    short: "Thin porcelain or composite facings for the front teeth",
    summary:
      "Veneers are thin facings bonded to the front surface of teeth to improve shape, colour, or alignment. Responsible veneer treatment starts with an honest conversation about whether veneers are the right tool for what you want to change.",
    whoFor: [
      "People with chipped, worn, or unevenly shaped front teeth",
      "People with staining that whitening cannot address",
      "People with small gaps or minor alignment issues who are not candidates for, or do not want, orthodontics",
    ],
    involves: [
      "A smile assessment covering teeth, gums, bite, and what you want to change",
      "A trial design in many cases, so you can preview the intended shape",
      "Minimal, careful preparation of the tooth surface where required",
      "Bonding of the final veneers and bite checks",
    ],
    infoNeeded: [
      ...baseInfoNeeded,
      "Photographs of the smile you are unhappy with, from the front and side",
    ],
    questionsToAsk: [
      "How much natural tooth needs to be prepared, and is a no-prep option realistic for me?",
      "Would orthodontics or whitening achieve what I want with less intervention?",
      "How are shade and shape agreed before anything permanent happens?",
      ...baseQuestions,
    ],
    stages: [
      "Assessment and smile design",
      "Preparation and temporary veneers where required",
      "Fabrication of the final veneers",
      "Bonding, adjustment, and review",
    ],
    travelRecovery: [
      "Veneer treatment is usually spread across more than one appointment — your plan confirms the spacing",
      "Some sensitivity after preparation is common and usually settles",
      "Veneers need the same care as natural teeth, plus habits your dentist will explain to protect the edges",
    ],
    coordination: baseCoordination,
  },
  {
    specialty: "dental",
    slug: "smile-rehabilitation",
    name: "Smile rehabilitation",
    short: "Staged, planned treatment combining several dental disciplines",
    summary:
      "Smile rehabilitation is a planned combination of treatments — which can include implants, crowns, veneers, gum treatment, and orthodontics — sequenced to restore health first and appearance with it. It always begins with a full clinical assessment and a written plan.",
    whoFor: [
      "People with several dental problems that single treatments cannot address in isolation",
      "People whose teeth are worn, damaged, or missing across the mouth",
      "People who have received large quotes elsewhere and want a clearly staged, explained alternative plan",
    ],
    involves: [
      "A comprehensive examination: teeth, gums, bite, jaw joints, and imaging",
      "A written plan that sequences health-critical treatment before cosmetic work",
      "Coordination between the disciplines involved in your case",
      "Staged treatment with reviews between stages",
    ],
    infoNeeded: [
      ...baseInfoNeeded,
      "Any treatment plans or quotations you have already received",
    ],
    questionsToAsk: [
      "What order will treatments happen in, and why that order?",
      "Which parts of the plan are essential for health, and which are optional?",
      "What does the plan look like if I choose to stage it over a longer period?",
      ...baseQuestions,
    ],
    stages: [
      "Comprehensive assessment and planning",
      "Foundation treatment: gum health, decay, and infections first",
      "Structural work: implants, crowns, bridges as planned",
      "Finishing: alignment and appearance refinements, then review",
    ],
    travelRecovery: [
      "Rehabilitation is staged by design; the plan states which stages need you at the clinic and which can be monitored remotely",
      "Recovery needs differ by stage — surgical stages need more quiet time than fitting appointments",
      "A written aftercare plan covers each stage and the long-term care routine",
    ],
    coordination: [
      ...baseCoordination,
      "Sequencing multiple appointments and disciplines into one coherent itinerary",
    ],
  },
  {
    specialty: "dental",
    slug: "cosmetic-dentistry",
    name: "Cosmetic dentistry",
    short: "Whitening, bonding, and shape refinements for healthy teeth",
    summary:
      "Cosmetic dentistry covers treatments whose main purpose is appearance: professional whitening, composite bonding, and reshaping. Healthy teeth and gums come first — a responsible dentist treats disease before appearance.",
    whoFor: [
      "People with healthy teeth who want to address staining or small chips",
      "People considering veneers who want to understand less invasive options first",
      "People finishing other treatment who want small refinements",
    ],
    involves: [
      "A check that teeth and gums are healthy enough for cosmetic work",
      "Professional whitening in the clinic, at home with custom trays, or both",
      "Composite bonding to repair chips and refine shapes without drilling",
      "Polishing and small adjustments",
    ],
    infoNeeded: baseInfoNeeded,
    questionsToAsk: [
      "Is my mouth healthy enough for cosmetic treatment now?",
      "How long do whitening and bonding results typically hold, and what affects that in my case?",
      "What happens to existing crowns or fillings, which do not whiten?",
      ...baseQuestions,
    ],
    stages: [
      "Health check and shade assessment",
      "Treatment: whitening sessions and/or bonding appointments",
      "Review and touch-up guidance",
    ],
    travelRecovery: [
      "Many cosmetic treatments involve little or no downtime",
      "Temporary sensitivity after whitening is common and usually settles",
      "Your dentist explains which foods and habits affect early results",
    ],
    coordination: baseCoordination,
  },
  {
    specialty: "dental",
    slug: "orthodontics-clear-aligners",
    name: "Orthodontics & clear aligners",
    short: "Straightening teeth with braces or removable clear aligners",
    summary:
      "Orthodontics moves teeth into healthier, better-aligned positions using fixed braces or sequences of removable clear aligners. Treatment runs over months and needs a clear plan for monitoring — especially if you live far from the treating clinic.",
    whoFor: [
      "People with crowded, spaced, or rotated teeth",
      "People whose bite causes wear, discomfort, or cleaning difficulty",
      "Adults who declined braces earlier and want a discreet option",
    ],
    involves: [
      "Records: photographs, X-rays, and a digital scan of your teeth",
      "A treatment plan, often with a digital preview of planned movement",
      "Fixed braces fitted in the clinic, or aligner sets provided in stages",
      "Scheduled monitoring — in person, remotely, or a combination",
      "Retainers after treatment to hold the result",
    ],
    infoNeeded: baseInfoNeeded,
    questionsToAsk: [
      "Am I better suited to fixed braces or aligners, and why?",
      "How will monitoring work if I am not near the clinic?",
      "What happens if a bracket breaks or an aligner is lost while I am home?",
      "How long will I need retainers afterwards?",
      ...baseQuestions,
    ],
    stages: [
      "Records and planning",
      "Fitting or first aligner delivery",
      "Active treatment with scheduled reviews",
      "Retention: retainers and follow-up checks",
    ],
    travelRecovery: [
      "Orthodontics is monitored over months — international patients need a realistic remote-monitoring plan before starting, and we help confirm one",
      "Mild pressure or soreness after adjustments is common and short-lived",
      "Retainer wear after treatment is long-term; plan for it from the start",
    ],
    coordination: [
      ...baseCoordination,
      "Confirming a realistic remote-monitoring arrangement with the treating clinic before treatment begins",
    ],
  },
  {
    specialty: "dental",
    slug: "root-canal-treatment",
    name: "Root canal treatment",
    short: "Treating infection inside a tooth so it can be kept",
    summary:
      "Root canal treatment removes infected tissue from inside a tooth, cleans and seals the root canals, and usually protects the tooth with a crown afterwards. Its purpose is simple: keeping a natural tooth that would otherwise be lost.",
    whoFor: [
      "People with tooth pain, sensitivity to heat, or swelling suggesting infection",
      "People told a tooth needs extraction who want to know if it can be saved",
      "People with a previously treated tooth that has become painful again",
    ],
    involves: [
      "Diagnosis with examination and X-rays",
      "Cleaning and shaping of the root canals under local anesthesia",
      "Sealing of the canals and a temporary filling",
      "A permanent filling or crown to protect the tooth afterwards",
    ],
    infoNeeded: [
      ...baseInfoNeeded,
      "A description of the pain: when it started, what triggers it, what relieves it",
    ],
    questionsToAsk: [
      "What are the realistic chances of saving this tooth, and what does that depend on?",
      "Will the tooth need a crown afterwards, and is that included in the plan?",
      "What are my options if the tooth cannot be saved?",
      ...baseQuestions,
    ],
    stages: [
      "Diagnosis and pain relief where needed",
      "Root canal cleaning and sealing, sometimes across more than one visit",
      "Final restoration of the tooth",
    ],
    travelRecovery: [
      "Tenderness for a few days after treatment is common",
      "If treatment needs more than one visit, the tooth is protected in between — your plan explains the spacing",
      "Aftercare states clearly what pain is normal and when to contact the clinic",
    ],
    coordination: baseCoordination,
  },
  {
    specialty: "dental",
    slug: "periodontal-care",
    name: "Periodontal (gum) care",
    short: "Treating gum disease and protecting the foundations of your teeth",
    summary:
      "Periodontal care treats disease of the gums and supporting bone — from professional deep cleaning to surgical treatment in advanced cases. Healthy gums are the foundation for every other dental treatment, including implants.",
    whoFor: [
      "People with bleeding, receding, or swollen gums",
      "People with loose teeth or persistent bad breath",
      "People planning implants or major dental work who need gum health confirmed first",
    ],
    involves: [
      "Gum assessment with measurements and X-rays",
      "Professional cleaning above and below the gum line",
      "Deeper treatment or surgery where the dentist advises it",
      "A maintenance plan — gum disease is managed over time, not cured in one visit",
    ],
    infoNeeded: baseInfoNeeded,
    questionsToAsk: [
      "How advanced is my gum condition, and what can realistically be stabilised?",
      "What does the maintenance plan look like after initial treatment?",
      "How does my gum health affect other treatment I am considering?",
      ...baseQuestions,
    ],
    stages: [
      "Assessment and diagnosis",
      "Initial treatment: professional cleaning and home-care coaching",
      "Re-evaluation, with further treatment where needed",
      "Long-term maintenance visits",
    ],
    travelRecovery: [
      "Gums may be tender for a few days after deep cleaning",
      "Long-term success depends on maintenance — we help plan how that continues near your home",
    ],
    coordination: [
      ...baseCoordination,
      "Helping arrange continuing maintenance care with a dentist near you",
    ],
  },
  {
    specialty: "dental",
    slug: "oral-surgery",
    name: "Oral surgery",
    short: "Extractions, wisdom teeth, and surgical preparation for implants",
    summary:
      "Oral surgery covers surgical procedures in the mouth: difficult extractions, impacted wisdom teeth, and preparatory procedures such as bone grafting or sinus lifts before implants. It is planned carefully around imaging and your general health.",
    whoFor: [
      "People with impacted or problematic wisdom teeth",
      "People needing an extraction that is expected to be complex",
      "People whose implant plan includes bone grafting or a sinus lift",
    ],
    involves: [
      "Assessment with imaging, usually including a CBCT scan for surgical planning",
      "The procedure under local anesthesia, with sedation options where offered and appropriate",
      "Clear written aftercare instructions",
      "A follow-up check by the treating team",
    ],
    infoNeeded: [
      ...baseInfoNeeded,
      "Details of any previous surgery or anesthesia complications",
    ],
    questionsToAsk: [
      "What makes my case surgical, and what would the procedure involve?",
      "What anesthesia or sedation options are available to me?",
      "What symptoms after surgery are normal, and which need attention?",
      ...baseQuestions,
    ],
    stages: [
      "Assessment and surgical planning",
      "The procedure",
      "Recovery with clear aftercare instructions",
      "Follow-up review",
    ],
    travelRecovery: [
      "Swelling and discomfort for some days after surgery are common; plan quiet time",
      "Flying soon after some procedures may be inadvisable — the treating surgeon confirms when travel is safe for your case",
      "Your aftercare plan lists exactly who to contact if something concerns you",
    ],
    coordination: [
      ...baseCoordination,
      "Building recovery days into your travel plan before you book flights",
    ],
  },
  {
    specialty: "dental",
    slug: "preventive-restorative",
    name: "Preventive & restorative care",
    short: "Check-ups, hygiene, fillings, and keeping small problems small",
    summary:
      "Preventive and restorative care is everyday dentistry done well: examinations, professional cleaning, and quality fillings. For international patients it often pairs with a larger treatment plan — establishing health before and after bigger work.",
    whoFor: [
      "People starting a larger treatment journey who need baseline health established",
      "People who have not had a full examination in a long time",
      "People with decay, worn fillings, or small chips to repair",
    ],
    involves: [
      "A full examination with X-rays where indicated",
      "Professional cleaning and personalised home-care advice",
      "Tooth-coloured fillings and small repairs",
      "An honest summary of anything that needs monitoring rather than treatment",
    ],
    infoNeeded: baseInfoNeeded,
    questionsToAsk: [
      "What needs treatment now, and what can safely be monitored?",
      "What can I change at home that would make the biggest difference?",
      ...baseQuestions,
    ],
    stages: [
      "Examination and cleaning",
      "Any agreed repairs",
      "A written summary and recall recommendation",
    ],
    travelRecovery: [
      "Most preventive and restorative care involves little or no downtime",
      "A written summary travels home with you, so a local dentist can continue care seamlessly",
    ],
    coordination: baseCoordination,
  },
];

/** Treatments for a given specialty — index pages filter with this. */
export const treatmentsFor = (key: SpecialtyKey) => treatments.filter((t) => t.specialty === key);

/* ------------------------------------------------------------------ */
/* Why Medism                                                          */
/* ------------------------------------------------------------------ */

export const whyMedism = [
  {
    term: "Finding an appropriate professional",
    detail:
      "Your case is directed to dentists whose training and daily work match what you need — with their background shared for your review before you decide.",
  },
  {
    term: "Coordinating case information",
    detail:
      "We gather and organize your photographs, X-rays, and records so the reviewing dentist sees a complete picture — and we tell you exactly what is missing.",
  },
  {
    term: "Comparing options",
    detail:
      "Where more than one reasonable approach exists, you see them side by side: what each involves, its stages, and what remains a clinical decision.",
  },
  {
    term: "Journey planning",
    detail:
      "Treatment stages, travel dates, and recovery time are planned together, so your itinerary fits the treatment — not the other way around.",
  },
  {
    term: "Appointment coordination",
    detail:
      "Consultations, procedures, and reviews are scheduled and confirmed for you, with reminders and changes handled by your coordinator.",
  },
  {
    term: "Travel and accommodation",
    detail:
      "Flights guidance, accommodation near the clinic, and local transport are arranged around your treatment plan and your budget.",
  },
  {
    term: "Language assistance",
    detail:
      "Language support for consultations and day-to-day needs, so nothing important is lost in translation.",
  },
  {
    term: "Support for companions",
    detail:
      "Someone travelling with you is planned for from the start — accommodation, updates, and practical help.",
  },
  {
    term: "Aftercare",
    detail:
      "Care instructions, follow-up scheduling, and a clear contact route if anything concerns you after you return home.",
  },
];

/* ------------------------------------------------------------------ */
/* Treatment planning & transparency                                   */
/*                                                                     */
/* What a responsible treatment proposal contains. This section is a   */
/* patient-education tool, not a claim about any specific clinic.      */
/* ------------------------------------------------------------------ */

export const transparency = {
  intro:
    "Before you agree to anything, you should hold a written proposal you can understand. A responsible dental treatment proposal contains:",
  items: [
    { term: "Clinical findings", detail: "What the examination and imaging actually found, in plain language." },
    { term: "The recommended treatment", detail: "What is proposed, tooth by tooth, and why." },
    { term: "Alternatives", detail: "Other reasonable options — including more conservative ones and their trade-offs." },
    { term: "Stages and sequence", detail: "What happens in which order, and why that order." },
    { term: "Number of visits", detail: "How many visits the plan expects, and what each is for." },
    { term: "Travel requirements", detail: "Which stages need you at the clinic and which can be handled remotely." },
    { term: "Cost inclusions and exclusions", detail: "What the quoted amount covers, what it does not, and what could change it." },
    { term: "Aftercare", detail: "What care the result needs, and who provides it after you return home." },
    { term: "Risks and limitations", detail: "What can go wrong, how likely it is, and how it would be handled." },
    { term: "Who performs the treatment", detail: "The name and qualifications of the dentist responsible for each part." },
  ],
  note: "If a proposal you receive is missing these, ask. A good clinic answers willingly.",
};

/* ------------------------------------------------------------------ */
/* International travel support                                        */
/* ------------------------------------------------------------------ */

export const travelSupport = [
  {
    term: "Record collection",
    detail: "We help gather photographs, X-rays, and records, and tell you exactly what is still needed.",
  },
  {
    term: "Remote consultation coordination",
    detail: "Where the clinic offers it, we arrange a remote consultation so key questions are answered before you travel.",
  },
  {
    term: "Appointment scheduling",
    detail: "Consultations, procedures, and reviews are booked and confirmed around your travel dates.",
  },
  {
    term: "Travel planning",
    detail: "Flight guidance and an itinerary built around your treatment stages, with recovery days included.",
  },
  {
    term: "Visa documentation",
    detail: "Where a visa applies, we prepare the supporting letters your application needs and guide you through the process.",
  },
  {
    term: "Transport",
    detail: "Airport pickup and transport to appointments, so you never navigate an unfamiliar city alone.",
  },
  {
    term: "Accommodation",
    detail: "Stays chosen for proximity to the clinic, comfort during recovery, and your budget.",
  },
  {
    term: "Language support",
    detail: "Interpreting for consultations and help with day-to-day needs in your language.",
  },
  {
    term: "Companion assistance",
    detail: "Accommodation, updates, and practical help for the person travelling with you.",
  },
  {
    term: "Recovery planning",
    detail: "Quiet days after surgical stages are planned into your stay, with food and comfort needs considered.",
  },
  {
    term: "Remote follow-up",
    detail: "After you return home, follow-up continues remotely with the treating clinic, coordinated by us.",
  },
];

/** Compatibility alias — earlier pages import `patientServices`. */
export const patientServices = travelSupport;

/* ------------------------------------------------------------------ */
/* Dentists & clinics — verified-data profile system                   */
/* ------------------------------------------------------------------ */

export type DentistProfile = {
  slug: string;
  placeholder: boolean;
  name: string;
  /** Art-direction note for the profile photograph until a real one exists. */
  photoBrief: string;
  qualifications: string[];
  specialty: string;
  registrations: string[];
  languages: string[];
  yearsExperience: string;
  clinic: string;
  location: string;
  treatmentAreas: string[];
  accreditations: string[];
};

export type ClinicProfile = {
  slug: string;
  placeholder: boolean;
  name: string;
  city: string;
  treatmentAreas: string[];
  languages: string[];
  accreditations: string[];
  facilities: string[];
};

/**
 * PLACEHOLDER PROFILES.
 * Medism has not yet supplied verified partner data for publication. These
 * entries demonstrate the profile structure and render with a visible
 * "awaiting verified partner data" label. Credentials, registrations, and
 * accreditations are never invented; every field below is structural.
 */
export const dentistProfiles: DentistProfile[] = [
  {
    slug: "profile-template-implantologist",
    placeholder: true,
    name: "Implant dentist profile",
    photoBrief: "Portrait in the clinic, natural light, no white-coat-and-crossed-arms pose",
    qualifications: ["Qualifications listed only after verification"],
    specialty: "Implantology and oral surgery",
    registrations: ["Professional registration numbers shown after verification"],
    languages: ["Languages confirmed with the clinic"],
    yearsExperience: "Confirmed with documentation",
    clinic: "Clinic name after partnership confirmation",
    location: "City to be confirmed",
    treatmentAreas: ["Dental implants", "Full-arch rehabilitation", "Oral surgery"],
    accreditations: ["Accreditations shown only with documentation"],
  },
  {
    slug: "profile-template-prosthodontist",
    placeholder: true,
    name: "Restorative dentist profile",
    photoBrief: "In conversation with a patient across a desk, mid-explanation, warm light",
    qualifications: ["Qualifications listed only after verification"],
    specialty: "Prosthodontics and restorative dentistry",
    registrations: ["Professional registration numbers shown after verification"],
    languages: ["Languages confirmed with the clinic"],
    yearsExperience: "Confirmed with documentation",
    clinic: "Clinic name after partnership confirmation",
    location: "City to be confirmed",
    treatmentAreas: ["Crowns & bridges", "Veneers", "Smile rehabilitation"],
    accreditations: ["Accreditations shown only with documentation"],
  },
  {
    slug: "profile-template-orthodontist",
    placeholder: true,
    name: "Orthodontist profile",
    photoBrief: "Reviewing a digital scan with a patient, both looking at the screen",
    qualifications: ["Qualifications listed only after verification"],
    specialty: "Orthodontics",
    registrations: ["Professional registration numbers shown after verification"],
    languages: ["Languages confirmed with the clinic"],
    yearsExperience: "Confirmed with documentation",
    clinic: "Clinic name after partnership confirmation",
    location: "City to be confirmed",
    treatmentAreas: ["Orthodontics & clear aligners"],
    accreditations: ["Accreditations shown only with documentation"],
  },
];

export const clinicProfiles: ClinicProfile[] = [
  {
    slug: "profile-template-dental-clinic",
    placeholder: true,
    name: "Dental clinic profile",
    city: "City to be confirmed",
    treatmentAreas: ["Treatment areas listed after verification"],
    languages: ["Languages confirmed with the clinic"],
    accreditations: ["Accreditations shown only with documentation"],
    facilities: ["Facility details added after verification"],
  },
  {
    slug: "profile-template-implant-center",
    placeholder: true,
    name: "Implant & surgical center profile",
    city: "City to be confirmed",
    treatmentAreas: ["Treatment areas listed after verification"],
    languages: ["Languages confirmed with the clinic"],
    accreditations: ["Accreditations shown only with documentation"],
    facilities: ["Facility details added after verification"],
  },
];

/** Compatibility alias — earlier pages import `hospitalProfiles`. */
export const hospitalProfiles = clinicProfiles;

/* ------------------------------------------------------------------ */
/* Patient story — verified stories only                               */
/* ------------------------------------------------------------------ */

export const patientStory = {
  placeholder: true as const,
  /**
   * No verified patient story exists yet. This structure defines what a
   * publishable story requires. Before/after imagery additionally requires
   * documented consent and honest, consistent photographic conditions.
   */
  requirements: [
    "Written consent from the patient for publication",
    "A story focused on the decision process, care experience, and recovery — not a dramatic transformation",
    "Facts verifiable by Medism: treatment type, coordination provided, timeline",
    "Photography under honest, consistent conditions if imagery is used",
  ],
  artDirection:
    "A patient at home after treatment, in ordinary life — reading, cooking, with family. Natural smile, natural light. The story is the support they received, not the teeth.",
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "How do I request an assessment?",
    a: "Use “Request a Dental Consultation” anywhere on this site. You describe your concern in a few guided steps and can attach photographs or records if you have them. A care coordinator reviews your case and replies with the next appropriate step.",
  },
  {
    q: "Which photographs or records should I send?",
    a: "Whatever you already have is enough to start: photographs of your teeth taken in daylight, a panoramic X-ray, a CBCT scan, or previous dental records. If something important is missing, we tell you exactly what to obtain and how.",
  },
  {
    q: "Do I need a panoramic X-ray or CBCT scan?",
    a: "Not to begin. Photographs and your description are enough for a first review. For implant and surgical planning, the reviewing dentist will usually ask for a panoramic X-ray or CBCT — we tell you if and when one is needed, and where you can have it taken.",
  },
  {
    q: "Who decides whether a treatment is suitable for me?",
    a: "Only a licensed dentist, after a professional assessment. Medism coordinates the review and the journey; we do not make clinical decisions, and nothing on this site is a promise of suitability.",
  },
  {
    q: "Can I compare more than one option?",
    a: "Yes. Where more than one appropriate approach or clinic exists for your case, we present the options side by side and help you understand the differences. The choice is always yours.",
  },
  {
    q: "How many visits will my treatment need?",
    a: "It depends on the treatment and your case. Staged treatments such as implants commonly need more than one visit. Your written proposal states the expected number of visits and what each is for — before you commit to anything.",
  },
  {
    q: "How are prices confirmed?",
    a: "Prices come from the treating clinic, in writing, after your case has been professionally reviewed. Medism does not publish price lists, because a realistic price requires a real assessment. If findings change during treatment, any change must be explained and agreed before work continues.",
  },
  {
    q: "What does a quotation include?",
    a: "A responsible quotation states exactly what is included — assessment, the treatment itself, materials, and follow-up — and what is excluded or could change. We help you check any quotation against that standard before you decide.",
  },
  {
    q: "Can Medism help with travel and accommodation?",
    a: "Yes. We plan your itinerary around the treatment stages: flights guidance, accommodation near the clinic, airport pickup, local transport, and visa documentation where it applies.",
  },
  {
    q: "What happens if I need follow-up care after I return home?",
    a: "Aftercare is planned before you leave: written care instructions, remote follow-up with the treating clinic, and help finding a dentist near you for anything that needs in-person attention. Your coordinator remains your contact point.",
  },
  {
    q: "How is my medical information protected?",
    a: "Your information is used only to review your case and coordinate your care. It is shared only with the professionals involved, and it is never sold or used for marketing. Details are in our privacy policy.",
  },
  {
    q: "Is Medism the treating provider?",
    a: "No. Medism is a care-coordination service. Examination, diagnosis, treatment, and clinical advice come only from the licensed dentists who assess and treat you. Submitting a request to Medism does not create a dentist–patient relationship.",
  },
];

/* ------------------------------------------------------------------ */
/* Consultation flow                                                   */
/*                                                                     */
/* Step definitions for the guided consultation. Each step explains    */
/* why the information is requested — we collect no more health        */
/* information than coordination requires.                             */
/* ------------------------------------------------------------------ */

export const consultationSteps = [
  {
    key: "location-language",
    title: "Where are you, and how should we speak?",
    whyWeAsk: "Your country and preferred language let us plan travel realistically and make sure every conversation happens in a language you are comfortable in.",
  },
  {
    key: "concern",
    title: "What brings you here?",
    whyWeAsk: "A short description of your concern — or the treatment you are considering — tells the reviewing dentist where to focus.",
  },
  {
    key: "history",
    title: "Previous diagnosis or treatment",
    whyWeAsk: "Knowing what has already been diagnosed, treated, or quoted prevents repeated work and helps the dentist understand your starting point.",
  },
  {
    key: "symptoms",
    title: "Current symptoms and urgency",
    whyWeAsk: "Pain, swelling, or a broken tooth changes what the right next step is. If your situation sounds urgent, we say so and point you to faster help.",
  },
  {
    key: "contact",
    title: "How should we reach you?",
    whyWeAsk: "We reply through the channel you choose — nothing more. Your details are used to respond to this request, not for marketing.",
  },
  {
    key: "records",
    title: "Photographs, X-rays, and records (optional)",
    whyWeAsk: "Images and records make the first professional review far more useful. This step is optional — you can send them later instead.",
  },
  {
    key: "consent",
    title: "Consent and submission",
    whyWeAsk: "We ask for explicit consent to process your health information for this review, and we explain exactly what happens next.",
  },
];

export const uploadRequirements = {
  accepted: "JPG, PNG, HEIC, PDF, or DICOM files",
  maxSizeNote: "Up to 25 MB per file",
  privacyNote: "Your files are encrypted in transit, used only for your case review, and shared only with the professionals involved.",
  tips: [
    "Daylight photographs of your teeth: front, left, right, and both biting surfaces",
    "A panoramic X-ray or CBCT scan if you have one — ask your previous dentist for a copy; they are required to provide it",
    "Photographs of any treatment plan or quotation you already have",
  ],
};

export const consultationConfirmation = {
  heading: "Your request has been received.",
  body: "A care coordinator will review your case and reply with the next appropriate step. If anything important is missing from what you sent, we will tell you exactly what to add. Submitting this request does not create a dentist–patient relationship — clinical advice comes only from the dentist who assesses you.",
  fallback: "If you do not hear from us, or your situation changes, contact us directly through the contact page.",
};

export const contactMethods = ["Email", "Phone call", "WhatsApp", "Video call"];

export const timeframes = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 6 months",
  "I am exploring options",
];

/* ------------------------------------------------------------------ */
/* Final CTA & legal                                                   */
/* ------------------------------------------------------------------ */

export const finalCta = {
  heading: "Take the first step with a clearer understanding of your options.",
  body: "Share your needs with Medism. A care coordinator will explain what information is required and help arrange the appropriate next step.",
  privacyNote: "Everything you share is confidential and used only to review your case.",
};

export const emergencyDisclaimer =
  "Medism is a care-coordination service, not an emergency service and not a dental provider. If you have severe pain, uncontrolled bleeding, facial swelling, or an injury, seek immediate care from a local dentist, doctor, or emergency service.";

/* ------------------------------------------------------------------ */
/* Deprecated — pending removal in the IA restructure                  */
/*                                                                     */
/* The professional-programs page belongs to the abandoned general-    */
/* medical brief and is removed from navigation. The export remains    */
/* only so the legacy page compiles until it is deleted.               */
/* ------------------------------------------------------------------ */

/** @deprecated Legacy page support only; removed with the IA restructure. */
export const professionalPrograms = [
  {
    term: "Clinic & professional partnerships",
    detail: "Referral pathways and coordination agreements for dental clinics serving international patients.",
  },
];
