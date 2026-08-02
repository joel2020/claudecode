import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { ctas } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Medism",
  description:
    "Medism is a dental-travel and care-coordination service. Its role is to reduce the uncertainty, complexity, and stress of seeking dental treatment away from home.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section--tight section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-head">
            <p className="eyebrow">About Medism</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
              Confident smiles, <em>carefully coordinated</em>.
            </h1>
            <p className="lede">
              Medism is a premium dental-travel and care-coordination service. We help people understand
              their dental options, connect with carefully selected professionals, and manage the travel,
              language, and follow-up that make treatment abroad possible.
            </p>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <Reveal as="section" aria-labelledby="role-h" style={{ display: "grid", gap: "0.75rem" }}>
              <h2 id="role-h" className="t-sub">
                What we are — and what we are not
              </h2>
              <p className="muted">
                Medism does not diagnose and does not replace dentists. Examination, diagnosis, treatment
                decisions, and clinical advice belong to the licensed dentists who review and treat you. Our
                role is everything around that: making sure your case reaches the right professionals, that
                you understand your options, and that the practical journey — records, travel, stay,
                language, companions, aftercare — is handled with care.
              </p>
            </Reveal>

            <Reveal as="section" aria-labelledby="believe-h" style={{ display: "grid", gap: "1rem" }}>
              <h2 id="believe-h" className="t-sub">
                What we believe
              </h2>
              <div className="defs">
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Uncertainty is the enemy</strong>
                    <p>
                      Most of the fear in dental travel comes from not knowing what happens next. Our answer
                      is a clear route with named steps — and a person responsible for it.
                    </p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Honesty over persuasion</strong>
                    <p>
                      We publish only what we can verify, we do not promise outcomes, and if the right
                      answer is to be treated close to home, we say so.
                    </p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Nobody decides alone</strong>
                    <p>
                      Significant treatment is rarely decided alone. We build the journey for you and the
                      people beside you.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Photo
              src="/images/clinic-environment.webp"
              alt="A calm, bright clinic waiting area with arched doorways and warm chairs"
              brief="Calm clinic environment"
              ratio="21 / 9"
            />

            <div className="note-disclosure">
              Company facts — founding year, leadership, registered locations, and team profiles — will be
              published here once supplied and verified by Medism.
            </div>

            <div className="contact-routes">
              <Link href={ctas.primary.href} className="btn btn--primary">
                {ctas.primary.label} <ArrowRight />
              </Link>
              <Link href="/contact" className="btn btn--secondary">
                Contact Medism
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
