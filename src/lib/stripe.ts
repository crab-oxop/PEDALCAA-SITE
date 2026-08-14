import Stripe from "stripe";

let _stripe: Stripe | null = null;

// Returns null (instead of throwing) when STRIPE_SECRET_KEY isn't set, so the
// booking flow can fall back to a "payment skipped" stub in local dev.
// TODO: set STRIPE_SECRET_KEY (test mode: sk_test_...) in .env to enable real Checkout.
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!_stripe) {
    _stripe = new Stripe(key);
  }
  return _stripe;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
