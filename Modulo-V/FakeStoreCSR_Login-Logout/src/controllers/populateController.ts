import { NextFunction, Request, Response } from "express";
import populateSerice from "../service/populateSerice";

const insertAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await populateSerice.populateCategories();
    res.status(200).send(categories);
  } catch (error: any) {
    next(error);
  }
};

const insertAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await populateSerice.populateProducts();
    res.status(200).send(products);
  } catch (error: any) {
    next(error);
  }
};

export default { insertAllCategories, insertAllProducts };
