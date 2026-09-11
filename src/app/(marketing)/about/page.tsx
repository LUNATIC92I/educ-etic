import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "À propos",
  description: "La mission de CodeKids : rendre la création web accessible et amusante pour les 8-16 ans.",
};

const VALUES = [
  { emoji: "🎮", title: "Apprendre en jouant", text: "On croit que la meilleure façon d'apprendre à coder, c'est de créer, se tromper et recommencer, avec plaisir." },
  { emoji: "🧩", title: "Progressivité", text: "Chaque notion s'appuie sur la précédente. Pas de saut dans l'inconnu, juste une montée en compétence naturelle." },
  { emoji: "🔒", title: "Sécurité d'abord", text: "Comptes enfants séparés, données minimales, aucune donnée bancaire stockée : la confiance des familles est notre priorité." },
  { emoji: "🌍", title: "Accessible à tous", text: "Des interfaces simples, lisibles, et une option pour réduire les animations pour les enfants sensibles au mouvement." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold">
          On aide les enfants à devenir des <span className="text-gradient-brand">créateurs du Web</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ck-text-muted">
          CodeKids est né d&apos;une conviction simple : coder est une nouvelle forme d&apos;expression créative, et elle
          devrait être aussi accessible et amusante qu&apos;un jeu vidéo. Nous construisons une plateforme où
          chaque enfant de 8 à 16 ans peut apprendre le HTML et le CSS à son rythme, en construisant de vrais
          projets dont il peut être fier.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VALUES.map((v) => (
          <Card key={v.title} className="p-6">
            <div className="text-3xl">{v.emoji}</div>
            <h3 className="mt-3 font-display text-lg font-bold">{v.title}</h3>
            <p className="mt-2 text-sm text-ck-text-muted">{v.text}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-br from-electric-500 via-violet-500 to-bubble-500 p-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Notre équipe pédagogique</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          Chaque cours est conçu avec des enseignants et des développeurs pour garantir un contenu à la fois
          exact techniquement et adapté aux enfants.
        </p>
      </div>
    </div>
  );
}
