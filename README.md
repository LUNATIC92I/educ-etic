# 🚀 CodeKids

Plateforme d'apprentissage HTML & CSS pour enfants de 8 à 16 ans — cours interactifs, éditeur de code en direct, quiz, gamification (XP, badges, certificats), espace parent et back-office admin.

## Démarrage rapide (localhost)

Prérequis : [Node.js](https://nodejs.org) 20+ installé.

```bash
git clone https://github.com/LUNATIC92I/educ-etic.git
cd educ-etic
npm install
npm run setup
npm run dev
```

Puis ouvre **http://localhost:3000**.

`npm run setup` fait tout le travail en une commande : création du fichier `.env` (avec une clé de session générée automatiquement), création de la base de données SQLite locale, et remplissage avec des données de démonstration (30 cours, badges, comptes de test).

### Comptes de démonstration

| Rôle | Identifiant | Mot de passe |
|---|---|---|
| 🛡️ Admin | `admin@codekids.dev` | `Admin1234!` |
| 👨‍👩‍👧 Parent | `parent@codekids.dev` | `Parent1234!` |
| 🧑‍🚀 Enfant | `leo` | `leo1234` |
| 👧 Enfant | `nina` | `nina1234` |

## Commandes utiles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run setup` | Configuration complète en une commande (voir ci-dessus) |
| `npm run db:seed` | Réinitialise les données de démonstration |
| `npm run db:reset` | Réinitialise entièrement la base de données |

## Stack technique

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Prisma (SQLite en local, PostgreSQL en production) · Stripe (paiements) · JWT (sessions) · jsPDF (certificats).

## Configuration Stripe (optionnel)

Sans configuration, les paiements fonctionnent en **mode démo** (simulés, déblocage instantané). Pour activer de vrais paiements, renseigne dans `.env` :

```
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
```

## Déploiement en production

1. Dans `prisma/schema.prisma`, remplace `provider = "sqlite"` par `provider = "postgresql"`.
2. Renseigne `DATABASE_URL` avec une base PostgreSQL (Neon, Supabase, Railway...).
3. `npx prisma migrate deploy && npm run db:seed`.
4. Déploie sur [Vercel](https://vercel.com) ou tout hébergeur compatible Next.js, avec les variables d'environnement de `.env.example`.
