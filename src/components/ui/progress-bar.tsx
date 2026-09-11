import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  label,
}: {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  label?: string;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-sm font-medium text-ck-text-muted">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      ) : null}
      <div className="h-3.5 w-full overflow-hidden rounded-full bg-ck-border/60">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-electric-500 via-violet-500 to-bubble-500 transition-[width] duration-700 ease-out",
            barClassName
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
