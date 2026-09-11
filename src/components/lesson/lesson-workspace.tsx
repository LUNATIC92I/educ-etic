"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DualEditor } from "@/components/editor/dual-editor";
import { Button } from "@/components/ui/button";
import { MissionAccomplished, type NewBadge } from "@/components/gamification/mission-accomplished";

export function LessonWorkspace({
  lessonId,
  starterHtml,
  starterCss,
  missionPrompt,
  hint,
  alreadyCompleted,
  nextHref,
  nextLabel,
}: {
  lessonId: string;
  starterHtml: string;
  starterCss: string;
  missionPrompt: string;
  hint: string;
  alreadyCompleted: boolean;
  nextHref: string;
  nextLabel: string;
}) {
  const router = useRouter();
  const [html, setHtml] = useState(starterHtml);
  const [css, setCss] = useState(starterCss);
  const [status, setStatus] = useState<"idle" | "checking" | "error" | "success">(
    alreadyCompleted ? "success" : "idle"
  );
  const [showHint, setShowHint] = useState(false);
  const [celebration, setCelebration] = useState<{ xpGained: number; leveledUp: boolean; newBadges: NewBadge[] } | null>(
    null
  );

  async function verify() {
    setStatus("checking");
    try {
      const res = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, css }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        return;
      }
      if (data.success) {
        setStatus("success");
        if (!data.alreadyCompleted) {
          setCelebration({ xpGained: data.xpGained, leveledUp: data.leveledUp, newBadges: data.newBadges });
        }
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <div className="rounded-2xl border border-ck-border bg-gradient-to-r from-violet-50 to-electric-50 p-5 dark:from-violet-500/10 dark:to-electric-500/10">
        <p className="text-xs font-bold uppercase tracking-wide text-violet-500">🎯 Mission</p>
        <p className="mt-1 font-semibold">{missionPrompt}</p>
      </div>

      <div className="mt-4">
        <DualEditor html={html} css={css} onHtmlChange={setHtml} onCssChange={setCss} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={verify} disabled={status === "checking"}>
          {status === "checking" ? "Vérification…" : "✅ Vérifier ma mission"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setHtml(starterHtml);
            setCss(starterCss);
            setStatus("idle");
          }}
        >
          ↺ Réinitialiser
        </Button>
        {status === "error" ? (
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="text-sm font-semibold text-violet-500 hover:underline"
          >
            💡 Voir un indice
          </button>
        ) : null}
      </div>

      {status === "error" ? (
        <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
          Pas encore tout à fait ça, essaie encore ! {showHint ? `💡 Indice : ${hint}` : ""}
        </p>
      ) : null}

      {status === "success" ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-500/10">
          <p className="font-display font-bold text-emerald-600 dark:text-emerald-300">
            🎉 Mission réussie ! Tu es sur la bonne voie.
          </p>
          <Button href={nextHref}>{nextLabel} →</Button>
        </div>
      ) : null}

      <MissionAccomplished
        open={!!celebration}
        xpGained={celebration?.xpGained ?? 0}
        leveledUp={celebration?.leveledUp ?? false}
        newBadges={celebration?.newBadges ?? []}
        onClose={() => {
          setCelebration(null);
          router.refresh();
        }}
      />
    </div>
  );
}
