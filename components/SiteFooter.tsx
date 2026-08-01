import Link from "next/link";
import { treatments } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <Wordmark />
            <p style={{ maxWidth: "36ch" }}>
              Expert healthcare guidance, from first conversation to recovery. Medism coordinates care for
              international patients and their families.
            </p>
            <p style={{ fontSize: "0.9rem" }}>
              Contact details pending publication.{" "}
              <Link href="/contact" className="text-link" style={{ color: "inherit" }}>
                Reach us here
              </Link>
            </p>
          </div>
          <div className="site-footer__col">
            <h3>Treatments</h3>
            {treatments.slice(0, 6).map((t) => (
              <Link key={t.slug} href={`/treatments/${t.slug}`}>
                {t.name}
              </Link>
            ))}
            <Link href="/treatments">All treatments →</Link>
          </div>
          <div className="site-footer__col">
            <h3>Patients</h3>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/international-patients">International patient services</Link>
            <Link href="/hospitals">Hospitals &amp; doctors</Link>
            <Link href="/consultation">Request a care consultation</Link>
            <Link href="/consultation?intent=reports">Send your medical reports</Link>
          </div>
          <div className="site-footer__col">
            <h3>Medism</h3>
            <Link href="/about">About Medism</Link>
            <Link href="/professional-programs">Professional programs</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/medical-disclaimer">Medical disclaimer</Link>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>
            Medism is a healthcare coordination service. It is not a hospital, does not employ the treating
            doctors, and does not provide medical advice, diagnosis, or treatment. All clinical decisions are
            made by licensed physicians and hospitals. Information on this site is educational and is not a
            substitute for consultation with a qualified doctor.
          </p>
          <p>
            <strong>Medism is not an emergency service.</strong> If you or someone near you needs urgent
            medical help, contact your local emergency services immediately.
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
