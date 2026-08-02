import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { clinicProfiles, dentistProfiles } from "@/lib/content";

/** One route serves both profile systems: dentists and clinics. */
const allSlugs = [
  ...dentistProfiles.map((p) => ({ slug: p.slug })),
  ...clinicProfiles.map((p) => ({ slug: p.slug })),
];

export function generateStaticParams() {
  return allSlugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = dentistProfiles.find((x) => x.slug === slug);
  const c = clinicProfiles.find((x) => x.slug === slug);
  const name = d?.name ?? c?.name;
  if (!name) return {};
  return {
    title: `${name} (template)`,
    description: "Profile template — published with verified data only.",
    robots: { index: false, follow: true }, // templates stay out of search until real data ships
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dentist = dentistProfiles.find((x) => x.slug === slug);
  const clinic = clinicProfiles.find((x) => x.slug === slug);
  if (!dentist && !clinic) notFound();

  return (
    <>
      <section className="section--tight section">
        <div className="container" style={{ maxWidth: 920 }}>
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link href="/clinics">Dentists &amp; clinics</Link>
              </li>
              <li aria-current="page">{dentist?.name ?? clinic?.name}</li>
            </ol>
          </nav>

          {dentist ? (
            <div className="split" style={{ alignItems: "start" }}>
              <div>
                <Photo brief={dentist.photoBrief} ratio="4 / 5" arch variant="deep" />
              </div>
              <div style={{ display: "grid", gap: "1.2rem", justifyItems: "start" }}>
                <span className="tag-placeholder">Pending verification</span>
                <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3rem)" }}>{dentist.name}</h1>
                <p className="lede" style={{ fontSize: "1.05rem" }}>
                  This is the structure every published dentist profile will follow. Each field is filled
                  only with information confirmed in writing, and dated.
                </p>
                <dl style={{ margin: 0, display: "grid", gap: "0.9rem", fontSize: "0.98rem", width: "100%" }}>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Specialty</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{dentist.specialty}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Qualifications</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{dentist.qualifications.join(". ")}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Professional registration</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{dentist.registrations.join(". ")}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Experience</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{dentist.yearsExperience}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Languages</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{dentist.languages.join(". ")}</dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Clinic &amp; location</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>
                      {dentist.clinic}. {dentist.location}
                    </dd>
                  </div>
                  <div>
                    <dt style={{ fontWeight: 650 }}>Accreditations</dt>
                    <dd style={{ margin: 0, color: "var(--ink-soft)" }}>{dentist.accreditations.join(". ")}</dd>
                  </div>
                </dl>
                <div className="chip-row">
                  {dentist.treatmentAreas.map((a) => (
                    <span className="chip" key={a}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : clinic ? (
            <>
              <div className="section-head">
                <span className="tag-placeholder">Pending verification</span>
                <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3rem)" }}>{clinic.name}</h1>
                <p className="lede">
                  This is the structure every published clinic profile will follow. Each field is filled
                  only with information confirmed directly with the clinic, and dated.
                </p>
              </div>
              <Photo
                brief="Reception or lounge of the verified partner clinic — calm, daylight, more boutique hotel than hospital"
                ratio="21 / 9"
              />
              <dl className="defs" style={{ marginTop: "2.5rem" }}>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Location</strong>
                    <p>{clinic.city}</p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Accreditations</strong>
                    <p>Shown only with documentation from the issuing body, with dates.</p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Treatment areas</strong>
                    <p>{clinic.treatmentAreas.join(". ")}</p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Dentist profiles</strong>
                    <p>
                      Named dentists appear with qualifications, specialty focus, registration, and
                      languages — each confirmed before publication.
                    </p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Languages</strong>
                    <p>{clinic.languages.join(". ")}</p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>Facilities</strong>
                    <p>{clinic.facilities.join(". ")}</p>
                  </div>
                </div>
                <div className="def-item">
                  <span className="def-item__dot" aria-hidden="true" />
                  <div>
                    <strong>International patient services</strong>
                    <p>Interpreter availability, companion accommodation, and airport coordination, as confirmed.</p>
                  </div>
                </div>
              </dl>
            </>
          ) : null}

          <div className="contact-routes" style={{ marginTop: "2.5rem" }}>
            <Link href="/consultation" className="btn btn--primary">
              Request an introduction <ArrowRight />
            </Link>
            <Link href="/consultation?start=records" className="btn btn--secondary">
              Send Your Dental Records
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
