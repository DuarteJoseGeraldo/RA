import { Router } from "express";
import productsController from "../controllers/productsController";
import dataValidator from "../middlewares/dataValidator";
import { router as categoriesRoutes } from "./categories";
import { category as categoryRoutes } from "./category";

const router: Router = Router();

router.use("/categories", categoriesRoutes);

router.use("/category", categoryRoutes);

router.get("/", productsController.index);

router.get("/:id", dataValidator.idParamsValidator, productsController.show);

router.post("/", dataValidator.productDataValidator, productsController.insert);

router.put(
  "/:id",
  dataValidator.productUpdateValidator,
  productsController.updateAllData
);

router.delete(
  "/:id",
  dataValidator.idParamsValidator,
  productsController.remove
);

router.patch("/:id", productsController.update);

export { router };
