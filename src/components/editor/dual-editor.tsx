"use client";

import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-okaidia.css";
import { cn } from "@/lib/utils";

function highlightHtml(code: string) {
  return Prism.highlight(code, Prism.languages.markup, "markup");
}
function highlightCss(code: string) {
  return Prism.highlight(code, Prism.languages.css, "css");
}

type Tab = "html" | "css" | "preview";

export function DualEditor({
  html,
  css,
  onHtmlChange,
  onCssChange,
  height = 360,
}: {
  html: string;
  css: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  height?: number;
}) {
  const [tab, setTab] = useState<Tab>("html");
  const [srcDoc, setSrcDoc] = useState(`<style>${css}</style>${html}`);

  useEffect(() => {
    const t = setTimeout(() => setSrcDoc(`<style>${css}</style>${html}`), 300);
    return () => clearTimeout(t);
  }, [html, css]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "html", label: "HTML" },
    { key: "css", label: "CSS" },
    { key: "preview", label: "Aperçu" },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-ck-border bg-nightsky-600 shadow-lg">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3">
        <div className="flex">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors md:cursor-default md:border-b-2",
                tab === t.key ? "border-electric-400 text-white" : "border-transparent text-white/50",
                "md:hidden"
              )}
            >
              {t.label}
            </button>
          ))}
          <span className="hidden items-center gap-2 py-2.5 text-sm font-semibold text-white/70 md:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-xs text-white/40">éditeur CodeKids</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSrcDoc(`<style>${css}</style>${html}`)}
          className="rounded-lg bg-gradient-to-r from-electric-500 to-violet-500 px-3 py-1.5 text-xs font-bold text-white shadow"
        >
          ▶ Exécuter
        </button>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="flex flex-col divide-y divide-white/10 md:border-r md:border-white/10">
          <div className={cn(tab !== "html" && "hidden md:block")}>
            <p className="bg-white/5 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-electric-300">
              HTML
            </p>
            <div className="code-scrollbar overflow-auto" style={{ height: height / 2 }}>
              <Editor
                value={html}
                onValueChange={onHtmlChange}
                highlight={highlightHtml}
                padding={14}
                style={{ fontFamily: "var(--font-mono-code, monospace)", fontSize: 13, minHeight: "100%" }}
                textareaClassName="focus:outline-none"
              />
            </div>
          </div>
          <div className={cn(tab !== "css" && "hidden md:block")}>
            <p className="bg-white/5 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-violet-300">
              CSS
            </p>
            <div className="code-scrollbar overflow-auto" style={{ height: height / 2 }}>
              <Editor
                value={css}
                onValueChange={onCssChange}
                highlight={highlightCss}
                padding={14}
                style={{ fontFamily: "var(--font-mono-code, monospace)", fontSize: 13, minHeight: "100%" }}
                textareaClassName="focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className={cn("bg-white", tab !== "preview" && "hidden md:block")}>
          <p className="bg-ck-border/40 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-nightsky-500">
            APERÇU
          </p>
          <iframe
            title="Aperçu du code"
            srcDoc={srcDoc}
            sandbox=""
            className="w-full bg-white"
            style={{ height: height - 28 }}
          />
        </div>
      </div>
    </div>
  );
}
