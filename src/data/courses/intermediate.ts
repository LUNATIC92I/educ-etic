import type { SeedCourse } from "./types";

export const intermediateCourses: SeedCourse[] = [
  {
    slug: "css-avance-selecteurs-cascade",
    level: "intermediate",
    title: "CSS avancé : sélecteurs et cascade",
    description:
      "Apprends à cibler précisément tes éléments HTML grâce à des sélecteurs CSS plus puissants.",
    objective:
      "Utiliser les sélecteurs combinés et les pseudo-classes pour styliser des éléments avec précision.",
    icon: "🎯",
    order: 1,
    lessons: [
      {
        slug: "css-avance-selecteurs-cascade",
        title: "CSS avancé : sélecteurs et cascade",
        order: 1,
        summary:
          "Découvre les sélecteurs combinés et les pseudo-classes pour cibler précisément tes éléments.",
        content: `Jusqu'ici, tu as stylisé des éléments grâce à leur balise, leur classe ou leur identifiant. Mais en vrai, les pages web ont besoin de sélecteurs plus malins pour cibler exactement le bon élément, sans devoir ajouter une classe partout !

## Sélecteurs combinés et pseudo-classes

Le sélecteur descendant \`.carte p\` cible tous les \`<p>\` à l'intérieur d'un élément \`.carte\`, même imbriqués profondément, alors que \`.carte > p\` ne cible que les \`<p>\` juste à l'intérieur, pas ceux cachés dans une autre balise. Une pseudo-classe comme \`:hover\` va encore plus loin : elle permet de changer le style d'un élément quand la souris passe dessus, sans une seule ligne de JavaScript !

Quand plusieurs règles CSS s'appliquent au même élément, le navigateur doit choisir laquelle gagne : c'est la cascade. Une règle avec une classe (\`.carte\`) est plus spécifique qu'une règle avec juste une balise (\`div\`), et un identifiant (\`#header\`) est encore plus fort qu'une classe. Retiens l'ordre : balise < classe < identifiant.

En cas d'égalité parfaite de spécificité, c'est simplement la règle écrite en dernier dans le fichier CSS qui l'emporte. C'est pour ça que l'ordre de tes règles compte aussi !`,
        codeExampleHtml: `<div class="carte">
  <h3 class="titre">Potion magique</h3>
  <p>Survole-moi pour voir la magie opérer !</p>
</div>`,
        codeExampleCss: `.carte {
  background-color: #ffffff;
  border: 2px solid #2f63ff;
  border-radius: 12px;
  padding: 20px;
  width: 240px;
  font-family: sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.carte:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 20px rgba(139, 61, 255, 0.3);
  background-color: #eaf0ff;
}

.titre {
  color: #8b3dff;
  margin-top: 0;
}

.carte > p {
  color: #444444;
  font-size: 15px;
}`,
        hasEditor: true,
        missionPrompt:
          "Ajoute une règle .carte:hover qui change la couleur de fond en #eaf0ff quand la souris survole la carte.",
        starterHtml: `<div class="carte">
  <h3 class="titre">Potion magique</h3>
  <p>Survole-moi pour voir la magie opérer !</p>
</div>`,
        starterCss: `.carte {
  background-color: #ffffff;
  border: 2px solid #2f63ff;
  border-radius: 12px;
  padding: 20px;
  width: 240px;
  font-family: sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.titre {
  color: #8b3dff;
  margin-top: 0;
}

.carte > p {
  color: #444444;
  font-size: 15px;
}`,
        validationRule: {
          type: "css-property",
          selector: ".carte:hover",
          property: "background-color",
          value: "#eaf0ff",
        },
        hint: "Pense à écrire .carte:hover { } et à mettre la propriété background-color à l'intérieur.",
        xpReward: 70,
      },
    ],
    quiz: {
      title: "Quiz : CSS avancé : sélecteurs et cascade",
      xpReward: 120,
      questions: [
        {
          question: "Que cible le sélecteur .carte p ?",
          choices: [
            "Seulement les <p> directement dans .carte",
            "Tous les <p> à l'intérieur de .carte, même imbriqués profondément",
            "Seulement l'élément avec la classe carte",
            "Les <p> qui suivent .carte",
          ],
          correctIndex: 1,
          explanation:
            "Le sélecteur descendant (espace) cible tous les descendants, peu importe la profondeur.",
        },
        {
          question:
            "Quelle pseudo-classe permet de styliser un élément quand la souris passe dessus ?",
          choices: [":focus", ":hover", ":active", ":visited"],
          correctIndex: 1,
          explanation:
            ":hover s'applique tant que le curseur est au-dessus de l'élément.",
        },
        {
          question:
            "Entre un sélecteur de balise (div) et un sélecteur de classe (.carte), lequel est le plus spécifique ?",
          choices: [
            "div",
            ".carte",
            "Ils ont la même spécificité",
            "Cela dépend de l'ordre d'écriture",
          ],
          correctIndex: 1,
          explanation: "Une classe est toujours plus spécifique qu'une simple balise.",
        },
        {
          question: "Que fait le sélecteur .titre > p ?",
          choices: [
            "Cible tous les p descendants de .titre",
            "Cible uniquement les p enfants directs de .titre",
            "Cible le p juste après .titre",
            "Cible .titre uniquement",
          ],
          correctIndex: 1,
          explanation:
            "Le symbole > sélectionne uniquement les enfants directs, pas les descendants plus profonds.",
        },
        {
          question:
            "Si deux règles CSS ont exactement la même spécificité, laquelle s'applique ?",
          choices: [
            "La première écrite dans le fichier",
            "La dernière écrite dans le fichier",
            "Celle qui a le plus de mots",
            "Aucune ne s'applique",
          ],
          correctIndex: 1,
          explanation:
            "À spécificité égale, la cascade favorise la règle déclarée en dernier.",
        },
      ],
    },
  },
  {
    slug: "navigation-flexbox",
    level: "intermediate",
    title: "Construire une navigation avec Flexbox",
    description:
      "Découvre Flexbox pour aligner facilement les liens de ton menu de navigation, comme sur les vrais sites web.",
    objective:
      "Utiliser display: flex, justify-content et align-items pour construire une barre de navigation horizontale.",
    icon: "🧭",
    order: 2,
    lessons: [
      {
        slug: "navigation-flexbox",
        title: "Construire une navigation avec Flexbox",
        order: 1,
        summary:
          "Utilise Flexbox pour aligner un logo et des liens dans une barre de navigation.",
        content: `Regarde n'importe quel site web sérieux : en haut, il y a presque toujours une barre de navigation avec un logo à gauche et des liens bien alignés. Avant Flexbox, aligner des éléments côte à côte proprement était un vrai casse-tête. Aujourd'hui, c'est facile !

## display: flex et l'alignement

Quand tu ajoutes \`display: flex;\` à un conteneur, tous ses enfants directs se placent automatiquement en ligne, prêts à être alignés. La propriété \`justify-content\` contrôle ensuite l'espacement horizontal : \`space-between\` pousse les éléments aux extrémités avec de l'espace au milieu, \`center\` centre tout, \`flex-end\` colle tout à droite.

Pour l'alignement vertical, utilise \`align-items\`. La valeur \`center\` est parfaite pour une barre de navigation : elle garantit que le logo et les liens restent parfaitement alignés au milieu, même s'ils n'ont pas la même hauteur.

Avec ces trois propriétés seulement, tu peux construire la barre de navigation de n'importe quel site professionnel !`,
        codeExampleHtml: `<nav class="navbar">
  <div class="logo">CodeKids</div>
  <ul class="liens">
    <li><a href="#">Accueil</a></li>
    <li><a href="#">Cours</a></li>
    <li><a href="#">Profil</a></li>
  </ul>
</nav>`,
        codeExampleCss: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f63ff;
  padding: 16px 24px;
  border-radius: 10px;
}

.logo {
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
  font-family: sans-serif;
}

.liens {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.liens a {
  color: #ffffff;
  text-decoration: none;
  font-family: sans-serif;
}

.liens a:hover {
  color: #ffe066;
}`,
        hasEditor: true,
        missionPrompt:
          "Ajoute display: flex à la classe .navbar pour aligner le logo et les liens sur une seule ligne.",
        starterHtml: `<nav class="navbar">
  <div class="logo">CodeKids</div>
  <ul class="liens">
    <li><a href="#">Accueil</a></li>
    <li><a href="#">Cours</a></li>
    <li><a href="#">Profil</a></li>
  </ul>
</nav>`,
        starterCss: `.navbar {
  justify-content: space-between;
  align-items: center;
  background-color: #2f63ff;
  padding: 16px 24px;
  border-radius: 10px;
}

.logo {
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
  font-family: sans-serif;
}

.liens {
  display: flex;
  gap: 20px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.liens a {
  color: #ffffff;
  text-decoration: none;
  font-family: sans-serif;
}

.liens a:hover {
  color: #ffe066;
}`,
        validationRule: {
          type: "css-property",
          selector: ".navbar",
          property: "display",
          value: "flex",
        },
        hint: "La propriété display: flex; transforme .navbar en conteneur flexible.",
        xpReward: 65,
      },
    ],
    quiz: {
      title: "Quiz : Construire une navigation avec Flexbox",
      xpReward: 120,
      questions: [
        {
          question: "Que fait display: flex sur un conteneur ?",
          choices: [
            "Il cache ses enfants",
            "Il place ses enfants directs en ligne, prêts à être alignés",
            "Il transforme le conteneur en tableau",
            "Il supprime les marges de la page",
          ],
          correctIndex: 1,
          explanation:
            "display: flex active le mode flexbox, qui aligne les enfants en ligne (ou colonne) facilement.",
        },
        {
          question:
            "Quelle propriété contrôle l'alignement horizontal des éléments dans un flex container ?",
          choices: ["align-items", "flex-direction", "justify-content", "text-align"],
          correctIndex: 2,
          explanation:
            "justify-content gère la répartition horizontale sur l'axe principal (par défaut horizontal).",
        },
        {
          question:
            "Quelle valeur de justify-content pousse les éléments aux deux extrémités avec de l'espace entre eux ?",
          choices: ["center", "flex-start", "space-between", "flex-end"],
          correctIndex: 2,
          explanation:
            "space-between colle le premier élément à gauche, le dernier à droite, et répartit l'espace au milieu.",
        },
        {
          question:
            "Quelle propriété utilise-t-on pour centrer verticalement les éléments dans une barre flex ?",
          choices: ["justify-content", "align-items", "vertical-align", "margin"],
          correctIndex: 1,
          explanation:
            "align-items: center centre les enfants sur l'axe transversal (vertical par défaut).",
        },
        {
          question: "Dans l'exemple, à quoi sert display: flex sur .liens ?",
          choices: [
            "À cacher les liens",
            "À aligner les <li> horizontalement avec un espace régulier",
            "À agrandir la police",
            "À centrer la page entière",
          ],
          correctIndex: 1,
          explanation:
            "Appliqué à la liste, flex aligne les <li> côte à côte, et gap ajoute l'espace entre eux.",
        },
      ],
    },
  },
  {
    slug: "cartes-sections-flexbox",
    level: "intermediate",
    title: "Cartes et sections avec Flexbox",
    description:
      "Apprends à organiser plusieurs cartes en ligne, avec un bel espacement, grâce à flex-wrap et gap.",
    objective:
      "Utiliser flex-wrap et gap pour construire une rangée de cartes responsive.",
    icon: "🗂️",
    order: 3,
    lessons: [
      {
        slug: "cartes-sections-flexbox",
        title: "Cartes et sections avec Flexbox",
        order: 1,
        summary: "Organise plusieurs cartes en ligne avec flex-wrap et gap.",
        content: `Après la navigation, attaquons un autre grand classique du web : une rangée de cartes, comme des fiches produits ou des articles de blog. On veut qu'elles soient alignées, bien espacées, et qu'elles s'adaptent même si l'écran est petit.

## flex-wrap et gap

Par défaut, Flexbox essaie de faire tenir tous les éléments sur une seule ligne, quitte à les écraser. En ajoutant \`flex-wrap: wrap;\`, tu autorises les éléments à passer à la ligne suivante quand il n'y a plus de place, ce qui est essentiel pour rester beau sur mobile. Pour l'espacement, la propriété \`gap\` définit un espacement uniforme entre toutes les cartes, sans marges à calculer sur chaque élément.

En combinant \`display: flex\`, \`flex-wrap: wrap\` et \`gap\`, tu obtiens une rangée de cartes simple à faire et à maintenir, qui s'adapte automatiquement à la largeur de l'écran.

C'est exactement la technique utilisée par la plupart des sites de e-commerce pour afficher leurs produits !`,
        codeExampleHtml: `<div class="cartes">
  <div class="carte">🎨<h4>Design</h4></div>
  <div class="carte">💻<h4>Code</h4></div>
  <div class="carte">🚀<h4>Projets</h4></div>
</div>`,
        codeExampleCss: `.cartes {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 16px;
}

.carte {
  background-color: #f4f0ff;
  border: 2px solid #8b3dff;
  border-radius: 14px;
  padding: 24px;
  width: 140px;
  text-align: center;
  font-family: sans-serif;
  font-size: 32px;
}

.carte h4 {
  color: #2f63ff;
  font-size: 15px;
  margin: 8px 0 0;
}`,
        hasEditor: true,
        missionPrompt:
          "Ajoute gap: 20px à la classe .cartes pour espacer joliment les cartes entre elles.",
        starterHtml: `<div class="cartes">
  <div class="carte">🎨<h4>Design</h4></div>
  <div class="carte">💻<h4>Code</h4></div>
  <div class="carte">🚀<h4>Projets</h4></div>
</div>`,
        starterCss: `.cartes {
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
}

.carte {
  background-color: #f4f0ff;
  border: 2px solid #8b3dff;
  border-radius: 14px;
  padding: 24px;
  width: 140px;
  text-align: center;
  font-family: sans-serif;
  font-size: 32px;
}

.carte h4 {
  color: #2f63ff;
  font-size: 15px;
  margin: 8px 0 0;
}`,
        validationRule: {
          type: "css-property",
          selector: ".cartes",
          property: "gap",
          value: "20px",
        },
        hint: "La propriété gap se place directement dans le conteneur flex, pas dans chaque carte.",
        xpReward: 65,
      },
    ],
    quiz: {
      title: "Quiz : Cartes et sections avec Flexbox",
      xpReward: 120,
      questions: [
        {
          question: "À quoi sert flex-wrap: wrap ?",
          choices: [
            "À cacher les éléments en trop",
            "À autoriser les éléments à passer à la ligne suivante s'il n'y a plus de place",
            "À aligner les éléments au centre",
            "À supprimer les espaces",
          ],
          correctIndex: 1,
          explanation:
            "Sans flex-wrap, les éléments se compriment sur une seule ligne ; avec wrap, ils passent à la ligne.",
        },
        {
          question: "Que fait la propriété gap dans un conteneur flex ?",
          choices: [
            "Elle ajoute une bordure",
            "Elle crée un espace régulier entre les éléments enfants",
            "Elle change la couleur de fond",
            "Elle agrandit les éléments",
          ],
          correctIndex: 1,
          explanation:
            "gap ajoute un espacement uniforme entre les enfants, sans marges individuelles.",
        },
        {
          question: "Sur quel élément place-t-on la propriété gap ?",
          choices: [
            "Sur chaque enfant",
            "Sur le conteneur flex (le parent)",
            "Sur le body uniquement",
            "Sur les balises h4",
          ],
          correctIndex: 1,
          explanation:
            "gap se déclare sur le conteneur flex (ou grid), et s'applique entre tous ses enfants.",
        },
        {
          question:
            "Sans flex-wrap: wrap, que se passe-t-il si les cartes sont trop larges pour l'écran ?",
          choices: [
            "Elles passent automatiquement à la ligne",
            "Elles se compriment pour tenir sur une seule ligne",
            "Elles disparaissent",
            "Rien, le CSS est ignoré",
          ],
          correctIndex: 1,
          explanation:
            "Par défaut (nowrap), Flexbox tente de tout faire tenir sur une ligne en réduisant les éléments.",
        },
        {
          question: "Pourquoi utiliser gap plutôt que margin sur chaque carte ?",
          choices: [
            "gap est plus rapide à taper et évite les doubles espaces entre cartes",
            "margin ne fonctionne pas avec flex",
            "gap ne fonctionne que sur mobile",
            "Il n'y a aucune différence",
          ],
          correctIndex: 0,
          explanation:
            "gap gère l'espacement de façon uniforme sans risque de doubler les marges entre deux cartes voisines.",
        },
      ],
    },
  },
  {
    slug: "introduction-css-grid",
    level: "intermediate",
    title: "Introduction à CSS Grid",
    description:
      "Découvre CSS Grid, un autre super-pouvoir pour organiser ta page en lignes et colonnes précises.",
    objective:
      "Utiliser display: grid et grid-template-columns pour créer une grille d'éléments.",
    icon: "🔲",
    order: 4,
    lessons: [
      {
        slug: "introduction-css-grid",
        title: "Introduction à CSS Grid",
        order: 1,
        summary: "Crée ta première grille avec display: grid et grid-template-columns.",
        content: `Flexbox est génial pour aligner des éléments en ligne ou en colonne, mais parfois tu as besoin d'une vraie grille, avec des lignes ET des colonnes en même temps, comme un plateau de jeu ou une galerie de photos. C'est exactement à ça que sert CSS Grid !

## display: grid et les colonnes

Comme pour Flexbox, tout commence par une propriété magique sur le conteneur parent : \`display: grid;\`, qui transforme ce conteneur en grille prête à accueillir ses enfants dans des cases. La propriété \`grid-template-columns\` décide ensuite combien de colonnes ta grille a, et quelle largeur elles font : \`repeat(3, 1fr)\` crée 3 colonnes de largeur égale, où \`1fr\` représente une fraction de l'espace disponible.

Tu peux aussi écrire directement des tailles fixes comme \`200px 200px 200px\` si tu préfères. Et comme pour Flexbox, la propriété \`gap\` fonctionne aussi avec Grid pour espacer joliment les cases.

Avec juste ces deux ou trois propriétés, tu peux déjà construire une galerie d'images ou une grille de mini-jeux !`,
        codeExampleHtml: `<div class="grille">
  <div class="case">1</div>
  <div class="case">2</div>
  <div class="case">3</div>
  <div class="case">4</div>
  <div class="case">5</div>
  <div class="case">6</div>
</div>`,
        codeExampleCss: `.grille {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
}

.case {
  background-color: #2f63ff;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  padding: 24px 0;
}

.case:nth-child(even) {
  background-color: #8b3dff;
}`,
        hasEditor: true,
        missionPrompt:
          "Modifie grid-template-columns pour créer 3 colonnes égales en utilisant repeat(3, 1fr).",
        starterHtml: `<div class="grille">
  <div class="case">1</div>
  <div class="case">2</div>
  <div class="case">3</div>
  <div class="case">4</div>
  <div class="case">5</div>
  <div class="case">6</div>
</div>`,
        starterCss: `.grille {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  padding: 16px;
}

.case {
  background-color: #2f63ff;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 24px;
  font-weight: bold;
  border-radius: 10px;
  text-align: center;
  padding: 24px 0;
}

.case:nth-child(even) {
  background-color: #8b3dff;
}`,
        validationRule: {
          type: "css-property",
          selector: ".grille",
          property: "grid-template-columns",
          value: "repeat(3, 1fr)",
        },
        hint: "repeat(3, 1fr) veut dire trois colonnes de même largeur.",
        xpReward: 70,
      },
    ],
    quiz: {
      title: "Quiz : Introduction à CSS Grid",
      xpReward: 120,
      questions: [
        {
          question: "Quelle propriété transforme un conteneur en grille ?",
          choices: ["display: flex", "display: grid", "display: block", "display: table"],
          correctIndex: 1,
          explanation: "display: grid active le mode grille CSS sur le conteneur.",
        },
        {
          question: "Que fait repeat(3, 1fr) dans grid-template-columns ?",
          choices: [
            "Crée 3 lignes de 1 pixel",
            "Crée 3 colonnes de largeur égale",
            "Répète l'élément 3 fois",
            "Crée 1 colonne de 3 pixels",
          ],
          correctIndex: 1,
          explanation:
            "repeat(3, 1fr) équivaut à écrire 1fr 1fr 1fr : trois colonnes qui se partagent l'espace également.",
        },
        {
          question: "Que veut dire l'unité fr dans Grid ?",
          choices: [
            "Franc, une unité de devise",
            "Une fraction de l'espace disponible dans la grille",
            "Un pourcentage fixe de 10%",
            "Freeze, l'élément est figé",
          ],
          correctIndex: 1,
          explanation:
            "fr signifie fraction : l'espace disponible est divisé selon les fr indiqués.",
        },
        {
          question: "Quelle est la différence principale entre Flexbox et Grid ?",
          choices: [
            "Flexbox gère lignes et colonnes en même temps, Grid seulement les lignes",
            "Grid gère lignes et colonnes en même temps, Flexbox est pensé pour une seule direction",
            "Il n'y a aucune différence",
            "Grid ne fonctionne que sur mobile",
          ],
          correctIndex: 1,
          explanation:
            "Grid est bidimensionnel (lignes + colonnes), Flexbox est unidimensionnel (une ligne ou une colonne à la fois).",
        },
        {
          question: "Quelle propriété permet d'espacer les cases d'une grille ?",
          choices: ["margin", "gap", "border", "padding"],
          correctIndex: 1,
          explanation:
            "gap fonctionne aussi bien en Grid qu'en Flexbox pour espacer les enfants.",
        },
      ],
    },
  },
  {
    slug: "grid-avance-mise-en-page",
    level: "intermediate",
    title: "Grid avancé : mise en page complète",
    description:
      "Construis la mise en page complète d'une page web, avec un en-tête, une barre latérale, un contenu principal et un pied de page.",
    objective:
      "Utiliser grid-template-areas pour organiser une page entière en zones nommées.",
    icon: "🏗️",
    order: 5,
    lessons: [
      {
        slug: "grid-avance-mise-en-page",
        title: "Grid avancé : mise en page complète",
        order: 1,
        summary: "Construis la mise en page complète d'une page avec grid-template-areas.",
        content: `Tu sais maintenant créer une grille simple. Passons à l'étape suivante : construire la structure complète d'une vraie page web, avec un en-tête en haut, une barre latérale, une zone de contenu principal, et un pied de page en bas.

## grid-template-areas, ton plan de page

Avec \`grid-template-areas\`, tu dessines littéralement ta mise en page avec des mots, ligne par ligne, comme un plan. Chaque mot correspond à une zone que tu associes ensuite à un élément grâce à la propriété \`grid-area\`, écrite directement sur cet élément avec le même nom.

Cette technique rend le code très lisible : en lisant juste \`grid-template-areas\`, on comprend immédiatement à quoi ressemble la page, sans avoir à calculer des positions de lignes et colonnes à la main.

C'est exactement la structure que tu retrouves sur la quasi-totalité des sites web : en-tête, menu, contenu, pied de page.`,
        codeExampleHtml: `<div class="page">
  <header class="entete">En-tête</header>
  <aside class="barre-laterale">Menu</aside>
  <main class="contenu">Contenu principal</main>
  <footer class="pied">Pied de page</footer>
</div>`,
        codeExampleCss: `.page {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 70px 1fr 50px;
  grid-template-areas:
    "entete entete"
    "barre contenu"
    "pied pied";
  gap: 10px;
  height: 320px;
  font-family: sans-serif;
}

.entete {
  grid-area: entete;
  background-color: #2f63ff;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 16px;
  border-radius: 8px;
}

.barre-laterale {
  grid-area: barre;
  background-color: #8b3dff;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
}

.contenu {
  grid-area: contenu;
  background-color: #f0f2ff;
  padding: 12px;
  border-radius: 8px;
}

.pied {
  grid-area: pied;
  background-color: #333333;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}`,
        hasEditor: true,
        missionPrompt:
          "La barre latérale n'est pas à la bonne place ! Donne à .barre-laterale la propriété grid-area: barre; pour qu'elle se place dans la zone «barre».",
        starterHtml: `<div class="page">
  <header class="entete">En-tête</header>
  <aside class="barre-laterale">Menu</aside>
  <main class="contenu">Contenu principal</main>
  <footer class="pied">Pied de page</footer>
</div>`,
        starterCss: `.page {
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 70px 1fr 50px;
  grid-template-areas:
    "entete entete"
    "barre contenu"
    "pied pied";
  gap: 10px;
  height: 320px;
  font-family: sans-serif;
}

.entete {
  grid-area: entete;
  background-color: #2f63ff;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 16px;
  border-radius: 8px;
}

.barre-laterale {
  background-color: #8b3dff;
  color: #ffffff;
  padding: 12px;
  border-radius: 8px;
}

.contenu {
  grid-area: contenu;
  background-color: #f0f2ff;
  padding: 12px;
  border-radius: 8px;
}

.pied {
  grid-area: pied;
  background-color: #333333;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}`,
        validationRule: {
          type: "css-property",
          selector: ".barre-laterale",
          property: "grid-area",
          value: "barre",
        },
        hint: "Le nom que tu donnes à grid-area doit être identique au mot utilisé dans grid-template-areas.",
        xpReward: 85,
      },
    ],
    quiz: {
      title: "Quiz : Grid avancé : mise en page complète",
      xpReward: 120,
      questions: [
        {
          question: "À quoi sert grid-template-areas ?",
          choices: [
            "À définir des couleurs pour la grille",
            "À dessiner la mise en page avec des noms de zones",
            "À créer des animations",
            "À ajouter des bordures automatiquement",
          ],
          correctIndex: 1,
          explanation:
            "grid-template-areas permet de nommer visuellement chaque zone de la grille, ligne par ligne.",
        },
        {
          question: "Comment place-t-on un élément dans une zone nommée ?",
          choices: [
            "Avec la propriété grid-area sur l'élément enfant",
            "Avec la propriété position: absolute",
            "Avec un attribut HTML data-zone",
            "Avec la propriété float",
          ],
          correctIndex: 0,
          explanation:
            "grid-area, appliquée à l'enfant, doit correspondre au nom défini dans grid-template-areas du parent.",
        },
        {
          question:
            "Dans l'exemple, pourquoi entete apparaît-il deux fois sur la même ligne de grid-template-areas ?",
          choices: [
            "C'est une erreur",
            "Pour que l'en-tête s'étende sur les deux colonnes",
            "Pour dupliquer l'en-tête",
            "Pour le cacher",
          ],
          correctIndex: 1,
          explanation:
            "Répéter le même nom sur plusieurs cases fait fusionner ces cases en une seule zone plus large.",
        },
        {
          question:
            "Que se passe-t-il si le nom dans grid-area ne correspond à aucune zone de grid-template-areas ?",
          choices: [
            "La page plante complètement",
            "L'élément ne sera pas placé correctement selon le plan prévu",
            "Rien, cela fonctionne quand même parfaitement",
            "Le nom est automatiquement corrigé",
          ],
          correctIndex: 1,
          explanation:
            "Le nom doit correspondre exactement, sinon l'élément ne se positionne pas là où on l'attend.",
        },
        {
          question:
            "Quel est l'avantage principal de grid-template-areas par rapport à placer les éléments avec des numéros de ligne/colonne ?",
          choices: [
            "C'est plus rapide à charger pour le navigateur",
            "Le code est plus lisible, on voit le plan de la page d'un coup d'œil",
            "Cela fonctionne uniquement sur mobile",
            "Il n'y a aucun avantage",
          ],
          correctIndex: 1,
          explanation:
            "Les noms de zones rendent la structure de la page beaucoup plus facile à comprendre en un coup d'œil.",
        },
      ],
    },
  },
  {
    slug: "responsive-design-media-queries",
    level: "intermediate",
    title: "Responsive design et media queries",
    description:
      "Apprends à adapter ta page automatiquement pour qu'elle soit belle aussi bien sur ordinateur que sur mobile.",
    objective: "Utiliser les media queries pour changer le style selon la taille de l'écran.",
    icon: "📱",
    order: 6,
    lessons: [
      {
        slug: "responsive-design-media-queries",
        title: "Responsive design et media queries",
        order: 1,
        summary: "Adapte ta page à toutes les tailles d'écran grâce aux media queries.",
        content: `As-tu déjà remarqué que les sites web changent d'apparence quand tu les ouvres sur ton téléphone ? Ce n'est pas une coïncidence : les développeurs utilisent des media queries pour adapter le design à la taille de l'écran. C'est ce qu'on appelle le responsive design.

## Les media queries

Une media query est une condition CSS qui dit : «applique ce style seulement si l'écran fait telle taille». Elle s'écrit avec \`@media\` suivi d'une condition entre parenthèses, puis des règles CSS entre accolades, exactement comme un sélecteur normal. Par exemple, \`@media (max-width: 600px) { ... }\` applique les styles à l'intérieur uniquement quand la largeur de l'écran est de 600 pixels ou moins, donc typiquement sur mobile.

Beaucoup de développeurs professionnels écrivent d'abord le style pour mobile, puis ajoutent des media queries pour les écrans plus grands : on appelle ça penser mobile-first.

Que tu commences par le grand ou le petit écran, l'important est de toujours vérifier que ta page reste lisible et agréable, quelle que soit sa taille !`,
        codeExampleHtml: `<div class="conteneur">
  <div class="bloc">A</div>
  <div class="bloc">B</div>
  <div class="bloc">C</div>
</div>`,
        codeExampleCss: `.conteneur {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.bloc {
  flex: 1;
  background-color: #2f63ff;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 20px;
  text-align: center;
  padding: 30px 0;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .conteneur {
    flex-direction: column;
  }
}`,
        hasEditor: true,
        missionPrompt:
          "Ajoute une media query @media (max-width: 600px) qui change flex-direction de .conteneur en column, pour empiler les blocs sur petit écran.",
        starterHtml: `<div class="conteneur">
  <div class="bloc">A</div>
  <div class="bloc">B</div>
  <div class="bloc">C</div>
</div>`,
        starterCss: `.conteneur {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.bloc {
  flex: 1;
  background-color: #2f63ff;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 20px;
  text-align: center;
  padding: 30px 0;
  border-radius: 10px;
}`,
        validationRule: {
          type: "contains-css",
          snippet: "@media (max-width: 600px)",
        },
        hint: "N'oublie pas d'écrire @media (max-width: 600px) { .conteneur { flex-direction: column; } } en dehors de la règle .conteneur normale.",
        xpReward: 80,
      },
    ],
    quiz: {
      title: "Quiz : Responsive design et media queries",
      xpReward: 120,
      questions: [
        {
          question: "À quoi sert une media query ?",
          choices: [
            "À charger des images plus vite",
            "À appliquer des styles CSS seulement sous certaines conditions d'écran",
            "À créer des animations",
            "À ajouter du JavaScript",
          ],
          correctIndex: 1,
          explanation:
            "Une media query applique un bloc de CSS uniquement quand une condition (comme la largeur d'écran) est vraie.",
        },
        {
          question: "Que signifie @media (max-width: 600px) ?",
          choices: [
            "Le style s'applique seulement si l'écran fait au maximum 600px de large",
            "Le style s'applique seulement si l'écran fait au minimum 600px de large",
            "L'élément aura une largeur maximale de 600px",
            "Rien, c'est une erreur de syntaxe",
          ],
          correctIndex: 0,
          explanation:
            "max-width: 600px cible les écrans dont la largeur est de 600 pixels ou moins.",
        },
        {
          question: "Pourquoi le responsive design est-il important ?",
          choices: [
            "Pour que le site soit plus rapide à coder",
            "Pour que le site reste lisible et agréable sur toutes les tailles d'écran",
            "Pour utiliser moins de couleurs",
            "Ce n'est pas important",
          ],
          correctIndex: 1,
          explanation:
            "Les visiteurs utilisent des écrans très différents (mobile, tablette, ordinateur) : le site doit s'adapter à tous.",
        },
        {
          question: "Que veut dire l'approche mobile-first ?",
          choices: [
            "Concevoir le site d'abord pour mobile, puis l'adapter aux grands écrans",
            "Interdire l'accès au site depuis un ordinateur",
            "Faire un site uniquement pour mobile",
            "Utiliser uniquement du JavaScript sur mobile",
          ],
          correctIndex: 0,
          explanation:
            "Mobile-first consiste à écrire le style de base pour petit écran, puis à l'enrichir pour les écrans plus grands.",
        },
        {
          question: "Où écrit-on les règles CSS à l'intérieur d'une media query ?",
          choices: [
            "Avant le symbole @media",
            "Entre les accolades {} qui suivent la condition @media",
            "Dans un fichier HTML séparé",
            "Il est impossible d'écrire du CSS dans une media query",
          ],
          correctIndex: 1,
          explanation:
            "Comme un sélecteur classique, la media query ouvre des accolades qui contiennent les règles CSS conditionnelles.",
        },
      ],
    },
  },
  {
    slug: "formulaires-avances",
    level: "intermediate",
    title: "Formulaires avancés",
    description:
      "Apprends à créer des formulaires accessibles et agréables à utiliser, avec des labels et de jolis champs stylisés.",
    objective:
      "Associer des labels à leurs champs et styliser un formulaire pour le rendre clair et agréable.",
    icon: "📝",
    order: 7,
    lessons: [
      {
        slug: "formulaires-avances",
        title: "Formulaires avancés",
        order: 1,
        summary: "Construis un formulaire clair, accessible et bien stylisé.",
        content: `Un formulaire, c'est ce qui permet à un visiteur d'envoyer des informations sur ton site : s'inscrire, envoyer un message, laisser un avis... Un bon formulaire doit être facile à comprendre et à remplir, même pour quelqu'un qui ne voit pas très bien son écran.

## Le lien entre label et input

L'attribut \`for\` sur une balise \`<label>\` doit correspondre exactement à l'attribut \`id\` du champ \`<input>\` qu'il décrit. Ce lien est essentiel : il permet de cliquer sur le texte du label pour activer le champ, et il aide les personnes qui utilisent un lecteur d'écran à comprendre le formulaire.

L'attribut \`type\` d'un \`<input>\` change aussi complètement son comportement : \`type="email"\` vérifie qu'une adresse email est valide, \`type="password"\` cache les caractères tapés, \`type="number"\` n'accepte que des chiffres.

Pour styliser un formulaire sans perdre en clarté, garde toujours un bon espacement entre les champs et un label bien visible : ton visiteur ne doit jamais se demander ce qu'il doit écrire !`,
        codeExampleHtml: `<form class="formulaire">
  <div class="champ">
    <label for="pseudo">Pseudo</label>
    <input type="text" id="pseudo" placeholder="TonPseudo123">
  </div>
  <div class="champ">
    <label for="email">Email</label>
    <input type="email" id="email" placeholder="toi@exemple.com">
  </div>
  <button type="submit">Envoyer</button>
</form>`,
        codeExampleCss: `.formulaire {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: sans-serif;
  max-width: 280px;
  padding: 20px;
  background-color: #f7f7ff;
  border-radius: 12px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: bold;
  color: #2f63ff;
  font-size: 14px;
}

input {
  padding: 10px;
  border: 2px solid #cfd6ff;
  border-radius: 8px;
  font-size: 14px;
}

input:focus {
  border-color: #8b3dff;
  outline: none;
}

button {
  background-color: #8b3dff;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}`,
        hasEditor: true,
        missionPrompt:
          "Le label Email n'est pas relié à son champ ! Ajoute l'attribut for=«email» sur le label Email pour le connecter à l'input qui a id=«email».",
        starterHtml: `<form class="formulaire">
  <div class="champ">
    <label for="pseudo">Pseudo</label>
    <input type="text" id="pseudo" placeholder="TonPseudo123">
  </div>
  <div class="champ">
    <label>Email</label>
    <input type="email" id="email" placeholder="toi@exemple.com">
  </div>
  <button type="submit">Envoyer</button>
</form>`,
        starterCss: `.formulaire {
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-family: sans-serif;
  max-width: 280px;
  padding: 20px;
  background-color: #f7f7ff;
  border-radius: 12px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: bold;
  color: #2f63ff;
  font-size: 14px;
}

input {
  padding: 10px;
  border: 2px solid #cfd6ff;
  border-radius: 8px;
  font-size: 14px;
}

input:focus {
  border-color: #8b3dff;
  outline: none;
}

button {
  background-color: #8b3dff;
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}`,
        validationRule: {
          type: "contains-html",
          snippet: 'for="email"',
        },
        hint: "L'attribut for du label doit contenir exactement la même valeur que l'id de l'input, ici email.",
        xpReward: 70,
      },
    ],
    quiz: {
      title: "Quiz : Formulaires avancés",
      xpReward: 120,
      questions: [
        {
          question: "À quoi sert l'attribut for sur un <label> ?",
          choices: [
            "À définir la couleur du texte",
            "À relier le label à un champ précis grâce à son id",
            "À indiquer la langue du formulaire",
            "À rendre le label invisible",
          ],
          correctIndex: 1,
          explanation:
            "for doit correspondre à l'id du champ concerné, ce qui crée un lien officiel entre les deux.",
        },
        {
          question: "Que fait type=«email» sur un input ?",
          choices: [
            "Il transforme le champ en bouton",
            "Il vérifie que le texte ressemble à une adresse email valide",
            "Il cache le texte tapé",
            "Il ajoute automatiquement une image",
          ],
          correctIndex: 1,
          explanation:
            "Le navigateur peut valider automatiquement le format d'une adresse email avec ce type.",
        },
        {
          question: "Pourquoi est-il important de lier un label à son input ?",
          choices: [
            "Pour que le formulaire soit plus rapide à charger",
            "Pour l'accessibilité : cliquer sur le label active le champ, et les lecteurs d'écran comprennent mieux",
            "Ce n'est pas important du tout",
            "Pour changer la couleur du champ",
          ],
          correctIndex: 1,
          explanation:
            "Un bon lien label/input aide tous les utilisateurs, y compris ceux qui utilisent des technologies d'assistance.",
        },
        {
          question: "Quel type d'input cache les caractères tapés par l'utilisateur ?",
          choices: [
            "type=«text»",
            "type=«password»",
            "type=«email»",
            "type=«number»",
          ],
          correctIndex: 1,
          explanation:
            "type=«password» masque automatiquement les caractères saisis, par sécurité.",
        },
        {
          question: "Dans l'exemple, que fait input:focus ?",
          choices: [
            "Il s'applique en permanence à tous les inputs",
            "Il s'applique uniquement quand l'utilisateur clique dans le champ pour écrire",
            "Il s'applique seulement au bouton",
            "Il supprime le champ",
          ],
          correctIndex: 1,
          explanation:
            "La pseudo-classe :focus cible un champ pendant qu'il est actif, c'est-à-dire sélectionné pour la saisie.",
        },
      ],
    },
  },
  {
    slug: "transitions-hover-effects",
    level: "intermediate",
    title: "Transitions et effets au survol",
    description:
      "Donne vie à tes pages avec des animations douces au survol de la souris, sans une seule ligne de JavaScript.",
    objective: "Utiliser transition et transform pour créer des effets de survol fluides.",
    icon: "✨",
    order: 8,
    lessons: [
      {
        slug: "transitions-hover-effects",
        title: "Transitions et effets au survol",
        order: 1,
        summary: "Ajoute des transitions douces à tes effets de survol.",
        content: `Tu as déjà utilisé \`:hover\` pour changer un style au survol. Mais sans rien ajouter de plus, le changement est brutal, instantané. Avec la propriété \`transition\`, tu peux rendre ce changement fluide et agréable, comme sur les sites professionnels.

## transition et transform

\`transition\` dit au navigateur : «quand une propriété change, anime le changement au lieu de le faire d'un coup». Par exemple, \`transition: all 0.3s ease;\` fait que tout changement de style dure 0.3 seconde et suit une courbe douce. La propriété \`transform\`, elle, permet de faire grossir (\`scale\`), tourner (\`rotate\`) ou déplacer (\`translate\`) un élément sans affecter les éléments autour de lui.

La recette classique : mets \`transition\` sur l'état normal de l'élément, et change une propriété comme \`transform\` ou \`background-color\` dans la règle \`:hover\`. Le navigateur se charge d'animer le passage de l'un à l'autre tout seul !

Ce petit ajout suffit à donner une impression beaucoup plus professionnelle à n'importe quel bouton.`,
        codeExampleHtml: `<button class="bouton">Clique-moi</button>`,
        codeExampleCss: `.bouton {
  background-color: #2f63ff;
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-family: sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bouton:hover {
  background-color: #8b3dff;
  transform: scale(1.08);
}`,
        hasEditor: true,
        missionPrompt:
          "Ajoute la propriété transition: all 0.3s ease; à la classe .bouton pour rendre l'effet de survol fluide.",
        starterHtml: `<button class="bouton">Clique-moi</button>`,
        starterCss: `.bouton {
  background-color: #2f63ff;
  color: #ffffff;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-family: sans-serif;
  cursor: pointer;
}

.bouton:hover {
  background-color: #8b3dff;
  transform: scale(1.08);
}`,
        validationRule: {
          type: "css-property",
          selector: ".bouton",
          property: "transition",
          value: "all 0.3s ease",
        },
        hint: "La propriété transition se place sur l'état normal de l'élément (.bouton), pas sur :hover.",
        xpReward: 75,
      },
    ],
    quiz: {
      title: "Quiz : Transitions et effets au survol",
      xpReward: 120,
      questions: [
        {
          question: "À quoi sert la propriété transition ?",
          choices: [
            "À changer la couleur définitivement",
            "À animer en douceur le changement d'une propriété CSS",
            "À cacher un élément",
            "À créer une nouvelle page",
          ],
          correctIndex: 1,
          explanation:
            "transition transforme un changement brutal de style en une animation fluide.",
        },
        {
          question: "Sur quel élément place-t-on généralement la propriété transition ?",
          choices: [
            "Uniquement dans la règle :hover",
            "Sur l'état normal de l'élément (hors :hover)",
            "Sur le body uniquement",
            "Elle ne se place jamais en CSS",
          ],
          correctIndex: 1,
          explanation:
            "En la mettant sur l'état normal, elle s'applique dans les deux sens : à l'entrée et à la sortie du survol.",
        },
        {
          question: "Que fait transform: scale(1.08) ?",
          choices: [
            "Il déplace l'élément vers la droite",
            "Il agrandit légèrement l'élément (108% de sa taille)",
            "Il fait tourner l'élément",
            "Il rend l'élément transparent",
          ],
          correctIndex: 1,
          explanation:
            "scale(1.08) agrandit l'élément à 108% de sa taille d'origine, un léger effet de zoom.",
        },
        {
          question: "Que signifie le 0.3s dans transition: all 0.3s ease; ?",
          choices: [
            "La couleur finale",
            "La durée de l'animation : 0.3 seconde",
            "Le nombre de répétitions",
            "La taille de l'élément",
          ],
          correctIndex: 1,
          explanation: "0.3s est la durée pendant laquelle le changement de style est animé.",
        },
        {
          question:
            "Pourquoi utiliser transform plutôt que de changer width ou margin pour agrandir un élément au survol ?",
          choices: [
            "transform est plus lent",
            "transform ne fonctionne pas avec :hover",
            "transform anime en douceur sans perturber la mise en page des éléments voisins",
            "Il n'y a aucune différence",
          ],
          correctIndex: 2,
          explanation:
            "transform modifie l'apparence visuelle sans affecter l'espace réservé dans la mise en page, ce qui donne un rendu plus fluide.",
        },
      ],
    },
  },
  {
    slug: "animations-css",
    level: "intermediate",
    title: "Animations CSS",
    description:
      "Crée tes propres animations personnalisées avec @keyframes, comme une balle qui rebondit ou un texte qui apparaît.",
    objective: "Créer une animation avec @keyframes et l'appliquer avec la propriété animation.",
    icon: "🎬",
    order: 9,
    lessons: [
      {
        slug: "animations-css",
        title: "Animations CSS",
        order: 1,
        summary: "Crée une animation personnalisée avec @keyframes.",
        content: `Les transitions sont parfaites pour un simple changement d'état (comme :hover), mais parfois tu veux une animation plus complexe, qui joue en boucle, toute seule, sans interaction de l'utilisateur. C'est le rôle de \`@keyframes\` !

## Créer et appliquer une animation

\`@keyframes\` te permet de définir des étapes dans une animation, avec des pourcentages : \`0%\` est le début, \`100%\` est la fin, et tu peux ajouter des étapes intermédiaires comme \`50%\`. Une fois ton animation nommée (par exemple \`rebond\`), tu l'appliques à un élément avec la propriété \`animation\`, en indiquant son nom, sa durée, et si elle doit se répéter, par exemple \`animation: rebond 1.2s ease-in-out infinite;\`.

Une petite icône qui pulse doucement, un titre qui apparaît en fondu, une balle qui rebondit... les animations CSS ajoutent du dynamisme à une page sans une seule ligne de JavaScript.

C'est un excellent moyen de rendre ton site mémorable, tant que tu n'en abuses pas !`,
        codeExampleHtml: `<div class="scene">
  <div class="balle"></div>
</div>`,
        codeExampleCss: `.scene {
  background-color: #f0f2ff;
  border-radius: 12px;
  padding: 40px 20px 10px;
  display: flex;
  justify-content: center;
}

.balle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff5da2;
  animation: rebond 1.2s ease-in-out infinite;
}

@keyframes rebond {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
}`,
        hasEditor: true,
        missionPrompt:
          "Applique l'animation à la balle : ajoute animation: rebond 1.2s ease-in-out infinite; à la classe .balle.",
        starterHtml: `<div class="scene">
  <div class="balle"></div>
</div>`,
        starterCss: `.scene {
  background-color: #f0f2ff;
  border-radius: 12px;
  padding: 40px 20px 10px;
  display: flex;
  justify-content: center;
}

.balle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff5da2;
}

@keyframes rebond {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40px);
  }
  100% {
    transform: translateY(0);
  }
}`,
        validationRule: {
          type: "css-property",
          selector: ".balle",
          property: "animation",
          value: "rebond 1.2s ease-in-out infinite",
        },
        hint: "N'oublie pas d'utiliser exactement le nom rebond, celui défini dans @keyframes.",
        xpReward: 85,
      },
    ],
    quiz: {
      title: "Quiz : Animations CSS",
      xpReward: 120,
      questions: [
        {
          question: "À quoi sert @keyframes ?",
          choices: [
            "À définir les couleurs d'un thème",
            "À décrire les étapes d'une animation personnalisée",
            "À créer un formulaire",
            "À charger une police d'écriture",
          ],
          correctIndex: 1,
          explanation:
            "@keyframes permet de définir ce à quoi ressemble l'élément à différents moments (0%, 50%, 100%...) d'une animation.",
        },
        {
          question:
            "Comment applique-t-on une animation définie avec @keyframes à un élément ?",
          choices: [
            "Avec la propriété transition",
            "Avec la propriété animation, en indiquant le nom de l'animation",
            "En ajoutant une classe hover",
            "Cela se fait automatiquement",
          ],
          correctIndex: 1,
          explanation:
            "La propriété animation relie l'élément au nom de l'animation défini dans @keyframes, avec sa durée et son comportement.",
        },
        {
          question:
            "Que veut dire infinite dans animation: rebond 1.2s ease-in-out infinite; ?",
          choices: [
            "L'animation dure une seconde infinie",
            "L'animation se répète indéfiniment, en boucle",
            "L'animation ne se joue qu'une fois",
            "L'élément devient invisible",
          ],
          correctIndex: 1,
          explanation:
            "infinite fait boucler l'animation sans fin, contrairement à une valeur numérique qui limite le nombre de répétitions.",
        },
        {
          question: "Dans @keyframes rebond, que représente 50% ?",
          choices: [
            "La moitié de la page",
            "Une étape intermédiaire de l'animation, à mi-parcours",
            "La couleur de fond",
            "La vitesse de l'animation",
          ],
          correctIndex: 1,
          explanation:
            "Les pourcentages définissent des étapes dans le temps de l'animation ; 50% correspond à la moitié du trajet.",
        },
        {
          question:
            "Quelle est la différence principale entre transition et @keyframes ?",
          choices: [
            "Il n'y a aucune différence",
            "transition anime un changement déclenché (comme :hover), @keyframes peut créer une animation autonome et répétée",
            "transition est plus récente que @keyframes",
            "@keyframes ne fonctionne que sur les images",
          ],
          correctIndex: 1,
          explanation:
            "transition réagit à un changement d'état, tandis que @keyframes peut faire jouer une animation en continu, sans interaction.",
        },
      ],
    },
  },
  {
    slug: "variables-css-mon-portfolio",
    level: "intermediate",
    title: "Variables CSS et mon portfolio",
    description:
      "Termine en beauté en créant l'en-tête de ton propre portfolio, en utilisant des variables CSS pour un design cohérent.",
    objective:
      "Utiliser des variables CSS avec :root et var() pour construire l'en-tête d'un portfolio personnel.",
    icon: "🌈",
    order: 10,
    lessons: [
      {
        slug: "variables-css-mon-portfolio",
        title: "Variables CSS et mon portfolio",
        order: 1,
        summary: "Utilise des variables CSS pour construire l'en-tête de ton portfolio.",
        content: `Bravo d'être arrivé jusqu'ici ! Pour ce dernier cours du niveau intermédiaire, on va apprendre un outil que tous les développeurs professionnels utilisent : les variables CSS. Et on va s'en servir pour commencer un vrai mini-projet : l'en-tête de ton portfolio personnel !

## Variables CSS avec :root et var()

Le sélecteur \`:root\` représente toute la page. En y déclarant des variables avec deux tirets, comme \`--couleur-accent: #8b3dff;\`, tu crées une valeur réutilisable partout dans ton CSS. Pour l'utiliser, on écrit \`var(--nom-de-la-variable)\` à la place d'une valeur normale, par exemple \`color: var(--couleur-accent);\`. Si un jour tu veux changer la couleur principale de tout ton site, tu n'as qu'à modifier une seule ligne dans \`:root\`, et tout se met à jour automatiquement !

Un portfolio, c'est une page qui présente qui tu es et ce que tu sais faire, et son en-tête est la toute première chose que les visiteurs voient. Dans l'exemple ci-dessous, on combine tout ce que tu as appris : Flexbox pour aligner les éléments, des variables CSS pour les couleurs, et un effet \`:hover\` pour rendre les liens interactifs.

À toi de continuer à construire le reste de ton portfolio avec ces mêmes outils !`,
        codeExampleHtml: `<header class="entete-portfolio">
  <div class="nom-portfolio">Léa Martin</div>
  <nav class="liens-portfolio">
    <a href="#">Projets</a>
    <a href="#">À propos</a>
    <a href="#">Contact</a>
  </nav>
</header>`,
        codeExampleCss: `:root {
  --couleur-principale: #2f63ff;
  --couleur-accent: #8b3dff;
  --couleur-texte: #ffffff;
}

.entete-portfolio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--couleur-principale);
  padding: 20px 30px;
  border-radius: 12px;
  font-family: sans-serif;
}

.nom-portfolio {
  color: var(--couleur-accent);
  font-size: 22px;
  font-weight: bold;
}

.liens-portfolio {
  display: flex;
  gap: 24px;
}

.liens-portfolio a {
  color: var(--couleur-texte);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.liens-portfolio a:hover {
  color: var(--couleur-accent);
}`,
        hasEditor: true,
        missionPrompt:
          "Utilise la variable pour styliser ton nom : remplace la couleur de .nom-portfolio par var(--couleur-accent) au lieu d'une couleur écrite en dur.",
        starterHtml: `<header class="entete-portfolio">
  <div class="nom-portfolio">Léa Martin</div>
  <nav class="liens-portfolio">
    <a href="#">Projets</a>
    <a href="#">À propos</a>
    <a href="#">Contact</a>
  </nav>
</header>`,
        starterCss: `:root {
  --couleur-principale: #2f63ff;
  --couleur-accent: #8b3dff;
  --couleur-texte: #ffffff;
}

.entete-portfolio {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--couleur-principale);
  padding: 20px 30px;
  border-radius: 12px;
  font-family: sans-serif;
}

.nom-portfolio {
  color: #ffffff;
  font-size: 22px;
  font-weight: bold;
}

.liens-portfolio {
  display: flex;
  gap: 24px;
}

.liens-portfolio a {
  color: var(--couleur-texte);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.2s ease;
}

.liens-portfolio a:hover {
  color: var(--couleur-accent);
}`,
        validationRule: {
          type: "css-property",
          selector: ".nom-portfolio",
          property: "color",
          value: "var(--couleur-accent)",
        },
        hint: "Remplace la valeur de color par var(--couleur-accent), exactement comme dans :root.",
        xpReward: 90,
      },
    ],
    quiz: {
      title: "Quiz : Variables CSS et mon portfolio",
      xpReward: 120,
      questions: [
        {
          question: "Où déclare-t-on généralement les variables CSS globales d'un site ?",
          choices: [
            "Dans la balise <body>",
            "Dans le sélecteur :root",
            "Dans chaque classe séparément",
            "Dans un fichier HTML",
          ],
          correctIndex: 1,
          explanation:
            ":root représente toute la page et est l'endroit standard pour déclarer des variables globales.",
        },
        {
          question:
            "Comment utilise-t-on une variable CSS nommée --couleur-accent ?",
          choices: [
            "color: --couleur-accent;",
            "color: var(--couleur-accent);",
            "color: use(--couleur-accent);",
            "color: #--couleur-accent;",
          ],
          correctIndex: 1,
          explanation:
            "La fonction var() permet d'insérer la valeur d'une variable CSS à l'endroit voulu.",
        },
        {
          question: "Quel est le principal avantage des variables CSS ?",
          choices: [
            "Elles rendent le site plus rapide à charger",
            "Elles permettent de changer une valeur à un seul endroit et de la répercuter partout",
            "Elles remplacent complètement les classes CSS",
            "Elles ne fonctionnent que sur mobile",
          ],
          correctIndex: 1,
          explanation:
            "Modifier une variable dans :root met à jour instantanément toutes les propriétés qui l'utilisent.",
        },
        {
          question: "Comment doit-on nommer une variable CSS ?",
          choices: [
            "Avec un dollar devant, comme $couleur",
            "Avec deux tirets devant, comme --couleur",
            "Avec une majuscule obligatoire, comme Couleur",
            "Sans aucune règle particulière",
          ],
          correctIndex: 1,
          explanation: "Une variable CSS personnalisée commence toujours par deux tirets (--).",
        },
        {
          question:
            "Dans l'en-tête du portfolio, quelles techniques sont combinées ?",
          choices: [
            "Uniquement des couleurs en dur, sans Flexbox",
            "Flexbox pour l'alignement, des variables CSS pour les couleurs, et :hover pour l'interactivité",
            "Uniquement CSS Grid",
            "Aucune technique vue dans les cours précédents",
          ],
          correctIndex: 1,
          explanation:
            "L'exemple réunit Flexbox, variables CSS et pseudo-classe :hover, trois notions apprises dans ce niveau.",
        },
      ],
    },
  },
];
