const FEATURES = [
  {
    emoji: "🕹️",
    title: "Apprendre en jouant",
    text: "Chaque leçon est une mission avec XP, badges et animations de réussite. Pas de cours magistral, que de l'action.",
  },
  {
    emoji: "💻",
    title: "Éditeur de code intégré",
    text: "Écris du vrai HTML/CSS et vois le résultat instantanément, directement dans le navigateur, sans rien installer.",
  },
  {
    emoji: "🏆",
    title: "Progression & récompenses",
    text: "Niveaux, séries de jours, badges légendaires : les enfants ont toujours une bonne raison de revenir.",
  },
  {
    emoji: "🎓",
    title: "Certificats officiels",
    text: "Chaque niveau terminé débloque un certificat numérique à télécharger et à afficher fièrement.",
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Espace parent transparent",
    text: "Suivez la progression, le temps passé et les projets réalisés depuis un tableau de bord dédié.",
  },
  {
    emoji: "🔒",
    title: "Sécurisé et pensé pour les enfants",
    text: "Comptes enfants séparés, contenu modéré, aucune donnée bancaire stockée sur la plateforme.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Pas juste un site de cours. <span className="text-gradient-brand">Un univers.</span>
        </h2>
        <p className="mt-4 text-lg text-ck-text-muted">
          Tout est pensé pour transformer l&apos;apprentissage en aventure : missions, gamification et vrais projets.
        </p>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-3xl border border-ck-border bg-ck-bg-elevated p-6 card-shadow transition-transform hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-100 to-violet-100 text-3xl dark:from-electric-500/20 dark:to-violet-500/20">
              {f.emoji}
            </div>
            <h3 className="mt-4 font-display text-xl font-bold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ck-text-muted">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
