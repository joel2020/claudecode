import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "About Medism",
  description:
    "Medism is a patient-first medical travel and international healthcare coordination company. Its role is to reduce the uncertainty, complexity, and stress of seeking treatment away from home.",
};

export default function AboutPage() {
  return (
    <>
      <section className="section--tight section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-head">
            <p className="eyebrow">About Medism</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
              We exist to make a hard journey <em>navigable</em>.
            </h1>
            <p className="lede">
              Medism is a patient-first medical travel and international healthcare coordination company. We
              help patients and families access appropriate specialists, hospitals, and treatments — with the
              travel, accommodation, language, and follow-up support that make it possible.
            </p>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <section aria-labelledby="role-h" style={{ display: "grid", gap: "0.75rem" }}>
              <h2 id="role-h" className="t-sub">
                What we are — and what we are not
              </h2>
              <p className="muted">
                Medism does not diagnose patients and does not replace doctors. Diagnosis, treatment
                decisions, and medical advice belong to the licensed specialists and hospitals who review and
                treat you. Our role is everything around that: making sure your case reaches the right
                people, that you understand your options, and that the practical journey — visa, travel,
                stay, language, family, recovery — is handled with care.
              </p>
            </section>

            <section aria-labelledby="believe-h" style={{ display: "grid", gap: "0.75rem" }}>
              <h2 id="believe-h" className="t-sub">
                What we believe
              </h2>
              <dl className="defs">
                <div>
                  <dt>Uncertainty is the enemy</dt>
                  <dd>
                    Most of the fear in medical travel comes from not knowing what happens next. Our answer
                    is a clear route with named steps — and a person responsible for it.
                  </dd>
                </div>
                <div>
                  <dt>Honesty over persuasion</dt>
                  <dd>
                    We publish only what we can verify, we do not promise outcomes, and if the right answer
                    is to seek care at home, we say so.
                  </dd>
                </div>
                <div>
                  <dt>Families make these decisions</dt>
                  <dd>
                    Serious treatment is rarely decided alone. We build the journey for the patient and the
                    people beside them.
                  </dd>
                </div>
              </dl>
            </section>

            <Photo
              brief="The Medism coordination team at work — candid, warm, real people, no posed group shot"
              ratio="21 / 9"
            />

            <div className="note-disclosure">
              Company facts — founding year, leadership, registered locations, and team profiles — will be
              published here once supplied and verified by Medism.
            </div>

            <div className="contact-routes">
              <Link href="/consultation" className="btn btn--primary">
                Request a Care Consultation <ArrowRight />
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
