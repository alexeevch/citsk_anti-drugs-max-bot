import type { ExtendedContext, SessionData } from "~/bot/bot.types.js";
import { rulesMessage } from "~/bot/utils/template.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";

export const rulesCommand: SceneContract = {
  async handle(ctx: ExtendedContext): Promise<void> {
    ctx.sessionData = {} as SessionData;
    await ctx.reply(rulesMessage, { format: "markdown" });
  },
};
