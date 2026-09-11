"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DualEditor } from "@/components/editor/dual-editor";
import { Button } from "@/components/ui/button";
import { MissionAccomplished, type NewBadge } from "@/components/gamification/mission-accomplished";

const DEFAULT_HTML = `<h1>Mon super projet</h1>\n<p>Écris ton code ici et regarde la magie opérer ✨</p>`;
const DEFAULT_CSS = `body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 40px;\n  background: linear-gradient(135deg, #eef4ff, #f5f0ff);\n}\n\nh1 {\n  color: #8b3dff;\n}`;

export function FreeEditor({
  projectId,
  initialTitle,
  initialHtml,
  initialCss,
}: {
  projectId?: string;
  initialTitle?: string;
  initialHtml?: string;
  initialCss?: string;
}) {
  const router = useRouter();
  const [id, setId] = useState(projectId);
  const [title, setTitle] = useState(initialTitle ?? "Mon nouveau projet");
  const [html, setHtml] = useState(initialHtml ?? DEFAULT_HTML);
  const [css, setCss] = useState(initialCss ?? DEFAULT_CSS);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [celebration, setCelebration] = useState<{ newBadges: NewBadge[] } | null>(null);

  async function save() {
    setSaving(true);
    try {
      if (id) {
        await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, html, css }),
        });
        setSavedAt(new Date());
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, html, css }),
        });
        const data = await res.json();
        if (res.ok) {
          setId(data.id);
          setSavedAt(new Date());
          router.replace(`/editor?project=${data.id}`);
          if (data.newBadges?.length) setCelebration({ newBadges: data.newBadges });
        }
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-xl border border-ck-border bg-ck-bg-elevated px-4 py-2 font-display font-bold outline-none focus:border-electric-400"
        />
        <div className="flex items-center gap-3">
          {savedAt ? <span className="text-xs text-ck-text-muted">Sauvegardé ✓</span> : null}
          <Button onClick={save} disabled={saving}>
            {saving ? "Sauvegarde…" : "💾 Sauvegarder"}
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <DualEditor html={html} css={css} onHtmlChange={setHtml} onCssChange={setCss} height={480} />
      </div>

      <div className="mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setHtml(DEFAULT_HTML);
            setCss(DEFAULT_CSS);
          }}
        >
          ↺ Réinitialiser
        </Button>
      </div>

      <MissionAccomplished
        open={!!celebration}
        xpGained={0}
        newBadges={celebration?.newBadges ?? []}
        onClose={() => {
          setCelebration(null);
          router.refresh();
        }}
      />
    </div>
  );
}
