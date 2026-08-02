import Link from "next/link";

/** Medism mark — Morning Arch system: an arch doorway with a papaya sun. */
export function Wordmark({ asLink = true }: { asLink?: boolean }) {
  const inner = (
    <>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M4 30V16C4 9.4 9.4 4 16 4s12 5.4 12 12v14h-7.2V16a4.8 4.8 0 0 0-9.6 0v14H4Z"
          fill="currentColor"
        />
        <circle cx="16" cy="25.5" r="3.2" fill="#C2410C" />
      </svg>
      <span className="wordmark-type">medism</span>
    </>
  );
  if (!asLink) {
    return <span className="wordmark">{inner}</span>;
  }
  return (
    <Link href="/" className="wordmark" aria-label="Medism — home">
      {inner}
    </Link>
  );
}
