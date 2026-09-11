"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Blob, FloatingCodeBits, Star } from "@/components/ui/decor";

const codeLines = [
  { text: "<!DOCTYPE html>", color: "text-electric-300" },
  { text: "<html>", color: "text-violet-300" },
  { text: "  <h1>Mon site incroyable</h1>", color: "text-cyan-300" },
  { text: "  <p>Créé par toi ✨</p>", color: "text-sunny-300" },
  { text: "</html>", color: "text-violet-300" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-nightsky-500 via-[#140f36] to-nightsky-500 text-white">
      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <Star
            key={i}
            className="text-sm"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31) % 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
        <Blob className="left-[-10%] top-[-10%] h-96 w-96 bg-electric-500/40" />
        <Blob className="right-[-15%] top-1/3 h-[28rem] w-[28rem] bg-violet-500/40" style={{ animationDelay: "2s" }} />
        <Blob className="bottom-[-15%] left-1/4 h-80 w-80 bg-bubble-500/30" style={{ animationDelay: "4s" }} />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
            🎮 Apprendre en s&apos;amusant, pour de vrai
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Ton aventure dans le monde du{" "}
            <span className="text-gradient-brand">Web</span> commence ici 🚀
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Apprends HTML &amp; CSS en créant tes propres sites web. Missions, badges,
            XP et projets réels : chaque leçon te rapproche d&apos;un nouveau pouvoir de créateur.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/register" size="lg" variant="primary">
              Commencer l&apos;aventure 🚀
            </Button>
            <Button href="/levels" size="lg" variant="secondary" className="!bg-white/10 !text-white !border-white/20 hover:!border-white/40">
              Découvrir les niveaux
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
            <span>👨‍👩‍👧 Conçu avec des pédagogues</span>
            <span>🔒 Espace parent sécurisé</span>
            <span>🏆 Certificats à chaque niveau</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="relative mx-auto max-w-md rounded-2xl border border-white/10 bg-nightsky-600/80 shadow-2xl shadow-violet-900/50 backdrop-blur">
            <div className="flex items-center gap-1.5 rounded-t-2xl border-b border-white/10 bg-white/5 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 font-mono text-xs text-white/50">mon-site.html</span>
            </div>
            <div className="space-y-2 p-6 font-mono text-sm">
              {codeLines.map((line, i) => (
                <motion.p
                  key={line.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                  className={line.color}
                >
                  {line.text}
                  {i === codeLines.length - 1 ? (
                    <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-white/70 align-middle" />
                  ) : null}
                </motion.p>
              ))}
            </div>
          </div>

          <FloatingCodeBits className="absolute -inset-16 hidden md:block" />

          <div className="absolute -right-6 -top-6 animate-float rounded-2xl bg-gradient-to-br from-sunny-400 to-sunny-500 px-4 py-2 font-display text-sm font-bold text-nightsky-600 shadow-lg">
            +100 XP 🎉
          </div>
          <div
            className="absolute -bottom-6 -left-6 animate-float rounded-2xl bg-gradient-to-br from-bubble-400 to-bubble-500 px-4 py-2 font-display text-sm font-bold text-white shadow-lg"
            style={{ animationDelay: "1.2s" }}
          >
            🏆 Badge débloqué
          </div>
        </motion.div>
      </div>

      <svg
        className="relative block w-full text-ck-bg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}
