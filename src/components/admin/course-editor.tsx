"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Question = {
  id?: string;
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export function CourseEditor({
  courseId,
  initial,
}: {
  courseId: string;
  initial: {
    course: { title: string; description: string; objective: string; icon: string; order: number; published: boolean };
    lesson: {
      title: string;
      summary: string;
      content: string;
      codeExampleHtml: string;
      codeExampleCss: string;
      missionPrompt: string;
      starterHtml: string;
      starterCss: string;
      hint: string;
      xpReward: number;
      validationRule: string;
    };
    quiz: { title: string; xpReward: number };
    questions: Question[];
  };
}) {
  const router = useRouter();
  const [course, setCourse] = useState(initial.course);
  const [lesson, setLesson] = useState(initial.lesson);
  const [quiz, setQuiz] = useState(initial.quiz);
  const [questions, setQuestions] = useState<Question[]>(initial.questions);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateQuestion(index: number, patch: Partial<Question>) {
    setQuestions((qs) => qs.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  function addQuestion() {
    setQuestions((qs) => [...qs, { question: "", choices: ["", "", "", ""], correctIndex: 0, explanation: "" }]);
  }

  function removeQuestion(index: number) {
    setQuestions((qs) => qs.filter((_, i) => i !== index));
  }

  async function save() {
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course, lesson, quiz, questions }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erreur lors de la sauvegarde.");
        return;
      }
      setMessage("Enregistré avec succès ✓");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-ck-border bg-ck-bg px-4 py-2.5 text-sm";
  const labelClass = "mb-1 block text-sm font-medium text-ck-text-muted";

  return (
    <div className="space-y-6 pb-24">
      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Informations du cours</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Titre</label>
            <input className={inputClass} value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Icône</label>
            <input className={inputClass} value={course.icon} onChange={(e) => setCourse({ ...course, icon: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea className={inputClass} rows={2} value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Objectif</label>
            <textarea className={inputClass} rows={2} value={course.objective} onChange={(e) => setCourse({ ...course, objective: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Ordre</label>
            <input type="number" className={inputClass} value={course.order} onChange={(e) => setCourse({ ...course, order: Number(e.target.value) })} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={course.published} onChange={(e) => setCourse({ ...course, published: e.target.checked })} />
              Publié (visible pour les enfants)
            </label>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Leçon</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label className={labelClass}>Titre de la leçon</label>
            <input className={inputClass} value={lesson.title} onChange={(e) => setLesson({ ...lesson, title: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Résumé</label>
            <input className={inputClass} value={lesson.summary} onChange={(e) => setLesson({ ...lesson, summary: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>Contenu pédagogique</label>
            <textarea className={`${inputClass} font-mono`} rows={8} value={lesson.content} onChange={(e) => setLesson({ ...lesson, content: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Exemple — HTML</label>
              <textarea className={`${inputClass} font-mono`} rows={6} value={lesson.codeExampleHtml} onChange={(e) => setLesson({ ...lesson, codeExampleHtml: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Exemple — CSS</label>
              <textarea className={`${inputClass} font-mono`} rows={6} value={lesson.codeExampleCss} onChange={(e) => setLesson({ ...lesson, codeExampleCss: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Mission (consigne pour l&apos;enfant)</label>
            <textarea className={inputClass} rows={2} value={lesson.missionPrompt} onChange={(e) => setLesson({ ...lesson, missionPrompt: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Code de départ — HTML</label>
              <textarea className={`${inputClass} font-mono`} rows={6} value={lesson.starterHtml} onChange={(e) => setLesson({ ...lesson, starterHtml: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Code de départ — CSS</label>
              <textarea className={`${inputClass} font-mono`} rows={6} value={lesson.starterCss} onChange={(e) => setLesson({ ...lesson, starterCss: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelClass}>
              Règle de validation (JSON) — ex. {"{"}&quot;type&quot;:&quot;contains-html&quot;,&quot;snippet&quot;:&quot;&lt;h1&gt;&quot;{"}"}
            </label>
            <input className={`${inputClass} font-mono`} value={lesson.validationRule} onChange={(e) => setLesson({ ...lesson, validationRule: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Indice</label>
              <input className={inputClass} value={lesson.hint} onChange={(e) => setLesson({ ...lesson, hint: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>XP de la leçon</label>
              <input type="number" className={inputClass} value={lesson.xpReward} onChange={(e) => setLesson({ ...lesson, xpReward: Number(e.target.value) })} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Quiz</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Titre du quiz</label>
            <input className={inputClass} value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
          </div>
          <div>
            <label className={labelClass}>XP du quiz</label>
            <input type="number" className={inputClass} value={quiz.xpReward} onChange={(e) => setQuiz({ ...quiz, xpReward: Number(e.target.value) })} />
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {questions.map((q, i) => (
            <div key={q.id ?? `new-${i}`} className="rounded-xl border border-ck-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase text-ck-text-muted">Question {i + 1}</p>
                <button type="button" onClick={() => removeQuestion(i)} className="text-xs font-semibold text-red-500 hover:underline">
                  Supprimer
                </button>
              </div>
              <input
                className={`${inputClass} mt-2`}
                placeholder="Intitulé de la question"
                value={q.question}
                onChange={(e) => updateQuestion(i, { question: e.target.value })}
              />
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {q.choices.map((choice, ci) => (
                  <label key={ci} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={q.correctIndex === ci}
                      onChange={() => updateQuestion(i, { correctIndex: ci })}
                    />
                    <input
                      className={inputClass}
                      placeholder={`Choix ${ci + 1}`}
                      value={choice}
                      onChange={(e) => {
                        const choices = [...q.choices];
                        choices[ci] = e.target.value;
                        updateQuestion(i, { choices });
                      }}
                    />
                  </label>
                ))}
              </div>
              <input
                className={`${inputClass} mt-3`}
                placeholder="Explication de la bonne réponse"
                value={q.explanation}
                onChange={(e) => updateQuestion(i, { explanation: e.target.value })}
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={addQuestion} className="mt-4 text-sm font-semibold text-electric-500 hover:underline">
          + Ajouter une question
        </button>
      </Card>

      <div className="sticky bottom-0 flex items-center gap-4 rounded-2xl border border-ck-border bg-ck-bg-elevated p-4 shadow-lg">
        <Button onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "💾 Enregistrer tout"}</Button>
        {message ? <span className="text-sm font-semibold text-emerald-600">{message}</span> : null}
        {error ? <span className="text-sm font-semibold text-red-600">{error}</span> : null}
      </div>
    </div>
  );
}
