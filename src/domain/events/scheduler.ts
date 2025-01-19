import { GameEvent } from "@/domain/events";
import { AbstractPublisher } from "@/domain/pubsub";

export type PushEventResult = {
  scheduled: number;
};

export interface PushEventService {
  pushEvent(event: GameEvent): Promise<PushEventResult>;
}

export function createPushEventService(
  publisher: AbstractPublisher,
): PushEventService {
  return {
    async pushEvent(event: GameEvent): Promise<PushEventResult> {
      // handle business logic here
      // check player is allowed to join a game (ie not full, not banned etc.)
      await publisher.publish("lobby", event);

      return {
        scheduled: Date.now(),
      };
    },
  };
}
