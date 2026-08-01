import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { hospitalProfiles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hospitals & doctors",
  description:
    "How Medism selects and presents hospitals and specialists for international patients — every profile verified and documented before publication.",
};

export default function HospitalsPage() {
  return (
    <>
      <section className="section--tight section">
        <div className="container">
          <div className="section-head" style={{ maxWidth: 820 }}>
            <p className="eyebrow">Hospitals &amp; doctors</p>
            <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
              A network you can check, not just believe.
            </h1>
            <p className="lede">
              When Medism recommends a hospital or specialist, you should be able to see why. Every published
              profile will include the institution&rsquo;s accreditations, clinical strengths, languages, and
              facilities — confirmed directly with the hospital and dated.
            </p>
          </div>

          <div className="note-disclosure" style={{ marginBottom: "2.5rem", maxWidth: 820 }}>
            <strong>Profiles pending verification.</strong> Medism is completing documentation with its
            hospital and specialist network. The cards below show the profile structure; no institution is
            named until its relationship and credentials are confirmed in writing.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {hospitalProfiles.map((h) => (
              <article key={h.slug} className="card" style={{ display: "grid", gap: "0.9rem", alignContent: "start" }}>
                <span className="tag-placeholder">Awaiting verified partner data</span>
                <h2 style={{ fontSize: "1.3rem" }}>{h.name}</h2>
                <p className="muted" style={{ fontSize: "0.95rem" }}>{h.city}</p>
                <dl style={{ margin: 0, display: "grid", gap: "0.75rem", fontSize: "0.95rem" }}>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Treatment areas</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{h.treatmentAreas.join(". ")}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Languages</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{h.languages.join(". ")}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Facilities</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{h.facilities.join(". ")}</dd>
                  </div>
                </dl>
                <Link href={`/hospitals/${h.slug}`} className="text-link" style={{ fontSize: "0.95rem" }}>
                  See the full profile template
                </Link>
              </article>
            ))}
          </div>

          <section style={{ marginTop: "3.5rem", maxWidth: 820, display: "grid", gap: "1rem" }} aria-labelledby="verify-h">
            <h2 id="verify-h" className="t-sub">
              What verification means here
            </h2>
            <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.6rem", color: "var(--ink-soft)" }}>
              <li>
                <strong style={{ color: "var(--ink)" }}>Identity.</strong> Legal entity, facility address, and
                an accountable contact.
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Credentials.</strong> Licensure and accreditation
                checked with the issuing body, where applicable, and shown with dates.
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Service scope.</strong> Specialties, facilities,
                languages, and international-patient services confirmed with the hospital.
              </li>
              <li>
                <strong style={{ color: "var(--ink)" }}>Ongoing review.</strong> Expiries and material changes
                trigger re-verification.
              </li>
            </ol>
            <div className="contact-routes" style={{ marginTop: "0.75rem" }}>
              <Link href="/consultation" className="btn btn--primary">
                Request an introduction <ArrowRight />
              </Link>
            </div>
          </section>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
