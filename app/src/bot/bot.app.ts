import { Bot } from "@maxhub/max-bot-api";
import { botCommands } from "~/bot/utils/template.util.js";
import type { ExtendedContext } from "~/bot/bot.types.js";
import { complaintMiddleware } from "~/bot/middleware/complaint.middleware.js";
import { antiSpamMiddleware } from "~/bot/middleware/anti-spam.middleware.js";
import { eventMiddleware } from "~/bot/middleware/event.middleware.js";
import { stageMiddleware } from "~/bot/middleware/stage.middleware.js";

export class MaxBotApp {
  private bot: Bot<ExtendedContext>;

  private constructor(private token: string) {
    this.bot = new Bot<ExtendedContext>(token);
  }

  static async create(token: string) {
    const app = new MaxBotApp(token);
    await app.setCommands();
    await app.registerMiddlewares();
    app.registerErrorHandler();

    return app;
  }

  public async start() {
    console.log("🚀 Запуск бота...");
    await this.bot.start();
    console.log("✅ Бот запущен");
  }

  public stop() {
    this.bot.stop();
    console.log("Бот остановлен");
  }

  private async setCommands() {
    await this.bot.api.deleteMyCommands();
    await this.bot.api.setMyCommands(botCommands);
  }

  private async registerMiddlewares() {
    this.bot.use(complaintMiddleware);
    this.bot.use(stageMiddleware);
    this.bot.use(antiSpamMiddleware);
    //eventMiddleware использовать всегда последним!
    this.bot.use(eventMiddleware);
  }

  private registerErrorHandler() {
    this.bot.catch((err) => {
      this.stop();
      console.error("Ошибка бота:", err);
      process.exit(1);
    });
  }
}
