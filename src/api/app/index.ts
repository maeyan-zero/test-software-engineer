import express from "express";
import { createEventRouter } from "@/api/events";
import bodyParser from "body-parser";

export function createApp() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/event", createEventRouter());

  return app;
}
