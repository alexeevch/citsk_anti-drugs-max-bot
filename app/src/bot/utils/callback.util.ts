import type { CallbackPayloadData } from "~/bot/bot.types.js";
import type { Stage } from "~/bot/utils/enum.util.js";

export const convertStringToPayload = (string: string): CallbackPayloadData | null => {
  const data = string.split(":");

  if (data.length !== 3) return null;

  return {
    stage: data[0] as Stage,
    name: String(data[1]),
    id: Number(data[2]),
  };
};

export const convertPayloadToString = (data: CallbackPayloadData): string => {
  return `${data.stage}:${data.name}:${data.id}`;
};
