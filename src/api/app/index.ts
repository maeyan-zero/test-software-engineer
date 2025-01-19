import express from "express";
import { createEventRouter } from "@/api/events";
import bodyParser from "body-parser";
import { PushEventService } from "@/domain/events/scheduler";

export function createApp(eventService: PushEventService) {
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/event", createEventRouter(eventService));

  return app;
}
