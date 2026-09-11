import type { Metadata } from "next";
import { db } from "@/lib/db";
import { requireChildUser } from "@/lib/require-user";
import { FreeEditor } from "@/components/editor/free-editor";

export const metadata: Metadata = { title: "Éditeur de code" };

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>;
}) {
  const user = await requireChildUser();
  const { project: projectId } = await searchParams;

  let project = null;
  if (projectId) {
    const found = await db.project.findUnique({ where: { id: projectId } });
    if (found && found.userId === user.id) project = found;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">💻 Éditeur libre</h1>
      <p className="mt-1 text-ck-text-muted">
        Expérimente librement avec HTML &amp; CSS. Sauvegarde ton projet pour le retrouver plus tard.
      </p>
      <div className="mt-6">
        <FreeEditor
          projectId={project?.id}
          initialTitle={project?.title}
          initialHtml={project?.html}
          initialCss={project?.css}
        />
      </div>
    </div>
  );
}
