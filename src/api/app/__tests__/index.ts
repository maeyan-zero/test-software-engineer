import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import { createApp } from "../index";
import { EventType } from "@/domain/events/types";

describe("Tests REST API endpoints.", () => {
  test("/api/event processes valid events", () => {
    return request(createApp())
      .post("/api/event")
      .send(createValidEvent())
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("/api/event validates missing game data", () => {
    return request(createApp())
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
