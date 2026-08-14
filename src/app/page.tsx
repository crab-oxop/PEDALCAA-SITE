import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { CinematicImage } from "@/components/cinematic-image";
import { Grain } from "@/components/grain";
import { WorkGallery } from "@/components/work-gallery";
import { CoverageMap } from "@/components/coverage-map";
import { HowItWorksSteps } from "@/components/how-it-works-steps";
import { IconArrowRight, IconClock, IconPhone } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { dispatchFees } from "@/lib/pricing";

// TODO: [PLACEHOLDER copy] illustrative bike photos, not verified job
// records — swap captions/images for real before/after job photos once
// available.
const recentWork = [
  {
    src: "/images/bikes/bike-hybrid-black.jpg",
    alt: "Black hybrid commuter bike",
    caption: "Daily commuter — tuned and ready",
  },
  {
    src: "/images/bikes/bike-road-black.jpg",
    alt: "Black carbon road bike",
    caption: "Road bike — brake and drivetrain service",
  },
  {
    src: "/images/bikes/bike-full-suspension-white.jpg",
    alt: "White full-suspension mountain bike",
    caption: "Full-suspension trail bike — suspension check",
  },
  {
    src: "/images/bikes/bike-full-suspension-white-gold.jpg",
    alt: "White and gold full-suspension mountain bike",
    caption: "Enduro build — full tune-up",
  },
  {
    src: "/images/bikes/bike-full-suspension-black-gold.jpg",
    alt: "Black full-suspension mountain bike with gold accents",
    caption: "Trail bike — full suspension service",
  },
  {
    src: "/images/bikes/bike-hardtail-black-gold.jpg",
    alt: "Black hardtail mountain bike",
    caption: "Hardtail — new build setup",
  },
  {
    src: "/images/bikes/bike-full-suspension-silver.jpg",
    alt: "Silver full-suspension mountain bike",
    caption: "Trail bike — gear and brake adjustment",
  },
];

// TODO: [PLACEHOLDER copy] illustrative reviews — swap for real customer quotes before launch.
const testimonials = [
  {
    quote:
      "Flat tire on my commute, mechanic showed up in 25 minutes and I was back on the road before my next meeting.",
    name: "J. Alvarez",
    location: "Toronto",
  },
  {
    quote:
      "Way easier than hauling my e-bike into a shop and waiting a week. They came to my building's parking garage.",
    name: "S. Chen",
    location: "Richmond Hill",
  },
  {
    quote:
      "Booked a scheduled tune-up for a Saturday morning, mechanic was on time and explained everything.",
    name: "M. Osei",
    location: "Toronto",
  },
];

// TODO: [PLACEHOLDER copy] confirm real certifications/insurance details before launch.
const certifications = [
  "Certified bicycle mechanics",
  "Insured & background-checked",
  "E-bike safety certified",
];

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed, cinematic, lower-third headline */}
      <section className="relative flex h-[100dvh] min-h-[640px] w-full items-end overflow-hidden bg-void">
        <CinematicImage
          src="/images/bikes/bike-full-suspension-slate.jpg"
          alt="Full-suspension mountain bike leaning against a garage door"
          kenBurns
          preload
          objectPosition="center 40%"
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-transparent" />
        <Grain opacity={0.06} />
        <Container className="relative z-10 pb-20 sm:pb-28">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow text-ink-muted">
                Toronto &amp; Richmond Hill
              </p>
            </Reveal>
            <Reveal delay={90} as="div">
              <h1 className="mt-5 text-hero font-display text-ink">
                {siteConfig.tagline}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
                Roadside assistance for bikes. Flat tire, dropped chain, dead
                brakes — book a mobile mechanic and get fixed up right where
                you are.
              </p>
            </Reveal>
            <Reveal delay={270}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/book" className="btn btn-primary-on-dark">
                  Request a Repair
                  <IconArrowRight size={16} />
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="btn btn-ghost text-ink"
                >
                  <IconPhone size={16} />
                  Call Now
                </a>
              </div>
            </Reveal>
            <Reveal delay={360}>
              <p className="mt-8 flex items-center gap-2 text-sm text-ink-faint">
                <IconClock size={15} className="text-accent-green" />
                Average emergency arrival: {dispatchFees.emergency.responseTime}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How it works — dense, hairline-divided, typographic */}
      <section className="bg-charcoal py-[var(--spacing-section-md)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="eyebrow text-accent-green">How it works</p>
                <h2 className="mt-5 text-display-md font-display text-ink">
                  On-demand repair,
                  <br />
                  in three steps.
                </h2>
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
                  No towing your bike across town. No waiting a week for a
                  shop appointment.
                </p>
              </div>
            </Reveal>
            <HowItWorksSteps />
          </div>
        </Container>
      </section>

      {/* Where we ride — asymmetric split */}
      <section className="bg-void py-[var(--spacing-section-md)]">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <p className="eyebrow text-accent-green">Where we ride</p>
              <h2 className="mt-5 text-display-md font-display text-ink">
                Two cities,
                <br />
                one dispatch.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-muted">
                We&apos;re dispatching mechanics across the{" "}
                {siteConfig.serviceArea.region}, starting with:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {siteConfig.serviceArea.primaryCities.map((city) => (
                  <li
                    key={city}
                    className="rounded-sm border border-white/15 px-3 py-1.5 text-xs font-medium tracking-wide text-ink"
                  >
                    {city}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-faint">
                Expanding next to {siteConfig.serviceArea.expandingSoon.join(", ")}.
                Enter your address at booking and we&apos;ll confirm we can
                reach you.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <CoverageMap />
          </Reveal>
        </Container>
      </section>

      {/* Our work — large photographic, one-at-a-time */}
      <section className="bg-void py-[var(--spacing-section-md)]">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">Our work</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 max-w-xl text-display-md font-display text-ink">
              The bikes we keep rolling.
            </h2>
          </Reveal>
        </Container>
        <Reveal delay={160} className="mt-12">
          <WorkGallery images={recentWork} />
        </Reveal>
      </section>

      {/* Riders — editorial, light section for pacing contrast */}
      <section className="bg-paper py-[var(--spacing-section-md)] text-ink-on-paper">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-on-paper-muted">Riders</p>
          </Reveal>
          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:divide-x sm:divide-black/10">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.name}
                delay={i * 110}
                className={i > 0 ? "sm:pl-10" : undefined}
              >
                <blockquote>
                  <p className="text-display-sm font-display leading-snug text-ink-on-paper">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-black/10 pt-4 text-xs tracking-wide text-ink-on-paper-muted uppercase">
                    {t.name} — {t.location}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal delay={330}>
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-black/10 pt-8 text-xs tracking-wide text-ink-on-paper-muted uppercase">
              {certifications.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA — typography only, huge scale */}
      <section className="bg-void py-[var(--spacing-section-lg)] text-center">
        <Container>
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-display-lg font-display text-ink">
              Broken down right now?
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              Book a mechanic in under a minute, or call and we&apos;ll get
              someone moving.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn btn-primary-on-dark">
                Request a Repair
                <IconArrowRight size={16} />
              </Link>
              <a href={siteConfig.phoneHref} className="btn btn-ghost text-ink">
                Call {siteConfig.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
