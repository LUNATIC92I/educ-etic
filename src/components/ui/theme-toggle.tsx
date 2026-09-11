"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("ck-theme", next ? "dark" : "light");
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-colors hover:bg-electric-50 dark:hover:bg-white/5"
    >
      {isDark ? "☀️" : "🌙"}
    </button>
  );
}
