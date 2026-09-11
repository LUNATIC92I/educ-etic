"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"parent" | "child">("parent");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      const fallback = data.role === "ADMIN" ? "/admin" : data.role === "PARENT" ? "/parent" : "/dashboard";
      router.push(redirectTo !== "/" ? redirectTo : fallback);
      router.refresh();
    } catch {
      setError("Impossible de se connecter. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-5 flex rounded-2xl bg-white/10 p-1">
        <button
          type="button"
          onClick={() => setMode("parent")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
            mode === "parent" ? "bg-white text-nightsky-600" : "text-white/70"
          }`}
        >
          👨‍👩‍👧 Parent
        </button>
        <button
          type="button"
          onClick={() => setMode("child")}
          className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-colors ${
            mode === "child" ? "bg-white text-nightsky-600" : "text-white/70"
          }`}
        >
          🧑‍🚀 Enfant
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            {mode === "parent" ? "Adresse email" : "Identifiant"}
          </label>
          <input
            required
            type={mode === "parent" ? "email" : "text"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={mode === "parent" ? "toi@exemple.com" : "ton-pseudo"}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-electric-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white/80">
            {mode === "parent" ? "Mot de passe" : "Code secret"}
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-electric-400"
          />
        </div>

        {error ? (
          <p className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-200">{error}</p>
        ) : null}

        {mode === "parent" ? (
          <div className="text-right text-sm">
            <a href="/forgot-password" className="text-white/70 hover:text-white">
              Mot de passe oublié ?
            </a>
          </div>
        ) : null}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
