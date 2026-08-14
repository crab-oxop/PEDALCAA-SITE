import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/validation";
import { dispatchFees, repairs } from "@/lib/pricing";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { sendJobRequestNotification } from "@/lib/email";
import type { ServiceTier } from "@/lib/types";

// NOTE: photos are written to /public/uploads on the local filesystem.
// TODO: on Vercel this filesystem is read-only/ephemeral — swap this for a
// real object store (e.g. Vercel Blob or S3) before deploying to production.
async function savePhoto(photo: File): Promise<string> {
  const bytes = Buffer.from(await photo.arrayBuffer());
  const ext = path.extname(photo.name) || ".jpg";
  const filename = `${randomUUID()}${ext}`;
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  await writeFile(path.join(uploadsDir, filename), bytes);
  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const raw = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    issueType: String(formData.get("issueType") ?? ""),
    issueDetails: String(formData.get("issueDetails") ?? ""),
    preferredTime: String(formData.get("preferredTime") ?? ""),
    scheduledFor: String(formData.get("scheduledFor") ?? ""),
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid submission" },
      { status: 400 }
    );
  }
  const data = parsed.data;

  const repair = repairs.find((r) => r.id === data.issueType);
  if (!repair) {
    return NextResponse.json({ error: "Unknown issue type" }, { status: 400 });
  }

  const tier: ServiceTier = data.preferredTime === "asap" ? "emergency" : "scheduled";
  const fee = dispatchFees[tier];

  let photoUrl: string | null = null;
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) {
    try {
      photoUrl = await savePhoto(photo);
    } catch (err) {
      console.error("Failed to save uploaded photo", err);
    }
  }

  const job = await prisma.jobRequest.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      address: data.address,
      issueType: data.issueType,
      issueDetails: data.issueDetails || null,
      photoUrl,
      preferredTime: data.preferredTime,
      scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
      serviceTier: tier,
      dispatchFeeCents: fee.priceCents,
      status: "pending_payment",
    },
  });

  sendJobRequestNotification(job).catch((err) =>
    console.error("Failed to send job request notification", err)
  );

  if (!isStripeConfigured()) {
    // Stub path: no Stripe keys configured, skip payment and confirm directly
    // so the booking flow is fully testable in local dev.
    const updated = await prisma.jobRequest.update({
      where: { id: job.id },
      data: { status: "confirmed", stripePaymentStatus: "unpaid" },
    });
    return NextResponse.json({ jobId: updated.id, skippedPayment: true });
  }

  const stripe = getStripe()!;
  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "cad",
          unit_amount: fee.priceCents,
          product_data: {
            name: `${fee.label} dispatch fee — ${repair.name}`,
            description:
              "Covers mechanic dispatch + first 15 min of diagnosis/labor. Repair cost quoted on-site.",
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/book/confirmation?job=${job.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book`,
    metadata: { jobId: job.id },
    customer_email: data.email || undefined,
  });

  await prisma.jobRequest.update({
    where: { id: job.id },
    data: { stripeSessionId: session.id, stripePaymentStatus: "unpaid" },
  });

  return NextResponse.json({ jobId: job.id, checkoutUrl: session.url });
}
