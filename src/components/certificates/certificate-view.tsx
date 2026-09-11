"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function CertificateView({
  studentName,
  courseName,
  levelLabel,
  issuedAt,
  certificateNumber,
}: {
  studentName: string;
  courseName: string;
  levelLabel: string;
  issuedAt: string;
  certificateNumber: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  async function download() {
    if (!ref.current) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(ref.current, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`certificat-codekids-${certificateNumber}.pdf`);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div>
      <div
        ref={ref}
        className="relative mx-auto aspect-[1.414/1] w-full max-w-3xl overflow-hidden rounded-2xl border-[10px] border-double p-10 text-center"
        style={{
          borderColor: "#8b3dff",
          background: "linear-gradient(135deg,#ffffff 0%,#f5f0ff 50%,#eef4ff 100%)",
        }}
      >
        <div className="absolute left-6 top-6 text-3xl">🚀</div>
        <div className="absolute right-6 top-6 text-3xl">👑</div>

        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-violet-500">CodeKids</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-nightsky-500 sm:text-4xl">
          Certificat de réussite
        </h1>
        <p className="mt-6 text-sm text-ck-text-muted">Ce certificat est décerné à</p>
        <p className="mt-2 font-display text-3xl font-bold text-electric-600">{studentName}</p>
        <p className="mt-6 text-sm text-ck-text-muted">pour avoir terminé avec succès</p>
        <p className="mt-2 font-display text-xl font-bold text-violet-600">{courseName}</p>
        <p className="mt-1 text-sm font-semibold text-ck-text-muted">Niveau {levelLabel}</p>

        <div className="mt-10 flex items-end justify-between text-left text-xs text-ck-text-muted">
          <div>
            <p className="font-semibold">Date</p>
            <p>{issuedAt}</p>
          </div>
          <div className="font-display text-lg italic text-nightsky-500">CodeKids ✦</div>
          <div className="text-right">
            <p className="font-semibold">N° de certificat</p>
            <p className="font-mono">{certificateNumber}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Button onClick={download} disabled={downloading}>
          {downloading ? "Génération du PDF…" : "⬇️ Télécharger mon certificat"}
        </Button>
      </div>
    </div>
  );
}
