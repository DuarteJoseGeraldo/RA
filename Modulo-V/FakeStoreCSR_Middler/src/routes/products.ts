import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import productsController from "../controllers/productsController";
import dataValidator from "../middlewares/dataValidator";

const router: Router = Router();

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/", dataValidator.productDataValidator, productsController.insert);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export { router };
