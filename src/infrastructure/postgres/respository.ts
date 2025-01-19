import { Kysely } from "kysely";
import { Database, NewResult, Result } from "@/infrastructure/postgres/types";
import { IResultRepository } from "@/domain/rdms";
import { EventResult } from "@/domain/events";

export function createResultRepository(
  db: Kysely<Database>,
): IResultRepository {
  return {
    async saveResult(result: EventResult): Promise<EventResult> {
      const newResult: NewResult = {
        event: JSON.stringify(result.event),
        success: result.success,
      };

      const insertedResult: Result = await db
        .insertInto("result")
        .values(newResult)
        .returningAll()
        .executeTakeFirstOrThrow();

      return {
        id: insertedResult.id,
        createdAt: insertedResult.created_at,
        event: JSON.parse(insertedResult.event),
        success: insertedResult.success,
      };
    },
  };
}
