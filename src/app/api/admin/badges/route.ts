import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  code: z.string().min(2).max(40).regex(/^[a-z0-9-]+$/, "lettres minuscules, chiffres et - uniquement"),
  name: z.string().min(2).max(60),
  emoji: z.string().min(1).max(8),
  description: z.string().min(2).max(200),
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

  const existing = await db.badge.findUnique({ where: { code: parsed.data.code } });
  if (existing) return NextResponse.json({ error: "Ce code de badge existe déjà." }, { status: 409 });

  const badge = await db.badge.create({ data: parsed.data });
  return NextResponse.json(badge);
}
