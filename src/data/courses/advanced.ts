import type { SeedCourse } from "./types";

export const advancedCourses: SeedCourse[] = [
  // 1. Architecture HTML/CSS professionnelle
  {
    slug: "architecture-html-css-pro",
    level: "advanced",
    title: "Architecture HTML/CSS professionnelle",
    description:
      "Apprends à structurer une page comme un développeur professionnel, avec des balises sémantiques qui rendent ton code clair, accessible et facile à faire évoluer.",
    objective:
      "Construire une page complète avec header, nav, main, section, article et footer plutôt qu'avec des div empilées sans signification.",
    icon: "🏛️",
    order: 1,
    lessons: [
      {
        slug: "architecture-html-css-pro",
        title: "Architecture HTML/CSS professionnelle",
        order: 1,
        summary:
          "Découvre les balises sémantiques HTML5 et pourquoi elles remplacent avantageusement les div empilées.",
        content: `Jusqu'ici, tu as sans doute construit tes pages avec beaucoup de \`<div>\`. Ça fonctionne, mais un vrai projet professionnel a besoin de plus : une structure que n'importe quel humain (ou robot) peut comprendre juste en lisant le squelette HTML, sans même regarder le CSS.

C'est le rôle du HTML sémantique. Chaque balise décrit le rôle du contenu, pas seulement sa boîte : \`<header>\` pour l'en-tête, \`<nav>\` pour la navigation, \`<main>\` pour le contenu principal unique de la page, \`<section>\` pour regrouper un thème, \`<article>\` pour un contenu autonome (un post de blog, une carte produit), et \`<footer>\` pour le pied de page.

## Pourquoi ça change tout

Un lecteur d'écran utilisé par une personne malvoyante peut sauter directement au \`<main>\` ou à la \`<nav>\` grâce à ces balises : ce sont des repères de navigation. Les moteurs de recherche comprennent mieux la hiérarchie de ta page. Et surtout, quand un autre développeur (ou toi-même dans six mois) rouvre ton code, il retrouve immédiatement où se trouve chaque partie, sans devoir deviner à quoi sert chaque \`<div class="box2">\`.

Une règle simple à retenir : une page ne doit avoir qu'un seul \`<main>\`, il ne doit jamais être imbriqué dans un \`<article>\` ou un \`<aside>\`. En revanche, \`<section>\` et \`<article>\` peuvent se répéter autant que nécessaire.

Attention à ne pas tomber dans l'excès inverse : un \`<div>\` reste parfaitement légitime quand tu as juste besoin d'un conteneur visuel sans signification particulière (un wrapper pour centrer du contenu, par exemple). La sémantique sert le sens, pas la décoration.`,
        codeExampleHtml: `<body>
  <header class="site-header">
    <p class="logo">Nova Studio</p>
    <nav class="main-nav">
      <a href="#accueil">Accueil</a>
      <a href="#projets">Projets</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section class="intro">
      <h1>On construit des interfaces qui durent</h1>
      <p>Structure claire, code propre, résultats professionnels.</p>
    </section>

    <section class="articles">
      <article class="card">
        <h2>Pourquoi la sémantique compte</h2>
        <p>Un code lisible se maintient dix fois plus vite.</p>
      </article>
      <article class="card">
        <h2>Accessibilité par défaut</h2>
        <p>Les bonnes balises aident tout le monde, sans effort.</p>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Nova Studio</p>
  </footer>
</body>`,
        codeExampleCss: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f6f7fb;
  color: #1a1a2e;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a1a2e;
  color: white;
}

.logo {
  font-weight: 700;
  margin: 0;
}

.main-nav a {
  color: white;
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 500;
}

.intro {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #2f63ff, #8b3dff);
  color: white;
}

.articles {
  display: flex;
  gap: 1.5rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 220px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.site-footer {
  text-align: center;
  padding: 1.5rem;
  color: #555;
}`,
        hasEditor: true,
        missionPrompt:
          "La zone principale du site est encore une simple <div class=«content»>. Remplace cette balise d'ouverture par <main> pour que le contenu principal soit correctement identifié.",
        starterHtml: `<body>
  <header class="site-header">
    <p class="logo">Nova Studio</p>
  </header>

  <div class="content">
    <h1>Bienvenue sur mon portfolio</h1>
    <p>Développeur front-end passionné par le web propre.</p>
  </div>

  <footer class="site-footer">
    <p>&copy; 2026</p>
  </footer>
</body>`,
        starterCss: `body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #f6f7fb;
  color: #1a1a2e;
}

.site-header {
  padding: 1rem 2rem;
  background: #1a1a2e;
  color: white;
}

.content {
  padding: 3rem 2rem;
}

.site-footer {
  text-align: center;
  padding: 1.5rem;
  color: #555;
}`,
        validationRule: { type: "contains-html", snippet: "<main>" },
        hint: "Il suffit de remplacer l'ouverture <div class=«content»> par <main> (et de penser à changer aussi la balise de fermeture correspondante).",
        xpReward: 90,
      },
    ],
    quiz: {
      title: "Quiz : Architecture HTML/CSS professionnelle",
      xpReward: 150,
      questions: [
        {
          question: "Combien de balises <main> une page HTML peut-elle contenir au maximum ?",
          choices: ["Autant que nécessaire", "Une seule", "Deux, une par colonne", "Zéro, c'est déconseillé"],
          correctIndex: 1,
          explanation: "La balise <main> représente le contenu principal unique de la page : il ne doit y en avoir qu'une seule.",
        },
        {
          question: "Quelle balise sémantique regroupe les liens de navigation d'un site ?",
          choices: ["<links>", "<menu-list>", "<nav>", "<header>"],
          correctIndex: 2,
          explanation: "<nav> identifie un bloc de liens de navigation principaux, utile notamment pour les lecteurs d'écran.",
        },
        {
          question: "Quelle est la différence principale entre <section> et <article> ?",
          choices: [
            "Il n'y a aucune différence, ce sont des synonymes",
            "<article> représente un contenu autonome, réutilisable indépendamment du reste",
            "<section> ne peut apparaître qu'une seule fois par page",
            "<article> est réservé aux images",
          ],
          correctIndex: 1,
          explanation: "<article> a du sens tout seul (un post de blog, une carte produit) alors que <section> regroupe simplement un thème dans la page.",
        },
        {
          question: "Pourquoi le HTML sémantique aide-t-il l'accessibilité ?",
          choices: [
            "Il rend le texte plus gros automatiquement",
            "Les lecteurs d'écran s'en servent comme repères pour naviguer directement vers une zone (navigation, contenu principal...)",
            "Il ajoute des couleurs par défaut",
            "Il empêche les erreurs de CSS",
          ],
          correctIndex: 1,
          explanation: "Les balises comme <nav>, <main> ou <footer> créent des « landmarks » que les technologies d'assistance savent exploiter.",
        },
        {
          question: "Quand est-il toujours acceptable d'utiliser une <div> plutôt qu'une balise sémantique ?",
          choices: [
            "Jamais, il faut bannir <div> complètement",
            "Quand on a juste besoin d'un conteneur visuel sans signification particulière",
            "Uniquement dans le <head>",
            "Seulement pour les images",
          ],
          correctIndex: 1,
          explanation: "<div> reste un outil légitime pour du simple regroupement visuel (wrapper, grille) qui ne porte pas de sens.",
        },
      ],
    },
  },

  // 2. CSS moderne : clamp, calc, aspect-ratio
  {
    slug: "css-moderne-clamp-calc",
    level: "advanced",
    title: "CSS moderne : clamp, calc, aspect-ratio",
    description:
      "Maîtrise trois fonctions CSS modernes qui remplacent des dizaines de media queries et rendent tes interfaces vraiment fluides.",
    objective:
      "Utiliser clamp(), calc() et aspect-ratio pour créer des tailles et des proportions qui s'adaptent à n'importe quel écran.",
    icon: "📐",
    order: 2,
    lessons: [
      {
        slug: "css-moderne-clamp-calc",
        title: "CSS moderne : clamp, calc, aspect-ratio",
        order: 1,
        summary:
          "Trois fonctions CSS pour des tailles fluides sans multiplier les media queries.",
        content: `Tu connais déjà les media queries pour adapter une page à différentes tailles d'écran. Mais il existe des fonctions CSS qui permettent à une valeur de s'adapter en continu, sans jamais écrire un seul \`@media\`.

\`clamp(min, préférée, max)\` prend trois valeurs : une taille minimale, une taille idéale (souvent en \`vw\` pour suivre la largeur de l'écran), et une taille maximale. Le navigateur choisit toujours la valeur préférée, sauf si elle sort de l'intervalle [min, max]. C'est parfait pour une typographie qui grossit sur grand écran sans devenir énorme, et qui ne devient jamais trop petite sur mobile.

\`calc()\` permet de mélanger des unités différentes dans un seul calcul, comme \`width: calc(100% - 40px)\`. C'est très utile pour soustraire un espace fixe (une marge, une barre latérale) à une largeur relative.

## Le cas d'aspect-ratio

La propriété \`aspect-ratio\` fixe le rapport largeur/hauteur d'un élément (par exemple \`16 / 9\` pour une vidéo). Avant, il fallait bricoler avec du \`padding-top\` en pourcentage pour garder une proportion fixe : \`aspect-ratio\` fait la même chose en une ligne, lisible et intuitive.

Attention à un piège classique avec \`clamp()\` : si tu oublies l'unité \`vw\` sur la valeur du milieu, ta taille ne réagira plus du tout à la largeur de l'écran — elle restera figée comme une valeur normale.`,
        codeExampleHtml: `<div class="hero-card">
  <div class="thumb"></div>
  <h1>Un titre qui respire</h1>
  <p>Ce titre grandit avec l'écran, sans jamais devenir illisible ni gigantesque.</p>
</div>`,
        codeExampleCss: `.hero-card {
  max-width: calc(100% - 2rem);
  margin: 2rem auto;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: #f6f7fb;
  border-radius: 16px;
  font-family: system-ui, sans-serif;
}

.thumb {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  background: linear-gradient(135deg, #2f63ff, #22d3ee);
  margin-bottom: 1.5rem;
}

.hero-card h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  margin: 0 0 0.5rem;
  color: #1a1a2e;
}

.hero-card p {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  color: #555;
}`,
        hasEditor: true,
        missionPrompt:
          "Le titre a une taille fixe de 32px, il ne s'adapte pas aux petits écrans. Remplace font-size: 32px; par font-size: clamp(1.5rem, 4vw, 3rem); dans la règle h1.",
        starterHtml: `<div class="hero-card">
  <h1>Un titre encore figé</h1>
  <p>Ce texte, lui, s'adapte déjà correctement.</p>
</div>`,
        starterCss: `.hero-card {
  max-width: calc(100% - 2rem);
  margin: 2rem auto;
  padding: 2rem;
  background: #f6f7fb;
  border-radius: 16px;
  font-family: system-ui, sans-serif;
}

.hero-card h1 {
  font-size: 32px;
  margin: 0 0 0.5rem;
  color: #1a1a2e;
}

.hero-card p {
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  color: #555;
}`,
        validationRule: {
          type: "css-property",
          selector: "h1",
          property: "font-size",
          value: "clamp(1.5rem, 4vw, 3rem)",
        },
        hint: "La syntaxe est clamp(taille minimum, taille idéale en vw, taille maximum) — copie exactement les trois valeurs demandées.",
        xpReward: 95,
      },
    ],
    quiz: {
      title: "Quiz : CSS moderne : clamp, calc, aspect-ratio",
      xpReward: 150,
      questions: [
        {
          question: "Que fait clamp(1rem, 3vw, 2rem) ?",
          choices: [
            "Il fixe toujours la taille à 3vw",
            "Il choisit 3vw, sauf si cette valeur descend sous 1rem ou dépasse 2rem",
            "Il additionne les trois valeurs",
            "Il applique 1rem sur mobile et 2rem sur ordinateur uniquement",
          ],
          correctIndex: 1,
          explanation: "clamp() garde la valeur préférée tant qu'elle reste entre le minimum et le maximum fournis.",
        },
        {
          question: "Pourquoi utilise-t-on souvent une unité vw dans la valeur du milieu de clamp() ?",
          choices: [
            "Parce que vw est obligatoire dans clamp()",
            "Pour que la valeur suive en continu la largeur de la fenêtre",
            "Parce que vw fonctionne mieux sur les images",
            "Pour désactiver le responsive",
          ],
          correctIndex: 1,
          explanation: "vw (viewport width) fait varier la valeur proportionnellement à la largeur de l'écran.",
        },
        {
          question: "Que calcule width: calc(100% - 40px) ?",
          choices: [
            "100% de la largeur, moins 40 pixels fixes",
            "40% de la largeur du parent",
            "100 pixels moins 40%",
            "Une erreur, on ne peut pas mélanger % et px",
          ],
          correctIndex: 0,
          explanation: "calc() autorise le mélange d'unités différentes dans un seul calcul, ici un pourcentage et des pixels.",
        },
        {
          question: "À quoi sert la propriété aspect-ratio ?",
          choices: [
            "À changer la couleur de fond selon la taille de l'écran",
            "À fixer le rapport largeur/hauteur d'un élément",
            "À faire tourner un élément",
            "À aligner du texte verticalement",
          ],
          correctIndex: 1,
          explanation: "aspect-ratio: 16 / 9 garde ce rapport quelle que soit la largeur réelle de l'élément.",
        },
        {
          question: "Avant l'existence d'aspect-ratio, quelle technique utilisait-on pour garder une proportion fixe ?",
          choices: [
            "Un padding-top exprimé en pourcentage",
            "Une image de fond obligatoire",
            "La propriété z-index",
            "Un tableau HTML",
          ],
          correctIndex: 0,
          explanation: "Le pourcentage de padding-top se calcule par rapport à la largeur, ce qui permettait de simuler un ratio fixe.",
        },
      ],
    },
  },

  // 3. Animations avancées
  {
    slug: "animations-avancees",
    level: "advanced",
    title: "Animations avancées",
    description:
      "Passe des transitions simples à de véritables animations multi-étapes, avec des rythmes et des délais qui donnent vie à ton interface.",
    objective:
      "Créer une animation @keyframes à plusieurs étapes avec des délais décalés (staggered) entre plusieurs éléments.",
    icon: "🎬",
    order: 3,
    lessons: [
      {
        slug: "animations-avancees",
        title: "Animations avancées",
        order: 1,
        summary:
          "Construis des animations à plusieurs étapes et décale leur départ pour un effet professionnel.",
        content: `Tu sais déjà créer une animation simple avec \`@keyframes\` en définissant un \`from\` et un \`to\`. Le niveau supérieur consiste à découper l'animation en plusieurs étapes intermédiaires, avec des pourcentages : \`0%\`, \`25%\`, \`50%\`, \`75%\`, \`100%\`. Ça permet de créer des mouvements bien plus riches qu'un simple aller simple, comme un rebond ou une pulsation.

La propriété \`animation-timing-function\` définit le rythme de l'animation entre chaque étape : \`ease-in-out\` pour un mouvement doux au début et à la fin, ou \`steps(n)\` pour un mouvement saccadé, image par image (utile pour un sprite ou un effet rétro).

## L'effet « staggered »

Quand plusieurs éléments similaires (des points de chargement, des cartes qui apparaissent) jouent la même animation, les lancer tous exactement en même temps donne un effet mécanique et plat. La technique professionnelle consiste à donner à chaque élément un \`animation-delay\` légèrement différent, souvent en ciblant chaque élément avec \`:nth-child()\`. Résultat : un mouvement en cascade, beaucoup plus vivant.

Attention : \`animation-delay\` retarde le départ, mais si l'animation est en boucle (\`animation-iteration-count: infinite\`), le délai ne s'applique qu'au tout premier cycle. Pense aussi à toujours donner une \`animation-duration\`, sinon aucune de ces réglages n'aura d'effet visible.`,
        codeExampleHtml: `<div class="loader">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>`,
        codeExampleCss: `.loader {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  padding: 3rem;
  background: #1a1a2e;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #22d3ee;
  animation: bounce 0.9s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-14px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
}`,
        hasEditor: true,
        missionPrompt:
          "Les trois points du loader bougent tous exactement en même temps. Donne au deuxième point un animation-delay de 0.2s pour créer un effet de vague.",
        starterHtml: `<div class="loader">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>`,
        starterCss: `.loader {
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  padding: 3rem;
  background: #1a1a2e;
}

.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #22d3ee;
  animation: bounce 0.9s ease-in-out infinite;
}

.dot:nth-child(2) {
  animation-delay: 0s;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-14px);
    opacity: 1;
  }
  100% {
    transform: translateY(0);
    opacity: 0.6;
  }
}`,
        validationRule: {
          type: "css-property",
          selector: ".dot:nth-child(2)",
          property: "animation-delay",
          value: "0.2s",
        },
        hint: "Cherche la règle .dot:nth-child(2) et change la valeur de animation-delay de 0s à 0.2s.",
        xpReward: 100,
      },
    ],
    quiz: {
      title: "Quiz : Animations avancées",
      xpReward: 150,
      questions: [
        {
          question: "Dans un @keyframes, à quoi servent les pourcentages comme 0%, 50%, 100% ?",
          choices: [
            "À indiquer la transparence de l'élément",
            "À définir des étapes intermédiaires dans le déroulement de l'animation",
            "À dupliquer l'animation trois fois",
            "Ils n'ont aucun effet, seuls from et to comptent",
          ],
          correctIndex: 1,
          explanation: "Chaque pourcentage représente un moment précis de la timeline de l'animation, avec son propre état CSS.",
        },
        {
          question: "Que fait animation-timing-function: steps(4) ?",
          choices: [
            "Elle répète l'animation 4 fois",
            "Elle divise l'animation en 4 sauts nets, sans transition fluide entre eux",
            "Elle retarde l'animation de 4 secondes",
            "Elle applique 4 couleurs différentes",
          ],
          correctIndex: 1,
          explanation: "steps(n) crée un mouvement saccadé en n étapes discrètes, contrairement à ease qui est continu.",
        },
        {
          question: "Comment obtenir un effet « staggered » sur plusieurs éléments identiques ?",
          choices: [
            "En donnant à chaque élément un animation-delay différent",
            "En augmentant la taille de chaque élément",
            "En utilisant position: absolute",
            "En supprimant animation-duration",
          ],
          correctIndex: 0,
          explanation: "Décaler le délai de départ de chaque élément crée un effet de vague au lieu d'un mouvement synchronisé.",
        },
        {
          question: "Avec animation-iteration-count: infinite, à quel moment s'applique animation-delay ?",
          choices: [
            "À chaque répétition de l'animation",
            "Uniquement avant le tout premier cycle",
            "Il n'a aucun effet en boucle infinie",
            "Seulement sur mobile",
          ],
          correctIndex: 1,
          explanation: "Le délai retarde uniquement le départ initial ; les cycles suivants s'enchaînent sans lui.",
        },
        {
          question: "Que se passe-t-il si on oublie de définir animation-duration ?",
          choices: [
            "L'animation joue à vitesse infinie",
            "L'animation ne se joue pas du tout (durée par défaut de 0s)",
            "Le navigateur choisit une durée aléatoire",
            "Ça provoque une erreur bloquante",
          ],
          correctIndex: 1,
          explanation: "Sans durée précisée, la durée par défaut est 0 seconde : l'animation existe mais reste invisible.",
        },
      ],
    },
  },

  // 4. Transitions complexes et courbes d'accélération
  {
    slug: "transitions-complexes-courbes",
    level: "advanced",
    title: "Transitions complexes et courbes d'accélération",
    description:
      "Va plus loin que ease et linear en composant tes propres courbes d'accélération pour des interactions qui semblent naturelles.",
    objective:
      "Utiliser cubic-bezier() et transitionner plusieurs propriétés en même temps de façon cohérente.",
    icon: "🎢",
    order: 4,
    lessons: [
      {
        slug: "transitions-complexes-courbes",
        title: "Transitions complexes et courbes d'accélération",
        order: 1,
        summary:
          "Compose des courbes d'accélération personnalisées et anime plusieurs propriétés à la fois.",
        content: `Les mots-clés \`ease\`, \`ease-in\`, \`ease-out\` sont en réalité des raccourcis pour des courbes mathématiques précises. La fonction \`cubic-bezier(x1, y1, x2, y2)\` te permet de définir ta propre courbe, avec quatre nombres qui contrôlent deux points de contrôle. Un site comme un éditeur de courbe de Bézier visuel aide à trouver des valeurs, mais certaines combinaisons sont devenues des classiques : \`cubic-bezier(0.34, 1.56, 0.64, 1)\` crée un léger effet de « rebond » dépassant la valeur finale avant de s'arrêter — parfait pour un bouton qui réagit au clic.

Une interface professionnelle anime rarement une seule propriété. Un bouton peut par exemple changer de \`transform\` (léger agrandissement) ET de \`box-shadow\` (ombre plus prononcée) en même temois. Pour ça, on sépare les transitions par des virgules dans la propriété \`transition\` : chaque propriété peut même avoir sa propre durée et sa propre courbe.

## La règle d'or

Ne mets jamais \`transition: all\`. Ça semble pratique, mais ça oblige le navigateur à surveiller le changement de toutes les propriétés CSS, ce qui coûte en performance et peut animer des choses que tu ne voulais pas animer (comme la couleur du texte lors d'un survol non prévu). Liste toujours explicitement les propriétés que tu veux transitionner.

Enfin, garde en tête que toutes les propriétés ne sont pas transitionnables de la même façon : les couleurs et les nombres s'interpolent en douceur, mais des propriétés comme \`display\` changent brutalement, sans transition possible.`,
        codeExampleHtml: `<button class="cta">Découvrir l'offre</button>`,
        codeExampleCss: `.cta {
  padding: 0.9rem 2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #2f63ff, #8b3dff);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 99, 255, 0.35);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
}

.cta:hover {
  transform: scale(1.06);
  box-shadow: 0 10px 24px rgba(139, 61, 255, 0.45);
}`,
        hasEditor: true,
        missionPrompt:
          "Seul le transform du bouton est animé, l'ombre change brutalement au survol. Ajoute box-shadow 0.3s ease à la propriété transition pour que l'ombre s'anime aussi en douceur.",
        starterHtml: `<button class="cta">Découvrir l'offre</button>`,
        starterCss: `.cta {
  padding: 0.9rem 2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #2f63ff, #8b3dff);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(47, 99, 255, 0.35);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.cta:hover {
  transform: scale(1.06);
  box-shadow: 0 10px 24px rgba(139, 61, 255, 0.45);
}`,
        validationRule: { type: "contains-css", snippet: "box-shadow 0.3s ease" },
        hint: "Sépare les deux transitions par une virgule : transform 0.3s cubic-bezier(...), box-shadow 0.3s ease;",
        xpReward: 100,
      },
    ],
    quiz: {
      title: "Quiz : Transitions complexes et courbes d'accélération",
      xpReward: 150,
      questions: [
        {
          question: "Que représentent les quatre nombres dans cubic-bezier(x1, y1, x2, y2) ?",
          choices: [
            "Quatre couleurs différentes",
            "Les coordonnées de deux points de contrôle qui dessinent la courbe d'accélération",
            "La durée en secondes de chaque étape",
            "Le nombre de répétitions de la transition",
          ],
          correctIndex: 1,
          explanation: "Ces valeurs positionnent les deux points de contrôle de la courbe de Bézier utilisée pour interpoler la transition.",
        },
        {
          question: "Comment animer transform et box-shadow en même temps avec des réglages différents ?",
          choices: [
            "C'est impossible, une seule propriété peut être transitionnée à la fois",
            "En séparant chaque propriété par une virgule dans transition",
            "En utilisant deux balises <style> différentes",
            "En dupliquant la classe CSS",
          ],
          correctIndex: 1,
          explanation: "transition accepte une liste de transitions séparées par des virgules, chacune avec sa propre durée et courbe.",
        },
        {
          question: "Pourquoi évite-t-on d'écrire transition: all dans un code professionnel ?",
          choices: [
            "Parce que le mot-clé all n'existe pas en CSS",
            "Parce que ça surveille toutes les propriétés, ce qui coûte en performance et peut animer des choses imprévues",
            "Parce que ça bloque le survol de la souris",
            "Parce que ça ne fonctionne que sur mobile",
          ],
          correctIndex: 1,
          explanation: "Lister explicitement les propriétés rend le code plus prévisible et plus performant.",
        },
        {
          question: "Quel type de propriété CSS peut être transitionné en douceur ?",
          choices: [
            "display, qui bascule progressivement de none à block",
            "Les valeurs numériques et les couleurs, qui peuvent être interpolées",
            "Le contenu texte d'un élément",
            "Le nom d'une classe CSS",
          ],
          correctIndex: 1,
          explanation: "Les nombres et les couleurs ont des valeurs intermédiaires calculables ; display, lui, change de façon brutale.",
        },
        {
          question: "Quel effet donne une courbe comme cubic-bezier(0.34, 1.56, 0.64, 1) ?",
          choices: [
            "Un mouvement parfaitement linéaire",
            "Un léger effet de rebond qui dépasse puis revient à la valeur finale",
            "Une animation qui ralentit puis s'arrête net",
            "Aucun effet visible",
          ],
          correctIndex: 1,
          explanation: "Un point de contrôle supérieur à 1 fait dépasser temporairement la valeur cible avant de s'y stabiliser, créant un rebond.",
        },
      ],
    },
  },

  // 5. Flexbox avancé : patterns réels
  {
    slug: "flexbox-avance-patterns",
    level: "advanced",
    title: "Flexbox avancé : patterns réels",
    description:
      "Découvre les patterns Flexbox utilisés dans de vrais projets professionnels : pied de page collé en bas, cartes de même hauteur, et bien plus.",
    objective:
      "Construire un pattern de mise en page réel (sticky footer) en maîtrisant flex-grow, flex-shrink et flex-basis.",
    icon: "🧩",
    order: 5,
    lessons: [
      {
        slug: "flexbox-avance-patterns",
        title: "Flexbox avancé : patterns réels",
        order: 1,
        summary:
          "Applique Flexbox à des problèmes de mise en page concrets rencontrés dans de vrais sites.",
        content: `Tu maîtrises déjà \`display: flex\`, \`justify-content\` et \`align-items\`. Il est temps de comprendre les trois propriétés qui contrôlent finement chaque enfant flexible : \`flex-grow\` (à quel point un élément s'étire pour occuper l'espace restant), \`flex-shrink\` (à quel point il accepte de rétrécir si la place manque), et \`flex-basis\` (sa taille de départ avant tout ajustement). Le raccourci \`flex: 1\` que tu utilises souvent équivaut en réalité à \`flex-grow: 1; flex-shrink: 1; flex-basis: 0%\`.

## Le pattern « sticky footer »

Un problème très courant : un pied de page qui doit toujours rester en bas de l'écran, même quand le contenu de la page est court, sans pour autant flotter au milieu de l'écran quand le contenu est long. La solution professionnelle : le \`body\` (ou un conteneur englobant) passe en \`display: flex; flex-direction: column; min-height: 100vh;\`, puis le \`<main>\` reçoit \`flex: 1\`. Résultat : le \`main\` s'étire pour occuper tout l'espace disponible, et pousse naturellement le \`footer\` tout en bas.

## Cartes de même hauteur

Autre classique : une rangée de cartes qui doivent toutes avoir la même hauteur, même si leur contenu texte varie. Avec un conteneur en \`display: flex\` (au lieu de \`inline-block\` ou \`float\`), chaque carte s'étire automatiquement à la hauteur de la plus grande — c'est le comportement par défaut de \`align-items: stretch\`, souvent oublié car il ne demande aucun code supplémentaire.

Attention à un piège courant avec \`flex-basis: 0\` : si le contenu d'un élément est plus large que sa base, il peut quand même déborder si \`flex-shrink\` vaut 0. Pense toujours aux trois valeurs ensemble, pas isolément.`,
        codeExampleHtml: `<body class="page">
  <header class="page-header">Mon Portfolio</header>
  <main class="page-main">
    <p>Le contenu peut être court ou long, le pied de page reste toujours en bas.</p>
  </main>
  <footer class="page-footer">&copy; 2026 — Tous droits réservés</footer>
</body>`,
        codeExampleCss: `.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
}

.page-header {
  padding: 1.2rem 2rem;
  background: #1a1a2e;
  color: white;
  font-weight: 700;
}

.page-main {
  flex: 1;
  padding: 2rem;
  background: #f6f7fb;
}

.page-footer {
  text-align: center;
  padding: 1.2rem;
  background: #1a1a2e;
  color: #cfd3e0;
  font-size: 0.9rem;
}`,
        hasEditor: true,
        missionPrompt:
          "Le pied de page ne colle pas en bas quand le contenu est court. Ajoute flex: 1; à la règle .page-main pour qu'elle occupe l'espace restant et pousse le footer vers le bas.",
        starterHtml: `<body class="page">
  <header class="page-header">Mon Portfolio</header>
  <main class="page-main">
    <p>Contenu court : observe où se trouve le footer.</p>
  </main>
  <footer class="page-footer">&copy; 2026 — Tous droits réservés</footer>
</body>`,
        starterCss: `.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  font-family: system-ui, sans-serif;
}

.page-header {
  padding: 1.2rem 2rem;
  background: #1a1a2e;
  color: white;
  font-weight: 700;
}

.page-main {
  padding: 2rem;
  background: #f6f7fb;
}

.page-footer {
  text-align: center;
  padding: 1.2rem;
  background: #1a1a2e;
  color: #cfd3e0;
  font-size: 0.9rem;
}`,
        validationRule: { type: "css-property", selector: ".page-main", property: "flex", value: "1" },
        hint: "flex: 1 sur l'élément central est la clé du pattern sticky footer : il absorbe tout l'espace vide restant.",
        xpReward: 100,
      },
    ],
    quiz: {
      title: "Quiz : Flexbox avancé : patterns réels",
      xpReward: 150,
      questions: [
        {
          question: "Que fait exactement le raccourci flex: 1 ?",
          choices: [
            "flex-grow: 1 uniquement",
            "flex-grow: 1; flex-shrink: 1; flex-basis: 0%",
            "flex-basis: 1px",
            "Il centre l'élément",
          ],
          correctIndex: 1,
          explanation: "flex: 1 est un raccourci qui combine les trois propriétés grow, shrink et basis.",
        },
        {
          question: "Dans le pattern sticky footer, quelle propriété fait que le footer reste collé en bas même avec peu de contenu ?",
          choices: [
            "position: fixed sur le footer",
            "flex: 1 sur l'élément principal (main), avec min-height: 100vh sur le conteneur",
            "margin-top: auto sur le header",
            "z-index élevé sur le footer",
          ],
          correctIndex: 1,
          explanation: "Le main qui s'étire (flex: 1) dans un conteneur d'au moins 100vh de haut pousse naturellement le footer en bas.",
        },
        {
          question: "Pourquoi des cartes dans un conteneur display: flex ont-elles souvent la même hauteur sans code supplémentaire ?",
          choices: [
            "Parce que align-items vaut stretch par défaut",
            "Parce que Flexbox force toujours une hauteur de 100vh",
            "Ce n'est pas vrai, il faut toujours écrire height: 100%",
            "Parce que flex-wrap l'impose",
          ],
          correctIndex: 0,
          explanation: "La valeur par défaut d'align-items est stretch : chaque enfant s'étire à la hauteur du plus grand.",
        },
        {
          question: "Que contrôle flex-shrink ?",
          choices: [
            "La vitesse d'une animation",
            "À quel point un élément accepte de rétrécir si l'espace manque",
            "La couleur de fond au survol",
            "Le nombre de colonnes d'une grille",
          ],
          correctIndex: 1,
          explanation: "flex-shrink détermine la capacité d'un élément flexible à rétrécir par rapport aux autres quand la place vient à manquer.",
        },
        {
          question: "Que représente flex-basis ?",
          choices: [
            "La couleur de base de l'élément",
            "La taille de départ de l'élément avant que grow ou shrink n'entrent en jeu",
            "Le nombre de fois où l'élément peut grandir",
            "La position verticale de l'élément",
          ],
          correctIndex: 1,
          explanation: "flex-basis fixe la taille initiale sur laquelle grow et shrink viennent ensuite s'appliquer.",
        },
      ],
    },
  },

  // 6. Grid avancé : layout de dashboard
  {
    slug: "grid-avance-dashboard",
    level: "advanced",
    title: "Grid avancé : layout de dashboard",
    description:
      "Construis une mise en page complexe façon tableau de bord professionnel avec des zones nommées et des grilles qui s'adaptent seules.",
    objective:
      "Créer un layout de dashboard avec grid-template-areas, minmax() et auto-fit pour une grille pleinement responsive.",
    icon: "📊",
    order: 6,
    lessons: [
      {
        slug: "grid-avance-dashboard",
        title: "Grid avancé : layout de dashboard",
        order: 1,
        summary:
          "Assemble une mise en page de tableau de bord avec des zones nommées et une grille de widgets responsive.",
        content: `Un tableau de bord (dashboard) typique combine une barre latérale, un en-tête, une zone principale et parfois une rangée de widgets. \`grid-template-areas\` permet de dessiner littéralement ce plan dans le CSS, en donnant un nom à chaque zone puis en les plaçant comme un schéma texte : chaque ligne de la grille devient une ligne de mots entre guillemets.

Cette technique rend le code extrêmement lisible : en regardant juste \`grid-template-areas\`, n'importe qui visualise instantanément la structure de la page, sans avoir à imaginer les lignes et colonnes numérotées.

## Des grilles qui s'adaptent seules

Pour une rangée de widgets dont le nombre peut varier, la combinaison \`repeat(auto-fit, minmax(200px, 1fr))\` est un classique incontournable. \`minmax(200px, 1fr)\` dit « chaque colonne fait au moins 200px, mais peut grandir pour occuper l'espace restant ». \`auto-fit\` calcule automatiquement combien de colonnes de cette taille tiennent sur une ligne, et les réorganise dès que l'écran change de largeur — sans écrire une seule media query.

Une nuance importante entre \`auto-fit\` et \`auto-fill\` : \`auto-fit\` étire les colonnes existantes pour combler l'espace vide, alors que \`auto-fill\` préfère garder des colonnes vides de la taille minimale plutôt que d'étirer les colonnes remplies. Dans la grande majorité des dashboards, \`auto-fit\` donne un rendu plus naturel.`,
        codeExampleHtml: `<div class="dashboard">
  <aside class="sidebar">Menu</aside>
  <header class="topbar">Tableau de bord</header>
  <main class="main-zone">Vue d'ensemble</main>
  <section class="widgets">
    <div class="widget">Ventes</div>
    <div class="widget">Visiteurs</div>
    <div class="widget">Conversions</div>
  </section>
</div>`,
        codeExampleCss: `.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar topbar"
    "sidebar main"
    "sidebar widgets";
  min-height: 100vh;
  font-family: system-ui, sans-serif;
}

.sidebar {
  grid-area: sidebar;
  background: #1a1a2e;
  color: white;
  padding: 1.5rem;
}

.topbar {
  grid-area: topbar;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e2e4ee;
  font-weight: 700;
}

.main-zone {
  grid-area: main;
  padding: 1.5rem;
  background: #f6f7fb;
}

.widgets {
  grid-area: widgets;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: #f6f7fb;
}

.widget {
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  font-weight: 600;
  color: #2f63ff;
}`,
        hasEditor: true,
        missionPrompt:
          "Les widgets sont affichés sur trois colonnes fixes de 200px, la grille ne s'adapte pas à la largeur de l'écran. Remplace la valeur de grid-template-columns de .widgets par repeat(auto-fit, minmax(200px, 1fr)).",
        starterHtml: `<div class="dashboard">
  <aside class="sidebar">Menu</aside>
  <header class="topbar">Tableau de bord</header>
  <main class="main-zone">Vue d'ensemble</main>
  <section class="widgets">
    <div class="widget">Ventes</div>
    <div class="widget">Visiteurs</div>
    <div class="widget">Conversions</div>
  </section>
</div>`,
        starterCss: `.dashboard {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "sidebar topbar"
    "sidebar main"
    "sidebar widgets";
  min-height: 100vh;
  font-family: system-ui, sans-serif;
}

.sidebar {
  grid-area: sidebar;
  background: #1a1a2e;
  color: white;
  padding: 1.5rem;
}

.topbar {
  grid-area: topbar;
  padding: 1rem 1.5rem;
  background: white;
  border-bottom: 1px solid #e2e4ee;
  font-weight: 700;
}

.main-zone {
  grid-area: main;
  padding: 1.5rem;
  background: #f6f7fb;
}

.widgets {
  grid-area: widgets;
  display: grid;
  grid-template-columns: 200px 200px 200px;
  gap: 1rem;
  padding: 1.5rem;
  background: #f6f7fb;
}

.widget {
  background: white;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  font-weight: 600;
  color: #2f63ff;
}`,
        validationRule: {
          type: "css-property",
          selector: ".widgets",
          property: "grid-template-columns",
          value: "repeat(auto-fit, minmax(200px, 1fr))",
        },
        hint: "Remplace les trois valeurs fixes par une seule instruction repeat(auto-fit, minmax(200px, 1fr)) qui calcule le nombre de colonnes toute seule.",
        xpReward: 105,
      },
    ],
    quiz: {
      title: "Quiz : Grid avancé : layout de dashboard",
      xpReward: 150,
      questions: [
        {
          question: "À quoi sert grid-template-areas ?",
          choices: [
            "À définir des couleurs de fond différentes par zone",
            "À nommer et dessiner visuellement l'agencement des zones de la grille",
            "À créer des animations sur la grille",
            "À limiter le nombre d'éléments enfants",
          ],
          correctIndex: 1,
          explanation: "grid-template-areas permet de représenter le plan de la page sous forme de schéma texte lisible.",
        },
        {
          question: "Que fait minmax(200px, 1fr) dans une colonne de grille ?",
          choices: [
            "La colonne fait exactement 200px puis 1fr en alternance",
            "La colonne fait au minimum 200px, et peut grandir jusqu'à occuper l'espace disponible",
            "La colonne est masquée en dessous de 200px",
            "Elle fixe la hauteur, pas la largeur",
          ],
          correctIndex: 1,
          explanation: "minmax() fixe une borne basse et une borne haute pour la taille d'une piste de la grille.",
        },
        {
          question: "Quelle est la différence entre auto-fit et auto-fill ?",
          choices: [
            "Il n'y a aucune différence",
            "auto-fit étire les colonnes existantes pour combler l'espace vide, auto-fill garde des colonnes vides",
            "auto-fill ne fonctionne que sur mobile",
            "auto-fit limite la grille à 2 colonnes maximum",
          ],
          correctIndex: 1,
          explanation: "auto-fit réduit à zéro les pistes vides et étire les colonnes restantes, contrairement à auto-fill.",
        },
        {
          question: "Pourquoi grid-template-areas rend-il le code plus lisible qu'un placement par numéros de lignes ?",
          choices: [
            "Parce qu'il est plus court à écrire dans tous les cas",
            "Parce que le schéma texte représente visuellement la disposition réelle des zones",
            "Parce qu'il n'utilise pas de guillemets",
            "Parce qu'il remplace flexbox",
          ],
          correctIndex: 1,
          explanation: "En lisant les lignes de grid-template-areas, on visualise directement le plan de la page.",
        },
        {
          question: "Quel avantage apporte repeat(auto-fit, minmax(200px, 1fr)) par rapport à des media queries classiques ?",
          choices: [
            "Il fonctionne uniquement en mode sombre",
            "Le nombre de colonnes s'adapte automatiquement sans écrire de media query",
            "Il empêche complètement le retour à la ligne",
            "Il ne fonctionne qu'avec exactement 3 éléments",
          ],
          correctIndex: 1,
          explanation: "La grille recalcule seule le nombre de colonnes possibles selon la largeur disponible, sans seuils fixes à gérer.",
        },
      ],
    },
  },

  // 7. Design systems et composants réutilisables
  {
    slug: "design-systems-composants",
    level: "advanced",
    title: "Design systems et composants réutilisables",
    description:
      "Construis un mini design system avec des variables CSS comme source unique de vérité pour tes couleurs, tes espacements et tes composants.",
    objective:
      "Définir des tokens de design en variables CSS et les réutiliser dans des composants comme .btn et .card.",
    icon: "🎨",
    order: 7,
    lessons: [
      {
        slug: "design-systems-composants",
        title: "Design systems et composants réutilisables",
        order: 1,
        summary:
          "Centralise tes couleurs et tes espacements en variables CSS pour construire des composants cohérents et réutilisables.",
        content: `Dans un vrai projet, la couleur principale d'une marque peut être utilisée à des dizaines d'endroits différents : boutons, liens, bordures, icônes. Si cette couleur est écrite en dur (\`#2f63ff\`) à chaque endroit, changer de teinte un jour devient un cauchemar. La solution professionnelle s'appelle un design system : un ensemble de valeurs de référence, appelées « tokens », définies une seule fois en variables CSS sur \`:root\`.

Un bon design system définit typiquement une échelle de couleurs (\`--color-primary\`, \`--color-secondary\`, \`--color-danger\`...), une échelle d'espacements cohérente (\`--space-sm\`, \`--space-md\`, \`--space-lg\`...) plutôt que des valeurs choisies au hasard, et parfois un rayon de bordure commun (\`--radius\`). Ces tokens deviennent la seule source de vérité : tous les composants les consomment via \`var(--color-primary)\`.

## Composants réutilisables

Une fois les tokens définis, on construit des classes de composants génériques comme \`.btn\`, \`.btn-secondary\`, ou \`.card\`, qui utilisent uniquement ces variables. L'avantage est énorme : changer une seule ligne dans \`:root\` met à jour instantanément toute l'interface, sans toucher au reste du CSS.

Le piège classique d'un débutant en design system : redéfinir une couleur à la main « juste pour cette fois » dans un composant, au lieu de créer un nouveau token ou de réutiliser un token existant. Cette exception casse la cohérence et revient tôt ou tard hanter le projet.`,
        codeExampleHtml: `<div class="demo">
  <button class="btn btn-primary">Valider</button>
  <button class="btn btn-secondary">Annuler</button>
  <div class="card">
    <h3>Composant carte</h3>
    <p>Toutes les valeurs viennent des variables du design system.</p>
  </div>
</div>`,
        codeExampleCss: `:root {
  --color-primary: #2f63ff;
  --color-secondary: #8b3dff;
  --color-text: #1a1a2e;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --radius: 12px;
}

.demo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  padding: var(--space-lg);
  font-family: system-ui, sans-serif;
}

.btn {
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary);
}

.btn-secondary {
  background-color: var(--color-secondary);
}

.card {
  width: 100%;
  padding: var(--space-lg);
  border-radius: var(--radius);
  background: white;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  color: var(--color-text);
}`,
        hasEditor: true,
        missionPrompt:
          "Le bouton secondaire utilise encore une couleur codée en dur. Remplace #8b3dff par var(--color-secondary) comme valeur de background-color dans la classe .btn-secondary.",
        starterHtml: `<div class="demo">
  <button class="btn btn-primary">Valider</button>
  <button class="btn btn-secondary">Annuler</button>
</div>`,
        starterCss: `:root {
  --color-primary: #2f63ff;
  --color-secondary: #8b3dff;
  --space-sm: 0.5rem;
  --space-lg: 2rem;
  --radius: 12px;
}

.demo {
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-lg);
  font-family: system-ui, sans-serif;
}

.btn {
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: var(--radius);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--color-primary);
}

.btn-secondary {
  background-color: #8b3dff;
}`,
        validationRule: {
          type: "css-property",
          selector: ".btn-secondary",
          property: "background-color",
          value: "var(--color-secondary)",
        },
        hint: "La variable existe déjà dans :root, il suffit de l'appeler avec var(--color-secondary) au lieu du code couleur.",
        xpReward: 100,
      },
    ],
    quiz: {
      title: "Quiz : Design systems et composants réutilisables",
      xpReward: 150,
      questions: [
        {
          question: "Qu'est-ce qu'un « token » de design ?",
          choices: [
            "Un mot de passe secret du projet",
            "Une valeur de référence (couleur, espacement...) définie une seule fois et réutilisée partout",
            "Un composant JavaScript",
            "Une balise HTML spéciale",
          ],
          correctIndex: 1,
          explanation: "Un token centralise une valeur de design pour éviter de la répéter en dur à chaque endroit du code.",
        },
        {
          question: "Quel est le principal avantage de centraliser les couleurs en variables CSS sur :root ?",
          choices: [
            "Le site charge plus vite",
            "Changer une seule ligne met à jour la couleur partout où elle est utilisée",
            "Cela supprime le besoin de fichiers CSS",
            "Cela fonctionne uniquement avec Flexbox",
          ],
          correctIndex: 1,
          explanation: "Les variables CSS deviennent une source unique de vérité : un seul changement se propage partout.",
        },
        {
          question: "Pourquoi éviter de redéfinir une couleur en dur « juste pour cette fois » dans un composant ?",
          choices: [
            "Parce que c'est interdit par le navigateur",
            "Parce que ça casse la cohérence du design system et complique la maintenance future",
            "Parce que ça ralentit le CSS",
            "Ce n'est pas un problème, c'est même recommandé",
          ],
          correctIndex: 1,
          explanation: "Une exception ponctuelle finit toujours par désynchroniser un composant du reste du design system.",
        },
        {
          question: "Qu'est-ce qu'une échelle d'espacements cohérente comme --space-sm, --space-md, --space-lg apporte ?",
          choices: [
            "Un rythme visuel harmonieux entre tous les composants du site",
            "Une réduction automatique de la taille des images",
            "Une accélération du chargement des polices",
            "Rien de particulier, c'est juste une convention de nommage",
          ],
          correctIndex: 0,
          explanation: "Utiliser un jeu limité d'espacements prédéfinis évite les valeurs incohérentes choisies au hasard.",
        },
        {
          question: "Comment un composant .card consomme-t-il un token de couleur défini dans :root ?",
          choices: [
            "En recopiant sa valeur hexadécimale",
            "Avec la fonction var(), par exemple color: var(--color-text)",
            "En important un fichier JavaScript",
            "Ce n'est pas possible entre :root et une classe",
          ],
          correctIndex: 1,
          explanation: "La fonction var() permet à n'importe quelle règle CSS de lire la valeur d'une variable définie ailleurs.",
        },
      ],
    },
  },

  // 8. Accessibilité web (WCAG) pour créateurs
  {
    slug: "accessibilite-web-wcag",
    level: "advanced",
    title: "Accessibilité web (WCAG) pour créateurs",
    description:
      "Apprends les bases des normes WCAG pour créer des sites que tout le monde peut utiliser, y compris les personnes en situation de handicap.",
    objective:
      "Appliquer les fondamentaux d'accessibilité : contraste suffisant, focus visible, texte alternatif et attributs aria.",
    icon: "♿",
    order: 8,
    lessons: [
      {
        slug: "accessibilite-web-wcag",
        title: "Accessibilité web (WCAG) pour créateurs",
        order: 1,
        summary:
          "Les quatre réflexes d'accessibilité indispensables : contraste, focus visible, alt et aria-label.",
        content: `Les WCAG (Web Content Accessibility Guidelines) sont les règles internationales de référence pour rendre le web utilisable par tout le monde : personnes malvoyantes, daltoniennes, à mobilité réduite, ou naviguant uniquement au clavier. En tant que créateur, tu n'as pas besoin de tout mémoriser, mais quelques réflexes couvrent déjà une grande partie des besoins réels.

Le contraste des couleurs d'abord : un texte gris clair sur fond blanc peut sembler élégant, mais devient illisible pour une personne malvoyante. Les WCAG recommandent un ratio de contraste minimum de 4.5:1 entre le texte et son fond pour un texte normal.

Ensuite, le focus visible : quand une personne navigue au clavier avec la touche Tab, elle doit voir clairement quel élément est actuellement sélectionné. Ne jamais faire \`outline: none;\` sans le remplacer par un autre style de focus visible, sinon les utilisateurs au clavier naviguent à l'aveugle.

## Décrire ce qu'on ne voit pas

Chaque image porteuse de sens doit avoir un attribut \`alt\` qui la décrit, pour les personnes utilisant un lecteur d'écran. Et pour les boutons composés uniquement d'une icône, sans texte visible (une croix pour fermer une fenêtre, par exemple), l'attribut \`aria-label\` fournit le texte manquant que le lecteur d'écran va annoncer, comme \`aria-label="Fermer la fenêtre"\`.

Un dernier conseil : l'accessibilité n'est pas une case à cocher une fois le site fini, c'est une habitude à intégrer dès l'écriture du HTML — utiliser les bonnes balises sémantiques (vu dans un cours précédent) en fait d'ailleurs déjà partie.`,
        codeExampleHtml: `<div class="modal">
  <button class="close-btn" aria-label="Fermer la fenêtre">&times;</button>
  <img src="illustration-accueil.jpg" alt="Illustration d'une équipe travaillant sur un ordinateur portable" />
  <h2>Bienvenue</h2>
  <button class="cta-btn">Continuer</button>
</div>`,
        codeExampleCss: `.modal {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: system-ui, sans-serif;
  position: relative;
  text-align: center;
}

.modal img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.close-btn {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #f6f7fb;
  color: #1a1a2e;
  font-size: 1.2rem;
  cursor: pointer;
}

.close-btn:focus-visible {
  outline: 3px solid #2f63ff;
  outline-offset: 2px;
}

.cta-btn {
  padding: 0.7rem 1.6rem;
  border: none;
  border-radius: 999px;
  background: #2f63ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.cta-btn:focus-visible {
  outline: 3px solid #8b3dff;
  outline-offset: 2px;
}`,
        hasEditor: true,
        missionPrompt:
          "Le bouton de fermeture ne contient qu'un symbole ×, sans texte compréhensible pour un lecteur d'écran. Ajoute-lui l'attribut aria-label=«Fermer la fenêtre».",
        starterHtml: `<div class="modal">
  <button class="close-btn">&times;</button>
  <h2>Bienvenue</h2>
  <p>Merci de votre visite !</p>
</div>`,
        starterCss: `.modal {
  max-width: 360px;
  margin: 2rem auto;
  padding: 1.5rem;
  border-radius: 14px;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: system-ui, sans-serif;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #f6f7fb;
  color: #1a1a2e;
  font-size: 1.2rem;
  cursor: pointer;
}

.close-btn:focus-visible {
  outline: 3px solid #2f63ff;
  outline-offset: 2px;
}`,
        validationRule: { type: "contains-html", snippet: 'aria-label="Fermer la fenêtre"' },
        hint: "Ajoute directement dans la balise <button> : aria-label=\"Fermer la fenêtre\".",
        xpReward: 105,
      },
    ],
    quiz: {
      title: "Quiz : Accessibilité web (WCAG) pour créateurs",
      xpReward: 150,
      questions: [
        {
          question: "Que signifie l'acronyme WCAG ?",
          choices: [
            "Web Component Automatic Generation",
            "Web Content Accessibility Guidelines",
            "Website Color and Graphics",
            "Web CSS Advanced Grid",
          ],
          correctIndex: 1,
          explanation: "Les WCAG sont les recommandations internationales de référence pour l'accessibilité web.",
        },
        {
          question: "Pourquoi ne faut-il jamais écrire outline: none sans le remplacer par autre chose ?",
          choices: [
            "Parce que ça ralentit le site",
            "Parce que les personnes naviguant au clavier perdent toute indication de l'élément actuellement sélectionné",
            "Parce que ça change la couleur du texte",
            "Ce n'est pas un problème d'accessibilité",
          ],
          correctIndex: 1,
          explanation: "Le focus visible est indispensable pour les utilisateurs qui naviguent au clavier plutôt qu'à la souris.",
        },
        {
          question: "À quoi sert l'attribut alt sur une balise <img> ?",
          choices: [
            "À afficher une info-bulle au survol de la souris",
            "À décrire l'image pour les personnes utilisant un lecteur d'écran",
            "À redimensionner automatiquement l'image",
            "À accélérer le chargement de la page",
          ],
          correctIndex: 1,
          explanation: "Un lecteur d'écran lit le contenu de alt à voix haute lorsqu'il rencontre une image.",
        },
        {
          question: "Quand utilise-t-on aria-label sur un bouton ?",
          choices: [
            "Toujours, sur tous les boutons sans exception",
            "Quand le bouton n'a pas de texte visible compréhensible, par exemple une simple icône",
            "Uniquement sur les liens, jamais sur les boutons",
            "Pour changer la couleur du bouton",
          ],
          correctIndex: 1,
          explanation: "aria-label fournit un texte accessible pour un lecteur d'écran quand aucun texte visible ne décrit déjà l'action.",
        },
        {
          question: "Quel ratio de contraste minimum les WCAG recommandent-elles pour un texte normal ?",
          choices: ["1:1", "2:1", "4.5:1", "10:1"],
          correctIndex: 2,
          explanation: "Un ratio d'au moins 4.5:1 entre le texte et son fond est la recommandation standard pour un texte de taille normale.",
        },
      ],
    },
  },

  // 9. Optimisation et bonnes pratiques
  {
    slug: "optimisation-bonnes-pratiques",
    level: "advanced",
    title: "Optimisation et bonnes pratiques",
    description:
      "Adopte les réflexes d'un développeur senior pour écrire un CSS organisé, performant et facile à faire évoluer sur le long terme.",
    objective:
      "Organiser son CSS, éviter les sélecteurs trop spécifiques et animer avec des propriétés performantes comme transform et opacity.",
    icon: "⚡",
    order: 9,
    lessons: [
      {
        slug: "optimisation-bonnes-pratiques",
        title: "Optimisation et bonnes pratiques",
        order: 1,
        summary:
          "Les habitudes qui distinguent un CSS de débutant d'un CSS professionnel : organisation, spécificité et performance.",
        content: `Un CSS professionnel n'est pas seulement un CSS qui fonctionne, c'est un CSS que quelqu'un d'autre peut reprendre facilement. La première habitude à prendre : organiser ses règles par zones logiques (variables globales, éléments de base, composants, utilitaires), avec des commentaires courts qui séparent les sections, plutôt que d'empiler les règles dans l'ordre où elles te sont venues à l'esprit.

## Éviter la guerre de spécificité

Un sélecteur trop précis, comme \`#page .content div.card > p.title\`, devient très difficile à surcharger plus tard : n'importe quelle autre règle doit être encore plus spécifique pour le battre, ce qui pousse à ajouter toujours plus de sélecteurs en cascade. La bonne pratique consiste à préférer des classes simples et plates, comme \`.card-title\`, et à réserver les identifiants (\`#id\`) à des usages exceptionnels (jamais pour du style).

## Les propriétés qui n'abîment pas les performances

Toutes les propriétés CSS ne coûtent pas le même prix à animer. Changer \`width\`, \`height\`, \`top\` ou \`left\` oblige le navigateur à recalculer toute la mise en page (le fameux « reflow »), ce qui peut saccader l'animation, surtout sur des appareils moins puissants. En revanche, \`transform\` et \`opacity\` peuvent être animés directement par la carte graphique, sans recalcul de mise en page : c'est pour ça qu'un développeur professionnel préfère toujours \`transform: translateX(300px)\` à \`left: 300px\` pour déplacer un élément.

Retiens cette règle simple : si tu dois déplacer, redimensionner ou faire pivoter un élément dans une animation, pense d'abord à \`transform\`. Réserve les changements de \`width\`/\`height\`/\`top\`/\`left\` aux cas où \`transform\` ne suffit vraiment pas.`,
        codeExampleHtml: `<div class="track">
  <div class="box"></div>
</div>`,
        codeExampleCss: `.track {
  position: relative;
  width: 100%;
  height: 80px;
  background: #f6f7fb;
  border-radius: 12px;
  overflow: hidden;
}

.box {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2f63ff, #22d3ee);
  animation: slide 2s ease-in-out infinite alternate;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(300px);
  }
}`,
        hasEditor: true,
        missionPrompt:
          "L'animation actuelle déplace la boîte en changeant left, ce qui est coûteux en performance. Remplace to { left: 300px; } par to { transform: translateX(300px); } dans le @keyframes.",
        starterHtml: `<div class="track">
  <div class="box"></div>
</div>`,
        starterCss: `.track {
  position: relative;
  width: 100%;
  height: 80px;
  background: #f6f7fb;
  border-radius: 12px;
  overflow: hidden;
}

.box {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2f63ff, #22d3ee);
  animation: slide 2s ease-in-out infinite alternate;
}

@keyframes slide {
  from {
    left: 20px;
  }
  to {
    left: 300px;
  }
}`,
        validationRule: { type: "contains-css", snippet: "transform: translateX(300px)" },
        hint: "Dans l'étape to du @keyframes, remplace left: 300px; par transform: translateX(300px);",
        xpReward: 100,
      },
    ],
    quiz: {
      title: "Quiz : Optimisation et bonnes pratiques",
      xpReward: 150,
      questions: [
        {
          question: "Pourquoi organiser son CSS en sections (variables, base, composants, utilitaires) ?",
          choices: [
            "Pour que le fichier soit plus lourd",
            "Pour que n'importe qui puisse retrouver rapidement une règle et comprendre la structure du projet",
            "Parce que le navigateur l'exige",
            "Pour éviter d'utiliser des classes",
          ],
          correctIndex: 1,
          explanation: "Une organisation claire rend le code maintenable par toute une équipe, pas seulement par son auteur d'origine.",
        },
        {
          question: "Pourquoi un sélecteur comme #page .content div.card > p.title pose-t-il problème ?",
          choices: [
            "Il est trop court pour être valide",
            "Sa spécificité très élevée rend le style difficile à surcharger plus tard",
            "Il ne fonctionne que sur Chrome",
            "Il ralentit le chargement des images",
          ],
          correctIndex: 1,
          explanation: "Plus un sélecteur est spécifique, plus il faut un sélecteur encore plus lourd pour le remplacer ensuite.",
        },
        {
          question: "Pourquoi préfère-t-on transform: translateX() à left pour déplacer un élément en animation ?",
          choices: [
            "Parce que left ne fonctionne pas dans les @keyframes",
            "Parce que transform peut être géré par la carte graphique sans recalcul de mise en page",
            "Parce que translateX est plus court à écrire",
            "Il n'y a aucune différence de performance",
          ],
          correctIndex: 1,
          explanation: "Modifier left force un reflow (recalcul de la mise en page), alors que transform évite ce coût.",
        },
        {
          question: "Quelle propriété, comme transform, peut aussi être animée sans coût de reflow ?",
          choices: ["width", "opacity", "margin", "top"],
          correctIndex: 1,
          explanation: "opacity, comme transform, peut être traitée directement par la carte graphique lors d'une animation.",
        },
        {
          question: "Quand est-il raisonnable d'utiliser un sélecteur par identifiant (#id) pour du style ?",
          choices: [
            "Systématiquement, pour tous les composants",
            "Pratiquement jamais : les classes suffisent presque toujours et restent plus faciles à surcharger",
            "Uniquement dans le <head>",
            "Seulement pour les animations",
          ],
          correctIndex: 1,
          explanation: "Les identifiants ont une spécificité très élevée qui complique la maintenance ; les classes sont préférées en pratique.",
        },
      ],
    },
  },

  // 10. Projet final : Deviens Web Creator
  {
    slug: "projet-final-web-creator",
    level: "advanced",
    title: "Projet final : Deviens Web Creator",
    description:
      "Le grand projet de fin de parcours : assemble tout ce que tu as appris pour construire une section hero digne d'un vrai site professionnel.",
    objective:
      "Combiner structure sémantique, variables, mise en page moderne et animations dans une seule section hero complète.",
    icon: "🚀",
    order: 10,
    lessons: [
      {
        slug: "projet-final-web-creator",
        title: "Projet final : Deviens Web Creator",
        order: 1,
        summary:
          "Le projet final : construis une section hero professionnelle en combinant toutes les techniques avancées apprises.",
        content: `Te voilà arrivé au dernier module du parcours avancé. Tu as appris à structurer une page sémantiquement, à créer des tailles fluides, à animer avec précision, à construire des mises en page Flexbox et Grid complexes, à organiser un design system, à penser accessibilité et performance. Le moment est venu de tout rassembler dans une seule pièce maîtresse : la section « hero », la toute première chose que voit un visiteur sur un site professionnel.

Un hero réussi combine plusieurs techniques que tu maîtrises déjà séparément : une structure sémantique propre (\`<header>\`, \`<main>\`, une \`<section class="hero">\` à l'intérieur), des couleurs et espacements pilotés par des variables CSS de design system, une typographie fluide avec \`clamp()\`, une mise en page centrée avec Flexbox ou Grid, et un bouton d'action dont le survol est animé avec une transition soignée.

## Ta mission

Ce cours te propose un hero déjà largement construit : dégradé de fond, titre fluide, disposition centrée. Il ne lui manque qu'une dernière touche professionnelle, celle qui distingue un site figé d'un site vivant : une transition sur le bouton d'appel à l'action, pour qu'il réagisse avec douceur au survol plutôt que de changer brutalement.

Une fois cette mission réussie, tu obtiens ton certificat CodeKids niveau avancé. Mais le vrai objectif dépasse ce badge : tu as maintenant tous les outils pour construire, seul, un site personnel complet, du premier \`<!DOCTYPE html>\` jusqu'au moindre détail d'interaction. Continue à observer les sites que tu aimes, à inspecter leur code, et surtout à construire les tiens : c'est ainsi que naissent les vrais web creators.`,
        codeExampleHtml: `<header class="site-header">
  <p class="logo">Aria Studio</p>
</header>

<main>
  <section class="hero">
    <h1>Des sites qui marquent les esprits</h1>
    <p>Design moderne, code propre, expérience soignée du premier pixel au dernier clic.</p>
    <button class="hero-btn">Voir mes projets</button>
  </section>
</main>`,
        codeExampleCss: `:root {
  --color-primary: #2f63ff;
  --color-secondary: #8b3dff;
  --space-md: 1rem;
  --space-lg: 2rem;
  --radius: 999px;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.site-header {
  padding: var(--space-md) var(--space-lg);
  background: #1a1a2e;
  color: white;
}

.logo {
  margin: 0;
  font-weight: 700;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
  padding: clamp(3rem, 8vw, 6rem) var(--space-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
}

.hero h1 {
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  margin: 0;
  max-width: 18ch;
}

.hero p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 46ch;
  opacity: 0.9;
}

.hero-btn {
  padding: 0.9rem 2.2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
  background: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.hero-btn:hover {
  transform: translateY(-3px);
}`,
        hasEditor: true,
        missionPrompt:
          "Le bouton du hero change de position au survol, mais brutalement, sans transition. Ajoute transition: transform 0.2s ease; à la règle .hero-btn pour un effet fluide et professionnel.",
        starterHtml: `<header class="site-header">
  <p class="logo">Aria Studio</p>
</header>

<main>
  <section class="hero">
    <h1>Des sites qui marquent les esprits</h1>
    <p>Design moderne, code propre, expérience soignée du premier pixel au dernier clic.</p>
    <button class="hero-btn">Voir mes projets</button>
  </section>
</main>`,
        starterCss: `:root {
  --color-primary: #2f63ff;
  --color-secondary: #8b3dff;
  --space-md: 1rem;
  --space-lg: 2rem;
  --radius: 999px;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.site-header {
  padding: var(--space-md) var(--space-lg);
  background: #1a1a2e;
  color: white;
}

.logo {
  margin: 0;
  font-weight: 700;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
  padding: clamp(3rem, 8vw, 6rem) var(--space-lg);
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: white;
}

.hero h1 {
  font-size: clamp(1.8rem, 5vw, 3.2rem);
  margin: 0;
  max-width: 18ch;
}

.hero p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  max-width: 46ch;
  opacity: 0.9;
}

.hero-btn {
  padding: 0.9rem 2.2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
  background: white;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
}

.hero-btn:hover {
  transform: translateY(-3px);
}`,
        validationRule: {
          type: "css-property",
          selector: ".hero-btn",
          property: "transition",
          value: "transform 0.2s ease",
        },
        hint: "Ajoute simplement transition: transform 0.2s ease; dans la règle .hero-btn, avant ou après les autres propriétés.",
        xpReward: 150,
      },
    ],
    quiz: {
      title: "Quiz : Projet final : Deviens Web Creator",
      xpReward: 200,
      questions: [
        {
          question: "Dans une section hero professionnelle, pourquoi utiliser clamp() pour le titre plutôt qu'une taille fixe ?",
          choices: [
            "Pour que le titre soit toujours en majuscules",
            "Pour que la taille du texte s'adapte fluidement entre un minimum et un maximum selon l'écran",
            "Parce que clamp() est plus rapide à taper",
            "Pour désactiver le survol du bouton",
          ],
          correctIndex: 1,
          explanation: "clamp() garde une taille lisible sur mobile tout en laissant le titre grandir sur grand écran, sans media query.",
        },
        {
          question: "Pourquoi piloter les couleurs du hero avec des variables CSS plutôt qu'en dur ?",
          choices: [
            "Pour respecter le design system et pouvoir changer la palette en un seul endroit",
            "Parce que les variables CSS sont obligatoires en HTML5",
            "Pour empêcher l'utilisateur de survoler le bouton",
            "Cela n'a aucun avantage réel",
          ],
          correctIndex: 0,
          explanation: "Les variables centralisent les tokens de couleur, cohérentes avec le reste du design system appris précédemment.",
        },
        {
          question: "Quelle technique évite un mouvement brutal quand on survole le bouton du hero ?",
          choices: [
            "Ajouter une transition sur la propriété transform",
            "Supprimer la propriété cursor",
            "Augmenter la taille de la police",
            "Utiliser grid-template-areas",
          ],
          correctIndex: 0,
          explanation: "Sans transition, un changement de transform au survol s'applique instantanément et semble saccadé.",
        },
        {
          question: "Pourquoi structurer le hero avec <section class=«hero»> à l'intérieur de <main> plutôt qu'avec une simple <div> ?",
          choices: [
            "Parce que <div> n'existe plus en HTML5",
            "Pour garder une structure sémantique cohérente, comme vu dans le premier cours du parcours avancé",
            "Parce que <section> charge plus vite qu'une <div>",
            "Cela n'a aucune importance",
          ],
          correctIndex: 1,
          explanation: "La sémantique HTML apprise au début du parcours avancé s'applique aussi à la construction du projet final.",
        },
        {
          question: "Quel est l'objectif principal du projet final du parcours avancé ?",
          choices: [
            "Mémoriser tous les codes couleurs hexadécimaux",
            "Combiner les techniques apprises pour construire une interface complète et cohérente",
            "Apprendre un nouveau langage de programmation",
            "Créer uniquement des animations, sans HTML",
          ],
          correctIndex: 1,
          explanation: "Le projet final réunit structure, design system, mise en page et interactions dans un seul résultat concret.",
        },
      ],
    },
  },
];
