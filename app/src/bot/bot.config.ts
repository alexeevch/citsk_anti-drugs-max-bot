export const ANTI_SPAM_CONFIG = {
  MESSAGE_LIMIT_PER_MINUTE: 20,
  REPORT_LIMIT_PER_HOUR: 5,
  REPORT_LIMIT_PER_DAY: 20,

  BAN_DURATION_SECONDS: 60 * 60, // 1h

  WARNING_THRESHOLD_PERCENT: 0.8,

  MESSAGES: {
    BAN: "🚨 Вы заблокированы за превышение лимитов активности",
    BAN_SHORT: (remainingMinutes: number) =>
      `🚫 Вы заблокированы на ${remainingMinutes} минут за превышение лимитов`,
    WARN_MINUTE: (count: number, limit: number) =>
      `⚠️ Вы почти достигли лимита сообщений (${count}/${limit} за минуту).`,
    WARN_HOURLY_REPORT: (count: number, limit: number) =>
      `⚠️ Вы почти достигли лимита отчётов (${count}/${limit} за час).`,
    WARN_DAILY_REPORT: (count: number, limit: number) =>
      `⚠️ Вы почти достигли дневного лимита отчётов (${count}/${limit}).`,
  },
} as const;

export const COMPLAINT_LIMITS = {
  MAX_PHOTO_COUNT: 5,
  MIN_MESSAGE_LENGTH: 14,
};
