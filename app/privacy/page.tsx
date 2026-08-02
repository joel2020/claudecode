import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Medism handles personal and medical information.",
};

export default function PrivacyPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 760, display: "grid", gap: "1.5rem" }}>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="eyebrow">Legal</p>
          <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 2.8rem)" }}>Privacy policy</h1>
        </div>
        <div className="note-disclosure">
          Draft for counsel review. This working policy reflects how the site is built to behave; it must be
          reviewed and approved by qualified legal counsel, and adapted to the jurisdictions Medism operates
          in, before production launch.
        </div>
        <div style={{ display: "grid", gap: "1.25rem", color: "var(--ink-soft)" }}>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>What we collect</h2>
          <p>
            When you request a dental consultation, we collect the information you choose to share: your
            name, location, preferred language, contact details, a description of your dental concern, and
            any photographs, X-rays, scans, or records you attach. Attaching records is optional.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Why we collect it</h2>
          <p>
            Your information is used for one purpose: reviewing your case and coordinating your care. Each
            step of the consultation form explains why the information it asks for is needed. We do not ask
            for more medical detail than a case review requires.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Who sees it</h2>
          <p>
            Your case is seen by the Medism care coordinators handling it and, with your consent, by the
            dentists and clinics evaluating your case. We do not sell personal information and do not use
            health information for marketing.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Your choices</h2>
          <p>
            You may ask us at any time to correct your information, stop processing your case, or delete the
            information you have shared, subject to legal record-keeping obligations. Contact routes are on
            the contact page.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Security</h2>
          <p>
            Medical information is transmitted and stored using access-controlled, encrypted systems.
            Production infrastructure details and data-processing agreements will be documented here before
            launch.
          </p>
          <h2 className="t-sub" style={{ color: "var(--ink)" }}>Cookies</h2>
          <p>
            This site runs without advertising or cross-site tracking cookies. If analytics are enabled in
            production, they will be privacy-preserving, documented here, and controllable from this page.
          </p>
        </div>
      </div>
    </section>
  );
}
