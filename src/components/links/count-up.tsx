"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

/**
 * Counts up from zero the first time the number scrolls into view. Adapted
 * from Magic UI's Number Ticker on 21st.dev, with an eased requestAnimationFrame
 * loop in place of framer-motion's spring.
 *
 * The server renders the real number, so it is correct before scripts load,
 * for screen readers, and when the visitor prefers reduced motion.
 */
export function CountUp({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / DURATION_MS);
        setShown(Math.round((1 - Math.pow(1 - t, 3)) * value));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    setShown(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
