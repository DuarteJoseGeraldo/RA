import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("userName").notNullable();
    table.string("userPassword").notNullable();
    table.string("lastValidToken");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user");
}
