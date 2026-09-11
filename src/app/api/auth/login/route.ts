import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { createSessionCookie } from "@/lib/session";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Données invalides" },
      { status: 400 }
    );
  }

  const { identifier, password } = parsed.data;
  const isEmail = identifier.includes("@");

  const user = isEmail
    ? await db.user.findUnique({ where: { email: identifier.toLowerCase() } })
    : await db.user.findUnique({ where: { username: identifier.toLowerCase() } });

  if (!user) {
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  await createSessionCookie({
    sub: user.id,
    role: user.role as "PARENT" | "CHILD" | "ADMIN",
    name: user.name,
  });

  return NextResponse.json({ id: user.id, name: user.name, role: user.role });
}
