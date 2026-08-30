import { NextResponse } from "next/server";
import { getPack } from "@/lib/store";
import { buildKitZip } from "@/lib/kit-zip";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const pack = await getPack(id);
  if (!pack) {
    return NextResponse.json({ error: "Kit not found." }, { status: 404 });
  }

  const { filename, bytes } = await buildKitZip(pack);

  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
