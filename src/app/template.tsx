// Remounts on every navigation, giving each route a brief considered
// crossfade + slide-up instead of a hard cut. See .route-transition in
// globals.css.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-transition">{children}</div>;
}
