import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { complaintDescriptionMessage, errorMessage } from "~/bot/utils/template.util.js";
import { convertStringToPayload } from "~/bot/utils/callback.util.js";

export const districtScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.DistrictChoose) return;

    const callbackRaw = ctx.callback?.payload;

    if (!callbackRaw) {
      await ctx.reply("⚠ Пожалуйста, выберите район из сообщения выше.");
      return;
    }

    const payloadData = convertStringToPayload(callbackRaw);
    if (!payloadData) {
      await ctx.reply(errorMessage);
      return;
    }
    if (payloadData?.stage !== Stage.DistrictChoose) return;
    ctx.complaint.district = { id: payloadData.id, name: payloadData.name };

    await ctx.reply(`✅ Вы выбрали: **${payloadData?.name}**`, { format: "markdown" });
    await ctx.reply(complaintDescriptionMessage, { format: "markdown" });
    ctx.currentStage = Stage.ComplaintDescription;
  },
};
