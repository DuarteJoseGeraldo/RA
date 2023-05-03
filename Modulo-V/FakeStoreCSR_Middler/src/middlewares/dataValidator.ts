import { Request, Response, NextFunction } from "express";
import { object, string, number } from "yup";

const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prodctData = req.body;
    const productSchema = object({
      title: string().required(),
      price: number().required(),
      category: string().required(),
      description: string().required(),
      image: string().required(),
      rating: object({
        rate: number().required(),
        count: number().required(),
      }),
    });
    await productSchema.validate(prodctData);
    next();
  } catch (error) {
    next(error);
  }
};

export default { productDataValidator };
