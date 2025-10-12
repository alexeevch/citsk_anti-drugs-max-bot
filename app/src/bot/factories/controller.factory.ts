import { BotStartedScene } from "~/bot/controllers/scenes/bot-started.scene.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import type { UpdateType } from "@maxhub/max-bot-api/types";
import { MessageCreatedController } from "~/bot/controllers/events/message-created.controller.js";

type SceneMap = Partial<Record<UpdateType, SceneContract>>;

const controllerMap: SceneMap = {
  bot_started: BotStartedScene,
  message_created: MessageCreatedController,
};

export class ControllerFactory {
  static get<T extends UpdateType>(type: T): SceneContract | null {
    return controllerMap[type] ?? null;
  }
}
