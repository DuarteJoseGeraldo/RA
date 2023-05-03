import { router as productsRoutes } from "./products";
import { router as categoriesRoutes } from "./categories";
import { router as populateRouter } from "./populate";
import { Router } from "express";

const router: Router = Router();

router.use("/products/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/populate", populateRouter);

export { router };
