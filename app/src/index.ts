import "dotenv/config";
import { MaxBotApp } from "~/bot/bot.app.js";

const main = async () => {
  const botApp = await MaxBotApp.create(process.env.BOT_TOKEN!);
  await botApp.start();
};

main().catch((error) => {
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
  });
  console.error("Fatal error:", error);
  process.exit(1);
});
