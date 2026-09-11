import Link from "next/link";
import { SITE_NAME, SITE_SLOGAN } from "@/data/site";

const columns = [
  {
    title: "Apprendre",
    links: [
      { href: "/courses", label: "Tous les cours" },
      { href: "/levels", label: "Les 3 niveaux" },
      { href: "/pricing", label: "Tarifs" },
    ],
  },
  {
    title: "Plateforme",
    links: [
      { href: "/about", label: "À propos" },
      { href: "/help", label: "Aide" },
      { href: "/parent", label: "Espace parent" },
    ],
  },
  {
    title: "Compte",
    links: [
      { href: "/login", label: "Connexion" },
      { href: "/register", label: "Créer un compte" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ck-border bg-ck-bg-elevated">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
              <span className="text-2xl">🚀</span>
              <span className="text-gradient-brand">{SITE_NAME}</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ck-text-muted">{SITE_SLOGAN}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ck-text-muted">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ck-text hover:text-electric-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-ck-border pt-6 text-xs text-ck-text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.</p>
          <p>Fait avec 💙 pour les créateurs du web de demain.</p>
        </div>
      </div>
    </footer>
  );
}
