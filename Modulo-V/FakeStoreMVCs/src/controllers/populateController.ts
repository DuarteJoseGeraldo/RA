import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

type OldProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const showResult = async (callback: Function) => {
  const resultOfFunction = await callback();
  console.log(resultOfFunction);
};

const insertProducts = async (req: Request, res: Response) => {
  const result = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );
  const restructureds = result.map((produto: OldProduct) => {
    return {
      title: produto.title,
      price: produto.price,
      description: produto.description,
      category: produto.category,
      image: produto.image,
      rate: produto.rating.rate,
      count: produto.rating.count,
    };
  });

  for (let i = 0; i < restructureds.length; i++) {
    try {
      const categoryId = await knexInstance("categories")
        .select("id")
        .where({ name: restructureds[i].category });
      if (!categoryId.length) {
        throw new Error(
          `Categoria do produto ${restructureds[i].title} inexistente`
        );
      }

      await knexInstance("products").insert({
        title: restructureds[i].title,
        price: restructureds[i].price,
        description: restructureds[i].description,
        category_id: categoryId[0].id,
        image: restructureds[i].image,
        rate: restructureds[i].rate,
        countRate: restructureds[i].count,
      });
    } catch (error: any) {
      res.send(error.message ? { error: error.message } : error);
    }
  }
  res.status(200).send(restructureds);
};

const insertCategories = async (req: Request, res: Response) => {
  try {
    const categories = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());

    for (let i = 0; i < categories.length; i++) {
      await knexInstance("categories").insert({ name: categories[i] });
    }
    res.status(200).send(categories);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insertProducts, insertCategories };
