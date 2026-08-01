import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { patientServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "International patient support",
  description:
    "The practical services that make cross-border treatment manageable: medical-record collection, specialist matching, visa support, transport, accommodation, interpreters, family support, and recovery planning.",
};

export default function InternationalPatientsPage() {
  return (
    <>
      <section className="section--tight section">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <p className="eyebrow">International patients</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
              Who will help me when I arrive?
            </h1>
            <p className="lede">
              It is the quiet question behind every treatment abroad. The answer is a named care coordinator
              and a set of practical services that remove the unfamiliar parts of the journey — so you can
              concentrate on treatment and recovery.
            </p>
          </div>

          <div className="split">
            <div className="split__sticky">
              <Photo
                brief="A coordinator greeting a patient and family member at airport arrivals — relief, warmth, documentary framing"
                ratio="4 / 5"
              />
              <p className="muted" style={{ fontSize: "0.95rem" }}>
                Every service below is arranged around the treating hospital&rsquo;s plan. Travel timing
                always follows medical guidance.
              </p>
            </div>
            <dl className="defs">
              {patientServices.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="panel" style={{ marginTop: "3.5rem", display: "grid", gap: "1rem", maxWidth: 820 }}>
            <h2 className="t-sub">Travelling with family</h2>
            <p className="muted">
              For significant treatment we encourage a family member to travel with you. Medism supports
              companion visa documentation, shared accommodation, and keeping your family informed the way
              you choose. A companion is part of the plan, not an afterthought.
            </p>
            <div className="contact-routes">
              <Link href="/consultation" className="btn btn--primary">
                Request a Care Consultation <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
