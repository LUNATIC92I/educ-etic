const STEPS = [
  { emoji: "🧭", title: "Choisis ton niveau", text: "Débutant, Intermédiaire ou Avancé : commence là où tu te sens à l'aise." },
  { emoji: "🎯", title: "Suis tes missions", text: "Chaque leçon te donne un petit défi de code à réussir dans l'éditeur intégré." },
  { emoji: "✨", title: "Gagne XP & badges", text: "Valide tes missions et tes quiz pour monter de niveau et débloquer des récompenses." },
  { emoji: "🏗️", title: "Construis de vrais projets", text: "Termine chaque parcours avec un site que tu as créé toi-même, de A à Z." },
];

export function HowItWorks() {
  return (
    <section className="bg-ck-bg-elevated py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Comment ça marche</h2>
          <p className="mt-4 text-lg text-ck-text-muted">Quatre étapes simples vers ton premier site web.</p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-electric-500 via-violet-500 to-bubble-500 text-4xl shadow-lg shadow-violet-500/30">
                {step.emoji}
              </div>
              <span className="mt-3 inline-block font-display text-sm font-bold text-violet-500">
                Étape {i + 1}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-ck-text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
