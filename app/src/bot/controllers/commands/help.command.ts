import type { ExtendedContext } from "~/bot/bot.types.js";
import { botHelpMessage } from "~/bot/utils/template.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";

export const helpCommand: SceneContract = {
  async handle(ctx: ExtendedContext): Promise<void> {
    await ctx.reply(botHelpMessage, { format: "markdown" });
  },
};
