import { createClient, RedisClientType } from "redis";
import { IPublisher } from "@/domain/pubsub";
import { GameEvent } from "@/domain/events";
import { ifDebug } from "@/common/debug";
import process from "process";

export function createRedisClient(): RedisClientType {
  const redisdsn = process.env.REDIS_DSN;

  return createClient({
    url: redisdsn,
  });
}

export function createPublisher(client: RedisClientType): IPublisher {
  return {
    async publish(channelId: string, event: GameEvent): Promise<void> {
      const resp = await client.publish(channelId, JSON.stringify(event));

      ifDebug(() => {
        console.info("Published redis message.", resp);
      });
    },
  };
}
