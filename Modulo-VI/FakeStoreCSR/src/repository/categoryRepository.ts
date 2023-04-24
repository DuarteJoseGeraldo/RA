import knex from "knex";
import config from "../../knexfile";

export type Category = {
  id?: number;
  name: string;
};

const knexInstance = knex(config);

const index = async () => {
  const categories: Category[] = await knexInstance("categories").select("*");
  return categories;
};
const selectByName = async (name: string) => {
  const category = await knexInstance("categories")
    .select("*")
    .where({ "categories.name": name });

  return category;
};

const selectById = async (id: number) => {
  const category = await knexInstance("categories")
    .select("*")
    .where({ "categories.id": id });

  return category;
};

const insert = async (item: Category) => {
  try {
    const id = await knexInstance("categories").insert(item);
    return id;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, item: Category) => {
  try {
    const update = await knexInstance("categories").update(item).where({ id });
    return update;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const removed = knexInstance("categories").delete().where({ id: id });
    return removed;
  } catch (error) {
    throw error;
  }
};
export default { index, selectByName, selectById, insert, update, remove };
