import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { getSession } from "@/lib/session";
import { createChildSchema } from "@/lib/validators";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "PARENT") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const children = await db.user.findMany({
    where: { parentId: session.sub },
    select: { id: true, name: true, username: true, avatarEmoji: true, xp: true, level: true, streakCount: true, createdAt: true },
  });
  return NextResponse.json({ children });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "PARENT") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = createChildSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const { name, username, password, avatarEmoji } = parsed.data;

  const existing = await db.user.findUnique({ where: { username: username.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "Cet identifiant est déjà pris." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const child = await db.user.create({
    data: {
      name,
      username: username.toLowerCase(),
      passwordHash,
      role: "CHILD",
      avatarEmoji: avatarEmoji ?? "🧑‍🚀",
      parentId: session.sub,
    },
  });

  return NextResponse.json({
    id: child.id,
    name: child.name,
    username: child.username,
    avatarEmoji: child.avatarEmoji,
  });
}
