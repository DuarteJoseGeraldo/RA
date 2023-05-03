const showResult = async (callback: Function) => {
  const resultOfFunction = await callback();
  console.log(resultOfFunction);
};

const getProducts = async () => {
  try {
    const result = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );

    return result;
  } catch (error: any) {
    throw error;
  }
};

const getCategories = async () => {
  try {
    const categories: any = await fetch(
      "https://fakestoreapi.com/products/categories"
    ).then((res) => res.json());
    return categories;
  } catch (error: any) {
    throw error;
  }
};

export default { getProducts, getCategories };
