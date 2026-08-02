import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { ctas, travelSupport } from "@/lib/content";

export const metadata: Metadata = {
  title: "International travel support",
  description:
    "The practical services that make dental treatment abroad manageable: record collection, remote consultation, scheduling, travel and visa support, transport, accommodation, language support, companion assistance, and remote follow-up.",
};

export default function InternationalPatientsPage() {
  return (
    <>
      <section className="section section--tight">
        <div className="container">
          <div className="split split--reverse" style={{ alignItems: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
            <Reveal className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">International travel support</p>
              <h1 className="display t-hero" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
                Who helps me <em>when I arrive</em>?
              </h1>
              <p className="lede">
                It is the quiet question behind every treatment journey abroad. The answer is a named care
                coordinator and a set of practical services that remove the unfamiliar parts — so you can
                concentrate on treatment and recovery.
              </p>
            </Reveal>
            <Reveal>
              <Photo
                src="/images/arrival-support.webp"
                alt="A care coordinator warmly greeting an arriving couple beside a bright glass wall"
                brief="Arrival greeting"
                ratio="4 / 3"
                arch
              />
            </Reveal>
          </div>

          <div className="split" style={{ alignItems: "start" }}>
            <Reveal style={{ display: "grid", gap: "22px" }}>
              <Photo
                src="/images/travel-planning.webp"
                alt="A sunlit table with an open blank notebook, tea, and eucalyptus — travel planning"
                brief="Travel planning still life"
                ratio="3 / 2"
              />
              <Photo
                src="/images/aftercare-followup.webp"
                alt="A woman at home waving to her care team on a laptop video call"
                brief="Remote follow-up at home"
                ratio="3 / 2"
              />
              <p className="muted" style={{ fontSize: "0.95rem" }}>
                Every service below is arranged around the treating dentist&rsquo;s plan. Travel timing
                always follows clinical guidance.
              </p>
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

          <Reveal className="panel" style={{ marginTop: "clamp(48px, 7vw, 80px)", display: "grid", gap: "1.2rem", maxWidth: 860 }}>
            <p className="eyebrow">Travelling together</p>
            <h2 className="display" style={{ fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.2rem)" }}>
              A companion is part of the plan, not an afterthought.
            </h2>
            <p className="muted">
              For significant treatment we encourage someone to travel with you. Medism supports companion
              visa documentation, shared accommodation, and keeping your family informed the way you choose.
            </p>
            <div className="contact-routes">
              <Link href={ctas.primary.href} className="btn btn--primary">
                {ctas.primary.label} <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
