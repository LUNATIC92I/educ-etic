import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { CourseEditor } from "@/components/admin/course-editor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const course = await db.course.findUnique({ where: { id } });
  return { title: course ? `Modifier — ${course.title}` : "Modifier le cours" };
}

export default async function AdminCourseEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const course = await db.course.findUnique({
    where: { id },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quizzes: { include: { questions: { orderBy: { order: "asc" } } } },
    },
  });
  if (!course) notFound();

  const lesson = course.lessons[0];
  const quiz = course.quizzes[0];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{course.icon} {course.title}</h1>
      <p className="mt-1 text-ck-text-muted">Modifie le contenu de ce cours, sa leçon et son quiz.</p>

      <div className="mt-6">
        <CourseEditor
          courseId={course.id}
          initial={{
            course: {
              title: course.title,
              description: course.description,
              objective: course.objective,
              icon: course.icon,
              order: course.order,
              published: course.published,
            },
            lesson: lesson
              ? {
                  title: lesson.title,
                  summary: lesson.summary,
                  content: lesson.content,
                  codeExampleHtml: lesson.codeExampleHtml,
                  codeExampleCss: lesson.codeExampleCss,
                  missionPrompt: lesson.missionPrompt,
                  starterHtml: lesson.starterHtml,
                  starterCss: lesson.starterCss,
                  hint: lesson.hint,
                  xpReward: lesson.xpReward,
                  validationRule: lesson.validationRule,
                }
              : {
                  title: "",
                  summary: "",
                  content: "",
                  codeExampleHtml: "",
                  codeExampleCss: "",
                  missionPrompt: "",
                  starterHtml: "",
                  starterCss: "",
                  hint: "",
                  xpReward: 50,
                  validationRule: "{}",
                },
            quiz: quiz ? { title: quiz.title, xpReward: quiz.xpReward } : { title: "", xpReward: 100 },
            questions: quiz
              ? quiz.questions.map((q) => ({
                  id: q.id,
                  question: q.question,
                  choices: JSON.parse(q.choicesJson) as string[],
                  correctIndex: q.correctIndex,
                  explanation: q.explanation,
                }))
              : [],
          }}
        />
      </div>
    </div>
  );
}
