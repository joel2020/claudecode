import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { treatmentsFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dental treatments",
  description:
    "The dental treatments Medism coordinates for international patients — implants, full-arch rehabilitation, crowns, veneers, orthodontics, and more. Suitability is always decided by the dentist who assesses you.",
};

const dental = treatmentsFor("dental");

export default function TreatmentsPage() {
  return (
    <>
      <section className="section section--tight">
        <div className="container">
          <div className="split split--reverse" style={{ alignItems: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
            <Reveal className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Dental treatments</p>
              <h1 className="display t-hero" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
                Every option explained, <em>before you decide</em>.
              </h1>
              <p className="lede">
                Each treatment page explains who it may be relevant for, what it involves, the questions
                worth asking, and what an initial review needs. Whether a treatment is right for you is
                always decided by the dentist who assesses you — not by a website.
              </p>
            </Reveal>
            <Reveal>
              <Photo
                src="/images/smile-man-serene.webp"
                alt="A man smiling serenely with his eyes closed in warm afternoon light"
                brief="Confident, relaxed outcome mood"
                ratio="4 / 3"
                arch
              />
            </Reveal>
          </div>

          <Reveal as="ul" className="treatment-index" stagger={0.05}>
            {dental.map((t) => (
              <li key={t.slug}>
                <Link href={`/treatments/${t.slug}`}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>{t.name}</h2>
                  <p>{t.short}</p>
                  <span className="treatment-index__go" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>

          <div className="note-disclosure" style={{ marginTop: "2.5rem", maxWidth: 820 }}>
            Medism does not publish treatment prices, visit counts, or outcome claims unless they are
            supplied and verified by the treating clinic. If your concern is not listed, send your case
            anyway — we will tell you honestly whether we can help.
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
