import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import dataValidator from "../middlewares/dataValidator";

const categories: Router = Router();
const category: Router = Router();

category.get(
  "/:name",
  dataValidator.nameParamsValidatator,
  categoriesController.show
); //mostra todos os itens dessa categoria
categories.get("/", categoriesController.index);

categories.post(
  "/",
  dataValidator.categoryDataValidator,
  categoriesController.insert
);

categories.put(
  "/:name",
  dataValidator.categoryUpdateValidator,
  categoriesController.update
);

categories.delete(
  "/:name",
  dataValidator.nameParamsValidatator,
  categoriesController.remove
);

export { categories as router, category };
