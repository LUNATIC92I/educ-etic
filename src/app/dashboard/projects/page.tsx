import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Mes projets" };

export default async function ProjectsPage() {
  const user = await requireChildUser();
  const projects = await db.project.findMany({ where: { userId: user.id }, orderBy: { updatedAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Mes projets</h1>
          <p className="mt-1 text-ck-text-muted">Tous les sites que tu as créés et sauvegardés.</p>
        </div>
        <Button href="/editor">+ Nouveau projet</Button>
      </div>

      {projects.length === 0 ? (
        <Card className="mt-8 p-10 text-center">
          <p className="text-4xl">🗂️</p>
          <p className="mt-3 text-ck-text-muted">Tu n&apos;as encore sauvegardé aucun projet.</p>
          <Button href="/editor" className="mt-5">Ouvrir l&apos;éditeur</Button>
        </Card>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="h-36 w-full overflow-hidden border-b border-ck-border bg-white">
                <iframe
                  title={project.title}
                  srcDoc={`<style>${project.css}</style>${project.html}`}
                  sandbox=""
                  className="pointer-events-none h-[340px] w-[380%] origin-top-left scale-[0.26]"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold">{project.title}</p>
                <p className="text-xs text-ck-text-muted">Modifié le {formatDate(project.updatedAt)}</p>
                <Link
                  href={`/editor?project=${project.id}`}
                  className="mt-3 inline-block text-sm font-semibold text-electric-500 hover:underline"
                >
                  Ouvrir dans l&apos;éditeur →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
