import { categoryRepository } from "~/core/repositories/category.repository.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import type { ExtendedContext, SessionData } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";

export const startController = async (ctx: ExtendedContext) => {
  ctx.sessionData = {} as SessionData;

  const categories = await categoryRepository.findAll();
  const buttons = categories.map(({ id, name }) => {
    return Keyboard.button.callback(name, `category:${id}`);
  });
  const keyboard = buildInlineKeyboard(buttons);
  await ctx.reply("Выберите **категорию**", { attachments: [keyboard], format: "markdown" });

  ctx.sessionData.currentStage = Stage.CategoryChoose;
};
