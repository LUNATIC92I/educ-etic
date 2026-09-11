import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { checkCompletionBadges } from "@/lib/gamification";

const bodySchema = z.object({
  title: z.string().min(1).max(80),
  html: z.string().max(20000),
  css: z.string().max(20000),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "CHILD") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const project = await db.project.create({
    data: { userId: session.sub, title: parsed.data.title, html: parsed.data.html, css: parsed.data.css },
  });

  const newBadges = await checkCompletionBadges(session.sub);

  return NextResponse.json({
    id: project.id,
    newBadges: newBadges.map((b) => ({ code: b.code, name: b.name, emoji: b.emoji })),
  });
}
