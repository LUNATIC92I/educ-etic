import Link from "next/link";
import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-2xl font-display font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-electric-300 disabled:opacity-50 disabled:pointer-events-none select-none";

const variants = {
  primary:
    "bg-gradient-to-r from-electric-500 via-violet-500 to-bubble-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-ck-bg-elevated text-ck-text border-2 border-ck-border hover:border-electric-400 hover:-translate-y-0.5",
  ghost: "text-ck-text hover:bg-electric-50 dark:hover:bg-white/5",
  sunny:
    "bg-gradient-to-r from-sunny-400 to-sunny-500 text-nightsky-600 shadow-lg shadow-sunny-500/30 hover:-translate-y-0.5",
  danger: "bg-red-500 text-white hover:bg-red-600",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
