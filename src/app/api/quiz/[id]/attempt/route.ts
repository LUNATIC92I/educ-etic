import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { awardXp, checkCompletionBadges, checkAndIssueCertificate } from "@/lib/gamification";

const bodySchema = z.object({
  answers: z.array(z.number().int().min(0)),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "CHILD") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const quiz = await db.quiz.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: "asc" } }, course: true },
  });
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });

  const enrollment = await db.enrollment.findUnique({
    where: { userId_level: { userId: session.sub, level: quiz.course.level } },
  });
  if (!enrollment) return NextResponse.json({ error: "Niveau non débloqué" }, { status: 403 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.answers.length !== quiz.questions.length) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const results = quiz.questions.map((q, i) => ({
    correct: parsed.data.answers[i] === q.correctIndex,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }));
  const score = results.filter((r) => r.correct).length;
  const total = quiz.questions.length;

  const previousAttemptsCount = await db.quizAttempt.count({ where: { userId: session.sub, quizId: quiz.id } });

  await db.quizAttempt.create({
    data: {
      userId: session.sub,
      quizId: quiz.id,
      score,
      total,
      answersJson: JSON.stringify(parsed.data.answers),
    },
  });

  let xpGained = 0;
  let leveledUp = false;
  if (previousAttemptsCount === 0) {
    const result = await awardXp(session.sub, quiz.xpReward);
    xpGained = result.xpGained;
    leveledUp = result.leveledUp;
  }

  const newBadges = await checkCompletionBadges(session.sub);
  await checkAndIssueCertificate(session.sub, quiz.course.level);

  return NextResponse.json({ score, total, results, xpGained, leveledUp, newBadges: newBadges.map((b) => ({ code: b.code, name: b.name, emoji: b.emoji })) });
}
