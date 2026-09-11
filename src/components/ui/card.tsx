import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-ck-border bg-ck-bg-elevated card-shadow",
        className
      )}
      {...props}
    />
  );
}

export function CardHoverable({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-ck-border bg-ck-bg-elevated card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400 hover:shadow-2xl hover:shadow-violet-500/20",
        className
      )}
      {...props}
    />
  );
}
