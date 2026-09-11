"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      router.push("/parent?onboarding=1");
      router.refresh();
    } catch {
      setError("Impossible de créer le compte. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">Ton nom</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sofia Martin"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-electric-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">Adresse email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="toi@exemple.com"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-electric-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-white/80">Mot de passe</label>
        <input
          required
          type="password"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8 caractères minimum"
          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-electric-400"
        />
      </div>

      {error ? (
        <p className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-200">{error}</p>
      ) : null}

      <p className="text-xs text-white/50">
        En créant un compte, tu pourras ensuite ajouter le profil de ton enfant depuis ton espace parent.
      </p>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Création…" : "Créer mon compte parent"}
      </Button>
    </form>
  );
}
