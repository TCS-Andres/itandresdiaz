"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * A brand-gradient glow that runs along a card's border toward the cursor.
 * Adapted from Aceternity's Glowing Effect on 21st.dev, rebuilt without
 * motion/react so the page stays dependency free. Drop it inside any
 * `relative` element with a border radius; it inherits the radius.
 *
 * Mouse and trackpad only. On touch screens, or when the visitor prefers
 * reduced motion, it never attaches a listener and stays invisible.
 */
export function GlowBorder({
  spread = 40,
  proximity = 64,
  width = 2,
}: {
  /** Half the wedge angle, in degrees. */
  spread?: number;
  /** How far outside the card, in px, the cursor still lights it. */
  proximity?: number;
  /** Ring thickness in px. */
  width?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pointer = { x: -1e5, y: -1e5 };
    let angle = 0;
    let target = 0;
    let measureFrame = 0;
    let easeFrame = 0;

    // Eases the wedge toward the cursor instead of snapping to it.
    const ease = () => {
      angle += (target - angle) * 0.14;
      if (Math.abs(target - angle) < 0.1) {
        angle = target;
        easeFrame = 0;
      } else {
        easeFrame = requestAnimationFrame(ease);
      }
      el.style.setProperty("--glow-start", angle.toFixed(2));
    };

    const measure = () => {
      measureFrame = 0;
      const { left, top, width: w, height: h } = el.getBoundingClientRect();
      const { x, y } = pointer;
      const active =
        x > left - proximity &&
        x < left + w + proximity &&
        y > top - proximity &&
        y < top + h + proximity;

      el.style.setProperty("--glow-active", active ? "1" : "0");
      if (!active) return;

      const toCursor = (Math.atan2(y - (top + h / 2), x - (left + w / 2)) * 180) / Math.PI + 90;
      // Shortest way round, so the wedge never spins the long way past 180.
      const delta = ((((toCursor - angle + 180) % 360) + 360) % 360) - 180;
      target = angle + delta;
      if (!easeFrame) easeFrame = requestAnimationFrame(ease);
    };

    const schedule = () => {
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    };
    const onPointerMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(measureFrame);
      cancelAnimationFrame(easeFrame);
    };
  }, [proximity]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="glow-border"
      style={{ "--glow-spread": spread, "--glow-width": `${width}px` } as CSSProperties}
    />
  );
}
