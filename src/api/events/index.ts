import express from "express";
import { validate } from "@/api/middleware";
import { eventSchema } from "@/domain/events";

export function createEventRouter() {
  const router = express.Router();
  const eventValidator = validate(eventSchema);

  router.post("/", eventValidator, (req, res) => {
    res.send();
  });

  return router;
}
