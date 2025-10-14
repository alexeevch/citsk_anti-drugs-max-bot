import { Context } from "@maxhub/max-bot-api";
import type { User } from "@maxhub/max-bot-api/types";
import type { Stage } from "~/bot/utils/enum.util.js";

export interface ExtendedContext extends Context {
  complaint: ComplaintDraft;
  user: UserBot;
  userState: UserState;
  currentStage: Stage;
}

export interface ComplaintDraft {
  category?: {
    id: number;
    name: string;
  };
  district?: {
    id: number;
    name: string;
  };
  message?: string;
  location?: string;
  photos?: { token: string; url: string }[];
  coordinates?: Coordinates;
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

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type CallbackPayloadData = {
  stage: Stage;
  name: string;
  id: number;
};
