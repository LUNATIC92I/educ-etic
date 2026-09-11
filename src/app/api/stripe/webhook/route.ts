import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { finalizePayment } from "@/lib/payments";

// Stripe requires the raw request body to verify the webhook signature.
export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 400 });
  }

  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature ?? "", webhookSecret);
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    const { parentId, childId, level } = checkoutSession.metadata ?? {};
    if (parentId && childId && level) {
      await finalizePayment({
        parentId,
        childId,
        level,
        amount: checkoutSession.amount_total ?? 0,
        currency: checkoutSession.currency ?? "eur",
        stripeSessionId: checkoutSession.id,
      });
    }
  }

  return NextResponse.json({ received: true });
}
