import JSZip from "jszip";
import type { LearningPack } from "./types";

export function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "learning-kit"
  );
}

export function buildKitFolderName(pack: LearningPack) {
  return `dropkit-${slugify(pack.title || pack.topic)}`;
}

function promptsMarkdown(pack: LearningPack) {
  return pack.prompts
    .map(
      (p, i) =>
        `## ${p.title}\n\n${p.prompt}\n\n**Checkpoint ${i + 1}:** ${p.checkpoint}\n`
    )
    .join("\n---\n\n");
}

function readmeMarkdown(
  pack: LearningPack,
  folder: string,
  skillDir: string,
  topicSlug: string
) {
  return `# ${pack.title}

${pack.projectBrief}

**Level:** ${pack.level} · **Time:** ~${pack.hours} hour${pack.hours === 1 ? "" : "s"}

This folder _is_ your DropKit learning kit. Open it in Cursor and start building.

## How to use (2 minutes)

1. Unzip if needed, then in Cursor: **File → Open Folder** → select \`${folder}\`.
2. Open the **Agent** chat (not just inline edit).
3. Open \`PROMPTS.md\`, copy **Step 1**, paste it into the Agent, and send.
4. Answer each checkpoint in your own words before moving to the next step.
5. If the Agent dumps a full solution, say:  
   \`Follow the teaching rule. Small steps only. Do not reveal the full solution.\`

## What's inside

| Path | What it is |
|------|------------|
| \`.cursor/rules/learn-${topicSlug}.mdc\` | Teaching rule — how Cursor should teach you |
| \`.cursor/skills/${skillDir}/SKILL.md\` | Skill — the lesson playbook |
| \`PROMPTS.md\` | Step-by-step Agent prompts + checkpoints |
| \`README.md\` | This file |

Made with [DropKit](https://dropkit-three.vercel.app) — drop a kit into Cursor and learn while you build.
`;
}

export async function buildKitZip(pack: LearningPack): Promise<{
  filename: string;
  bytes: Uint8Array;
}> {
  const folder = buildKitFolderName(pack);
  const topicSlug = slugify(pack.title || pack.topic);
  const skillDir = `teach-${topicSlug}`;
  const ruleFile = `learn-${topicSlug}.mdc`;

  const zip = new JSZip();
  const root = zip.folder(folder)!;

  root.file("README.md", readmeMarkdown(pack, folder, skillDir, topicSlug));
  root.file("PROMPTS.md", `# ${pack.title} — Lesson prompts\n\nCopy one step at a time into the Cursor Agent.\n\n---\n\n${promptsMarkdown(pack)}`);

  const rules = root.folder(".cursor")!.folder("rules")!;
  rules.file(ruleFile, pack.ruleMarkdown);

  const skills = root.folder(".cursor")!.folder("skills")!.folder(skillDir)!;
  skills.file("SKILL.md", pack.skillMarkdown);

  const bytes = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
  });

  return { filename: `${folder}.zip`, bytes };
}
