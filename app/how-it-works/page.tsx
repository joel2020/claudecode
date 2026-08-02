import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Reveal } from "@/components/Reveal";
import { journey } from "@/lib/content";

export const metadata: Metadata = {
  title: "How it works — your journey with Medism",
  description:
    "The six steps of a Medism care journey: share your case, receive an initial review, compare specialists, plan travel, be supported through treatment, and continue into recovery.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="section--tight section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
              One route, from first conversation to recovery.
            </h1>
            <p className="lede">
              Seeking treatment away from home is stressful enough. The process should not add to it. Here is
              exactly what happens after you contact Medism — and what each step asks of you.
            </p>
          </div>

          <Reveal as="ol" className="journey" stagger={0.05} style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {journey.map((step, i) => (
              <li className="journey__step" key={step.title}>
                <span className="journey__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h2 style={{ fontSize: "1.12rem" }}>{step.title}</h2>
                <p>{step.body}</p>
                <p className="journey__aside">{step.aside}</p>
              </li>
            ))}
          </Reveal>

          <div className="panel" style={{ marginTop: "3rem", display: "grid", gap: "1rem" }}>
            <h2 className="t-sub">Where the boundaries are</h2>
            <p className="muted">
              Medism coordinates. Doctors decide. At every step, diagnosis, treatment choices, and medical
              advice come only from the licensed specialists and hospitals reviewing your case. If at any
              point the right answer is to be treated close to home, we will tell you.
            </p>
            <div className="contact-routes">
              <Link href="/consultation" className="btn btn--primary">
                Start with a Care Consultation <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
