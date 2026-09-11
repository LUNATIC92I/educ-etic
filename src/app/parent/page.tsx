import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireParentUser } from "@/lib/require-user";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import { AddChildForm } from "@/components/parent/add-child-form";
import { formatDate, formatXp } from "@/lib/utils";

export const metadata: Metadata = { title: "Espace parent" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

const MINUTES_PER_LESSON = 8;
const MINUTES_PER_QUIZ = 4;

export default async function ParentPage({
  searchParams,
}: {
  searchParams: Promise<{ onboarding?: string }>;
}) {
  const user = await requireParentUser();
  const { onboarding } = await searchParams;

  const children = await db.user.findMany({ where: { parentId: user.id }, orderBy: { createdAt: "asc" } });

  const childDetails = await Promise.all(
    children.map(async (child) => {
      const enrollments = await db.enrollment.findMany({ where: { userId: child.id } });
      const levels = enrollments.map((e) => e.level);

      const courses = await db.course.findMany({
        where: levels.length ? { level: { in: levels } } : { id: "__none__" },
        include: { lessons: true, quizzes: true },
      });
      const totalLessons = courses.reduce((s, c) => s + c.lessons.length, 0);
      const doneLessons = await db.lessonProgress.count({ where: { userId: child.id, completed: true } });

      const quizAttempts = await db.quizAttempt.findMany({ where: { userId: child.id }, orderBy: { createdAt: "desc" } });
      const projectCount = await db.project.count({ where: { userId: child.id } });
      const badgeCount = await db.userBadge.count({ where: { userId: child.id } });
      const certificates = await db.certificate.findMany({ where: { userId: child.id } });

      const estimatedMinutes = doneLessons * MINUTES_PER_LESSON + quizAttempts.length * MINUTES_PER_QUIZ;

      return {
        child,
        levels,
        totalLessons,
        doneLessons,
        quizAttempts,
        projectCount,
        badgeCount,
        certificates,
        estimatedMinutes,
      };
    })
  );

  const payments = await db.payment.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Bonjour {user.name} 👋</h1>
          <p className="mt-1 text-ck-text-muted">Suis la progression de tes enfants et gère leurs accès.</p>
        </div>
        <Button href="/pricing" variant="secondary">Débloquer un niveau</Button>
      </div>

      {onboarding === "1" && children.length === 0 ? (
        <Card className="border-violet-400 bg-gradient-to-r from-electric-50 to-violet-50 p-6 dark:from-electric-500/10 dark:to-violet-500/10">
          <p className="font-display font-bold">Bienvenue sur CodeKids 🎉</p>
          <p className="mt-1 text-sm text-ck-text-muted">
            Crée le profil de ton enfant ci-dessous pour qu&apos;il puisse commencer son aventure.
          </p>
        </Card>
      ) : null}

      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Ajouter un enfant</h2>
        <div className="mt-4">
          <AddChildForm />
        </div>
      </Card>

      <div>
        <h2 className="mb-4 font-display text-xl font-bold">Mes enfants</h2>
        {childDetails.length === 0 ? (
          <Card className="p-8 text-center text-ck-text-muted">
            Aucun profil enfant pour le moment. Ajoute-en un ci-dessus pour commencer !
          </Card>
        ) : (
          <div className="space-y-4">
            {childDetails.map(({ child, levels, totalLessons, doneLessons, quizAttempts, projectCount, badgeCount, certificates, estimatedMinutes }) => (
              <Card key={child.id} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-100 to-violet-100 text-2xl dark:from-electric-500/20 dark:to-violet-500/20">
                      {child.avatarEmoji}
                    </span>
                    <div>
                      <p className="font-display font-bold">{child.name}</p>
                      <p className="text-xs text-ck-text-muted">
                        Niveau {child.level} · {formatXp(child.xp)} XP · 🔥 {child.streakCount} j.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {levels.length === 0 ? (
                      <BadgePill tone="neutral">Aucun niveau débloqué</BadgePill>
                    ) : (
                      levels.map((l) => (
                        <BadgePill key={l} tone="electric">
                          {LEVEL_LABELS[l] ?? l}
                        </BadgePill>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <ProgressBar
                    label={`Leçons terminées (${doneLessons}/${totalLessons})`}
                    value={doneLessons}
                    max={Math.max(totalLessons, 1)}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-ck-bg p-3 text-center">
                    <p className="font-display text-lg font-bold">{Math.round(estimatedMinutes / 60 * 10) / 10}h</p>
                    <p className="text-[11px] text-ck-text-muted">Temps de pratique (est.)</p>
                  </div>
                  <div className="rounded-xl bg-ck-bg p-3 text-center">
                    <p className="font-display text-lg font-bold">{quizAttempts.length}</p>
                    <p className="text-[11px] text-ck-text-muted">Quiz réalisés</p>
                  </div>
                  <div className="rounded-xl bg-ck-bg p-3 text-center">
                    <p className="font-display text-lg font-bold">{projectCount}</p>
                    <p className="text-[11px] text-ck-text-muted">Projets créés</p>
                  </div>
                  <div className="rounded-xl bg-ck-bg p-3 text-center">
                    <p className="font-display text-lg font-bold">{badgeCount}</p>
                    <p className="text-[11px] text-ck-text-muted">Badges obtenus</p>
                  </div>
                </div>

                <details className="mt-5 rounded-xl border border-ck-border p-4">
                  <summary className="cursor-pointer font-semibold text-sm text-electric-500">
                    Voir le détail des quiz et certificats
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase text-ck-text-muted">Scores aux quiz</p>
                      {quizAttempts.length === 0 ? (
                        <p className="mt-1 text-sm text-ck-text-muted">Aucun quiz réalisé pour le moment.</p>
                      ) : (
                        <ul className="mt-2 space-y-1 text-sm">
                          {quizAttempts.slice(0, 8).map((a) => (
                            <li key={a.id} className="flex justify-between">
                              <span className="text-ck-text-muted">{formatDate(a.createdAt)}</span>
                              <span className="font-semibold">{a.score}/{a.total}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-ck-text-muted">Certificats</p>
                      {certificates.length === 0 ? (
                        <p className="mt-1 text-sm text-ck-text-muted">Aucun certificat obtenu pour le moment.</p>
                      ) : (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {certificates.map((c) => (
                            <BadgePill key={c.id} tone="sunny">
                              🎓 {LEVEL_LABELS[c.level] ?? c.level}
                            </BadgePill>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </details>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-4 font-display text-xl font-bold">Historique des paiements</h2>
        {payments.length === 0 ? (
          <Card className="p-6 text-center text-sm text-ck-text-muted">Aucun paiement pour le moment.</Card>
        ) : (
          <Card className="overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-ck-bg text-left text-xs uppercase text-ck-text-muted">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Niveau</th>
                  <th className="px-4 py-3">Montant</th>
                  <th className="px-4 py-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-t border-ck-border">
                    <td className="px-4 py-3">{formatDate(p.createdAt)}</td>
                    <td className="px-4 py-3">{LEVEL_LABELS[p.level] ?? p.level}</td>
                    <td className="px-4 py-3">{(p.amount / 100).toFixed(2)}€</td>
                    <td className="px-4 py-3">
                      <BadgePill tone={p.status === "completed" ? "electric" : "neutral"}>{p.status}</BadgePill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>

      <Card className="p-6 text-center">
        <p className="text-sm text-ck-text-muted">
          Besoin d&apos;aide ? Consulte notre <Link href="/help" className="font-semibold text-electric-500 hover:underline">centre d&apos;aide</Link>.
        </p>
      </Card>
    </div>
  );
}
