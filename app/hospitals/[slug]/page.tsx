import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/icons";
import { Photo } from "@/components/Photo";
import { hospitalProfiles } from "@/lib/content";

export function generateStaticParams() {
  return hospitalProfiles.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = hospitalProfiles.find((x) => x.slug === slug);
  if (!h) return {};
  return {
    title: `${h.name} (template)`,
    description: "Hospital profile template — published with verified data only.",
    robots: { index: false, follow: true }, // templates stay out of search until real data ships
  };
}

export default async function HospitalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = hospitalProfiles.find((x) => x.slug === slug);
  if (!h) notFound();

  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 880 }}>
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link href="/hospitals">Hospitals &amp; doctors</Link>
            </li>
            <li aria-current="page">{h.name}</li>
          </ol>
        </nav>
        <div className="section-head">
          <span className="tag-placeholder">Awaiting verified partner data</span>
          <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3rem)" }}>{h.name}</h1>
          <p className="lede">
            This is the structure every published hospital profile will follow. Each field is filled only
            with information confirmed directly with the institution, and dated.
          </p>
        </div>

        <Photo
          brief="Exterior or atrium of the verified partner hospital — calm, daylight, patients and staff moving naturally"
          ratio="21 / 9"
        />

        <dl className="defs" style={{ marginTop: "2.5rem" }}>
          <div>
            <dt>Location</dt>
            <dd>{h.city}</dd>
          </div>
          <div>
            <dt>Accreditations</dt>
            <dd>Shown only with documentation from the issuing body, with dates.</dd>
          </div>
          <div>
            <dt>Treatment areas</dt>
            <dd>{h.treatmentAreas.join(". ")}</dd>
          </div>
          <div>
            <dt>Specialist profiles</dt>
            <dd>
              Named specialists appear with qualifications, specialty focus, and languages — each confirmed
              with the hospital before publication.
            </dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>{h.languages.join(". ")}</dd>
          </div>
          <div>
            <dt>Facilities</dt>
            <dd>{h.facilities.join(". ")}</dd>
          </div>
          <div>
            <dt>International patient services</dt>
            <dd>Interpreter availability, family accommodation, and airport coordination, as confirmed.</dd>
          </div>
        </dl>

        <div className="contact-routes" style={{ marginTop: "2.5rem" }}>
          <Link href="/consultation" className="btn btn--primary">
            Request an introduction <ArrowRight />
          </Link>
          <Link href="/consultation?intent=reports" className="btn btn--secondary">
            Send Your Medical Reports
          </Link>
        </div>
      </div>
    </section>
  );
}
