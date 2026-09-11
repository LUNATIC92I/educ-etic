const LEVEL_CODES: Record<string, string> = {
  beginner: "DEB",
  intermediate: "INT",
  advanced: "AVA",
};

export function generateCertificateNumber(level: string) {
  const code = LEVEL_CODES[level] ?? "GEN";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CK-${code}-${timestamp}-${random}`;
}
