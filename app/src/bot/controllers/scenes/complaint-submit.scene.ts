import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { convertStringToPayload } from "~/bot/utils/callback.util.js";
import { userRepository } from "~/core/repositories/user.repository.js";
import { complaintRepository } from "~/core/repositories/complaint.repository.js";
import { getComplaintMessageResult } from "~/bot/utils/template.util.js";
import { ImageAttachment } from "@maxhub/max-bot-api";

export const complaintSubmitScene: SceneContract = {
  async handle(ctx: ExtendedContext) {
    if (ctx.currentStage !== Stage.ComplaintSubmit) return;

    const callbackRaw = ctx.callback?.payload;

    if (!callbackRaw) {
      await ctx.reply(
        `Пожалуйста, подтвердите заявку или введите **\`/start\`** для создания новой.`,
        {
          format: "markdown",
        }
      );
      return;
    }

    const payloadData = convertStringToPayload(callbackRaw);
    if (!payloadData) {
      await ctx.reply("Не удалось подтвердить заявку. Пожалуйста, попробуйте позже.");
      return;
    }
    if (payloadData?.stage !== Stage.ComplaintSubmit) return;
    if (payloadData?.id !== 1) return;

    const me = await userRepository.findByBotId(ctx.user.user_id);

    const complaint = await complaintRepository.create({
      userId: me.id,
      categoryId: ctx.complaint.category?.id,
      districtId: ctx.complaint.district?.id,
      latitude: ctx.complaint.coordinates?.latitude,
      longitude: ctx.complaint.coordinates?.longitude,
      location: ctx.complaint.location,
      message: ctx.complaint.message,
      photos: ctx.complaint.photos,
    });

    const images = complaint.photos.map(({ token }) => {
      return new ImageAttachment({ token }).toJson();
    });

    await ctx.api.sendMessageToChat(
      Number(process.env.BOT_ADMIN_CHAT_ID!),
      getComplaintMessageResult({
        complaintId: complaint.id,
        category: complaint.category.name,
        district: complaint.district.name,
        message: complaint.message,
        photosCount: complaint.photos.length,
        location: complaint.location,
        coordinates: {
          longitude: complaint.longitude ?? undefined,
          latitude: complaint.latitude ?? undefined,
        },
      }),
      { format: "markdown", attachments: images }
    );

    await ctx.reply(
      `✅ Обращение успешно принято под номером: #${complaint.id}. Вы можете подать новое командой \`/start\``,
      {
        format: "markdown",
      }
    );
    ctx.currentStage = Stage.Finish;
  },
};
