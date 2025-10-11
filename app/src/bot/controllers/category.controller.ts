import type { ExtendedContext } from "~/bot/bot.types.js";
import { splitCallback } from "~/bot/utils/callback.util.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { districtRepository } from "~/core/repositories/district.repository.js";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import { Stage } from "~/bot/utils/enum.util.js";

export const categoryController = async (ctx: ExtendedContext) => {
  if (ctx.sessionData.currentStage !== "category_choose") return;

  const callbackPayload = ctx.callback?.payload;

  if (!callbackPayload) {
    await ctx.reply("Произошла ошибка, попробуйте позже");
    return;
  }

  ctx.sessionData.categoryId = Number(splitCallback(callbackPayload));

  const districts = await districtRepository.findAll();

  const buttons = districts.map(({ id, name }) => {
    return Keyboard.button.callback(name, `district:${id}`);
  });

  const keyboard = buildInlineKeyboard(buttons);

  await ctx.reply("Выберите район", { attachments: [keyboard] });
  ctx.sessionData.currentStage = Stage.DistrictChoose;
};
