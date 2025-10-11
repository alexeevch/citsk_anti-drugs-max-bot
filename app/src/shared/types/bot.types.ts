import { Context } from "@maxhub/max-bot-api";
import type { User } from "@maxhub/max-bot-api/types";

export interface ExtendedContext extends Context {
  sessionData: SessionData;
  user: UserBot;
}

export interface SessionData {
  currentStage?: Stage;
  photoToken?: string;
  complaintMessage?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  categoryId?: number;
  districtId?: number;
}

//Расширил, т.к. на момент разработки типы библиотеки неактуальны
export type UserBot = User & {
  first_name: string;
};

export type Stage =
  | "start"
  | "category_choose"
  | "district_choose"
  | "complaint_description"
  | "photo_send"
  | "location_send"
  | "finish";
