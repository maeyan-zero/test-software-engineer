import { GameEvent } from "@/domain/events";

export interface IPublisher {
  publish(channelId: string, event: GameEvent): Promise<void>;
}
