import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { journey, treatments } from "@/lib/content";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: `${t.name} — international patient coordination`,
    description: t.summary,
  };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <>
      <section className="section--tight section">
        <div className="container" style={{ maxWidth: 880 }}>
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/treatments">Treatments</Link>
              </li>
              <li aria-current="page">{t.name}</li>
            </ol>
          </nav>
          <div className="section-head">
            <p className="eyebrow">Clinical program</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.4rem)" }}>{t.name}</h1>
            <p className="lede">{t.summary}</p>
            <div className="contact-routes">
              <Link href={`/consultation?treatment=${t.slug}`} className="btn btn--primary">
                Request a Care Consultation <ArrowRight />
              </Link>
              <Link href="/consultation?intent=reports" className="btn btn--secondary">
                Send Your Medical Reports
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <section aria-labelledby="conditions-h">
              <h2 id="conditions-h" className="t-sub" style={{ marginBottom: "1rem" }}>
                Who this may be relevant for
              </h2>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.5rem", color: "var(--ink-soft)" }}>
                {t.whoFor.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="specialties-h">
              <h2 id="specialties-h" className="t-sub" style={{ marginBottom: "1rem" }}>
                What it generally involves
              </h2>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.5rem", color: "var(--ink-soft)" }}>
                {t.involves.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="expect-h">
              <h2 id="expect-h" className="t-sub" style={{ marginBottom: "1rem" }}>
                What Medism coordinates
              </h2>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.5rem", color: "var(--ink-soft)" }}>
                {t.coordination.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="process-h">
              <h2 id="process-h" className="t-sub" style={{ marginBottom: "1rem" }}>
                How coordination works
              </h2>
              <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.5rem", color: "var(--ink-soft)" }}>
                {journey.map((s) => (
                  <li key={s.title}>
                    <strong style={{ color: "var(--ink)" }}>{s.title}.</strong> {s.aside}.
                  </li>
                ))}
              </ol>
              <p style={{ marginTop: "0.75rem" }}>
                <Link href="/how-it-works" className="text-link">
                  The full journey, step by step
                </Link>
              </p>
            </section>

            <section aria-labelledby="review-h" className="panel">
              <h2 id="review-h" className="t-sub" style={{ marginBottom: "1rem" }}>
                What a case review needs
              </h2>
              <p className="muted" style={{ marginBottom: "1rem" }}>
                Send what you already have — an incomplete file is a normal starting point, and we will tell
                you exactly what to obtain.
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.5rem", color: "var(--ink-soft)" }}>
                {t.infoNeeded.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </section>

            <div className="note-disclosure">
              This page describes coordination, not medical advice. Whether a treatment is appropriate for
              you, its risks, and its likely results can only be assessed by licensed doctors who review your
              case. Medism does not publish prices, timelines, or success rates unless supplied and verified
              by the treating hospital.
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
