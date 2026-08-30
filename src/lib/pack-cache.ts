import type { LearningPack } from "./types";

const KEY = (id: string) => `dropkit-pack:${id}`;

export function cachePack(pack: LearningPack) {
  try {
    sessionStorage.setItem(KEY(pack.id), JSON.stringify(pack));
    localStorage.setItem(KEY(pack.id), JSON.stringify(pack));
  } catch {
    // Quota / private mode — pack page can still work if API has the pack
  }
}

export function readCachedPack(id: string): LearningPack | null {
  try {
    const raw =
      sessionStorage.getItem(KEY(id)) ?? localStorage.getItem(KEY(id));
    if (!raw) return null;
    const pack = JSON.parse(raw) as LearningPack;
    if (!pack?.id || !pack.title || !Array.isArray(pack.prompts)) return null;
    return pack;
  } catch {
    return null;
  }
}
