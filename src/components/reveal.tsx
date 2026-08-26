"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/** If the observer has not reported by now, show the content regardless. */
const FAILSAFE_MS = 2000;

/**
 * Fades a block up the first time it scrolls into view.
 *
 * The animation is strictly decorative, so every failure path ends with the
 * content visible rather than hidden:
 *   - scripting disabled  -> <noscript> override in the root layout
 *   - no IntersectionObserver -> shown on mount
 *   - already on screen at mount -> shown immediately, no animation
 *   - observer present but never reports -> failsafe timer shows it anyway
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      setVisible(true);
      return;
    }

    // Above the fold at mount: no scroll will ever bring it in, so show it now.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    const failsafe = window.setTimeout(() => setVisible(true), FAILSAFE_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
