import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgePill } from "@/components/ui/badge-pill";

export const metadata: Metadata = { title: "Cours & quiz" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export default async function AdminCoursesPage() {
  const courses = await db.course.findMany({
    include: { lessons: true, quizzes: { include: { questions: true } } },
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Cours &amp; quiz</h1>
          <p className="mt-1 text-ck-text-muted">{courses.length} cours au total.</p>
        </div>
        <Button href="/admin/courses/new">+ Nouveau cours</Button>
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ck-bg text-left text-xs uppercase text-ck-text-muted">
            <tr>
              <th className="px-4 py-3">Cours</th>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Leçons</th>
              <th className="px-4 py-3">Questions</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id} className="border-t border-ck-border">
                <td className="px-4 py-3 font-medium">{c.icon} {c.title}</td>
                <td className="px-4 py-3 text-ck-text-muted">{LEVEL_LABELS[c.level] ?? c.level}</td>
                <td className="px-4 py-3 text-ck-text-muted">{c.lessons.length}</td>
                <td className="px-4 py-3 text-ck-text-muted">{c.quizzes.reduce((s, q) => s + q.questions.length, 0)}</td>
                <td className="px-4 py-3">
                  <BadgePill tone={c.published ? "electric" : "neutral"}>{c.published ? "Publié" : "Brouillon"}</BadgePill>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/courses/${c.id}`} className="font-semibold text-electric-500 hover:underline">
                    Modifier →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
