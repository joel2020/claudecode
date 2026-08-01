"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Subtle scroll reveal. Content is fully visible without JavaScript or when
 * the visitor prefers reduced motion — GSAP only *adds* the entrance.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 24,
  className,
  style,
  stagger,
}: {
  children: ReactNode;
  as?: "div" | "section" | "ul" | "ol" | "header";
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  /** If set, direct children animate with this stagger instead of the wrapper. */
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      // QA/testing escape hatch: ?nomotion renders final states immediately.
      if (new URLSearchParams(window.location.search).has("nomotion")) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger != null ? Array.from(el.children) : el;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.7,
          ease: "power2.out",
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style} data-reveal>
      {children}
    </Tag>
  );
}
