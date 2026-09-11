import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireParentUser } from "@/lib/require-user";
import { isStripeConfigured } from "@/lib/stripe";
import { PRICING_PLANS } from "@/data/pricing";
import { Card } from "@/components/ui/card";
import { PaymentForm } from "@/components/payment/payment-form";

export const metadata: Metadata = { title: "Paiement" };

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const user = await requireParentUser();
  const { level } = await searchParams;

  const plan = PRICING_PLANS.find((p) => p.level === level);
  if (!plan) redirect("/pricing");

  const children = await db.user.findMany({
    where: { parentId: user.id },
    select: { id: true, name: true, avatarEmoji: true },
  });

  return (
    <div className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-12">
      <Card className="w-full p-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500 to-violet-500 text-3xl text-white shadow-lg">
            {plan.emoji}
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">Niveau {plan.name}</h1>
          <p className="mt-1 text-ck-text-muted">{plan.description}</p>
          <p className="mt-3 font-display text-3xl font-bold">{plan.price}€</p>
        </div>

        <div className="mt-8">
          <PaymentForm level={plan.level} price={plan.price} kids={children} isStripeConfigured={isStripeConfigured()} />
        </div>
      </Card>
    </div>
  );
}
