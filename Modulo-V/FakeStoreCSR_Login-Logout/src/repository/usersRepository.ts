import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

export type User = {
  id?: number;
  userName?: string;
  userPassword?: string;
  lastValidToken?: string;
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

const updateUserToken = async (userName: string, newToken: string) => {
  const upateToken = await knexInstance("users")
    .update({ lastValidToken: newToken })
    .where({ userName });
};

export default {
  insertUser,
  selectUserByUserName,
  selectUserById,
  updateUserToken,
};
