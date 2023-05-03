import knex from "knex";
import config from "../../knexfile";

//formato que a API original armazena e envia
export type apiProduct = {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
//formato que o banco SQL retorna numa busca
export type Product = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  countRate: number;
};
//formato que o banco sql armazena
export type ProductWithCategoryId = {
  id?: number;
  title: string;
  price: number;
  description: string;
  category_id: number;
  image: string;
  rate: number;
  countRate: number;
};

const knexInstance = knex(config);

const indexWithJoin = async () => {
  const product: Product[] = await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.title",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.countRate"
    )
    .join("categories", "categories.id", "=", "products.category_id");

  return product;
};

const selectByIdWithJoin = async (productId: number) => {
  const id = productId;
  const product: Product[] = await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.title",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.countRate"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ "products.id": id });

  return product;
};

const selectByCategoryIdWithJoin = async (catId: number) => {
  const products: Product[] = await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.title",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.countRate"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ category_id: catId });

  return products;
};

const insert = async (product: ProductWithCategoryId) => {
  const newProduct = product;
  const newProductId: any = await knexInstance("products").insert(newProduct);
  return newProductId[0];
};

const update = async (id: number, product: ProductWithCategoryId) => {
  const newData = await knexInstance("products").update(product).where({ id });
  return product;
};

const remove = async (id: number) => {
  const removed = await knexInstance("products").delete().where({ id });
  return removed;
};

export default {
  update,
  indexWithJoin,
  selectByCategoryIdWithJoin,
  selectByIdWithJoin,
  insert,
  remove,
};
