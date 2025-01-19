import { Pool } from "pg";
import { defineConfig } from "kysely-ctl";
import { PostgresDialect } from "kysely";
import process from "process";

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.POSTGRES_HOST ?? "localhost",
      database: process.env.POSTGRES_DATABASE ?? "postgres",
      user: process.env.POSTGRES_USER ?? "postgres",
      password: process.env.POSTGRES_PASSWORD ?? "postgres",
      port: process.env.POSTGRES_PORT ?? 5432,
    }),
  }),
  migrations: {
    migrationFolder: "migrations",
  },
});
