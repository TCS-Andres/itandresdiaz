"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { summit } from "@/lib/summit";

/**
 * A stripped-down header for the event page: logo home, and the one action
 * that matters. No section nav, since visitors arrive from a QR code with a
 * single job to do.
 */
export function SummitHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-b border-white/10 bg-navy/95 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <a href="/" className="flex min-h-[44px] shrink-0 items-center" aria-label={`${site.name}, home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white-text.svg" alt={site.company} width={160} height={64} className="h-9 w-auto md:h-10" />
        </a>
        {/* Phones already have the hero button and, further down, the sticky bottom bar. */}
        <a href="#book" className="btn-primary hidden min-h-[44px] !px-5 !py-2.5 !text-sm sm:inline-flex">
          {summit.hero.primaryCta}
        </a>
      </div>
    </header>
  );
}
