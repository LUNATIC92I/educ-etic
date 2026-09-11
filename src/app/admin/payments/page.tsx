import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Paiements" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export default async function AdminPaymentsPage() {
  const payments = await db.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  const totalRevenue = payments.filter((p) => p.status === "completed").reduce((s, p) => s + p.amount, 0) / 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Paiements</h1>
        <p className="mt-1 text-ck-text-muted">
          {payments.length} transaction{payments.length > 1 ? "s" : ""} · {totalRevenue.toFixed(2)}€ de revenu confirmé
        </p>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ck-bg text-left text-xs uppercase text-ck-text-muted">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Session Stripe</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-ck-border">
                <td className="px-4 py-3">{formatDate(p.createdAt)}</td>
                <td className="px-4 py-3">
                  {p.user.name}
                  <br />
                  <span className="text-xs text-ck-text-muted">{p.user.email}</span>
                </td>
                <td className="px-4 py-3">{LEVEL_LABELS[p.level] ?? p.level}</td>
                <td className="px-4 py-3 font-semibold">{(p.amount / 100).toFixed(2)}€</td>
                <td className="px-4 py-3">
                  <BadgePill tone={p.status === "completed" ? "electric" : p.status === "failed" ? "bubble" : "neutral"}>
                    {p.status}
                  </BadgePill>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-ck-text-muted">{p.stripeSessionId ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
