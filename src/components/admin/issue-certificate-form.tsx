"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LEVEL_OPTIONS = [
  { value: "beginner", label: "Débutant", courseName: "HTML & CSS — Niveau Débutant" },
  { value: "intermediate", label: "Intermédiaire", courseName: "HTML & CSS — Niveau Intermédiaire" },
  { value: "advanced", label: "Avancé", courseName: "HTML & CSS — Niveau Avancé" },
];

export function IssueCertificateForm({ children }: { children: { id: string; name: string }[] }) {
  const router = useRouter();
  const [userId, setUserId] = useState(children[0]?.id ?? "");
  const [level, setLevel] = useState(LEVEL_OPTIONS[0].value);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const plan = LEVEL_OPTIONS.find((l) => l.value === level)!;
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, level, courseName: plan.courseName }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (children.length === 0) {
    return <p className="text-sm text-ck-text-muted">Aucun compte enfant sur la plateforme pour le moment.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-3 sm:items-end">
      <div>
        <label className="mb-1 block text-xs font-semibold text-ck-text-muted">Enfant</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full rounded-xl border border-ck-border bg-ck-bg px-3 py-2 text-sm">
          {children.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-ck-text-muted">Niveau</label>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full rounded-xl border border-ck-border bg-ck-bg px-3 py-2 text-sm">
          {LEVEL_OPTIONS.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Génération…" : "🎓 Générer le certificat"}</Button>
      {error ? <p className="text-sm text-red-600 sm:col-span-3">{error}</p> : null}
    </form>
  );
}
