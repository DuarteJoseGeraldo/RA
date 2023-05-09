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
  const product = await productRepository.selectByIdWithJoin(id);
  if (!product) {
    throw makeError({ message: "Product not Found", status: 400 });
  }
  console.log(product);

  const apiProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
    rating: {
      rate: product.rate,
      count: product.countRate,
    },
  };

  return apiProduct;
};

const findByCategoryID = async (catId: number) => {
  const product: any = await productRepository.selectByCategoryIdWithJoin(
    catId
  );

  if (!product[0]) {
    throw makeError({ message: "Product not Found", status: 400 });
  }

  console.log(product);
  const apiProduct = product.map((product: Product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      rating: {
        rate: product.rate,
        count: product.countRate,
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

const updateAllProduct = async (id: number, product: apiProduct) => {
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

const updateProduct = async (id: number, product: any) => {
  const newProduct = product;

  const findProduct: any = await productRepository.selectByIdWithJoin(id);
  if (!findProduct) {
    throw makeError({ message: "Product not Found", status: 400 });
  }

  if (newProduct.category) {
    const findCategory: any = await categoryService.findCategoryByName(
      newProduct.category
    );

    const newCategory: any = {
      category_id: findCategory[0].id,
    };
    await productRepository.update(id, newCategory);
    delete newProduct.category;
  }

  if (newProduct.rating) {
    const newRating: any = {
      rate: newProduct.rating.rate,
      countRate: newProduct.rating.count,
    };

    await productRepository.update(id, newRating);
    delete newProduct.rating;
  }
  if (Object.keys(newProduct).length) {
    await productRepository.update(id, newProduct);
  }
  const updated = await findByID(id);

  return updated;
};

const deleteProduct = async (id: number) => {
  const findProduct = await productRepository.selectByIdWithJoin(id);
  if (!findProduct) {
    throw makeError({ message: "Product not Found", status: 400 });
  }
  await productRepository.remove(id);
  return {
    message: "Product successfully deleted",
    prduct: findProduct,
  };
};

export default {
  getAll,
  hasProductOfThisCartegory,
  findByCategoryID,
  findByID,
  insertProduct,
  updateAllProduct,
  deleteProduct,
  updateProduct,
};
