import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { dispatchFees, repairs, formatCents } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";
import { IconArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: `Services & Pricing — ${siteConfig.businessName}`,
  description:
    "Flat dispatch fees for emergency roadside and scheduled mobile bike repair, plus typical repair price ranges.",
};

export default function ServicesPage() {
  const other = repairs.find((r) => r.id === "other");

  return (
    <>
      <section className="bg-void pt-40 pb-16 sm:pt-48 sm:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">Services &amp; Pricing</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-2xl text-display-lg font-display text-ink">
              A dispatch fee, not a guess.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              We charge a flat fee to send a mechanic to you — like a tow
              truck call-out. They quote the actual repair on-site once
              they&apos;ve seen the bike, so you&apos;re never paying for
              guesswork.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Asymmetric tier emphasis */}
      <section className="bg-charcoal py-[var(--spacing-section-sm)]">
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-white/10 pb-8">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                  </span>
                  <h2 className="text-display-md font-display text-ink">
                    Emergency Roadside
                  </h2>
                </div>
                <p className="font-display text-4xl text-ink">
                  {formatCents(dispatchFees.emergency.priceCents)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <p className="max-w-md text-sm leading-relaxed text-ink-muted">
                  {dispatchFees.emergency.description}
                </p>
                <p className="shrink-0 text-sm font-medium text-accent-green">
                  Arrival in {dispatchFees.emergency.responseTime}
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-10 pb-6">
                <h2 className="text-display-sm font-display text-ink-muted">
                  Scheduled Repair
                </h2>
                <p className="font-display text-2xl text-ink-muted">
                  {formatCents(dispatchFees.scheduled.priceCents)}
                </p>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <div className="flex flex-col gap-2 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <p className="max-w-md text-sm leading-relaxed text-ink-faint">
                  {dispatchFees.scheduled.description}
                </p>
                <p className="shrink-0 text-sm text-ink-faint">
                  {dispatchFees.scheduled.responseTime}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Repair price ranges — hairline rows, no table chrome */}
      <section className="bg-void py-[var(--spacing-section-md)]">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">Typical repair prices</p>
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
              Parts and labor, in addition to the dispatch fee above. Your
              mechanic always confirms the price before doing any work
              beyond the initial diagnosis.
            </p>
          </Reveal>

          <div className="mt-12 border-t border-white/10">
            {repairs
              .filter((r) => r.id !== "other")
              .map((r, i) => (
                <Reveal key={r.id} delay={i * 55}>
                  <div className="flex flex-col gap-1.5 border-b border-white/10 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                    <div>
                      <h3 className="text-base font-semibold text-ink">
                        {r.name}
                      </h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-muted">
                        {r.description}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium whitespace-nowrap text-ink">
                      {r.priceRangeLabel}
                    </p>
                  </div>
                </Reveal>
              ))}
            {other && (
              <Reveal delay={repairs.length * 55}>
                <div className="flex flex-col gap-1.5 border-b border-white/10 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <div>
                    <h3 className="text-base font-semibold text-ink">
                      {other.name}
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-muted">
                      {other.description}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium whitespace-nowrap text-ink-muted">
                    {other.priceRangeLabel}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>

      {/* Why a dispatch fee — editorial, light tonal moment */}
      <section className="bg-paper py-[var(--spacing-section-sm)] text-ink-on-paper">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow text-ink-on-paper-muted">
                Why a dispatch fee
              </p>
              <p className="mt-6 text-display-sm font-display leading-snug text-ink-on-paper">
                &ldquo;Flat tire&rdquo; can mean a quick patch — or a torn
                tire and a bent rim.
              </p>
              <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-on-paper-muted">
                A dispatch fee gets a mechanic to you fast for an honest,
                on-the-spot diagnosis, instead of quoting a price before
                we&apos;ve seen the bike and having to renegotiate once we
                arrive.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-void py-[var(--spacing-section-sm)]">
        <Container className="flex justify-center">
          <Reveal>
            <Link href="/book" className="btn btn-primary-on-dark">
              Request a Repair
              <IconArrowRight size={16} />
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
