import { redis } from "~/core/redis/redis.client.js";
import type { ExtendedContext, SessionData } from "../bot.types.js";

/**
 * Middleware для хранения сессии пользователя в Redis.
 * Обновляет Redis только при изменении sessionData.
 */
export const sessionMiddleware = async (ctx: ExtendedContext, next: () => Promise<void>) => {
  const key = `chat:${ctx.chatId}`;

  const raw = await redis.get(key);
  const original = raw ? (JSON.parse(raw) as SessionData) : {};

  ctx.sessionData = { ...original } as SessionData;

  try {
    await next();
  } finally {
    const updated = JSON.stringify(ctx.sessionData);
    if (updated !== raw) {
      await redis.set(key, updated, "EX", 86400);
    }
  }
};
