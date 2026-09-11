import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { CreateBadgeForm } from "@/components/admin/create-badge-form";

export const metadata: Metadata = { title: "Badges" };

export default async function AdminBadgesPage() {
  const badges = await db.badge.findMany({ include: { _count: { select: { userBadges: true } } } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Badges</h1>
        <p className="mt-1 text-ck-text-muted">{badges.length} badges dans le catalogue.</p>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Créer un badge</h2>
        <div className="mt-4">
          <CreateBadgeForm />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="p-5 text-center">
            <div className="text-3xl">{badge.emoji}</div>
            <p className="mt-2 font-display text-sm font-bold">{badge.name}</p>
            <p className="mt-1 text-xs text-ck-text-muted">{badge.description}</p>
            <p className="mt-2 text-[11px] font-semibold text-electric-500">
              {badge._count.userBadges} obtenu{badge._count.userBadges > 1 ? "s" : ""}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
