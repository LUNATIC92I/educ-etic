const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("ck-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
    var reduceMotion = localStorage.getItem("ck-reduce-motion") === "1";
    if (reduceMotion) document.documentElement.classList.add("reduce-motion");
  } catch (e) {}
})();
`;

export function ThemeInit() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
