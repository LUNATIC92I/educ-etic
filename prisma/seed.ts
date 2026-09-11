import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { beginnerCourses } from "../src/data/courses/beginner";
import { intermediateCourses } from "../src/data/courses/intermediate";
import { advancedCourses } from "../src/data/courses/advanced";
import { BADGE_CATALOG } from "../src/data/site";
import { computeLevel } from "../src/lib/xp";
import { generateCertificateNumber } from "../src/lib/certificate";
import type { SeedCourse } from "../src/data/courses/types";

const db = new PrismaClient();

const ALL_COURSES: SeedCourse[] = [...beginnerCourses, ...intermediateCourses, ...advancedCourses];

async function seedBadges() {
  for (const badge of BADGE_CATALOG) {
    await db.badge.upsert({
      where: { code: badge.code },
      update: { name: badge.name, description: badge.description, emoji: badge.emoji },
      create: { ...badge },
    });
  }
  console.log(`Seeded ${BADGE_CATALOG.length} badges`);
}

async function seedCourses() {
  for (const course of ALL_COURSES) {
    const created = await db.course.upsert({
      where: { slug: course.slug },
      update: {
        level: course.level,
        title: course.title,
        description: course.description,
        objective: course.objective,
        icon: course.icon,
        order: course.order,
      },
      create: {
        slug: course.slug,
        level: course.level,
        title: course.title,
        description: course.description,
        objective: course.objective,
        icon: course.icon,
        order: course.order,
      },
    });

    for (const lesson of course.lessons) {
      await db.lesson.upsert({
        where: { courseId_slug: { courseId: created.id, slug: lesson.slug } },
        update: {
          title: lesson.title,
          order: lesson.order,
          summary: lesson.summary,
          content: lesson.content,
          codeExampleHtml: lesson.codeExampleHtml,
          codeExampleCss: lesson.codeExampleCss,
          hasEditor: lesson.hasEditor,
          missionPrompt: lesson.missionPrompt,
          starterHtml: lesson.starterHtml,
          starterCss: lesson.starterCss,
          validationRule: JSON.stringify(lesson.validationRule),
          hint: lesson.hint,
          xpReward: lesson.xpReward,
        },
        create: {
          courseId: created.id,
          slug: lesson.slug,
          title: lesson.title,
          order: lesson.order,
          summary: lesson.summary,
          content: lesson.content,
          codeExampleHtml: lesson.codeExampleHtml,
          codeExampleCss: lesson.codeExampleCss,
          hasEditor: lesson.hasEditor,
          missionPrompt: lesson.missionPrompt,
          starterHtml: lesson.starterHtml,
          starterCss: lesson.starterCss,
          validationRule: JSON.stringify(lesson.validationRule),
          hint: lesson.hint,
          xpReward: lesson.xpReward,
        },
      });
    }

    const existingQuiz = await db.quiz.findFirst({ where: { courseId: created.id } });
    const quiz = existingQuiz
      ? await db.quiz.update({
          where: { id: existingQuiz.id },
          data: { title: course.quiz.title, xpReward: course.quiz.xpReward },
        })
      : await db.quiz.create({
          data: { courseId: created.id, title: course.quiz.title, xpReward: course.quiz.xpReward },
        });

    await db.quizQuestion.deleteMany({ where: { quizId: quiz.id } });
    for (const [i, q] of course.quiz.questions.entries()) {
      await db.quizQuestion.create({
        data: {
          quizId: quiz.id,
          order: i,
          question: q.question,
          choicesJson: JSON.stringify(q.choices),
          correctIndex: q.correctIndex,
          explanation: q.explanation,
        },
      });
    }
  }
  console.log(`Seeded ${ALL_COURSES.length} courses with lessons and quizzes`);
}

async function upsertUser(opts: {
  name: string;
  role: "PARENT" | "CHILD" | "ADMIN";
  email?: string;
  username?: string;
  password: string;
  avatarEmoji?: string;
  parentId?: string;
  xp?: number;
}) {
  const passwordHash = await bcrypt.hash(opts.password, 10);
  const { level } = computeLevel(opts.xp ?? 0);
  const data = {
    name: opts.name,
    role: opts.role,
    email: opts.email,
    username: opts.username,
    passwordHash,
    avatarEmoji: opts.avatarEmoji ?? "🧑‍🚀",
    parentId: opts.parentId,
    xp: opts.xp ?? 0,
    level,
  };

  if (opts.email) {
    return db.user.upsert({ where: { email: opts.email }, update: data, create: data });
  }
  return db.user.upsert({ where: { username: opts.username! }, update: data, create: data });
}

async function seedDemoAccounts() {
  const admin = await upsertUser({
    name: "Admin CodeKids",
    role: "ADMIN",
    email: "admin@codekids.dev",
    password: "Admin1234!",
    avatarEmoji: "🛡️",
  });

  const parent = await upsertUser({
    name: "Camille Dupont",
    role: "PARENT",
    email: "parent@codekids.dev",
    password: "Parent1234!",
    avatarEmoji: "👩",
  });

  const child = await upsertUser({
    name: "Léo",
    role: "CHILD",
    username: "leo",
    password: "leo1234",
    avatarEmoji: "🧑‍🚀",
    parentId: parent.id,
    xp: 1450,
  });
  await db.user.update({ where: { id: child.id }, data: { streakCount: 12, lastActiveDate: new Date() } });

  const child2 = await upsertUser({
    name: "Nina",
    role: "CHILD",
    username: "nina",
    password: "nina1234",
    avatarEmoji: "👧",
    parentId: parent.id,
    xp: 220,
  });
  await db.user.update({ where: { id: child2.id }, data: { streakCount: 3, lastActiveDate: new Date() } });

  // Unlock the beginner level for both demo children, and intermediate for Léo
  for (const level of ["beginner"]) {
    await db.enrollment.upsert({
      where: { userId_level: { userId: child2.id, level } },
      update: {},
      create: { userId: child2.id, level },
    });
  }
  for (const level of ["beginner", "intermediate"]) {
    await db.enrollment.upsert({
      where: { userId_level: { userId: child.id, level } },
      update: {},
      create: { userId: child.id, level },
    });
  }

  // Give Léo realistic progress: finished all beginner lessons + quizzes, partway through intermediate
  const beginnerCoursesDb = await db.course.findMany({
    where: { level: "beginner" },
    include: { lessons: true, quizzes: { include: { questions: true } } },
    orderBy: { order: "asc" },
  });

  for (const course of beginnerCoursesDb) {
    for (const lesson of course.lessons) {
      await db.lessonProgress.upsert({
        where: { userId_lessonId: { userId: child.id, lessonId: lesson.id } },
        update: { completed: true, completedAt: new Date() },
        create: { userId: child.id, lessonId: lesson.id, completed: true, completedAt: new Date() },
      });
    }
    for (const quiz of course.quizzes) {
      const total = quiz.questions.length;
      await db.quizAttempt.create({
        data: { userId: child.id, quizId: quiz.id, score: total, total, answersJson: "[]" },
      });
    }
  }

  const intermediateCoursesDb = await db.course.findMany({
    where: { level: "intermediate" },
    include: { lessons: true },
    orderBy: { order: "asc" },
    take: 4,
  });
  for (const course of intermediateCoursesDb) {
    for (const lesson of course.lessons) {
      await db.lessonProgress.upsert({
        where: { userId_lessonId: { userId: child.id, lessonId: lesson.id } },
        update: { completed: true, completedAt: new Date() },
        create: { userId: child.id, lessonId: lesson.id, completed: true, completedAt: new Date() },
      });
    }
  }

  // Badges for Léo
  for (const code of ["first-code", "first-site", "css-artist", "streak-7"]) {
    const badge = await db.badge.findUnique({ where: { code } });
    if (badge) {
      await db.userBadge.upsert({
        where: { userId_badgeId: { userId: child.id, badgeId: badge.id } },
        update: {},
        create: { userId: child.id, badgeId: badge.id },
      });
    }
  }

  // A couple of saved projects for Léo
  await db.project.upsert({
    where: { id: "demo-project-leo-1" },
    update: {},
    create: {
      id: "demo-project-leo-1",
      userId: child.id,
      title: "Ma carte de profil",
      html: `<div class="carte-profil">\n  <img src="https://i.pravatar.cc/120?img=15" alt="Avatar de Léo" />\n  <h2>Léo</h2>\n  <p>Futur développeur web 🚀</p>\n</div>`,
      css: `.carte-profil {\n  max-width: 260px;\n  margin: 40px auto;\n  padding: 24px;\n  border-radius: 20px;\n  text-align: center;\n  background: white;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.15);\n  font-family: sans-serif;\n}\n.carte-profil img {\n  border-radius: 50%;\n  width: 96px;\n}`,
    },
  });

  // Certificate for completed beginner level
  await db.certificate.upsert({
    where: { userId_level: { userId: child.id, level: "beginner" } },
    update: {},
    create: {
      userId: child.id,
      level: "beginner",
      certificateNumber: generateCertificateNumber("beginner"),
      courseName: "HTML & CSS — Niveau Débutant",
    },
  });

  await db.payment.create({
    data: {
      userId: parent.id,
      level: "beginner",
      amount: 2500,
      currency: "eur",
      status: "completed",
      stripeSessionId: "demo_session_beginner_leo",
    },
  });
  await db.payment.create({
    data: {
      userId: parent.id,
      level: "intermediate",
      amount: 3000,
      currency: "eur",
      status: "completed",
      stripeSessionId: "demo_session_intermediate_leo",
    },
  });
  await db.enrollment.update({
    where: { userId_level: { userId: child.id, level: "beginner" } },
    data: {},
  });

  console.log("Seeded demo accounts:");
  console.log(`  Admin  → email: admin@codekids.dev   password: Admin1234!`);
  console.log(`  Parent → email: parent@codekids.dev  password: Parent1234!`);
  console.log(`  Enfant → identifiant: leo             code: leo1234`);
  console.log(`  Enfant → identifiant: nina            code: nina1234`);
  void admin;
}

async function main() {
  await seedBadges();
  await seedCourses();
  await seedDemoAccounts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
