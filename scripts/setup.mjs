#!/usr/bin/env node
// One-command local setup: creates .env if missing, applies the DB schema,
// and seeds demo data — so `npm run setup && npm run dev` is enough to try
// CodeKids locally with zero manual configuration.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const envPath = path.join(root, ".env");
const envExamplePath = path.join(root, ".env.example");

function run(command) {
  console.log(`\n$ ${command}`);
  execSync(command, { stdio: "inherit", cwd: root });
}

console.log("🚀 Configuration de CodeKids en local...\n");

if (!existsSync(envPath)) {
  const template = readFileSync(envExamplePath, "utf8");
  const secret = randomBytes(32).toString("hex");
  const content = template.replace("replace-with-a-long-random-secret", secret);
  writeFileSync(envPath, content);
  console.log("✔ Fichier .env créé avec un AUTH_SECRET généré automatiquement.");
} else {
  console.log("✔ Fichier .env déjà présent, on le laisse tel quel.");
}

run("npx prisma migrate deploy");
run("npm run db:seed");

console.log(`
✅ CodeKids est prêt !

Lance le serveur avec :
  npm run dev

Puis ouvre http://localhost:3000

Comptes de démonstration :
  🛡️  Admin  → admin@codekids.dev   / Admin1234!
  👨‍👩‍👧 Parent → parent@codekids.dev  / Parent1234!
  🧑‍🚀 Enfant → identifiant "leo"    / code "leo1234"
  👧 Enfant → identifiant "nina"   / code "nina1234"
`);
