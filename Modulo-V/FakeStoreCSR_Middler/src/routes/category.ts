import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import dataValidator from "../middlewares/dataValidator";

const category: Router = Router();

category.get(
  "/:name",
  dataValidator.nameParamsValidatator,
  categoriesController.show
); //mostra todos os itens dessa categoria

export { category };
