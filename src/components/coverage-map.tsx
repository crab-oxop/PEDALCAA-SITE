/**
 * Abstract, stylized coverage graphic — not a literal accurate map, a
 * deliberate line-art treatment standing in for one. Two service hubs
 * joined by a route network, each with a soft glow marker.
 */
export function CoverageMap() {
  return (
    <div className="relative aspect-[6/5] w-full overflow-hidden rounded-sm border border-white/10 bg-gradient-to-br from-charcoal to-void">
      <svg
        viewBox="0 0 600 500"
        className="absolute inset-0 h-full w-full text-ink"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeOpacity="0.16" strokeWidth="1">
          <path d="M-20 380 L620 260" />
          <path d="M-20 300 L620 420" />
          <path d="M-20 460 L400 40" />
          <path d="M120 -20 L520 520" />
          <path d="M0 120 L600 200" />
          <path d="M0 220 L600 60" />
          <path d="M260 -20 L260 520" />
          <path d="M420 -20 L380 520" />
        </g>
        <path
          d="M190 330 C 240 260, 300 150, 360 110"
          stroke="var(--color-accent-green)"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
        <circle cx="190" cy="330" r="34" fill="var(--color-accent-green)" opacity="0.16" />
        <circle cx="190" cy="330" r="5" fill="var(--color-accent-green)" />
        <circle cx="360" cy="110" r="34" fill="var(--color-accent-green)" opacity="0.16" />
        <circle cx="360" cy="110" r="5" fill="var(--color-accent-green)" />
      </svg>

      <span className="absolute" style={{ left: "31.6%", top: "66%" }}>
        <span className="block -translate-x-1/2 translate-y-2 text-xs font-medium tracking-wide whitespace-nowrap text-ink">
          Toronto
        </span>
      </span>
      <span className="absolute" style={{ left: "60%", top: "22%" }}>
        <span className="block -translate-x-1/2 -translate-y-full text-xs font-medium tracking-wide whitespace-nowrap text-ink">
          Richmond Hill
        </span>
      </span>
    </div>
  );
}
