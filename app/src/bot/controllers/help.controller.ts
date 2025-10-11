import type { ExtendedContext } from "~/shared/types/bot.types.js";
import { botHelpMessage } from "~/bot/utils/template.util.js";

export const helpController = async (ctx: ExtendedContext) => {
  ctx.sessionData = {};

  await ctx.reply(botHelpMessage, { format: "markdown" });
};
