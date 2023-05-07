import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

export type User = {
  id?: number;
  userName?: string;
  userPassword?: string;
};

const insertUser = async (user: User): Promise<number> => {
  const newUserId = await knexInstance("users").insert(user);
  return newUserId[0];
};

const selectUserByUserName = async (userName: string): Promise<User> => {
  const selectUser = await knexInstance("users")
    .select("*")
    .where({ userName });

  return selectUser[0];
};

const selectUserById = async (id: number): Promise<User> => {
  const selectUser = await knexInstance("users").select("*").where({ id });

  return selectUser[0];
};

export default { insertUser, selectUserByUserName, selectUserById };
