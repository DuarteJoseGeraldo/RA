import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Product } from "./productsController";

const knexInstance = knex(config);

type Category = {
  id?: number;
  name: string;
};

const index = async (req: Request, res: Response) => {
  try {
    const categories: Category[] = await knexInstance("categories").select(
      "name"
    );
    res.status(200).send(categories);
  } catch (error: any) {
    res.send(error.message);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.name;
    const category: Category[] = await knexInstance("categories")
      .select("categories.id")
      .where({ "categories.name": categoryName });

    if (!category.length) throw new Error("Essa categoria não existe");

    const products: Product[] = await knexInstance("products")
      .select(
        "products.id",
        "products.title",
        "products.price",
        "products.description",
        "categories.name as category",
        "products.image",
        "products.rate",
        "products.countRate"
      )
      .join("categories", "categories.id", "=", "products.category_id")
      .where({ "products.category_id": category[0].id });

    const productsAPIStructure = products.map((item: Product) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
      rating: {
        rate: item.rate,
        count: item.countRate,
      },
    }));
    res.status(200).json(productsAPIStructure);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const findCategory = await knexInstance("categories")
      .select("id")
      .where({ name: name });

    if (findCategory[0]) {
      throw new Error("Categoria ja existe");
    }

    const idNewCategorie: number[] = await knexInstance("categories").insert({
      name,
    });
    res.status(201).json({
      id: idNewCategorie[0],
      name,
    });
  } catch (error) {
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const categoryName = req.params.name;
    const { name } = req.body;
    const updateData: Category = {
      name,
    };
    await knexInstance("categories")
      .update(updateData)
      .where({ name: categoryName });
    const id = await knexInstance("categories")
      .select("id")
      .where({ name: name });

    res.status(200).json({ id: id[0].id, categoryName });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const id = await knexInstance("categories")
      .select("id")
      .where({ name: name });

    const findProduct = await knexInstance("products")
      .select("*")
      .where({ "products.category_id": id[0].id });
    if (findProduct[0]) {
      throw new Error(
        "Existem produtos vinculados a essa categoria, impossivel excluir"
      );
    } else {
      const category = await knexInstance("categories")
        .delete()
        .where({ id: id[0].id });

      if (!category) throw new Error("Essa categoria não existe");
      res.status(200).json({ msg: "Categoria deletado" });
    }
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insert, index, show, update, remove };
