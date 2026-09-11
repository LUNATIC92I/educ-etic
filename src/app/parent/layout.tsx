import Link from "next/link";
import { LogoutButton } from "@/components/dashboard/logout-button";

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ck-bg">
      <div className="flex items-center justify-between border-b border-ck-border bg-ck-bg-elevated px-4 py-3 sm:px-6">
        <Link href="/parent" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="text-2xl">🚀</span>
          <span className="text-gradient-brand">CodeKids</span>
          <span className="ml-2 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            Espace parent
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-sm font-semibold text-ck-text-muted hover:text-ck-text">
            Profil
          </Link>
          <LogoutButton />
        </div>
      </div>
      <main className="mx-auto max-w-6xl p-4 sm:p-6">{children}</main>
    </div>
  );
}
