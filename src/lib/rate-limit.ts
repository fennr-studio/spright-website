/**
 * Minimal fixed-window rate limiter.
 *
 * This is an in-memory implementation: it protects a single server instance
 * and resets on redeploy. It is deliberately dependency-free so the project
 * runs anywhere out of the box. For multi-region or serverless deployments,
 * swap the two functions below for a durable store (Upstash Redis, Vercel KV)
 * — the call site in the route handlers does not change.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5_000;

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
};

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    // Cheap guard against unbounded growth from spoofed IPs.
    if (buckets.size > MAX_TRACKED_KEYS) buckets.clear();
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > limit) {
    return { success: false, remaining: 0, retryAfter };
  }

  return { success: true, remaining: limit - existing.count, retryAfter };
}

/** Best-effort client identifier from proxy headers. */
export function clientKey(headers: Headers, scope: string) {
  const forwarded = headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}
