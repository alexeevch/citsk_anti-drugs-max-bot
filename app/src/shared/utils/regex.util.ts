import { COMPLAINT_LIMITS } from "~/bot/bot.config.js";

export const MINIMAL_MESSAGE_LENGTH_REGEXP = new RegExp(
  `^.{${COMPLAINT_LIMITS?.MIN_MESSAGE_LENGTH ?? 10},}$`,
  "s"
);
export const MINIMAL_ADDRESS_LENGTH_REGEXP = new RegExp(
  `^.{${COMPLAINT_LIMITS?.MIN_ADDRESS_LENGTH ?? 5},}$`,
  "s"
);
export const COMMAND_REGEXP = /^\/[a-zA-Z]+$/;
