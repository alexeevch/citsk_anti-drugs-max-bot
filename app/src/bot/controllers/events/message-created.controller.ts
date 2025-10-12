import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import { startCommand } from "~/bot/controllers/commands/start.command.js";
import { COMMAND_REGEXP } from "~/shared/utils/regex.util.js";
import { factoryCommand } from "~/bot/controllers/commands/factory.command.js";

export const MessageCreatedController = {
  async handle(ctx: ExtendedContext) {
    const messageText = ctx.message?.body.text;

    //Обрабатываем команды
    if (messageText && COMMAND_REGEXP.test(messageText)) {
      await factoryCommand.handle(ctx);
      return;
    }

    const stage = ctx.sessionData?.currentStage;

    switch (stage) {
      case Stage.Start:
        return startCommand.handle(ctx);
      default:
        await ctx.reply("Я не понимаю это сообщение 🤖");
    }
  },
};
