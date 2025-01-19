export type BaseEvent = {
  playerId: string;
  timestamp: string;
  ipAddress: string;
  eventType: EventType;
};

export enum EventType {
  JOIN_GAME,
  QUIT,
}

export type JoinGameEvent = BaseEvent & {
  eventType: EventType.JOIN_GAME;
  data: {
    gameId: number;
  };
};

export type LeaveGameEvent = BaseEvent & {
  eventType: EventType.QUIT;
};

export type GameEvent = JoinGameEvent | LeaveGameEvent;
