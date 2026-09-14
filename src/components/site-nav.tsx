"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

const SECTION_IDS = nav.map((item) => item.href.slice(1));

/** A section counts as current once its top passes this share of the viewport. */
const SPY_LINE = 0.4;

type Pill = { left: number; width: number } | null;

/**
 * Fixed header with a scroll-spy underline and a reading progress bar.
 * The sliding indicator follows 21st.dev's Animated Navigation Tabs pattern,
 * and the progress bar follows Motion Primitives' Scroll Progress, both
 * rebuilt on plain transforms so the header needs no animation library.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [activePill, setActivePill] = useState<Pill>(null);
  const [hoverPill, setHoverPill] = useState<Pill>(null);

  const progressRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;

      setScrolled(y > 24);
      if (progressRef.current) {
        const p = max > 0 ? Math.min(1, y / max) : 0;
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      // The last nav section whose top has crossed the spy line is current.
      // At the very bottom, the final section wins even if it is short.
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= vh * SPY_LINE) current = id;
      }
      if (max > 0 && y >= max - 4) current = SECTION_IDS[SECTION_IDS.length - 1];
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const measure = useCallback((id: string | null): Pill => {
    const link = id ? linkRefs.current[id] : null;
    return link ? { left: link.offsetLeft, width: link.offsetWidth } : null;
  }, []);

  // Measure before paint so the underline never flashes at a stale position.
  useLayoutEffect(() => {
    setActivePill(measure(active));
  }, [active, measure]);

  useLayoutEffect(() => {
    if (hovered) setHoverPill(measure(hovered));
  }, [hovered, measure]);

  // Link widths change once the web fonts arrive and when the window resizes.
  useEffect(() => {
    const remeasure = () => setActivePill(measure(active));
    document.fonts?.ready.then(remeasure);
    window.addEventListener("resize", remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [active, measure]);

  // Keep the page from scrolling behind the open mobile sheet, and tell the
  // sticky mobile call to action to step aside.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.documentElement.dataset.menu = open ? "open" : "";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.dataset.menu = "";
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-navy/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <a
          href="#top"
          className="flex min-h-[44px] shrink-0 items-center"
          aria-label={`${site.name}, home`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-white-text.svg"
            alt={site.company}
            width={160}
            height={64}
            className="h-9 w-auto md:h-10"
          />
        </a>

        <nav
          className="relative hidden items-center lg:flex"
          aria-label="Primary"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Hover highlight, slides between links rather than blinking on and off. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 h-9 rounded-full bg-white/[0.08] transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              width: hoverPill?.width ?? 0,
              transform: `translate(${hoverPill?.left ?? 0}px, -50%)`,
              opacity: hovered ? 1 : 0,
            }}
          />
          {/* Current section underline. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1.5 left-0 h-[2px] rounded-full bg-orange transition-[transform,width,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            style={{
              width: activePill ? activePill.width - 28 : 0,
              transform: `translateX(${(activePill?.left ?? 0) + 14}px)`,
              opacity: activePill ? 1 : 0,
            }}
          />

          {nav.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.href}
                ref={(node) => {
                  linkRefs.current[id] = node;
                }}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onMouseEnter={() => setHovered(id)}
                onFocus={() => setHovered(id)}
                onBlur={() => setHovered(null)}
                className={`relative inline-flex min-h-[44px] items-center px-3.5 font-display text-[15px] font-semibold transition-colors duration-200 xl:px-4 ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn-primary hidden min-h-[44px] !px-6 !py-2.5 !text-sm sm:inline-flex">
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-[2px] w-5 bg-current transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : "top-[13px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Reading progress, pinned to the bottom edge of the header. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -bottom-px h-[2px] transition-opacity duration-300 ${
          scrolled && !open ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          ref={progressRef}
          className="absolute inset-0 origin-left bg-warm-gradient"
          style={{ transform: "scaleX(0)" }}
        />
      </span>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/10 bg-navy transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[460px]" : "max-h-0 border-t-transparent"
        }`}
      >
        <nav className="container flex flex-col gap-1 py-5" aria-label="Mobile">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-center justify-between rounded-lg px-2 py-3 font-display text-lg font-semibold transition-colors hover:bg-white/5 hover:text-white ${
                  isActive ? "text-white" : "text-white/75"
                }`}
              >
                {item.label}
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
