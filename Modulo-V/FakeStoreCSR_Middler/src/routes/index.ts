import { router as productsRoutes } from "./products";
import { router as populateRouter } from "./populate";
import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes);
router.use("/populate", populateRouter);

export { router };
