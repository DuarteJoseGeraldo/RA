import { NextFunction, Request, Response } from "express";
type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};
const errorHandler = (
  error: ErrorType,
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

const makeError = ({ message, status }: ErrorType) => {
  return {
    message,
    status,
  };
};
export { errorHandler, makeError };
