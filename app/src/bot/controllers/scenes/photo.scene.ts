import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { locationSendMessage } from "~/bot/utils/template.util.js";
import { convertStringToPayload } from "~/bot/utils/callback.util.js";
import { COMPLAINT_LIMITS } from "~/bot/bot.config.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";

export const photoScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.PhotoSend) return;

    const callbackRaw = ctx.callback?.payload;

    if (callbackRaw) {
      const payloadData = convertStringToPayload(callbackRaw);
      if (!payloadData) {
        await ctx.reply("⚠ Не получилось пропустить отправку фото. Попробуйте позже.");
        return;
      }
      if (payloadData?.stage !== Stage.PhotoSend) return;
      if (payloadData?.id === 0) {
        await ctx.reply(`✅ Вы пропустили отправку фото`);
      }
    } else {
      if (ctx.message) {
        if (!ctx.message.body.attachments) {
          await ctx.reply(
            "⚠ Я жду от Вас фото... Можете пропустить отправку, нажав на кнопку в сообщении выше."
          );
          return;
        }

        const photos = ctx.message.body.attachments.filter((item) => item.type === "image");
        const photosCount = photos.length;

        if (photosCount === 0) {
          await ctx.reply("⚠ Я жду от Вас фото, но вы отправили другое вложение...");
          return;
        }

        if (photosCount > COMPLAINT_LIMITS.MAX_PHOTO_COUNT) {
          await ctx.reply(
            `❌ Вы превысили количество фотографий. Загрузите **до ${COMPLAINT_LIMITS.MAX_PHOTO_COUNT}** шт.`,
            { format: "markdown" }
          );
          return;
        }

        if (photosCount > 0) {
          ctx.complaint.photos = photos.map(({ payload }) => {
            return {
              token: payload.token,
              url: payload.url,
            };
          });

          await ctx.reply(`✅ Вы успешно загрузили **${photosCount}** фото!`, {
            format: "markdown",
          });
        }
      }
    }

    const requestLocationBtn = Keyboard.button.requestGeoLocation("Отметить на карте");
    await ctx.reply(locationSendMessage, {
      attachments: [buildInlineKeyboard([requestLocationBtn])],
      format: "markdown",
    });

    ctx.currentStage = Stage.LocationSend;
  },
};
