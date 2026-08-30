"use client";

import { useState } from "react";
import type { CheckoutSku } from "@/lib/catalog";

export default function CheckoutButton({
  sku,
  label,
  highlight = false,
}: {
  sku: CheckoutSku;
  label: string;
  highlight?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className={`w-full py-2.5 text-center font-mono text-sm font-semibold transition disabled:opacity-60 ${
          highlight
            ? "bg-accent text-ink hover:bg-accent-deep"
            : "border border-ink-border text-paper-dim hover:border-paper-dim hover:text-paper"
        }`}
      >
        {loading ? "Redirecting to Stripe…" : label}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-red-300">{error}</p>
      )}
    </div>
  );
}
