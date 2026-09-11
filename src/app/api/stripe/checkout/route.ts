import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { getStripe, priceEnvForLevel } from "@/lib/stripe";
import { finalizePayment } from "@/lib/payments";
import { PRICING_PLANS } from "@/data/pricing";
import { nanoid } from "nanoid";

const bodySchema = z.object({
  level: z.enum(["beginner", "intermediate", "advanced"]),
  childId: z.string().min(1),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "PARENT") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const { level, childId } = parsed.data;

  const child = await db.user.findUnique({ where: { id: childId } });
  if (!child || child.parentId !== session.sub) {
    return NextResponse.json({ error: "Enfant introuvable" }, { status: 404 });
  }

  const existingEnrollment = await db.enrollment.findUnique({
    where: { userId_level: { userId: childId, level } },
  });
  if (existingEnrollment) {
    return NextResponse.json({ error: "Ce niveau est déjà débloqué pour cet enfant." }, { status: 409 });
  }

  const plan = PRICING_PLANS.find((p) => p.level === level)!;
  const amount = plan.price * 100;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const stripe = getStripe();

  if (!stripe) {
    // Demo mode: no Stripe keys configured — simulate an instant successful payment
    // so the full product flow can be tried end-to-end.
    const stripeSessionId = `demo_${nanoid()}`;
    await finalizePayment({
      parentId: session.sub,
      childId,
      level,
      amount,
      currency: "eur",
      stripeSessionId,
    });
    return NextResponse.json({
      url: `${appUrl}/success?demo=1&level=${level}&child=${encodeURIComponent(child.name)}`,
    });
  }

  const priceId = priceEnvForLevel(level);

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      priceId
        ? { price: priceId, quantity: 1 }
        : {
            quantity: 1,
            price_data: {
              currency: "eur",
              unit_amount: amount,
              product_data: {
                name: `CodeKids — Niveau ${plan.name}`,
                description: plan.description,
              },
            },
          },
    ],
    metadata: { parentId: session.sub, childId, level },
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/payment?level=${level}`,
  });

  await db.payment.create({
    data: {
      userId: session.sub,
      level,
      amount,
      currency: "eur",
      stripeSessionId: checkoutSession.id,
      status: "pending",
    },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
