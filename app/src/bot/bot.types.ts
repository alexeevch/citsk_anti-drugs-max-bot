import { Context } from "@maxhub/max-bot-api";
import type { User } from "@maxhub/max-bot-api/types";
import type { Stage } from "~/bot/utils/enum.util.js";

export interface ExtendedContext extends Context {
  sessionData: SessionData;
  user: UserBot;
  userState: UserState;
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

export interface UserState {
  lastMessages: number[];
  reportsHour: number[];
  reportsDay: number[];
  bannedUntil?: number;
  warningsSent?: {
    messages?: boolean;
    hourlyReports?: boolean;
    dailyReports?: boolean;
  };
}

//Расширил, т.к. на момент разработки типы библиотеки неактуальны
export type UserBot = User & {
  first_name: string;
};
