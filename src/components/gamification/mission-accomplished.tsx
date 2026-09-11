"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export type NewBadge = { code: string; name: string; emoji: string };

const CONFETTI_COLORS = ["#2f63ff", "#8b3dff", "#33e0f5", "#ffd23f", "#ff7fc9"];

function subscribeReduceMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => {
    mediaQuery.removeEventListener("change", callback);
    observer.disconnect();
  };
}

function getReduceMotionSnapshot() {
  return (
    document.documentElement.classList.contains("reduce-motion") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getReduceMotionServerSnapshot() {
  return false;
}

function Confetti() {
  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotionSnapshot,
    getReduceMotionServerSnapshot
  );

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -40, x: `${(i * 71) % 100}%`, opacity: 1, rotate: 0 }}
          animate={{ y: "110%", opacity: [1, 1, 0], rotate: 360 }}
          transition={{ duration: 2.2 + (i % 5) * 0.3, delay: (i % 10) * 0.08, ease: "easeIn" }}
          className="absolute h-2.5 w-2.5 rounded-sm"
          style={{ backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}
        />
      ))}
    </div>
  );
}

export function MissionAccomplished({
  open,
  xpGained = 0,
  newBadges = [],
  leveledUp = false,
  onClose,
}: {
  open: boolean;
  xpGained?: number;
  newBadges?: NewBadge[];
  leveledUp?: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-nightsky-500/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-sm">
            <Confetti />
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative rounded-3xl bg-ck-bg-elevated p-8 text-center shadow-2xl"
            >
              <div className="animate-pop text-6xl">🎉</div>
              <h2 className="mt-3 font-display text-2xl font-bold">Mission accomplie !</h2>
              <p className="mt-1 text-ck-text-muted">Bravo, tu viens de franchir une nouvelle étape 🚀</p>

              {xpGained > 0 ? (
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sunny-400 to-sunny-500 px-5 py-2 font-display text-lg font-bold text-nightsky-600 shadow-md">
                  +{xpGained} XP
                </div>
              ) : null}

              {leveledUp ? (
                <p className="mt-4 font-display font-bold text-violet-500">✨ Niveau supérieur débloqué !</p>
              ) : null}

              {newBadges.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {newBadges.map((b) => (
                    <div
                      key={b.code}
                      className="flex items-center justify-center gap-2 rounded-2xl bg-electric-50 px-4 py-2 text-sm font-bold text-electric-700 dark:bg-electric-500/15 dark:text-electric-300"
                    >
                      <span className="text-xl">{b.emoji}</span> Badge débloqué : {b.name}
                    </div>
                  ))}
                </div>
              ) : null}

              <Button onClick={onClose} className="mt-7 w-full">
                Continuer l&apos;aventure →
              </Button>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
