import productModel from "../model/productModel";
import categoryService from "./categoryService";
import {
  Product,
  ProductWithCategoryId,
  apiProduct,
} from "../model/productModel";

const getAll = async () => {
  try {
    const products = await productModel.indexWithJoin();
    const apiProduct = products.map((item: Product) => {
      return {
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
      };
    });
    return apiProduct;
  } catch (error) {
    throw error;
  }
};

const getByID = async (productId: number) => {
  try {
    const id = productId;
    const products: any = await productModel.selectByIdWithJoin(id);
    if (!products[0]) throw new Error("produto nao econtrado");

    const apiProduct = products.map((item: Product) => {
      return {
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
      };
    });
    return apiProduct;
  } catch (error) {
    throw error;
  }
};

const getByCategoryID = async (catId: number) => {
  try {
    const products: any = await productModel.selectByCategoryIdWithJoin(catId);

    if (!products[0]) throw new Error("produto nao econtrado");
    const apiProduct = products.map((item: Product) => {
      return {
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
      };
    });
    return apiProduct;
  } catch (error) {
    throw error;
  }
};

const hasProductOfThisCartegory = async (cateId: number) => {
  try {
    const product: any = productModel.selectByCategoryIdWithJoin(cateId);
    if (!product) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const insertProduct = async (product: apiProduct) => {
  try {
    const category: any = await categoryService.findCategoryByName(
      product.category
    );
    const newProduct: ProductWithCategoryId = {
      title: product.title,
      price: product.price,
      description: product.description,
      category_id: category[0].id,
      image: product.image,
      rate: product.rating.rate,
      countRate: product.rating.count,
    };

    const id = await productModel.insert(newProduct);
    const result = productModel.selectByIdWithJoin(id);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id: number, product: apiProduct) => {
  try {
    const fProduct: any = await productModel.selectByIdWithJoin(id);
    if (!fProduct) {
      throw new Error("Produto Inexistente");
    }
    const fCategory: any = await categoryService.findCategoryByName(
      product.category
    );
    if (!fCategory[0]) {
      throw new Error("Categoria Inexistente");
    }

    const newData: ProductWithCategoryId = {
      title: product.title,
      price: product.price,
      description: product.description,
      category_id: fCategory[0].id,
      image: product.image,
      rate: product.rating.rate,
      countRate: product.rating.count,
    };
    await productModel.update(id, newData);
    const updated = await productModel.selectByIdWithJoin(id);
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    const fProduct: any = await productModel.selectByIdWithJoin(id);
    if (!fProduct[0]) {
      throw new Error("Produto Inexistente");
    }
    await productModel.remove(id);
    return {
      message: "Produto excluido com sucesso",
      prduct: fProduct[0],
    };
  } catch (error) {
    throw error;
  }
};

export default {
  getAll,
  hasProductOfThisCartegory,
  getByCategoryID,
  getByID,
  insertProduct,
  updateProduct,
  deleteProduct,
};
