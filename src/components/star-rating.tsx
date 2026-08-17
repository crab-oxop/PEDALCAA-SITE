import { IconStar } from "@/components/icons";

// Read-only star display — rounds to the nearest whole star rather than
// rendering true half-stars, matching the rest of the icon system's
// "simple, no extra dependency" approach.
export function StarRating({
  rating,
  size = 16,
  className = "",
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <div
      className={`flex items-center gap-0.5 text-accent-green ${className}`}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar key={n} size={size} filled={n <= rounded} aria-hidden="true" />
      ))}
    </div>
  );
}
