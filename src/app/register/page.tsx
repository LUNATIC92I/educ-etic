import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/marketing/auth-shell";
import { RegisterForm } from "@/components/marketing/register-form";

export const metadata: Metadata = { title: "Créer un compte" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Crée ton compte parent 🚀"
      subtitle="Tu pourras ensuite créer le profil de ton enfant en toute sécurité."
      footer={
        <>
          Déjà un compte ?{" "}
          <Link href="/login" className="font-semibold text-white hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
