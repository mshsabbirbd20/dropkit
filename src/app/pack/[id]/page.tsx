"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import type { LearningPack } from "@/lib/types";
import { readCachedPack } from "@/lib/pack-cache";
import PackView from "@/components/PackView";

export default function PackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [pack, setPack] = useState<LearningPack | null | undefined>(undefined);

  useEffect(() => {
    const cached = readCachedPack(id);
    if (cached) {
      setPack(cached);
      return;
    }

    fetch(`/api/packs/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          setPack(null);
          return;
        }
        const data = await res.json();
        setPack(data.pack ?? null);
      })
      .catch(() => setPack(null));
  }, [id]);

  if (pack === undefined) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center text-paper-dim">
        Loading your kit…
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-semibold">Kit not found</h1>
        <p className="mt-4 text-paper-dim">
          This kit isn’t in this browser session. Generate it again — it only
          takes a minute. (Refreshing on Vercel can lose a kit because each
          request may hit a new server.)
        </p>
        <Link
          href="/new"
          className="mt-8 inline-block bg-accent px-6 py-3 font-semibold text-ink"
        >
          Create a new kit
        </Link>
      </div>
    );
  }

  return <PackView pack={pack} />;
}
