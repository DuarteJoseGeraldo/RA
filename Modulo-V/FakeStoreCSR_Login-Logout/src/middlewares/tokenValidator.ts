import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userService from "../service/userService";
import { makeError } from "./errorHandler";

const userTokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const verifyToken: any = jwt.verify(token!, process.env.SECRET!);

    const lastValidToken = (await userService.getUserById(verifyToken.id))
      .lastValidToken;

    if (token !== lastValidToken) {
      throw makeError({
        message: "Token expired, login again",
        status: 400,
      });
    }

    next();
  } catch (error: any) {
    if (error.message === "User not Found") {
      error.message = "User Token Invalid, user not conected";
    }
    next(error);
  }
};
export default { userTokenValidator };
