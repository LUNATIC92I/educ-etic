"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ck-text-muted transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10",
        className
      )}
    >
      <span className="text-lg">🚪</span>
      Déconnexion
    </button>
  );
}
