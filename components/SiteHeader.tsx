"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ctas, nav } from "@/lib/content";
import { Wordmark } from "./Wordmark";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation and restore body scroll.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/")) ? "page" : undefined;

  return (
    <>
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container site-header__row">
        <Wordmark />
        <nav className="site-nav" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
          <Link href={ctas.primary.href} className="btn btn--primary">
            {ctas.primary.label}
          </Link>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
            {open ? "Close menu" : "Open menu"}
          </span>
          <svg width="22" height="22" viewBox="0 0 22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" />
            ) : (
              <path d="M3 6h16M3 11h16M3 16h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
    <div id="mobile-menu" className="mobile-menu" data-open={open}>
        <nav aria-label="Main menu">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
          <div className="mobile-menu__cta">
            <Link href={ctas.primary.href} className="btn btn--primary">
              {ctas.primary.label}
            </Link>
            <Link href={ctas.secondary.href} className="btn btn--secondary">
              {ctas.secondary.label}
            </Link>
          </div>
        </nav>
    </div>
    </>
  );
}
