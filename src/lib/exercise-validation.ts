export type ValidationRule =
  | { type: "contains-html"; snippet: string; caseSensitive?: boolean }
  | { type: "contains-css"; snippet: string; caseSensitive?: boolean }
  | { type: "css-property"; selector: string; property: string; value?: string }
  | { type: "none" };

export function parseValidationRule(json: string): ValidationRule {
  try {
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed === "object" && "type" in parsed) return parsed as ValidationRule;
  } catch {
    // ignore malformed rule, fall through
  }
  return { type: "none" };
}

function normalize(str: string) {
  return str.replace(/\s+/g, " ").trim().toLowerCase();
}

export function validateExercise(html: string, css: string, rule: ValidationRule): boolean {
  switch (rule.type) {
    case "none":
      return true;
    case "contains-html": {
      const haystack = rule.caseSensitive ? html : html.toLowerCase();
      const needle = rule.caseSensitive ? rule.snippet : rule.snippet.toLowerCase();
      return haystack.includes(needle);
    }
    case "contains-css": {
      const haystack = rule.caseSensitive ? css : css.toLowerCase();
      const needle = rule.caseSensitive ? rule.snippet : rule.snippet.toLowerCase();
      return normalize(haystack).includes(normalize(needle));
    }
    case "css-property": {
      const blockRegex = new RegExp(
        `${escapeRegExp(rule.selector)}\\s*\\{([^}]*)\\}`,
        "i"
      );
      const match = css.match(blockRegex);
      if (!match) return false;
      const body = normalize(match[1]);
      const propPattern = rule.value
        ? new RegExp(`${escapeRegExp(rule.property)}\\s*:\\s*${escapeRegExp(rule.value)}\\s*;?`, "i")
        : new RegExp(`${escapeRegExp(rule.property)}\\s*:`, "i");
      return propPattern.test(body);
    }
    default:
      return false;
  }
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
