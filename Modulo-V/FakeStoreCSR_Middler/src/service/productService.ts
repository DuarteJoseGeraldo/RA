import productRepository from "../repository/productRepository";
import categoryService from "./categoryService";
import { makeError } from "../middlewares/errorHandler";
import {
  Product,
  ProductWithCategoryId,
  apiProduct,
} from "../repository/productRepository";

const getAll = async () => {
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
};

const findByID = async (productId: number) => {
  const id = productId;
  const products: any = await productRepository.selectByIdWithJoin(id);
  if (!products[0]) {
    throw makeError({ message: "Product not Found", status: 400 });
  }

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
  return apiProduct[0];
};

const findByCategoryID = async (catId: number) => {
  const products: any = await productRepository.selectByCategoryIdWithJoin(
    catId
  );

  if (!products[0]) {
    throw makeError({ message: "Product not Found", status: 400 });
  }
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
};

const hasProductOfThisCartegory = async (cateId: number) => {
  const product: any = productRepository.selectByCategoryIdWithJoin(cateId);
  if (!product[0]) {
    return false;
  }
  return true;
};

const insertProduct = async (product: apiProduct) => {
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
  const result: any = await findByID(id);
  return result;
};

const updateProduct = async (id: number, product: apiProduct) => {
  const fProduct: any = await productRepository.selectByIdWithJoin(id);
  if (!fProduct) {
    throw makeError({ message: "Product not Found", status: 400 });
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
};

const deleteProduct = async (id: number) => {
  const fProduct: any = await productRepository.selectByIdWithJoin(id);
  if (!fProduct[0]) {
    throw makeError({ message: "Product not Found", status: 400 });
  }
  await productRepository.remove(id);
  return {
    message: "Product successfully deleted",
    prduct: fProduct[0],
  };
};

export default {
  getAll,
  hasProductOfThisCartegory,
  findByCategoryID,
  findByID,
  insertProduct,
  updateProduct,
  deleteProduct,
};
