import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Mes certificats" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export default async function CertificatesPage() {
  const user = await requireChildUser();
  const certificates = await db.certificate.findMany({ where: { userId: user.id }, orderBy: { issuedAt: "desc" } });

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Mes certificats</h1>
      <p className="mt-1 text-ck-text-muted">Un certificat officiel à chaque niveau terminé.</p>

      {certificates.length === 0 ? (
        <Card className="mt-8 p-10 text-center">
          <p className="text-4xl">🎓</p>
          <p className="mt-3 text-ck-text-muted">
            Termine toutes les leçons et le quiz d&apos;un niveau pour obtenir ton premier certificat.
          </p>
        </Card>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {certificates.map((cert) => (
            <Link key={cert.id} href={`/dashboard/certificates/${cert.id}`}>
              <Card className="flex flex-col items-center gap-3 border-sunny-400 p-8 text-center transition-transform hover:-translate-y-1">
                <div className="text-5xl">🏅</div>
                <p className="font-display text-lg font-bold">Niveau {LEVEL_LABELS[cert.level] ?? cert.level}</p>
                <p className="text-xs text-ck-text-muted">Délivré le {formatDate(cert.issuedAt)}</p>
                <p className="font-mono text-[10px] text-ck-text-muted">{cert.certificateNumber}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
