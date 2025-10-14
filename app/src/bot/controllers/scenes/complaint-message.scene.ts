import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { photoSendMessage } from "~/bot/utils/template.util.js";
import { MINIMAL_MESSAGE_LENGTH_REGEXP } from "~/shared/utils/regex.util.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import { COMPLAINT_LIMITS } from "~/bot/bot.config.js";
import { convertPayloadToString } from "~/bot/utils/callback.util.js";

export const complaintMessageScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.ComplaintDescription) return;

    const messageText = ctx.message?.body.text;

    if (!messageText) {
      await ctx.reply("⚠ Пожалуйста, опишите проблему.");
      return;
    }

    if (messageText && !MINIMAL_MESSAGE_LENGTH_REGEXP.test(messageText)) {
      await ctx.reply(
        `⚠ Минимальная длина сообщения - ${COMPLAINT_LIMITS.MIN_MESSAGE_LENGTH} символов. Пожалуйста, дополните описание проблемы.`
      );
      return;
    }

    ctx.complaint.message = messageText;

    const photoSkipButton = Keyboard.button.callback(
      "У меня нет фотографий",
      convertPayloadToString({
        stage: Stage.PhotoSend,
        name: "photo",
        id: 0,
      })
    );
    const keyboard = buildInlineKeyboard([photoSkipButton]);
    await ctx.reply("✅ Описание нарушения принято");
    await ctx.reply(photoSendMessage, { attachments: [keyboard], format: "markdown" });
    ctx.currentStage = Stage.PhotoSend;
  },
};
