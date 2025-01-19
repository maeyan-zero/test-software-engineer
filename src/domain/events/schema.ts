import z from "zod";
import { EventType } from "@/domain/events/types";

const baseSchema = z.object({
  playerId: z.string(),
  ipAddress: z.string().ip(),
  timestamp: z.string().datetime(),
  eventType: z.nativeEnum(EventType),
});

export const joinGameEventSchema = baseSchema.merge(
  z.object({
    eventType: z.literal(EventType.JOIN_GAME),
    data: z.object({
      gameId: z.string(),
    }),
  }),
);

export const quitEventSchema = baseSchema.merge(
  z.object({
    eventType: z.literal(EventType.QUIT),
  }),
);

export const eventSchema = z.discriminatedUnion("eventType", [
  joinGameEventSchema,
  quitEventSchema,
]);
