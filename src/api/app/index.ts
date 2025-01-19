import express from "express";
import { createEventRouter } from "@/api/events";
import bodyParser from "body-parser";

import { IPushEventService } from "@/domain/events/types";

export function createApp(eventService: IPushEventService) {
  const app = express();

  app.use(bodyParser.json());
  app.use("/api/event", createEventRouter(eventService));

  return app;
}
