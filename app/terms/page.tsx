import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of use",
  description: "Terms governing use of the Medism website and coordination services.",
};

export default function TermsPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 760, display: "grid", gap: "1.5rem" }}>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="eyebrow">Legal</p>
          <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 2.8rem)" }}>Terms of use</h1>
        </div>
        <div className="note-disclosure">
          Draft for counsel review. These working terms must be reviewed and approved by qualified legal
          counsel before production launch.
        </div>
        <div style={{ display: "grid", gap: "1.25rem", color: "var(--ink-soft)" }}>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>What Medism is</h2>
          <p>
            Medism provides dental care-coordination services: helping patients reach appropriate dentists
            and clinics, and organizing the practical journey around treatment. Medism is not a dental or
            healthcare provider, does not employ the treating dentists, and does not provide dental or
            medical advice, diagnosis, or treatment.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Clinical responsibility</h2>
          <p>
            All clinical decisions — including whether a treatment is appropriate, its risks, and its
            expected results — are made by the licensed dentists who review and treat you. Information on
            this site is educational and is not a substitute for a professional dental assessment.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>No guarantees</h2>
          <p>
            Medism does not guarantee treatment eligibility, timelines, prices, or outcomes. Any figures
            published on this site are supplied and verified by the institutions concerned and dated.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Emergencies</h2>
          <p>
            Medism is not an emergency service and this website must not be used for urgent medical needs.
            In an emergency, contact your local emergency services immediately.
          </p>
        </div>
      </div>
    </section>
  );
}
