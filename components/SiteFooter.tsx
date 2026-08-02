import Link from "next/link";
import { ctas, site, treatmentsFor } from "@/lib/content";
import { Wordmark } from "./Wordmark";

const footerTreatments = treatmentsFor("dental").slice(0, 6);

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <Wordmark />
            <p style={{ maxWidth: "36ch" }}>
              {site.tagline} Medism coordinates dental care for international patients and the people
              travelling with them.
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              Contact details pending publication.{" "}
              <Link href="/contact" className="text-link" style={{ color: "inherit" }}>
                Reach us here
              </Link>
            </p>
          </div>
          <div className="site-footer__col">
            <h3>Dental Treatments</h3>
            {footerTreatments.map((t) => (
              <Link key={t.slug} href={`/treatments/${t.slug}`}>
                {t.name}
              </Link>
            ))}
            <Link href="/treatments">All dental treatments →</Link>
          </div>
          <div className="site-footer__col">
            <h3>Patients</h3>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/clinics">Dentists &amp; clinics</Link>
            <Link href="/international-patients">International travel support</Link>
            <Link href={ctas.primary.href}>{ctas.primary.label}</Link>
            <Link href={ctas.secondary.href}>{ctas.secondary.label}</Link>
          </div>
          <div className="site-footer__col">
            <h3>Medism</h3>
            <Link href="/about">About Medism</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/medical-disclaimer">Medical disclaimer</Link>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            Medism is a dental care-coordination service. It is not a dental clinic, does not employ the
            treating dentists, and does not provide dental or medical advice, diagnosis, or treatment. All
            clinical decisions are made by the licensed dentists who assess and treat you. Information on
            this site is educational and is not a substitute for a professional dental assessment.
          </p>
          <p>
            <strong>Medism is not an emergency service.</strong> If you have severe pain, uncontrolled
            bleeding, facial swelling, or an injury, seek immediate care from a local dentist, doctor, or
            emergency service.
          </p>
          <div className="site-footer__legal-links">
            <span>© {new Date().getFullYear()} Medism</span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/medical-disclaimer">Medical disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
