import { Router } from "express";
import populateController from "../controllers/populateController";
const router: Router = Router();

router.post("/products", populateController.insertAllProducts);
router.post("/categories", populateController.insertAllCategories);

export { router };
