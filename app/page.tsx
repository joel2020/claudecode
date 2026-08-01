import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { RouteRail } from "@/components/RouteRail";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import {
  ctas,
  dentistProfiles,
  faqs,
  hero,
  journey,
  patientStory,
  site,
  specialties,
  transparency,
  travelSupport,
  treatmentsFor,
  whyMedism,
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

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__grid">
          <Reveal className="hero__copy" stagger={0.08}>
            <p className="eyebrow">Dental care coordination</p>
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
          <Reveal delay={0.15} className="hero__figure">
            <Photo
              src="/medism-care-coordination.webp"
              alt="A care coordinator and a patient reviewing a treatment plan together in a calm, light room"
              brief="A dentist or coordinator and a patient in calm conversation — genuine human interaction, not a close-up of teeth"
              ratio="4 / 5"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* Trust layer — verified signals only */}
      <section className="trust-band section--tight" aria-label="What every patient can rely on">
        <div className="container">
          <div className="trust-band__grid">
            <div className="trust-band__item">
              <strong>A named coordinator</strong>
              <span>One person who knows your case, first message to aftercare</span>
            </div>
            <div className="trust-band__item">
              <strong>Carefully selected dentists</strong>
              <span>Profiles published only with verified qualifications and registrations</span>
            </div>
            <div className="trust-band__item">
              <strong>A written plan first</strong>
              <span>Options, stages, and costs explained before you commit</span>
            </div>
            <div className="trust-band__item">
              <strong>Companions included</strong>
              <span>The person travelling with you is planned for from the start</span>
            </div>
          </div>
          <p className="muted" style={{ fontSize: "0.88rem", padding: "0.9rem 0.25rem 0" }}>
            Partner clinics, locations served, languages, and accreditations will be published here once
            verified. Medism does not publish unconfirmed claims.
          </p>
        </div>
      </section>

      {/* Dental treatments */}
      <section className="section section--paper" aria-labelledby="treatments-heading" style={{ borderBlock: "1px solid var(--line)" }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Dental treatments</p>
            <h2 id="treatments-heading" className="display t-section">
              Understand your options before deciding.
            </h2>
            <p className="lede">
              Every treatment page explains who it may be relevant for, what it involves, and what an initial
              review needs. Whether a treatment is right for you is always decided by the dentist who assesses
              you — not by a website.
            </p>
          </Reveal>
          <ul className="treatment-index">
            {dentalTreatments.map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments/${t.slug}`}>
                  <h3>{t.name}</h3>
                  <p>{t.short}</p>
                  <span className="treatment-index__go" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {inDevelopment.length > 0 && (
            <p className="muted" style={{ fontSize: "0.88rem", marginTop: "1rem", padding: "0 0.5rem" }}>
              Additional specialties in development.
            </p>
          )}
        </div>
      </section>

      {/* Patient journey */}
      <section className="section" aria-labelledby="journey-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Your journey with Medism</p>
            <h2 id="journey-heading" className="display t-section">
              One clear route, from first question to aftercare.
            </h2>
            <p className="lede">
              Every case follows the same path. You always know where you are, what happens next, and who is
              responsible for it.
            </p>
          </Reveal>
          <div className="journey">
            <ol className="journey__list">
              <RouteRail />
              {journey.map((step, i) => (
                <li className="journey__step" key={step.title}>
                  <span className="journey__node" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Reveal className="journey__body">
                    <h3>{step.title}</h3>
                    <p className="muted">{step.body}</p>
                    <p className="journey__aside">{step.aside}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Why Medism */}
      <section className="section section--panel" aria-labelledby="why-heading">
        <div className="container split">
          <div className="split__sticky">
            <p className="eyebrow">Why Medism</p>
            <h2 id="why-heading" className="display t-section">
              Guidance you can <em>question</em>, plans you can trust.
            </h2>
            <p className="lede">
              We measure our work by how confident you feel at each step — not by how quickly you commit.
            </p>
            <Photo
              brief="Documentary style: a coordinator on the phone beside a clinic window, unposed, warm natural light"
              ratio="4 / 3"
            />
          </div>
          <dl className="defs">
            {whyMedism.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Dentists & clinics */}
      <section className="section" aria-labelledby="network-heading">
        <div className="container split--reverse split">
          <div style={{ display: "grid", gap: "1.25rem", alignContent: "start" }}>
            <p className="eyebrow">Dentists &amp; clinics</p>
            <h2 id="network-heading" className="display t-section">
              Professionals published only after verification.
            </h2>
            <p className="lede" style={{ maxWidth: "58ch" }}>
              Every dentist and clinic shown on this site will carry documented credentials — qualifications,
              professional registrations, languages, experience, treatment areas, and accreditations —
              confirmed directly and dated. Until that verification is complete, we show the profile
              structure rather than unconfirmed names.
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
            <div>
              <Link href="/hospitals" className="btn btn--secondary">
                See how profiles will work <ArrowRight />
              </Link>
            </div>
          </div>
          <Photo
            brief="A dentist explaining a treatment plan across a desk — eye contact, unposed, modern consulting room, no instruments in frame"
            ratio="3 / 2"
          />
        </div>
      </section>

      {/* Treatment planning & transparency */}
      <section className="section section--paper" aria-labelledby="transparency-heading" style={{ borderBlock: "1px solid var(--line)" }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Treatment planning &amp; transparency</p>
            <h2 id="transparency-heading" className="display t-section">
              What a responsible proposal looks like.
            </h2>
            <p className="lede">{transparency.intro}</p>
          </Reveal>
          <dl className="defs" style={{ columnGap: "3rem" }}>
            {transparency.items.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="muted" style={{ marginTop: "1.5rem", maxWidth: "62ch" }}>{transparency.note}</p>
        </div>
      </section>

      {/* International travel support */}
      <section className="section" aria-labelledby="support-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">International travel support</p>
            <h2 id="support-heading" className="display t-section">
              Who will help me before, during, and after the trip?
            </h2>
            <p className="lede">
              The honest question behind every treatment journey abroad. Here is the practical answer — the
              support that makes an unfamiliar city feel manageable.
            </p>
          </Reveal>
          <dl className="defs" style={{ columnGap: "3rem" }}>
            {travelSupport.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
          <div style={{ marginTop: "2rem" }}>
            <Link href="/international-patients" className="text-link">
              Everything we arrange for international patients
            </Link>
          </div>
        </div>
      </section>

      {/* Patient story — verified stories only */}
      <section id="patient-story" className="section section--dark on-dark" aria-labelledby="story-heading">
        <div className="container story">
          <Photo
            variant="deep"
            brief={patientStory.artDirection}
            ratio="4 / 5"
          />
          <blockquote>
            <p id="story-heading">
              This space is reserved for a real patient&rsquo;s story — told in their own words, with their
              written permission.
            </p>
            <footer style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
              <p style={{ fontSize: "1rem" }}>
                Medism publishes only verified experiences. No invented names, no invented outcomes, no
                dramatic transformations. When a patient chooses to share their journey, it will appear here —
                how they decided, how the treatment was coordinated, and what they would tell someone in
                their position today.
              </p>
              <span className="tag-placeholder">Awaiting verified patient story</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--paper" aria-labelledby="faq-heading" style={{ borderTop: "1px solid var(--line)" }}>
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

      {/* Final conversion */}
      <CtaSection />
    </>
  );
}
