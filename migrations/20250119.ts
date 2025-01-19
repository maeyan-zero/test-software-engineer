import { Kysely, sql } from "kysely";

// https://kysely.dev/docs/migrations#migration-files
// you need to use Kysely<any> not Kysely<Database>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("result")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("created_at", "timestamp", (col) => col.defaultTo(sql`NOW()`))
    .addColumn("event", "text")
    .addColumn("success", "boolean")
    .execute();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("result").execute();
}
