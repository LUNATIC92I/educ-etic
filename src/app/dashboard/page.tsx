import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { Card, CardHoverable } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Roadmap } from "@/components/marketing/roadmap";

export const metadata: Metadata = { title: "Mon tableau de bord" };

function isCssCourse(title: string) {
  return title.toLowerCase().includes("css");
}

export default async function DashboardPage() {
  const user = await requireChildUser();

  const enrollments = await db.enrollment.findMany({ where: { userId: user.id } });
  const enrolledLevels = enrollments.map((e) => e.level);

  const courses = await db.course.findMany({
    where: enrolledLevels.length ? { level: { in: enrolledLevels } } : { id: "__none__" },
    include: { lessons: { orderBy: { order: "asc" } }, quizzes: true },
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });

  const completedLessonIds = new Set(
    (await db.lessonProgress.findMany({ where: { userId: user.id, completed: true }, select: { lessonId: true } })).map(
      (p) => p.lessonId
    )
  );

  let htmlTotal = 0;
  let htmlDone = 0;
  let cssTotal = 0;
  let cssDone = 0;
  let nextLesson: { courseSlug: string; lessonSlug: string; courseTitle: string; lessonTitle: string } | null = null;

  for (const course of courses) {
    const bucketIsCss = isCssCourse(course.title);
    for (const lesson of course.lessons) {
      const done = completedLessonIds.has(lesson.id);
      if (bucketIsCss) {
        cssTotal += 1;
        if (done) cssDone += 1;
      } else {
        htmlTotal += 1;
        if (done) htmlDone += 1;
      }
      if (!done && !nextLesson) {
        nextLesson = {
          courseSlug: course.slug,
          lessonSlug: lesson.slug,
          courseTitle: course.title,
          lessonTitle: lesson.title,
        };
      }
    }
  }

  const projectCount = await db.project.count({ where: { userId: user.id } });
  const quizAttemptCount = await db.quizAttempt.count({ where: { userId: user.id } });
  const earnedBadges = await db.userBadge.findMany({
    where: { userId: user.id },
    include: { badge: true },
    orderBy: { earnedAt: "desc" },
    take: 4,
  });

  const nextXpGoal = (Math.floor(user.xp / 500) + 1) * 500;

  const totalLessons = htmlTotal + cssTotal;
  const totalDone = htmlDone + cssDone;
  const overallPct = totalLessons > 0 ? totalDone / totalLessons : 0;

  let roadmapIndex = 0;
  if (enrolledLevels.includes("advanced") && totalLessons > 0 && overallPct >= 0.95) roadmapIndex = 6;
  else if (enrolledLevels.includes("advanced")) roadmapIndex = 5;
  else if (enrolledLevels.includes("intermediate") && overallPct >= 0.5) roadmapIndex = 4;
  else if (enrolledLevels.includes("intermediate")) roadmapIndex = 3;
  else if (enrolledLevels.includes("beginner") && overallPct >= 0.5) roadmapIndex = 2;
  else if (enrolledLevels.includes("beginner")) roadmapIndex = 1;

  const missions = [
    { label: "Terminer un chapitre HTML", done: htmlTotal > 0 && htmlDone === htmlTotal },
    { label: "Créer un premier projet", done: projectCount >= 1 },
    { label: "Réussir un quiz", done: quizAttemptCount >= 1 },
    { label: `Atteindre ${nextXpGoal} XP`, done: false },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Bonjour {user.name} 👋</h1>
        <p className="mt-1 text-ck-text-muted">Prêt à continuer ton aventure ?</p>
      </div>

      {enrolledLevels.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-4xl">🔒</p>
          <h2 className="mt-3 font-display text-xl font-bold">Aucun niveau débloqué pour le moment</h2>
          <p className="mt-2 text-ck-text-muted">Demande à tes parents de débloquer un niveau pour commencer !</p>
          <Button href="/parent" className="mt-5">Voir l&apos;espace parent</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <h2 className="font-display text-lg font-bold">Ma progression</h2>
            <div className="mt-4 space-y-4">
              <ProgressBar label={`HTML (${htmlDone}/${htmlTotal})`} value={htmlDone} max={Math.max(htmlTotal, 1)} />
              <ProgressBar label={`CSS (${cssDone}/${cssTotal})`} value={cssDone} max={Math.max(cssTotal, 1)} />
            </div>

            {nextLesson ? (
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-electric-50 to-violet-50 p-5 dark:from-electric-500/10 dark:to-violet-500/10">
                <p className="text-xs font-bold uppercase tracking-wide text-violet-500">Prochaine leçon</p>
                <p className="mt-1 font-display font-bold">{nextLesson.lessonTitle}</p>
                <p className="text-sm text-ck-text-muted">{nextLesson.courseTitle}</p>
                <Button href={`/learn/${nextLesson.courseSlug}`} className="mt-4">
                  Continuer mon parcours →
                </Button>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center dark:bg-emerald-500/10">
                <p className="font-display font-bold text-emerald-600 dark:text-emerald-300">
                  🎉 Tu as terminé toutes tes leçons débloquées !
                </p>
                <Button href="/pricing" variant="secondary" className="mt-4">
                  Débloquer un nouveau niveau
                </Button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-bold">Mes missions</h2>
            <ul className="mt-4 space-y-3">
              {missions.map((m) => (
                <li key={m.label} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs ${
                      m.done ? "bg-emerald-500 text-white" : "border-2 border-ck-border text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className={m.done ? "text-ck-text-muted line-through" : ""}>{m.label}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Mes badges récents</h2>
            <Link href="/dashboard/badges" className="text-sm font-semibold text-electric-500 hover:underline">
              Voir tout →
            </Link>
          </div>
          {earnedBadges.length === 0 ? (
            <p className="mt-4 text-sm text-ck-text-muted">
              Termine ta première leçon pour débloquer ton premier badge 🏆
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {earnedBadges.map((ub) => (
                <div key={ub.id} className="rounded-2xl border border-ck-border p-4 text-center">
                  <div className="text-3xl">{ub.badge.emoji}</div>
                  <p className="mt-1 text-xs font-semibold">{ub.badge.name}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <CardHoverable className="flex flex-col items-center justify-center p-6 text-center">
          <p className="font-display text-sm font-bold text-ck-text-muted">Ma feuille de route</p>
          <div className="mt-4 scale-90">
            <Roadmap activeIndex={roadmapIndex} />
          </div>
        </CardHoverable>
      </div>
    </div>
  );
}
