/**
 * Medism content model.
 *
 * Rule: nothing here may state an unverified fact. Statistics, partner names,
 * accreditations, testimonials, prices, and outcomes are never invented.
 * Anything awaiting client confirmation is marked `placeholder: true` and is
 * rendered with a visible "awaiting verification" treatment.
 */

export const site = {
  name: "Medism",
  tagline: "Expert healthcare guidance, from first conversation to recovery.",
  description:
    "Medism helps international patients find appropriate specialists, compare treatment options, and coordinate every step of their healthcare journey — from medical review and travel planning to treatment and recovery.",
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

export const nav = [
  { label: "Treatments", href: "/treatments" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Hospitals & Doctors", href: "/hospitals" },
  { label: "International Patients", href: "/international-patients" },
  { label: "About Medism", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Care journey                                                        */
/* ------------------------------------------------------------------ */

export const journey = [
  {
    title: "Share your medical case",
    body: "Tell us what you are facing, in your own words. You can attach existing reports, scans, and prescriptions, or simply describe the situation. Everything you share is treated as confidential.",
    aside: "Confidential from the first message",
  },
  {
    title: "Receive an initial review",
    body: "A Medism care coordinator reviews your case and gathers the questions a specialist will need answered. We tell you clearly what the next appropriate step is — and if we are not the right help, we say so.",
    aside: "Clear next steps, no obligation",
  },
  {
    title: "Compare specialists and treatment plans",
    body: "Where more than one appropriate option exists, we present them side by side: the specialist, the hospital, what the plan involves, and what remains to be decided with the treating doctor.",
    aside: "You decide, with full information",
  },
  {
    title: "Plan travel, visa, and stay",
    body: "Once you choose a path, we help organize medical visa documentation, flights, airport pickup, accommodation near the hospital, and arrangements for a family member travelling with you.",
    aside: "One coordinator for the whole plan",
  },
  {
    title: "Be supported through treatment",
    body: "During treatment, your coordinator stays reachable — helping with appointments, language support, day-to-day questions, and keeping your family informed the way you want.",
    aside: "Someone who knows your case, nearby",
  },
  {
    title: "Continue into recovery",
    body: "Before you travel home, we help plan follow-up: discharge summaries, medication guidance from your treating team, rehabilitation options, and how to stay in touch with your specialist remotely.",
    aside: "The journey ends at recovery, not discharge",
  },
];

/* ------------------------------------------------------------------ */
/* Treatments                                                          */
/* ------------------------------------------------------------------ */

export type Treatment = {
  slug: string;
  name: string;
  short: string;
  summary: string;
  conditions: string[];
  specialties: string[];
  expect: string[];
  caseReview: string[];
};

const sharedCaseReview = [
  "Recent medical reports or discharge summaries, if you have them",
  "Imaging such as X-ray, CT, MRI, or ultrasound reports where relevant",
  "A current medication list",
  "A short description of symptoms and how long they have been present",
  "Any treatment already received or advised",
];

export const treatments: Treatment[] = [
  {
    slug: "cardiology-cardiac-surgery",
    name: "Cardiology & cardiac surgery",
    short: "Heart conditions, from diagnosis to surgical care",
    summary:
      "Support for patients seeking evaluation or treatment for heart conditions, including interventional cardiology and cardiac surgery, coordinated with experienced cardiac teams.",
    conditions: [
      "Coronary artery disease",
      "Heart valve disease",
      "Heart rhythm disorders",
      "Congenital heart conditions",
      "Heart failure requiring specialist evaluation",
    ],
    specialties: ["Cardiology", "Interventional cardiology", "Cardiothoracic surgery", "Cardiac anesthesia and intensive care"],
    expect: [
      "A specialist review of your reports before you travel",
      "A clear explanation of the proposed evaluation or procedure",
      "Coordination of pre-operative tests and admissions",
      "Support for a family member during hospitalization",
    ],
    caseReview: [
      "Cardiology reports, ECG, and echocardiogram results if available",
      "Angiography reports or films where performed",
      ...sharedCaseReview.slice(2),
    ],
  },
  {
    slug: "oncology",
    name: "Oncology",
    short: "Cancer evaluation, second opinions, and treatment",
    summary:
      "Coordination for patients seeking cancer diagnosis confirmation, second opinions, or treatment — including medical, surgical, and radiation oncology.",
    conditions: [
      "New or suspected cancer diagnoses",
      "Second opinions on an existing treatment plan",
      "Complex or advanced cancers requiring multidisciplinary review",
      "Follow-up and surveillance planning",
    ],
    specialties: ["Medical oncology", "Surgical oncology", "Radiation oncology", "Onco-pathology"],
    expect: [
      "A multidisciplinary review of your diagnosis and staging where appropriate",
      "A written summary of the recommended plan from the treating team",
      "Clarity about the sequence and duration of treatment before you travel",
      "Coordination of longer stays and family accommodation",
    ],
    caseReview: [
      "Biopsy or histopathology reports",
      "Staging scans such as CT, PET-CT, or MRI reports",
      "Details of any chemotherapy, radiation, or surgery already received",
      ...sharedCaseReview.slice(2, 4),
    ],
  },
  {
    slug: "orthopedics-joint-replacement",
    name: "Orthopedics & joint replacement",
    short: "Joint, bone, and mobility care",
    summary:
      "Support for patients considering joint replacement, complex orthopedic surgery, or specialist evaluation for bone and mobility problems.",
    conditions: [
      "Advanced arthritis of the hip or knee",
      "Joint injuries and ligament damage",
      "Failed or painful previous joint replacements",
      "Complex fractures and deformity correction",
    ],
    specialties: ["Orthopedic surgery", "Joint replacement surgery", "Sports medicine", "Physiotherapy and rehabilitation"],
    expect: [
      "Specialist review of imaging before travel",
      "A clear plan covering surgery, hospital stay, and early rehabilitation",
      "Accessibility-aware travel and accommodation planning",
      "A rehabilitation pathway you can continue at home",
    ],
    caseReview: sharedCaseReview,
  },
  {
    slug: "spine-care",
    name: "Spine care",
    short: "Back, neck, and spinal cord conditions",
    summary:
      "Coordination for patients with spine conditions seeking specialist evaluation, non-surgical management, or spine surgery.",
    conditions: [
      "Disc disease and nerve compression",
      "Spinal stenosis",
      "Scoliosis and spinal deformity",
      "Spine conditions previously treated without relief",
    ],
    specialties: ["Spine surgery", "Neurosurgery", "Pain management", "Rehabilitation medicine"],
    expect: [
      "An honest assessment of surgical and non-surgical options",
      "Specialist review of MRI and other imaging before travel",
      "A recovery and mobility plan for the journey home",
    ],
    caseReview: sharedCaseReview,
  },
  {
    slug: "neurology-neurosurgery",
    name: "Neurology & neurosurgery",
    short: "Brain and nervous system care",
    summary:
      "Support for patients with neurological conditions seeking diagnosis, second opinions, or neurosurgical treatment.",
    conditions: [
      "Brain and spinal tumors requiring evaluation",
      "Epilepsy requiring specialist management",
      "Movement disorders",
      "Cerebrovascular conditions",
    ],
    specialties: ["Neurology", "Neurosurgery", "Neuro-intensive care", "Neuro-rehabilitation"],
    expect: [
      "Careful pre-travel review — some cases are better managed close to home, and we say so",
      "Multidisciplinary input where the diagnosis is complex",
      "Support for longer stays and accompanying family",
    ],
    caseReview: [
      "Neurology or neurosurgery consultation notes",
      "Brain or spine imaging reports (MRI, CT)",
      ...sharedCaseReview.slice(2),
    ],
  },
  {
    slug: "organ-transplantation",
    name: "Organ transplantation",
    short: "Kidney and liver transplant evaluation",
    summary:
      "Coordination for patients exploring transplant evaluation. Transplantation is heavily regulated; eligibility, donor rules, and legal requirements are determined entirely by the hospital's transplant team and applicable law.",
    conditions: [
      "End-stage kidney disease",
      "Advanced liver disease",
      "Transplant evaluation and second opinions",
    ],
    specialties: ["Transplant surgery", "Nephrology", "Hepatology", "Transplant medicine and immunology"],
    expect: [
      "A frank explanation of legal and medical eligibility requirements before anything else",
      "Coordination of the hospital's own evaluation process",
      "Support for the extended stays transplant care requires",
      "No promises — eligibility is decided only by the transplant team and regulators",
    ],
    caseReview: [
      "Recent kidney or liver function reports",
      "Dialysis details, where applicable",
      "Previous transplant evaluation documents, if any",
      ...sharedCaseReview.slice(2, 4),
    ],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    short: "Digestive system evaluation and treatment",
    summary:
      "Support for patients seeking evaluation or treatment for digestive and liver conditions, from advanced endoscopy to gastrointestinal surgery.",
    conditions: [
      "Chronic digestive conditions requiring specialist review",
      "Liver and pancreatic disease",
      "Conditions requiring advanced endoscopy",
      "Gastrointestinal surgery evaluation",
    ],
    specialties: ["Gastroenterology", "Hepatology", "Gastrointestinal surgery", "Advanced endoscopy"],
    expect: [
      "Pre-travel review of previous endoscopy and imaging",
      "A clear plan for the tests that must be repeated or added",
      "Dietary and recovery guidance from the treating team",
    ],
    caseReview: sharedCaseReview,
  },
  {
    slug: "ivf-reproductive-medicine",
    name: "IVF & reproductive medicine",
    short: "Fertility evaluation and assisted reproduction",
    summary:
      "Coordination for patients and couples exploring fertility treatment. Reproductive medicine is regulated differently across countries; the treating clinic determines what is legally and medically possible for your situation.",
    conditions: [
      "Fertility evaluation for individuals and couples",
      "IVF and related assisted reproduction techniques",
      "Recurrent implantation failure or pregnancy loss requiring review",
    ],
    specialties: ["Reproductive medicine", "Embryology", "Reproductive endocrinology", "Fertility surgery"],
    expect: [
      "A private, unhurried review of your history",
      "Clarity about legal eligibility before travel plans are made",
      "Realistic conversations — no clinic can promise a pregnancy",
      "Scheduling built around treatment cycles",
    ],
    caseReview: [
      "Previous fertility test results and treatment records",
      "Hormone profiles and imaging where available",
      ...sharedCaseReview.slice(2, 4),
    ],
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology",
    short: "Eye conditions and vision care",
    summary:
      "Support for patients seeking specialist eye care, from cataract and retinal surgery to corneal transplantation.",
    conditions: [
      "Cataract requiring surgery",
      "Retinal conditions",
      "Corneal disease and transplantation evaluation",
      "Glaucoma requiring specialist management",
    ],
    specialties: ["Ophthalmology", "Vitreoretinal surgery", "Cornea and refractive surgery", "Glaucoma services"],
    expect: [
      "Review of existing eye reports before travel",
      "Clear guidance on when it is safe to fly after eye procedures",
      "Follow-up planning with your local eye doctor",
    ],
    caseReview: sharedCaseReview,
  },
  {
    slug: "bone-marrow-stem-cell-transplant",
    name: "Bone marrow & stem-cell transplantation",
    short: "Hematology and transplant care",
    summary:
      "Coordination for patients whose hematologists have advised bone marrow or stem-cell transplantation, or who are seeking a specialist second opinion on blood disorders.",
    conditions: [
      "Leukemia, lymphoma, and myeloma requiring transplant evaluation",
      "Aplastic anemia and bone marrow failure",
      "Thalassemia and inherited blood disorders",
    ],
    specialties: ["Hematology", "Bone marrow transplantation", "Transfusion medicine", "Pediatric hematology"],
    expect: [
      "Careful pre-travel review — transplant timing is a clinical decision",
      "Clarity about donor requirements and the hospital's process",
      "Support for the long stays this treatment involves",
      "Family accommodation planning near the hospital",
    ],
    caseReview: [
      "Hematology reports and bone marrow biopsy results",
      "Details of chemotherapy or transfusion history",
      "Donor information, where a family donor has been identified",
      ...sharedCaseReview.slice(2, 4),
    ],
  },
  {
    slug: "nephrology-hepatology",
    name: "Nephrology & hepatology",
    short: "Kidney and liver medicine",
    summary:
      "Specialist medical care for kidney and liver conditions, including cases that may later require transplant evaluation.",
    conditions: [
      "Chronic kidney disease",
      "Dialysis planning and access care",
      "Chronic liver disease and cirrhosis",
      "Unexplained kidney or liver abnormalities",
    ],
    specialties: ["Nephrology", "Hepatology", "Dialysis services", "Interventional radiology"],
    expect: [
      "Continuity planning if you currently receive dialysis",
      "A clear picture of what can be treated medically versus surgically",
      "Coordination with transplant teams where evaluation is appropriate",
    ],
    caseReview: sharedCaseReview,
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    short: "Specialist care for children",
    summary:
      "Coordination for families seeking specialist evaluation or treatment for a child, with both parents supported throughout the journey.",
    conditions: [
      "Congenital conditions requiring surgical evaluation",
      "Pediatric cardiac conditions",
      "Pediatric cancers and blood disorders",
      "Complex conditions needing multidisciplinary review",
    ],
    specialties: ["Pediatrics", "Pediatric surgery", "Pediatric cardiology", "Pediatric intensive care"],
    expect: [
      "Both parents included in every conversation",
      "Child-appropriate accommodation and travel planning",
      "Clear, patient explanations of what the treating team proposes",
      "Support designed around the family, not just the patient",
    ],
    caseReview: [
      "The child's medical reports and growth records",
      "Imaging and test results where available",
      "Vaccination history",
      ...sharedCaseReview.slice(2, 4),
    ],
  },
  {
    slug: "rehabilitation",
    name: "Rehabilitation",
    short: "Recovery, physiotherapy, and rehabilitation programs",
    summary:
      "Structured rehabilitation after surgery, injury, or neurological events — as a stand-alone program or as the recovery phase of treatment coordinated through Medism.",
    conditions: [
      "Post-surgical rehabilitation",
      "Stroke and neurological rehabilitation",
      "Orthopedic and sports injury recovery",
      "Long-term mobility and strength programs",
    ],
    specialties: ["Rehabilitation medicine", "Physiotherapy", "Occupational therapy", "Speech and language therapy"],
    expect: [
      "A program built around goals you set with the rehabilitation team",
      "Accommodation suited to longer, routine-based stays",
      "A written plan you can continue at home",
    ],
    caseReview: sharedCaseReview,
  },
];

/* ------------------------------------------------------------------ */
/* Why Medism                                                          */
/* ------------------------------------------------------------------ */

export const whyMedism = [
  {
    term: "Patient-first guidance",
    detail:
      "Our job is to reduce uncertainty, not to sell a procedure. If the right answer is to stay home, seek care locally, or wait, we tell you.",
  },
  {
    term: "Appropriate specialists",
    detail:
      "We match your case to specialists and hospitals based on the condition, not on convenience. Where more than one appropriate option exists, you see them side by side.",
  },
  {
    term: "Transparent planning",
    detail:
      "Before you commit to anything, you know what the plan involves, what remains a clinical decision, and what the next step is. No surprises on arrival.",
  },
  {
    term: "One coordinator, whole journey",
    detail:
      "A named care coordinator stays with your case from the first conversation through recovery — medical review, travel, visa, stay, treatment, and follow-up.",
  },
  {
    term: "Family included",
    detail:
      "Serious treatment is a family decision. We support the people travelling with you — accommodation, updates, and someone to ask when things are stressful.",
  },
  {
    term: "Recovery is part of the plan",
    detail:
      "Follow-up, rehabilitation, and staying connected to your specialist after you return home are planned before you leave, not after.",
  },
];

/* ------------------------------------------------------------------ */
/* International patient services                                      */
/* ------------------------------------------------------------------ */

export const patientServices = [
  {
    term: "Medical-record collection",
    detail: "We help gather and organize the reports a specialist needs, and tell you exactly what is missing.",
  },
  {
    term: "Specialist matching",
    detail: "Your case is directed to doctors whose work matches your condition — with their background shared for your review.",
  },
  {
    term: "Treatment-plan coordination",
    detail: "We coordinate opinions, schedules, and admissions so the plan is clear before you travel.",
  },
  {
    term: "Visa documentation support",
    detail: "We prepare the hospital letters and documents medical visa applications require, and guide you through the process.",
  },
  {
    term: "Airport pickup & local transport",
    detail: "Arrival, hospital visits, and follow-up appointments — transport is arranged so you never navigate a new city alone.",
  },
  {
    term: "Accommodation",
    detail: "Stays are chosen for proximity to the hospital, comfort during recovery, and your budget.",
  },
  {
    term: "Interpreters & language support",
    detail: "Language support for consultations and day-to-day needs, so nothing important is lost in translation.",
  },
  {
    term: "Meals & accessibility needs",
    detail: "Dietary requirements, mobility needs, and accessibility are planned into the stay from the start.",
  },
  {
    term: "Support for family members",
    detail: "Accommodation, updates, and practical help for the people travelling with you.",
  },
  {
    term: "Recovery & follow-up planning",
    detail: "Discharge summaries, rehabilitation options, and remote follow-up with your specialist are organized before you fly home.",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "How do I submit my case?",
    a: "Use “Request a Care Consultation” anywhere on this site. You describe your situation in a few guided steps and can attach medical reports if you have them. A care coordinator reviews it and replies with the next appropriate step.",
  },
  {
    q: "What medical reports are required?",
    a: "Whatever you already have is enough to start: recent consultation notes, imaging reports, blood work, or a discharge summary. If something important is missing, we tell you exactly what to obtain — you do not need a complete file to begin.",
  },
  {
    q: "How are doctors and hospitals recommended?",
    a: "We match your case to specialists whose training and practice fit your condition, and we share their background and the hospital's details with you before you decide. Medism does not accept payment to favor one hospital over another in a recommendation.",
  },
  {
    q: "Can I compare more than one option?",
    a: "Yes. Where more than one appropriate specialist or treatment approach exists, we present the options side by side and help you understand the differences. The choice is always yours.",
  },
  {
    q: "How long does an initial review take?",
    a: "We aim to respond quickly and will confirm a realistic timeline when we receive your case. Complex cases that need specialist input can take longer — we tell you if that is the situation.",
  },
  {
    q: "Does Medism provide medical advice?",
    a: "No. Medism is a care-coordination service. Diagnosis, treatment decisions, and medical advice come only from the licensed doctors who review and treat you. We organize the journey around their guidance.",
  },
  {
    q: "Can Medism help with visas and accommodation?",
    a: "Yes. We prepare the hospital documentation medical visa applications require, guide you through the application, and arrange accommodation and local transport suited to treatment and recovery.",
  },
  {
    q: "Can a family member travel with me?",
    a: "Yes, and we encourage it for significant treatment. We support companion visa documentation, shared accommodation, and keeping your family informed throughout.",
  },
  {
    q: "How is my medical information protected?",
    a: "Your information is used only to review your case and coordinate your care, is shared only with the specialists involved, and is never sold or used for marketing. Details are in our privacy policy.",
  },
  {
    q: "What happens after I return home?",
    a: "Before you leave, we help plan follow-up: your discharge summary, medication guidance from the treating team, rehabilitation options, and how to reach your specialist remotely if questions come up.",
  },
];

/* ------------------------------------------------------------------ */
/* Professional programs                                               */
/* ------------------------------------------------------------------ */

export const professionalPrograms = [
  {
    term: "Doctor training & fellowships",
    detail: "Structured clinical training placements and fellowship coordination for doctors seeking advanced experience.",
  },
  {
    term: "Observerships",
    detail: "Short-term clinical observation programs arranged with host departments.",
  },
  {
    term: "Hospital & institutional partnerships",
    detail: "Referral pathways and coordination agreements for hospitals and clinics serving international patients.",
  },
  {
    term: "Healthcare business development",
    detail: "Market entry, patient-experience, and international-patient-department consulting for healthcare organizations.",
  },
];

/* ------------------------------------------------------------------ */
/* Hospitals & specialists — verified-data templates                   */
/* ------------------------------------------------------------------ */

export type HospitalProfile = {
  slug: string;
  placeholder: true;
  name: string;
  city: string;
  strengths: string[];
  languages: string[];
  facilities: string[];
};

/**
 * PLACEHOLDER PROFILES.
 * Medism has not yet supplied verified partner-hospital data for publication.
 * These entries exist to demonstrate the profile structure and are rendered
 * with a visible "awaiting verified partner data" label. They must be replaced
 * with confirmed information before launch.
 */
export const hospitalProfiles: HospitalProfile[] = [
  {
    slug: "profile-template-multispecialty",
    placeholder: true,
    name: "Multi-specialty hospital profile",
    city: "City to be confirmed",
    strengths: ["Clinical strengths listed after verification", "Accreditations shown only with documentation"],
    languages: ["Languages confirmed with the international patient department"],
    facilities: ["Facility details added after verification"],
  },
  {
    slug: "profile-template-cardiac",
    placeholder: true,
    name: "Cardiac-care hospital profile",
    city: "City to be confirmed",
    strengths: ["Cardiac program details listed after verification"],
    languages: ["Languages confirmed with the international patient department"],
    facilities: ["Facility details added after verification"],
  },
  {
    slug: "profile-template-oncology",
    placeholder: true,
    name: "Cancer-care hospital profile",
    city: "City to be confirmed",
    strengths: ["Oncology program details listed after verification"],
    languages: ["Languages confirmed with the international patient department"],
    facilities: ["Facility details added after verification"],
  },
];

/* ------------------------------------------------------------------ */
/* Consultation form options                                           */
/* ------------------------------------------------------------------ */

export const contactMethods = ["Email", "Phone call", "WhatsApp", "Video call"];

export const timeframes = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 6 months",
  "I am exploring options",
];
