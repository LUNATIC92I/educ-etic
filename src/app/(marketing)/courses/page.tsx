import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { CourseCard } from "@/components/marketing/course-card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tous les cours",
  description: "30 cours de HTML & CSS pour enfants, du débutant à l'avancé, avec missions, quiz et XP.",
};

const TABS = [
  { key: "all", label: "Tous les cours" },
  { key: "beginner", label: "🚀 Débutant" },
  { key: "intermediate", label: "⚡ Intermédiaire" },
  { key: "advanced", label: "👑 Avancé" },
];

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const { level } = await searchParams;
  const activeLevel = level && ["beginner", "intermediate", "advanced"].includes(level) ? level : "all";

  const courses = await db.course.findMany({
    where: activeLevel === "all" ? { published: true } : { published: true, level: activeLevel },
    include: { lessons: true },
    orderBy: [{ level: "asc" }, { order: "asc" }],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold">Tous les cours</h1>
        <p className="mt-4 text-lg text-ck-text-muted">
          30 missions pour apprendre HTML &amp; CSS, du tout premier <code>&lt;h1&gt;</code> aux interfaces professionnelles.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key === "all" ? "/courses" : `/courses?level=${tab.key}`}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
              activeLevel === tab.key
                ? "bg-gradient-to-r from-electric-500 to-violet-500 text-white shadow-md"
                : "bg-ck-bg-elevated text-ck-text-muted border border-ck-border hover:border-electric-400"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            slug={course.slug}
            icon={course.icon}
            title={course.title}
            description={course.description}
            level={course.level}
            xpReward={course.lessons.reduce((sum, l) => sum + l.xpReward, 0)}
          />
        ))}
      </div>
    </div>
  );
}
