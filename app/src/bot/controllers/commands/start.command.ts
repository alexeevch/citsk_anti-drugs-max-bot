import { categoryRepository } from "~/core/repositories/category.repository.js";
import { Keyboard } from "@maxhub/max-bot-api";
import { buildInlineKeyboard } from "~/bot/utils/keyboard.util.js";
import type { ComplaintDraft, ExtendedContext } from "~/bot/bot.types.js";
import { Stage } from "~/bot/utils/enum.util.js";
import { startMessage } from "~/bot/utils/template.util.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import { convertPayloadToString } from "~/bot/utils/callback.util.js";

export const startCommand: SceneContract = {
  async handle(ctx: ExtendedContext): Promise<void> {
    ctx.complaint = {} as ComplaintDraft;

    const categories = await categoryRepository.findAll();
    const buttons = categories.map(({ id, name }) => {
      const payload = convertPayloadToString({
        stage: Stage.CategoryChoose,
        name: name,
        id: id,
      });

      return Keyboard.button.callback(name, payload);
    });
    const keyboard = buildInlineKeyboard(buttons);
    await ctx.reply(startMessage, { attachments: [keyboard], format: "markdown" });

    ctx.currentStage = Stage.CategoryChoose;
  },
};
