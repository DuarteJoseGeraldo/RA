import { Category } from "../model/categoryModel";
import categoryModel from "../model/categoryModel";
import productService from "./productService";

const getAll = async () => {
  try {
    const result = await categoryModel.index();

    return result.map((item: Category) => item.name);
  } catch (error) {
    throw error;
  }
};

const getProducts = async (name: string) => {
  try {
    const fCategory: any = await categoryModel.selectByName(name);
    if (!fCategory[0]) {
      throw new Error("Categoria Nao encontrada");
    }
    const products: any = await productService.getByCategoryID(fCategory[0].id);
    if (!products[0]) {
      throw new Error("Produtos nao encontrados");
    }
    return products;
  } catch (error) {
    throw error;
  }
};

const findCategoryByName = async (name: string) => {
  try {
    const result = await categoryModel.selectByName(name);
    if (!result.length) throw new Error("Essa categoria não existe");
    return result;
  } catch (error) {
    throw error;
  }
};

const findCategoryById = async (id: number) => {
  try {
    const result = await categoryModel.selectById(id);
    if (!result.length) throw new Error("Essa categoria não existe");
    return result;
  } catch (error) {
    throw error;
  }
};

const insertCategory = async (category: Category) => {
  try {
    try {
      const fCategory: any = await findCategoryByName(category.name);
      if (fCategory[0]) {
        throw new Error("Categoria ja existe");
      }
    } catch (error: any) {
      if (error.message === "Essa categoria não existe") {
        const id: any = await categoryModel.insert(category);
        const newCategory = await findCategoryById(id[0]);
        return newCategory;
      } else {
        throw error;
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (oldName: string, newData: Category) => {
  try {
    const fCategory: any = await findCategoryByName(oldName);
    if (!fCategory[0]) {
      throw new Error("Categoria nao existe");
    }
    const id = parseInt(fCategory[0].id);
    await categoryModel.update(id, newData);
    const result = await findCategoryById(id);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (name: string) => {
  try {
    const fCategory: any = await findCategoryByName(name);
    if (!fCategory[0]) {
      throw new Error("Categoria nao existe");
    }

    const fProduct: any = await productService.hasProductOfThisCartegory(
      fCategory[0].id
    );

    if (fProduct)
      throw new Error(
        "Existem produtos vinculados a essa categoria, impossivel excluir"
      );

    await categoryModel.remove(fCategory[0].id);
    const result = {
      message: "Categoria deletada com sucesso",
      category: fCategory[0],
    };
    return result;
  } catch (error) {
    throw error;
  }
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
