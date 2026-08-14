import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { IconCheck } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Membership — ${siteConfig.businessName}`,
  description: "Commuter Plan: priority dispatch and free tune-ups for regular riders.",
};

// TODO: [PLACEHOLDER copy] confirm real perks/discount before launch.
const perks = [
  "Priority dispatch — jump the queue during peak demand",
  "2 free scheduled tune-ups per year",
  "10% off all parts and repairs",
  "Waived dispatch fee on scheduled repairs",
];

export default function MembershipPage() {
  return (
    <section className="bg-void pt-40 pb-24 sm:pt-48">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow justify-center text-ink-muted">
              Membership — coming soon
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-display-lg font-display text-ink">
              Never think about maintenance again.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              One monthly plan. Priority dispatch, tune-ups built in.
            </p>
          </Reveal>
        </div>

        <Reveal delay={240}>
          {/* The one deliberately differentiated panel on the site — a fine
              accent-green border, reserved for membership. */}
          <div className="mx-auto mt-16 max-w-sm border border-accent-green/40 p-10 text-center">
            <h2 className="font-display text-2xl text-ink">Commuter Plan</h2>
            <p className="mt-4">
              <span className="font-display text-5xl text-ink">$15</span>
              <span className="text-ink-faint"> / month</span>
            </p>
            <ul className="mt-8 space-y-3.5 text-left text-sm">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <IconCheck
                    size={16}
                    className="mt-0.5 shrink-0 text-accent-green"
                  />
                  <span className="text-ink-muted">{p}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${siteConfig.email}?subject=Commuter Plan waitlist`}
              className="btn btn-primary-on-dark mt-9 w-full justify-center"
            >
              Join the waitlist
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-ink-faint">
            Membership billing isn&apos;t live yet — email us and we&apos;ll
            reach out the moment it launches.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
