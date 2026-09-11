import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReduceMotionToggle } from "@/components/profile/reduce-motion-toggle";
import { LogoutButton } from "@/components/dashboard/logout-button";
import { formatXp } from "@/lib/utils";

export const metadata: Metadata = { title: "Mon profil" };

const ROLE_LABELS: Record<string, string> = { PARENT: "Parent", CHILD: "Enfant", ADMIN: "Admin" };
const HOME_BY_ROLE: Record<string, string> = { PARENT: "/parent", CHILD: "/dashboard", ADMIN: "/admin" };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.sub } });
  if (!user) redirect("/login");

  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-12">
      <Link href={HOME_BY_ROLE[user.role] ?? "/"} className="mb-6 text-sm font-semibold text-electric-500 hover:underline">
        ← Retour
      </Link>

      <Card className="p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-100 to-violet-100 text-3xl dark:from-electric-500/20 dark:to-violet-500/20">
            {user.avatarEmoji}
          </span>
          <div>
            <h1 className="font-display text-xl font-bold">{user.name}</h1>
            <BadgePill tone="violet">{ROLE_LABELS[user.role] ?? user.role}</BadgePill>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between border-b border-ck-border py-2">
            <span className="text-ck-text-muted">Email / identifiant</span>
            <span className="font-medium">{user.email ?? user.username}</span>
          </div>
          {user.role === "CHILD" ? (
            <>
              <div className="flex justify-between border-b border-ck-border py-2">
                <span className="text-ck-text-muted">Niveau</span>
                <span className="font-medium">{user.level} ({formatXp(user.xp)} XP)</span>
              </div>
              <div className="flex justify-between border-b border-ck-border py-2">
                <span className="text-ck-text-muted">Série en cours</span>
                <span className="font-medium">🔥 {user.streakCount} jour{user.streakCount > 1 ? "s" : ""}</span>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-ck-border px-4 py-3">
            <div>
              <p className="font-semibold">Thème</p>
              <p className="text-xs text-ck-text-muted">Bascule entre le mode clair et le mode sombre.</p>
            </div>
            <ThemeToggle />
          </div>
          <ReduceMotionToggle initial={user.reduceMotion} />
        </div>

        <div className="mt-8">
          <LogoutButton className="w-full justify-center border border-ck-border" />
        </div>
      </Card>
    </div>
  );
}
