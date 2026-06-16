import { NextResponse } from "next/server";
import { findParticipant } from "@/lib/config";
import { getThread } from "@/lib/store";

export async function GET(req: Request) {
  const token = (new URL(req.url).searchParams.get("token") ?? "").trim();
  const p = findParticipant(token);
  if (!p) {
    return NextResponse.json({ error: "Nieznany klucz" }, { status: 403 });
  }
  const messages = await getThread(p.pairId);
  return NextResponse.json(
    { messages },
    { headers: { "Cache-Control": "no-store" } }
  );
}
