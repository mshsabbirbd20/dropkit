"use client";

import { useState } from "react";

export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      onClick={copy}
      className={`border px-4 py-1.5 font-mono text-xs font-medium transition ${
        copied
          ? "border-accent bg-accent text-ink"
          : "border-ink-border text-paper-dim hover:border-accent hover:text-paper"
      }`}
    >
      {copied ? "Copied!" : label}
    </button>
  );
}
