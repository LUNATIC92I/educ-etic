import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { IssueCertificateForm } from "@/components/admin/issue-certificate-form";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Certificats" };

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export default async function AdminCertificatesPage() {
  const [certificates, children] = await Promise.all([
    db.certificate.findMany({ orderBy: { issuedAt: "desc" }, include: { user: { select: { name: true } } } }),
    db.user.findMany({ where: { role: "CHILD" }, select: { id: true, name: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Certificats</h1>
        <p className="mt-1 text-ck-text-muted">{certificates.length} certificats délivrés.</p>
      </div>

      <Card className="p-6">
        <h2 className="font-display text-lg font-bold">Générer un certificat manuellement</h2>
        <p className="mt-1 text-sm text-ck-text-muted">
          Les certificats sont normalement délivrés automatiquement à la fin d&apos;un niveau. Utilise ce
          formulaire uniquement pour un cas particulier.
        </p>
        <div className="mt-4">
          <IssueCertificateForm children={children} />
        </div>
      </Card>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-ck-bg text-left text-xs uppercase text-ck-text-muted">
            <tr>
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Enfant</th>
              <th className="px-4 py-3">Niveau</th>
              <th className="px-4 py-3">Délivré le</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((c) => (
              <tr key={c.id} className="border-t border-ck-border">
                <td className="px-4 py-3 font-mono text-xs">{c.certificateNumber}</td>
                <td className="px-4 py-3">{c.user.name}</td>
                <td className="px-4 py-3">{LEVEL_LABELS[c.level] ?? c.level}</td>
                <td className="px-4 py-3 text-ck-text-muted">{formatDate(c.issuedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
