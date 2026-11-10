import type { CSSProperties, ReactNode } from "react";

/**
 * Decorative layers for /links, ported from 21st.dev components and rebuilt as
 * CSS (see the /links block in globals.css). None of them needs JavaScript, and
 * each one stops moving when the visitor prefers reduced motion.
 */

/** Liquid Aurora: brand-color light drifting behind a dark panel. */
export function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

/** Magic UI Orbiting Circles: items evenly spaced on a ring, all travelling it together. */
export function OrbitRing({
  radius,
  duration,
  size,
  reverse = false,
  children,
}: {
  radius: number;
  /** Seconds per lap. */
  duration: number;
  /** Item size in px. */
  size: number;
  reverse?: boolean;
  children: ReactNode[];
}) {
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="50%" cy="50%" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 5" />
      </svg>
      {children.map((child, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`orbit ${reverse ? "orbit-reverse" : ""}`}
          style={
            {
              "--radius": radius,
              "--duration": duration,
              "--size": `${size}px`,
              "--angle": (360 / children.length) * i,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </>
  );
}

/** Magic UI Border Beam: a short arc of brand light running around the parent's border. */
export function BorderBeam() {
  return <span className="border-beam" aria-hidden="true" />;
}

/**
 * Magic UI Shimmer Button's layers. Put them first inside any element that has
 * the `shimmer` class and sets `--bg` and `--shimmer-color`.
 */
export function ShimmerLayers() {
  return (
    <>
      <span className="shimmer-spark-wrap" aria-hidden="true">
        <span className="shimmer-spark" />
      </span>
      <span className="shimmer-backdrop" aria-hidden="true" />
    </>
  );
}
