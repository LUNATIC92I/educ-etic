import "server-only";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function requireChildUser() {
  const session = await getSession();
  if (!session || session.role !== "CHILD") redirect("/login");
  const user = await db.user.findUnique({ where: { id: session.sub } });
  if (!user) redirect("/login");
  return user;
}

export async function requireParentUser() {
  const session = await getSession();
  if (!session || session.role !== "PARENT") redirect("/login");
  const user = await db.user.findUnique({ where: { id: session.sub } });
  if (!user) redirect("/login");
  return user;
}

export async function requireAdminUser() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") redirect("/login");
  const user = await db.user.findUnique({ where: { id: session.sub } });
  if (!user) redirect("/login");
  return user;
}
