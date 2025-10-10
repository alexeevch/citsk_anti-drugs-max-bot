import RedisPkg from "ioredis";

const Redis = (RedisPkg as any).default || RedisPkg;

export const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || "pass",
  db: Number(process.env.REDIS_DB) || 0,
});

redis.on("connect", () => console.log("[Redis] Connected"));
redis.on("error", (err: any) => console.error("[Redis] Error:", err));
