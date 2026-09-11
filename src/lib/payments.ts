import "server-only";
import { db } from "@/lib/db";

export async function finalizePayment({
  parentId,
  childId,
  level,
  amount,
  currency,
  stripeSessionId,
}: {
  parentId: string;
  childId: string;
  level: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
}) {
  const existing = await db.payment.findUnique({ where: { stripeSessionId } });
  if (existing?.status === "completed") return existing;

  const payment = existing
    ? await db.payment.update({ where: { id: existing.id }, data: { status: "completed" } })
    : await db.payment.create({
        data: { userId: parentId, level, amount, currency, stripeSessionId, status: "completed" },
      });

  await db.enrollment.upsert({
    where: { userId_level: { userId: childId, level } },
    update: { paymentId: payment.id },
    create: { userId: childId, level, paymentId: payment.id },
  });

  return payment;
}
