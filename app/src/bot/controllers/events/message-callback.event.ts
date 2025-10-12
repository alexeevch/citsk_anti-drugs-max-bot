import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import { categoryScene } from "~/bot/controllers/scenes/category.scene.js";
import { districtScene } from "~/bot/controllers/scenes/district.scene.js";

export const MessageCallbackEvent = {
  async handle(ctx: ExtendedContext) {
    const stage = ctx.currentStage;

    switch (stage) {
      case Stage.CategoryChoose:
        return categoryScene.handle(ctx);
      case Stage.DistrictChoose:
        return districtScene.handle(ctx);
      default:
        return;
    }
  },
};
