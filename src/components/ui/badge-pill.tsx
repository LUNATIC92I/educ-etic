import { cn } from "@/lib/utils";

const tones = {
  electric: "bg-electric-50 text-electric-700 dark:bg-electric-500/15 dark:text-electric-300",
  violet: "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  sunny: "bg-sunny-300/40 text-amber-800 dark:bg-sunny-500/15 dark:text-sunny-300",
  bubble: "bg-bubble-300/30 text-bubble-500 dark:bg-bubble-500/15 dark:text-bubble-300",
  neutral: "bg-ck-border/60 text-ck-text-muted",
} as const;

export function BadgePill({
  children,
  tone = "electric",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
