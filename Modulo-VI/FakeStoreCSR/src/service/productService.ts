import productRepository from "../repository/productRepository";
import categoryService from "./categoryService";
import {
  Product,
  ProductWithCategoryId,
  apiProduct,
} from "../repository/productRepository";

const getAll = async () => {
  try {
    const products = await productRepository.indexWithJoin();
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
    const products: any = await productRepository.selectByIdWithJoin(id);
    if (!products[0]) throw new Error("Product not Found");

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
    const products: any = await productRepository.selectByCategoryIdWithJoin(
      catId
    );

    if (!products[0]) throw new Error("Product not Found");
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
    const product: any = productRepository.selectByCategoryIdWithJoin(cateId);
    if (!product[0]) {
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

    const id = await productRepository.insert(newProduct);
    const result = productRepository.selectByIdWithJoin(id);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id: number, product: apiProduct) => {
  try {
    const fProduct: any = await productRepository.selectByIdWithJoin(id);
    if (!fProduct) {
      throw new Error("Product not Found");
    }
    const fCategory: any = await categoryService.findCategoryByName(
      product.category
    );

    const newData: ProductWithCategoryId = {
      title: product.title,
      price: product.price,
      description: product.description,
      category_id: fCategory[0].id,
      image: product.image,
      rate: product.rating.rate,
      countRate: product.rating.count,
    };
    await productRepository.update(id, newData);
    const updated = await productRepository.selectByIdWithJoin(id);
    return updated;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id: number) => {
  try {
    const fProduct: any = await productRepository.selectByIdWithJoin(id);
    if (!fProduct[0]) {
      throw new Error("Product not Found");
    }
    await productRepository.remove(id);
    return {
      message: "Product successfully deleted",
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
