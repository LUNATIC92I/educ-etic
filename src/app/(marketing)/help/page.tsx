import type { Metadata } from "next";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Aide",
  description: "Questions fréquentes sur CodeKids : comptes, paiement, progression et sécurité.",
};

const FAQ = [
  {
    q: "À partir de quel âge peut-on utiliser CodeKids ?",
    a: "CodeKids est conçu pour les enfants et adolescents de 8 à 16 ans. Le niveau Débutant ne demande aucune expérience préalable.",
  },
  {
    q: "Comment fonctionne le compte parent et le compte enfant ?",
    a: "Un parent crée un compte avec son email, puis ajoute un profil pour chaque enfant depuis l'espace parent (prénom, identifiant et code secret). L'enfant se connecte ensuite avec cet identifiant.",
  },
  {
    q: "Que se passe-t-il après le paiement d'un niveau ?",
    a: "Le niveau est débloqué instantanément sur le compte de l'enfant concerné. Il apparaît dans son tableau de bord avec toutes les leçons, exercices et quiz.",
  },
  {
    q: "Les données bancaires sont-elles stockées ?",
    a: "Non, jamais. Les paiements sont traités par Stripe, un prestataire de paiement certifié. CodeKids ne stocke que la confirmation de la transaction.",
  },
  {
    q: "Peut-on suivre la progression de son enfant ?",
    a: "Oui. L'espace parent affiche la progression, le temps passé, les quiz réussis, les projets terminés et les certificats obtenus.",
  },
  {
    q: "Que faire si mon enfant est sensible aux animations ?",
    a: "Depuis la page Profil, il est possible d'activer l'option « Réduire les animations » qui désactive les effets de mouvement les plus marqués.",
  },
  {
    q: "Comment obtenir un certificat ?",
    a: "Un certificat numérique est généré automatiquement dès qu'un enfant termine toutes les leçons et le quiz final d'un niveau. Il est téléchargeable depuis le tableau de bord.",
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl font-bold">Centre d&apos;aide</h1>
        <p className="mt-4 text-lg text-ck-text-muted">Les réponses aux questions les plus fréquentes.</p>
      </div>

      <div className="mt-12 space-y-4">
        {FAQ.map((item) => (
          <Card key={item.q} className="p-6">
            <h3 className="font-display font-bold">{item.q}</h3>
            <p className="mt-2 text-sm text-ck-text-muted">{item.a}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-12 p-8 text-center">
        <h2 className="font-display text-xl font-bold">Une autre question ?</h2>
        <p className="mt-2 text-sm text-ck-text-muted">
          Écris-nous à{" "}
          <a href="mailto:support@codekids.dev" className="font-semibold text-electric-500 hover:underline">
            support@codekids.dev
          </a>
        </p>
      </Card>
    </div>
  );
}
