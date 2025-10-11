import { categoryRepository } from "~/core/repositories/category.repository.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import type { ExtendedContext } from "~/shared/types/bot.types.js";

export const startController = async (ctx: ExtendedContext) => {
  ctx.sessionData = {};

  const categories = await categoryRepository.findAll();
  const buttons = categories.map(({ id, name }) => {
    return Keyboard.button.callback(name, `category:${id}`);
  });
  const keyboard = buildInlineKeyboard(buttons);
  await ctx.reply("Выберите **категорию**", { attachments: [keyboard], format: "markdown" });

  ctx.sessionData.currentStage = "category_choose";
};
