import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About — ${siteConfig.businessName}`,
  description: "Why we started PedalCAA and what drives mobile bike repair.",
};

const team = [
  {
    name: "Eric Lu",
    role: "Founder & Head Mechanic",
    photo: "/images/team/eric-lu.jpg",
    photoAlt: "Eric Lu with his mountain bike on a GTA trail",
    initials: "EL",
    bio: "Eric has spent over four years building and tuning bikes, developing his mechanical skills independently across a wide range of builds rather than in a shop setting. He's a committed mountain and road rider, putting in regular kilometres on GTA trails and roads — the same conditions PedalCAA's customers ride in every day. That combination — years of hands-on precision and real mileage on the bike — is the standard every PedalCAA mechanic is held to.",
  },
  {
    name: "Anderson Lian",
    role: "Chief Operating Officer",
    // TODO: [PLACEHOLDER] real photo needed once available — see photo prop above for the treatment to swap in.
    photo: null,
    photoAlt: "",
    initials: "AL",
    bio: "Anderson brings three years of professional bike building experience to PedalCAA, having worked hands-on with builds across a range of bikes and components in a shop setting. As COO, he leads the day-to-day operations that make on-demand mobile repair actually work — dispatch, mechanic scheduling, and the logistics of getting the right tools to the right curb on time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-void pt-40 pb-16 sm:pt-48 sm:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">About</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 max-w-2xl text-display-lg font-display text-ink">
              Why we started {siteConfig.businessName}.
            </h1>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-[var(--spacing-section-md)] text-ink-on-paper">
        <Container>
          <div className="mx-auto max-w-xl space-y-7 text-lg leading-relaxed">
            {/* TODO: [PLACEHOLDER copy] replace with the real founder story before launch */}
            <Reveal>
              <p>
                {siteConfig.businessName} started with a flat tire and a
                missed meeting. Our founder was three kilometres from home,
                standing on a curb with a busted tube, watching the clock —
                and realized the nearest bike shop wasn&rsquo;t the problem.
                Getting the bike <em className="italic">there</em> was. So
                we built the thing we wished existed: a mechanic who comes
                to the flat tire, not the other way around.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-base text-ink-on-paper-muted">
                What started as fixing friends&rsquo; bikes on weekends
                turned into a small fleet of mechanics with a shared
                calendar and a service van — same care, just organized.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="pt-6 font-display text-2xl text-ink-on-paper">
                Why mobile repair?
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-base text-ink-on-paper-muted">
                Most bike problems are quick fixes — a patch, an adjustment,
                a new cable. But the friction of getting a bike to a shop
                (no car, no time, a full workday ahead) means small issues
                sit for weeks, or people just stop riding. Bringing the
                mechanic to you removes that friction entirely: less
                downtime, fewer bikes gathering dust in a garage, more
                people riding.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <h2 className="pt-6 font-display text-2xl text-ink-on-paper">
                Sustainability &amp; community
              </h2>
            </Reveal>
            <Reveal delay={280}>
              {/* TODO: [PLACEHOLDER copy] add real partnership/community details before launch */}
              <p className="text-base text-ink-on-paper-muted">
                Every bike kept on the road instead of the landfill is a
                small win — for the rider&rsquo;s wallet and for the city.
                We&rsquo;re built around the idea that a bike-friendly
                Toronto and Richmond Hill starts with making it easier, not
                harder, to keep riding. We&rsquo;re building toward
                partnerships with local shops and community rides as we
                grow.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The Team — photo-forward, generous whitespace, no card grid */}
      <section className="bg-void py-[var(--spacing-section-lg)]">
        <Container>
          <Reveal>
            <p className="eyebrow text-ink-muted">The Team</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-2xl text-display-sm font-display leading-snug text-ink">
              PedalCAA is built by people who actually turn wrenches, not a
              management team that outsources the work.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
              Real hands-on mechanical experience and a genuine, ongoing
              life on two wheels — on pavement and on trail.
            </p>
          </Reveal>

          <div className="mt-20 space-y-20">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="grid gap-8 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-14">
                  <div
                    className={`relative aspect-[4/5] w-full max-w-[260px] overflow-hidden border border-white/10 bg-gradient-to-b from-charcoal to-void ${
                      i % 2 === 1 ? "sm:order-2 sm:justify-self-end" : ""
                    }`}
                  >
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.photoAlt}
                        fill
                        sizes="260px"
                        className="object-cover"
                        style={{ objectPosition: "center 65%" }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-display text-5xl text-ink-faint">
                          {member.initials}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={i % 2 === 1 ? "sm:order-1" : undefined}>
                    <h3 className="font-display text-2xl text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-faint">
                      {member.role}
                    </p>
                    <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-20 max-w-xl border-t border-white/10 pt-8 text-sm leading-relaxed text-ink-faint">
              Every mechanic on the PedalCAA team is held to the same bar:
              real hands-on precision, and real time on a bike.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-[var(--spacing-section-sm)] text-ink-on-paper">
        <Container>
          <div className="mx-auto max-w-xl">
            <Reveal>
              <div className="border-t border-black/10 pt-7">
                <p className="eyebrow text-ink-on-paper-muted">
                  Insurance &amp; certification
                </p>
                <p className="mt-3 text-base text-ink-on-paper-muted">
                  {siteConfig.legal.insuranceNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="pt-8">
                <Link href="/book" className="btn btn-primary-on-paper">
                  Request a Repair
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
