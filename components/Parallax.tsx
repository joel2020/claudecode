"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Gentle scroll parallax. The child drifts a few percent against scroll.
 * No-JS and reduced-motion visitors see the static layout — GSAP only adds
 * drift, never controls visibility.
 */
export function Parallax({
  children,
  amount = 6,
  className,
  style,
}: {
  children: ReactNode;
  /** Total drift as a percentage of the element's height. */
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (new URLSearchParams(window.location.search).has("nomotion")) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 900px)", () => {
        gsap.fromTo(
          el,
          { yPercent: amount / 2 },
          {
            yPercent: -amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
