"use client";

import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/themes/prism-okaidia.css";

export function CodeExample({ html, css }: { html: string; css: string }) {
  const [tab, setTab] = useState<"code" | "preview">("code");

  return (
    <div className="overflow-hidden rounded-2xl border border-ck-border bg-nightsky-600 shadow-lg">
      <div className="flex border-b border-white/10 bg-white/5 px-2">
        <button
          type="button"
          onClick={() => setTab("code")}
          className={`px-4 py-2.5 text-sm font-semibold ${tab === "code" ? "text-white border-b-2 border-electric-400" : "text-white/50"}`}
        >
          Code
        </button>
        <button
          type="button"
          onClick={() => setTab("preview")}
          className={`px-4 py-2.5 text-sm font-semibold ${tab === "preview" ? "text-white border-b-2 border-electric-400" : "text-white/50"}`}
        >
          Résultat
        </button>
      </div>
      {tab === "code" ? (
        <div className="max-h-72 overflow-auto p-4 font-mono text-[13px] code-scrollbar">
          {html.trim() ? (
            <pre className="mb-3" dangerouslySetInnerHTML={{ __html: Prism.highlight(html, Prism.languages.markup, "markup") }} />
          ) : null}
          {css.trim() ? (
            <pre dangerouslySetInnerHTML={{ __html: Prism.highlight(css, Prism.languages.css, "css") }} />
          ) : null}
        </div>
      ) : (
        <iframe
          title="Résultat de l'exemple"
          srcDoc={`<style>${css}</style>${html}`}
          sandbox=""
          className="h-64 w-full bg-white"
        />
      )}
    </div>
  );
}
