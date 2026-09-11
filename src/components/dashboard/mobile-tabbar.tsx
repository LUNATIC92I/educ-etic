"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/dashboard", label: "Accueil", icon: "🏠", exact: true },
  { href: "/dashboard/progress", label: "Progrès", icon: "📊" },
  { href: "/dashboard/badges", label: "Badges", icon: "🏆" },
  { href: "/editor", label: "Éditeur", icon: "💻" },
  { href: "/profile", label: "Profil", icon: "⚙️" },
];

export function MobileTabbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ck-border bg-ck-bg-elevated md:hidden">
      {LINKS.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold",
              active ? "text-electric-500" : "text-ck-text-muted"
            )}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
