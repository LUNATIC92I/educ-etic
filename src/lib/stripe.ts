import "server-only";
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

export function isStripeConfigured() {
  return !!process.env.STRIPE_SECRET_KEY;
}

export function priceEnvForLevel(level: string): string | undefined {
  const map: Record<string, string | undefined> = {
    beginner: process.env.STRIPE_PRICE_BEGINNER,
    intermediate: process.env.STRIPE_PRICE_INTERMEDIATE,
    advanced: process.env.STRIPE_PRICE_ADVANCED,
  };
  return map[level] || undefined;
}
