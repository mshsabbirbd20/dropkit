import type { LearningPack } from "./types";

/**
 * Offline-safe canned pack so the demo never depends on Wi-Fi or an API key.
 * Used when GROQ_API_KEY is missing or the LLM call fails.
 */
export function fallbackPack(
  id: string,
  goal: string,
  level: "beginner" | "intermediate",
  hours: number
): LearningPack {
  const topic = goal.trim() || "How web APIs work";
  return {
    id,
    createdAt: new Date().toISOString(),
    title: "How Web APIs Work — by Building One",
    topic,
    level,
    hours,
    projectBrief:
      "Today you build a tiny JSON API with a single Next.js route handler: a `/api/quotes` endpoint that returns, filters, and accepts quotes. By the end you will understand requests, responses, status codes, and JSON — because you shipped all four.",
    ruleMarkdown: `---
description: Teaching mode for learning how web APIs work
alwaysApply: true
---

# Teaching mode: Web APIs (${level})

You are a patient programming tutor, not a code generator.

- Teach by building: every concept must land inside the small project we are building together.
- Move in small steps. One idea per step. After each step, ask me one short question to check I understood before continuing.
- Never paste a complete solution unless I say the word "reveal". Prefer giving me the next 1-3 lines and asking me to predict what they do.
- When I make a mistake, do not fix it silently. Show me the error, ask me what I think went wrong, then guide me.
- Define every new term (endpoint, status code, JSON, route handler) in one plain sentence the first time it appears.
- Keep explanations under 6 sentences. I learn from doing, not reading essays.
- Never run destructive commands. Only create or edit files inside this project folder.`,
    skillMarkdown: `---
name: teach-web-apis
description: Guides a beginner through building and understanding a tiny JSON API in Next.js, step by step, with checkpoints.
---

# Teach Web APIs by Building

Use this skill when the user wants to learn how web APIs work.

## Approach

1. Confirm the user's level and how much time they have.
2. Build one tiny endpoint (\`/api/quotes\`) in four passes: return static JSON, add a query filter, accept a POST, return proper error codes.
3. After each pass, run the checkpoint question. Do not advance until the user answers in their own words.
4. If the user says "reveal", show the full code for the current step only — never the whole project.

## Guardrails

- Teaching content only: no shell commands beyond \`npm run dev\`, no network calls, no file access outside the project.
- Celebrate working requests: have the user test each step in the browser or with fetch before moving on.`,
    prompts: [
      {
        title: "Step 1 — Your first endpoint",
        prompt:
          "I'm learning how web APIs work. Create a Next.js route handler at /api/quotes that returns a JSON array of 3 quote objects (text, author). Before writing it, explain in 3 sentences what a route handler is and what happens when my browser requests this URL. Then guide me through the file line by line.",
        checkpoint:
          "In your own words: what did the server send back, and what does the 200 in the network tab mean?",
      },
      {
        title: "Step 2 — Query parameters",
        prompt:
          "Now teach me query parameters. Guide me to add ?author=NAME filtering to /api/quotes. Ask me to predict what the code should do before you show me any of it.",
        checkpoint:
          "What is the difference between /api/quotes and /api/quotes?author=Ada as seen by the server?",
      },
      {
        title: "Step 3 — Accepting data with POST",
        prompt:
          "Teach me the difference between GET and POST by guiding me to add a POST handler to /api/quotes that accepts a new quote as JSON and adds it to the in-memory list. Have me test it with fetch from the browser console.",
        checkpoint:
          "Why does the browser address bar only ever do GET, and what did we need instead to send data?",
      },
      {
        title: "Step 4 — Errors and status codes",
        prompt:
          "Teach me proper error handling: make the POST handler return 400 with a helpful message when the body is missing text or author. Explain when an API should use 200, 201, 400, and 404 — with our endpoint as the example.",
        checkpoint:
          "A client sends a quote with no author. Which status code comes back, and why is that better than returning 200?",
      },
    ],
    installSteps: [
      "Create an empty project folder (or open any practice repo) in Cursor.",
      "Create .cursor/rules/learn-web-apis.mdc and paste the Teaching Rule into it.",
      "Create .cursor/skills/teach-web-apis/SKILL.md and paste the Skill into it.",
      "Open the Agent, paste Step 1, and start learning.",
    ],
    source: "fallback",
  };
}
