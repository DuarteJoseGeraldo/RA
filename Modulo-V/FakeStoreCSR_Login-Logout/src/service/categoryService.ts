import { Category } from "../repository/categoryRepository";
import categoryRepository from "../repository/categoryRepository";
import productService from "./productService";
import { makeError } from "../middlewares/errorHandler";

const getAll = async () => {
  const result = await categoryRepository.index();

  return result.map((item: Category) => item.name);
};

const getProducts = async (name: string) => {
  const fCategory: any = await findCategoryByName(name);

  const products: any = await productService.findByCategoryID(fCategory[0].id);

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
  const findCategory: any = await findCategoryByName(oldName);

  const verifyNewCategory: any = await categoryRepository.selectByName(
    newData.name
  );

  if (verifyNewCategory[0]) {
    throw makeError({
      message: "Category name already registered",
      status: 400,
    });
  }

  const id = parseInt(findCategory[0].id);

  await categoryRepository.update(id, newData);

  const result = await findCategoryById(id);

  return result;
};

const deleteCategory = async (name: string) => {
  const findCategory: any = await findCategoryByName(name);

  const findProduct: any = await productService.hasProductOfThisCartegory(
    findCategory[0].id
  );

  if (findProduct) {
    throw makeError({
      message:
        "There are still products of this category registered... Could not delete category",
      status: 400,
    });
  }

  await categoryRepository.remove(findCategory[0].id);
  const result = {
    message: "Category successfully deleted",
    category: findCategory[0],
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
