import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { SimpleBarChart } from "@/components/admin/simple-bar-chart";

export const metadata: Metadata = { title: "Tableau de bord admin" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

function StatCard({ label, value, emoji }: { label: string; value: string | number; emoji: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <p className="font-display text-2xl font-bold">{value}</p>
          <p className="text-xs text-ck-text-muted">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const [
    totalParents,
    totalChildren,
    totalCourses,
    totalLessons,
    totalQuizzes,
    completedLessons,
    quizAttempts,
    certificates,
    payments,
    projects,
  ] = await Promise.all([
    db.user.count({ where: { role: "PARENT" } }),
    db.user.count({ where: { role: "CHILD" } }),
    db.course.count(),
    db.lesson.count(),
    db.quiz.count(),
    db.lessonProgress.count({ where: { completed: true } }),
    db.quizAttempt.count(),
    db.certificate.count(),
    db.payment.findMany({ where: { status: "completed" } }),
    db.project.count(),
  ]);

  const revenueByLevel = ["beginner", "intermediate", "advanced"].map((level) => ({
    label: LEVEL_LABELS[level],
    value: payments.filter((p) => p.level === level).reduce((s, p) => s + p.amount, 0) / 100,
  }));

  const enrollmentsByLevel = await db.enrollment.groupBy({ by: ["level"], _count: { _all: true } });
  const enrollmentData = ["beginner", "intermediate", "advanced"].map((level) => ({
    label: LEVEL_LABELS[level],
    value: enrollmentsByLevel.find((e) => e.level === level)?._count._all ?? 0,
  }));

  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0) / 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Tableau de bord</h1>
        <p className="mt-1 text-ck-text-muted">Vue d&apos;ensemble de la plateforme CodeKids.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard emoji="👨‍👩‍👧" label="Comptes parents" value={totalParents} />
        <StatCard emoji="🧑‍🚀" label="Comptes enfants" value={totalChildren} />
        <StatCard emoji="💶" label="Revenu total" value={`${totalRevenue.toFixed(2)}€`} />
        <StatCard emoji="🎓" label="Certificats délivrés" value={certificates} />
        <StatCard emoji="📚" label="Cours publiés" value={totalCourses} />
        <StatCard emoji="📝" label="Leçons" value={totalLessons} />
        <StatCard emoji="🧠" label="Quiz" value={totalQuizzes} />
        <StatCard emoji="🗂️" label="Projets créés" value={projects} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-lg font-bold">Revenu par niveau</h2>
          <div className="mt-4">
            <SimpleBarChart data={revenueByLevel} valueFormatter={(v) => `${v.toFixed(2)}€`} />
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-lg font-bold">Inscriptions par niveau</h2>
          <div className="mt-4">
            <SimpleBarChart data={enrollmentData} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Activité pédagogique</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard emoji="✅" label="Leçons terminées (total)" value={completedLessons} />
          <StatCard emoji="🧾" label="Quiz réalisés (total)" value={quizAttempts} />
          <StatCard emoji="📈" label="Taux de complétion moyen" value={totalLessons > 0 ? `${Math.round((completedLessons / (totalLessons * Math.max(totalChildren, 1))) * 100)}%` : "—"} />
        </div>
      </Card>
    </div>
  );
}
