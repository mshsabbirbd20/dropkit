import type { LearningPack, PackPrompt } from "./types";
import { fallbackPack } from "./fallback";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "qwen/qwen3.8-27b";

const SYSTEM_PROMPT = `You generate "Learning Packs" that turn the Cursor code editor into a classroom. A pack contains Cursor-native artifacts a learner installs into a project folder.

Return ONLY valid JSON matching this exact shape:
{
  "title": "short course-style title",
  "projectBrief": "2-3 sentences: the tiny real project the learner will build today",
  "ruleMarkdown": "complete contents of a .cursor/rules .mdc file",
  "skillMarkdown": "complete contents of a SKILL.md file",
  "prompts": [ { "title": "Step N — ...", "prompt": "...", "checkpoint": "..." } ],
  "installSteps": ["...", "...", "...", "..."]
}

Rules for ruleMarkdown:
- Start with YAML frontmatter: description and alwaysApply: true.
- It configures the agent as a Socratic tutor: teach by building, one idea per step, ask a comprehension question after each step, never paste full solutions unless the learner says "reveal", explain new terms in one sentence, keep explanations under 6 sentences.
- Must state: no destructive commands, only create/edit files inside the project folder.

Rules for skillMarkdown:
- Start with YAML frontmatter: name (kebab-case) and description.
- Describe the teaching approach for this topic and hard guardrails: teaching content only, no shell commands beyond a dev server, no network calls, no file access outside the project.

Rules for prompts:
- 3 to 5 ordered steps sized to the learner's available hours.
- Each prompt is pasted into the Cursor Agent by the learner and must instruct the agent to teach, not just build.
- Each checkpoint is one question the learner must answer in their own words before advancing.

installSteps: exactly 4 short steps: create/open folder in Cursor, paste rule into .cursor/rules/<file>.mdc, paste skill into .cursor/skills/<name>/SKILL.md, paste Step 1 into the Agent.

Safety: never include shell commands other than starting a dev server, never include network calls, secrets, or instructions to touch files outside the project.`;

type RawPack = {
  title: string;
  projectBrief: string;
  ruleMarkdown: string;
  skillMarkdown: string;
  prompts: PackPrompt[];
  installSteps: string[];
};

function isValid(p: unknown): p is RawPack {
  if (typeof p !== "object" || p === null) return false;
  const o = p as Record<string, unknown>;
  return (
    typeof o.title === "string" &&
    typeof o.projectBrief === "string" &&
    typeof o.ruleMarkdown === "string" &&
    typeof o.skillMarkdown === "string" &&
    Array.isArray(o.prompts) &&
    o.prompts.length >= 3 &&
    o.prompts.every(
      (s: unknown) =>
        typeof s === "object" &&
        s !== null &&
        typeof (s as PackPrompt).title === "string" &&
        typeof (s as PackPrompt).prompt === "string" &&
        typeof (s as PackPrompt).checkpoint === "string"
    ) &&
    Array.isArray(o.installSteps) &&
    o.installSteps.every((s: unknown) => typeof s === "string")
  );
}

export async function generatePack(
  goal: string,
  level: "beginner" | "intermediate",
  hours: number
): Promise<LearningPack> {
  const id = crypto.randomUUID().slice(0, 8);
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return fallbackPack(id, goal, level, hours);
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.7,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Learning goal: ${goal}\nLevel: ${level}\nHours available today: ${hours}`,
          },
        ],
      }),
      signal: AbortSignal.timeout(45_000),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Groq ${res.status}: ${body}`);
    }
    const data = await res.json();
    const rawContent = data.choices?.[0]?.message?.content;
    if (typeof rawContent !== "string" || !rawContent.trim()) {
      throw new Error("Empty model response");
    }
    const jsonText = rawContent
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const parsed = JSON.parse(jsonText);
    if (!isValid(parsed)) throw new Error("Pack failed validation");

    return {
      id,
      createdAt: new Date().toISOString(),
      topic: goal,
      level,
      hours,
      title: parsed.title,
      projectBrief: parsed.projectBrief,
      ruleMarkdown: parsed.ruleMarkdown,
      skillMarkdown: parsed.skillMarkdown,
      prompts: parsed.prompts.slice(0, 5),
      installSteps: parsed.installSteps.slice(0, 4),
      source: "groq",
    };
  } catch (err) {
    console.error(
      "[generatePack] falling back:",
      err instanceof Error ? err.message : err
    );
    // Demo must never fail on stage: fall back to the canned pack.
    return fallbackPack(id, goal, level, hours);
  }
}
