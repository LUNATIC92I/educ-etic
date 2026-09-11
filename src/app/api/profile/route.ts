import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  reduceMotion: z.boolean().optional(),
  avatarEmoji: z.string().min(1).max(8).optional(),
});

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });

  const user = await db.user.update({ where: { id: session.sub }, data: parsed.data });
  return NextResponse.json({ id: user.id, reduceMotion: user.reduceMotion, avatarEmoji: user.avatarEmoji });
}
