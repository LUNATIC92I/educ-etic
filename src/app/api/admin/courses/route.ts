import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, "lettres minuscules, chiffres et - uniquement"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  title: z.string().min(2).max(120),
  description: z.string().min(2).max(300),
  objective: z.string().min(2).max(300),
  icon: z.string().min(1).max(8),
  order: z.number().int().min(0).max(999),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Données invalides" }, { status: 400 });
  }

  const existing = await db.course.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return NextResponse.json({ error: "Ce slug existe déjà." }, { status: 409 });

  const course = await db.course.create({
    data: {
      ...parsed.data,
      lessons: {
        create: {
          slug: parsed.data.slug,
          title: parsed.data.title,
          order: 1,
          summary: "À compléter.",
          content: "À compléter : ajoute le contenu pédagogique de cette leçon.",
          missionPrompt: "À compléter : décris la mission.",
          hint: "À compléter.",
          validationRule: JSON.stringify({ type: "none" }),
          xpReward: 50,
        },
      },
      quizzes: { create: { title: `Quiz : ${parsed.data.title}`, xpReward: 100 } },
    },
  });

  return NextResponse.json(course);
}
