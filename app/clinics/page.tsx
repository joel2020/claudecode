import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { CtaSection } from "@/components/CtaSection";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { clinicProfiles, dentistProfiles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dentists & clinics",
  description:
    "How Medism selects and presents dentists and clinics for international patients — every profile verified and documented before publication.",
};

export default function ClinicsPage() {
  return (
    <>
      <section className="section section--tight">
        <div className="container">
          <div className="split split--reverse" style={{ alignItems: "center", marginBottom: "clamp(48px, 7vw, 80px)" }}>
            <Reveal className="section-head" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Dentists &amp; clinics</p>
              <h1 className="display t-hero" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
                A network you can <em>check</em>, not just believe.
              </h1>
              <p className="lede">
                When Medism recommends a dentist or clinic, you should be able to see why. Every published
                profile carries documented qualifications, professional registration, languages, experience,
                treatment areas, and accreditations — confirmed directly and dated.
              </p>
            </Reveal>
            <Reveal>
              <Photo
                src="/images/dentist-explains.webp"
                alt="A dentist in warm conversation with a patient across a consultation table"
                brief="A dentist explaining a plan"
                ratio="4 / 3"
                arch
              />
            </Reveal>
          </div>

          <div className="note-disclosure" style={{ marginBottom: "2.5rem", maxWidth: 820 }}>
            <strong>Profiles pending verification.</strong> Medism is completing documentation with its
            dental network. The profiles below show the structure; no dentist or clinic is named until the
            relationship and credentials are confirmed in writing.
          </div>

          {/* Dentist profile system */}
          <Reveal className="section-head">
            <p className="eyebrow">Dentist profiles</p>
            <h2 className="display t-section" style={{ fontSize: "clamp(1.7rem, 1.2rem + 2vw, 2.4rem)" }}>
              What every dentist profile will show.
            </h2>
          </Reveal>
          <Reveal className="profile-grid" stagger={0.06}>
            {dentistProfiles.map((p) => (
              <article key={p.slug} className="profile-card">
                <div className="profile-card__photo">
                  <Photo brief={p.photoBrief} ratio="1 / 1" showBrief={false} variant="deep" />
                </div>
                <div className="profile-card__body">
                  <span className="tag-placeholder">Pending verification</span>
                  <h3>{p.name}</h3>
                  <p className="profile-card__meta">{p.specialty}</p>
                  <div className="chip-row">
                    {p.treatmentAreas.map((a) => (
                      <span className="chip" key={a}>
                        {a}
                      </span>
                    ))}
                  </div>
                  <Link href={`/clinics/${p.slug}`} className="text-link" style={{ fontSize: "0.95rem" }}>
                    Full profile structure <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </Reveal>

          {/* Clinic profile system */}
          <Reveal className="section-head" style={{ marginTop: "clamp(48px, 7vw, 80px)" }}>
            <p className="eyebrow">Clinic profiles</p>
            <h2 className="display t-section" style={{ fontSize: "clamp(1.7rem, 1.2rem + 2vw, 2.4rem)" }}>
              And what every clinic profile will show.
            </h2>
          </Reveal>
          <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "22px" }} stagger={0.06}>
            {clinicProfiles.map((h) => (
              <article key={h.slug} className="card" style={{ display: "grid", gap: "0.9rem", alignContent: "start", borderRadius: "var(--radius-panel)" }}>
                <span className="tag-placeholder">Pending verification</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 470, fontSize: "1.35rem" }}>{h.name}</h3>
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
                <Link href={`/clinics/${h.slug}`} className="text-link" style={{ fontSize: "0.95rem" }}>
                  Full profile structure <ArrowRight size={15} />
                </Link>
              </article>
            ))}
          </Reveal>

          {/* Verification standard */}
          <Reveal className="panel" style={{ marginTop: "clamp(48px, 7vw, 80px)", display: "grid", gap: "1.4rem" }}>
            <p className="eyebrow">The standard</p>
            <h2 className="display" style={{ fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.3rem)" }}>
              What verification means here.
            </h2>
            <div className="defs">
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Identity</strong>
                  <p>Legal entity, facility address, and an accountable contact.</p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Credentials</strong>
                  <p>Licensure, registration, and accreditation checked with the issuing body where applicable, and shown with dates.</p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Service scope</strong>
                  <p>Treatment areas, facilities, languages, and international-patient services confirmed with the clinic.</p>
                </div>
              </div>
              <div className="def-item">
                <span className="def-item__dot" aria-hidden="true" />
                <div>
                  <strong>Ongoing review</strong>
                  <p>Expiries and material changes trigger re-verification.</p>
                </div>
              </div>
            </div>
            <div>
              <Link href="/consultation" className="btn btn--primary">
                Request an introduction <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
