import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Projets" };

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { updatedAt: "desc" },
    take: 60,
    include: { user: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Projets</h1>
        <p className="mt-1 text-ck-text-muted">{projects.length} projets récents (sur toute la plateforme).</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="h-32 w-full overflow-hidden border-b border-ck-border bg-white">
              <iframe
                title={project.title}
                srcDoc={`<style>${project.css}</style>${project.html}`}
                sandbox=""
                className="pointer-events-none h-[340px] w-[380%] origin-top-left scale-[0.26]"
              />
            </div>
            <div className="p-4">
              <p className="font-semibold">{project.title}</p>
              <p className="text-xs text-ck-text-muted">
                Par {project.user.name} · {formatDate(project.updatedAt)}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
