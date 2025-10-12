import type { ExtendedContext } from "~/bot/bot.types.js";

export interface SceneContract {
  handle(ctx: ExtendedContext): Promise<void>;
}
