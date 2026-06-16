import { NextResponse } from "next/server";
import { findParticipant } from "@/lib/config";
import { addMessage, getThread } from "@/lib/store";

export async function POST(req: Request) {
  let payload: { token?: string; subject?: string; text?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const token = (payload.token ?? "").trim();
  const text = (payload.text ?? "").trim();
  const subject = (payload.subject ?? "").trim();

  if (!token || !text) {
    return NextResponse.json({ error: "Brak treści" }, { status: 400 });
  }

  const p = findParticipant(token);
  if (!p) {
    return NextResponse.json({ error: "Nieznany klucz" }, { status: 403 });
  }

  await addMessage(p.pairId, p.side, text, subject || undefined);
  const messages = await getThread(p.pairId);
  return NextResponse.json({ messages });
}
