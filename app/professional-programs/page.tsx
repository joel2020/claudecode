import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { professionalPrograms } from "@/lib/content";

export const metadata: Metadata = {
  title: "Professional programs — training, observerships & partnerships",
  description:
    "Medism's programs for doctors and healthcare organizations: clinical training, fellowships, observerships, institutional partnerships, and healthcare business development.",
};

export default function ProfessionalProgramsPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <p className="eyebrow">For doctors &amp; institutions</p>
          <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
            Professional programs
          </h1>
          <p className="lede">
            Alongside patient coordination, Medism works with doctors, hospitals, and healthcare
            organizations on training, observation, and institutional collaboration. These programs are kept
            deliberately separate from patient care.
          </p>
        </div>

        <dl className="defs">
          {professionalPrograms.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="panel" style={{ marginTop: "2.5rem", display: "grid", gap: "1rem" }}>
          <h2 className="t-sub">Start a conversation</h2>
          <p className="muted">
            Tell us about your organization, the program you are interested in, and your timeline. We will
            respond with what is realistically possible and the next step.
          </p>
          <div className="contact-routes">
            <Link href="/contact?topic=professional" className="btn btn--primary">
              Contact the programs team <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
