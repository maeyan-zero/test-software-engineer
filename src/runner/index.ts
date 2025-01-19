import { createRedisClient, createSubscriber } from "@/infrastructure/redis";
import { createEventProcessingService } from "@/domain/events/service";

const redis = createRedisClient();
const subscriber = createSubscriber(redis);
const eventProcessor = createEventProcessingService();

// channel id could come from cli or env when scaling
redis.connect().then(() => {
  console.info("Redis client connected.");

  subscriber.subscribe("lobby", eventProcessor.handleEvent).then(() => {
    console.info("Listening for lobby messages...");
  });
});

// clean up
