import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { treatments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Treatments & clinical programs",
  description:
    "The clinical programs Medism coordinates for international patients — from cardiac surgery and oncology to orthopedics, IVF, and rehabilitation. Treatment decisions always remain with licensed doctors.",
};

export default function TreatmentsPage() {
  return (
    <>
      <section className="section--tight section">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <p className="eyebrow">Treatments &amp; clinical programs</p>
            <h1 className="display t-hero" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
              Care organized by what you are facing.
            </h1>
            <p className="lede">
              Choose the specialty closest to your situation. Each program explains the conditions it covers,
              what you can expect, and what a case review needs. Medism coordinates access and logistics;
              diagnosis and treatment decisions belong to the doctors who review you.
            </p>
          </div>
          <ul className="treatment-index">
            {treatments.map((t) => (
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
          </ul>
          <p className="muted" style={{ marginTop: "2rem", maxWidth: "70ch", fontSize: "0.95rem" }}>
            Medism does not publish treatment prices, timelines, success rates, or eligibility statements
            unless they are supplied and verified by the treating hospital. If your condition is not listed,
            send your case anyway — we will tell you honestly whether we can help.
          </p>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
