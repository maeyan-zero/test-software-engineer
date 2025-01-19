import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../index";

describe("Tests REST API endpoints.", () => {
  test("/api/event returns HTTP 200", () => {
    return request(app)
      .post("/api/event")
      .send()
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
