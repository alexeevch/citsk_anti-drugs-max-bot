import type { ExtendedContext } from "~/bot/bot.types.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { districtRepository } from "~/core/repositories/district.repository.js";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { districtChooseMessage } from "~/bot/utils/template.util.js";
import { convertPayloadToString, convertStringToPayload } from "~/bot/utils/callback.util.js";

export const categoryScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.CategoryChoose) return;

    const callbackRaw = ctx.callback?.payload;

    if (!callbackRaw) {
      await ctx.reply("⚠ Пожалуйста, выберите категорию в сообщении выше.");
      return;
    }

    const payloadData = convertStringToPayload(callbackRaw);
    if (!payloadData) {
      await ctx.reply("⚠ Не удалось получить категорию. Пожалуйста, попробуйте позже");
      return;
    }

    if (payloadData?.stage !== Stage.CategoryChoose) return;
    ctx.complaint.category = { id: payloadData.id, name: payloadData.name };

    const districts = await districtRepository.findAll();
    const buttons = districts.map(({ name, id }) => {
      const payload = convertPayloadToString({
        stage: Stage.DistrictChoose,
        name: name,
        id: id,
      });
      return Keyboard.button.callback(name, payload);
    });

    await ctx.reply(`✅ Вы выбрали: **${payloadData?.name}**`, { format: "markdown" });
    await ctx.reply(districtChooseMessage, {
      attachments: [buildInlineKeyboard(buttons)],
      format: "markdown",
    });
    ctx.currentStage = Stage.DistrictChoose;
  },
};
