"use client";

import { useState } from "react";

export function ReduceMotionToggle({ initial }: { initial: boolean }) {
  const [enabled, setEnabled] = useState(initial);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    const next = !enabled;
    setEnabled(next);
    document.documentElement.classList.toggle("reduce-motion", next);
    try {
      localStorage.setItem("ck-reduce-motion", next ? "1" : "0");
    } catch {
      // ignore storage errors
    }
    setSaving(true);
    try {
      await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reduceMotion: next }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={saving}
      className="flex w-full items-center justify-between rounded-xl border border-ck-border px-4 py-3 text-left"
    >
      <div>
        <p className="font-semibold">Réduire les animations</p>
        <p className="text-xs text-ck-text-muted">Désactive les confettis et animations de mouvement les plus marquées.</p>
      </div>
      <span
        className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${enabled ? "bg-electric-500" : "bg-ck-border"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </span>
    </button>
  );
}
