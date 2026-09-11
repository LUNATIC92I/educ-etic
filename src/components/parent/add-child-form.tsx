"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const EMOJIS = ["🧑‍🚀", "👧", "👦", "🦸", "🧙", "🐱", "🦊", "🐼"];

export function AddChildForm({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarEmoji, setAvatarEmoji] = useState(EMOJIS[0]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/children", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password, avatarEmoji }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }
      setName("");
      setUsername("");
      setPassword("");
      router.refresh();
      onDone?.();
    } catch {
      setError("Impossible de créer le profil. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => setAvatarEmoji(emoji)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border-2 text-xl ${
              avatarEmoji === emoji ? "border-electric-400 bg-electric-50 dark:bg-electric-500/10" : "border-ck-border"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Prénom</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Léo"
            className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5 outline-none focus:border-electric-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Identifiant</label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="leo"
            className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5 outline-none focus:border-electric-400"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Code secret</label>
          <input
            required
            type="text"
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="4 caractères min."
            className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5 outline-none focus:border-electric-400"
          />
        </div>
      </div>
      {error ? <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Création…" : "+ Ajouter cet enfant"}
      </Button>
    </form>
  );
}
