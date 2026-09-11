import Link from "next/link";
import { getSession } from "@/lib/session";
import { NAV_LINKS, SITE_NAME } from "@/data/site";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export async function Header() {
  const session = await getSession();

  const homeHref = session
    ? session.role === "ADMIN"
      ? "/admin"
      : session.role === "PARENT"
        ? "/parent"
        : "/dashboard"
    : null;

  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="text-2xl">🚀</span>
          <span className="text-gradient-brand">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-ck-text-muted transition-colors hover:bg-electric-50 hover:text-electric-600 dark:hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {session ? (
            <Button href={homeHref!} size="sm" variant="primary">
              Mon espace
            </Button>
          ) : (
            <>
              <Button href="/login" size="sm" variant="ghost">
                Connexion
              </Button>
              <Button href="/register" size="sm" variant="primary">
                Commencer
              </Button>
            </>
          )}
        </div>

        <MobileNav isAuthenticated={!!session} homeHref={homeHref} />
      </div>
    </header>
  );
}
