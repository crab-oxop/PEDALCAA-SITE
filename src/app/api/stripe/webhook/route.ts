import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

// TODO: set STRIPE_WEBHOOK_SECRET (from `stripe listen` in dev, or the
// Dashboard in production) for this route to verify and process events.
// Point your Stripe webhook at POST /api/stripe/webhook, subscribed to
// `checkout.session.completed`.
export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe is not configured" },
      { status: 501 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const jobId = session.metadata?.jobId;
    if (jobId) {
      await prisma.jobRequest.update({
        where: { id: jobId },
        data: { status: "confirmed", stripePaymentStatus: "paid" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
