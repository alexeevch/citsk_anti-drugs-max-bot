import type { Coordinates, ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { convertStringToPayload } from "~/bot/utils/callback.util.js";
import { userRepository } from "~/core/repositories/user.repository.js";
import { complaintRepository } from "~/core/repositories/complaint.repository.js";
import {
  errorMessage,
  getComplaintAcceptedMessage,
  getComplaintReportMessage,
} from "~/bot/utils/template.util.js";
import { ImageAttachment } from "@maxhub/max-bot-api";
import type { CreateComplaintPayload } from "~/shared/types/entity.types.js";

export const complaintSubmitScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.ComplaintSubmit) return;

    const callbackRaw = ctx.callback?.payload;

    if (!callbackRaw) {
      await ctx.reply(
        `⚠ Пожалуйста, отправьте текущее обращение или введите **\`/start\`** для создания нового.`,
        {
          format: "markdown",
        }
      );
      return;
    }

    const payloadData = convertStringToPayload(callbackRaw);
    if (!payloadData) {
      await ctx.reply(errorMessage);
      return;
    }
    if (payloadData?.stage !== Stage.ComplaintSubmit) return;
    if (payloadData?.id !== 1) return;

    await ctx.reply("🚴 Везу данные в нужное место...");

    const me = await userRepository.sync({
      userId: ctx.user.user_id,
      firstName: ctx.user.first_name,
      isBot: ctx.user.is_bot,
      chatId: ctx.message?.recipient.chat_id ?? null,
    });

    if (!me.id) {
      await ctx.reply(errorMessage);
      return;
    }

    const complaint = await complaintRepository.create({
      userId: me.id,
      categoryId: ctx.complaint.category?.id,
      districtId: ctx.complaint.district?.id,
      latitude: ctx.complaint.coordinates?.latitude,
      longitude: ctx.complaint.coordinates?.longitude,
      location: ctx.complaint.location,
      message: ctx.complaint.message,
      photos: ctx.complaint.photos,
    } as CreateComplaintPayload);

    if (!complaint.id) {
      await ctx.reply(errorMessage);
      return;
    }

    const images = complaint.photos.map(({ token }) => {
      return new ImageAttachment({ token }).toJson();
    });

    try {
      await ctx.api.sendMessageToChat(
        Number(process.env.BOT_ADMIN_CHAT_ID!),
        getComplaintReportMessage({
          complaintId: complaint.id,
          category: complaint.category,
          district: complaint.district,
          message: complaint.message,
          photos: complaint.photos,
          location: complaint.location ?? undefined,
          coordinates: {
            longitude: complaint.longitude,
            latitude: complaint.latitude,
          } as Coordinates,
        }),
        { format: "markdown", attachments: images }
      );
    } catch (e) {
      console.error("Ошибка отправки обращения:", e);
      await ctx.reply(errorMessage);
      return;
    }

    await ctx.reply(getComplaintAcceptedMessage(complaint.id), {
      format: "markdown",
    });
    ctx.currentStage = Stage.Finish;
  },
};
