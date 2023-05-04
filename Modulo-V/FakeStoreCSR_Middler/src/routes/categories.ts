import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import dataValidator from "../middlewares/dataValidator";

const router: Router = Router();

router.get("/", categoriesController.index);
router.get(
  "/:name",
  dataValidator.nameParamsValidatator,
  categoriesController.show
); //mostra todos os itens dessa categoria
router.post(
  "/",
  dataValidator.categoryDataValidator,
  categoriesController.insert
);
router.put(
  "/:name",
  dataValidator.categoryUpdateValidator,
  categoriesController.update
);
router.delete(
  "/:name",
  dataValidator.nameParamsValidatator,
  categoriesController.remove
);

export { router };
