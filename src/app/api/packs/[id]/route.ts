import { NextResponse } from "next/server";
import { getPack } from "@/lib/store";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const pack = await getPack(id);
  if (!pack) {
    return NextResponse.json({ error: "Kit not found." }, { status: 404 });
  }
  return NextResponse.json({ pack });
}
