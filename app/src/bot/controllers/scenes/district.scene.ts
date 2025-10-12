import type { ExtendedContext } from "~/bot/bot.types.js";
import { splitCallback } from "~/bot/utils/callback.util.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { complaintDescriptionMessage } from "~/bot/utils/template.util.js";
import { districtRepository } from "~/core/repositories/district.repository.js";

export const districtScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.DistrictChoose) return;

    const callbackPayload = ctx.callback?.payload;

    if (!callbackPayload) {
      await ctx.reply("Произошла ошибка, попробуйте позже");
      return;
    }

    ctx.complaint.districtId = Number(splitCallback(callbackPayload));
    const district = await districtRepository.findById(ctx.complaint.districtId);

    await ctx.reply(`✅ Вы выбрали: **${district?.name}**`, { format: "markdown" });
    await ctx.reply(complaintDescriptionMessage, { format: "markdown" });
    ctx.currentStage = Stage.ComplaintDescription;
  },
};
