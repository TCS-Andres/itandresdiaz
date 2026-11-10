"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendlyButton } from "@/components/calendly-button";

/**
 * A small "Book a call" bubble with my face on it, floating at the bottom
 * right like a chat launcher. It waits until the header (and its own booking
 * button) has scrolled away, and steps aside while the guide form is on screen
 * so it never sits on top of the fields.
 */
export function FloatingCta({
  label,
  startAfter,
  hideWhileVisible,
}: {
  label: string;
  /** Id of the header. The bubble appears once it has scrolled away. */
  startAfter: string;
  /** Id of an element the bubble should not cover. */
  hideWhileVisible: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const header = document.getElementById(startAfter);
    const hider = document.getElementById(hideWhileVisible);
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const pastHeader = header ? header.getBoundingClientRect().bottom < 0 : window.scrollY > vh / 2;
      const rect = hider?.getBoundingClientRect();
      const covered = rect ? rect.top < vh - 40 && rect.bottom > 40 : false;
      setShow(pastHeader && !covered);
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
  }, [startAfter, hideWhileVisible]);

  return (
    <div
      aria-hidden={!show}
      inert={!show}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        show ? "translate-y-0 opacity-100" : "translate-y-[150%] opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-[440px] justify-end px-4">
        <CalendlyButton className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-navy py-1.5 pl-1.5 pr-5 font-display text-[15px] font-bold text-white shadow-elevated ring-1 ring-white/10 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
          <span className="relative">
            <Image
              src="/andres-contact.jpg"
              alt=""
              width={400}
              height={400}
              sizes="38px"
              className="h-[38px] w-[38px] rounded-full object-cover ring-2 ring-orange"
            />
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-navy bg-orange" />
            </span>
          </span>
          {label}
        </CalendlyButton>
      </div>
    </div>
  );
}
