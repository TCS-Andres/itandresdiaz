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
