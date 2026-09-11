import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  title: z.string().min(1).max(80),
  html: z.string().max(20000),
  css: z.string().max(20000),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project || project.userId !== session.sub) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== "CHILD") {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project || project.userId !== session.sub) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  await db.project.update({
    where: { id },
    data: { title: parsed.data.title, html: parsed.data.html, css: parsed.data.css },
  });

  return NextResponse.json({ ok: true });
}
