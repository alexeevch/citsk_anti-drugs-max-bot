import express from "express";

export default function buildApp() {
  const app = express();

  app.use(express.json());

  return app;
}
