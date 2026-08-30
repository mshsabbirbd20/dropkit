import { NextResponse } from "next/server";
import { generatePack } from "@/lib/generate";
import { savePack } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const goal = typeof body?.goal === "string" ? body.goal.trim() : "";
  const level = body?.level === "intermediate" ? "intermediate" : "beginner";
  const hours = Math.min(Math.max(Number(body?.hours) || 2, 1), 8);

  if (goal.length < 8) {
    return NextResponse.json(
      { error: "Tell us a bit more about what you want to learn." },
      { status: 400 }
    );
  }

  const pack = await generatePack(goal, level, hours);
  await savePack(pack);
  return NextResponse.json({ id: pack.id });
}
