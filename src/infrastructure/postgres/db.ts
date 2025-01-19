import { Pool } from "pg";
import { Dialect, Kysely, PostgresDialect } from "kysely";
import { Database } from "@/infrastructure/postgres/types";
import process from "process";

export function createPgDialect() {
  return new PostgresDialect({
    pool: new Pool({
      host: process.env.POSTGRES_HOST ?? "localhost",
      database: process.env.POSTGRES_DATABASE ?? "postgres",
      user: process.env.POSTGRES_USER ?? "postgres",
      password: process.env.POSTGRES_PASSWORD ?? "postgres",
      port: process.env.POSTGRES_PORT ?? 5432,
    }),
  });
}

export function createDb(dialect: Dialect) {
  return new Kysely<Database>({
    dialect,
  });
}
