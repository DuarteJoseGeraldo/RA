import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { apiProduct } from "./productRepository";

const knexInstance = knex(config);

const showResult = async (callback: Function) => {
  const resultOfFunction = await callback();
  console.log(resultOfFunction);
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    const restructureds = result.map((produto: apiProduct) => {
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
    }
    return restructureds;
  } catch (error: any) {
    throw error;
  }
};

const getCategories = async () => {
  try {
    const categories: any = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());
    return categories;
  } catch (error: any) {
    throw error;
  }
};

export default { getProducts, getCategories };
