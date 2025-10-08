import express from "express";
import { Bot, Context } from "@maxhub/max-bot-api";

interface MyContext extends Context {
  isAdmin?: boolean;
}

export default function buildApp() {
  const app = express();

  app.use(express.json());

  const bot = new Bot<MyContext>(String(process.env.BOT_TOKEN));

  bot.on("message_created", (ctx) => {
    console.log(ctx.user);
    ctx.reply("Hello World!");
  });

  // bot.on("message_chat_created", (ctx) => {
  //   console.log(ctx);
  //   ctx.reply("Привет");
  // });

  bot.start().then((r) => console.error(r));

  return app;
}
