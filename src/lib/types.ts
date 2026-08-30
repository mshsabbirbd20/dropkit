export type PackPrompt = {
  title: string;
  prompt: string;
  checkpoint: string;
};

export type LearningPack = {
  id: string;
  createdAt: string;
  title: string;
  topic: string;
  level: "beginner" | "intermediate";
  hours: number;
  projectBrief: string;
  ruleMarkdown: string;
  skillMarkdown: string;
  prompts: PackPrompt[];
  installSteps: string[];
  source: "groq" | "fallback";
};
