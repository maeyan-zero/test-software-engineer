import "dotenv/config"; // adds .env support

import { createApp } from "@/api/app";
import * as process from "process";
import { createPublisher, createRedisClient } from "@/infrastructure/redis";
import { createPushEventService } from "@/domain/events/service";

const redisClient = createRedisClient();
const publisher = createPublisher(redisClient);
const eventService = createPushEventService(publisher);

// this bootstrap sequence is not robust; demo purposes only
redisClient.connect().then(() => {
  console.log("Redis client connected.");
});

const EXPRESS_PORT = process.env.EXPRESS_PORT ?? 3000;
const app = createApp(eventService);

const server = app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on http://localhost:${EXPRESS_PORT}`);
});

// clean up
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server shutdown.");
    redisClient.disconnect().then(() => {
      console.log("Redis client disconnected.");
    });
  });
});
