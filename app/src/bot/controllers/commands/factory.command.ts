import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import type { ExtendedContext } from "~/bot/bot.types.js";
import { startCommand } from "~/bot/controllers/commands/start.command.js";
import { helpCommand } from "~/bot/controllers/commands/help.command.js";
import { Command } from "~/bot/utils/enum.util.js";

export const factoryCommand: SceneContract = {
  async handle(ctx: ExtendedContext): Promise<void> {
    const messageText = ctx.message?.body.text;

    switch (messageText) {
      case Command.Start:
        await startCommand.handle(ctx);
        break;
      case Command.Help:
        await helpCommand.handle(ctx);
        break;
      default:
        await ctx.reply("Такой команды не нашел, возможно, Вы опечатались.");
    }
  },
};
