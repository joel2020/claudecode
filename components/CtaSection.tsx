import Link from "next/link";
import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";
import { ctas, finalCta } from "@/lib/content";

/** Final conversion section, shared across pages. */
export function CtaSection() {
  return (
    <section className="section section--dark on-dark" aria-labelledby="cta-heading">
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
          <p className="eyebrow">The next step</p>
          <h2 id="cta-heading" className="display t-section">
            Take the first step with a <em>clearer understanding</em> of your options.
          </h2>
          <p className="lede">{finalCta.body}</p>
          <div className="contact-routes">
            <Link href={ctas.primary.href} className="btn btn--primary">
              {ctas.primary.label} <ArrowRight />
            </Link>
            <Link href={ctas.secondary.href} className="btn btn--secondary">
              {ctas.secondary.label}
            </Link>
            <Link href={ctas.tertiary.href} className="btn btn--secondary">
              {ctas.tertiary.label}
            </Link>
          </div>
          <p style={{ fontSize: "0.92rem" }}>
            {finalCta.privacyNote} Medism is not an emergency service.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
