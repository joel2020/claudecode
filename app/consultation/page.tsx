import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationFlow } from "@/components/ConsultationFlow";

export const metadata: Metadata = {
  title: "Request a Care Consultation",
  description:
    "Share your case with Medism in a few guided steps. A care coordinator reviews it confidentially and replies with the next appropriate step. Attaching medical reports is optional.",
  robots: { index: true, follow: true },
};

export default function ConsultationPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head">
          <p className="eyebrow">Care consultation</p>
          <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.6vw, 3rem)" }}>
            Tell us what you need.
          </h1>
          <p className="lede">
            Six short steps. Each one explains why we ask. Your answers are confidential, create no
            obligation, and are reviewed by a care coordinator — a real person who replies with the next
            appropriate step.
          </p>
        </div>
        <Suspense fallback={<p className="muted">Loading the form…</p>}>
          <ConsultationFlow />
        </Suspense>
        <p className="muted" style={{ marginTop: "2.5rem", fontSize: "0.9rem" }}>
          Medism is not an emergency service. If you or someone near you needs urgent medical help, contact
          your local emergency services immediately.
        </p>
      </div>
    </section>
  );
}
