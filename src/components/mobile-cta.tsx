"use client";

import { useEffect, useState } from "react";

type CtaLink = { href: string; label: string };

const HOME_HIDE_WHILE_VISIBLE = ["guide"];

/**
 * A slim bar pinned to the bottom of phone and tablet screens, so the next
 * step is always one tap away on a long page. It stays out of the way where
 * it would compete: over the hero (the buttons are right there), while any
 * section in `hideWhileVisible` is on screen, and from `stopAt` down.
 *
 * The defaults are the home page's: free guide and contact.
 */
export function MobileCta({
  primary = { href: "#contact", label: "Let's talk" },
  secondary = { href: "#guide", label: "Free guide" },
  startAfter = "top",
  hideWhileVisible = HOME_HIDE_WHILE_VISIBLE,
  stopAt = "contact",
}: {
  primary?: CtaLink;
  secondary?: CtaLink;
  /** Id of the hero. The bar appears once it has scrolled away. */
  startAfter?: string;
  hideWhileVisible?: string[];
  /** Id of the section where the bar retires for good. */
  stopAt?: string;
}) {
  const [show, setShow] = useState(false);
  const hideKey = hideWhileVisible.join(",");

  useEffect(() => {
    const hero = document.getElementById(startAfter);
    const hiders = hideKey
      .split(",")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const stop = document.getElementById(stopAt);
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > vh;
      const covered = hiders.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < vh && r.bottom > 0;
      });
      const reachedStop = stop ? stop.getBoundingClientRect().top < vh * 0.9 : false;
      setShow(pastHero && !covered && !reachedStop);
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
  }, [startAfter, hideKey, stopAt]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href={secondary.href} className="btn-ghost-dark flex-1 !px-4 !py-3 !text-sm">
          {secondary.label}
        </a>
        <a href={primary.href} className="btn-primary flex-[1.4] !px-4 !py-3 !text-sm">
          {primary.label}
        </a>
      </div>
    </div>
  );
}
