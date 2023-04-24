import { Request, Response } from "express";
import categoryService from "../service/categoryService";
import { Category } from "../repository/categoryRepository";

const index = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).send(categories);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.name;

    const products: any = await categoryService.getProducts(categoryName);
    res.status(200).json(products);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const newData: Category = req.body;
    const newCategory = await categoryService.insertCategory(newData);
    res.status(200).send(newCategory);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.name,
      req.body
    );
    res.status(200).send(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const deleted = await categoryService.deleteCategory(name);
    res.status(200).send(deleted);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insert, index, show, update, remove };
