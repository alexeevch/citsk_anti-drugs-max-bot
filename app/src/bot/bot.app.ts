import { Bot } from "@maxhub/max-bot-api";
import { botCommands } from "~/bot/utils/template.util.js";
import type { ExtendedContext } from "~/shared/types/bot.types.js";
import { sessionMiddleware } from "~/bot/middleware/session.middleware.js";
import { startController } from "~/bot/controllers/start.controller.js";
import { botStartedController } from "~/bot/controllers/bot-started.controller.js";
import { helpController } from "~/bot/controllers/help.controller.js";

export class MaxBotApp {
  private bot: Bot<ExtendedContext>;

  private constructor(private token: string) {
    this.bot = new Bot<ExtendedContext>(token);
  }

  static async create(token: string) {
    const app = new MaxBotApp(token);
    await app.setCommands();
    await app.registerMiddlewares();
    app.registerHandlers();
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
    this.bot.use(sessionMiddleware);
  }

  private registerHandlers() {
    this.bot.on("bot_started", botStartedController);
    this.bot.command("start", startController);
    this.bot.command("help", helpController);
  }

  private registerErrorHandler() {
    this.bot.catch((err) => {
      this.stop();
      console.error("Ошибка бота:", err);
      process.exit(1);
    });
  }
}
