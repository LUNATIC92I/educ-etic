import { CardHoverable } from "@/components/ui/card";
import { BadgePill } from "@/components/ui/badge-pill";
import { cn } from "@/lib/utils";
import type { PRICING_PLANS } from "@/data/pricing";

const toneGradient = {
  electric: "from-electric-500 to-electric-700",
  violet: "from-violet-500 to-violet-700",
  bubble: "from-bubble-500 to-pink-600",
} as const;

export function PricingCard({
  plan,
  cta,
  highlight = false,
}: {
  plan: (typeof PRICING_PLANS)[number];
  cta: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <CardHoverable
      className={cn(
        "relative flex flex-col p-8",
        highlight && "border-violet-400 shadow-2xl shadow-violet-500/30 md:-translate-y-4 md:scale-105"
      )}
    >
      {plan.badge ? (
        <BadgePill tone={plan.tone === "bubble" ? "bubble" : "violet"} className="absolute -top-3 left-1/2 -translate-x-1/2">
          {plan.badge}
        </BadgePill>
      ) : null}
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl text-white shadow-lg",
          toneGradient[plan.tone]
        )}
      >
        {plan.emoji}
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold">{plan.name}</h3>
      <p className="mt-1 text-sm text-ck-text-muted">{plan.description}</p>
      <p className="mt-4 font-display text-4xl font-bold">
        {plan.price}€ <span className="text-base font-normal text-ck-text-muted">/ niveau</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm">
            <span className="mt-0.5 text-emerald-500">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">{cta}</div>
    </CardHoverable>
  );
}
