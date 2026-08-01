import Link from "next/link";
import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";

/** Final conversion section, shared across pages. */
export function CtaSection() {
  return (
    <section className="section section--dark on-dark" aria-labelledby="cta-heading">
      <div className="container" style={{ maxWidth: 880 }}>
        <Reveal style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
          <p className="eyebrow">The next step</p>
          <h2 id="cta-heading" className="display t-section">
            You do not have to plan your care journey <em>alone</em>.
          </h2>
          <p className="lede">
            Tell us what you need. A Medism care coordinator will review your request and explain the next
            appropriate step — clearly, and without obligation.
          </p>
          <div className="contact-routes">
            <Link href="/consultation" className="btn btn--primary">
              Request a Care Consultation <ArrowRight />
            </Link>
            <Link href="/consultation?intent=reports" className="btn btn--secondary">
              Send Your Medical Reports
            </Link>
          </div>
          <p style={{ fontSize: "0.92rem" }}>
            Your information stays confidential, is used only to review your case, and is never shared beyond
            the specialists involved. Medism is not an emergency service.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
