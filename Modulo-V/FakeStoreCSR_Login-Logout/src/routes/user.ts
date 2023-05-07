import { Router } from "express";
import usersController from "../controllers/usersController";
import dataValidator from "../middlewares/dataValidator";

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
  dataValidator.userNameDataValidator,
  usersController.logout
);

export { userRoutes };
