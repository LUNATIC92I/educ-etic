import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/marketing/auth-shell";
import { ForgotPasswordForm } from "@/components/marketing/forgot-password-form";

export const metadata: Metadata = { title: "Mot de passe oublié" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Mot de passe oublié ?"
      subtitle="Indique ton email, on t'envoie un lien pour le réinitialiser."
      footer={
        <Link href="/login" className="font-semibold text-white hover:underline">
          ← Retour à la connexion
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
