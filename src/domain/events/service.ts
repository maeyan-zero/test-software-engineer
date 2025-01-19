import { GameEvent } from "@/domain/events";
import { IPublisher } from "@/domain/pubsub";
import { EventType } from "@/domain/events/types";

export type PushEventResult = {
  scheduled: number;
};

export interface IPushEventService {
  pushEvent(event: GameEvent): Promise<PushEventResult>;
}

export interface IEventProcessingService {
  handleEvent(event: GameEvent): Promise<void>;
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

export function createEventProcessingService(): IEventProcessingService {
  return {
    async handleEvent(event: GameEvent): Promise<void> {
      switch (event.eventType) {
        case EventType.JOIN_GAME:
          console.info("Player joined game.");
          break;
        case EventType.QUIT:
          console.info("Player quit.");
          break;
      }
    },
  };
}
