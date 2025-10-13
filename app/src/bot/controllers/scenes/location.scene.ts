import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { MINIMAL_ADDRESS_LENGTH_REGEXP } from "~/shared/utils/regex.util.js";
import { COMPLAINT_LIMITS } from "~/bot/bot.config.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { convertPayloadToString } from "~/bot/utils/callback.util.js";
import { getComplaintSubmitMessage } from "~/bot/utils/template.util.js";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";

export const locationScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.LocationSend) return;

    const message = ctx.message;
    const messageText = message?.body.text;
    const attachments = message?.body.attachments;

    if (attachments && attachments[0]) {
      if (attachments[0].type !== "location") {
        await ctx.reply("Неверный формат вложения. Требуется геолокация.");
        return;
      }

      ctx.complaint.coordinates = {
        latitude: attachments[0].latitude,
        longitude: attachments[0].longitude,
      };
    }

    if (messageText) {
      if (!MINIMAL_ADDRESS_LENGTH_REGEXP.test(messageText)) {
        await ctx.reply(
          `Минимальная длина адреса - ${COMPLAINT_LIMITS.MIN_ADDRESS_LENGTH} символов.`
        );
        return;
      }
      ctx.complaint.location = messageText;
    }

    const submitButton = Keyboard.button.callback(
      "✅ Отправить",
      convertPayloadToString({
        stage: Stage.ComplaintSubmit,
        name: "submit",
        id: 1,
      })
    );

    await ctx.reply(getComplaintSubmitMessage(ctx.complaint), {
      attachments: [buildInlineKeyboard([submitButton])],
      format: "markdown",
    });

    ctx.currentStage = Stage.ComplaintSubmit;
  },
};
