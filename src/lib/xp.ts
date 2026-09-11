export function xpRequiredForLevel(level: number) {
  // XP required to go from `level` to `level + 1` — grows each level.
  return 200 + (level - 1) * 100;
}

export function computeLevel(xp: number) {
  let level = 1;
  let remaining = xp;
  let req = xpRequiredForLevel(level);
  while (remaining >= req) {
    remaining -= req;
    level += 1;
    req = xpRequiredForLevel(level);
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: req };
}
