import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const questionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(2),
  choices: z.array(z.string().min(1)).length(4),
  correctIndex: z.number().int().min(0).max(3),
  explanation: z.string().min(0),
});

const bodySchema = z.object({
  course: z.object({
    title: z.string().min(2).max(120),
    description: z.string().min(2).max(300),
    objective: z.string().min(2).max(300),
    icon: z.string().min(1).max(8),
    order: z.number().int().min(0).max(999),
    published: z.boolean(),
  }),
  lesson: z.object({
    title: z.string().min(2).max(120),
    summary: z.string().min(2).max(300),
    content: z.string().min(2),
    codeExampleHtml: z.string(),
    codeExampleCss: z.string(),
    missionPrompt: z.string(),
    starterHtml: z.string(),
    starterCss: z.string(),
    hint: z.string(),
    xpReward: z.number().int().min(0).max(1000),
    validationRule: z.string(),
  }),
  quiz: z.object({
    title: z.string().min(2).max(120),
    xpReward: z.number().int().min(0).max(1000),
  }),
  questions: z.array(questionSchema),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const course = await db.course.findUnique({
    where: { id },
    include: { lessons: true, quizzes: { include: { questions: true } } },
  });
  if (!course) return NextResponse.json({ error: "Cours introuvable" }, { status: 404 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides" }, { status: 400 });
  }

  const { course: courseData, lesson: lessonData, quiz: quizData, questions } = parsed.data;

  try {
    JSON.parse(lessonData.validationRule);
  } catch {
    return NextResponse.json({ error: "La règle de validation doit être un JSON valide." }, { status: 400 });
  }

  await db.course.update({ where: { id }, data: courseData });

  const lesson = course.lessons[0];
  if (lesson) {
    await db.lesson.update({ where: { id: lesson.id }, data: lessonData });
  }

  const quiz = course.quizzes[0];
  if (quiz) {
    await db.quiz.update({ where: { id: quiz.id }, data: quizData });

    const keptIds = new Set(questions.filter((q) => q.id).map((q) => q.id));
    const toDelete = quiz.questions.filter((q) => !keptIds.has(q.id));
    if (toDelete.length) {
      await db.quizQuestion.deleteMany({ where: { id: { in: toDelete.map((q) => q.id) } } });
    }

    for (const [i, q] of questions.entries()) {
      const data = {
        order: i,
        question: q.question,
        choicesJson: JSON.stringify(q.choices),
        correctIndex: q.correctIndex,
        explanation: q.explanation,
      };
      if (q.id) {
        await db.quizQuestion.update({ where: { id: q.id }, data });
      } else {
        await db.quizQuestion.create({ data: { ...data, quizId: quiz.id } });
      }
    }
  }

  return NextResponse.json({ ok: true });
}
