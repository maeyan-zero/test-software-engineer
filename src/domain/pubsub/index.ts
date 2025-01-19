import { GameEvent } from "@/domain/events";

export interface AbstractPublisher {
  publish(channelId: string, event: GameEvent): Promise<void>;
}
