import "dotenv/config";
import buildApp from "~/app.js";
import morgan from "morgan";
import { MaxBotApp } from "~/bot/bot.app.js";

const port = process.env.APP_PORT || 3000;

const main = async () => {
  const app = buildApp();

  const environment = process.env.NODE_ENV || "development";
  app.use(environment === "development" ? morgan("dev") : morgan("tiny"));

  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  const botApp = await MaxBotApp.create(process.env.BOT_TOKEN!);
  await botApp.start();

  process.on("SIGTERM", async () => {
    console.log("SIGTERM signal received: closing services");
    server.close(() => console.log("HTTP server closed"));
  });
};

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
