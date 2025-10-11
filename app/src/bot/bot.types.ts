import { Context } from "@maxhub/max-bot-api";
import type { User } from "@maxhub/max-bot-api/types";
import type { Stage } from "~/bot/utils/enum.util.js";

export interface ExtendedContext extends Context {
  sessionData: SessionData;
  user: UserBot;
}

export interface SessionData {
  currentStage: Stage;
  photos?: { token: string; url: string }[];
  complaintMessage?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  categoryId?: number;
  districtId?: number;
  message?: string;
}

//Расширил, т.к. на момент разработки типы библиотеки неактуальны
export type UserBot = User & {
  first_name: string;
};
