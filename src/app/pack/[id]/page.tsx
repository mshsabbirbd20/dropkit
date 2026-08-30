import Link from "next/link";
import { notFound } from "next/navigation";
import { getPack } from "@/lib/store";
import { buildKitFolderName, slugify } from "@/lib/kit-zip";
import CopyButton from "@/components/CopyButton";
import DownloadKitButton from "@/components/DownloadKitButton";

export default async function PackPage({ params }: PageProps<"/pack/[id]">) {
  const { id } = await params;
  const pack = await getPack(id);
  if (!pack) notFound();

  const folderName = buildKitFolderName(pack);
  const topicSlug = slugify(pack.title || pack.topic);
  const rulePath = `.cursor/rules/learn-${topicSlug}.mdc`;
  const skillPath = `.cursor/skills/teach-${topicSlug}/SKILL.md`;

  const promptsMarkdown = pack.prompts
    .map(
      (p, i) =>
        `## ${p.title}\n\n${p.prompt}\n\n**Checkpoint ${i + 1}:** ${p.checkpoint}`
    )
    .join("\n\n---\n\n");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-sm text-accent">Your kit folder is ready</p>
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

      <section className="mt-8 border border-accent/50 bg-accent/10 px-6 py-6">
        <h2 className="font-display text-xl font-medium text-accent">
          Download your learning kit
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-paper-dim">
          One zip folder with everything inside — teaching rule, skill, and
          prompts. Unzip it, open the folder in Cursor, paste Step 1 into the
          Agent, and start learning by building.
        </p>
        <ul className="mt-4 space-y-1.5 font-mono text-xs text-paper-dim">
          <li>
            <span className="text-accent">{folderName}/</span>
          </li>
          <li className="pl-3">{rulePath}</li>
          <li className="pl-3">{skillPath}</li>
          <li className="pl-3">PROMPTS.md</li>
          <li className="pl-3">README.md</li>
        </ul>
        <div className="mt-5">
          <DownloadKitButton packId={pack.id} />
        </div>
      </section>

      <section className="mt-8 border border-ink-border bg-ink-raised px-6 py-5">
        <h2 className="font-display text-lg font-medium">
          After you download
        </h2>
        <ol className="mt-3 space-y-3 text-sm leading-relaxed">
          <li className="flex gap-3">
            <span className="font-mono text-accent">1.</span>
            <span>
              Unzip <code className="text-accent">{folderName}.zip</code>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-accent">2.</span>
            <span>
              In Cursor: <strong className="text-paper">File → Open Folder</strong>{" "}
              → select the unzipped folder
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-accent">3.</span>
            <span>
              Open <code className="text-accent">PROMPTS.md</code>, copy{" "}
              <strong className="text-paper">Step 1</strong>, paste into the{" "}
              <strong className="text-paper">Agent</strong>, and send
            </span>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-accent">4.</span>
            <span>
              Answer each checkpoint, then move to the next step. Build while
              you learn.
            </span>
          </li>
        </ol>
      </section>

      <details className="mt-10 border border-ink-border px-6 py-5">
        <summary className="cursor-pointer font-medium text-paper hover:text-accent">
          Preview files (optional — already inside the zip)
        </summary>

        <Artifact
          title="Teaching rule"
          plain="Tells Cursor how to teach you"
          file={rulePath}
          content={pack.ruleMarkdown}
          copyLabel="Copy rule"
        />
        <Artifact
          title="Skill"
          plain="The lesson playbook for this topic"
          file={skillPath}
          content={pack.skillMarkdown}
          copyLabel="Copy skill"
        />

        <section className="mt-10">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-medium">
                Lesson prompts
              </h2>
              <p className="mt-1 text-sm text-paper-dim">
                Same content as PROMPTS.md in your downloaded folder.
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
                className="border border-ink-border bg-ink-gutter px-4 py-5 sm:px-6"
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
      </details>

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
      <pre className="max-h-72 overflow-auto border border-ink-border bg-ink-gutter px-4 py-5 font-mono text-[13px] leading-relaxed text-paper-dim sm:px-6">
        {content}
      </pre>
    </section>
  );
}
