import type { Metadata } from "next";
import { db } from "@/lib/db";
import { LEVELS } from "@/data/site";
import { CardHoverable } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";
import { Roadmap } from "@/components/marketing/roadmap";

export const metadata: Metadata = {
  title: "Les 3 niveaux",
  description: "Débutant, Intermédiaire, Avancé : le parcours complet pour apprendre HTML & CSS, niveau par niveau.",
};

export default async function LevelsPage() {
  const counts = await db.course.groupBy({
    by: ["level"],
    _count: { _all: true },
  });
  const countByLevel = Object.fromEntries(counts.map((c) => [c.level, c._count._all]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold">Les 3 niveaux CodeKids</h1>
        <p className="mt-4 text-lg text-ck-text-muted">
          Un parcours progressif conçu pour t&apos;emmener du tout premier code à la création d&apos;interfaces professionnelles.
        </p>
      </div>

      <div className="mt-14 space-y-8">
        {LEVELS.map((level, i) => (
          <CardHoverable key={level.slug} className="flex flex-col gap-6 p-8 md:flex-row md:items-center">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-electric-500 via-violet-500 to-bubble-500 text-4xl text-white shadow-lg">
              {level.emoji}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl font-bold">Niveau {i + 1} — {level.name}</h2>
                {level.popular ? <BadgePill tone="violet">Populaire</BadgePill> : null}
              </div>
              <p className="mt-2 text-ck-text-muted">{level.tagline}</p>
              <p className="mt-1 text-sm text-ck-text-muted">{countByLevel[level.key] ?? 0} cours inclus</p>
            </div>
            <div className="flex flex-col items-center gap-3 md:items-end">
              <p className="font-display text-3xl font-bold">{level.price}€</p>
              <Button href={`/level/${level.slug}`}>Voir le programme</Button>
            </div>
          </CardHoverable>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="font-display text-3xl font-bold">Ta feuille de route</h2>
        <div className="mt-10 flex justify-center">
          <Roadmap activeIndex={0} />
        </div>
      </div>
    </div>
  );
}
