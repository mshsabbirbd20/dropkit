import { promises as fs } from "fs";
import path from "path";
import type { LearningPack } from "./types";

// Vercel serverless FS is read-only except /tmp. Keep an in-memory
// cache so kits work within the same warm instance after generate.
const memory = new Map<string, LearningPack>();

function dataFile() {
  const base =
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
      ? "/tmp"
      : path.join(process.cwd(), "data");
  return { dir: base, file: path.join(base, "packs.json") };
}

async function readAll(): Promise<Record<string, LearningPack>> {
  const fromMem: Record<string, LearningPack> = {};
  for (const [id, pack] of memory) fromMem[id] = pack;

  try {
    const { file } = dataFile();
    const raw = await fs.readFile(file, "utf-8");
    return { ...JSON.parse(raw), ...fromMem };
  } catch {
    return fromMem;
  }
}

export async function savePack(pack: LearningPack): Promise<void> {
  memory.set(pack.id, pack);
  try {
    const all = await readAll();
    all[pack.id] = pack;
    const { dir, file } = dataFile();
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(file, JSON.stringify(all, null, 2), "utf-8");
  } catch (err) {
    // Memory still holds the pack for this instance.
    console.error("[store] disk write skipped:", err);
  }
}

export async function getPack(id: string): Promise<LearningPack | null> {
  if (memory.has(id)) return memory.get(id)!;
  const all = await readAll();
  return all[id] ?? null;
}
