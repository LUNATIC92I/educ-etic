import type { Metadata } from "next";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { PRICING_PLANS } from "@/data/pricing";
import { PricingCard } from "@/components/marketing/pricing-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tarifs",
  description: "25€, 30€ ou 35€ par niveau : des tarifs simples pour apprendre HTML & CSS en famille.",
};

export default async function PricingPage() {
  const session = await getSession();
  let enrolledLevels: string[] = [];
  if (session?.role === "CHILD") {
    const enrollments = await db.enrollment.findMany({ where: { userId: session.sub } });
    enrolledLevels = enrollments.map((e) => e.level);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold">Choisis ton aventure</h1>
        <p className="mt-4 text-lg text-ck-text-muted">
          Un tarif unique par niveau, sans abonnement caché. Débloque un niveau et garde-le pour toujours.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          let cta = (
            <Button href="/register" className="w-full">
              Commencer
            </Button>
          );
          if (session?.role === "PARENT") {
            cta = (
              <Button href={`/payment?level=${plan.level}`} className="w-full">
                Débloquer pour {plan.price}€
              </Button>
            );
          } else if (session?.role === "CHILD") {
            cta = enrolledLevels.includes(plan.level) ? (
              <Button href="/dashboard" variant="secondary" className="w-full">
                Déjà débloqué ✓
              </Button>
            ) : (
              <Button href="/parent" className="w-full">
                Demander à mes parents
              </Button>
            );
          }
          return (
            <PricingCard key={plan.level} plan={plan} cta={cta} highlight={plan.level === "intermediate"} />
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-2xl rounded-3xl border border-ck-border bg-ck-bg-elevated p-8 text-center">
        <h2 className="font-display text-xl font-bold">Paiement 100% sécurisé</h2>
        <p className="mt-2 text-sm text-ck-text-muted">
          Les paiements sont traités par Stripe. CodeKids ne stocke jamais tes informations bancaires.
          Cartes bancaires, Apple Pay et Google Pay sont pris en charge.
        </p>
      </div>
    </div>
  );
}
