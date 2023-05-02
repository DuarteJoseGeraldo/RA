import productService from "./productService";
import categoryService from "./categoryService";

import populateRepository from "../repository/populateRepository";
import { Product, apiProduct } from "../repository/productRepository";

const populateCategories = async () => {
  try {
    const categoryNames: any = await populateRepository.getCategories();

    const categories: any = await categoryNames.map(async (item: string) => {
      const id = await categoryService.insertCategory({ name: item });
      return id;
    });

    const categoriesResolved: any = await Promise.all(categories);

    return categoriesResolved;
  } catch (error) {
    throw error;
  }
};

const populateProducts = async () => {
  try {
    const products: any = await populateRepository.getProducts();

    const insertProducts = await products.map(async (product: apiProduct) => {
      const newProduct = await productService.insertProduct(product);
      return newProduct;
    });

    const result = await Promise.all(insertProducts);

    return result;
  } catch (error) {
    throw error;
  }
};

export default { populateCategories, populateProducts };
