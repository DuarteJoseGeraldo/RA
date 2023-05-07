import { NextFunction, Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import userService from "../service/userService";

const knexInstance = knex(config);

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUserData = req.body;

    const newUser = await userService.registerUser(newUserData);

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    const newToken = await userService.login(userData);

    res.status(200).json(newToken);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = await userService.logout(req.body.userName);
    if (status) {
      res.status(200).json({ message: "user disconnected successfully" });
    }
  } catch (error) {
    next(error);
  }
};
export default { registerUser, login, logout };
