export const LEVELS = [
  {
    slug: "beginner",
    key: "beginner" as const,
    emoji: "🚀",
    name: "Débutant",
    tagline: "Pour découvrir HTML & CSS",
    price: 25,
    color: "electric" as const,
    roadmapLabel: "HTML Explorer",
  },
  {
    slug: "intermediate",
    key: "intermediate" as const,
    emoji: "⚡",
    name: "Intermédiaire",
    tagline: "Pour créer des sites modernes",
    price: 30,
    color: "violet" as const,
    roadmapLabel: "Web Designer",
    popular: true,
  },
  {
    slug: "advanced",
    key: "advanced" as const,
    emoji: "👑",
    name: "Avancé",
    tagline: "Pour devenir un vrai Web Creator",
    price: 35,
    color: "bubble" as const,
    roadmapLabel: "Web Creator",
  },
];

export const ROADMAP_STEPS = [
  { emoji: "🚀", label: "Départ" },
  { emoji: "🟢", label: "HTML Explorer" },
  { emoji: "🔵", label: "CSS Beginner" },
  { emoji: "🟣", label: "Web Designer" },
  { emoji: "🟠", label: "CSS Master" },
  { emoji: "🔴", label: "Web Creator" },
  { emoji: "👑", label: "HTML & CSS Champion" },
];

export const BADGE_CATALOG = [
  { code: "first-code", name: "Premier code", emoji: "🏆", description: "Tu as écrit ta toute première ligne de code !" },
  { code: "first-site", name: "Premier site", emoji: "🚀", description: "Tu as créé ta première page web complète." },
  { code: "css-artist", name: "CSS Artist", emoji: "🎨", description: "Tu maîtrises les couleurs, polices et mises en page." },
  { code: "web-creator", name: "Web Creator", emoji: "💻", description: "Tu as terminé le niveau Intermédiaire." },
  { code: "streak-7", name: "7 jours", emoji: "🔥", description: "7 jours d'affilée à apprendre, bravo !" },
  { code: "css-master", name: "CSS Master", emoji: "⚡", description: "Tu as terminé tous les modules CSS avancés." },
  { code: "html-legend", name: "HTML Legend", emoji: "👑", description: "Tu as terminé le niveau Avancé et le projet final." },
  { code: "quiz-ace", name: "Quiz Ace", emoji: "🧠", description: "Tu as obtenu 100% à un quiz." },
  { code: "night-owl", name: "Codeur assidu", emoji: "🌟", description: "Tu as terminé 10 leçons." },
];

export const NAV_LINKS = [
  { href: "/courses", label: "Cours" },
  { href: "/levels", label: "Niveaux" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/about", label: "À propos" },
];

export const SITE_NAME = "CodeKids";
export const SITE_SLOGAN = "Apprends à créer le Web. Construis ton imagination.";
