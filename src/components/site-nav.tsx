"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the page from scrolling behind the open mobile sheet.
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
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

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-[44px] items-center font-display text-[15px] font-semibold text-white/75 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
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

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-white/10 bg-navy transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-[420px]" : "max-h-0 border-t-transparent"
        }`}
      >
        <nav className="container flex flex-col gap-1 py-5" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 font-display text-lg font-semibold text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
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
