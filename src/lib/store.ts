import { promises as fs } from "fs";
import path from "path";
import type { LearningPack } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "packs.json");

async function readAll(): Promise<Record<string, LearningPack>> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function savePack(pack: LearningPack): Promise<void> {
  const all = await readAll();
  all[pack.id] = pack;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
}

export async function getPack(id: string): Promise<LearningPack | null> {
  const all = await readAll();
  return all[id] ?? null;
}
