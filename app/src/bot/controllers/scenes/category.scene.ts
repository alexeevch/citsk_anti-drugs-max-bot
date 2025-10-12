import type { ExtendedContext } from "~/bot/bot.types.js";
import { splitCallback } from "~/bot/utils/callback.util.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { districtRepository } from "~/core/repositories/district.repository.js";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { districtChooseMessage } from "~/bot/utils/template.util.js";

export const categoryScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.CategoryChoose) return;

    const callbackPayload = ctx.callback?.payload;

    if (!callbackPayload) {
      await ctx.reply("Пожалуйста, выберите категорию в сообщении выше.");
      return;
    }

    ctx.complaint.categoryId = Number(splitCallback(callbackPayload));

    const districts = await districtRepository.findAll();

    const buttons = districts.map((district) => {
      return Keyboard.button.callback(district.name, `district:${district.id}`);
    });

    const keyboard = buildInlineKeyboard(buttons);

    await ctx.reply(districtChooseMessage, { attachments: [keyboard], format: "markdown" });
    ctx.currentStage = Stage.DistrictChoose;
  },
};
