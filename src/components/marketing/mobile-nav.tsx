"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/data/site";
import { Button } from "@/components/ui/button";

export function MobileNav({
  isAuthenticated,
  homeHref,
}: {
  isAuthenticated: boolean;
  homeHref: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl"
      >
        {open ? "✕" : "☰"}
      </button>

      {open ? (
        <div className="absolute inset-x-0 top-full glass-panel border-t border-ck-border px-4 py-4">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-ck-text hover:bg-electric-50 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {isAuthenticated ? (
              <Button href={homeHref ?? "/dashboard"} className="w-full">
                Mon espace
              </Button>
            ) : (
              <>
                <Button href="/login" variant="secondary" className="w-full">
                  Connexion
                </Button>
                <Button href="/register" className="w-full">
                  Commencer
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
