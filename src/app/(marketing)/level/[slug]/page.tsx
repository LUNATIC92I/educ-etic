import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { LEVELS } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";

export async function generateStaticParams() {
  return LEVELS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const level = LEVELS.find((l) => l.slug === slug);
  return { title: level ? `Niveau ${level.name}` : "Niveau" };
}

export default async function LevelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const level = LEVELS.find((l) => l.slug === slug);
  if (!level) notFound();

  const [courses, session] = await Promise.all([
    db.course.findMany({
      where: { level: level.key, published: true },
      include: { lessons: true, quizzes: true },
      orderBy: { order: "asc" },
    }),
    getSession(),
  ]);

  let isEnrolled = false;
  if (session?.role === "CHILD") {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_level: { userId: session.sub, level: level.key } },
    });
    isEnrolled = !!enrollment;
  }

  const totalXp = courses.reduce(
    (sum, c) => sum + c.lessons.reduce((s, l) => s + l.xpReward, 0) + c.quizzes.reduce((s, q) => s + q.xpReward, 0),
    0
  );

  let cta = <Button href="/register" size="lg">Commencer l&apos;aventure</Button>;
  if (session?.role === "CHILD") {
    cta = isEnrolled ? (
      <Button href="/dashboard" size="lg">Continuer mon parcours</Button>
    ) : (
      <Button href="/parent" size="lg">Demander à un parent de débloquer</Button>
    );
  } else if (session?.role === "PARENT") {
    cta = (
      <Button href={`/payment?level=${level.key}`} size="lg">
        Débloquer pour {level.price}€
      </Button>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-b from-nightsky-500 to-[#140f36] py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl backdrop-blur">
            {level.emoji}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold">{level.name}</h1>
          <p className="mt-3 text-lg text-white/80">{level.tagline}</p>
          <p className="mt-6 font-display text-3xl font-bold">{level.price}€</p>
          <div className="mt-6 flex justify-center gap-3">{cta}</div>
          <p className="mt-4 text-sm text-white/60">
            {courses.length} cours · ⚡ {totalXp} XP à gagner
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold">Programme du niveau</h2>
        <div className="mt-6 space-y-3">
          {courses.map((course, i) => (
            <Card key={course.id} className="flex items-center gap-4 p-5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-electric-50 font-display font-bold text-electric-600 dark:bg-electric-500/15 dark:text-electric-300">
                {i + 1}
              </span>
              <span className="text-2xl">{course.icon}</span>
              <div className="flex-1">
                <p className="font-semibold">{course.title}</p>
                <p className="text-sm text-ck-text-muted">{course.description}</p>
              </div>
              <BadgePill tone="sunny">
                +{course.lessons.reduce((s, l) => s + l.xpReward, 0) + course.quizzes.reduce((s, q) => s + q.xpReward, 0)} XP
              </BadgePill>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">{cta}</div>
      </div>
    </div>
  );
}
