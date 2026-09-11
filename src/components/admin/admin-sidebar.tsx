"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/dashboard/logout-button";

const LINKS = [
  { href: "/admin", label: "Tableau de bord", icon: "📊", exact: true },
  { href: "/admin/courses", label: "Cours & quiz", icon: "📚" },
  { href: "/admin/users", label: "Utilisateurs", icon: "👥" },
  { href: "/admin/payments", label: "Paiements", icon: "💳" },
  { href: "/admin/badges", label: "Badges", icon: "🏆" },
  { href: "/admin/projects", label: "Projets", icon: "🗂️" },
  { href: "/admin/certificates", label: "Certificats", icon: "🎓" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col border-r border-ck-border bg-ck-bg-elevated p-4 md:flex">
      <Link href="/" className="mb-6 flex items-center gap-2 px-2 font-display text-lg font-bold">
        <span className="text-2xl">🛡️</span>
        <span className="text-gradient-brand">CodeKids</span>
      </Link>
      <nav className="flex-1 space-y-1">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-gradient-to-r from-electric-500 to-violet-500 text-white shadow-md"
                  : "text-ck-text-muted hover:bg-electric-50 hover:text-ck-text dark:hover:bg-white/5"
              )}
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <LogoutButton className="mt-4" />
    </aside>
  );
}
