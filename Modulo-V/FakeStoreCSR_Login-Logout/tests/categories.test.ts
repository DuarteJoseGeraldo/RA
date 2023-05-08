import { describe, expect, jest } from "@jest/globals";
import categoryRepository from "../src/repository/categoryRepository";
import categoryService from "../src/service/categoryService";
import productRepository from "../src/repository/productRepository";

describe("Teste do Service de categorias", () => {
  it("Deve inserir uma nova categoria", async () => {
    jest.spyOn(categoryRepository, "selectByName").mockResolvedValueOnce([]);
    jest.spyOn(categoryRepository, "insert").mockResolvedValueOnce([1]);
    jest
      .spyOn(categoryRepository, "selectById")
      .mockResolvedValueOnce([{ id: 1, name: "newCategory" }]);

    const result = await categoryService.insertCategory({
      name: "newCategory",
    });

    expect(result).toMatchObject({ id: 1, name: "newCategory" });
  });

  it("Deve atualizar uma categoria", async () => {
    jest
      .spyOn(categoryRepository, "selectByName")
      .mockResolvedValueOnce([{ id: 1, name: "updateThis" }]);

    jest.spyOn(categoryRepository, "selectByName").mockResolvedValueOnce([]);

    jest.spyOn(categoryRepository, "update").mockResolvedValueOnce(1);

    jest
      .spyOn(categoryRepository, "selectById")
      .mockResolvedValueOnce([{ id: 1, name: "updatedCategory" }]);

    const result = await categoryService.updateCategory("updateThis", {
      name: "updatedCategory",
    });

    expect(result).toMatchObject({ id: 1, name: "updatedCategory" });
  });

  it("Deve deletar uma categoria", async () => {
    jest
      .spyOn(categoryRepository, "selectByName")
      .mockResolvedValueOnce([{ id: 1, name: "deleteThis" }]);
    jest
      .spyOn(productRepository, "selectByCategoryIdWithJoin")
      .mockResolvedValueOnce([]);

    jest.spyOn(categoryRepository, "remove").mockResolvedValueOnce(1);

    const result = await categoryService.deleteCategory("deleteThis");

    expect(result).toMatchObject({
      message: "Category successfully deleted",
      category: { id: 1, name: "deleteThis" },
    });
  });

  it("Deve retornar todos os produtos de uma categoria", async () => {
    jest
      .spyOn(categoryRepository, "selectByName")
      .mockResolvedValueOnce([{ id: 1, name: "jewelery" }]);
    jest
      .spyOn(productRepository, "selectByCategoryIdWithJoin")
      .mockResolvedValueOnce([
        {
          id: 5,
          title:
            "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
          price: 695,
          description:
            "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
          rate: 4.6,
          countRate: 400,
        },
        {
          id: 6,
          title: "Solid Gold Petite Micropave ",
          price: 168,
          description:
            "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
          category: "jewelery",
          image:
            "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
          rate: 3.9,
          countRate: 70,
        },
      ]);

    const result = await categoryService.getProducts("jewelery");

    expect(result).toMatchObject([{ id: 5 }, { id: 6 }]);
  });
});
