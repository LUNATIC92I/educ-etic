import { ROADMAP_STEPS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Roadmap({ activeIndex = -1 }: { activeIndex?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {ROADMAP_STEPS.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-2xl shadow-md transition-all",
              i <= activeIndex
                ? "border-transparent bg-gradient-to-br from-electric-500 via-violet-500 to-bubble-500 text-white scale-105"
                : "border-ck-border bg-ck-bg-elevated text-ck-text-muted"
            )}
          >
            {step.emoji}
          </div>
          <span
            className={cn(
              "mt-1 text-xs font-semibold",
              i <= activeIndex ? "text-ck-text" : "text-ck-text-muted"
            )}
          >
            {step.label}
          </span>
          {i < ROADMAP_STEPS.length - 1 ? (
            <span
              className={cn(
                "my-1 h-8 w-1 rounded-full",
                i < activeIndex ? "bg-gradient-to-b from-electric-500 to-violet-500" : "bg-ck-border"
              )}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
