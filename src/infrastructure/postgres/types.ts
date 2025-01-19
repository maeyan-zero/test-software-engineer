import { Generated, Insertable, Selectable } from "kysely";

export interface Database {
  result: ResultTable;
}

export interface ResultTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  event: string;
  success: boolean;
}

export type Result = Selectable<ResultTable>;
export type NewResult = Insertable<ResultTable>;
