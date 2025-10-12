import type { ExtendedContext, SessionData } from "../bot.types.js";
import { getBotStartedMessage } from "../utils/template.util.js";
import type { CreateUserPayload } from "~/shared/types/entity.types.js";
import { userRepository } from "~/core/repositories/user.repository.js";

export const botStartedController = async (ctx: ExtendedContext) => {
  if (ctx.user.is_bot) return;

  ctx.sessionData = {} as SessionData;

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
};
