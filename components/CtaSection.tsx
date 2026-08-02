import Link from "next/link";
import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";
import { ctas, finalCta } from "@/lib/content";

/** Final conversion section, shared across pages — the ink band. */
export function CtaSection() {
  return (
    <section className="section section--ink on-dark" aria-labelledby="cta-heading">
      <div className="container" style={{ maxWidth: 860 }}>
        <Reveal style={{ display: "grid", gap: "1.6rem", justifyItems: "center", textAlign: "center" }}>
          <p className="eyebrow">The next step</p>
          <h2 id="cta-heading" className="display t-section">
            {finalCta.heading}
          </h2>
          <p className="lede" style={{ marginInline: "auto" }}>
            {finalCta.body}
          </p>
          <div className="contact-routes" style={{ justifyContent: "center" }}>
            <Link href={ctas.primary.href} className="btn btn--primary">
              {ctas.primary.label} <ArrowRight />
            </Link>
            <Link href={ctas.tertiary.href} className="btn btn--secondary">
              {ctas.tertiary.label}
            </Link>
          </div>
          <p style={{ fontSize: "0.92rem", maxWidth: "52ch" }}>
            {finalCta.privacyNote} Medism is not an emergency service.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
