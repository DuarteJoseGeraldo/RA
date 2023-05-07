import type { Knex } from "knex";

// Update with your config settings.

const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./fakeStore.sqlite3",
  },
  migrations: {
    directory: "src/database",
  },
  useNullAsDefault: true,
};

export default config;
