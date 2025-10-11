import type { ExtendedContext } from "~/shared/types/bot.types.js";
import type { CreateUserPayload } from "~/shared/types/entity.types.js";
import { userRepository } from "~/core/repositories/user.repository.js";
import { getBotStartedMessage } from "~/bot/utils/template.util.js";

export const botStartedController = async (ctx: ExtendedContext) => {
  if (ctx.user.is_bot) return;

  ctx.sessionData = {};

  const me: CreateUserPayload = {
    userId: ctx.user?.user_id,
    chatId: ctx.update?.chat_id ?? null,
    firstName: ctx.user?.first_name,
    isBot: ctx.user?.is_bot,
  };

  await userRepository.sync(me);

  await ctx.reply(getBotStartedMessage(me.firstName), { format: "markdown" });
};
