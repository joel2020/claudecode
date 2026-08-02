import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import {
  ctas,
  dentistProfiles,
  faqs,
  hero,
  journey,
  site,
  specialties,
  transparency,
  travelSupport,
  treatmentsFor,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Medism — Expert dental care, coordinated around you",
  description: site.description,
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const dentalTreatments = treatmentsFor("dental");
const inDevelopment = specialties.filter((s) => s.status === "in-development");

/** Editorial allocation of the treatment taxonomy across mixed module sizes. */
const featured = dentalTreatments.find((t) => t.slug === "dental-implants");
const mediaCard = dentalTreatments.find((t) => t.slug === "full-arch-rehabilitation");
const smallCards = dentalTreatments.filter(
  (t) => !["dental-implants", "full-arch-rehabilitation"].includes(t.slug)
);
const remainingNames = smallCards.slice(4).map((t) => t.name);

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* 2 — Cinematic hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__grid">
          <Reveal className="hero__copy" stagger={0.08}>
            <p className="eyebrow">Dental travel, carefully coordinated</p>
            <h1 id="hero-heading" className="display t-hero">
              Expert dental care, <em>coordinated around you</em>.
            </h1>
            <p className="lede">{hero.copy}</p>
            <div className="hero__ctas">
              <Link href={ctas.primary.href} className="btn btn--primary">
                {ctas.primary.label} <ArrowRight />
              </Link>
              <Link href={ctas.explore.href} className="btn btn--secondary">
                {ctas.explore.label}
              </Link>
            </div>
            <p className="assurance">
              {hero.reassurance.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <figure className="hero__figure" style={{ margin: 0 }}>
              <Image
                src="/images/hero-consultation.webp"
                alt="A patient and a Medism care coordinator talking together on a bench in a sunlit clinic lounge"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 42vw"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 3 — Immediate service strip */}
      <section className="section--paper section--tight" aria-label="How to start">
        <div className="container">
          <Reveal className="svc-strip" stagger={0.06}>
            <Link href={ctas.primary.href} className="svc-item">
              <span className="icon-chip" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.6 8.6 0 0 1-3.3-.7L3 21l1.8-5.7a8.4 8.4 0 1 1 16.2-3.8Z"/></svg>
              </span>
              <h3>Request an assessment</h3>
              <p>Tell us what you need, in your own words.</p>
            </Link>
            <Link href={ctas.secondary.href} className="svc-item">
              <span className="icon-chip icon-chip--apricot" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4m0 0 4 4m-4-4L8 8"/><path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>
              </span>
              <h3>Share existing records</h3>
              <p>Photographs, X-rays, or scans — whatever you already have.</p>
            </Link>
            <Link href={ctas.tertiary.href} className="svc-item">
              <span className="icon-chip icon-chip--sun" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5a7 7 0 0 1 4 4M15 1.8a10.4 10.4 0 0 1 7.2 7.1M8.6 3.9a1.5 1.5 0 0 1 1.7.8l1.3 2.9a1.5 1.5 0 0 1-.4 1.7L9.7 10.6a12.5 12.5 0 0 0 3.7 3.7l1.3-1.5a1.5 1.5 0 0 1 1.7-.4l2.9 1.3a1.5 1.5 0 0 1 .8 1.7l-.6 2.6a1.6 1.6 0 0 1-1.6 1.2A16.5 16.5 0 0 1 2.8 6.1a1.6 1.6 0 0 1 1.2-1.6Z"/></svg>
              </span>
              <h3>Speak with a coordinator</h3>
              <p>A real person explains what happens next.</p>
            </Link>
            <Link href="/how-it-works" className="svc-item">
              <span className="icon-chip" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9.2"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></svg>
              </span>
              <h3>Understand the process</h3>
              <p>Every step explained before you commit to anything.</p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4 — Emotional positioning */}
      <section className="section section--mint" aria-labelledby="options-heading">
        <div className="container split">
          <Reveal>
            <Photo
              src="/images/coordinator-review.webp"
              alt="A care coordinator and a patient looking through options together on a tablet"
              brief="Patient and coordinator reviewing options together"
              ratio="4 / 5"
              arch
            />
          </Reveal>
          <Reveal style={{ display: "grid", gap: "1.4rem", justifyItems: "start" }}>
            <p className="eyebrow">Before anything else</p>
            <h2 id="options-heading" className="display t-section">
              Understand your options <em>before deciding</em>.
            </h2>
            <p className="lede">
              Most people arrive with the same worries. Medism exists to answer them honestly — before you
              commit to anything.
            </p>
            <ul className="worry-list" aria-label="The questions we answer first">
              {[
                "Will it hurt?",
                "Is it safe?",
                "What will it really cost?",
                "Can I trust the quality?",
                "How does the travel work?",
                "What about recovery?",
                "Who follows up afterwards?",
              ].map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p className="muted" style={{ maxWidth: "56ch" }}>
              No pressure, no countdown timers, no sales scripts. A clear picture of what is possible, what
              it involves, what it costs — and enough time to decide at your own pace.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5 — Dental treatments, editorial modules */}
      <section className="section" aria-labelledby="treatments-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Dental treatments</p>
            <h2 id="treatments-heading" className="display t-section">
              From a single crown to a complete new smile.
            </h2>
            <p className="lede">
              Every treatment page explains who it may be relevant for, what it involves, and what an initial
              review needs. Whether a treatment is right for you is always decided by the dentist who
              assesses you — not by a website.
            </p>
          </Reveal>
          <Reveal className="tx-grid" stagger={0.06}>
            {featured && (
              <Link href={`/treatments/${featured.slug}`} className="tx-feature">
                <h3>{featured.name}</h3>
                <p className="muted" style={{ maxWidth: "52ch" }}>{featured.short}. {featured.summary.split(". ")[0]}.</p>
                <span className="text-link">
                  About {featured.name.toLowerCase()} <ArrowRight size={16} />
                </span>
              </Link>
            )}
            {mediaCard && (
              <Link href={`/treatments/${mediaCard.slug}`} className="tx-media">
                <Image
                  src="/images/clinic-environment.webp"
                  alt="A calm, bright clinic waiting area with arched doorways"
                  fill
                  sizes="(max-width: 620px) 100vw, 33vw"
                />
                <span className="tx-media__tag">{mediaCard.name}</span>
              </Link>
            )}
            {smallCards.slice(0, 4).map((t) => (
              <Link key={t.slug} href={`/treatments/${t.slug}`} className="tx-card">
                <h3>{t.name}</h3>
                <p>{t.short}</p>
              </Link>
            ))}
            <Link href="/treatments" className="tx-more">
              <h3>
                {remainingNames.join(" · ")} — and the rest of the dental taxonomy, explained without
                jargon.
              </h3>
              <span className="text-link" style={{ color: "var(--ink)" }}>
                All dental treatments <ArrowRight size={16} />
              </span>
            </Link>
          </Reveal>
          {inDevelopment.length > 0 && (
            <p className="muted" style={{ fontSize: "0.88rem", marginTop: "1.2rem" }}>
              Additional specialties in development.
            </p>
          )}
        </div>
      </section>

      {/* 6 — Patient journey */}
      <section className="section section--apricot" aria-labelledby="journey-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">The patient journey</p>
            <h2 id="journey-heading" className="display t-section">
              One clear path, from first message to follow-up.
            </h2>
            <p className="lede">
              Every case follows the same route. You always know where you are, what happens next, and who
              is responsible for it.
            </p>
          </Reveal>
          <Reveal as="ol" className="journey" stagger={0.05} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {journey.map((step, i) => (
              <li className="journey__step" key={step.title}>
                <span className="journey__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <p className="journey__aside">{step.aside}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 7 — Treatment-planning transparency (signature section) */}
      <section className="section" aria-labelledby="transparency-heading">
        <div className="container">
          <Reveal className="panel" style={{ display: "grid", gap: "2.2rem" }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Treatment-plan transparency</p>
              <h2 id="transparency-heading" className="display t-section">
                A responsible proposal leaves <em>nothing vague</em>.
              </h2>
              <p className="lede">{transparency.intro}</p>
            </div>
            <div className="defs">
              {transparency.items.map((item) => (
                <div className="def-item" key={item.term}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>{item.term}</strong>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="note-disclosure">{transparency.note}</div>
          </Reveal>
        </div>
      </section>

      {/* 8 — Dentists & clinics */}
      <section className="section section--paper" aria-labelledby="network-heading">
        <div className="container split split--reverse">
          <Reveal style={{ display: "grid", gap: "1.4rem", justifyItems: "start" }}>
            <p className="eyebrow">Dentists &amp; clinics</p>
            <h2 id="network-heading" className="display t-section">
              Profiles published only after verification.
            </h2>
            <p className="lede">
              Every dentist and clinic profile lists only approved, verifiable information: qualifications,
              professional registration, languages, experience, clinic and location, treatment areas, and
              accreditation.
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.4rem", color: "var(--ink-soft)" }}>
              {dentistProfiles.map((p) => (
                <li key={p.slug}>{p.specialty}</li>
              ))}
            </ul>
            <div className="note-disclosure">
              Partner dentist and clinic profiles are pending verification and will be published once
              confirmed. Medism never fabricates credentials and never implies a partnership that has not
              been agreed.
            </div>
            <Link href="/clinics" className="btn btn--secondary">
              See how profiles will work <ArrowRight />
            </Link>
          </Reveal>
          <Reveal>
            <Photo
              src="/images/dentist-explains.webp"
              alt="A dentist explaining a treatment plan across a table, in warm conversation with a patient"
              brief="A dentist explaining a plan across a desk"
              ratio="4 / 5"
              arch
            />
          </Reveal>
        </div>
      </section>

      {/* 9 — International patient support */}
      <section className="section section--mint" aria-labelledby="support-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">International travel support</p>
            <h2 id="support-heading" className="display t-section">
              Who helps me before, during, and after the trip?
            </h2>
            <p className="lede">
              The honest question behind every treatment journey abroad. Here is the practical answer — the
              support that makes an unfamiliar city feel manageable.
            </p>
          </Reveal>
          <div className="split" style={{ alignItems: "start" }}>
            <Reveal style={{ display: "grid", gap: "22px" }}>
              <Photo
                src="/images/arrival-support.webp"
                alt="A care coordinator warmly greeting an arriving couple beside a bright glass wall"
                brief="Arrival greeting"
                ratio="3 / 2"
              />
              <Photo
                src="/images/travel-planning.webp"
                alt="A sunlit table with an open blank notebook, a cup of tea, and a sprig of eucalyptus"
                brief="Travel planning still life"
                ratio="3 / 2"
              />
            </Reveal>
            <Reveal className="defs" style={{ gridTemplateColumns: "1fr", gap: "16px" }} stagger={0.04}>
              {travelSupport.map((item) => (
                <div className="def-item" key={item.term}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>{item.term}</strong>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
          <div style={{ marginTop: "2.2rem" }}>
            <Link href="/international-patients" className="text-link">
              Everything we arrange for international patients <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10 — Patient story (verified stories only) */}
      <section id="patient-story" className="section" aria-labelledby="story-heading">
        <div className="container split">
          <Reveal>
            <Photo
              src="/images/story-portrait.webp"
              alt="Portrait placeholder: a man smiling naturally by a sunlit window"
              brief="Verified patient story portrait"
              ratio="4 / 5"
              arch
            />
          </Reveal>
          <Reveal className="story">
            <p className="eyebrow">A patient&rsquo;s story</p>
            <blockquote>
              <p id="story-heading">
                This space is reserved for a real patient&rsquo;s story — told in their own words, with
                their written permission.
              </p>
            </blockquote>
            <p className="muted" style={{ maxWidth: "54ch" }}>
              Medism publishes only verified experiences. No invented names, no invented outcomes, no
              dramatic transformations. When a patient chooses to share their journey, it will appear here —
              how they decided, how the treatment was coordinated, and what they would tell someone in their
              position today.
            </p>
            <span className="tag-placeholder">Awaiting verified patient story</span>
          </Reveal>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section className="section section--sun" aria-labelledby="faq-heading">
        <div className="container" style={{ maxWidth: 880 }}>
          <Reveal className="section-head">
            <p className="eyebrow">Questions, answered plainly</p>
            <h2 id="faq-heading" className="display t-section">
              What patients ask before they write to us.
            </h2>
          </Reveal>
          <Faq items={faqs} />
        </div>
      </section>

      {/* 12 — Final CTA */}
      <CtaSection />
    </>
  );
}
