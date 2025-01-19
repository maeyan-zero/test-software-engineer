import {
  GameEvent,
  EventResult,
  EventType,
  IEventProcessingService,
  IPushEventService,
  PushEventResult,
} from "@/domain/events";
import { IPublisher } from "@/domain/pubsub";
import { IResultRepository } from "@/domain/rdms";

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

export function createEventProcessingService(
  repository: IResultRepository,
): IEventProcessingService {
  return {
    async handleEvent(event: GameEvent): Promise<EventResult> {
      switch (event.eventType) {
        case EventType.JOIN_GAME:
          console.info("Player joined game.");
          break;
        case EventType.QUIT:
          console.info("Player quit.");
          break;
      }

      try {
        return await repository.saveResult({
          event,
          success: true,
        });
      } catch (err) {
        console.error("Error saving event result.", err);

        // could add recovery logic here, retry etc

        return {
          event,
          success: false,
        };
      }
    },
  };
}
