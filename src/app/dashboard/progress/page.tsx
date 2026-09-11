import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { BadgePill } from "@/components/ui/badge-pill";
import Link from "next/link";

export const metadata: Metadata = { title: "Ma progression" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "🚀 Débutant",
  intermediate: "⚡ Intermédiaire",
  advanced: "👑 Avancé",
};

export default async function ProgressPage() {
  const user = await requireChildUser();
  const enrollments = await db.enrollment.findMany({ where: { userId: user.id } });
  const enrolledLevels = enrollments.map((e) => e.level);

  const courses = await db.course.findMany({
    where: enrolledLevels.length ? { level: { in: enrolledLevels } } : { id: "__none__" },
    include: {
      lessons: { orderBy: { order: "asc" }, include: { progress: { where: { userId: user.id } } } },
      quizzes: { include: { attempts: { where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 1 } } },
    },
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });

  const grouped = enrolledLevels.map((level) => ({
    level,
    courses: courses.filter((c) => c.level === level),
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Ma progression</h1>
        <p className="mt-1 text-ck-text-muted">Le détail de chaque cours, leçon par leçon.</p>
      </div>

      {grouped.length === 0 ? (
        <Card className="p-8 text-center text-ck-text-muted">Aucun niveau débloqué pour le moment.</Card>
      ) : (
        grouped.map((group) => {
          const totalLessons = group.courses.reduce((s, c) => s + c.lessons.length, 0);
          const doneLessons = group.courses.reduce(
            (s, c) => s + c.lessons.filter((l) => l.progress.some((p) => p.completed)).length,
            0
          );
          return (
            <div key={group.level}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-xl font-bold">{LEVEL_LABELS[group.level]}</h2>
                <span className="text-sm text-ck-text-muted">
                  {doneLessons}/{totalLessons} leçons
                </span>
              </div>
              <ProgressBar value={doneLessons} max={Math.max(totalLessons, 1)} className="mb-4" />
              <div className="space-y-3">
                {group.courses.map((course) => {
                  const done = course.lessons.filter((l) => l.progress.some((p) => p.completed)).length;
                  const quiz = course.quizzes[0];
                  const attempt = quiz?.attempts[0];
                  return (
                    <Card key={course.id} className="flex items-center gap-4 p-4">
                      <span className="text-2xl">{course.icon}</span>
                      <div className="flex-1">
                        <Link href={`/learn/${course.slug}`} className="font-semibold hover:text-electric-500">
                          {course.title}
                        </Link>
                        <p className="text-xs text-ck-text-muted">
                          {done}/{course.lessons.length} leçon{course.lessons.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      {attempt ? (
                        <BadgePill tone={attempt.score === attempt.total ? "electric" : "neutral"}>
                          Quiz {attempt.score}/{attempt.total}
                        </BadgePill>
                      ) : quiz ? (
                        <Link href={`/quiz/${quiz.id}`}>
                          <BadgePill tone="sunny">Quiz à faire</BadgePill>
                        </Link>
                      ) : null}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
