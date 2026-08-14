import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";
import type { JobRequest } from "@/generated/prisma/client";

// TODO: set RESEND_API_KEY in .env to send real emails.
// Without it, this just logs to the server console so the booking flow
// still works end-to-end in local dev.
export async function sendJobRequestNotification(job: JobRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.NOTIFY_EMAIL || siteConfig.email;

  const subject = `New job request: ${job.name} — ${job.issueType}`;
  const body = [
    `New booking from ${job.name} (${job.phone})`,
    `Address: ${job.address}`,
    `Issue: ${job.issueType}${job.issueDetails ? ` — ${job.issueDetails}` : ""}`,
    `Timing: ${job.preferredTime}${job.scheduledFor ? ` (${job.scheduledFor.toISOString()})` : ""}`,
    `Tier: ${job.serviceTier} — dispatch fee $${(job.dispatchFeeCents / 100).toFixed(2)}`,
    job.photoUrl ? `Photo: ${job.photoUrl}` : null,
    `Job ID: ${job.id}`,
  ]
    .filter(Boolean)
    .join("\n");

  if (!apiKey) {
    console.log(
      `[email stub] RESEND_API_KEY not set — would send to ${notifyTo}:\n${subject}\n${body}`
    );
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: process.env.NOTIFY_FROM_EMAIL || "PedalCAA <onboarding@resend.dev>", // TODO: verify a real sending domain in Resend
    to: notifyTo,
    subject,
    text: body,
  });

  return { skipped: false as const, result };
}
