"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Child = { id: string; name: string; avatarEmoji: string };

export function PaymentForm({
  level,
  price,
  kids,
  isStripeConfigured,
}: {
  level: string;
  price: number;
  kids: Child[];
  isStripeConfigured: boolean;
}) {
  const [childId, setChildId] = useState(kids[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ level, childId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Impossible de lancer le paiement. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  if (kids.length === 0) {
    return (
      <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
        Ajoute d&apos;abord le profil de ton enfant depuis l&apos;espace parent avant de débloquer un niveau.
      </p>
    );
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-ck-text-muted">Pour quel enfant ?</p>
      <div className="flex flex-wrap gap-2">
        {kids.map((child) => (
          <button
            key={child.id}
            type="button"
            onClick={() => setChildId(child.id)}
            className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              childId === child.id ? "border-electric-400 bg-electric-50 dark:bg-electric-500/10" : "border-ck-border"
            }`}
          >
            <span className="text-lg">{child.avatarEmoji}</span> {child.name}
          </button>
        ))}
      </div>

      {!isStripeConfigured ? (
        <p className="mt-4 rounded-xl bg-electric-50 px-4 py-3 text-xs text-electric-700 dark:bg-electric-500/10 dark:text-electric-300">
          Mode démo : Stripe n&apos;est pas configuré sur cet environnement. Le paiement sera simulé et le niveau
          débloqué instantanément.
        </p>
      ) : null}

      {error ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

      <Button onClick={pay} disabled={loading || !childId} size="lg" className="mt-6 w-full">
        {loading ? "Redirection…" : `Payer ${price}€ en toute sécurité`}
      </Button>
      <p className="mt-3 text-center text-xs text-ck-text-muted">
        🔒 Paiement sécurisé par Stripe · Carte bancaire, Apple Pay, Google Pay
      </p>
    </div>
  );
}
