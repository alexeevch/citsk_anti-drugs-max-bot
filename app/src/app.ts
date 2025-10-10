import express from "express";
import { Bot } from "@maxhub/max-bot-api";
import type { ExtendedContext } from "~/shared/types/bot.types.js";

export default function buildApp() {
  const app = express();

  app.use(express.json());

  const bot = new Bot<ExtendedContext>(String(process.env.BOT_TOKEN));

  bot.start().then((r) => console.error(r));

  return app;
}
