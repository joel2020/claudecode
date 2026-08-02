import Image from "next/image";

/**
 * Art-directed image slot.
 *
 * Pass `src` for a rights-confirmed image. Without `src`, the slot renders a
 * bright Morning Arch placeholder that documents the required shot (subject,
 * mood, framing) so the photography brief lives in the design itself and can
 * be replaced 1:1 later.
 *
 * `arch` applies the signature arch mask (rounded crown).
 */
export function Photo({
  brief,
  ratio = "4 / 3",
  variant = "light",
  src,
  alt,
  priority = false,
  showBrief = true,
  arch = false,
  sizes = "(max-width: 960px) 100vw, 50vw",
}: {
  brief: string;
  ratio?: string;
  variant?: "light" | "deep";
  src?: string;
  alt?: string;
  priority?: boolean;
  showBrief?: boolean;
  arch?: boolean;
  sizes?: string;
}) {
  const className = `photo${variant === "deep" ? " photo--deep" : ""}${arch ? " arch" : ""}`;

  if (src) {
    return (
      <figure className={className} style={{ aspectRatio: ratio, margin: 0 }}>
        <Image
          src={src}
          alt={alt ?? brief}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: "cover" }}
        />
      </figure>
    );
  }

  return (
    <figure
      className={className}
      style={{ aspectRatio: ratio, margin: 0 }}
      role="img"
      aria-label={`Photography placeholder: ${brief}`}
    >
      <svg
        className="photo__art"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* A quiet arch and rising sun — the shot is still to be taken. */}
        <path
          d="M140 300V190c0-33 27-60 60-60s60 27 60 60v110"
          fill="none"
          stroke={variant === "deep" ? "rgba(194,65,12,0.35)" : "rgba(31,111,84,0.35)"}
          strokeWidth="2"
        />
        <circle
          cx="200"
          cy="205"
          r="17"
          fill={variant === "deep" ? "#c2410c" : "#1f6f54"}
          opacity="0.45"
        />
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
