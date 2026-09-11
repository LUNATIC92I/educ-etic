import "server-only";
import { db } from "@/lib/db";
import { BADGE_CATALOG } from "@/data/site";
import { computeLevel } from "@/lib/xp";

export { computeLevel, xpRequiredForLevel } from "@/lib/xp";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isYesterday(a: Date, b: Date) {
  const yesterday = new Date(b);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(a, yesterday);
}

export async function awardXp(userId: string, amount: number) {
  const user = await db.user.findUniqueOrThrow({ where: { id: userId } });
  const now = new Date();

  let streakCount = user.streakCount;
  if (!user.lastActiveDate) {
    streakCount = 1;
  } else if (isSameDay(user.lastActiveDate, now)) {
    streakCount = user.streakCount;
  } else if (isYesterday(user.lastActiveDate, now)) {
    streakCount = user.streakCount + 1;
  } else {
    streakCount = 1;
  }

  const newXp = user.xp + amount;
  const { level } = computeLevel(newXp);
  const leveledUp = level > user.level;

  const updated = await db.user.update({
    where: { id: userId },
    data: { xp: newXp, level, streakCount, lastActiveDate: now },
  });

  if (streakCount === 7 || streakCount === 14 || streakCount === 30) {
    await awardBadge(userId, "streak-7");
  }

  return { user: updated, leveledUp, xpGained: amount };
}

export async function awardBadge(userId: string, badgeCode: string) {
  const badge = await db.badge.findUnique({ where: { code: badgeCode } });
  if (!badge) return { awarded: false as const };

  const existing = await db.userBadge.findUnique({
    where: { userId_badgeId: { userId, badgeId: badge.id } },
  });
  if (existing) return { awarded: false as const };

  await db.userBadge.create({ data: { userId, badgeId: badge.id } });
  return { awarded: true as const, badge };
}

export async function checkCompletionBadges(userId: string) {
  const newlyAwarded: (typeof BADGE_CATALOG)[number][] = [];

  const lessonCount = await db.lessonProgress.count({ where: { userId, completed: true } });
  if (lessonCount >= 1) {
    const r = await awardBadge(userId, "first-code");
    if (r.awarded) newlyAwarded.push(BADGE_CATALOG.find((b) => b.code === "first-code")!);
  }
  if (lessonCount >= 10) {
    const r = await awardBadge(userId, "night-owl");
    if (r.awarded) newlyAwarded.push(BADGE_CATALOG.find((b) => b.code === "night-owl")!);
  }

  const projectCount = await db.project.count({ where: { userId } });
  if (projectCount >= 1) {
    const r = await awardBadge(userId, "first-site");
    if (r.awarded) newlyAwarded.push(BADGE_CATALOG.find((b) => b.code === "first-site")!);
  }

  const attempts = await db.quizAttempt.findMany({ where: { userId } });
  if (attempts.some((a) => a.total > 0 && a.score === a.total)) {
    const r = await awardBadge(userId, "quiz-ace");
    if (r.awarded) newlyAwarded.push(BADGE_CATALOG.find((b) => b.code === "quiz-ace")!);
  }

  return newlyAwarded;
}
