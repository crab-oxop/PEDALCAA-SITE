import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { HowItWorksSteps } from "@/components/how-it-works-steps";
import { IconArrowRight, IconChevronDown } from "@/components/icons";
import { dispatchFees } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `How It Works — ${siteConfig.businessName}`,
  description:
    "How on-demand mobile bike repair works, expected response times, and our service radius.",
};

const faqs = [
  {
    q: "What if the mechanic can't fix it on the spot?",
    a: "Most issues (flats, brakes, chains, tune-ups) are done in one visit. For anything needing special parts or a full rebuild, we'll quote it and either order the part for a follow-up visit or recommend a partner shop.",
  },
  {
    q: "What if I'm outside the service area?",
    a: "Enter your address when booking — we'll confirm we can reach you before anything is charged. We're focused on Toronto and Richmond Hill today, with more of the GTA coming soon.",
  },
  {
    q: "Do you work on e-bikes?",
    a: "Yes — motor, battery, and display diagnostics are available. Complex electrical repairs may require a follow-up visit or a manufacturer-authorized shop.",
  },
  {
    q: "What happens if it's raining or well below freezing?",
    a: "Mechanics carry weather cover for light rain. In severe weather we'll call ahead to reschedule rather than risk a rushed repair.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-void pt-40 pb-16 sm:pt-48 sm:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">How It Works</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-2xl text-display-lg font-display text-ink">
              The shop comes to you.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              Here&apos;s exactly what happens between the moment you book
              and the moment you&apos;re riding again.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-charcoal py-[var(--spacing-section-md)]">
        <Container className="max-w-3xl">
          <HowItWorksSteps />
        </Container>
      </section>

      {/* Response times + radius — asymmetric, hairline split */}
      <section className="bg-void py-[var(--spacing-section-md)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow text-accent-green">Response times</p>
                <dl className="mt-6 space-y-6">
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                    <dt className="text-sm text-ink-muted">
                      Emergency roadside
                    </dt>
                    <dd className="font-display text-2xl text-ink">
                      {dispatchFees.emergency.responseTime}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                    <dt className="text-sm text-ink-muted">
                      Scheduled repair
                    </dt>
                    <dd className="font-display text-2xl text-ink">
                      {dispatchFees.scheduled.responseTime}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                  Targets, not guarantees — actual time varies with mechanic
                  availability and traffic.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p className="eyebrow text-accent-green">Service radius</p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
                  Currently dispatching across {siteConfig.serviceArea.region}
                  , focused on{" "}
                  {siteConfig.serviceArea.primaryCities.join(" & ")}.
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-faint">
                  Expanding next to{" "}
                  {siteConfig.serviceArea.expandingSoon.join(", ")}. We
                  always confirm coverage before you pay.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ — editorial, light */}
      <section className="bg-paper py-[var(--spacing-section-md)] text-ink-on-paper">
        <Container className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-ink-on-paper-muted">Questions</p>
          </Reveal>
          <div className="mt-8 border-t border-black/10">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group border-b border-black/10 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-on-paper marker:content-none">
                    {f.q}
                    <IconChevronDown
                      size={18}
                      className="shrink-0 text-ink-on-paper-muted transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-on-paper-muted">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
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
