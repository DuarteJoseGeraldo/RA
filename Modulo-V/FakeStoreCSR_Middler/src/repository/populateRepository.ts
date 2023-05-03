const showResult = async (callback: Function) => {
  const resultOfFunction = await callback();
  console.log(resultOfFunction);
};

const getProducts = async () => {
  const result = await fetch("https://fakestoreapi.com/products").then((res) =>
    res.json()
  );

  return result;
};

const getCategories = async () => {
  const categories: any = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  return categories;
};

export default { getProducts, getCategories };
