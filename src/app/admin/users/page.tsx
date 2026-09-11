import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { formatDate, formatXp } from "@/lib/utils";

export const metadata: Metadata = { title: "Utilisateurs" };

const ROLE_LABELS: Record<string, string> = { PARENT: "Parent", CHILD: "Enfant", ADMIN: "Admin" };
const ROLE_TONES: Record<string, "electric" | "violet" | "bubble"> = {
  PARENT: "electric",
  CHILD: "violet",
  ADMIN: "bubble",
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const users = await db.user.findMany({
    where: role ? { role } : undefined,
    orderBy: { createdAt: "desc" },
    include: { parent: { select: { name: true } } },
  });

  const roleCounts = await db.user.groupBy({ by: ["role"], _count: { _all: true } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Utilisateurs</h1>
        <p className="mt-1 text-ck-text-muted">{users.length} compte{users.length > 1 ? "s" : ""} affiché{users.length > 1 ? "s" : ""}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <a href="/admin/users" className="rounded-full border border-ck-border px-4 py-1.5 text-sm font-semibold hover:border-electric-400">
          Tous ({users.length && roleCounts.reduce((s, r) => s + r._count._all, 0)})
        </a>
        {roleCounts.map((r) => (
          <a
            key={r.role}
            href={`/admin/users?role=${r.role}`}
            className="rounded-full border border-ck-border px-4 py-1.5 text-sm font-semibold hover:border-electric-400"
          >
            {ROLE_LABELS[r.role] ?? r.role} ({r._count._all})
          </a>
        ))}
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ck-bg text-left text-xs uppercase text-ck-text-muted">
            <tr>
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Rôle</th>
              <th className="px-4 py-3">Email / identifiant</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">XP / Niveau</th>
              <th className="px-4 py-3">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-ck-border">
                <td className="px-4 py-3 font-medium">
                  {u.avatarEmoji} {u.name}
                </td>
                <td className="px-4 py-3">
                  <BadgePill tone={ROLE_TONES[u.role] ?? "neutral"}>{ROLE_LABELS[u.role] ?? u.role}</BadgePill>
                </td>
                <td className="px-4 py-3 text-ck-text-muted">{u.email ?? u.username}</td>
                <td className="px-4 py-3 text-ck-text-muted">{u.parent?.name ?? "—"}</td>
                <td className="px-4 py-3 text-ck-text-muted">
                  {u.role === "CHILD" ? `${formatXp(u.xp)} XP · Niv. ${u.level}` : "—"}
                </td>
                <td className="px-4 py-3 text-ck-text-muted">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
