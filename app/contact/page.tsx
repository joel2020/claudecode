import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Medism",
  description:
    "Reach Medism about a care consultation, medical reports, or professional programs. Medism is a coordination service, not an emergency service.",
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
            The fastest way to get help with a medical case is a care consultation request — it gives our
            coordinators what they need to respond usefully on the first reply.
          </p>
        </div>

        <div style={{ display: "grid", gap: "1.25rem" }}>
          <div className="panel" style={{ display: "grid", gap: "1rem" }}>
            <h2 className="t-sub">Patients &amp; families</h2>
            <p className="muted">
              Describe your situation in a few guided steps. Attaching reports is optional — send what you
              have.
            </p>
            <div className="contact-routes">
              <Link href="/consultation" className="btn btn--primary">
                Request a Care Consultation <ArrowRight />
              </Link>
              <Link href="/consultation?intent=reports" className="btn btn--secondary">
                Send Your Medical Reports
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
            <h2 style={{ fontSize: "1.2rem" }}>Doctors &amp; institutions</h2>
            <p className="muted" style={{ fontSize: "0.97rem" }}>
              For training, observerships, referrals, or partnership conversations, mention your organization
              and program of interest in the consultation form&rsquo;s message field, or see{" "}
              <Link href="/professional-programs" className="text-link">
                professional programs
              </Link>
              .
            </p>
          </div>

          <div className="note-disclosure">
            <strong>Medism is not an emergency service.</strong> If you or someone near you needs urgent
            medical help, contact your local emergency services immediately. Messages here are answered by
            care coordinators, not by doctors on call.
          </div>
        </div>
      </div>
    </section>
  );
}
