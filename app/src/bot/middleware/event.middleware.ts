import type { ExtendedContext } from "~/bot/bot.types.js";
import { ControllerFactory } from "~/bot/factories/controller.factory.js";

export const eventMiddleware = async (ctx: ExtendedContext, next: () => Promise<void>) => {
  const controller = ControllerFactory.get(ctx.update.update_type);

  if (controller) {
    await controller.handle(ctx);
  }
};
