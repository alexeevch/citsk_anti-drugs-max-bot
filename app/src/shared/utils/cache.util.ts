import { redis } from "~/core/redis/redis.client.js";

export async function cacheGetOrSet<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 60
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as T;
  }

  const data = await fetcher();

  await redis.setex(key, ttlSeconds, JSON.stringify(data));

  return data;
}
