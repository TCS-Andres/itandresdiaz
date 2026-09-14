"use client";

import { useEffect, useState } from "react";

/**
 * A slim bar pinned to the bottom of phone and tablet screens, so the next
 * step is always one tap away on a long page. It stays out of the way where
 * it would compete: over the hero (the buttons are right there), while the
 * guide form is on screen, and from the contact section down.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const guide = document.getElementById("guide");
    const contact = document.getElementById("contact");
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > vh;
      const g = guide?.getBoundingClientRect();
      const guideOnScreen = g ? g.top < vh && g.bottom > 0 : false;
      const reachedContact = contact ? contact.getBoundingClientRect().top < vh * 0.9 : false;
      setShow(pastHero && !guideOnScreen && !reachedContact);
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

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <a href="#guide" className="btn-ghost-dark flex-1 !px-4 !py-3 !text-sm">
          Free guide
        </a>
        <a href="#contact" className="btn-primary flex-[1.4] !px-4 !py-3 !text-sm">
          {"Let's talk"}
        </a>
      </div>
    </div>
  );
}
