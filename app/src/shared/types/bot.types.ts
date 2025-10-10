import { Context } from "@maxhub/max-bot-api";

export interface ExtendedContext extends Context {
  currentStage?: Stage;
  photoToken?: string;
  complaintMessage?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export type Command = "/start" | "/help" | "rules";

export type Stage =
  | "category_choose"
  | "district_choose"
  | "complaint_description"
  | "photo_send"
  | "location_send";
