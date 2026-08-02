import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { ctas, treatments } from "@/lib/content";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) return {};
  return {
    title: `${t.name} — coordinated dental care`,
    description: t.summary,
  };
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = treatments.find((x) => x.slug === slug);
  if (!t) notFound();

  return (
    <>
      {/* Header */}
      <section className="section--tight section">
        <div className="container" style={{ maxWidth: 900 }}>
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/treatments">Dental treatments</Link>
              </li>
              <li aria-current="page">{t.name}</li>
            </ol>
          </nav>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Dental treatment</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.4rem)" }}>{t.name}</h1>
            <p className="lede">{t.summary}</p>
            <div className="contact-routes">
              <Link href={`/consultation?treatment=${t.slug}`} className="btn btn--primary">
                {ctas.primary.label} <ArrowRight />
              </Link>
              <Link href={ctas.secondary.href} className="btn btn--secondary">
                {ctas.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who / involves */}
      <section className="section section--paper" aria-labelledby="who-h">
        <div className="container" style={{ maxWidth: 900, display: "grid", gap: "3rem" }}>
          <Reveal>
            <h2 id="who-h" className="t-sub" style={{ marginBottom: "1.2rem" }}>
              Who this may be relevant for
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.whoFor.map((c) => (
                <div className="def-item" key={c}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <p style={{ color: "var(--ink-soft)" }}>{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="t-sub" style={{ marginBottom: "1.2rem" }}>
              What it generally involves
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.involves.map((c) => (
                <div className="def-item" key={c}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <p style={{ color: "var(--ink-soft)" }}>{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stages */}
      <section className="section section--apricot" aria-labelledby="stages-h">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Possible stages</p>
            <h2 id="stages-h" className="display t-section" style={{ fontSize: "clamp(1.7rem, 1.2rem + 2vw, 2.5rem)" }}>
              How treatment is commonly staged.
            </h2>
            <p className="lede" style={{ fontSize: "1.05rem" }}>
              Actual staging is set by the treating dentist for your case.
            </p>
          </Reveal>
          <Reveal as="ol" className="journey" stagger={0.05} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {t.stages.map((s, i) => (
              <li className="journey__step" key={s}>
                <span className="journey__num" aria-hidden="true">
                  {i + 1}
                </span>
                <p style={{ color: "var(--ink)" }}>{s}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Questions to ask — the transparency differentiator */}
      <section className="section" aria-labelledby="questions-h">
        <div className="container" style={{ maxWidth: 980 }}>
          <Reveal className="panel" style={{ display: "grid", gap: "1.6rem" }}>
            <p className="eyebrow">Before you decide</p>
            <h2 id="questions-h" className="display" style={{ fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.3rem)" }}>
              Questions worth asking <em>any</em> clinic.
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.questionsToAsk.map((q) => (
                <div className="def-item" key={q}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <p style={{ color: "var(--ink-soft)" }}>{q}</p>
                </div>
              ))}
            </div>
            <div className="note-disclosure">
              A good clinic answers these willingly. If a proposal you receive leaves them open, ask — and
              if you want a second view, we help you compare.
            </div>
          </Reveal>
        </div>
      </section>

      {/* Travel & recovery + review needs */}
      <section className="section section--mint" aria-labelledby="travel-h">
        <div className="container" style={{ maxWidth: 980, display: "grid", gap: "3rem" }}>
          <Reveal>
            <h2 id="travel-h" className="t-sub" style={{ marginBottom: "1.2rem" }}>
              Travel and recovery considerations
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.travelRecovery.map((c) => (
                <div className="def-item" key={c}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <p style={{ color: "var(--ink-soft)" }}>{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="card" style={{ display: "grid", gap: "1rem" }}>
            <h2 className="t-sub">What an initial review needs</h2>
            <p className="muted">
              Send what you already have — an incomplete file is a normal starting point, and we will tell
              you exactly what to obtain.
            </p>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.infoNeeded.map((c) => (
                <div className="def-item" key={c}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <p style={{ color: "var(--ink-soft)" }}>{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="t-sub" style={{ marginBottom: "1.2rem" }}>
              What Medism coordinates
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {t.coordination.map((c) => (
                <div className="def-item" key={c}>
                  <span className="def-item__dot" aria-hidden="true" />
                  <p style={{ color: "var(--ink-soft)" }}>{c}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <div className="note-disclosure">
            This page describes coordination, not dental advice. Whether this treatment is appropriate for
            you, its risks, and its realistic results can only be assessed by the licensed dentist who
            reviews your case. Medism does not publish prices, visit counts, or outcome claims unless
            supplied and verified by the treating clinic.
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
