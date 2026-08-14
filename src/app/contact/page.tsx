import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";
import {
  IconArrowRight,
  IconMail,
  IconMessage,
  IconPhone,
} from "@/components/icons";

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.businessName}`,
  description: "Phone, text, email, hours, and service area.",
};

const methods = [
  {
    icon: IconPhone,
    title: "Call",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    icon: IconMessage,
    title: "Text",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    icon: IconMail,
    title: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-void pt-40 pb-12 sm:pt-48">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">Contact</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-xl text-display-lg font-display text-ink">
              Get in touch.
            </h1>
          </Reveal>
        </Container>
      </section>

      {/* Book online — visually primary, asymmetric against the list below */}
      <section className="bg-charcoal">
        <Container>
          <Reveal>
            <Link
              href="/book"
              className="group -mx-4 flex items-center justify-between gap-6 px-4 py-10 transition-colors duration-300 sm:py-14"
            >
              <span>
                <span className="font-display text-3xl text-ink sm:text-4xl">
                  Book online
                </span>
                <span className="mt-2 block text-sm text-ink-muted">
                  Fastest way to get help — a mechanic calls within 15
                  minutes.
                </span>
              </span>
              <IconArrowRight
                size={28}
                className="shrink-0 text-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-accent-green"
              />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Secondary contact methods — quiet hairline list */}
      <section className="bg-void">
        <Container>
          <div className="border-t border-white/10">
            {methods.map((m, i) => (
              <Reveal key={m.title} delay={i * 70}>
                <a
                  href={m.href}
                  className="group flex items-center gap-5 border-b border-white/10 py-6"
                >
                  <m.icon
                    size={20}
                    className="shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-accent-green"
                  />
                  <span className="flex flex-1 items-baseline justify-between gap-4">
                    <span className="text-sm text-ink-muted">{m.title}</span>
                    <span className="link-underline font-medium text-ink">
                      {m.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Hours + service area — asymmetric typographic split */}
      <section className="bg-void py-[var(--spacing-section-md)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow text-accent-green">Hours</p>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-sm text-ink-muted">Mon–Fri</dt>
                    <dd className="text-sm font-medium text-ink">
                      {siteConfig.hours.weekday}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <dt className="text-sm text-ink-muted">Sat–Sun</dt>
                    <dd className="text-sm font-medium text-ink">
                      {siteConfig.hours.weekend}
                    </dd>
                  </div>
                </dl>
                <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                  {siteConfig.hours.note}
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p className="eyebrow text-accent-green">Service area</p>
                <p className="mt-6 text-base leading-relaxed text-ink-muted">
                  {siteConfig.serviceArea.region} — currently{" "}
                  {siteConfig.serviceArea.primaryCities.join(" & ")}.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                  Expanding next to{" "}
                  {siteConfig.serviceArea.expandingSoon.join(", ")}.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
