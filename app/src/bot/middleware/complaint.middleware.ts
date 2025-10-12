import { redis } from "~/core/redis/redis.client.js";
import type { ExtendedContext, ComplaintDraft } from "../bot.types.js";

/**
 * Middleware для хранения состояния обращения в Redis.
 * Обновляет Redis только при изменении complaint.
 */
export const complaintMiddleware = async (ctx: ExtendedContext, next: () => Promise<void>) => {
  const key = `complaint:${ctx.chatId}`;

  const raw = await redis.get(key);
  const original = raw ? (JSON.parse(raw) as ComplaintDraft) : {};

  ctx.complaint = { ...original } as ComplaintDraft;

  try {
    await next();
  } finally {
    const updated = JSON.stringify(ctx.complaint);
    if (updated !== raw) {
      await redis.set(key, updated, "EX", 86400);
    }
  }
};
