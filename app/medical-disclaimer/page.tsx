import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical disclaimer",
  description: "Medism is a coordination service, not a medical provider. Read what that means for the information on this site.",
};

export default function MedicalDisclaimerPage() {
  return (
    <section className="section--tight section">
      <div className="container" style={{ maxWidth: 760, display: "grid", gap: "1.5rem" }}>
        <div className="section-head" style={{ marginBottom: 0 }}>
          <p className="eyebrow">Legal</p>
          <h1 className="display" style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 2.8rem)" }}>Medical disclaimer</h1>
        </div>
        <div style={{ display: "grid", gap: "1.25rem", color: "var(--ink-soft)" }}>
          <p>
            The content of this website is provided for general information about dental care coordination and
            dental travel. It is not dental or medical advice, and it is not a substitute for examination,
            diagnosis, or treatment by a qualified dentist.
          </p>
          <p>
            Medism does not practice dentistry or medicine. Descriptions of treatments on this site explain
            what Medism can coordinate; they do not state that any treatment is suitable, available, or
            likely to succeed for any individual. Suitability, risks, and expected results can only be
            assessed by the licensed dentists who review your case.
          </p>
          <p>
            Never delay seeking medical advice, disregard a dentist&rsquo;s or doctor&rsquo;s guidance, or discontinue treatment
            because of something read on this website.
          </p>
          <p>
            <strong style={{ color: "var(--ink)" }}>
              Medism is not an emergency service. If you or someone near you may need urgent care, contact
              your local emergency services immediately.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}
