import "dotenv/config"; // adds .env support

import { createRedisClient, createSubscriber } from "@/infrastructure/redis";
import { createEventProcessingService } from "@/domain/events/service";
import {
  createDb,
  createPgDialect,
  createResultRepository,
} from "@/infrastructure/postgres";

const redis = createRedisClient();
const subscriber = createSubscriber(redis);

const pg = createPgDialect();
const db = createDb(pg);
const repo = createResultRepository(db);

const eventProcessor = createEventProcessingService(repo);

// channel id could come from cli or env when scaling
redis.connect().then(() => {
  console.info("Redis client connected.");

  subscriber.subscribe("lobby", eventProcessor.handleEvent).then(() => {
    console.info("Listening for lobby messages...");
  });
});

// clean up
