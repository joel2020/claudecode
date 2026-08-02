import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { ctas, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Medism",
  description:
    "Reach Medism about a dental consultation or your records. Medism is a coordination service, not an emergency service.",
};

export default function ContactPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="section-head">
          <p className="eyebrow">Contact</p>
          <h1 className="display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)" }}>
            Tell us what you need.
          </h1>
          <p className="lede">
            The fastest way to get help with a dental case is a consultation request — it gives our
            coordinators what they need to respond usefully on the first reply.
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.25rem" }}>
          <div className="panel" style={{ display: "grid", gap: "1rem" }}>
            <h2 className="t-sub">Patients &amp; families</h2>
            <p className="muted">
              Describe your concern in a few guided steps. Attaching photographs or records is optional —
              send what you have.
            </p>
            <div className="contact-routes">
              <Link href={ctas.primary.href} className="btn btn--primary">
                {ctas.primary.label} <ArrowRight />
              </Link>
              <Link href={ctas.secondary.href} className="btn btn--secondary">
                {ctas.secondary.label}
              </Link>
            </div>
          </div>

          <div className="card" style={{ display: "grid", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.2rem" }}>Direct routes</h2>
            {site.contact.whatsapp ? (
              <a className="btn btn--secondary" href={`https://wa.me/${site.contact.whatsapp}`}>
                <WhatsAppIcon /> Message us on WhatsApp
              </a>
            ) : (
              <p className="muted" style={{ fontSize: "0.97rem" }}>
                <strong>WhatsApp:</strong> being set up — the number will appear here once Medism&rsquo;s
                business account is verified. Until then, the consultation form is the reliable route.
              </p>
            )}
            <p className="muted" style={{ fontSize: "0.97rem" }}>
              <strong>Phone &amp; email:</strong> production contact details are pending publication and will
              be listed here once confirmed.
            </p>
          </div>

          <div className="card" style={{ display: "grid", gap: "0.75rem" }}>
            <h2 style={{ fontSize: "1.2rem" }}>Dentists &amp; clinics</h2>
            <p className="muted" style={{ fontSize: "0.97rem" }}>
              If you are a dental professional or clinic interested in partnership, mention your clinic and
              location in the consultation form&rsquo;s message field. Every partnership goes through the
              same verification before any profile is published.
            </p>
          </div>

          <div className="note-disclosure">
            <strong>Medism is not an emergency service.</strong> If you have severe pain, uncontrolled
            bleeding, facial swelling, or an injury, seek immediate care from a local dentist, doctor, or
            emergency service. Messages here are answered by care coordinators, not by dentists on call.
          </div>
        </div>
      </div>
    </section>
  );
}
