import { createClient, RedisClientType } from "redis";
import { GameEventHandler, IPublisher, ISubscriber } from "@/domain/pubsub";
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

export function createSubscriber(client: RedisClientType): ISubscriber {
  return {
    async subscribe(
      channelId: string,
      handler: GameEventHandler,
    ): Promise<void> {
      // noinspection TypeScriptValidateTypes
      await client.subscribe<GameEvent>(channelId, (message: string) => {
        console.info("Redis message received.", {
          message,
        });

        try {
          const event = JSON.parse(message);
          handler(event);
        } catch (err) {
          // handle parsing errors, processing errors etc
          console.log("Error processing event.", err);
        }
      });
    },
  };
}
