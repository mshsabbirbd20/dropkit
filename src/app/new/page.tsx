"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cachePack } from "@/lib/pack-cache";

const exampleGoals = [
  {
    short: "Learn APIs",
    full: "Teach me how web APIs work by building one in Next.js",
  },
  {
    short: "Learn React state",
    full: "I want to understand React state by building a quiz app",
  },
  {
    short: "Learn SQL joins",
    full: "Teach me SQL joins with a tiny real database",
  },
];

export default function NewPack() {
  const router = useRouter();
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState<"beginner" | "intermediate">("beginner");
  const [hours, setHours] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, level, hours }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      if (data.pack) cachePack(data.pack);
      router.push(`/pack/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-accent">Step 1 of 3 — describe your goal</p>
      <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        What do you want to learn?
      </h1>
      <p className="mt-3 text-base leading-relaxed text-paper-dim">
        Write it like you’d message a friend. DropKit builds a downloadable
        folder — open it in Cursor and learn by building.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        <div>
          <label htmlFor="goal" className="mb-2 block text-sm font-medium">
            Your learning goal
          </label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={4}
            placeholder={exampleGoals[0].full}
            className="w-full resize-none border border-ink-border bg-ink-raised px-4 py-3 text-base text-paper placeholder:text-paper-dim/50 focus:border-accent focus:outline-none"
            required
            minLength={8}
          />
          <p className="mt-2 text-xs text-paper-dim">
            Stuck? Tap an example below to fill the box.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {exampleGoals.map((g) => (
              <button
                key={g.short}
                type="button"
                onClick={() => setGoal(g.full)}
                className="border border-ink-border px-3 py-1.5 text-sm text-paper-dim transition hover:border-accent hover:text-paper"
              >
                {g.short}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-medium">
              Your experience
            </span>
            <div className="flex gap-2">
              {(
                [
                  { id: "beginner", label: "Beginner" },
                  { id: "intermediate", label: "Some experience" },
                ] as const
              ).map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  className={`flex-1 border px-3 py-2.5 text-sm transition ${
                    level === l.id
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-ink-border text-paper-dim hover:text-paper"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="hours" className="mb-2 block text-sm font-medium">
              Time today:{" "}
              <span className="text-accent">
                {hours} hour{hours === 1 ? "" : "s"}
              </span>
            </label>
            <input
              id="hours"
              type="range"
              min={1}
              max={8}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--accent)]"
            />
            <p className="mt-2 text-xs text-paper-dim">
              We’ll size the kit to fit this time.
            </p>
          </div>
        </div>

        {error && (
          <p className="border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent py-3.5 text-base font-semibold text-ink transition hover:bg-accent-deep disabled:opacity-60"
        >
          {loading ? "Building your kit folder…" : "Create my kit folder"}
        </button>
        <p className="text-center text-xs text-paper-dim">
          Next you’ll see install steps you can follow even if you’re brand new
          to Cursor.
        </p>
      </form>
    </div>
  );
}
