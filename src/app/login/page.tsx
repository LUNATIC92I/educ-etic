import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/marketing/auth-shell";
import { LoginForm } from "@/components/marketing/login-form";

export const metadata: Metadata = { title: "Connexion" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const redirectTo = params.redirect ?? "/";

  return (
    <AuthShell
      title="Content de te revoir 👋"
      subtitle="Connecte-toi pour continuer ton aventure."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/register" className="font-semibold text-white hover:underline">
            Créer un compte parent
          </Link>
        </>
      }
    >
      <LoginForm redirectTo={redirectTo} />
    </AuthShell>
  );
}
