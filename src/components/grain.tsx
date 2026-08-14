/**
 * Cheap filmic noise overlay — replaces the impulse to drop in a stock
 * photo. Pure SVG filter, no image asset, tiles the viewport.
 */
export function Grain({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
      style={{ opacity }}
      aria-hidden="true"
    >
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
