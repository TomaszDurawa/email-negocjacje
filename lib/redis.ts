import { Redis } from "@upstash/redis";

// Integracja Upstash z Vercel Marketplace wstrzykuje KV_REST_API_*.
// Bezpośrednie konto Upstash używa UPSTASH_REDIS_REST_*. Obsługujemy oba.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
});
