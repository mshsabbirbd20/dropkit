import Link from "next/link";
import { notFound } from "next/navigation";
import { getPack } from "@/lib/store";
import CopyButton from "@/components/CopyButton";

export default async function PackPage({ params }: PageProps<"/pack/[id]">) {
  const { id } = await params;
  const pack = await getPack(id);
  if (!pack) notFound();

  const promptsMarkdown = pack.prompts
    .map(
      (p, i) =>
        `## ${p.title}\n\n${p.prompt}\n\n**Checkpoint ${i + 1}:** ${p.checkpoint}`
    )
    .join("\n\n---\n\n");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-accent">Your kit is ready</p>
      <h1 className="font-display mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {pack.title}
      </h1>
      <p className="mt-3 text-sm text-paper-dim">
        Level: {pack.level} · About {pack.hours} hour
        {pack.hours === 1 ? "" : "s"}
      </p>
      <p className="mt-4 text-base leading-relaxed text-paper-dim sm:text-lg">
        {pack.projectBrief}
      </p>

      <section className="mt-10 border border-accent/40 bg-accent/5 px-6 py-5">
        <h2 className="font-display text-lg font-medium text-accent">
          How to use this kit (beginner-friendly)
        </h2>
        <ol className="mt-3 space-y-3 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="font-mono text-accent">1.</span>
            <span>
              Open Cursor and create (or open) any practice folder for this
              topic.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-accent">2.</span>
            <span>
              Copy the <strong className="text-paper">Teaching rule</strong>{" "}
              below into a new file under{" "}
              <code className="text-accent">.cursor/rules/</code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-accent">3.</span>
            <span>
              Copy the <strong className="text-paper">Skill</strong> into{" "}
              <code className="text-accent">.cursor/skills/</code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-accent">4.</span>
            <span>
              Open the Agent chat, paste <strong className="text-paper">
                Step 1
              </strong>
              , and learn by building. Answer each checkpoint before the next
              step.
            </span>
          </li>
        </ol>
        {pack.installSteps.length > 0 && (
          <details className="mt-4 border-t border-accent/20 pt-3 text-sm text-paper-dim">
            <summary className="cursor-pointer text-paper hover:text-accent">
              Extra install notes from this kit
            </summary>
            <ol className="mt-2 space-y-1.5 pl-1">
              {pack.installSteps.map((step, i) => (
                <li key={i}>
                  {i + 1}. {step}
                </li>
              ))}
            </ol>
          </details>
        )}
      </section>

      <Artifact
        title="Teaching rule"
        plain="Tells Cursor how to teach you"
        file=".cursor/rules/learn-topic.mdc"
        content={pack.ruleMarkdown}
        copyLabel="Copy rule"
      />
      <Artifact
        title="Skill"
        plain="The lesson playbook for this topic"
        file=".cursor/skills/teach-topic/SKILL.md"
        content={pack.skillMarkdown}
        copyLabel="Copy skill"
      />

      <section className="mt-10">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-medium">Lesson prompts</h2>
            <p className="mt-1 text-sm text-paper-dim">
              Paste into Cursor’s Agent one at a time. After each lesson, answer
              the checkpoint in your own words.
            </p>
          </div>
          <div className="shrink-0">
            <CopyButton text={promptsMarkdown} label="Copy all" />
          </div>
        </div>
        <div className="space-y-4">
          {pack.prompts.map((p, i) => (
            <div
              key={i}
              className="border border-ink-border bg-ink-raised px-4 py-5 sm:px-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium">{p.title}</h3>
                <CopyButton text={p.prompt} label="Copy" />
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-paper-dim">
                {p.prompt}
              </p>
              <p className="mt-4 border-t border-ink-border/60 pt-3 text-sm">
                <span className="font-medium text-accent">
                  Check your understanding:{" "}
                </span>
                <span className="text-paper-dim">{p.checkpoint}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-4 border border-ink-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-paper-dim">
          Want another topic? Creating a kit takes about a minute.
        </p>
        <Link
          href="/new"
          className="bg-accent px-5 py-2 text-center text-sm font-semibold text-ink transition hover:bg-accent-deep"
        >
          New kit
        </Link>
      </div>
    </div>
  );
}

function Artifact({
  title,
  plain,
  file,
  content,
  copyLabel,
}: {
  title: string;
  plain: string;
  file: string;
  content: string;
  copyLabel: string;
}) {
  return (
    <section className="mt-10">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-display text-xl font-medium">{title}</h2>
          <p className="text-sm text-paper-dim">{plain}</p>
          <code className="mt-1 block truncate font-mono text-xs text-accent">
            {file}
          </code>
        </div>
        <div className="shrink-0">
          <CopyButton text={content} label={copyLabel} />
        </div>
      </div>
      <pre className="max-h-96 overflow-auto border border-ink-border bg-ink-raised px-4 py-5 font-mono text-[13px] leading-relaxed text-paper-dim sm:px-6">
        {content}
      </pre>
    </section>
  );
}
