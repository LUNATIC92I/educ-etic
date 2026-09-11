import Link from "next/link";
import { CardHoverable } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";

const levelMeta: Record<string, { label: string; tone: "electric" | "violet" | "bubble" }> = {
  beginner: { label: "Débutant", tone: "electric" },
  intermediate: { label: "Intermédiaire", tone: "violet" },
  advanced: { label: "Avancé", tone: "bubble" },
};

export function CourseCard({
  slug,
  icon,
  title,
  description,
  level,
  xpReward,
}: {
  slug: string;
  icon: string;
  title: string;
  description: string;
  level: string;
  xpReward: number;
}) {
  const meta = levelMeta[level] ?? levelMeta.beginner;
  return (
    <Link href={`/learn/${slug}`}>
      <CardHoverable className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-100 to-violet-100 text-2xl dark:from-electric-500/20 dark:to-violet-500/20">
            {icon}
          </div>
          <BadgePill tone={meta.tone}>{meta.label}</BadgePill>
        </div>
        <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-ck-text-muted">{description}</p>
        <p className="mt-4 text-xs font-semibold text-sunny-500">⚡ +{xpReward} XP</p>
      </CardHoverable>
    </Link>
  );
}
