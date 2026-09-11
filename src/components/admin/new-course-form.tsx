"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function NewCourseForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [level, setLevel] = useState("beginner");
  const [icon, setIcon] = useState("💻");
  const [description, setDescription] = useState("");
  const [objective, setObjective] = useState("");
  const [order, setOrder] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, level, icon, description, objective, order }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      router.push(`/admin/courses/${data.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Titre</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Slug (URL)</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="mon-nouveau-cours" className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Niveau</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5">
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Icône (emoji)</label>
          <input value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-ck-text-muted">Ordre</label>
          <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ck-text-muted">Description</label>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-ck-text-muted">Objectif</label>
        <textarea required value={objective} onChange={(e) => setObjective(e.target.value)} rows={2} className="w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5" />
      </div>
      {error ? <p className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p> : null}
      <Button type="submit" disabled={loading}>{loading ? "Création…" : "Créer le cours"}</Button>
    </form>
  );
}
