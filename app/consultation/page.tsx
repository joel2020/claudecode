import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationFlow } from "@/components/ConsultationFlow";

export const metadata: Metadata = {
  title: "Request a Dental Consultation",
  description:
    "Share your dental concern with Medism in seven guided steps. A care coordinator reviews it confidentially and replies with the next appropriate step. Attaching photographs or records is optional.",
  robots: { index: true, follow: true },
};

export default function ConsultationPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head">
          <p className="eyebrow">Dental consultation</p>
          <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3rem)" }}>
            Tell us what you need.
          </h1>
          <p className="lede">
            Seven short steps. Each one explains why we ask. Your answers are confidential, create no
            obligation, and are reviewed by a care coordinator — a real person who replies with the next
            appropriate step.
          </p>
        </div>
        <div className="panel" style={{ paddingBlock: "clamp(28px, 4vw, 44px)" }}>
          <Suspense fallback={<p className="muted">Loading the form…</p>}>
            <ConsultationFlow />
          </Suspense>
        </div>
        <p className="muted" style={{ marginTop: "2.5rem", fontSize: "0.9rem" }}>
          Medism is not an emergency service and not your treating dental provider. If you have severe
          pain, uncontrolled bleeding, facial swelling, or an injury, seek immediate care from a local
          dentist, doctor, or emergency service.
        </p>
      </div>
    </section>
  );
}
