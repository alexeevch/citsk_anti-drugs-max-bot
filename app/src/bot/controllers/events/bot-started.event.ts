import type { ExtendedContext, ComplaintDraft } from "../../bot.types.js";
import { getBotStartedMessage } from "../../utils/template.util.js";
import type { CreateUserPayload } from "~/shared/types/entity.types.js";
import { userRepository } from "~/core/repositories/user.repository.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { Stage } from "~/bot/utils/enum.util.js";

export const BotStartedEvent: SceneContract = {
  async handle(ctx: ExtendedContext): Promise<void> {
    ctx.currentStage = Stage.Suspense;
    ctx.complaint = {} as ComplaintDraft;

    if (ctx.update.update_type !== "bot_started") {
      await ctx.reply("При запуске бота что-то пошло не так. Пожалуйста, попробуйте позже.");
      return;
    }

    const me: CreateUserPayload = {
      userId: ctx.user.user_id,
      chatId: ctx.update.chat_id,
      firstName: ctx.user.first_name,
      isBot: ctx.user.is_bot,
    };

    await userRepository.sync(me);

    await ctx.reply(getBotStartedMessage(me.firstName), { format: "markdown" });
  },
};
