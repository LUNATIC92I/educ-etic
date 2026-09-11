import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { parseValidationRule, validateExercise } from "@/lib/exercise-validation";
import { awardXp, checkCompletionBadges, checkAndIssueCertificate } from "@/lib/gamification";

const bodySchema = z.object({
  html: z.string().max(20000),
  css: z.string().max(20000),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "CHILD") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const lesson = await db.lesson.findUnique({ where: { id }, include: { course: true } });
  if (!lesson) return NextResponse.json({ error: "Leçon introuvable" }, { status: 404 });

  const enrollment = await db.enrollment.findUnique({
    where: { userId_level: { userId: session.sub, level: lesson.course.level } },
  });
  if (!enrollment) return NextResponse.json({ error: "Niveau non débloqué" }, { status: 403 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const rule = parseValidationRule(lesson.validationRule);
  const success = validateExercise(parsed.data.html, parsed.data.css, rule);

  if (!success) {
    return NextResponse.json({ success: false, hint: lesson.hint });
  }

  const existing = await db.lessonProgress.findUnique({
    where: { userId_lessonId: { userId: session.sub, lessonId: lesson.id } },
  });
  const alreadyCompleted = existing?.completed ?? false;

  await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.sub, lessonId: lesson.id } },
    update: { completed: true, completedAt: new Date(), savedHtml: parsed.data.html, savedCss: parsed.data.css },
    create: {
      userId: session.sub,
      lessonId: lesson.id,
      completed: true,
      completedAt: new Date(),
      savedHtml: parsed.data.html,
      savedCss: parsed.data.css,
    },
  });

  if (alreadyCompleted) {
    return NextResponse.json({ success: true, alreadyCompleted: true, xpGained: 0, leveledUp: false, newBadges: [] });
  }

  const { leveledUp, xpGained } = await awardXp(session.sub, lesson.xpReward);
  const newBadges = await checkCompletionBadges(session.sub);
  await checkAndIssueCertificate(session.sub, lesson.course.level);

  return NextResponse.json({
    success: true,
    alreadyCompleted: false,
    xpGained,
    leveledUp,
    newBadges: newBadges.map((b) => ({ code: b.code, name: b.name, emoji: b.emoji })),
  });
}
