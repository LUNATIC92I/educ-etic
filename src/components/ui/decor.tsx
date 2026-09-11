import { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type DecorProps = { className?: string; style?: CSSProperties };

export function Blob({ className, style }: DecorProps) {
  return (
    <div
      aria-hidden
      style={style}
      className={cn(
        "pointer-events-none absolute animate-blob opacity-60 blur-2xl",
        className
      )}
    />
  );
}

export function Star({ className, style }: DecorProps) {
  return (
    <span
      aria-hidden
      style={style}
      className={cn("pointer-events-none absolute animate-twinkle text-sunny-400", className)}
    >
      ✦
    </span>
  );
}

const floatingTags = ["<html>", "<div>", "<h1>", "{ }", "</>", "css", "<p>", "#fff"];

export function FloatingCodeBits({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {floatingTags.map((tag, i) => (
        <span
          key={tag}
          className="absolute rounded-xl border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-semibold text-white/80 shadow-lg backdrop-blur-sm animate-float"
          style={{
            left: `${(i * 37) % 90}%`,
            top: `${(i * 23) % 85}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
