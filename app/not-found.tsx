import Link from "next/link";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720, display: "grid", gap: "1.25rem" }}>
        <p className="eyebrow">Page not found</p>
        <h1 className="display t-section">This page is not on the route.</h1>
        <p className="lede">
          The address may have changed or never existed. The links below lead back to solid ground.
        </p>
        <div className="contact-routes">
          <Link href="/" className="btn btn--primary">
            Go to the homepage <ArrowRight />
          </Link>
          <Link href="/consultation" className="btn btn--secondary">
            Request a Dental Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
