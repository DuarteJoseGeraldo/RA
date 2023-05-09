import { describe, expect, jest } from "@jest/globals";
import categoryService from "../src/service/categoryService";
import productService from "../src/service/productService";
import productRepository from "../src/repository/productRepository";

describe("Teste do Service de Produtos", () => {
  it("Deve retornar um produto especifico", async () => {
    jest.spyOn(productRepository, "selectByIdWithJoin").mockResolvedValueOnce({
      id: 20,
      title: "Um produto",
      price: 250,
      description: "produto de teste",
      category: "electronics",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rate: 5,
      countRate: 300,
    });

    const result = await productService.findByID(20);

    expect(result).toMatchObject({ id: 20 });
  });
});
