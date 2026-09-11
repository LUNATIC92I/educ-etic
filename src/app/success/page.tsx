import type { Metadata } from "next";
import { requireParentUser } from "@/lib/require-user";
import { getStripe } from "@/lib/stripe";
import { finalizePayment } from "@/lib/payments";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Paiement confirmé" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; demo?: string; level?: string; child?: string }>;
}) {
  const user = await requireParentUser();
  const params = await searchParams;

  let levelLabel = params.level ? LEVEL_LABELS[params.level] ?? params.level : null;
  let childName = params.child ?? null;
  let ok = params.demo === "1";

  if (params.session_id) {
    const stripe = getStripe();
    if (stripe) {
      try {
        const session = await stripe.checkout.sessions.retrieve(params.session_id);
        if (session.payment_status === "paid") {
          const { parentId, childId, level } = session.metadata ?? {};
          if (parentId && childId && level) {
            await finalizePayment({
              parentId,
              childId,
              level,
              amount: session.amount_total ?? 0,
              currency: session.currency ?? "eur",
              stripeSessionId: session.id,
            });
            const child = await db.user.findUnique({ where: { id: childId } });
            childName = child?.name ?? null;
            levelLabel = LEVEL_LABELS[level] ?? level;
            ok = true;
          }
        }
      } catch {
        ok = false;
      }
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-4">
      <Card className="w-full p-10 text-center">
        {ok ? (
          <>
            <p className="text-6xl">🎉</p>
            <h1 className="mt-4 font-display text-2xl font-bold">Paiement confirmé !</h1>
            <p className="mt-2 text-ck-text-muted">
              Le niveau {levelLabel} a été débloqué {childName ? `pour ${childName}` : ""}. Une confirmation a été
              enregistrée sur ton compte.
            </p>
          </>
        ) : (
          <>
            <p className="text-6xl">🤔</p>
            <h1 className="mt-4 font-display text-2xl font-bold">Un instant…</h1>
            <p className="mt-2 text-ck-text-muted">
              Nous n&apos;avons pas pu confirmer ce paiement immédiatement. S&apos;il vient d&apos;être effectué,
              vérifie ton espace parent dans quelques instants.
            </p>
          </>
        )}
        <div className="mt-8 flex flex-col gap-3">
          <Button href="/parent">Voir l&apos;espace parent</Button>
          <Button href="/pricing" variant="secondary">
            Débloquer un autre niveau
          </Button>
        </div>
        <p className="mt-6 text-xs text-ck-text-muted">Connecté en tant que {user.name}</p>
      </Card>
    </div>
  );
}
