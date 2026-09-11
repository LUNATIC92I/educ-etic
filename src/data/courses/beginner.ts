import type { SeedCourse } from "./types";

export const beginnerCourses: SeedCourse[] = [
  {
    slug: "quest-ce-qu-un-site-web",
    level: "beginner",
    title: "Qu'est-ce qu'un site web ?",
    description: "Pars à la découverte de ce qui se cache derrière les sites que tu visites chaque jour.",
    objective: "Comprendre à quoi servent le HTML, le CSS et le navigateur dans la construction d'un site web.",
    icon: "🌐",
    order: 1,
    lessons: [
      {
        slug: "quest-ce-qu-un-site-web",
        title: "Qu'est-ce qu'un site web ?",
        order: 1,
        summary: "Une première visite dans les coulisses d'un site web.",
        content: `Un site web, c'est un peu comme une maison que tu visites avec ton navigateur : Chrome, Firefox, Safari ou un autre. Chaque page que tu vois à l'écran est en réalité fabriquée à partir de deux grands ingrédients, le HTML et le CSS.

Le HTML est le squelette de la page. Il indique où se trouvent le titre, les paragraphes, les images et les boutons, un peu comme les murs et les pièces d'une maison. Sans lui, il n'y aurait rien à afficher.

## Le rôle du CSS

Le CSS, lui, s'occupe de la décoration. Il choisit les couleurs, les tailles de texte, les espacements et la mise en page, comme la peinture, les rideaux et les meubles dans une maison déjà construite. Le même HTML peut avoir une apparence complètement différente selon le CSS qu'on lui associe.

Quand tu tapes une adresse ou que tu cliques sur un lien, ton navigateur va chercher ces fichiers HTML et CSS, puis les assemble sous tes yeux pour afficher une page complète, en une fraction de seconde.

Dans ce cours, tu vas commencer à écrire tes premières lignes de code. Pas besoin de tout comprendre d'un coup : on avance étape par étape, comme pour apprendre à construire une cabane, planche par planche.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mon premier site</title>
  </head>
  <body>
    <h1>Bienvenue chez moi</h1>
    <p>Ceci est ma toute première page web. Bientôt, je saurai la transformer comme je veux.</p>
  </body>
</html>`,
        codeExampleCss: `body {
  background-color: #fdf6ec;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 40px;
}

h1 {
  color: #d1495b;
}

p {
  color: #333333;
  font-size: 18px;
}`,
        hasEditor: true,
        missionPrompt: "Amuse-toi à changer le texte du titre ou du paragraphe dans l'éditeur, puis clique sur Vérifier quand tu es prêt à passer à la suite.",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mon premier site</title>
  </head>
  <body>
    <h1>Bienvenue sur mon site</h1>
    <p>Je découvre le HTML et le CSS avec CodeKids.</p>
  </body>
</html>`,
        starterCss: `body {
  background-color: #eef6f9;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 40px;
}

h1 {
  color: #2b7a78;
}

p {
  color: #333333;
  font-size: 18px;
}`,
        validationRule: { type: "none" },
        hint: "💡 Indice : il n'y a pas de mauvaise réponse ici, essaie simplement de changer un mot ou une couleur pour voir ce qui se passe.",
        xpReward: 50,
      },
    ],
    quiz: {
      title: "Quiz : Qu'est-ce qu'un site web ?",
      xpReward: 100,
      questions: [
        {
          question: "À quoi sert le HTML dans une page web ?",
          choices: ["À décorer la page avec des couleurs", "À construire la structure de la page", "À envoyer des emails", "À connecter à Internet"],
          correctIndex: 1,
          explanation: "Le HTML sert à organiser le contenu de la page, comme le titre, les paragraphes et les images.",
        },
        {
          question: "À quoi sert le CSS ?",
          choices: ["À écrire le contenu du texte", "À stocker des données", "À décorer et mettre en page le site", "À envoyer des messages"],
          correctIndex: 2,
          explanation: "Le CSS s'occupe de l'apparence : couleurs, tailles, espacements et mise en page.",
        },
        {
          question: "Quel outil permet d'afficher un site web ?",
          choices: ["Un navigateur", "Une imprimante", "Une calculatrice", "Un microphone"],
          correctIndex: 0,
          explanation: "Le navigateur (Chrome, Firefox, Safari...) lit les fichiers HTML et CSS pour afficher la page.",
        },
        {
          question: "Quelle comparaison décrit bien le HTML et le CSS ?",
          choices: ["Le HTML est la peinture, le CSS est le mur", "Le HTML est le squelette, le CSS est la décoration", "Le HTML et le CSS font exactement la même chose", "Le HTML sert seulement aux images"],
          correctIndex: 1,
          explanation: "Le HTML construit la structure (le squelette) et le CSS ajoute la décoration par-dessus.",
        },
        {
          question: "Que se passe-t-il quand tu cliques sur un lien vers un site ?",
          choices: ["Rien ne se passe avant demain", "Le navigateur récupère et assemble les fichiers du site", "Ton ordinateur envoie un fax", "Le site s'imprime automatiquement"],
          correctIndex: 1,
          explanation: "Le navigateur va chercher les fichiers HTML et CSS du site puis les assemble pour afficher la page.",
        },
      ],
    },
  },
  {
    slug: "structure-dune-page-html",
    level: "beginner",
    title: "La structure d'une page HTML",
    description: "Apprends à construire le squelette que possède chaque page web, du premier au dernier mot.",
    objective: "Savoir écrire les balises DOCTYPE, html, head et body qui composent toute page HTML.",
    icon: "🏗️",
    order: 2,
    lessons: [
      {
        slug: "structure-dune-page-html",
        title: "La structure d'une page HTML",
        order: 1,
        summary: "Découvre les quatre étages présents dans chaque page HTML.",
        content: `Chaque page HTML commence toujours de la même façon : par une petite ligne magique, <!DOCTYPE html>. Elle indique au navigateur que le document est écrit en HTML moderne, pour qu'il l'affiche correctement.

Juste après, tout le contenu de la page est rangé à l'intérieur d'une grande balise html. C'est un peu comme la boîte qui contient toute ta maison : rien n'existe en dehors d'elle.

## Deux pièces principales

À l'intérieur de la balise html, on trouve deux grandes pièces. La balise head contient des informations invisibles pour le visiteur, comme le titre affiché dans l'onglet du navigateur. La balise body, elle, contient tout ce qui est visible à l'écran : les titres, les textes, les images et les boutons.

Si tu oublies une de ces balises, ou si tu les places au mauvais endroit, le navigateur peut afficher la page n'importe comment. C'est pour cela qu'on prend l'habitude, dès le début, de toujours respecter cette structure en quatre étages : DOCTYPE, html, head et body.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma page bien rangée</title>
  </head>
  <body>
    <h1>Une page bien structurée</h1>
    <p>Le DOCTYPE, html, head et body sont tous à leur place.</p>
  </body>
</html>`,
        codeExampleCss: `body {
  font-family: Verdana, sans-serif;
  background-color: #f2f7f2;
  color: #234d20;
  text-align: center;
  padding: 50px 20px;
}

h1 {
  color: #36802d;
}`,
        hasEditor: true,
        missionPrompt: "Le contenu de la page a perdu ses balises body. Ajoute une balise ouvrante <body> juste après </head>, et une balise fermante </body> juste avant </html>.",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma fiche animal</title>
  </head>
    <h1>Le panda roux</h1>
    <p>Le panda roux vit dans les forêts d'altitude d'Asie.</p>
</html>`,
        starterCss: `body {
  font-family: Verdana, sans-serif;
  background-color: #fff4e6;
  color: #5c3d00;
  text-align: center;
  padding: 50px 20px;
}

h1 {
  color: #d97706;
}`,
        validationRule: { type: "contains-html", snippet: "<body>" },
        hint: "💡 Indice : la balise body doit s'ouvrir juste après </head> et se refermer juste avant </html>.",
        xpReward: 55,
      },
    ],
    quiz: {
      title: "Quiz : La structure d'une page HTML",
      xpReward: 100,
      questions: [
        {
          question: "À quoi sert la ligne <!DOCTYPE html> ?",
          choices: ["À colorer la page", "À dire au navigateur que la page est en HTML moderne", "À ajouter une image", "À fermer la page"],
          correctIndex: 1,
          explanation: "Le DOCTYPE indique au navigateur quelle version de HTML utiliser pour bien afficher la page.",
        },
        {
          question: "Que contient la balise head ?",
          choices: ["Le texte visible sur la page", "Des informations invisibles comme le titre de l'onglet", "Les images uniquement", "Les liens uniquement"],
          correctIndex: 1,
          explanation: "La balise head contient des informations qui ne s'affichent pas directement dans la page, comme le titre de l'onglet.",
        },
        {
          question: "Où se trouve le contenu visible d'une page, comme les titres et les paragraphes ?",
          choices: ["Dans la balise head", "Dans la balise body", "Dans le DOCTYPE", "En dehors de la balise html"],
          correctIndex: 1,
          explanation: "Tout ce qui est visible à l'écran est placé à l'intérieur de la balise body.",
        },
        {
          question: "Quelle balise contient absolument tout le document HTML ?",
          choices: ["body", "head", "html", "title"],
          correctIndex: 2,
          explanation: "La balise html enveloppe tout le document, y compris head et body.",
        },
        {
          question: "Que risque-t-il de se passer si on oublie une balise importante comme body ?",
          choices: ["Rien du tout", "La page peut s'afficher de façon incorrecte", "L'ordinateur s'éteint", "Le CSS disparaît pour toujours"],
          correctIndex: 1,
          explanation: "Une structure HTML incomplète peut perturber l'affichage de la page dans le navigateur.",
        },
      ],
    },
  },
  {
    slug: "titres-et-paragraphes",
    level: "beginner",
    title: "Titres et paragraphes",
    description: "Découvre comment organiser tes idées avec des titres qui attirent l'oeil et des paragraphes faciles à lire.",
    objective: "Savoir utiliser les balises h1 à h6 pour les titres et la balise p pour les paragraphes.",
    icon: "📰",
    order: 3,
    lessons: [
      {
        slug: "titres-et-paragraphes",
        title: "Titres et paragraphes",
        order: 1,
        summary: "Organise ton texte avec des titres et des paragraphes bien pensés.",
        content: `Pour organiser une page comme un vrai article, le HTML propose des balises de titre : h1, h2, h3, jusqu'à h6. h1 est le titre le plus important de la page, celui qu'on utilise en général une seule fois, tout en haut. Plus le chiffre augmente, plus le titre est petit et sert à des sous-parties.

Ces balises ne servent pas juste à écrire gros : elles aident aussi à comprendre l'organisation d'une page, un peu comme le sommaire d'un livre avec ses chapitres et ses sous-chapitres.

## Le texte du quotidien

Pour tout le reste du texte, celui qu'on lit normalement, on utilise la balise p, comme paragraphe. Chaque nouvelle idée peut commencer dans un nouveau p, ce qui rend le texte plus clair et plus agréable à lire, avec un petit espace entre chaque bloc.

En combinant quelques titres bien choisis et des paragraphes courts, tu peux transformer un mur de texte en une page claire que n'importe qui a envie de lire.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mon carnet de voyage</title>
  </head>
  <body>
    <h1>Mon carnet de voyage</h1>
    <h2>Jour 1 : arrivée à Tokyo</h2>
    <p>Nous sommes arrivés très tôt le matin, et la ville était déjà pleine de vie.</p>
    <h2>Jour 2 : le grand marché</h2>
    <p>Nous avons goûté des takoyakis pour la première fois, c'était délicieux.</p>
  </body>
</html>`,
        codeExampleCss: `body {
  font-family: Georgia, serif;
  background-color: #fff8f0;
  color: #3a3a3a;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
}

h1 {
  color: #b34700;
  text-align: center;
}

h2 {
  color: #cc6600;
  margin-top: 25px;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute un titre <h1> avec le texte « Mon carnet de voyage » juste avant le paragraphe.",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mon carnet de voyage</title>
  </head>
  <body>
    <p>Nous sommes arrivés très tôt le matin, et la ville était déjà pleine de vie.</p>
  </body>
</html>`,
        starterCss: `body {
  font-family: Georgia, serif;
  background-color: #fff8f0;
  color: #3a3a3a;
  max-width: 500px;
  margin: 0 auto;
  padding: 30px;
}

p {
  line-height: 1.5;
}`,
        validationRule: { type: "contains-html", snippet: "<h1>" },
        hint: "💡 Indice : la balise pour un grand titre principal s'écrit avec un h et le chiffre 1.",
        xpReward: 55,
      },
    ],
    quiz: {
      title: "Quiz : Titres et paragraphes",
      xpReward: 100,
      questions: [
        {
          question: "Quelle balise correspond au titre le plus important d'une page ?",
          choices: ["h6", "p", "h1", "span"],
          correctIndex: 2,
          explanation: "h1 est réservée au titre principal, le plus important de la page.",
        },
        {
          question: "Quelle balise utilise-t-on pour un paragraphe de texte ?",
          choices: ["p", "h1", "title", "body"],
          correctIndex: 0,
          explanation: "La balise p (paragraphe) sert à écrire le texte courant d'une page.",
        },
        {
          question: "Combien de niveaux de titres existe-t-il en HTML, de h1 à h6 ?",
          choices: ["Trois", "Quatre", "Cinq", "Six"],
          correctIndex: 3,
          explanation: "Il existe six niveaux de titres, de h1 (le plus important) à h6 (le moins important).",
        },
        {
          question: "Que se passe-t-il quand le chiffre après le h augmente ?",
          choices: ["Le titre devient généralement plus petit", "Le titre devient toujours rouge", "La page se recharge", "Rien ne change"],
          correctIndex: 0,
          explanation: "Plus le chiffre est élevé, plus le titre est considéré comme secondaire, et souvent affiché plus petit.",
        },
        {
          question: "Pourquoi découper un texte en plusieurs balises p ?",
          choices: ["Pour ralentir le site", "Pour rendre le texte plus clair à lire", "Parce que c'est obligatoire pour les images", "Pour changer la langue de la page"],
          correctIndex: 1,
          explanation: "Séparer les idées en paragraphes distincts rend un texte beaucoup plus facile à lire.",
        },
      ],
    },
  },
  {
    slug: "les-images",
    level: "beginner",
    title: "Les images",
    description: "Apprends à ajouter des images à tes pages et à toujours penser à celles et ceux qui ne peuvent pas les voir.",
    objective: "Savoir insérer une image avec la balise img et renseigner ses attributs src et alt.",
    icon: "🖼️",
    order: 4,
    lessons: [
      {
        slug: "les-images",
        title: "Les images",
        order: 1,
        summary: "Ajoute des images à tes pages tout en pensant à l'accessibilité.",
        content: `Une page uniquement composée de texte peut vite sembler un peu triste. C'est là qu'intervient la balise img, qui permet d'afficher une image directement dans la page. Contrairement à la plupart des balises HTML, img n'a pas besoin de balise fermante : elle se suffit à elle-même.

Pour fonctionner, la balise img a besoin d'un attribut essentiel, src, qui contient l'adresse de l'image à afficher. Cette adresse peut pointer vers une image sur Internet, ou vers un fichier rangé dans le même dossier que ta page.

## Un attribut à ne jamais oublier

Il existe un second attribut tout aussi important, alt. Il sert à décrire l'image avec des mots, pour les personnes qui utilisent un lecteur d'écran, ou si jamais l'image ne se charge pas correctement. Un bon attribut alt décrit simplement ce que montre l'image, par exemple un renard roux endormi sur un tapis de feuilles.

Prendre l'habitude d'écrire un attribut alt pertinent, c'est rendre ton site accessible à un maximum de personnes, et c'est un vrai geste de développeur ou de développeuse attentif aux autres.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma galerie</title>
  </head>
  <body>
    <h1>Mon animal préféré</h1>
    <img src="https://placehold.co/320x220/png?text=Renard" alt="Un renard roux assis dans une forêt d'automne" />
    <p>Le renard roux est connu pour sa ruse et sa magnifique fourrure.</p>
  </body>
</html>`,
        codeExampleCss: `body {
  font-family: Arial, sans-serif;
  background-color: #f5f0e6;
  text-align: center;
  padding: 30px;
}

img {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin: 15px 0;
}

h1 {
  color: #8a4b08;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute un attribut alt à l'image pour décrire ce qu'elle montre, par exemple alt=«Un renard roux dans la forêt».",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma galerie</title>
  </head>
  <body>
    <h1>Mon animal préféré</h1>
    <img src="https://placehold.co/320x220/png?text=Renard" />
    <p>Le renard roux est connu pour sa ruse et sa magnifique fourrure.</p>
  </body>
</html>`,
        starterCss: `body {
  font-family: Arial, sans-serif;
  background-color: #f5f0e6;
  text-align: center;
  padding: 30px;
}

img {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin: 15px 0;
}

h1 {
  color: #8a4b08;
}`,
        validationRule: { type: "contains-html", snippet: "alt=" },
        hint: "💡 Indice : ajoute alt= suivi d'une description entre guillemets, directement dans la balise img.",
        xpReward: 55,
      },
    ],
    quiz: {
      title: "Quiz : Les images",
      xpReward: 100,
      questions: [
        {
          question: "Quelle balise permet d'afficher une image ?",
          choices: ["<image>", "<img>", "<pic>", "<src>"],
          correctIndex: 1,
          explanation: "La balise img est celle utilisée en HTML pour afficher une image.",
        },
        {
          question: "Quel attribut indique l'adresse de l'image à afficher ?",
          choices: ["alt", "href", "src", "link"],
          correctIndex: 2,
          explanation: "L'attribut src (source) contient l'adresse du fichier image à afficher.",
        },
        {
          question: "À quoi sert l'attribut alt ?",
          choices: ["À changer la couleur de l'image", "À décrire l'image avec du texte", "À agrandir l'image", "À supprimer l'image"],
          correctIndex: 1,
          explanation: "L'attribut alt fournit une description textuelle de l'image, utile pour l'accessibilité.",
        },
        {
          question: "La balise img a-t-elle besoin d'une balise fermante comme </img> ?",
          choices: ["Oui, toujours", "Non, elle se suffit à elle-même", "Seulement le week-end", "Seulement pour les grandes images"],
          correctIndex: 1,
          explanation: "La balise img est une balise autonome, elle ne nécessite pas de balise fermante.",
        },
        {
          question: "Pourquoi est-il important de bien remplir l'attribut alt ?",
          choices: ["Cela rend le site plus rapide", "Cela aide les personnes qui utilisent un lecteur d'écran", "Cela change automatiquement la taille de l'image", "Ce n'est jamais utile"],
          correctIndex: 1,
          explanation: "Un bon attribut alt rend le contenu accessible aux personnes qui ne peuvent pas voir l'image.",
        },
      ],
    },
  },
  {
    slug: "les-liens",
    level: "beginner",
    title: "Les liens",
    description: "Apprends à relier tes pages entre elles et vers le reste du web grâce à un simple clic.",
    objective: "Savoir créer un lien cliquable avec la balise a et son attribut href.",
    icon: "🔗",
    order: 5,
    lessons: [
      {
        slug: "les-liens",
        title: "Les liens",
        order: 1,
        summary: "Relie tes pages entre elles grâce aux liens cliquables.",
        content: `Le web tient son nom du mot anglais qui veut dire toile d'araignée, et ce n'est pas un hasard : les pages sont reliées entre elles par des liens, un peu comme les fils d'une toile. En HTML, on crée un lien avec la balise a, pour ancre.

À elle seule, la balise a ne sait pas où t'emmener. Il lui faut un attribut href, qui contient l'adresse de destination : une autre page du même site, ou une adresse complète vers un site totalement différent.

## Le texte du lien

Tout le texte placé entre la balise ouvrante <a> et la balise fermante </a> devient cliquable, et c'est justement ce texte qui doit donner envie de cliquer, ou au moins expliquer clairement où mène le lien. Évite d'écrire juste cliquez ici : préfère une phrase qui dit ce que la personne va découvrir.

Avec un simple attribut href bien rempli, tu peux emmener tes visiteurs d'une page à l'autre, et construire un vrai petit site avec plusieurs pages reliées entre elles.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mes liens préférés</title>
  </head>
  <body>
    <h1>Mes liens préférés</h1>
    <p>
      Découvre <a href="https://fr.wikipedia.org">l'encyclopédie Wikipédia</a>
      pour en apprendre plus sur presque tous les sujets.
    </p>
  </body>
</html>`,
        codeExampleCss: `body {
  font-family: Arial, sans-serif;
  background-color: #eef2ff;
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
}

h1 {
  color: #3730a3;
}

a {
  color: #4338ca;
  font-weight: bold;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute un attribut href à ce lien pour qu'il mène quelque part, par exemple href=«https://fr.wikipedia.org».",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mes liens préférés</title>
  </head>
  <body>
    <h1>Mes liens préférés</h1>
    <p>
      Découvre <a>l'encyclopédie Wikipédia</a>
      pour en apprendre plus sur presque tous les sujets.
    </p>
  </body>
</html>`,
        starterCss: `body {
  font-family: Arial, sans-serif;
  background-color: #eef2ff;
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
}

h1 {
  color: #3730a3;
}

a {
  color: #4338ca;
  font-weight: bold;
}`,
        validationRule: { type: "contains-html", snippet: "href=" },
        hint: "💡 Indice : ajoute href= suivi d'une adresse entre guillemets, directement dans la balise a.",
        xpReward: 55,
      },
    ],
    quiz: {
      title: "Quiz : Les liens",
      xpReward: 100,
      questions: [
        {
          question: "Quelle balise permet de créer un lien cliquable ?",
          choices: ["<link>", "<a>", "<href>", "<go>"],
          correctIndex: 1,
          explanation: "La balise a (pour ancre) sert à créer des liens cliquables en HTML.",
        },
        {
          question: "Quel attribut contient l'adresse de destination d'un lien ?",
          choices: ["src", "alt", "href", "dest"],
          correctIndex: 2,
          explanation: "L'attribut href indique vers quelle adresse le lien doit emmener la personne.",
        },
        {
          question: "Que devient le texte placé entre <a> et </a> ?",
          choices: ["Il disparaît", "Il devient cliquable", "Il devient une image", "Il devient invisible"],
          correctIndex: 1,
          explanation: "Tout le texte entre les balises a devient une zone cliquable qui mène vers le lien.",
        },
        {
          question: "Pourquoi éviter d'écrire seulement « cliquez ici » comme texte de lien ?",
          choices: ["Parce que c'est interdit par le navigateur", "Parce que cela ne dit pas où mène le lien", "Parce que ça ralentit la page", "Il n'y a aucune raison"],
          correctIndex: 1,
          explanation: "Un texte de lien clair aide à comprendre où l'on va atterrir avant même de cliquer.",
        },
        {
          question: "Un lien peut-il mener vers un site complètement différent ?",
          choices: ["Non, jamais", "Oui, en mettant son adresse complète dans href", "Seulement le dimanche", "Seulement si le site est en français"],
          correctIndex: 1,
          explanation: "L'attribut href peut contenir l'adresse complète de n'importe quel site accessible sur le web.",
        },
      ],
    },
  },
  {
    slug: "listes-et-tableaux",
    level: "beginner",
    title: "Listes et tableaux",
    description: "Découvre comment ranger des informations avec des listes à puces et des tableaux bien organisés.",
    objective: "Savoir créer une liste avec ul, ol et li, ainsi qu'un tableau simple avec table.",
    icon: "📋",
    order: 6,
    lessons: [
      {
        slug: "listes-et-tableaux",
        title: "Listes et tableaux",
        order: 1,
        summary: "Range tes informations dans des listes et des tableaux clairs.",
        content: `Certaines informations se lisent beaucoup mieux sous forme de liste plutôt que dans un long paragraphe. En HTML, il existe deux types de listes. La balise ul crée une liste à puces, sans ordre particulier, parfaite pour une liste de courses. La balise ol crée une liste numérotée, utile quand l'ordre compte, comme les étapes d'une recette.

Dans les deux cas, chaque élément de la liste s'écrit avec une balise li, pour élément de liste. On peut en mettre autant qu'on veut à l'intérieur d'un ul ou d'un ol.

## Ranger des données en tableau

Quand les informations doivent être comparées entre elles, comme des scores ou un emploi du temps, le tableau est encore plus pratique. On le crée avec la balise table, puis on ajoute des lignes avec tr, pour ligne de tableau, et enfin des cellules avec td à l'intérieur de chaque ligne.

Listes et tableaux permettent de transformer des informations en vrac en quelque chose de clair et d'organisé, exactement comme un joli rangement dans une chambre.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mes listes et tableaux</title>
  </head>
  <body>
    <h1>Ma liste de courses</h1>
    <ul>
      <li>Pommes</li>
      <li>Pain</li>
      <li>Fromage</li>
    </ul>

    <h2>Mon emploi du temps</h2>
    <table>
      <tr>
        <th>Jour</th>
        <th>Activité</th>
      </tr>
      <tr>
        <td>Lundi</td>
        <td>Piscine</td>
      </tr>
      <tr>
        <td>Mercredi</td>
        <td>Code avec CodeKids</td>
      </tr>
    </table>
  </body>
</html>`,
        codeExampleCss: `body {
  font-family: Arial, sans-serif;
  background-color: #f7fafc;
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
}

h1, h2 {
  color: #1e3a5f;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

th, td {
  border: 1px solid #a3bffa;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #c3dafe;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute un tableau <table> juste sous le titre « Mon emploi du temps » pour organiser tes activités de la semaine.",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Mes listes et tableaux</title>
  </head>
  <body>
    <h1>Ma liste de courses</h1>
    <ul>
      <li>Pommes</li>
      <li>Pain</li>
      <li>Fromage</li>
    </ul>

    <h2>Mon emploi du temps</h2>
  </body>
</html>`,
        starterCss: `body {
  font-family: Arial, sans-serif;
  background-color: #f7fafc;
  padding: 30px;
  max-width: 480px;
  margin: 0 auto;
}

h1, h2 {
  color: #1e3a5f;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 10px;
}

th, td {
  border: 1px solid #a3bffa;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #c3dafe;
}`,
        validationRule: { type: "contains-html", snippet: "<table>" },
        hint: "💡 Indice : commence par écrire la balise <table> juste après le titre h2, tu pourras ensuite y ajouter des lignes tr.",
        xpReward: 60,
      },
    ],
    quiz: {
      title: "Quiz : Listes et tableaux",
      xpReward: 100,
      questions: [
        {
          question: "Quelle balise crée une liste à puces, sans ordre particulier ?",
          choices: ["<ol>", "<ul>", "<li>", "<table>"],
          correctIndex: 1,
          explanation: "La balise ul crée une liste non ordonnée, affichée avec des puces.",
        },
        {
          question: "Quelle balise crée une liste numérotée ?",
          choices: ["<ul>", "<ol>", "<td>", "<tr>"],
          correctIndex: 1,
          explanation: "La balise ol crée une liste ordonnée, avec des numéros automatiques.",
        },
        {
          question: "Quelle balise représente un élément à l'intérieur d'une liste ?",
          choices: ["<item>", "<li>", "<row>", "<td>"],
          correctIndex: 1,
          explanation: "Chaque élément d'une liste ul ou ol s'écrit avec une balise li.",
        },
        {
          question: "Quelle balise permet de créer un tableau ?",
          choices: ["<table>", "<list>", "<grid>", "<box>"],
          correctIndex: 0,
          explanation: "La balise table est celle qui crée un tableau en HTML.",
        },
        {
          question: "Que contient une balise tr dans un tableau ?",
          choices: ["Une image", "Une ligne du tableau", "Un lien", "Le titre de la page"],
          correctIndex: 1,
          explanation: "tr signifie table row, c'est-à-dire une ligne du tableau, qui contient elle-même des cellules td.",
        },
      ],
    },
  },
  {
    slug: "boutons-et-formulaires",
    level: "beginner",
    title: "Boutons et formulaires",
    description: "Apprends à créer des formulaires interactifs pour permettre aux visiteurs de saisir des informations.",
    objective: "Savoir construire un formulaire simple avec form, input et button.",
    icon: "🔘",
    order: 7,
    lessons: [
      {
        slug: "boutons-et-formulaires",
        title: "Boutons et formulaires",
        order: 1,
        summary: "Construis ton premier formulaire pour recevoir des informations.",
        content: `Jusqu'ici, tes pages affichaient des informations, mais elles ne pouvaient rien recevoir de la part du visiteur. C'est le rôle des formulaires, créés grâce à la balise form, qui permettent à quelqu'un de saisir du texte, de cocher des cases ou de faire un choix.

À l'intérieur d'un formulaire, on utilise souvent la balise input pour créer une petite zone de saisie. Son attribut type change complètement son comportement : type="text" pour du texte simple, type="email" pour une adresse email, ou encore type="password" pour un mot de passe caché.

## Valider avec un bouton

Un formulaire a besoin d'un moyen d'être envoyé, et c'est le rôle de la balise button. On y écrit un texte clair, comme Envoyer ou Valider, pour que la personne sache exactement ce qui va se passer quand elle clique.

En combinant form, input et button, tu peux créer des petits questionnaires, des formulaires de contact ou même le début d'un jeu qui demande le prénom du joueur avant de commencer.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Formulaire de contact</title>
  </head>
  <body>
    <h1>Contacte-moi</h1>
    <form>
      <label>Ton prénom :</label>
      <input type="text" placeholder="Ton prénom" />
      <label>Ton message :</label>
      <input type="text" placeholder="Écris ton message ici" />
      <button>Envoyer</button>
    </form>
  </body>
</html>`,
        codeExampleCss: `body {
  font-family: Arial, sans-serif;
  background-color: #fef6ff;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  color: #7b2cbf;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #c9a0dc;
  border-radius: 6px;
}

button {
  background-color: #9d4edd;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute un bouton <button> avec le texte « Envoyer » à la toute fin du formulaire.",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Formulaire de contact</title>
  </head>
  <body>
    <h1>Contacte-moi</h1>
    <form>
      <label>Ton prénom :</label>
      <input type="text" placeholder="Ton prénom" />
      <label>Ton message :</label>
      <input type="text" placeholder="Écris ton message ici" />
    </form>
  </body>
</html>`,
        starterCss: `body {
  font-family: Arial, sans-serif;
  background-color: #fef6ff;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
}

h1 {
  color: #7b2cbf;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #c9a0dc;
  border-radius: 6px;
}

button {
  background-color: #9d4edd;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}`,
        validationRule: { type: "contains-html", snippet: "<button>" },
        hint: "💡 Indice : ajoute une balise <button>Envoyer</button> juste avant </form>.",
        xpReward: 60,
      },
    ],
    quiz: {
      title: "Quiz : Boutons et formulaires",
      xpReward: 100,
      questions: [
        {
          question: "Quelle balise permet de créer un formulaire ?",
          choices: ["<form>", "<input>", "<button>", "<field>"],
          correctIndex: 0,
          explanation: "La balise form regroupe tous les éléments d'un formulaire.",
        },
        {
          question: "Quelle balise permet à un visiteur de saisir du texte ?",
          choices: ["<text>", "<input>", "<write>", "<label>"],
          correctIndex: 1,
          explanation: "La balise input crée une zone de saisie, dont le comportement dépend de son attribut type.",
        },
        {
          question: "Quel attribut de input change le type de zone de saisie ?",
          choices: ["src", "href", "type", "alt"],
          correctIndex: 2,
          explanation: "L'attribut type définit si la saisie attend du texte, un email, un mot de passe, etc.",
        },
        {
          question: "Quelle balise permet d'envoyer ou de valider un formulaire ?",
          choices: ["<button>", "<img>", "<a>", "<li>"],
          correctIndex: 0,
          explanation: "La balise button crée un bouton cliquable, souvent utilisé pour valider un formulaire.",
        },
        {
          question: "Pourquoi écrire un texte clair comme « Envoyer » sur un bouton ?",
          choices: ["Pour que la personne sache ce qui va se passer", "Pour changer la couleur du bouton", "Ce n'est pas important", "Pour ralentir la page"],
          correctIndex: 0,
          explanation: "Un texte de bouton clair aide la personne à comprendre l'action qu'elle va déclencher.",
        },
      ],
    },
  },
  {
    slug: "css-couleurs-et-arriere-plans",
    level: "beginner",
    title: "Introduction au CSS : couleurs et arrière-plans",
    description: "Donne vie à tes pages en choisissant enfin toi-même leurs couleurs et leurs fonds.",
    objective: "Savoir utiliser les propriétés CSS color et background-color pour styliser une page.",
    icon: "🎨",
    order: 8,
    lessons: [
      {
        slug: "css-couleurs-et-arriere-plans",
        title: "Introduction au CSS : couleurs et arrière-plans",
        order: 1,
        summary: "Choisis enfin les couleurs et les fonds de tes pages avec le CSS.",
        content: `Jusqu'à présent, tes pages étaient noires sur fond blanc, la présentation par défaut du navigateur. Il est temps de changer ça grâce au CSS, en utilisant deux propriétés très simples : color et background-color.

La propriété color change la couleur du texte, tandis que background-color change la couleur de fond d'un élément. On peut les écrire avec un nom de couleur en anglais, comme red ou blue, ou avec un code plus précis comme #ff6600.

## Où écrire ces règles

Le CSS s'écrit sous la forme de règles : un sélecteur, une accolade ouvrante, une propriété, deux points, une valeur, un point-virgule, puis une accolade fermante. Le sélecteur indique à quel élément la règle s'applique, par exemple h1 ou body. Dans CodeKids, tu écris ces règles directement dans la zone CSS, à côté de ton HTML.

Avec seulement ces deux propriétés, tu peux déjà transformer complètement l'ambiance d'une page, du sérieux au joyeux, simplement en changeant quelques mots dans ton CSS.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma page colorée</title>
  </head>
  <body>
    <h1>Bienvenue sur ma page colorée</h1>
    <p>J'apprends à choisir mes propres couleurs avec le CSS.</p>
  </body>
</html>`,
        codeExampleCss: `body {
  background-color: #fff4e6;
}

h1 {
  color: #d1495b;
}

p {
  color: #5c3d00;
  font-size: 18px;
}`,
        hasEditor: true,
        missionPrompt: "Change la couleur du texte du titre h1 en bleu, avec color: blue;",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma page colorée</title>
  </head>
  <body>
    <h1>Bienvenue sur ma page colorée</h1>
    <p>J'apprends à choisir mes propres couleurs avec le CSS.</p>
  </body>
</html>`,
        starterCss: `body {
  background-color: #fff4e6;
}

h1 {
  color: red;
}

p {
  color: #5c3d00;
  font-size: 18px;
}`,
        validationRule: { type: "css-property", selector: "h1", property: "color", value: "blue" },
        hint: "💡 Indice : regarde la propriété color à l'intérieur du sélecteur h1, dans le fichier CSS.",
        xpReward: 60,
      },
    ],
    quiz: {
      title: "Quiz : Introduction au CSS : couleurs et arrière-plans",
      xpReward: 100,
      questions: [
        {
          question: "Quelle propriété CSS change la couleur du texte ?",
          choices: ["background-color", "color", "font-size", "border"],
          correctIndex: 1,
          explanation: "La propriété color s'applique à la couleur du texte d'un élément.",
        },
        {
          question: "Quelle propriété CSS change la couleur de fond ?",
          choices: ["color", "background-color", "margin", "padding"],
          correctIndex: 1,
          explanation: "La propriété background-color définit la couleur d'arrière-plan d'un élément.",
        },
        {
          question: "Comment se termine chaque déclaration CSS, comme color: blue ?",
          choices: ["Par une virgule", "Par un point-virgule", "Par un point d'exclamation", "Par rien du tout"],
          correctIndex: 1,
          explanation: "Chaque déclaration CSS se termine par un point-virgule, avant de passer à la suivante.",
        },
        {
          question: "Comment peut-on écrire une couleur en CSS ?",
          choices: ["Uniquement en français", "Avec un nom anglais ou un code comme #ff6600", "Uniquement en chiffres romains", "Ce n'est jamais possible"],
          correctIndex: 1,
          explanation: "On peut utiliser un nom de couleur en anglais (red, blue...) ou un code hexadécimal comme #ff6600.",
        },
        {
          question: "Quel est le sélecteur dans la règle h1 { color: blue; } ?",
          choices: ["blue", "color", "h1", "le point-virgule"],
          correctIndex: 2,
          explanation: "h1 est le sélecteur : il indique à quel élément la règle de style s'applique.",
        },
      ],
    },
  },
  {
    slug: "polices-tailles-marges-bordures",
    level: "beginner",
    title: "Polices, tailles, marges et bordures",
    description: "Peaufine l'apparence de tes textes et de tes blocs avec quatre propriétés CSS essentielles.",
    objective: "Savoir utiliser font-family, font-size, margin, padding et border pour mettre en forme un élément.",
    icon: "🔠",
    order: 9,
    lessons: [
      {
        slug: "polices-tailles-marges-bordures",
        title: "Polices, tailles, marges et bordures",
        order: 1,
        summary: "Peaufine la mise en forme de tes blocs avec quatre propriétés CSS clés.",
        content: `Le CSS ne se limite pas aux couleurs : il permet aussi de choisir précisément la police et la taille du texte. La propriété font-family définit la police utilisée, par exemple Arial ou Georgia, tandis que font-size détermine sa taille, souvent en pixels, comme 16px ou 24px.

Pour l'espace autour des éléments, deux propriétés se ressemblent mais font des choses différentes. padding ajoute de l'espace à l'intérieur d'un élément, entre son contenu et son bord. margin ajoute de l'espace à l'extérieur, entre l'élément et ses voisins.

## Encadrer avec une bordure

La propriété border permet d'ajouter un cadre autour d'un élément. Elle se règle en une seule ligne avec trois informations : l'épaisseur du trait, comme 2px, son style, comme solid pour un trait plein, et sa couleur, comme dans border: 2px solid violet;.

En combinant ces quatre propriétés, tu peux transformer un simple bloc de texte en une vraie petite carte bien mise en valeur, avec de l'air autour et un joli cadre.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma carte info</title>
  </head>
  <body>
    <div class="carte">
      <h2>Astuce du jour</h2>
      <p>Un bon padding donne toujours plus d'air à ton texte.</p>
    </div>
  </body>
</html>`,
        codeExampleCss: `body {
  background-color: #f0f4ff;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.carte {
  font-family: Verdana, sans-serif;
  font-size: 16px;
  background-color: white;
  border: 3px solid #5c7cfa;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  max-width: 280px;
}

.carte h2 {
  font-size: 20px;
  color: #364fc7;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute une bordure à la classe .carte avec border: 2px solid violet;",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma carte info</title>
  </head>
  <body>
    <div class="carte">
      <h2>Astuce du jour</h2>
      <p>Un bon padding donne toujours plus d'air à ton texte.</p>
    </div>
  </body>
</html>`,
        starterCss: `body {
  background-color: #f0f4ff;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.carte {
  font-family: Verdana, sans-serif;
  font-size: 16px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  max-width: 280px;
}

.carte h2 {
  font-size: 20px;
  color: #364fc7;
}`,
        validationRule: { type: "css-property", selector: ".carte", property: "border", value: "2px solid violet" },
        hint: "💡 Indice : ajoute la ligne border: 2px solid violet; à l'intérieur du sélecteur .carte.",
        xpReward: 65,
      },
    ],
    quiz: {
      title: "Quiz : Polices, tailles, marges et bordures",
      xpReward: 100,
      questions: [
        {
          question: "Quelle propriété CSS choisit la police d'un texte ?",
          choices: ["font-size", "font-family", "color", "border"],
          correctIndex: 1,
          explanation: "font-family définit quelle police de caractères est utilisée pour le texte.",
        },
        {
          question: "Quelle propriété change la taille du texte ?",
          choices: ["font-size", "margin", "padding", "border"],
          correctIndex: 0,
          explanation: "font-size détermine la taille du texte, souvent exprimée en pixels.",
        },
        {
          question: "Quelle est la différence entre padding et margin ?",
          choices: ["Il n'y a aucune différence", "padding est à l'intérieur, margin est à l'extérieur de l'élément", "padding est à l'extérieur, margin est à l'intérieur", "Les deux changent la couleur"],
          correctIndex: 1,
          explanation: "padding ajoute de l'espace interne, margin ajoute de l'espace externe autour de l'élément.",
        },
        {
          question: "Que définit la propriété border ?",
          choices: ["La couleur de fond", "Un cadre autour de l'élément", "La police du texte", "La position de l'élément sur l'écran"],
          correctIndex: 1,
          explanation: "border ajoute un contour visible, en précisant son épaisseur, son style et sa couleur.",
        },
        {
          question: "Dans border: 2px solid violet;, que représente le mot solid ?",
          choices: ["La couleur du cadre", "L'épaisseur du cadre", "Le style du trait, ici un trait plein", "Le nom de la police"],
          correctIndex: 2,
          explanation: "solid indique que le trait de la bordure est plein, sans pointillés ni tirets.",
        },
      ],
    },
  },
  {
    slug: "classes-selecteurs-carte-profil",
    level: "beginner",
    title: "Classes, sélecteurs et ma carte de profil",
    description: "Rassemble tout ce que tu as appris pour construire ta toute première carte de profil personnalisée.",
    objective: "Savoir utiliser l'attribut class avec un sélecteur CSS pour styliser un élément précis, dans un mini-projet complet.",
    icon: "🪪",
    order: 10,
    lessons: [
      {
        slug: "classes-selecteurs-carte-profil",
        title: "Classes, sélecteurs et ma carte de profil",
        order: 1,
        summary: "Construis ta première carte de profil en combinant tout ce que tu as appris.",
        content: `Sur une page, tu as parfois besoin de styliser un élément précis, sans toucher à tous les autres du même type. C'est exactement à ça que sert l'attribut class. On l'ajoute directement sur une balise HTML, par exemple class="carte-profil", puis on cible cette classe en CSS avec un point devant son nom, comme .carte-profil.

Un même élément peut avoir plusieurs classes, et une même classe peut être utilisée sur plusieurs éléments différents. C'est ce qui rend les classes si pratiques : elles permettent de réutiliser le même style à plusieurs endroits, sans tout réécrire.

## Le grand projet : ta carte de profil

Aujourd'hui, tu vas rassembler tout ce que tu as appris depuis le début : des titres, une image, un peu de texte, et surtout du CSS pour donner à tout ça une allure de vraie carte de profil, comme celles qu'on voit sur les réseaux ou dans les jeux vidéo.

Le secret d'une belle carte de profil, c'est de regrouper ses éléments dans un bloc div avec une classe, puis d'appliquer à cette classe un fond, une bordure arrondie et un peu d'espace intérieur. Une fois que tu as compris ça, tu peux créer autant de cartes différentes que tu veux, pour toi ou pour tes personnages préférés.`,
        codeExampleHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma carte de profil</title>
  </head>
  <body>
    <div class="carte-profil">
      <img src="https://placehold.co/100x100/png?text=%3A%29" alt="Avatar souriant" class="avatar" />
      <h2>Léa, 11 ans</h2>
      <p>Passionnée de code, de dessin et de jeux vidéo.</p>
    </div>
  </body>
</html>`,
        codeExampleCss: `body {
  background-color: #e0f2fe;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  font-family: Verdana, sans-serif;
}

.carte-profil {
  background-color: white;
  border: 2px solid #38bdf8;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  max-width: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  border-radius: 50%;
  margin-bottom: 10px;
}

.carte-profil h2 {
  color: #0369a1;
  font-size: 18px;
  margin: 5px 0;
}`,
        hasEditor: true,
        missionPrompt: "Ajoute un sélecteur .carte-profil dans le CSS et donne-lui un fond blanc avec background-color: white;",
        starterHtml: `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>Ma carte de profil</title>
  </head>
  <body>
    <div class="carte-profil">
      <img src="https://placehold.co/100x100/png?text=%3A%29" alt="Avatar souriant" class="avatar" />
      <h2>Léa, 11 ans</h2>
      <p>Passionnée de code, de dessin et de jeux vidéo.</p>
    </div>
  </body>
</html>`,
        starterCss: `body {
  background-color: #e0f2fe;
  display: flex;
  justify-content: center;
  padding-top: 40px;
  font-family: Verdana, sans-serif;
}

.avatar {
  border-radius: 50%;
  margin-bottom: 10px;
}

.carte-profil h2 {
  color: #0369a1;
  font-size: 18px;
  margin: 5px 0;
}`,
        validationRule: { type: "css-property", selector: ".carte-profil", property: "background-color", value: "white" },
        hint: "💡 Indice : crée un sélecteur .carte-profil suivi d'accolades, et ajoute-lui la ligne background-color: white;",
        xpReward: 70,
      },
    ],
    quiz: {
      title: "Quiz : Classes, sélecteurs et ma carte de profil",
      xpReward: 100,
      questions: [
        {
          question: "Comment cible-t-on une classe CSS nommée carte-profil ?",
          choices: [".carte-profil", "#carte-profil", "carte-profil", "*carte-profil"],
          correctIndex: 0,
          explanation: "Un sélecteur de classe s'écrit toujours avec un point suivi du nom de la classe.",
        },
        {
          question: "Un même élément HTML peut-il avoir plusieurs classes ?",
          choices: ["Non, jamais", "Oui, il suffit de les séparer par un espace", "Seulement s'il n'a pas d'id", "Seulement pour les images"],
          correctIndex: 1,
          explanation: "On peut écrire plusieurs noms de classes séparés par un espace dans l'attribut class.",
        },
        {
          question: "Pourquoi utiliser des classes plutôt que styliser chaque balise une par une ?",
          choices: ["Pour rendre le code plus lent", "Pour réutiliser le même style à plusieurs endroits", "Ce n'est jamais utile", "Pour empêcher le CSS de fonctionner"],
          correctIndex: 1,
          explanation: "Les classes permettent de réutiliser un même style sur plusieurs éléments sans tout réécrire.",
        },
        {
          question: "Dans une carte de profil, quel élément regroupe généralement tout le contenu ?",
          choices: ["Un <div> avec une classe", "Une balise <title>", "Une balise <meta>", "Le DOCTYPE"],
          correctIndex: 0,
          explanation: "On utilise souvent un div avec une classe pour regrouper les éléments d'un même bloc, comme une carte.",
        },
        {
          question: "Que permet de faire ce cours capstone par rapport aux précédents ?",
          choices: ["Apprendre un tout nouveau langage", "Combiner plusieurs notions HTML et CSS déjà vues", "Oublier tout ce qui a été appris avant", "Se passer complètement de CSS"],
          correctIndex: 1,
          explanation: "Ce mini-projet combine titres, images, texte, classes et propriétés CSS déjà apprises dans les cours précédents.",
        },
      ],
    },
  },
];
