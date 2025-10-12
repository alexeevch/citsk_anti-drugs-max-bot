import { redis } from "~/core/redis/redis.client.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { ExtendedContext } from "~/bot/bot.types.js";

/**
 * Middleware для хранения и восстановления этапа пользователя в Redis.
 * Обновляет Redis только при изменении stage.
 */
export const stageMiddleware = async (ctx: ExtendedContext, next: () => Promise<void>) => {
  const key = `stage:${ctx.chatId}`;

  const raw = (await redis.get(key)) as Stage | null;
  if (!ctx.currentStage && raw) {
    ctx.currentStage = raw;
  }

  await next();

  const finalStage = ctx.currentStage ?? Stage.Suspense;
  if (finalStage !== raw) {
    await redis.set(key, finalStage, "EX", 86400);
  }
};
