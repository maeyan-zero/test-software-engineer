import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { createApp } from "../index";
import { EventType, GameEvent } from "@/domain/events/types";
import { AbstractPublisher } from "@/domain/pubsub";
import {
  createPushEventService,
  PushEventService,
} from "@/domain/events/scheduler";

describe("Tests REST API endpoints.", () => {
  test("/api/event processes valid events", () => {
    return request(createTestApp())
      .post("/api/event")
      .send(createValidEvent())
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("/api/event validates missing game data", () => {
    return request(createTestApp())
      .post("/api/event")
      .send(createInvalidEvent())
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(JSON.parse(response.text)).toEqual({
          error: "Invalid Event",
          details: [
            {
              path: "data.gameId",
              message: "Expected string, received null",
            },
          ],
        });
      });
  });
});

function createNoOpsPublisher(): AbstractPublisher {
  return {
    async publish(channelId: string, event: GameEvent): Promise<void> {
      console.log("[Publisher] Publishing message to channel...", {
        channelId,
        event,
      });
    },
  };
}

function createEventService(): PushEventService {
  return createPushEventService(createNoOpsPublisher());
}

function createTestApp() {
  return createApp(createEventService());
}

function createValidEvent() {
  const now = new Date();

  return {
    playerId: "sam12345",
    ipAddress: "127.0.0.1",
    timestamp: now.toISOString(),
    eventType: EventType.JOIN_GAME,
    data: {
      gameId: "aus-01-005",
    },
  };
}

function createInvalidEvent() {
  const now = new Date();

  return {
    playerId: "sam12345",
    ipAddress: "127.0.0.1",
    timestamp: now.toISOString(),
    eventType: EventType.JOIN_GAME,
    data: {
      gameId: null, // id missing!
    },
  };
}
