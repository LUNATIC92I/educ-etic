import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { NewCourseForm } from "@/components/admin/new-course-form";

export const metadata: Metadata = { title: "Nouveau cours" };

export default function NewCoursePage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Nouveau cours</h1>
      <p className="mt-1 text-ck-text-muted">
        Une leçon et un quiz vides seront créés automatiquement — tu pourras les compléter juste après.
      </p>
      <Card className="mt-6 p-6">
        <NewCourseForm />
      </Card>
    </div>
  );
}
