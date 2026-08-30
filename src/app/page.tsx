import Link from "next/link";
import Logo from "@/components/Logo";

function IconGoal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="4" y="8" width="32" height="24" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 16h14M10 21h20M10 26h10" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="30" cy="12" r="5" fill="var(--ink)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M30 9.5v5M27.5 12h5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconKit({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M8 14h24l-2 18H10L8 14Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="miter"
      />
      <path d="M8 14 20 8l12 6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 8v24" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconCursor({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="6" y="6" width="28" height="28" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 13h28" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="11" cy="9.5" r="1.2" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1.2" fill="currentColor" />
      <path d="M14 20 22 28l2-7 7-2-17-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="miter" />
    </svg>
  );
}

function IconRule({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M11 7h14l6 6v20H11V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="miter"
      />
      <path d="M25 7v6h6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 20h12M16 25h8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 15h4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconSkill({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="13" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 10v4M20 26v4M10 20h4M26 20h4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconPrompts({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M8 10h24v16H14l-6 5V10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="miter"
      />
      <path d="M14 16h12M14 21h8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const steps = [
  {
    n: "01",
    title: "Say what you want to learn",
    body: "Type a simple goal in plain language — like “teach me how APIs work.” Spelling and fancy words don’t matter.",
    tip: "Takes ~30 seconds",
    Icon: IconGoal,
  },
  {
    n: "02",
    title: "Get a ready-made kit",
    body: "DropKit builds a downloadable folder for you: teaching rule, skill, and lesson prompts — ready to open in Cursor.",
    tip: "One zip = your whole kit",
    Icon: IconKit,
  },
  {
    n: "03",
    title: "Paste into Cursor & learn",
    body: "Download the zip, open the folder in Cursor, paste Step 1 into the Agent, and learn by building a tiny real project.",
    tip: "Open folder → start learning",
    Icon: IconCursor,
  },
];

const kitParts = [
  {
    delay: "drop-in",
    label: "Teaching rule",
    plain: "How Cursor should teach you",
    path: ".cursor/rules/your-topic.mdc",
    detail:
      "This file is like a house rule for the AI. It says: teach slowly, ask questions, and don’t dump the full answer unless you type “reveal.”",
    why: "So beginners don’t get lost in a wall of code.",
    Icon: IconRule,
  },
  {
    delay: "drop-in-2",
    label: "Skill",
    plain: "The lesson playbook",
    path: ".cursor/skills/…/SKILL.md",
    detail:
      "A short playbook for your topic — what mini project you’ll build, what to check after each step, and what the Agent should avoid.",
    why: "So every lesson has a clear finish line.",
    Icon: IconSkill,
  },
  {
    delay: "drop-in-3",
    label: "Prompts",
    plain: "Your step-by-step lessons",
    path: "Paste into Cursor Agent",
    detail:
      "Ready-to-paste messages for the Agent. Do one step, answer a short checkpoint question, then move to the next.",
    why: "So you always know what to do next.",
    Icon: IconPrompts,
  },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:pt-20">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <Logo size={40} />
            <span className="text-sm text-paper-dim">
              Made for new developers using Cursor
            </span>
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            DropKit
          </h1>
          <p className="mt-3 text-xl font-medium text-accent sm:text-2xl">
            Drop a kit into Cursor instantly.
          </p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-paper-dim sm:text-lg">
            Learning to code is hard when the AI just pastes finished code.
            DropKit turns your goal into a <strong className="text-paper">downloadable folder</strong> —
            teaching rule, skill, and prompts inside. Open that folder in Cursor
            and learn by building a real mini project.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/new"
              className="bg-accent px-6 py-3.5 text-center text-base font-semibold text-ink transition hover:bg-accent-deep"
            >
              Start learning — it’s free
            </Link>
            <Link
              href="/pricing"
              className="border border-ink-border px-6 py-3.5 text-center text-base text-paper-dim transition hover:border-accent hover:text-paper"
            >
              See pricing
            </Link>
          </div>
          <p className="mt-4 text-sm text-paper-dim">
            No account needed. Takes about a minute.
          </p>
        </div>

        <div className="border border-ink-border bg-ink-gutter shadow-[8px_8px_0_0_rgba(200,245,66,0.12)]">
          <div className="border-b border-ink-border px-4 py-3">
            <p className="text-sm font-medium text-paper">
              Example kit preview
            </p>
            <p className="mt-0.5 text-xs text-paper-dim">
              This is what lands in your Cursor project
            </p>
          </div>
          <div className="space-y-0 divide-y divide-ink-border">
            {[
              {
                name: "learn-apis.mdc",
                note: "Teaching rule",
                line: "Teach by building. One idea per step.",
              },
              {
                name: "SKILL.md",
                note: "Skill",
                line: "Build a tiny /api/quotes endpoint together.",
              },
              {
                name: "Step 1 prompt",
                note: "First lesson",
                line: "Explain what a route is — then guide me to write it.",
              },
            ].map((row) => (
              <div key={row.name} className="px-4 py-3.5">
                <div className="flex items-baseline justify-between gap-3">
                  <code className="font-mono text-sm text-accent">{row.name}</code>
                  <span className="shrink-0 text-xs text-paper-dim">{row.note}</span>
                </div>
                <p className="mt-1.5 text-sm leading-snug text-paper-dim">
                  {row.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-ink-border bg-ink-raised/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              How it works
            </p>
            <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl">
              Three steps. That’s the whole idea.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-paper-dim">
              Built for beginners. Read top to bottom — or follow the arrows on
              desktop.
            </p>
          </div>

          <ol className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-stretch">
            {steps.map((step, i) => (
              <li key={step.n} className="contents">
                <div className="flex flex-col border border-ink-border bg-ink p-6 transition hover:border-accent/60">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-14 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
                      <step.Icon className="size-8" />
                    </span>
                    <span className="font-mono text-sm text-paper-dim">
                      {step.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-dim">
                    {step.body}
                  </p>
                  <p className="mt-5 border-t border-ink-border pt-4 font-mono text-xs text-accent">
                    {step.tip}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden items-center justify-center text-accent/70 lg:flex">
                    <IconArrow className="size-6" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Inside a kit
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium sm:text-4xl">
            Three pieces. Plain English.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-paper-dim">
            Don’t stress about the file paths — each piece has one job. Here’s
            what they mean for you as a learner.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {kitParts.map((part) => (
            <li
              key={part.label}
              className={`${part.delay} flex flex-col border border-ink-border bg-ink-raised p-6 transition hover:border-accent/50 hover:shadow-[6px_6px_0_0_rgba(200,245,66,0.1)]`}
            >
              <span className="flex size-14 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
                <part.Icon className="size-8" />
              </span>
              <h3 className="mt-5 text-xl font-medium">{part.label}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{part.plain}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-paper-dim">
                {part.detail}
              </p>
              <p className="mt-4 text-sm leading-snug text-paper">
                <span className="text-accent">Why it helps → </span>
                {part.why}
              </p>
              <code className="mt-5 block border border-ink-border bg-ink-gutter px-3 py-2 font-mono text-[11px] text-paper-dim">
                {part.path}
              </code>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 border border-ink-border bg-accent/5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-medium">Ready to try one?</p>
            <p className="mt-1 text-sm text-paper-dim">
              Pick a goal, get a kit, drop it into Cursor. Free to start.
            </p>
          </div>
          <Link
            href="/new"
            className="shrink-0 bg-accent px-6 py-3.5 text-base font-semibold text-ink transition hover:bg-accent-deep"
          >
            Create your first kit
          </Link>
        </div>
      </section>
    </div>
  );
}
