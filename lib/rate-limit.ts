import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export function rateLimit() : Ratelimit {
  if (!process.env.UPSTASH_REDIS_REST_URL)
    throw new Error("UPSTASH_REDIS_REST_URL undefined");
  if (!process.env.UPSTASH_REDIS_REST_TOKEN)
    throw new Error("UPSTASH_REDIS_REST_TOKEN undefined");

  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(50, "5 s"),
    analytics: true,
  });
  return ratelimit;
}
