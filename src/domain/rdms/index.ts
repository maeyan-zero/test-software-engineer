import { EventResult } from "@/domain/events/types";

export interface IResultRepository {
  saveResult(result: EventResult): Promise<EventResult>;
}
