import { redis } from "~/core/redis/redis.client.js";
import { ANTI_SPAM_CONFIG } from "~/bot/bot.config.js";
import type { ExtendedContext, UserState } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";

const {
  MESSAGE_LIMIT_PER_MINUTE,
  REPORT_LIMIT_PER_HOUR,
  REPORT_LIMIT_PER_DAY,
  BAN_DURATION_SECONDS,
  WARNING_THRESHOLD_PERCENT,
  MESSAGES,
} = ANTI_SPAM_CONFIG;

type WarningFlagKey = keyof NonNullable<UserState["warningsSent"]>;

function checkLimits(state: UserState): {
  isBanned: boolean;
  warning?: string;
  flagKey?: WarningFlagKey;
} {
  const msgCount = state.lastMessages.length;
  const hourReports = state.reportsHour.length;
  const dayReports = state.reportsDay.length;

  if (msgCount > MESSAGE_LIMIT_PER_MINUTE) return { isBanned: true };
  if (hourReports > REPORT_LIMIT_PER_HOUR) return { isBanned: true };
  if (dayReports > REPORT_LIMIT_PER_DAY) return { isBanned: true };

  if (
    msgCount > MESSAGE_LIMIT_PER_MINUTE * WARNING_THRESHOLD_PERCENT &&
    !state.warningsSent?.messages
  )
    return {
      isBanned: false,
      warning: MESSAGES.WARN_MINUTE(msgCount, MESSAGE_LIMIT_PER_MINUTE),
      flagKey: "messages",
    };

  if (
    hourReports > REPORT_LIMIT_PER_HOUR * WARNING_THRESHOLD_PERCENT &&
    !state.warningsSent?.hourlyReports
  )
    return {
      isBanned: false,
      warning: MESSAGES.WARN_HOURLY_REPORT(hourReports, REPORT_LIMIT_PER_HOUR),
      flagKey: "hourlyReports",
    };

  if (
    dayReports > REPORT_LIMIT_PER_DAY * WARNING_THRESHOLD_PERCENT &&
    !state.warningsSent?.dailyReports
  )
    return {
      isBanned: false,
      warning: MESSAGES.WARN_DAILY_REPORT(dayReports, REPORT_LIMIT_PER_DAY),
      flagKey: "dailyReports",
    };

  return { isBanned: false };
}

export const antiSpamMiddleware = async (ctx: ExtendedContext, next: () => Promise<void>) => {
  const userId = ctx.user.user_id;
  if (!userId || ctx.user.is_bot) {
    return;
  }

  const key = `user:${userId}`;
  const raw = await redis.get(key);
  const state: UserState = raw
    ? { warningsSent: {}, ...JSON.parse(raw) }
    : { lastMessages: [], reportsHour: [], reportsDay: [], warningsSent: {} };

  if (!state.warningsSent) {
    state.warningsSent = {
      messages: false,
      hourlyReports: false,
      dailyReports: false,
    };
  }

  const now = Date.now();

  // Проверка активного бана
  if (state.bannedUntil && now < state.bannedUntil) {
    const remaining = Math.ceil((state.bannedUntil - now) / 60000);
    await ctx.reply(MESSAGES.BAN_SHORT(remaining));
    return;
  }

  // Очистка старых данных
  const prevCounts = { ...state };
  state.lastMessages = state.lastMessages.filter((t) => now - t < 60 * 1000);
  state.reportsHour = state.reportsHour.filter((t) => now - t < 60 * 60 * 1000);
  state.reportsDay = state.reportsDay.filter((t) => now - t < 24 * 60 * 60 * 1000);

  // Если лимит обнулился — сбрасываем предупреждения
  if (state.lastMessages.length < prevCounts.lastMessages.length)
    state.warningsSent.messages = false;
  if (state.reportsHour.length < prevCounts.reportsHour.length)
    state.warningsSent.hourlyReports = false;
  if (state.reportsDay.length < prevCounts.reportsDay.length)
    state.warningsSent.dailyReports = false;

  // Логика активности
  const isReport = ctx.currentStage === Stage.Finish;
  if (isReport) {
    state.reportsHour.push(now);
    state.reportsDay.push(now);
  } else {
    state.lastMessages.push(now);
  }

  // Проверка лимитов
  const check = checkLimits(state);
  if (check.isBanned) {
    state.bannedUntil = now + BAN_DURATION_SECONDS * 1000;
    await redis.set(key, JSON.stringify(state), "EX", BAN_DURATION_SECONDS);
    await ctx.reply(MESSAGES.BAN);
    return;
  }

  // Отправляем предупреждение один раз
  if (check.warning && check.flagKey) {
    state.warningsSent = { ...state.warningsSent, [check.flagKey]: true };
    await ctx.reply(check.warning);
  }

  // Сохраняем состояние
  await redis.set(key, JSON.stringify(state), "EX", BAN_DURATION_SECONDS);
  ctx.userState = state;

  await next();
};
