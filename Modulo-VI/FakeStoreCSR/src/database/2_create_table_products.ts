import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", function (table) {
    table.increments();
    table.string("title").notNullable();
    table.float("price").notNullable();
    table.string("description").notNullable();
    table.integer("category_id").notNullable();
    table.string("image").notNullable();
    table.float("rate").notNullable();
    table.integer("countRate").notNullable();
    table.foreign("category_id").references("categories.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products");
}
