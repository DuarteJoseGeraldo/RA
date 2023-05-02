import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import populateSerice from "../service/populateSerice";
const knexInstance = knex(config);
const insertAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await populateSerice.populateCategories();
    res.status(200).send(categories);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insertAllProducts = async (req: Request, res: Response) => {};

export default { insertAllCategories, insertAllProducts };
