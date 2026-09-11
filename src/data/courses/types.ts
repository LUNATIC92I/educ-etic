export type ValidationRule =
  | { type: "contains-html"; snippet: string; caseSensitive?: boolean }
  | { type: "contains-css"; snippet: string; caseSensitive?: boolean }
  | { type: "css-property"; selector: string; property: string; value?: string }
  | { type: "none" };

export interface SeedLesson {
  slug: string;
  title: string;
  order: number;
  summary: string;
  /** Rich-ish text: use "\n\n" between paragraphs, "## " for a subheading, and `code` for inline code. */
  content: string;
  codeExampleHtml: string;
  codeExampleCss: string;
  hasEditor: boolean;
  missionPrompt: string;
  starterHtml: string;
  starterCss: string;
  validationRule: ValidationRule;
  hint: string;
  xpReward: number;
}

export interface SeedQuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface SeedQuiz {
  title: string;
  xpReward: number;
  questions: SeedQuizQuestion[];
}

export interface SeedCourse {
  slug: string;
  level: "beginner" | "intermediate" | "advanced";
  title: string;
  description: string;
  objective: string;
  icon: string;
  order: number;
  lessons: SeedLesson[];
  quiz: SeedQuiz;
}
