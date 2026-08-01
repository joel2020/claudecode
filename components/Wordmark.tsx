import Link from "next/link";

/** Medism mark — layered form carried over from the existing brand asset. */
export function Wordmark({ asLink = true }: { asLink?: boolean }) {
  const inner = (
    <>
      <svg viewBox="0 0 42 42" aria-hidden="true">
        <path d="M7 31.5V15.8L21 7l14 8.8v15.7L21 35 7 31.5Z" />
        <path d="M13 26.8V19l8-4.8 8 4.8v7.8L21 29l-8-2.2Z" />
        <circle cx="21" cy="21" r="2.4" />
      </svg>
      <span className="wordmark-type">Medism</span>
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
