"use client";

import { useState } from "react";
import type { LearningPack } from "@/lib/types";
import { buildKitZip } from "@/lib/kit-zip";

export default function DownloadKitButton({
  pack,
  label = "Download kit folder (.zip)",
}: {
  pack: LearningPack;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function download() {
    setLoading(true);
    setError(null);
    try {
      const { filename, bytes } = await buildKitZip(pack);
      const blob = new Blob([bytes.buffer as ArrayBuffer], {
        type: "application/zip",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={download}
        disabled={loading}
        className="w-full bg-accent px-6 py-3.5 text-base font-semibold text-ink transition hover:bg-accent-deep disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Preparing folder…" : label}
      </button>
      {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
    </div>
  );
}
