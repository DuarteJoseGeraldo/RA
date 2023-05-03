import { NextFunction, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import productService from "../service/productService";
import errorHandler from "../middlewares/errorHandler";

const knexInstance = knex(config);

const index = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await productService.insertProduct(req.body);
    res.status(200).json(newProduct);
  } catch (error: any) {
    next(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await productService.findByID(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const update = await productService.updateProduct(id, req.body);
    res.status(200).send(update);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted: any = await productService.deleteProduct(id);
    if (deleted) res.status(200).send(deleted);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};
export default { insert, index, show, update, remove };
