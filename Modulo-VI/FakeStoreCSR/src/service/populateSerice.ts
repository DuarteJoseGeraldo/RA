import productService from "./productService";
import categoryService from "./categoryService";
import populateRepository from "../repository/populateRepository";
import {
  Product,
  ProductWithCategoryId,
  apiProduct,
} from "../repository/productRepository";

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

const populateProducts = async () => {};

export default { populateCategories };
