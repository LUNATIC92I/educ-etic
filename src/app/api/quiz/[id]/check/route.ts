import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  questionIndex: z.number().int().min(0),
  answer: z.number().int().min(0),
});

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "CHILD") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { id } = await params;
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });

  const question = await db.quizQuestion.findFirst({
    where: { quizId: id, order: parsed.data.questionIndex },
  });
  if (!question) return NextResponse.json({ error: "Question introuvable" }, { status: 404 });

  return NextResponse.json({
    correct: parsed.data.answer === question.correctIndex,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
  });
}
