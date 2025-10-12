import { BotStartedEvent } from "~/bot/controllers/events/bot-started.event.js";
import type { SceneContract } from "~/bot/contracts/scene.contract.js";
import type { UpdateType } from "@maxhub/max-bot-api/types";
import { MessageCreatedEvent } from "~/bot/controllers/events/message-created.event.js";
import { MessageCallbackEvent } from "~/bot/controllers/events/message-callback.event.js";

type SceneMap = Partial<Record<UpdateType, SceneContract>>;

const controllerMap: SceneMap = {
  bot_started: BotStartedEvent,
  message_created: MessageCreatedEvent,
  message_callback: MessageCallbackEvent,
};

export class ControllerFactory {
  static get<T extends UpdateType>(type: T): SceneContract | null {
    return controllerMap[type] ?? null;
  }
}
