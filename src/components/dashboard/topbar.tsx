import { computeLevel } from "@/lib/xp";
import { formatXp } from "@/lib/utils";

export function Topbar({
  name,
  avatarEmoji,
  xp,
  streakCount,
}: {
  name: string;
  avatarEmoji: string;
  xp: number;
  streakCount: number;
}) {
  const { level, xpIntoLevel, xpForNextLevel } = computeLevel(xp);
  const pct = Math.round((xpIntoLevel / xpForNextLevel) * 100);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ck-border bg-ck-bg-elevated px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-100 to-violet-100 text-2xl dark:from-electric-500/20 dark:to-violet-500/20">
          {avatarEmoji}
        </span>
        <div>
          <p className="font-display font-bold leading-tight">{name}</p>
          <p className="text-xs text-ck-text-muted">Niveau {level} · {formatXp(xp)} XP</p>
        </div>
      </div>

      <div className="hidden min-w-[160px] max-w-xs flex-1 sm:block">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-ck-border/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric-500 to-violet-500 transition-[width] duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-1 text-[11px] text-ck-text-muted">
          {xpIntoLevel} / {xpForNextLevel} XP jusqu&apos;au niveau {level + 1}
        </p>
      </div>

      <div className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-500 px-3 py-1.5 text-sm font-bold text-white shadow-md">
        🔥 {streakCount} {streakCount > 1 ? "jours" : "jour"}
      </div>
    </div>
  );
}
