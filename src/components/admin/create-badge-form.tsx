"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CreateBadgeForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("⭐");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/badges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, name, emoji, description }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      setCode("");
      setName("");
      setDescription("");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-5 sm:items-end">
      <div className="sm:col-span-1">
        <label className="mb-1 block text-xs font-semibold text-ck-text-muted">Emoji</label>
        <input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="w-full rounded-xl border border-ck-border bg-ck-bg px-3 py-2 text-center text-xl" />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-xs font-semibold text-ck-text-muted">Code</label>
        <input required value={code} onChange={(e) => setCode(e.target.value)} placeholder="super-badge" className="w-full rounded-xl border border-ck-border bg-ck-bg px-3 py-2 text-sm" />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-xs font-semibold text-ck-text-muted">Nom</label>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Super Badge" className="w-full rounded-xl border border-ck-border bg-ck-bg px-3 py-2 text-sm" />
      </div>
      <div className="sm:col-span-1">
        <label className="mb-1 block text-xs font-semibold text-ck-text-muted">Description</label>
        <input required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Critère d'obtention" className="w-full rounded-xl border border-ck-border bg-ck-bg px-3 py-2 text-sm" />
      </div>
      <Button type="submit" disabled={loading} className="sm:col-span-1">
        {loading ? "Création…" : "+ Créer"}
      </Button>
      {error ? <p className="text-sm text-red-600 sm:col-span-5">{error}</p> : null}
    </form>
  );
}
