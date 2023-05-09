import { Router } from "express";
import usersController from "../controllers/usersController";
import dataValidator from "../middlewares/dataValidator";
import tokenValidator from "../middlewares/tokenValidator";

const userRoutes: Router = Router();

userRoutes.post(
  "/register",
  dataValidator.userDataValidator,
  usersController.registerUser
);

userRoutes.get(
  "/login",
  dataValidator.userDataValidator,
  usersController.login
);

userRoutes.get(
  "/logout",
  tokenValidator.userLogoutTokenValidator,
  dataValidator.userNameDataValidator,
  usersController.logout
);

export { userRoutes };
