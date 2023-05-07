import { Router } from "express";
import populateController from "../controllers/populateController";
import tokenValidator from "../middlewares/tokenValidator";
const router: Router = Router();

router.post(
  "/products",
  tokenValidator.userTokenValidator,
  populateController.insertAllProducts
);
router.post(
  "/categories",
  tokenValidator.userTokenValidator,
  populateController.insertAllCategories
);

export { router };
