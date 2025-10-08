import "dotenv/config";
import buildApp from "~/app.js";
import morgan from "morgan";

const port = process.env.APP_PORT || 3000;
const app = buildApp();

const environment = process.env.NODE_ENV || "development";
app.use(environment === "development" ? morgan("dev") : morgan("tiny"));

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});
