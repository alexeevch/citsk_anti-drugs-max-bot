import type { ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import { categoryScene } from "~/bot/controllers/scenes/category.scene.js";
import { districtScene } from "~/bot/controllers/scenes/district.scene.js";
import { photoScene } from "~/bot/controllers/scenes/photo.scene.js";

export const MessageCallbackEvent = {
  async handle(ctx: ExtendedContext) {
    const stage = ctx.currentStage;

    switch (stage) {
      case Stage.CategoryChoose:
        return categoryScene.handle(ctx);
      case Stage.DistrictChoose:
        return districtScene.handle(ctx);
      case Stage.PhotoSend:
        return photoScene.handle(ctx);
      default:
        return;
    }
  },
};
