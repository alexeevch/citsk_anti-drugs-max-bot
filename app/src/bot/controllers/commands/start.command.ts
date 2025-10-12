import { categoryRepository } from "~/core/repositories/category.repository.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import type { ExtendedContext, SessionData } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import { startMessage } from "~/bot/utils/template.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";

export const startCommand: SceneContract = {
  async handle(ctx: ExtendedContext): Promise<void> {
    ctx.sessionData = {} as SessionData;
    ctx.sessionData.currentStage = Stage.Start;

    const categories = await categoryRepository.findAll();
    const buttons = categories.map(({ id, name }) => {
      return Keyboard.button.callback(name, `category:${id}`);
    });
    const keyboard = buildInlineKeyboard(buttons);
    await ctx.reply(startMessage, { attachments: [keyboard], format: "markdown" });

    ctx.sessionData.currentStage = Stage.CategoryChoose;
  },
};
