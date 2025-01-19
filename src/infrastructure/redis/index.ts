import { createClient, RedisClientType } from "redis";
import { IPublisher } from "@/domain/pubsub";
import { GameEvent } from "@/domain/events";
import process from "process";

export function createRedisClient(): RedisClientType {
  const redisDsn = process.env.REDIS_DSN ?? "redis://localhost";

  return createClient({
    url: redisDsn,
  });
}

export function createPublisher(client: RedisClientType): IPublisher {
  return {
    async publish(channelId: string, event: GameEvent): Promise<void> {
      // noinspection TypeScriptValidateTypes
      const resp = await client.publish(channelId, JSON.stringify(event));

      console.info("Redis message published.", {
        response: resp,
      });
    },
  };
}
