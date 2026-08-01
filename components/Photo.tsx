import Image from "next/image";

/**
 * Art-directed image slot.
 *
 * Medism has not yet supplied verified production photography. Until it does,
 * each slot renders a calm, on-brand placeholder that documents the required
 * shot (subject, mood, framing) so the photography brief lives in the design
 * itself and can be replaced 1:1 later.
 *
 * Pass `src` to render a real, rights-confirmed image instead.
 */
export function Photo({
  brief,
  ratio = "4 / 3",
  variant = "light",
  src,
  alt,
  priority = false,
  showBrief = true,
}: {
  brief: string;
  ratio?: string;
  variant?: "light" | "deep";
  src?: string;
  alt?: string;
  priority?: boolean;
  showBrief?: boolean;
}) {
  if (src) {
    return (
      <figure className="photo" style={{ aspectRatio: ratio, margin: 0 }}>
        <Image
          src={src}
          alt={alt ?? brief}
          fill
          priority={priority}
          sizes="(max-width: 960px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </figure>
    );
  }

  return (
    <figure
      className={`photo${variant === "deep" ? " photo--deep" : ""}`}
      style={{ aspectRatio: ratio, margin: 0 }}
      role="img"
      aria-label={`Photography placeholder: ${brief}`}
    >
      <svg className="photo__art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path
          d="M-20 240 C 80 200, 120 120, 210 130 S 360 80, 430 40"
          fill="none"
          stroke={variant === "deep" ? "rgba(143,179,171,0.45)" : "rgba(31,91,78,0.28)"}
          strokeWidth="1.5"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <circle cx="210" cy="130" r="4" fill={variant === "deep" ? "#8fb3ab" : "#1f5b4e"} opacity="0.5" />
        <circle cx="330" cy="92" r="3" fill="#c8614d" opacity="0.7" />
      </svg>
      {showBrief && (
        <figcaption className="photo__brief">
          <small>Photography to be supplied</small>
          <p>{brief}</p>
        </figcaption>
      )}
    </figure>
  );
}
