import { Router } from "express";
import populateController from "../controllers/populateController";

const router: Router = Router();

router.post("/products", populateController.insertProducts);
router.post("/categories", populateController.insertCategories);

export { router };
