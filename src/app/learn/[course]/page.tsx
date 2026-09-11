import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LessonContent } from "@/components/lesson/lesson-content";
import { CodeExample } from "@/components/lesson/code-example";
import { LessonWorkspace } from "@/components/lesson/lesson-workspace";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "🚀 Débutant",
  intermediate: "⚡ Intermédiaire",
  advanced: "👑 Avancé",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course: slug } = await params;
  const course = await db.course.findUnique({ where: { slug } });
  return { title: course?.title ?? "Cours" };
}

export default async function LearnCoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const user = await requireChildUser();
  const { course: slug } = await params;

  const course = await db.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { order: "asc" } }, quizzes: true },
  });
  if (!course) notFound();

  const lesson = course.lessons[0];
  if (!lesson) notFound();

  const enrollment = await db.enrollment.findUnique({
    where: { userId_level: { userId: user.id, level: course.level } },
  });

  if (!enrollment) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="p-10 text-center">
          <p className="text-5xl">🔒</p>
          <h1 className="mt-4 font-display text-2xl font-bold">{course.title}</h1>
          <p className="mt-2 text-ck-text-muted">
            Ce cours fait partie du niveau {LEVEL_LABELS[course.level]}, qui n&apos;est pas encore débloqué.
          </p>
          <Button href="/parent" className="mt-6">
            Demander à mes parents de débloquer
          </Button>
        </Card>
      </div>
    );
  }

  const progress = await db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: user.id, lessonId: lesson.id } },
  });

  const quiz = course.quizzes[0];
  const nextHref = quiz ? `/quiz/${quiz.id}` : "/dashboard";
  const nextLabel = quiz ? "Passer au quiz" : "Retour au tableau de bord";

  const starterHtml = progress?.savedHtml || lesson.starterHtml;
  const starterCss = progress?.savedCss || lesson.starterCss;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center gap-2">
        <BadgePill tone="electric">{LEVEL_LABELS[course.level]}</BadgePill>
        <BadgePill tone="sunny">⚡ +{lesson.xpReward} XP</BadgePill>
        {progress?.completed ? <BadgePill tone="violet">✓ Terminé</BadgePill> : null}
      </div>
      <h1 className="mt-3 font-display text-3xl font-bold">
        {course.icon} {lesson.title}
      </h1>
      <p className="mt-2 text-ck-text-muted">{lesson.summary}</p>

      <div className="mt-6">
        <LessonContent content={lesson.content} />
      </div>

      {lesson.codeExampleHtml || lesson.codeExampleCss ? (
        <div className="mt-6">
          <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-ck-text-muted">
            Exemple
          </h2>
          <CodeExample html={lesson.codeExampleHtml} css={lesson.codeExampleCss} />
        </div>
      ) : null}

      {lesson.hasEditor ? (
        <div className="mt-8">
          <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-ck-text-muted">
            À toi de jouer
          </h2>
          <LessonWorkspace
            lessonId={lesson.id}
            starterHtml={starterHtml}
            starterCss={starterCss}
            missionPrompt={lesson.missionPrompt}
            hint={lesson.hint}
            alreadyCompleted={progress?.completed ?? false}
            nextHref={nextHref}
            nextLabel={nextLabel}
          />
        </div>
      ) : null}
    </div>
  );
}
