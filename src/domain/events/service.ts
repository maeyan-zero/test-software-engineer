import { GameEvent } from "@/domain/events";
import { IPublisher } from "@/domain/pubsub";

export type PushEventResult = {
  scheduled: number;
};

export interface IPushEventService {
  pushEvent(event: GameEvent): Promise<PushEventResult>;
}

export function createPushEventService(
  publisher: IPublisher,
): IPushEventService {
  return {
    async pushEvent(event: GameEvent): Promise<PushEventResult> {
      console.log("Pushing event...", event);

      // handle business logic here
      // check player is allowed to join a game (ie not full, not banned etc.)
      await publisher.publish("lobby", event);

      return {
        scheduled: Date.now(),
      };
    },
  };
}
