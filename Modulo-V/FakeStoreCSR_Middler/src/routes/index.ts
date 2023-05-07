import { productsRoutes } from "./products";
import { router as populateRouter } from "./populate";
import { userRoutes } from "./user";
import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes);
router.use("/populate", populateRouter);
router.use("/user", userRoutes);

export { router };
