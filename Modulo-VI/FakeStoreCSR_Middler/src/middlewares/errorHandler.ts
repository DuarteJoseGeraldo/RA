import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status ? error.status : 500;
  const errorResponse = {
    message: error.message ? error.message : "Internal server Error",
    stack: error.stack,
  };

  res.status(status).json(errorResponse);
};
export default { errorHandler };
