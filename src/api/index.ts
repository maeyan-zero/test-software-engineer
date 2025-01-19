import { createApp } from "@/api/app";
import * as process from "process";
import { createPublisher, createRedisClient } from "@/infrastructure/redis";
import { createPushEventService } from "@/domain/events/service";

const redisClient = createRedisClient();
const publisher = createPublisher(redisClient);
const eventService = createPushEventService(publisher);

const EXPRESS_PORT = process.env.EXPRESS_PORT ?? 3000;
const app = createApp(eventService);

app.listen(EXPRESS_PORT, () => {
  console.log(`Server is running on http://localhost:${EXPRESS_PORT}`);
});
