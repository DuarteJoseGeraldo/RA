import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const userTokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    const tokenDecoded = jwt.verify(token!, process.env.SECRET!);

    next();
  } catch (error) {
    next(error);
  }
};
export default { userTokenValidator };
