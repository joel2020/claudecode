"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The care-route rail beside the journey steps. The sea-green progress line
 * draws in as the visitor moves through the journey. Without JavaScript or
 * with reduced motion, the line is simply complete.
 */
export function RouteRail() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const bar = el.querySelector<HTMLElement>(".journey__rail-progress");
      if (!bar) return;
      if (new URLSearchParams(window.location.search).has("nomotion")) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top 70%",
              end: "bottom 55%",
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
    <div className="journey__rail" ref={ref} aria-hidden="true">
      <div className="journey__rail-progress" />
    </div>
  );
}
