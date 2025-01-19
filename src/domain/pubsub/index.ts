import { GameEvent } from "@/domain/events";

export type GameEventHandler = (event: GameEvent) => void;

export interface IPublisher {
  publish(channelId: string, event: GameEvent): Promise<void>;
}

export interface ISubscriber {
  subscribe(channelId: string, handler: GameEventHandler): Promise<void>;
}
