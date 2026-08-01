import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { RouteRail } from "@/components/RouteRail";
import { Faq } from "@/components/Faq";
import { CtaSection } from "@/components/CtaSection";
import {
  faqs,
  journey,
  patientServices,
  professionalPrograms,
  treatments,
  whyMedism,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Medism — World-class care, coordinated around you",
  description:
    "Medism helps international patients find appropriate specialists, compare treatment options, and coordinate every step of their healthcare journey — from medical review and travel planning to treatment and recovery.",
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

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* 2 — Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__grid">
          <Reveal className="hero__copy" stagger={0.08}>
            <p className="eyebrow">International healthcare coordination</p>
            <h1 id="hero-heading" className="display t-hero">
              World-class care, <em>coordinated around you</em>.
            </h1>
            <p className="lede">
              Medism helps international patients find appropriate specialists, compare treatment options,
              and coordinate every step of their healthcare journey — from medical review and travel planning
              to treatment and recovery.
            </p>
            <div className="hero__ctas">
              <Link href="/consultation" className="btn btn--primary">
                Request a Care Consultation <ArrowRight />
              </Link>
              <Link href="/treatments" className="btn btn--secondary">
                Explore Treatments
              </Link>
            </div>
            <p className="assurance">
              <span>Confidential case review</span>
              <span>Personal care coordinator</span>
              <span>Clear next steps</span>
            </p>
          </Reveal>
          <Reveal delay={0.15} className="hero__figure">
            <Photo
              src="/medism-care-coordination.webp"
              alt="A care coordinator and a patient reviewing a treatment plan together in a calm, light room"
              brief="A care coordinator and a patient reviewing a plan together"
              ratio="4 / 5"
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* 3 — Immediate trust layer */}
      <section className="trust-band section--tight" aria-label="What every patient can rely on">
        <div className="container">
          <div className="trust-band__grid">
            <div className="trust-band__item">
              <strong>A named coordinator</strong>
              <span>One person who knows your case, start to finish</span>
            </div>
            <div className="trust-band__item">
              <strong>Specialist matching</strong>
              <span>Cases directed to doctors whose work fits the condition</span>
            </div>
            <div className="trust-band__item">
              <strong>Whole-journey support</strong>
              <span>Medical review, visa, travel, stay, treatment, recovery</span>
            </div>
            <div className="trust-band__item">
              <strong>Family included</strong>
              <span>Companions supported with travel, stay, and updates</span>
            </div>
          </div>
          <p className="muted" style={{ fontSize: "0.88rem", padding: "0.9rem 0.25rem 0" }}>
            Network figures — partner hospitals, countries served, and languages supported — will be published
            here once verified. Medism does not publish unconfirmed statistics.
          </p>
        </div>
      </section>

      {/* 4 — The care journey */}
      <section className="section" aria-labelledby="journey-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Your journey with Medism</p>
            <h2 id="journey-heading" className="display t-section">
              One route, from first conversation to recovery.
            </h2>
            <p className="lede">
              Every case follows a clear path. You always know where you are, what happens next, and who is
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

      {/* 5 — Treatments */}
      <section className="section section--paper" aria-labelledby="treatments-heading" style={{ borderBlock: "1px solid var(--line)" }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Treatments &amp; clinical programs</p>
            <h2 id="treatments-heading" className="display t-section">
              Care organized by what you are facing.
            </h2>
            <p className="lede">
              Start with the specialty closest to your situation. Each program explains what to expect and
              what a case review needs — treatment decisions always remain with the doctors who review you.
            </p>
          </Reveal>
          <ul className="treatment-index">
            {treatments.map((t) => (
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
        </div>
      </section>

      {/* 6 — Why Medism */}
      <section className="section" aria-labelledby="why-heading">
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
              brief="Documentary style: a coordinator on the phone beside a hospital corridor window, unposed, warm natural light"
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

      {/* 7 — Hospitals & specialists */}
      <section className="section section--panel" aria-labelledby="network-heading">
        <div className="container split--reverse split">
          <div style={{ display: "grid", gap: "1.25rem", alignContent: "start" }}>
            <p className="eyebrow">Hospitals &amp; doctors</p>
            <h2 id="network-heading" className="display t-section">
              A network published only after verification.
            </h2>
            <p className="lede" style={{ maxWidth: "58ch" }}>
              Every hospital and specialist shown on this site will carry documented, dated credentials —
              accreditations, clinical strengths, languages, and facilities — confirmed directly with the
              institution. Until that verification is complete, we show the profile structure rather than
              unconfirmed names.
            </p>
            <div className="note-disclosure">
              Partner hospital and doctor profiles are pending verification and will be published once
              confirmed. Medism never implies a partnership that has not been agreed.
            </div>
            <div>
              <Link href="/hospitals" className="btn btn--secondary">
                See how profiles will work <ArrowRight />
              </Link>
            </div>
          </div>
          <Photo
            brief="A specialist speaking directly with a patient across a desk — eye contact, unposed, modern consulting room"
            ratio="3 / 2"
          />
        </div>
      </section>

      {/* 8 — International patient support */}
      <section className="section" aria-labelledby="support-heading">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">International patient support</p>
            <h2 id="support-heading" className="display t-section">
              Who will help me when I arrive?
            </h2>
            <p className="lede">
              The honest question behind every cross-border treatment. Here is the practical answer — the
              services that make an unfamiliar city feel manageable.
            </p>
          </Reveal>
          <dl className="defs" style={{ columnGap: "3rem" }}>
            {patientServices.map((item) => (
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

      {/* 9 — Human story (labeled placeholder) */}
      <section className="section section--dark on-dark" aria-labelledby="story-heading">
        <div className="container story">
          <Photo
            variant="deep"
            brief="Large documentary portrait: a recovered patient at home with family, natural light, quiet joy — verified story and written permission required before publication"
            ratio="4 / 5"
          />
          <blockquote>
            <p id="story-heading">
              This space is reserved for a real patient&rsquo;s story — told in their own words, with their
              written permission.
            </p>
            <footer style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
              <p style={{ fontSize: "1rem" }}>
                Medism publishes only verified experiences. No invented names, no invented outcomes. When a
                patient chooses to share their journey, it will appear here — the treatment they sought, how
                the journey was coordinated, and what they would tell someone in their position today.
              </p>
              <span className="tag-placeholder">Awaiting verified patient story</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 10 — Professional programs */}
      <section className="section--tight section" aria-labelledby="pro-heading">
        <div className="container split">
          <div style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
            <p className="eyebrow">For doctors &amp; institutions</p>
            <h2 id="pro-heading" className="t-sub">
              Professional programs
            </h2>
            <p className="muted" style={{ maxWidth: "48ch" }}>
              Separate from patient care, Medism works with doctors and healthcare organizations on training,
              observerships, and institutional collaboration.
            </p>
            <div>
              <Link href="/professional-programs" className="text-link">
                Explore professional programs
              </Link>
            </div>
          </div>
          <dl className="defs">
            {professionalPrograms.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 11 — FAQ */}
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

      {/* 12 — Final conversion */}
      <CtaSection />
    </>
  );
}
