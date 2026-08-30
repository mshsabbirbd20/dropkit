"use client";

import { useState } from "react";

export default function DownloadKitButton({
  packId,
  label = "Download kit folder (.zip)",
}: {
  packId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function download() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/download/${packId}`);
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Download failed.");
      }
      const blob = await res.blob();
      const cd = res.headers.get("Content-Disposition") ?? "";
      const match = cd.match(/filename="([^"]+)"/);
      const name = match?.[1] ?? `dropkit-${packId}.zip`;

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
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
