import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { generateCertificateNumber } from "@/lib/certificate";

const bodySchema = z.object({
  userId: z.string().min(1),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  courseName: z.string().min(2).max(120),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const existing = await db.certificate.findUnique({
    where: { userId_level: { userId: parsed.data.userId, level: parsed.data.level } },
  });
  if (existing) return NextResponse.json({ error: "Ce certificat existe déjà pour cet utilisateur." }, { status: 409 });

  const certificate = await db.certificate.create({
    data: {
      userId: parsed.data.userId,
      level: parsed.data.level,
      courseName: parsed.data.courseName,
      certificateNumber: generateCertificateNumber(parsed.data.level),
    },
  });

  return NextResponse.json(certificate);
}
