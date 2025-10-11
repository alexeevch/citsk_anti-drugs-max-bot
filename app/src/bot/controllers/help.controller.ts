import type { ExtendedContext, SessionData } from "~/bot/bot.types.js";
import { botHelpMessage } from "~/bot/utils/template.util.js";

export const helpController = async (ctx: ExtendedContext) => {
  ctx.sessionData = {} as SessionData;

  await ctx.reply(botHelpMessage, { format: "markdown" });
};
