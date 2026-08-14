import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { prisma } from "@/lib/prisma";
import { repairs, dispatchFees, formatCents } from "@/lib/pricing";
import { siteConfig } from "@/lib/site-config";
import { IconCheck } from "@/components/icons";
import type { ServiceTier } from "@/lib/types";

export default async function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string; session_id?: string }>;
}) {
  const { job: jobId } = await searchParams;
  if (!jobId) notFound();

  const job = await prisma.jobRequest.findUnique({ where: { id: jobId } });
  if (!job) notFound();

  const repair = repairs.find((r) => r.id === job.issueType);
  const fee = dispatchFees[job.serviceTier as ServiceTier];
  const paid = job.stripePaymentStatus === "paid";

  return (
    <section className="bg-void pt-40 pb-24 sm:pt-48">
      <Container>
        <div className="mx-auto max-w-xl">
          <Reveal>
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-green text-accent-green">
              <IconCheck size={20} />
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-display-lg font-display text-ink">
              You&apos;re booked, {job.name.split(" ")[0]}.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted">
              {job.preferredTime === "asap"
                ? `A mechanic will call you within 15 minutes to confirm ETA (typically ${dispatchFees.emergency.responseTime}).`
                : "A mechanic will call you shortly to confirm your appointment window."}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12 border-t border-white/10">
              <Row label="Job ID" value={job.id} mono />
              <Row label="Name" value={job.name} />
              <Row label="Phone" value={job.phone} />
              <Row label="Address" value={job.address} />
              <Row label="Issue" value={repair?.name ?? job.issueType} />
              <Row
                label="Timing"
                value={
                  job.preferredTime === "asap"
                    ? "ASAP — emergency roadside"
                    : `Scheduled — ${job.scheduledFor?.toLocaleString?.() ?? "TBD"}`
                }
              />
              <Row
                label={`${fee.label} dispatch fee`}
                value={formatCents(job.dispatchFeeCents)}
                status={paid ? "Paid" : "Pending"}
              />
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12">
              <p className="eyebrow text-ink-faint">Next steps</p>
              <ol className="mt-5 space-y-3">
                {[
                  "A mechanic will call you within 15 minutes to confirm details.",
                  "They'll text you a live ETA as they head your way.",
                  "On arrival, they'll confirm the repair cost before doing any work beyond the initial diagnosis.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4 text-sm leading-relaxed text-ink-muted">
                    <span className="font-display text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <p className="mt-12 border-t border-white/10 pt-8 text-sm text-ink-muted">
              Need to change something? Call or text{" "}
              <a
                href={siteConfig.phoneHref}
                className="link-underline text-ink"
              >
                {siteConfig.phoneDisplay}
              </a>
              .
            </p>
            <Link
              href="/"
              className="link-underline mt-4 inline-block text-sm text-ink-muted"
            >
              Back to home
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Row({
  label,
  value,
  mono,
  status,
}: {
  label: string;
  value: string;
  mono?: boolean;
  status?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 py-4 text-sm">
      <span className="text-ink-faint">{label}</span>
      <span className="flex items-center gap-2 text-right">
        <span className={`text-ink ${mono ? "font-mono text-xs" : "font-medium"}`}>
          {value}
        </span>
        {status && (
          <span
            className={`text-xs ${
              status === "Paid" ? "text-accent-green" : "text-ink-faint"
            }`}
          >
            {status}
          </span>
        )}
      </span>
    </div>
  );
}
