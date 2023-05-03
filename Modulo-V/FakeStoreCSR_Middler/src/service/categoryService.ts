import { Category } from "../repository/categoryRepository";
import categoryRepository from "../repository/categoryRepository";
import productService from "./productService";
import { makeError } from "../middlewares/errorHandler";

const getAll = async () => {
  const result = await categoryRepository.index();

  return result.map((item: Category) => item.name);
};

const getProducts = async (name: string) => {
  const fCategory: any = await categoryRepository.selectByName(name);
  if (!fCategory[0]) {
    throw makeError({
      message: "Category not Found",
      status: 400,
    });
  }
  const products: any = await productService.findByCategoryID(fCategory[0].id);
  if (!products[0]) {
    throw new Error("Product Not Found");
  }
  return products;
};

const findCategoryByName = async (name: string) => {
  const result = await categoryRepository.selectByName(name);
  if (!result.length) {
    throw makeError({
      message: "Category not Found",
      status: 400,
    });
  }
  return result;
};

const findCategoryById = async (id: number) => {
  const result = await categoryRepository.selectById(id);
  if (!result.length) {
    throw makeError({
      message: "Category not Found",
      status: 400,
    });
  }
  return result[0];
};

const insertCategory = async (category: Category) => {
  const findCategory: any = await categoryRepository.selectByName(
    category.name
  );
  if (findCategory[0]) {
    throw makeError({
      message: "Category already registered",
      status: 400,
    });
  }
  const id: any = await categoryRepository.insert(category);
  const newCategory = await findCategoryById(id[0]);
  return newCategory;
};

const updateCategory = async (oldName: string, newData: Category) => {
  const fCategory: any = await findCategoryByName(oldName);
  if (!fCategory[0]) {
    throw makeError({
      message: "Category not Found",
      status: 400,
    });
  }
  const id = parseInt(fCategory[0].id);
  await categoryRepository.update(id, newData);
  const result = await findCategoryById(id);
  return result;
};

const deleteCategory = async (name: string) => {
  const fCategory: any = await findCategoryByName(name);
  if (!fCategory[0]) {
    throw makeError({
      message: "Category not Found",
      status: 400,
    });
  }

  const fProduct: any = await productService.hasProductOfThisCartegory(
    fCategory[0].id
  );
  if (fProduct) {
    throw makeError({
      message:
        "There are still products of this category registered... Could not delete category",
      status: 400,
    });
  }

  await categoryRepository.remove(fCategory[0].id);
  const result = {
    message: "Category successfully deleted",
    category: fCategory[0],
  };
  return result;
};

export default {
  getAll,
  getProducts,
  findCategoryByName,
  findCategoryById,
  insertCategory,
  updateCategory,
  deleteCategory,
};

// try {
// } catch (error: any) {
//   return error.message ? { error: error.message } : error;
// }
