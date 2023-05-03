import { Router } from "express";
import categoriesController from "../controllers/categoriesController";

const router: Router = Router();

router.get("/", categoriesController.index);
router.get("/:name", categoriesController.show); //mostra todos os itens dessa categoria
router.post("/", categoriesController.insert);
router.put("/:name", categoriesController.update);
router.delete("/:name", categoriesController.remove);

export { router };
