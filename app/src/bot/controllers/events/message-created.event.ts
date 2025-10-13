import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import { startCommand } from "~/bot/controllers/commands/start.command.js";
import { COMMAND_REGEXP } from "~/shared/utils/regex.util.js";
import { factoryCommand } from "~/bot/controllers/commands/factory.command.js";
import { categoryScene } from "~/bot/controllers/scenes/category.scene.js";
import { complaintMessageScene } from "~/bot/controllers/scenes/complaint-message.scene.js";
import { photoScene } from "~/bot/controllers/scenes/photo.scene.js";
import { locationScene } from "~/bot/controllers/scenes/location.scene.js";
import { complaintSubmitScene } from "~/bot/controllers/scenes/complaint-submit.scene.js";

export const MessageCreatedEvent = {
  async handle(ctx: ExtendedContext) {
    const messageText = ctx.message?.body.text;

    //Обрабатываем команды
    if (messageText && COMMAND_REGEXP.test(messageText)) {
      await factoryCommand.handle(ctx);
      return;
    }

    const stage = ctx.currentStage;

    switch (stage) {
      case Stage.Start:
        return startCommand.handle(ctx);
      case Stage.CategoryChoose:
        return categoryScene.handle(ctx);
      case Stage.ComplaintDescription:
        return complaintMessageScene.handle(ctx);
      case Stage.PhotoSend:
        return photoScene.handle(ctx);
      case Stage.LocationSend:
        return locationScene.handle(ctx);
      case Stage.ComplaintSubmit:
        return complaintSubmitScene.handle(ctx);
      default:
        return;
    }
  },
};
