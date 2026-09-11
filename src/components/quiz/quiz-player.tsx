"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { MissionAccomplished, type NewBadge } from "@/components/gamification/mission-accomplished";
import { cn } from "@/lib/utils";

type Question = { id: string; question: string; choices: string[] };
type Feedback = { correct: boolean; correctIndex: number; explanation: string };

export function QuizPlayer({
  quizId,
  questions,
  nextHref,
}: {
  quizId: string;
  questions: Question[];
  nextHref: string;
}) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState<{
    score: number;
    total: number;
    xpGained: number;
    leveledUp: boolean;
    newBadges: NewBadge[];
  } | null>(null);

  const question = questions[index];
  const isLast = index === questions.length - 1;

  async function checkAnswer() {
    if (selected === null) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/quiz/${quizId}/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionIndex: index, answer: selected }),
      });
      const data = await res.json();
      setFeedback(data);
    } finally {
      setSubmitting(false);
    }
  }

  async function next() {
    const updatedAnswers = [...answers, selected!];
    setAnswers(updatedAnswers);
    setSelected(null);
    setFeedback(null);

    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/quiz/${quizId}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: updatedAnswers }),
      });
      const data = await res.json();
      setFinalResult(data);
    } finally {
      setSubmitting(false);
    }
  }

  if (finalResult) {
    const pct = Math.round((finalResult.score / finalResult.total) * 100);
    return (
      <>
        <Card className="p-8 text-center">
          <p className="text-5xl">{pct >= 80 ? "🏆" : pct >= 50 ? "🎉" : "💪"}</p>
          <h2 className="mt-3 font-display text-2xl font-bold">
            {finalResult.score}/{finalResult.total} — {pct}%
          </h2>
          <p className="mt-2 text-ck-text-muted">
            {pct >= 80 ? "Excellent travail !" : pct >= 50 ? "Bien joué, continue comme ça !" : "Tu progresses, réessaie pour t'améliorer !"}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href={nextHref}>Continuer →</Button>
          </div>
        </Card>
        <MissionAccomplished
          open={pct >= 50}
          xpGained={finalResult.xpGained}
          leveledUp={finalResult.leveledUp}
          newBadges={finalResult.newBadges}
          onClose={() => router.refresh()}
        />
      </>
    );
  }

  return (
    <div>
      <ProgressBar value={index} max={questions.length} label={`Question ${index + 1} sur ${questions.length}`} />

      <Card className="mt-6 p-6">
        <p className="font-display text-lg font-bold">{question.question}</p>
        <div className="mt-5 space-y-3">
          {question.choices.map((choice, i) => {
            const isSelected = selected === i;
            const isCorrectChoice = feedback && i === feedback.correctIndex;
            const isWrongSelected = feedback && isSelected && !feedback.correct;
            return (
              <button
                key={i}
                type="button"
                disabled={!!feedback}
                onClick={() => setSelected(i)}
                className={cn(
                  "w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-colors",
                  !feedback && isSelected && "border-electric-400 bg-electric-50 dark:bg-electric-500/10",
                  !feedback && !isSelected && "border-ck-border hover:border-electric-300",
                  isCorrectChoice && "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
                  isWrongSelected && "border-red-400 bg-red-50 dark:bg-red-500/10"
                )}
              >
                {choice}
              </button>
            );
          })}
        </div>

        {feedback ? (
          <div
            className={cn(
              "mt-4 rounded-xl p-4 text-sm",
              feedback.correct
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "bg-amber-50 text-amber-800 dark:bg-amber-500/10 dark:text-amber-300"
            )}
          >
            <p className="font-bold">{feedback.correct ? "🎉 Excellent !" : "💡 Pas tout à fait"}</p>
            <p className="mt-1">{feedback.explanation}</p>
          </div>
        ) : null}

        <div className="mt-5">
          {!feedback ? (
            <Button onClick={checkAnswer} disabled={selected === null || submitting}>
              Valider ma réponse
            </Button>
          ) : (
            <Button onClick={next} disabled={submitting}>
              {isLast ? "Voir mon score" : "Question suivante →"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
