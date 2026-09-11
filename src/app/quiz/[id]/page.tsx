import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizPlayer } from "@/components/quiz/quiz-player";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quiz = await db.quiz.findUnique({ where: { id } });
  return { title: quiz?.title ?? "Quiz" };
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireChildUser();
  const { id } = await params;

  const quiz = await db.quiz.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: "asc" } }, course: true },
  });
  if (!quiz) notFound();

  const enrollment = await db.enrollment.findUnique({
    where: { userId_level: { userId: user.id, level: quiz.course.level } },
  });
  if (!enrollment) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="p-10 text-center">
          <p className="text-5xl">🔒</p>
          <h1 className="mt-4 font-display text-2xl font-bold">{quiz.title}</h1>
          <p className="mt-2 text-ck-text-muted">Ce quiz fait partie d&apos;un niveau qui n&apos;est pas encore débloqué.</p>
          <Button href="/parent" className="mt-6">Demander à mes parents de débloquer</Button>
        </Card>
      </div>
    );
  }

  const questions = quiz.questions.map((q) => ({
    id: q.id,
    question: q.question,
    choices: JSON.parse(q.choicesJson) as string[],
  }));

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm font-semibold text-violet-500">{quiz.course.title}</p>
      <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{quiz.title}</h1>
      <p className="mt-1 text-sm text-ck-text-muted">⚡ +{quiz.xpReward} XP à la clé</p>

      <div className="mt-6">
        <QuizPlayer quizId={quiz.id} questions={questions} nextHref="/dashboard" />
      </div>
    </div>
  );
}
