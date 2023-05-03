import { Request, Response } from "express";
import populateSerice from "../service/populateSerice";

const insertAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await populateSerice.populateCategories();
    res.status(200).send(categories);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insertAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await populateSerice.populateProducts();
    res.status(200).send(products);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insertAllCategories, insertAllProducts };
