import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { BookingForm } from "@/app/book/booking-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Book a Repair — ${siteConfig.businessName}`,
  description: "Request a mobile bike repair, ASAP or scheduled.",
};

export default function BookPage() {
  return (
    <section className="bg-void pt-40 pb-24 sm:pt-48">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <p className="eyebrow text-ink-muted">Book a Repair</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-display-lg font-display text-ink">
              Tell us where you are.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              We&apos;ll dispatch a mechanic and text you their ETA.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-14">
              <BookingForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
