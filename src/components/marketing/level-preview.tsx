import Link from "next/link";
import { LEVELS } from "@/data/site";
import { CardHoverable } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { Button } from "@/components/ui/button";

const toneGradient = {
  electric: "from-electric-500 to-electric-700",
  violet: "from-violet-500 to-violet-700",
  bubble: "from-bubble-500 to-bubble-500",
} as const;

export function LevelPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Choisis ton aventure</h2>
        <p className="mt-4 text-lg text-ck-text-muted">
          Trois niveaux progressifs, du premier <code>&lt;h1&gt;</code> aux interfaces professionnelles.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {LEVELS.map((level) => (
          <CardHoverable key={level.slug} className="relative flex flex-col p-8">
            {level.popular ? (
              <BadgePill tone="violet" className="absolute -top-3 left-1/2 -translate-x-1/2">
                Le plus populaire
              </BadgePill>
            ) : null}
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${toneGradient[level.color]} text-3xl text-white shadow-lg`}
            >
              {level.emoji}
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">{level.name}</h3>
            <p className="mt-2 flex-1 text-sm text-ck-text-muted">{level.tagline}</p>
            <p className="mt-4 font-display text-3xl font-bold">
              {level.price}€
            </p>
            <Button href={`/level/${level.slug}`} variant="secondary" className="mt-6 w-full">
              Découvrir
            </Button>
          </CardHoverable>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/pricing" className="font-semibold text-electric-500 hover:underline">
          Voir tous les détails des tarifs →
        </Link>
      </div>
    </section>
  );
}
