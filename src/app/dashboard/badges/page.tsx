import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Mes récompenses" };

export default async function BadgesPage() {
  const user = await requireChildUser();
  const allBadges = await db.badge.findMany();
  const earned = await db.userBadge.findMany({ where: { userId: user.id } });
  const earnedIds = new Set(earned.map((e) => e.badgeId));
  const earnedAtByBadge = new Map(earned.map((e) => [e.badgeId, e.earnedAt]));

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Mes récompenses</h1>
      <p className="mt-1 text-ck-text-muted">
        {earned.length} badge{earned.length > 1 ? "s" : ""} débloqué{earned.length > 1 ? "s" : ""} sur {allBadges.length}.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allBadges.map((badge) => {
          const owned = earnedIds.has(badge.id);
          return (
            <Card
              key={badge.id}
              className={cn(
                "flex flex-col items-center p-5 text-center transition-transform",
                owned ? "border-sunny-400 hover:-translate-y-1" : "opacity-50 grayscale"
              )}
            >
              <div className="text-4xl">{badge.emoji}</div>
              <p className="mt-2 font-display text-sm font-bold">{badge.name}</p>
              <p className="mt-1 text-xs text-ck-text-muted">{badge.description}</p>
              {owned ? (
                <p className="mt-2 text-[10px] font-semibold text-emerald-500">
                  Obtenu le {earnedAtByBadge.get(badge.id)?.toLocaleDateString("fr-FR")}
                </p>
              ) : (
                <p className="mt-2 text-[10px] font-semibold text-ck-text-muted">🔒 Verrouillé</p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
