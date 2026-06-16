import { redis } from "./redis";
import type { Msg } from "./config";

const MAX_LEN = 8000; // ostrożny limit długości pojedynczej wiadomości

function normalize(raw: unknown): Msg {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Msg;
    } catch {
      return { side: "A", text: String(raw), ts: 0 };
    }
  }
  return raw as Msg;
}

export async function getThread(pairId: string): Promise<Msg[]> {
  const raw = await redis.lrange(`msg:${pairId}`, 0, -1);
  return raw.map(normalize);
}

export async function addMessage(
  pairId: string,
  side: Msg["side"],
  text: string,
  subject?: string
): Promise<Msg> {
  const msg: Msg = {
    side,
    text: text.slice(0, MAX_LEN),
    subject: subject?.slice(0, 200) || undefined,
    ts: Date.now(),
  };
  await redis.rpush(`msg:${pairId}`, msg);
  return msg;
}

export async function markSeen(token: string): Promise<void> {
  await redis.set(`seen:${token}`, Date.now());
}

export async function getSeen(token: string): Promise<number | null> {
  const v = await redis.get<number>(`seen:${token}`);
  return typeof v === "number" ? v : v ? Number(v) : null;
}
