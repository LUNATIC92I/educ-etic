import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { CertificateView } from "@/components/certificates/certificate-view";
import { formatDate } from "@/lib/utils";

const LEVEL_LABELS: Record<string, string> = {
  beginner: "Débutant",
  intermediate: "Intermédiaire",
  advanced: "Avancé",
};

export const metadata: Metadata = { title: "Mon certificat" };

export default async function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireChildUser();
  const { id } = await params;

  const certificate = await db.certificate.findUnique({ where: { id } });
  if (!certificate || certificate.userId !== user.id) notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <CertificateView
        studentName={user.name}
        courseName={certificate.courseName}
        levelLabel={LEVEL_LABELS[certificate.level] ?? certificate.level}
        issuedAt={formatDate(certificate.issuedAt)}
        certificateNumber={certificate.certificateNumber}
      />
    </div>
  );
}
