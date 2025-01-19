import express from "express";
import { validate } from "@/api/middleware";
import { eventSchema } from "@/domain/events";
import { PushEventService } from "@/domain/events/scheduler";
import { StatusCodes } from "http-status-codes";

export function createEventRouter(service: PushEventService) {
  const router = express.Router();
  const eventValidator = validate(eventSchema);

  router.post("/", eventValidator, async (req, res) => {
    try {
      // thin service layer
      // router only concerned with req/resp translation
      await service.pushEvent(req.body);
    } catch (err: unknown) {
      // handle expected errors, unhandled errors fallback to server fault
      console.error(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    } finally {
      res.send();
    }
  });

  return router;
}
